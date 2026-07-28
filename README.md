# DocuZen

Upload a document. Ask it questions. Get answers with page-level citations.

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)

---

## What it does

DocuZen is a document Q&A tool built on retrieval augmented generation. Upload a PDF or Word document, ask a question in plain English, and get a direct answer with the exact pages it came from.

How it works under the hood:

1. The document is parsed and split into overlapping text chunks
2. Each chunk is embedded using OpenAI's embedding model and stored as a vector in PostgreSQL via pgvector
3. When a question comes in, the most relevant chunks are retrieved by cosine similarity
4. Those chunks and the question are sent to GPT-4o-mini, which returns a grounded answer
5. The response includes the source pages so you can verify every claim

Rate limiting is set to 60 requests per hour per IP to control API costs. CORS is locked to specific origins. File uploads are validated by type and capped at 50MB.

---

## Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI, Python |
| Database | PostgreSQL, pgvector |
| AI | OpenAI GPT-4o-mini, text-embedding-3-small |
| Frontend | Next.js |
| Deployment | Vercel (frontend), Render (backend) |

---

## Running locally

**1. Clone and install**

```bash
git clone https://github.com/denz-os/doc-analyzer.git
cd doc-analyzer/backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
```

**2. Set up PostgreSQL with pgvector**

You need a PostgreSQL instance with the pgvector extension enabled. Supabase works out of the box.

**3. Create `backend/.env`**

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/docuzen
OPENAI_API_KEY=your_openai_key
MAX_FILE_SIZE_MB=50
ALLOWED_ORIGINS=["http://localhost:3000"]
```

**4. Run the backend**

```bash
uvicorn app.main:app --reload
```

**5. Run the frontend**

```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## What I learned

This is where retrieval augmented generation stopped being something I had read about and became something I actually understood. Figuring out the right chunk size, overlap, and how to surface page citations forced me to think carefully about every step in the pipeline.

I also built rate limiting and CORS restrictions in from the start, which was the first time I had done that intentionally rather than as an afterthought. That shift in thinking, building security in rather than bolting it on, is something I carry into every project now.

---

## What broke and how I fixed it

**asyncpg rejecting the database URL**

Cloud PostgreSQL providers (Neon, Supabase) append `?sslmode=require&channel_binding=disable` to connection strings. asyncpg does not accept these as URL parameters — it throws `invalid dsn` on startup. Fixed by writing a URL sanitiser that strips those params before passing the URL to `create_async_engine`, then enables SSL separately via `connect_args`:

```python
def _build_engine_url(raw_url: str):
    params = parse_qs(parsed.query)
    params.pop("sslmode", None)
    params.pop("channel_binding", None)
    ...

engine = create_async_engine(_db_url, connect_args={"ssl": True})
```

**pgvector extension not installed before table creation**

SQLAlchemy's `Base.metadata.create_all` fails if the `vector` column type doesn't exist yet. The pgvector extension has to be created first. Fixed by running `CREATE EXTENSION IF NOT EXISTS vector` explicitly inside `create_tables()` before the metadata call:

```python
await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
await conn.run_sync(Base.metadata.create_all)
```

**Started with Qdrant, migrated to pgvector**

The first version used a separate Qdrant instance as the vector store (`vector_store.py` still exists in the codebase as a remnant). Managing two separate services on Render's free tier — one for the API and one for Qdrant — added cold start latency and deployment complexity. Migrated vectors into the same PostgreSQL database using pgvector. One fewer service, one fewer failure point.

**OpenAI API costs during development**

Without rate limiting, hitting the `/query` endpoint repeatedly during testing ran up OpenAI charges fast. Added `slowapi` middleware with a 60 requests/hour limit per IP. This also means the deployed API can't be scraped or abused by automated tools.

**CORS blocking the frontend**

The Next.js frontend on Vercel (different origin) was blocked by the browser's same-origin policy. Added `CORSMiddleware` with explicit allowed origins read from the environment, so local dev (`localhost:3000`) and production (`vercel.app`) both work without opening CORS to `*`.

---

## Technical notes

- **Async SQLAlchemy** — uses `create_async_engine` with `AsyncSession` and `async_sessionmaker`. All database calls are non-blocking. Pool is configured with `pool_size=10` and `max_overflow=20` to handle concurrent requests on Render's single instance.
- **Chunking strategy** — documents are split into overlapping chunks so context isn't lost at chunk boundaries. Each chunk stores its page number so citations can be surfaced in the response.
- **Vector retrieval** — `Chunk.embedding.cosine_distance(query_vector)` is a pgvector operator that runs the similarity search inside PostgreSQL. No Python-side sorting needed.
- **Embedding model** — `text-embedding-3-small` is used over `text-embedding-ada-002` for lower cost at comparable quality for retrieval tasks.
- **Lifespan handler** — `create_tables()` runs inside FastAPI's `asynccontextmanager` lifespan so it executes once at startup, not on every request.

---


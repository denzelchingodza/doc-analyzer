# ChunkDoc

Built for medical students at Stellenbosch University, Tygerberg campus.

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)

## The problem

Medical students at Tygerberg deal with a heavy load of PDF material: lecture notes, clinical guidelines, textbook chapters, research papers, and past exam documents. Finding one specific piece of information often means scrolling through 80 pages or re-reading an entire chapter.

ChunkDoc solves that. Upload any document up to 50 MB, ask a question in plain English, and get a direct answer with the page number it came from. No internet search. No hallucinations from a general model. Just your document, answered.

## What it does

1. Upload a PDF or DOCX: lecture notes, Harrison's, a clinical protocol, a research paper
2. Ask a question: "What is the first-line treatment for septic shock?" or "What does the study say about mortality rates?"
3. Get a grounded answer with the exact page numbers it came from
4. Verify it yourself in seconds

Rate limiting is set to 60 requests per hour per IP. File uploads are capped at 50 MB.

## How it works

1. The document is parsed and split into overlapping text chunks that preserve page boundaries
2. Each chunk is embedded using OpenAI's `text-embedding-3-small` model and stored as a vector in PostgreSQL via pgvector
3. When a question comes in, the most semantically relevant chunks are retrieved by cosine similarity
4. Those chunks and the question are passed to GPT-4o-mini, which generates a grounded answer
5. The response includes source page numbers so every claim can be verified

## Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI, Python |
| Database | PostgreSQL, pgvector |
| AI | OpenAI GPT-4o-mini, text-embedding-3-small |
| Frontend | Next.js |
| Deployment | Vercel (frontend), Render (backend) |

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
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/chunkdoc
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

## What I learned

This is where RAG stopped being something I had read about and became something I actually understood. Figuring out chunk size, overlap strategy, and how to surface page citations forced me to think carefully about every step in the pipeline.

The motivation was real. Friends studying medicine at Tygerberg described spending 45 minutes trying to find a specific clinical criterion in a guideline PDF. That is a solvable problem. Building something that actually gets used by people you know sharpens every decision.

## What broke and how I fixed it

**asyncpg rejecting the database URL**

Cloud PostgreSQL providers append `?sslmode=require&channel_binding=disable` to connection strings. asyncpg does not accept these as URL parameters. Fixed by writing a URL sanitiser that strips those params before passing the URL to `create_async_engine`, then enables SSL separately via `connect_args`.

**pgvector extension not installed before table creation**

SQLAlchemy's `Base.metadata.create_all` fails if the `vector` column type does not exist yet. Fixed by running `CREATE EXTENSION IF NOT EXISTS vector` explicitly inside `create_tables()` before the metadata call.

**Started with Qdrant, migrated to pgvector**

The first version used a separate Qdrant instance. Managing two services on Render's free tier added cold start latency and deployment complexity. Migrated vectors into the same PostgreSQL database. One fewer service, one fewer failure point.

**CORS blocking the frontend**

The Next.js frontend on Vercel was blocked by the same-origin policy. Added `CORSMiddleware` with explicit allowed origins read from the environment so local dev and production both work without opening CORS to wildcard.

## Technical notes

- Async SQLAlchemy with `create_async_engine`, `AsyncSession`, and `async_sessionmaker` so all database calls are non-blocking
- Overlapping chunks preserve context at boundaries and each chunk stores its page number for citation surfacing
- `Chunk.embedding.cosine_distance(query_vector)` runs the similarity search inside PostgreSQL with no Python-side sorting needed
- `text-embedding-3-small` over `ada-002` for lower cost at comparable retrieval quality
- `create_tables()` runs inside FastAPI's lifespan handler: once at startup, not on every request

Built by [Denzel Chingodza](https://denz-platform.vercel.app) · Stellenbosch, South Africa

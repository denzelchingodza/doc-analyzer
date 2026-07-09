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


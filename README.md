# ChunkDoc

A RAG powered document Q&A system built for medical students at Stellenbosch University's Tygerberg campus.

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## Why this exists

From high school I developed a genuine interest in medicine not just as a path I wanted to take but couldn't, but also as a field I respected for its density and the precision it demands. When I started building software, the intersection felt natural and with how the development of AI has been in that it can predict stuff through deep learning. I guess i have started to find my way back to medicine through the development of software and intelligent systems. (LOL)

Before writing this development, I spoke to friends studying medicine at Tygerberg. The same problem came up in every conversation: finding one specific piece of information inside a 200 page PDF was costing them 30 to 60 minutes, during an already demanding curriculum. Ctrl+F fails on scanned PDFs. General AI models hallucinate dosages and diagnostic criteria. And even when a student found the right paragraph, there was no way to verify it quickly. And i guess for ease of work and helping them get what they want quickly i decided to make a document analysis tool using AI to analyse what would take a human 30+ minutes. it also was a learning curve for me to do this and has become my debut in ai system design and development. 

---

## The problem

| Student | Year | Core frustration | Time lost |
|---|---|---|---|
| Student A | 3rd Year MBChB | Drug dosing in clinical formularies | 30+ min |
| Student B | 4th Year MBChB | Clinical guidelines during ward rounds | 20+ min |
| Student C | 5th Year MBChB | Retrieving criteria from Harrison's | 45+ min |
| Student D | 2nd Year MBChB | Lecture notes vs. clinical decision rules | 40+ min |
| Student E | 3rd Year MBChB | Key findings in research papers | 15+ min |

Five students. Same pattern. Information retrieval was taking more time than the studying itself.

---

## What it does

Upload any PDF or DOCX. Ask a question in plain English. Get a direct answer with the exact page number it came from grounded entirely in your document, with no internet search and no hallucination from general model knowledge.

```
You:        "What is the first-line treatment for septic shock?"
ChunkDoc:   "Early goal directed therapy includes fluid resuscitation
             with 30 mL/kg crystalloid within 3 hours..."
             ── Page 1247
```

Rate limiting: 60 requests per hour per IP. Upload cap: 50 MB.

---

## How it works

```
DOCUMENT INGESTION
──────────────────
PDF / DOCX  →  Page-aware parser  →  Overlapping chunker  →  text-embedding-3-small  →  pgvector

QUERY RESOLUTION
────────────────
Question  →  Embed query  →  Cosine similarity search  →  GPT-4o-mini (grounded)  →  Answer + page citation
```

1. The document is parsed page by page and split into overlapping text chunks. Overlap prevents context loss at boundaries. Each chunk stores its source page number.
2. Each chunk is embedded with OpenAI's `text-embedding-3-small` and stored as a vector in PostgreSQL via pgvector.
3. Incoming questions are embedded with the same model and used to retrieve the topK most similar chunks via `cosine_distance()`.
4. The retrieved chunks and the question are passed to GPT-4o-mini, which generates an answer grounded strictly in that context.
5. The answer is returned with source page numbers so every claim can be verified in seconds.

---

## Stack

| Layer | Technology | Notes |
|---|---|---|
| Backend | FastAPI, Python 3.11 | REST API, file handling, query routing |
| Database | PostgreSQL + pgvector | Chunks, metadata, and vectors in one service |
| Async ORM | SQLAlchemy + asyncpg | `create_async_engine`, non blocking DB ops |
| Embedding | text-embedding-3-small | OpenAI API · 1536 dimensions |
| LLM | GPT-4o-mini | OpenAI API · grounded answer generation |
| Document parsing | pdfplumber + python docx | Page boundary metadata preserved |
| Frontend | Next.js 15 (App Router) | Upload UI, chat panel, citation display |
| Frontend deploy | Vercel | Auto deploy on git push |
| Backend deploy | Render | Python service + persistent PostgreSQL |

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

---

## What broke and how I fixed it

**asyncpg rejecting the database URL**

Cloud PostgreSQL providers append `?sslmode=require&channel_binding=disable` to connection strings. asyncpg does not accept these as URL parameters and throws on startup. Fixed by writing a URL sanitiser that strips query params before passing to `create_async_engine`, then enabling SSL separately via `connect_args`.

**pgvector not installed before table creation**

`Base.metadata.create_all()` fails silently or errors when the `vector` column type does not exist because the extension has not been enabled. Fixed by running `CREATE EXTENSION IF NOT EXISTS vector` explicitly inside the FastAPI lifespan handler, before the metadata call. Now runs safely on every startup.

**Started with Qdrant, migrated to pgvector**

The first version used a separate Qdrant instance. Two services on Render's free tier meant cold starts of 30+ seconds on the vector endpoint. Migrated everything into the existing PostgreSQL database using pgvector. One fewer service, one fewer cold start, simpler deployment.

**CORS blocking the frontend**

The Next.js frontend on Vercel was blocked by the same origin policy. Added `CORSMiddleware` with allowed origins from environment variables, covering localhost for development and the production Vercel URL.

**Context loss at chunk boundaries**

Answers for questions whose relevant content spanned two adjacent chunks were incomplete. Fixed by implementing overlapping chunks each chunk includes text from the end of the preceding one. Page metadata is preserved throughout.

**ESLint failing the Vercel build**

The first production deployment failed not because of TypeScript but because `react/no-unescaped-entities` treats literal quote characters in JSX text as a build error. Fixed by replacing `"text"` with `{"text"}` in affected JSX. Confirmed TypeScript clean separately with `tsc --noEmit` before pushing.

---

## What I learned

**RAG is an engineering problem.** Chunk size, overlap percentage, embedding model choice, and the number of retrieved chunks all materially affect answer quality. Each is a deliberate decision, not a default.

**Research before building prevents rework.** Interviewing five students before writing the first function clarified that the problem was grounded accuracy with verifiable citations not search speed. Without that, the first version would have been a generic summariser.

**Deployment is its own discipline.** A system that works locally can fail in production in multiple distinct ways simultaneously. Connection strings, extension availability, environment variables, and CORS are four separate problems with four separate fixes.

**Model cost is a product decision.** `text-embedding-3-small` over `text-embedding-3-large` reduces embedding cost by ~20x with minimal quality difference for this retrieval task. At scale, that choice determines whether the system is viable.

**Constraint is a feature.** Restricting answers to the uploaded document only is what makes ChunkDoc trustworthy for medical information. A tool that sometimes invents clinical information is not a tool a student can rely on.

**Citations build trust.** The page number on every answer is not a UX detail. It is the mechanism that makes the system verifiable and therefore useful in a field where accuracy is not optional.

---

Built by [Denzel Chingodza](https://denz-platform.vercel.app) · Stellenbosch, South Africa

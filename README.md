# DocuZen

> AI-powered document intelligence — built while learning, shipped because it's lekker.

![DocuZen landing page](docs/screenshot.png)

**Live:** [docuzen.netlify.app](https://docuzen.netlify.app) &nbsp;·&nbsp; **Repo:** [github.com/denz-os/doc-analyzer](https://github.com/denz-os/doc-analyzer)

---

## What is this?

DocuZen lets you upload any PDF or Word document and have a real conversation with it. Ask a question in plain language, get a direct answer with page references pointing back to exactly where the information came from — no skimming, no guessing.

I built this as part of my ongoing journey learning about AI systems — specifically RAG (Retrieval-Augmented Generation) pipelines, vector databases, and how to wire them up into something actually usable. It's been a genuinely fun project to put together and I'm still adding to it as I go deeper into the space.

---

## Features

- Upload PDF or DOCX files up to 50MB
- Automatic parsing, chunking, and vector embedding on upload
- Natural language Q&A grounded in the actual document content
- Answers include page-level citations and similarity scores
- Clean split-panel interface — sidebar, viewer, and chat side by side
- Military-green themed UI built with Next.js and Tailwind
- Password-gated app with a glassmorphism lock screen (blurred app preview behind it)

---

## How it works

DocuZen uses a RAG pipeline under the hood:

1. **Ingest** — PyMuPDF / python-docx extract raw text with page numbers
2. **Chunk** — tiktoken splits text into overlapping token windows
3. **Embed** — OpenAI `text-embedding-3-small` converts each chunk to a vector
4. **Store** — vectors go into PostgreSQL via pgvector (no separate vector DB needed)
5. **Query** — at question time, the query is embedded, top-k chunks are retrieved via cosine similarity, and GPT-4o-mini synthesises a grounded answer

---

## Tech stack

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) — async Python API
- [PostgreSQL](https://www.postgresql.org/) + [pgvector](https://github.com/pgvector/pgvector) — chunks, metadata, and vector search in one database
- [SQLAlchemy](https://www.sqlalchemy.org/) — async ORM with pgvector cosine distance queries
- [OpenAI](https://platform.openai.com/) — embeddings (`text-embedding-3-small`) + answers (`gpt-4o-mini`)
- [PyMuPDF](https://pymupdf.readthedocs.io/) — PDF extraction with page numbers
- [python-docx](https://python-docx.readthedocs.io/) — Word document parsing
- [tiktoken](https://github.com/openai/tiktoken) — token-aware chunking with overlap

**Frontend**
- [Next.js 15](https://nextjs.org/) (App Router, TypeScript, static export)
- [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Netlify](https://netlify.com)

**Infrastructure**
- [Neon](https://neon.tech) — free serverless Postgres with pgvector
- [Render](https://render.com) — free Docker-based backend hosting

---

## Access

The live app at `/app` is password-protected to keep OpenAI costs in check. Set `NEXT_PUBLIC_APP_PASSWORD` as an environment variable on Netlify (or in `.env.local` locally) to configure the password. If the env var is unset, the gate is bypassed — useful during local development.

The lock screen sits over a blurred preview of the app so visitors know what they're walking into.

**Password:** `docuzen2026`

---

## Running locally

**Prerequisites:** Python 3.11+, Node.js 18+, a Postgres instance with pgvector enabled, OpenAI API key

### Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env          # fill in DATABASE_URL and OPENAI_API_KEY
uvicorn app.main:app --reload  # creates tables + pgvector extension on startup
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000) — backend runs on port 8000.

---

## Project structure

```
doc-analyzer/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI entry point
│   │   ├── routers/         # /documents and /chat endpoints
│   │   ├── services/        # RAG pipeline logic
│   │   ├── models/          # SQLAlchemy models
│   │   └── database.py      # Async Postgres connection
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── page.tsx         # Landing page
│   │   └── app/page.tsx     # Main split-panel app
│   ├── components/
│   │   ├── Sidebar.tsx      # Upload + document list
│   │   ├── ViewerPanel.tsx  # Document viewer
│   │   └── ChatPanel.tsx    # Q&A chat interface
│   └── lib/api.ts           # API client
├── docker-compose.yml
└── netlify.toml
```

---

## About

Built by [Denzel Chingodza](https://denzos-platform.netlify.app) — a developer based in South Africa, actively learning and building in the AI space. DocuZen started as a way to properly understand RAG pipelines and turned into something I'm actually proud to ship. Still a work in progress, more features coming.

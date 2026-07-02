# DocuZen

> AI-powered document intelligence, built while learning.

**Live:** [doc-analyzer-as5k.vercel.app](https://doc-analyzer-as5k.vercel.app/) &nbsp;·&nbsp; **Repo:** [github.com/denz-os/doc-analyzer](https://github.com/denz-os/doc-analyzer)

---

## What is this?

DocuZen lets you upload any PDF or Word document and have a real conversation with it. Ask a question in plain language, get a direct answer with page references pointing back to exactly where the information came from no skimming, no guessing.

I built this as part of my ongoing journey learning about AI systems specifically RAG (Retrieval-Augmented Generation) pipelines, vector databases, and how to wire them up into something actually usable. It's been a genuinely fun project to put together and I'm still adding to it as I go deeper into the space.

---

## Features

- Upload PDF or DOCX files up to 50MB
- Automatic parsing, chunking, and vector embedding on upload
- Natural language Q&A grounded in the actual document content
- Answers include page-level citations and similarity scores
- Clean split-panel interface: sidebar, viewer, and chat side by side
- Military-green themed UI built with Next.js and Tailwind
- Rate-limited backend (60 requests/hour per IP) to keep OpenAI costs in check

---

## How it works

DocuZen uses a RAG pipeline under the hood:

1. **Ingest:** PyMuPDF / python-docx extract raw text with page numbers
2. **Chunk:** tiktoken splits text into overlapping token windows
3. **Embed:** OpenAI `text-embedding-3-small` converts each chunk to a vector
4. **Store:** vectors go into PostgreSQL via pgvector (no separate vector DB needed)
5. **Query:** the query is embedded, the top matching chunks are retrieved by similarity, and GPT-4o-mini generates a grounded answer

---

## Tech stack

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) for the async Python API
- [PostgreSQL](https://www.postgresql.org/) + [pgvector](https://github.com/pgvector/pgvector) for storing chunks, metadata, and running vector search in one database
- [SQLAlchemy](https://www.sqlalchemy.org/) as the async ORM with pgvector distance queries
- [OpenAI](https://platform.openai.com/) for embeddings (`text-embedding-3-small`) and answers (`gpt-4o-mini`)
- [PyMuPDF](https://pymupdf.readthedocs.io/) for PDF extraction with page numbers
- [python-docx](https://python-docx.readthedocs.io/) for Word document parsing
- [tiktoken](https://github.com/openai/tiktoken) for token-aware chunking with overlap

**Frontend**
- [Next.js 15](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com)

**Infrastructure**
- [Neon](https://neon.tech) — free serverless Postgres with pgvector
- [Render](https://render.com) — free Docker-based backend hosting

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

## ML concepts at work

DocuZen is a practical application of the core ML pipeline: data collection, modelling, and deployment. Here's how the theory maps to what this project actually does, using the [6-step ML framework](https://dev.mrdbourke.com/zero-to-mastery-ml/a-6-step-framework-for-approaching-machine-learning-projects/) as a reference.

**Problem definition.** A classic information retrieval problem rephrased as ML: given a user query and a large unstructured text corpus (a document), find the most semantically relevant passages and generate a grounded answer. This falls under transfer learning — we use pre-trained models rather than training from scratch.

**Data.** Documents are unstructured data. PDFs and Word files are not immediately row-and-column ready. The ingestion pipeline converts them into structured chunks with metadata (page number, position, token count) that a model can work with.

**Features.** Raw text is not a feature a model can consume directly. tiktoken chunks the text into overlapping token windows. OpenAI's `text-embedding-3-small` converts each chunk into a 1536-dimension vector — that vector is the feature. pgvector stores and indexes these features for similarity search.

**Evaluation.** Similarity scores (cosine distance between query vector and chunk vectors) are the evaluation metric. Every answer surfaces the top-k chunks and their similarity scores so you can see how confident the retrieval was. Lower distance = stronger match.

**Modelling.** Two models in the pipeline: an embedding model for retrieval (`text-embedding-3-small`) and a generation model for answering (`gpt-4o-mini`). The retrieval step is unsupervised (find similar vectors). The generation step takes the retrieved context and the query as input and produces the answer — grounded, not hallucinated.

**Experimentation.** Chunk size, overlap, top-k retrieval count, and the generation prompt are all tunable. Changing chunk size changes what counts as a "feature". Changing top-k changes how much context the generation model sees. These are the hyperparameters of this RAG pipeline.

---

## About

Built by [Denzel Chingodza](https://denz-platform.vercel.app) — BSc Software Engineering student based in South Africa, learning and building in the NLP and AI space. DocuZen started as a way to understand how RAG pipelines actually work under the hood and turned into something worth shipping. Still a work in progress.

- GitHub: [github.com/denzelchingodza](https://github.com/denzelchingodza)
- LinkedIn: [linkedin.com/in/denzel-chingodza-45b6ab3a0](https://www.linkedin.com/in/denzel-chingodza-45b6ab3a0/)
- Portfolio: [denz-platform.vercel.app](https://denz-platform.vercel.app)

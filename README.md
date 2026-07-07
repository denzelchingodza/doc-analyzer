# DocuZen

Upload a PDF or Word doc. Ask it questions. Get answers with page references.

Built to understand how RAG pipelines work under the hood and turned into something worth shipping.

---

## How it works

Upload a document and it gets parsed, chunked, and embedded into a vector database. Ask a question and the query is embedded, the closest chunks are retrieved, and GPT-4o-mini generates a grounded answer with page citations.

## Stack

FastAPI · PostgreSQL + pgvector · OpenAI · PyMuPDF · python-docx · tiktoken · Neon · Render · Vercel

## Running locally

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add DATABASE_URL and OPENAI_API_KEY
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install && npm run dev
```

Backend on `localhost:8000`, frontend on `localhost:3000`.

## Eval layer

An automated regression test runs on every push. It uploads a golden test document, fires 10 questions, and checks that DocuZen's answers contain the expected keywords. Build fails if quality drops below 75%.

```bash
DOCUZEN_API_URL=https://your-backend.onrender.com python evals/scorer.py
```

---

Built by [Denzel Chingodza](https://denz-platform.vercel.app) — BSc Software Engineering, South Africa.

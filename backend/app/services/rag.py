from openai import AsyncOpenAI
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.models.document import Chunk
from app.services.embeddings import embed_batch, embed_text
from app.services.chunker import TextChunk


openai_client = AsyncOpenAI(api_key=settings.openai_api_key)


async def store_chunks(db: AsyncSession, document_id: str, chunks: list[TextChunk]) -> None:
    """Embed chunks and store vectors directly in Postgres via pgvector."""
    texts = [chunk.content for chunk in chunks]
    embeddings = await embed_batch(texts)

    result = await db.execute(
        select(Chunk).where(Chunk.document_id == document_id)
    )
    db_chunks = result.scalars().all()

    for db_chunk, embedding in zip(db_chunks, embeddings):
        db_chunk.embedding = embedding

    await db.commit()


async def search_chunks(db: AsyncSession, document_id: str, question: str, top_k: int = 5) -> list[Chunk]:
    """Find the most relevant chunks using cosine similarity."""
    query_vector = await embed_text(question)

    result = await db.execute(
        select(Chunk)
        .where(Chunk.document_id == document_id)
        .order_by(Chunk.embedding.cosine_distance(query_vector))
        .limit(top_k)
    )
    return result.scalars().all()


async def answer_question(db: AsyncSession, document_id: str, question: str) -> tuple[str, list[Chunk]]:
    chunks = await search_chunks(db, document_id, question)

    if not chunks:
        return "No relevant content found in this document.", []

    context = "\n\n---\n\n".join([
        f"[Page {c.page_number}, Chunk {c.chunk_index}]\n{c.content}"
        for c in chunks
    ])

    prompt = f"""You are a document analysis assistant.
Answer the question using only the provided document excerpts.
If the answer is not in the excerpts, say so clearly.
Always cite the page number when referencing specific content.

Document excerpts:
{context}

Question: {question}"""

    response = await openai_client.chat.completions.create(
        model=settings.llm_model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
    )

    return response.choices[0].message.content, chunks
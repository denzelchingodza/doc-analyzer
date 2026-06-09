from openai import AsyncOpenAI
from qdrant_client.models import PointStruct

from app.config import settings
from app.services.embeddings import embed_batch, embed_text
from app.services.chunker import TextChunk
from app.vector_store import client as qdrant_client


openai_client = AsyncOpenAI(api_key=settings.openai_api_key)


async def store_chunks(document_id: str, chunks: list[TextChunk], vector_ids: list[str]) -> None:
    points = []
    texts = [chunk.content for chunk in chunks]
    embeddings = await embed_batch(texts)

    for chunk, embedding, vector_id in zip(chunks, embeddings, vector_ids):
        points.append(PointStruct(
            id=vector_id,
            vector=embedding,
            payload={
                "document_id": document_id,
                "chunk_index": chunk.chunk_index,
                "page_number": chunk.page_number,
                "content": chunk.content,
            },
        ))

    await qdrant_client.upsert(
        collection_name=settings.qdrant_collection,
        points=points,
    )


async def search_chunks(document_id: str, question: str, top_k: int = 5):
    question_vector = await embed_text(question)

    results = await qdrant_client.search(
        collection_name=settings.qdrant_collection,
        query_vector=question_vector,
        limit=top_k,
        query_filter={
            "must": [{"key": "document_id", "match": {"value": document_id}}]
        },
    )
    return results


async def answer_question(document_id: str, question: str) -> tuple[str, list]:
    results = await search_chunks(document_id, question)

    if not results:
        return "No relevant content found in this document.", []

    context = "\n\n---\n\n".join([
        f"[Page {r.payload['page_number']}, Chunk {r.payload['chunk_index']}]\n{r.payload['content']}"
        for r in results
    ])

    prompt = f"""You are a document analysis assistant for South African legal and financial firms.
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

    answer = response.choices[0].message.content
    return answer, results
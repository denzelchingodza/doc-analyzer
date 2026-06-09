from fastapi import APIRouter, HTTPException

from app.schemas.document import ChatRequest, ChatResponse, SourceChunk
from app.services.rag import answer_question

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    answer, sources = await answer_question(request.document_id, request.question)

    source_chunks = [
        SourceChunk(
            content=s.payload["content"],
            page_number=s.payload.get("page_number"),
            chunk_index=s.payload["chunk_index"],
            score=s.score,
        )
        for s in sources
    ]

    return ChatResponse(answer=answer, sources=source_chunks)
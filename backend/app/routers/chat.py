from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.document import ChatRequest, ChatResponse, SourceChunk
from app.services.rag import answer_question

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    answer, sources = await answer_question(db, request.document_id, request.question)

    source_chunks = [
        SourceChunk(
            content=s.content,
            page_number=s.page_number,
            chunk_index=s.chunk_index,
            score=0.0,  # cosine distance doesn't return a score directly
        )
        for s in sources
    ]

    return ChatResponse(answer=answer, sources=source_chunks)
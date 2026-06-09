from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ChunkResponse(BaseModel):
    id: str
    content: str
    page_number: Optional[int]
    chunk_index: int

    model_config = {"from_attributes": True}


class DocumentResponse(BaseModel):
    id: str
    filename: str
    file_type: str
    file_size: int
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class DocumentDetailResponse(DocumentResponse):
    chunks: list[ChunkResponse] = []


class ChatRequest(BaseModel):
    document_id: str
    question: str


class SourceChunk(BaseModel):
    content: str
    page_number: Optional[int]
    chunk_index: int
    score: float


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceChunk]
import uuid  # still used for doc.id and chunk.id

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.document import Document, Chunk
from app.schemas.document import DocumentResponse, DocumentDetailResponse
from app.services.parser import parse_file
from app.services.chunker import chunk_pages
from app.services.rag import store_chunks
from app.config import settings

router = APIRouter(prefix="/documents", tags=["documents"])

ALLOWED_TYPES = {
    "application/pdf": "pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
}


@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
):
    # Validate type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")

    file_bytes = await file.read()

    # Validate size
    max_bytes = settings.max_file_size_mb * 1024 * 1024
    if len(file_bytes) > max_bytes:
        raise HTTPException(status_code=400, detail=f"File exceeds {settings.max_file_size_mb}MB limit.")

    file_type = ALLOWED_TYPES[file.content_type]

    # Save document record
    doc = Document(
        id=str(uuid.uuid4()),
        filename=file.filename,
        file_type=file_type,
        file_size=len(file_bytes),
        status="processing",
    )
    db.add(doc)
    await db.commit()
    await db.refresh(doc)

    try:
        # Parse → chunk → embed → store
        pages = parse_file(file_bytes, file_type)
        chunks = chunk_pages(pages)

        db_chunks = [
            Chunk(
                id=str(uuid.uuid4()),
                document_id=doc.id,
                content=chunk.content,
                page_number=chunk.page_number,
                chunk_index=chunk.chunk_index,
            )
            for chunk in chunks
        ]
        db.add_all(db_chunks)
        await db.commit()

        await store_chunks(db, doc.id, chunks)

        doc.status = "ready"
        await db.commit()
        await db.refresh(doc)

    except Exception as e:
        doc.status = "failed"
        await db.commit()
        raise HTTPException(status_code=500, detail=str(e))

    return doc


@router.get("/", response_model=list[DocumentResponse])
async def list_documents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Document).order_by(Document.created_at.desc()))
    return result.scalars().all()


@router.get("/{document_id}", response_model=DocumentDetailResponse)
async def get_document(document_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Document)
        .where(Document.id == document_id)
        .options(selectinload(Document.chunks))
    )
    doc = result.scalar_one_or_none()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found.")
    return doc


@router.delete("/{document_id}")
async def delete_document(document_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Document).where(Document.id == document_id))
    doc = result.scalar_one_or_none()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found.")
    await db.delete(doc)
    await db.commit()
    return {"deleted": document_id}
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import create_tables
from app.vector_store import ensure_collection
from app.routers import documents, chat


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await create_tables()
    await ensure_collection()
    yield
    # Shutdown (nothing needed yet)


app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) 
app.include_router(documents.router)
app.include_router(chat.router)


@app.get("/health")
async def health():
    return {"status": "ok", "app": settings.app_name}
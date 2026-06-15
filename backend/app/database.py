from urllib.parse import urlparse, urlencode, parse_qs, urlunparse

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import settings


def _build_engine_url(raw_url: str):
    """Strip sslmode/channel_binding from URL query string (asyncpg doesn't accept them).
    SSL is enabled via connect_args instead."""
    parsed = urlparse(raw_url)
    params = parse_qs(parsed.query)
    params.pop("sslmode", None)
    params.pop("channel_binding", None)
    clean_query = urlencode({k: v[0] for k, v in params.items()})
    clean = parsed._replace(query=clean_query)
    return urlunparse(clean)


_db_url = _build_engine_url(settings.database_url)

engine = create_async_engine(
    _db_url,
    echo=settings.debug,
    pool_size=10,
    max_overflow=20,
    connect_args={"ssl": True},
)

SessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


async def get_db():
    async with SessionLocal() as session:
        yield session


async def create_tables():
    async with engine.begin() as conn:
        # Enable pgvector extension first
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        await conn.run_sync(Base.metadata.create_all)
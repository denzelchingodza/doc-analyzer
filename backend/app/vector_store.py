from qdrant_client import AsyncQdrantClient
from qdrant_client.models import Distance, VectorParams

from app.config import settings


client = AsyncQdrantClient(
    host=settings.qdrant_host,
    port=settings.qdrant_port,
)


async def ensure_collection() -> None:
    collections = await client.get_collections()
    names = [c.name for c in collections.collections]

    if settings.qdrant_collection not in names:
        await client.create_collection(
            collection_name=settings.qdrant_collection,
            vectors_config=VectorParams(
                size=settings.embedding_dimensions,
                distance=Distance.COSINE,
            ),
        )
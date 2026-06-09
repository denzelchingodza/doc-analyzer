from dataclasses import dataclass

import tiktoken

from app.config import settings
from app.services.parser import ParsedPage


@dataclass
class TextChunk:
    content: str
    page_number: int
    chunk_index: int


def chunk_pages(pages: list[ParsedPage]) -> list[TextChunk]:
    enc = tiktoken.get_encoding("cl100k_base")
    chunks = []
    chunk_index = 0

    for page in pages:
        tokens = enc.encode(page.text)
        start = 0

        while start < len(tokens):
            end = start + settings.chunk_size
            chunk_tokens = tokens[start:end]
            content = enc.decode(chunk_tokens)

            chunks.append(TextChunk(
                content=content,
                page_number=page.page_number,
                chunk_index=chunk_index,
            ))
            chunk_index += 1
            start += settings.chunk_size - settings.chunk_overlap

    return chunks
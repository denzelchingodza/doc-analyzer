from dataclasses import dataclass

import fitz  # PyMuPDF
from docx import Document as DocxDocument


@dataclass
class ParsedPage:
    page_number: int
    text: str


def parse_pdf(file_bytes: bytes) -> list[ParsedPage]:
    pages = []
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page_num, page in enumerate(doc, start=1):
            text = page.get_text().strip()
            if text:
                pages.append(ParsedPage(page_number=page_num, text=text))
    return pages


def parse_docx(file_bytes: bytes) -> list[ParsedPage]:
    import io
    doc = DocxDocument(io.BytesIO(file_bytes))
    pages = []
    current_text = []
    approx_page = 1
    line_count = 0

    for para in doc.paragraphs:
        text = para.text.strip()
        if text:
            current_text.append(text)
            line_count += 1

        if line_count >= 40:
            pages.append(ParsedPage(page_number=approx_page, text="\n".join(current_text)))
            approx_page += 1
            current_text = []
            line_count = 0

    if current_text:
        pages.append(ParsedPage(page_number=approx_page, text="\n".join(current_text)))

    return pages


def parse_file(file_bytes: bytes, file_type: str) -> list[ParsedPage]:
    if file_type == "pdf":
        return parse_pdf(file_bytes)
    elif file_type == "docx":
        return parse_docx(file_bytes)
    else:
        raise ValueError(f"Unsupported file type: {file_type}")
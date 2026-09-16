from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.config import settings
from app.database import create_tables
from app.routers import documents, chat

# 60 requests per hour per IP — keeps costs down and blocks scraping
limiter = Limiter(key_func=get_remote_address, default_limits=["60/hour"])


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()  # enables pgvector + creates all tables
    yield


app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    if exc.status_code == 404:
        return JSONResponse(
            status_code=404,
            content={"error": "not_found", "message": "This endpoint does not exist.", "path": str(request.url.path)},
        )
    if exc.status_code == 405:
        return JSONResponse(
            status_code=405,
            content={"error": "method_not_allowed", "message": f"Method not allowed on {request.url.path}."},
        )
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": "request_error", "message": str(exc.detail)},
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    first = exc.errors()[0] if exc.errors() else {}
    field = " → ".join(str(loc) for loc in first.get("loc", [])) if first else "unknown"
    return JSONResponse(
        status_code=422,
        content={"error": "validation_error", "message": f"Invalid input on field: {field}.", "detail": exc.errors()},
    )
app.add_middleware(SlowAPIMiddleware)

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
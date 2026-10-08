"""
Database Session Configuration
Provides async database engine, session factory, and dependency injection for FastAPI.
"""
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.core.config import settings
from typing import AsyncGenerator
from app.core.logger import get_logger

logger = get_logger(__name__)

# Convert PostgresDsn to string if it's not already
ASYNC_DATABASE_URL = str(settings.DATABASE_URL)

# Ensure the URL uses asyncpg
if not ASYNC_DATABASE_URL.startswith('postgresql+asyncpg'):
    if ASYNC_DATABASE_URL.startswith('postgresql://'):
        ASYNC_DATABASE_URL = ASYNC_DATABASE_URL.replace('postgresql://', 'postgresql+asyncpg://', 1)
    else:
        ASYNC_DATABASE_URL = f"postgresql+asyncpg://{ASYNC_DATABASE_URL}"
echo=False
if settings.LOG_LEVEL == "DEBUG":
    echo=True

# Create async engine (initialized at module import, managed by lifespan)
async_engine = create_async_engine(
    ASYNC_DATABASE_URL,
    echo=echo,  # Set to True only for debugging SQL queries
    pool_pre_ping=True,  # Verify connections before using
    pool_recycle=3600,   # Recycle connections after 1 hour
    pool_size=settings.DB_POOL_SIZE,
    pool_timeout=settings.DB_POOL_TIMEOUT,
    max_overflow=settings.DB_MAX_OVERFLOW,
    pool_use_lifo=True,  # Use LIFO to retrieve most recently used connections
    connect_args={
        "server_settings": {
            "statement_timeout": "30000",  # 30 seconds - prevents hung queries
            "idle_in_transaction_session_timeout": "60000"  # 1 minute - cleanup idle transactions
        }
    }
)

# Slow Query Logging
if settings.ENABLE_SLOW_QUERY_LOGGING:
    import time
    from sqlalchemy import event, Engine

    @event.listens_for(Engine, "before_cursor_execute")
    def before_cursor_execute(conn, cursor, statement, parameters, context, executemany):
        conn.info.setdefault('query_start_time', []).append(time.time())

    @event.listens_for(Engine, "after_cursor_execute")
    def after_cursor_execute(conn, cursor, statement, parameters, context, executemany):
        if not conn.info.get('query_start_time'):
            return
        total = time.time() - conn.info['query_start_time'].pop(-1)
        if total > settings.SLOW_QUERY_THRESHOLD:  # Use configurable threshold
            logger.warning(
                f"Slow query detected: {total:.4f}s",
                extra={
                    "duration_ms": round(total * 1000, 2),
                    "query": statement[:500],  # Truncate for log safety
                    "params": str(parameters)[:200]
                }
            )

# Create async session factory
AsyncSessionLocal = async_sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False
)

# Create base class for models
Base = declarative_base()

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency function that yields database sessions.
    
    Robust cleanup ensures sessions are closed correctly even if 
    exceptions or client disconnects occur.
    """
    session = AsyncSessionLocal()
    try:
        yield session
    except Exception as e:
        # Don't log HTTPExceptions or validation errors as database errors
        from fastapi import HTTPException
        from fastapi.exceptions import RequestValidationError
        
        try:
            # Only attempt rollback if connection is likely still open
            await session.rollback()
        except Exception as rollback_err:
            # Log but skip rollback error if it's a connection issue (InterfaceError)
            logger.debug(f"Rollback failed (possibly expected on disconnect): {rollback_err}")
            
        if not isinstance(e, (HTTPException, RequestValidationError)):
            logger.error(f"Database error: {e}", exc_info=True)
        raise
    finally:
        try:
            await session.close()
        except Exception as close_err:
            # Log but swallow errors during close (e.g. connection already closed)
            # This prevents InterfaceError from shadowing the original exception
            logger.debug(f"Session close failed: {close_err}")

# For backward compatibility
get_session = get_db
async_session = AsyncSessionLocal

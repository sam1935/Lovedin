"""
Database Session Configuration (Backward Compatibility Wrapper)
This file is deprecated. Please import from app.db.session instead.
"""
# Re-export everything from session.py for backward compatibility
from app.db.session import (
    async_engine,
    AsyncSessionLocal,
    Base,
    get_db,
    get_session,
    async_session,
    ASYNC_DATABASE_URL
)

__all__ = [
    'async_engine',
    'AsyncSessionLocal', 
    'Base',
    'get_db',
    'get_session',
    'async_session',
    'ASYNC_DATABASE_URL'
]
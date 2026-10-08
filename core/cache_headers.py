"""
HTTP Cache Headers Utility
Provides helper functions to add cache-control headers to API responses.
"""
from fastapi import Response
from typing import Optional


def set_cache_headers(
    response: Response,
    max_age: int = 3600,
    public: bool = True,
    immutable: bool = False,
    stale_while_revalidate: Optional[int] = None
):
    """
    Set HTTP cache headers on a FastAPI response.
    
    Args:
        response: FastAPI Response object
        max_age: Cache duration in seconds (default: 1 hour)
        public: Whether cache can be shared publicly (default: True)
        immutable: Whether resource never changes (default: False)
        stale_while_revalidate: Seconds to serve stale content while revalidating
    
    Examples:
        # Cache for 24 hours (lookup data)
        set_cache_headers(response, max_age=86400, immutable=True)
        
        # Cache for 1 hour (filter options)
        set_cache_headers(response, max_age=3600)
        
        # Cache with stale-while-revalidate
        set_cache_headers(response, max_age=3600, stale_while_revalidate=60)
    """
    cache_parts = []
    
    # Public or private
    cache_parts.append("public" if public else "private")
    
    # Max age
    cache_parts.append(f"max-age={max_age}")
    
    # Immutable (for truly static resources)
    if immutable:
        cache_parts.append("immutable")
    
    # Stale while revalidate (serve stale content while fetching fresh)
    if stale_while_revalidate:
        cache_parts.append(f"stale-while-revalidate={stale_while_revalidate}")
    
    response.headers["Cache-Control"] = ", ".join(cache_parts)


# Predefined cache configurations
CACHE_24_HOURS = {"max_age": 86400, "immutable": True}  # For lookup data
CACHE_1_HOUR = {"max_age": 3600}  # For filter options
CACHE_5_MINUTES = {"max_age": 300}  # For semi-dynamic data
NO_CACHE = {"max_age": 0, "public": False}  # For user-specific data

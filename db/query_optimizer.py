import time
from contextlib import contextmanager
from functools import wraps
from typing import Callable, Any, List
from sqlalchemy import event
from sqlalchemy.engine import Engine
from app.core.logger import get_logger

logger = get_logger(__name__)

class QueryCounter:
    """
    Context manager to count queries executed within a block.
    Usage:
        with QueryCounter() as counter:
            # run code
        print(counter.count)
    """
    def __init__(self):
        self.count = 0
        self.queries = []
    
    def __enter__(self):
        self.count = 0
        self.queries = []
        event.listen(Engine, "before_cursor_execute", self.callback)
        return self
        
    def __exit__(self, *args):
        event.remove(Engine, "before_cursor_execute", self.callback)
        
    def callback(self, conn, cursor, statement, parameters, context, executemany):
        self.count += 1
        self.queries.append(statement)

def track_queries(warn_threshold: int = 10):
    """
    Decorator to log a warning if a function executes more than `warn_threshold` queries.
    Useful for detecting N+1 problems in specific endpoints or service methods.
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs) -> Any:
            with QueryCounter() as counter:
                start_time = time.time()
                result = await func(*args, **kwargs)
                duration = time.time() - start_time
                
                if counter.count > warn_threshold:
                    msg = f"High query count detected in {func.__name__}: {counter.count} queries in {duration:.2f}s"
                    logger.warning(
                        msg,
                        extra={
                            "query_count": counter.count,
                            "duration": duration,
                            "function": func.__name__
                        }
                    )
                    # Trigger alert
                    from app.utils.alert_helper import create_performance_alert
                    await create_performance_alert(
                        alert_type="EXCESSIVE_QUERIES",
                        message=msg,
                        details={
                            "query_count": counter.count,
                            "duration": duration,
                            "function": func.__name__,
                            "threshold": warn_threshold
                        },
                        severity="MEDIUM"
                    )
                return result
        return wrapper
    return decorator

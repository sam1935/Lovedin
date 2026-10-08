"""
FastAPI Lifespan Context Manager
Handles application startup and shutdown events for database and Redis connections.
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlalchemy import text
from app.db.session import async_engine
from app.db.redis_client import RedisClient
from app.core.logger import get_logger, setup_logging
from app.core.config import settings

logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for FastAPI application.
    Handles initialization and cleanup of database and Redis connections.
    """
    # Startup
    # Initialize logging system first
    setup_logging()
    logger.info("🚀 Starting application...")

    # Initialize Sentry (if configured)
    if settings.SENTRY_DSN and settings.ENABLE_SENTRY:
        import sentry_sdk
        sentry_sdk.init(
            dsn=settings.SENTRY_DSN,
            environment=settings.ENVIRONMENT,
            traces_sample_rate=0.1 if settings.ENVIRONMENT == "production" else 1.0,
            profiles_sample_rate=0.1 if settings.ENVIRONMENT == "production" else 1.0,
            send_default_pii=True,
            # Enable automatic log capture - all Python logging will be sent to Sentry
            enable_logs=True,
        )
        logger.info(f"✅ Sentry initialized with logging enabled (Env: {settings.ENVIRONMENT})")

    
    # Initialize database connection pool
    try:
        # The engine is already created in session.py, just verify connection
        async with async_engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        logger.info("✅ Database engine initialized and connection verified")
        logger.info(f"📊 Database pool size: {async_engine.pool.size()}, Max overflow: {async_engine.pool._max_overflow}")
    except Exception as e:
        logger.error(f"❌ Failed to initialize database: {e}")
        raise
    
    # Initialize Redis singleton
    try:
        redis_client = RedisClient.get_instance()
        if redis_client.connected:
            logger.info(f"✅ Redis client initialized and connected")
        else:
            logger.warning("⚠️  Redis client initialized but not connected (running in fallback mode)")
    except Exception as e:
        logger.error(f"❌ Failed to initialize Redis: {e}")
        # Don't raise - Redis is optional for basic functionality
    
    logger.info("✅ Application startup complete")
    
    # Start monitoring collectors (if enabled)
    if settings.ENABLE_METRICS:
        try:
            from app.monitoring.collectors import start_collectors
            await start_collectors()
            logger.info("✅ Monitoring collectors started")
            
            # Start alert evaluator (if enabled)
            if settings.ENABLE_MONITORING_ALERTS:
                from app.monitoring.alert_evaluator import start_alert_evaluator
                await start_alert_evaluator()
                logger.info("✅ Monitoring alert evaluator started")
        except Exception as e:
            logger.warning(f"⚠️  Failed to start monitoring: {e}")
    
    yield
    
    # Shutdown
    logger.info("🛑 Shutting down application gracefully...")
    
    # Stop monitoring collectors (if enabled)
    if settings.ENABLE_METRICS:
        try:
            # Stop alert evaluator first
            if settings.ENABLE_MONITORING_ALERTS:
                from app.monitoring.alert_evaluator import stop_alert_evaluator
                await stop_alert_evaluator()
                logger.info("✅ Monitoring alert evaluator stopped")
            
            # Stop collectors
            from app.monitoring.collectors import stop_collectors
            await stop_collectors()
            logger.info("✅ Monitoring collectors stopped")
        except Exception as e:
            logger.warning(f"⚠️  Error stopping monitoring: {e}")
    
    # Close WebSocket connections gracefully
    try:
        from app.websocket.socket_manager import socket_manager
        await socket_manager.shutdown()
    except Exception as e:
        logger.error(f"❌ Error closing WebSocket connections: {e}")
    
    # Close database connections
    try:
        await async_engine.dispose()
        logger.info("✅ Database connections closed")
    except Exception as e:
        logger.error(f"❌ Error closing database connections: {e}")
    
    # Close Redis connection
    try:
        redis_client = RedisClient.get_instance()
        await redis_client.close()
        logger.info("✅ Redis connection closed")
    except Exception as e:
        logger.error(f"❌ Error closing Redis connection: {e}")
    
    logger.info("✅ Application shutdown complete")


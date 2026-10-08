import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
from app.core.config import settings
from app.core.logger import get_logger

logger = get_logger(__name__)

async def init_db():
    # Create a connection to the default 'postgres' database
    temp_engine = create_async_engine(
        str(settings.DATABASE_URL).replace(f"/{settings.POSTGRES_DB}", "/postgres"),
        echo=True,
        isolation_level="AUTOCOMMIT"  # Enable autocommit for database creation
    )
    
    try:
        async with temp_engine.connect() as conn:
            # Check if database exists
            result = await conn.execute(
                text("SELECT 1 FROM pg_database WHERE datname = :dbname"),
                {"dbname": settings.POSTGRES_DB}
            )
            db_exists = result.scalar()
            
            if not db_exists:
                try:
                    # Create the database
                    await conn.execute(
                        text(f'CREATE DATABASE "{settings.POSTGRES_DB}"')
                    )
                    logger.info(f"Database {settings.POSTGRES_DB} created successfully")
                except Exception as e:
                    logger.error(f"Error creating database: {e}", exc_info=True)
                    raise
            else:
                logger.info(f"Database {settings.POSTGRES_DB} already exists")
    except Exception as e:
        logger.error(f"Error initializing database: {e}", exc_info=True)
        raise
    finally:
        # Close the connection
        await temp_engine.dispose()

if __name__ == "__main__":
    asyncio.run(init_db())
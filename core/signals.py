"""
Signal handlers for graceful shutdown.
Handles SIGTERM and SIGINT signals to ensure proper cleanup.
"""
import signal
import sys
from app.core.logger import get_logger

logger = get_logger(__name__)

shutdown_initiated = False


def handle_shutdown_signal(signum, frame):
    """Handle shutdown signals (SIGTERM, SIGINT)."""
    global shutdown_initiated
    
    if shutdown_initiated:
        logger.warning("Shutdown already initiated, forcing exit...")
        sys.exit(1)
    
    shutdown_initiated = True
    signal_name = signal.Signals(signum).name
    logger.info(f"Received {signal_name}, initiating graceful shutdown...")
    
    # The actual shutdown is handled by FastAPI lifespan and Gunicorn
    # This just logs the signal reception


def setup_signal_handlers():
    """Setup signal handlers for graceful shutdown."""
    signal.signal(signal.SIGTERM, handle_shutdown_signal)
    signal.signal(signal.SIGINT, handle_shutdown_signal)
    logger.info("Signal handlers registered for SIGTERM and SIGINT")

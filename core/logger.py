"""
Centralized Logger System for LovedIN Application

This module provides a centralized logging configuration that can be used
throughout the application. It supports:
- Structured logging with JSON formatting
- Multiple log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL)
- Console and file output
- Request ID tracking for distributed tracing
- Contextual logging with extra fields
"""

import logging
import sys
import os
import json
from datetime import datetime
from typing import Optional, Dict, Any
from pathlib import Path
import traceback
from app.core.config import settings

class JSONFormatter(logging.Formatter):
    """
    Custom JSON formatter for structured logging.
    Outputs log records as JSON for easy parsing and analysis.
    """
    
    def format(self, record: logging.LogRecord) -> str:
        """Format log record as JSON string"""
        log_data = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }
        
        # Add request ID if available
        if hasattr(record, "request_id"):
            log_data["request_id"] = record.request_id
            
        # Add user ID if available
        if hasattr(record, "user_id"):
            log_data["user_id"] = record.user_id
            
        # Add any extra fields
        if hasattr(record, "extra_fields"):
            log_data["extra"] = record.extra_fields
            
        # Add exception info if present
        if record.exc_info:
            log_data["exception"] = {
                "type": record.exc_info[0].__name__ if record.exc_info[0] else None,
                "message": str(record.exc_info[1]) if record.exc_info[1] else None,
                "traceback": traceback.format_exception(*record.exc_info)
            }
            
        return json.dumps(log_data)


class ColoredConsoleFormatter(logging.Formatter):
    """
    Custom formatter with colors for console output.
    Makes logs easier to read during development.
    """
    
    # ANSI color codes
    COLORS = {
        'DEBUG': '\033[36m',      # Cyan
        'INFO': '\033[32m',       # Green
        'WARNING': '\033[33m',    # Yellow
        'ERROR': '\033[31m',      # Red
        'CRITICAL': '\033[35m',   # Magenta
        'RESET': '\033[0m'        # Reset
    }
    
    def format(self, record: logging.LogRecord) -> str:
        """Format log record with colors"""
        color = self.COLORS.get(record.levelname, self.COLORS['RESET'])
        reset = self.COLORS['RESET']
        
        # Format timestamp
        timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
        
        # Build log message
        log_parts = [
            f"{color}[{record.levelname}]{reset}",
            f"[{timestamp}]",
            f"[{record.name}]",
            f"{record.getMessage()}"
        ]
        
        # Add request ID if available
        if hasattr(record, "request_id"):
            log_parts.insert(3, f"[req:{record.request_id[:8]}]")
            
        # Add user ID if available
        if hasattr(record, "user_id"):
            log_parts.insert(3, f"[user:{record.user_id[:8]}]")
            
        log_message = " ".join(log_parts)
        
        # Add exception info if present
        if record.exc_info:
            log_message += f"\n{reset}{self.formatException(record.exc_info)}"
            
        return log_message


class LoggerAdapter(logging.LoggerAdapter):
    """
    Custom logger adapter that adds contextual information to log records.
    Allows passing request_id, user_id, and other context.
    """
    
    def process(self, msg: str, kwargs: Dict[str, Any]) -> tuple:
        """Process log message and add extra context"""
        # Get extra fields from kwargs
        extra = kwargs.get('extra', {})
        
        # Add context from adapter
        if self.extra:
            extra.update(self.extra)
            
        kwargs['extra'] = extra
        return msg, kwargs


class LoggerConfig:
    """
    Centralized logger configuration.
    Manages logger setup and provides factory methods.
    """
    
    _initialized = False
    _log_level = None
    _log_format = None
    
    @classmethod
    def initialize(
        cls,
        log_level: str = None,  # Will use settings.LOG_LEVEL if None
        log_format: str = "console",  # "console" or "json"
        log_file: Optional[str] = None,
        enable_file_logging: bool = False
    ):
        """
        Initialize the logging system.
        
        Args:
            log_level: Minimum log level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
            log_format: Output format ("console" for colored output, "json" for JSON)
            log_file: Path to log file (optional)
            enable_file_logging: Whether to enable file logging
        """
        if cls._initialized:
            return
        
        # Use settings.LOG_LEVEL if not provided
        if log_level is None:
            log_level = settings.LOG_LEVEL
            
        cls._log_level = getattr(logging, log_level.upper(), logging.INFO)
        cls._log_format = log_format
        
        # Get root logger
        root_logger = logging.getLogger()
        root_logger.setLevel(cls._log_level)
        
        # Remove existing handlers
        root_logger.handlers.clear()
        
        # Console handler
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(cls._log_level)
        
        if log_format == "json":
            console_handler.setFormatter(JSONFormatter())
        else:
            console_handler.setFormatter(ColoredConsoleFormatter())
            
        root_logger.addHandler(console_handler)
        
        # File handler (optional)
        if enable_file_logging:
            if not log_file:
                # Default log file location
                log_dir = Path("logs")
                log_dir.mkdir(exist_ok=True)
                log_file = log_dir / f"lovedin_{datetime.utcnow().strftime('%Y%m%d')}.log"
                
            file_handler = logging.FileHandler(log_file)
            file_handler.setLevel(cls._log_level)
            file_handler.setFormatter(JSONFormatter())  # Always use JSON for file logs
            root_logger.addHandler(file_handler)
        
        # Suppress noisy third-party loggers - set them to WARNING or higher
        logging.getLogger("urllib3").setLevel(logging.WARNING)
        logging.getLogger("boto3").setLevel(logging.WARNING)
        logging.getLogger("botocore").setLevel(logging.WARNING)
        logging.getLogger("s3transfer").setLevel(logging.WARNING)
        logging.getLogger("socketio").setLevel(logging.WARNING)
        logging.getLogger("engineio").setLevel(logging.WARNING)
        
        # Suppress SQLAlchemy engine logs - these are very noisy
        logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
        logging.getLogger("sqlalchemy.pool").setLevel(logging.WARNING)
        logging.getLogger("sqlalchemy.dialects").setLevel(logging.WARNING)
        logging.getLogger("sqlalchemy.orm").setLevel(logging.WARNING)
        
        cls._initialized = True
        
        # Log initialization
        logger = logging.getLogger(__name__)
        logger.info(
            f"Logger initialized - Level: {log_level}, Format: {log_format}, "
            f"File Logging: {enable_file_logging}"
        )
    
    @classmethod
    def get_logger(
        cls,
        name: str,
        request_id: Optional[str] = None,
        user_id: Optional[str] = None,
        **extra_context
    ) -> logging.Logger:
        """
        Get a logger instance with optional context.
        
        Args:
            name: Logger name (typically __name__ of the module)
            request_id: Optional request ID for tracing
            user_id: Optional user ID for context
            **extra_context: Additional context fields
            
        Returns:
            Logger instance or LoggerAdapter with context
        """
        if not cls._initialized:
            cls.initialize()
            
        logger = logging.getLogger(name)
        
        # If context is provided, wrap in adapter
        if request_id or user_id or extra_context:
            context = {}
            if request_id:
                context['request_id'] = request_id
            if user_id:
                context['user_id'] = user_id
            if extra_context:
                context['extra_fields'] = extra_context
                
            return LoggerAdapter(logger, context)
            
        return logger


# Convenience function for getting logger
def get_logger(
    name: str,
    request_id: Optional[str] = None,
    user_id: Optional[str] = None,
    **extra_context
) -> logging.Logger:
    """
    Get a logger instance.
    
    Usage:
        from app.core.logger import get_logger
        
        logger = get_logger(__name__)
        logger.info("Simple log message")
        
        # With context
        logger = get_logger(__name__, request_id="abc123", user_id="user456")
        logger.info("Log with context")
        
        # With extra fields
        logger = get_logger(__name__, operation="user_registration", ip="192.168.1.1")
        logger.info("User registered successfully")
    
    Args:
        name: Logger name (typically __name__)
        request_id: Optional request ID
        user_id: Optional user ID
        **extra_context: Additional context
        
    Returns:
        Logger instance
    """
    return LoggerConfig.get_logger(name, request_id, user_id, **extra_context)


# Initialize logger on module import
def setup_logging():
    """
    Setup logging based on environment variables.
    Called during application startup.
    """
    log_level = settings.LOG_LEVEL
    log_format = settings.LOG_FORMAT  # "console" or "json"
    enable_file_logging = settings.ENABLE_FILE_LOGGING
    log_file = settings.LOG_FILE
    
    LoggerConfig.initialize(
        log_level=log_level,
        log_format=log_format,
        log_file=log_file,
        enable_file_logging=enable_file_logging
    )

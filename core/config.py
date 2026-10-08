import os
from typing import Optional, Dict, Any
from pydantic import PostgresDsn, field_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "postgres")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "lovedin")
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "db")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    DATABASE_URL: Optional[PostgresDsn] = None
    CORS_ORIGINS: list = os.getenv("CORS_ORIGINS", "*").split(",")
    
    # Database Pool Settings
    DB_POOL_SIZE: int = int(os.getenv("DB_POOL_SIZE", "20"))
    DB_MAX_OVERFLOW: int = int(os.getenv("DB_MAX_OVERFLOW", "10"))
    DB_POOL_TIMEOUT: int = int(os.getenv("DB_POOL_TIMEOUT", "30"))

    @field_validator("DATABASE_URL", mode='before')
    @classmethod
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        port = values.data.get("POSTGRES_PORT", "5432")
        return PostgresDsn.build(
            scheme="postgresql+asyncpg",
            username=values.data.get("POSTGRES_USER"),
            password=values.data.get("POSTGRES_PASSWORD"),
            host=values.data.get("POSTGRES_HOST"),
            port=int(port) if port else 5432,
            path=f"/{values.data.get('POSTGRES_DB') or ''}",
        )
    
    # Redis
    REDIS_HOST: str = os.getenv("REDIS_HOST", "redis")
    REDIS_PORT: int = int(os.getenv("REDIS_PORT", "6379"))
    REDIS_PASSWORD: str = os.getenv("REDIS_PASSWORD", "")
    REDIS_DB: int = int(os.getenv("REDIS_DB", "0"))
    REDIS_MAX_CONNECTIONS: int = int(os.getenv("REDIS_MAX_CONNECTIONS", "100"))
    REDIS_POOL_TIMEOUT: int = int(os.getenv("REDIS_POOL_TIMEOUT", "20"))
    REDIS_URL: Optional[str] = None

    @field_validator("REDIS_URL", mode='before')
    @classmethod
    def assemble_redis_connection(cls, v: Optional[str], values: Dict[str, Any]) -> str:
        if isinstance(v, str):
            return v
        return f"redis://:{values.data.get('REDIS_PASSWORD')}@{values.data.get('REDIS_HOST')}:{values.data.get('REDIS_PORT')}/{values.data.get('REDIS_DB')}"

    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # AWS S3
    AWS_ACCESS_KEY_ID: str = os.getenv("AWS_ACCESS_KEY_ID", "")
    AWS_SECRET_ACCESS_KEY: str = os.getenv("AWS_SECRET_ACCESS_KEY", "")
    AWS_REGION: str = os.getenv("AWS_REGION", "us-east-1")
    AWS_S3_BUCKET: str = os.getenv("AWS_S3_BUCKET", "")
    
    # AWS CloudFront
    CLOUDFRONT_DOMAIN: Optional[str] = os.getenv("CLOUDFRONT_DOMAIN", None)
    CLOUDFRONT_KEY_PAIR_ID: Optional[str] = os.getenv("CLOUDFRONT_KEY_PAIR_ID", None)
    CLOUDFRONT_PRIVATE_KEY: Optional[str] = os.getenv("CLOUDFRONT_PRIVATE_KEY", None)

    @field_validator("CLOUDFRONT_PRIVATE_KEY", mode='before')
    @classmethod
    def load_private_key(cls, v: Optional[str], values: Dict[str, Any]) -> Optional[str]:
        """Allow passing either the key content or a path to the key file"""
        if not v:
            return None
        
        # If it looks like a path and exists, read it
        if os.path.exists(v) and os.path.isfile(v):
            try:
                with open(v, 'r') as f:
                    return f.read()
            except Exception:
                return v
        return v
    
    # SendGrid
    SENDGRID_API_KEY: str = os.getenv("SENDGRID_API_KEY", "")
    SENDGRID_FROM_EMAIL: str = os.getenv("SENDGRID_FROM_EMAIL", "")
    SENDGRID_FROM_NAME: str = os.getenv("SENDGRID_FROM_NAME", "LovedIn")
    
    # Twilio
    TWILIO_ACCOUNT_SID: str = os.getenv("TWILIO_ACCOUNT_SID", "")
    TWILIO_AUTH_TOKEN: str = os.getenv("TWILIO_AUTH_TOKEN", "")
    TWILIO_FROM_PHONE: str = os.getenv("TWILIO_FROM_PHONE", "")
    TWILIO_MESSAGING_SERVICE_SID: str = os.getenv("TWILIO_MESSAGING_SERVICE_SID", "")
    
    # Google OAuth
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    GOOGLE_REDIRECT_URI: str = os.getenv("GOOGLE_REDIRECT_URI", "")
    
    # Facebook OAuth
    FACEBOOK_CLIENT_ID: str = os.getenv("FACEBOOK_CLIENT_ID", "")
    FACEBOOK_CLIENT_SECRET: str = os.getenv("FACEBOOK_CLIENT_SECRET", "")
    FACEBOOK_REDIRECT_URI: str = os.getenv("FACEBOOK_REDIRECT_URI", "")
    
    # Apple OAuth
    APPLE_CLIENT_ID: str = os.getenv("APPLE_CLIENT_ID", "")
    APPLE_CLIENT_ID_IOS: str = os.getenv("APPLE_CLIENT_ID_IOS", "")
    APPLE_CLIENT_ID_WEB: str = os.getenv("APPLE_CLIENT_ID_WEB", "")
    APPLE_TEAM_ID: str = os.getenv("APPLE_TEAM_ID", "")
    APPLE_KEY_ID: str = os.getenv("APPLE_KEY_ID", "")
    APPLE_PRIVATE_KEY: str = os.getenv("APPLE_PRIVATE_KEY", "")
    APPLE_REDIRECT_URI: str = os.getenv("APPLE_REDIRECT_URI", "")

    @field_validator("APPLE_PRIVATE_KEY", mode='before')
    @classmethod
    def load_apple_private_key(cls, v: Optional[str], values: Dict[str, Any]) -> str:
        if not v:
            return ""
            
        # If it looks like a path and exists, read it
        if os.path.exists(v) and os.path.isfile(v):
            try:
                with open(v, 'r') as f:
                    return f.read()
            except Exception:
                pass
        
        # Replace literal \n with actual newlines if present
        if "\\n" in v:
            v = v.replace("\\n", "\n")
            
        # Ensure correct PEM formatting
        v = v.strip()
        if "-----BEGIN PRIVATE KEY-----" in v:
             return v
             
        return v

    @property
    def APPLE_ALLOWED_AUDIENCES(self):
        audiences = []
        if self.APPLE_CLIENT_ID:
            audiences.extend([x.strip() for x in self.APPLE_CLIENT_ID.split(",") if x.strip()])
        if self.APPLE_CLIENT_ID_IOS:
             audiences.extend([x.strip() for x in self.APPLE_CLIENT_ID_IOS.split(",") if x.strip()])
        if self.APPLE_CLIENT_ID_WEB:
             audiences.extend([x.strip() for x in self.APPLE_CLIENT_ID_WEB.split(",") if x.strip()])
        return list(set(audiences))
    
    # Firebase
    FIREBASE_CREDENTIALS_PATH: Optional[str] = os.getenv("FIREBASE_CREDENTIALS_PATH", None)

    # Stripe
    STRIPE_SECRET_KEY: str = os.getenv("STRIPE_SECRET_KEY", "")
    STRIPE_PUBLISHABLE_KEY: str = os.getenv("STRIPE_PUBLISHABLE_KEY", "")
    STRIPE_WEBHOOK_SECRET: str = os.getenv("STRIPE_WEBHOOK_SECRET", "")
    
    # Payment Redirect URLs
    PAYMENT_SUCCESS_URL: str = os.getenv("PAYMENT_SUCCESS_URL", "https://lovedin.net/payment/success")
    PAYMENT_CANCEL_URL: str = os.getenv("PAYMENT_CANCEL_URL", "https://lovedin.net/payment/cancel")

    # RevenueCat
    REVENUECAT_SECRET_KEY: str = os.getenv("REVENUECAT_SECRET_KEY", "")
    REVENUECAT_WEBHOOK_AUTH_TOKEN: str = os.getenv("REVENUECAT_WEBHOOK_AUTH_TOKEN", "")

    # Apple In-App Purchase — Subscription Key (for signing Promotional Offers)
    # Create at: App Store Connect → Users and Access → Integrations → In-App Purchase
    APPLE_IAP_KEY_ID: str = os.getenv("APPLE_IAP_KEY_ID", "")
    APPLE_IAP_PRIVATE_KEY: str = os.getenv("APPLE_IAP_PRIVATE_KEY", "")  # PEM content or file path
    APPLE_BUNDLE_ID: str = os.getenv("APPLE_BUNDLE_ID", "")  # e.g. com.lovedin.app

    @field_validator("APPLE_IAP_PRIVATE_KEY", mode="before")
    @classmethod
    def load_iap_private_key(cls, v: Optional[str], values: Dict[str, Any]) -> str:
        if not v:
            return ""
        if os.path.exists(v) and os.path.isfile(v):
            try:
                with open(v, "r") as f:
                    return f.read()
            except Exception:
                pass
        if "\\n" in v:
            v = v.replace("\\n", "\n")
        return v.strip()

    # PayPal
    PAYPAL_MODE: str = os.getenv("PAYPAL_MODE", "live")
    PAYPAL_SANDBOX_CLIENT_ID: str = os.getenv("PAYPAL_SANDBOX_CLIENT_ID", "")
    PAYPAL_SANDBOX_CLIENT_SECRET: str = os.getenv("PAYPAL_SANDBOX_CLIENT_SECRET", "")
    PAYPAL_LIVE_CLIENT_ID: str = os.getenv("PAYPAL_LIVE_CLIENT_ID", "")
    PAYPAL_LIVE_CLIENT_SECRET: str = os.getenv("PAYPAL_LIVE_CLIENT_SECRET", "")

    @property
    def PAYPAL_CLIENT_ID(self) -> str:
        if self.PAYPAL_MODE == "live":
            return self.PAYPAL_LIVE_CLIENT_ID
        return self.PAYPAL_SANDBOX_CLIENT_ID

    @property
    def PAYPAL_CLIENT_SECRET(self) -> str:
        if self.PAYPAL_MODE == "live":
            return self.PAYPAL_LIVE_CLIENT_SECRET
        return self.PAYPAL_SANDBOX_CLIENT_SECRET

    # Media Settings
    MEDIA_APPROVAL_REQUIRED: bool = os.getenv("MEDIA_APPROVAL_REQUIRED", "false").lower() == "true"
    
    # Photo Verification
    PHOTO_ENCRYPTION_KEY: str = os.getenv("PHOTO_ENCRYPTION_KEY", "")
    PHOTO_VERIFICATION_SQS_URL: str = os.getenv("PHOTO_VERIFICATION_SQS_URL", "https://sqs.us-east-1.amazonaws.com/735235878501/event_driven")
    
    # Web Config
    WEB_BASE_URL: str = os.getenv("WEB_BASE_URL", "https://lovedin.net")
    APP_LOGO_URL: str = os.getenv("APP_LOGO_URL", "https://lovedin.net/logo/lovedin_icon.svg")
    
    # Logging Configuration
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "ERROR")
    LOG_FORMAT: str = os.getenv("LOG_FORMAT", "console")  # "console" or "json"
    ENABLE_FILE_LOGGING: bool = os.getenv("ENABLE_FILE_LOGGING", "false").lower() == "true"
    LOG_FILE: Optional[str] = os.getenv("LOG_FILE", None)

    # Observability
    SENTRY_DSN: Optional[str] = os.getenv("SENTRY_DSN", None)
    ENABLE_SENTRY: bool = os.getenv("ENABLE_SENTRY", "false").lower() == "true"
    ENABLE_METRICS: bool = os.getenv("ENABLE_METRICS", "false").lower() == "true"
    ENABLE_MONITORING_ALERTS: bool = os.getenv("ENABLE_MONITORING_ALERTS", "false").lower() == "true"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Monitoring Alert Thresholds
    CPU_ALERT_THRESHOLD: int = int(os.getenv("CPU_ALERT_THRESHOLD", "80"))
    MEMORY_ALERT_THRESHOLD: int = int(os.getenv("MEMORY_ALERT_THRESHOLD", "85"))
    ERROR_RATE_THRESHOLD: float = float(os.getenv("ERROR_RATE_THRESHOLD", "0.05"))
    
    # Slow Query Detection
    SLOW_QUERY_THRESHOLD: float = float(os.getenv("SLOW_QUERY_THRESHOLD", "0.3" if os.getenv("ENVIRONMENT", "development") == "production" else "0.1"))
    SLOW_QUERY_ALERT_RATE_LIMIT: int = int(os.getenv("SLOW_QUERY_ALERT_RATE_LIMIT", "60"))  # seconds
    ENABLE_SLOW_QUERY_LOGGING: bool = os.getenv("ENABLE_SLOW_QUERY_LOGGING", "false").lower() == "true"

    # LLM Configuration (LiteLLM)
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY", None)
    LLM_MODEL: str = os.getenv("LLM_MODEL", "gpt-4o-mini")
    LLM_MAX_TOKENS: int = int(os.getenv("LLM_MAX_TOKENS", "1000"))
    LLM_TEMPERATURE: float = float(os.getenv("LLM_TEMPERATURE", "0.7"))



    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"  # This will ignore any extra fields in the environment

settings = Settings()
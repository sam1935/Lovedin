# JWT and OAuth config for auth system
import os

class AuthConfig:
    SECRET_KEY = os.getenv("AUTH_SECRET_KEY", "your_secret_key")
    REFRESH_SECRET_KEY = os.getenv("REFRESH_SECRET_KEY", "your_refresh_secret_key")
    JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))  # 15 minutes
    REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", 10))  # 10 days
    
    # OAuth client IDs, secrets, redirect URIs (should be set in env)
    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
    GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
    GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "")
    FACEBOOK_CLIENT_ID = os.getenv("FACEBOOK_CLIENT_ID", "")
    FACEBOOK_CLIENT_SECRET = os.getenv("FACEBOOK_CLIENT_SECRET", "")
    FACEBOOK_REDIRECT_URI = os.getenv("FACEBOOK_REDIRECT_URI", "")
    APPLE_CLIENT_ID = os.getenv("APPLE_CLIENT_ID", "")
    APPLE_CLIENT_ID_IOS = os.getenv("APPLE_CLIENT_ID_IOS", "")
    APPLE_CLIENT_ID_WEB = os.getenv("APPLE_CLIENT_ID_WEB", "")
    
    APPLE_TEAM_ID = os.getenv("APPLE_TEAM_ID", "")
    APPLE_KEY_ID = os.getenv("APPLE_KEY_ID", "")
    APPLE_PRIVATE_KEY = os.getenv("APPLE_PRIVATE_KEY", "")
    APPLE_REDIRECT_URI = os.getenv("APPLE_REDIRECT_URI", "")

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

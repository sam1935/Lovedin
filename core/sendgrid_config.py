import os

class SendGridConfig:
    API_KEY = os.getenv("SENDGRID_API_KEY", "")
    FROM_EMAIL = os.getenv("SENDGRID_FROM_EMAIL", "")
    FROM_NAME = os.getenv("SENDGRID_FROM_NAME", "LovedIn")

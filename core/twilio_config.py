import os

class TwilioConfig:
    ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
    AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
    FROM_PHONE = os.getenv("TWILIO_FROM_PHONE", "")
    MESSAGING_SERVICE_SID = os.getenv("TWILIO_MESSAGING_SERVICE_SID", "")

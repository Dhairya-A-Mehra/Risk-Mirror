import os
from cryptography.fernet import Fernet
from dotenv import load_dotenv

# Ensure this runs to load the .env file from the project root
load_dotenv(dotenv_path="../../.env")


class EncryptionService:
    def __init__(self):
        key = os.getenv("ENCRYPTION_KEY")
        if not key:
            raise ValueError("ENCRYPTION_KEY not found in environment variables")
        self.fernet = Fernet(key.encode())

    def encrypt(self, data: str) -> bytes:
        return self.fernet.encrypt(data.encode())

    def decrypt(self, encrypted_data: bytes) -> str:
        return self.fernet.decrypt(encrypted_data).decode()


# Helper to generate a new key one time if needed
# To run: python -c 'from app.encryption_service import generate_key; generate_key()'
def generate_key():
    key = Fernet.generate_key()
    print(f"Your new encryption key is: {key.decode()}")

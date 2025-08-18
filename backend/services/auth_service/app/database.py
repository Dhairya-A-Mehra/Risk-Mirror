import os
import socket
from sqlalchemy import create_engine
from sqlalchemy.engine.url import make_url
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Get the original Supabase URL from your .env file
ORIGINAL_DATABASE_URL = os.getenv("DATABASE_URL")
if not ORIGINAL_DATABASE_URL:
    raise ValueError("DATABASE_URL not found in environment variables")

# --- THIS IS THE CRITICAL FIX ---
# We will resolve the hostname to an IPv4 address before connecting.
try:
    # Parse the original URL into its components
    url_object = make_url(ORIGINAL_DATABASE_URL)

    # Get the IPv4 address of the hostname
    # This forces the resolution to bypass Docker's IPv6 issue
    ipv4_address = socket.gethostbyname(url_object.host)

    # Rebuild the URL object with the resolved IP address
    url_object = url_object._replace(host=ipv4_address)

    # Convert the URL object back to a string for the engine
    SQLALCHEMY_DATABASE_URL = str(url_object)

    print(
        f"Successfully resolved hostname to IPv4. Connecting to: {SQLALCHEMY_DATABASE_URL}"
    )

except socket.gaierror:
    print(
        f"CRITICAL ERROR: Could not resolve hostname from URL: {ORIGINAL_DATABASE_URL}"
    )
    raise

# --- The rest of the file is the same as before ---
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Dependency to get a DB session in API endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

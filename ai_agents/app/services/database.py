# app/services/database.py
import os
from pymongo import MongoClient
from pymongo.database import Database

# Singleton pattern to manage a single database connection
client: MongoClient = None
db: Database = None

def connect_to_mongodb():
    global client, db
    if client is None:
        print("--- Connecting to MongoDB ---")
        mongodb_uri = os.getenv("MONGODB_URI")
        db_name = os.getenv("MONGODB_DB_NAME")
        if not mongodb_uri or not db_name:
            raise ValueError("MONGODB_URI and MONGODB_DB_NAME must be set in .env")
        
        client = MongoClient(mongodb_uri)
        db = client[db_name]
        print("--- MongoDB Connection Successful ---")

def get_db() -> Database:
    if db is None:
        connect_to_mongodb()
    return db

def close_mongodb_connection():
    global client
    if client:
        client.close()
        print("--- MongoDB Connection Closed ---")
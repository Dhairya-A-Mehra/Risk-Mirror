# app/services/redis_client.py
import os
import redis

# Singleton for Redis connection
redis_client = None

def get_redis_connection():
    global redis_client
    if redis_client is None:
        print("--- Connecting to Redis ---")
        redis_url = os.getenv("REDIS_URL")
        if not redis_url:
            raise ValueError("REDIS_URL must be set in .env")
        
        redis_client = redis.from_url(redis_url, decode_responses=True) # decode_responses=True is important for strings
        print("--- Redis Connection Successful ---")
    return redis_client
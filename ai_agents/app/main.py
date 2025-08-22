# app/main.py
import os
import logging
from fastapi import FastAPI, HTTPException, Security
from fastapi.security import APIKeyHeader
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from langchain_core.messages import HumanMessage

from app.schemas import ChatRequest, ChatResponse
from app.graph import create_agentic_graph
from app.services.database import connect_to_mongodb, close_mongodb_connection
from app.services.redis_client import get_redis_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    load_dotenv()
    connect_to_mongodb()
    get_redis_connection()
    yield
    close_mongodb_connection()

app = FastAPI(title="Risk Mirror Agent Server", lifespan=lifespan)
agent_graph = create_agentic_graph()
redis_client = get_redis_connection()

API_KEY = os.getenv("APP_API_KEY")
api_key_header = APIKeyHeader(name="X-API-KEY", auto_error=False)

async def get_api_key(api_key: str = Security(api_key_header)):
    if api_key == API_KEY:
        return api_key
    raise HTTPException(status_code=403, detail="Invalid API Key")

@app.post("/chat", response_model=ChatResponse, tags=["Chat"])
async def chat_endpoint(request: ChatRequest, api_key: str = Security(get_api_key)):
    cache_key = f"chat:{request.user_id}:{request.query}"
    cached_response = redis_client.get(cache_key)
    if cached_response:
        print("--- CACHE HIT ---")
        return ChatResponse(response=cached_response)

    print("--- CACHE MISS ---")
    initial_state = {
        "user_id": request.user_id,
        "messages": [HumanMessage(content=request.query)],
        "agent_responses": []
    }
    
    try:
        final_state = agent_graph.invoke(initial_state)
        final_response = final_state['messages'][-1].content
        redis_client.set(cache_key, final_response, ex=3600)
        return ChatResponse(response=final_response)
    except Exception as e:
        print(f"Error invoking graph: {e}")
        raise HTTPException(status_code=500, detail="Error processing your request.")
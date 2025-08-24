# app/main.py
import os
import logging
from fastapi import FastAPI, HTTPException, Security, Request
from fastapi.security import APIKeyHeader
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from langchain_core.messages import HumanMessage
import redis

# --- Import your application components ---
from app.schemas import ChatRequest, ChatResponse
from app.graph import create_agentic_graph
from app.services.database import connect_to_mongodb, close_mongodb_connection
from app.services.redis_client import get_redis_connection

# --- Application Lifecycle (Startup and Shutdown) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Code to run on startup
    print("--- FastAPI App Startup ---")
    load_dotenv()
    connect_to_mongodb()
    get_redis_connection() # Initializes the Redis client
    print("--- Startup Complete ---")
    yield
    # Code to run on shutdown
    print("--- FastAPI App Shutdown ---")
    close_mongodb_connection()
    print("--- Shutdown Complete ---")


# --- Initialize the FastAPI App and Core Components ---
app = FastAPI(
    title="Risk Mirror Agent Server",
    description="The central AI brain for the Risk Mirror application.",
    lifespan=lifespan
)

# Create the graph and get the Redis client *after* load_dotenv has run
agent_graph = create_agentic_graph()
redis_client = get_redis_connection()

# --- Security Configuration ---
API_KEY = os.getenv("APP_API_KEY")
api_key_header = APIKeyHeader(name="X-API-KEY", auto_error=False)

async def get_api_key(api_key: str = Security(api_key_header)):
    """Validates the API key from the request header."""
    if api_key == API_KEY:
        return api_key
    raise HTTPException(status_code=403, detail="Invalid or missing API Key")

# --- API Endpoints ---
@app.get("/", tags=["Health Check"])
def health_check():
    return {"status": "ok", "message": "Agent Server is running"}

@app.post("/chat", response_model=ChatResponse, tags=["Chat"])
async def chat_endpoint(request: ChatRequest, api_key: str = Security(get_api_key)):
    """
    Main endpoint for the chatbot. Receives a query, checks the cache,
    and invokes the agentic graph to get a response.
    """
    print(f"--- Received chat request for user: {request.user_id} ---")
    
    # --- Step 1: Check Redis Cache ---
    cache_key = f"chat_response:{request.user_id}:{request.query}"
    try:
        cached_response = redis_client.get(cache_key)
        if cached_response:
            print("--- CACHE HIT ---")
            return ChatResponse(response=cached_response)
    except redis.exceptions.ConnectionError as e:
        print(f"--- REDIS WARNING: Could not connect to cache. {e} ---")
    
    print("--- CACHE MISS ---")

    # --- Step 2: Prepare and Invoke the Graph ---
    initial_state = {
        "user_id": request.user_id,
        "messages": [HumanMessage(content=request.query)],
        "agent_responses": {}
    }
    
    try:
        # Run the LangGraph to get the final state
        final_state = agent_graph.invoke(initial_state)
        # The final answer is the last message in the history
        final_response = final_state['messages'][-1].content

        # --- Step 3: Store the new response in Redis Cache ---
        try:
            redis_client.set(cache_key, final_response, ex=3600) # Cache for 1 hour
            print("--- Response stored in cache ---")
        except redis.exceptions.ConnectionError as e:
            print(f"--- REDIS WARNING: Could not store response in cache. {e} ---")
            
        return ChatResponse(response=final_response)
        
    except Exception as e:
        logging.error(f"Error invoking agent graph for user {request.user_id}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="An error occurred while processing your request.")
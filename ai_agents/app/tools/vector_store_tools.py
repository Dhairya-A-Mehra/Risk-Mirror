# app/tools/vector_store_tools.py
from langchain_core.tools import tool
from langchain_openai import OpenAIEmbeddings
from langchain_redis import RedisVectorStore
from app.services.redis_client import get_redis_connection
import os

# This would be the name of your index in Redis
REDIS_INDEX_NAME = "risk_mirror_docs"

# We initialize the embedding model and vector store once
embedding_model = None
redis_vector_store = None

def _initialize_vector_store():
    """Initializes the vector store connection if it doesn't exist."""
    global embedding_model, redis_vector_store
    if redis_vector_store is None:
        print("--- Initializing Redis Vector Store Connection ---")
        
        # We need an embedding model to convert text to vectors
        embedding_model = OpenAIEmbeddings(model="text-embedding-3-small")
        
        # Connect to your Redis instance
        redis_url = os.getenv("REDIS_URL")
        if not redis_url:
            raise ValueError("REDIS_URL must be set in .env to use the vector store.")
            
        redis_vector_store = RedisVectorStore.from_existing_index(
            embedding=embedding_model,
            index_name=REDIS_INDEX_NAME,
            redis_url=redis_url
        )
        print("--- Redis Vector Store Initialized ---")

@tool
def search_financial_documents(query: str) -> list[dict]:
    """
    Searches a knowledge base of financial documents, news articles, and reports to answer questions.
    Use this for questions about market trends, financial regulations, or investment strategies.
    """
    print(f"--- TOOL: Searching vector store for query: '{query}' ---")
    try:
        _initialize_vector_store()
        
        # Perform a similarity search
        # This finds the most relevant document chunks based on the user's query
        results = redis_vector_store.similarity_search(query, k=3) # Get top 3 results
        
        # Format the results to be clean for the LLM
        return [
            {"source": doc.metadata.get("source", "Unknown"), "content": doc.page_content}
            for doc in results
        ]
    except Exception as e:
        # This can happen if the Redis index doesn't exist yet
        print(f"--- ERROR: Could not search vector store. Has it been populated? Error: {e} ---")
        return [{"error": "Knowledge base is currently unavailable."}]
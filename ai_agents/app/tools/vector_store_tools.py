# app/tools/vector_store_tools.py
import os
import json
from langchain_core.tools import tool
from langchain_openai import OpenAIEmbeddings
from langchain_redis import RedisVectorStore

REDIS_INDEX_NAME = "risk_mirror_docs"
redis_vector_store = None # Global variable to cache the connection

def _get_vector_store():
    """Initializes and returns the Redis vector store client."""
    global redis_vector_store
    if redis_vector_store is None:
        print("--- Initializing Redis Vector Store Connection ---")
        redis_url = os.getenv("REDIS_URL")
        if not redis_url:
            raise ValueError("REDIS_URL must be set in .env")
        
        embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
        
        redis_vector_store = RedisVectorStore.from_existing_index(
            embedding=embeddings,
            index_name=REDIS_INDEX_NAME,
            redis_url=redis_url,
        )
    return redis_vector_store

@tool
def search_financial_knowledge_base(query: str) -> str:
    """
    Searches a knowledge base of financial documents for specific information.
    Use this to answer user questions about financial concepts, strategies, or regulations.
    Returns a JSON string of the most relevant document snippets.
    """
    print(f"--- TOOL: Searching vector store for query: '{query}' ---")
    try:
        vector_store = _get_vector_store()
        
        # This performs the similarity search in Redis
        results = vector_store.similarity_search(query, k=2) # Get top 2 results
        
        if not results:
            return "No relevant information found in the knowledge base."
            
        # Format the results cleanly for the LLM
        formatted_results = [
            {"source": doc.metadata.get("source", "Internal Document"), "content": doc.page_content}
            for doc in results
        ]
        return json.dumps(formatted_results, indent=2)

    except Exception as e:
        print(f"--- ERROR: Could not search vector store. Error: {e} ---")
        return json.dumps({"error": "Knowledge base is currently unavailable."})
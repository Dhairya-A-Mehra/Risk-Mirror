# app/tools/general_tools.py
from langchain_core.tools import tool
import os
import requests
import json

# You would need an API key for a search service like Tavily or Serper
SEARCH_API_KEY = os.getenv("SEARCH_API_KEY")

@tool
def web_search(query: str) -> str:
    """
    Performs a web search to find up-to-date information on news, events, or general knowledge.
    Use this when the user asks about something very recent or outside the scope of the financial database.
    """
    print(f"--- TOOL: Performing web search for query: '{query}' ---")

    if not SEARCH_API_KEY:
        print("--- WARNING: SEARCH_API_KEY not found. Returning mock search results. ---")
        return "Mock Search Result: According to recent news, market sentiment is cautiously optimistic due to stable inflation reports."

    try:
        # Example using Serper.dev API (a cheap and fast Google Search API)
        url = "https://google.serper.dev/search"
        payload = json.dumps({"q": query})
        headers = {'X-API-KEY': SEARCH_API_KEY, 'Content-Type': 'application/json'}
        
        response = requests.post(url, headers=headers, data=payload)
        response.raise_for_status()
        results = response.json()
        
        # Extract the most relevant snippets for the LLM
        if "organic" in results and results["organic"]:
            snippets = [
                f"Title: {item.get('title', '')}\nSnippet: {item.get('snippet', '')}"
                for item in results["organic"][:3] # Get top 3 results
            ]
            return "\n\n".join(snippets)
        return "No relevant search results found."
        
    except requests.exceptions.RequestException as e:
        print(f"--- ERROR: Failed to perform web search. Error: {e} ---")
        return "Error: Could not connect to the web search service."
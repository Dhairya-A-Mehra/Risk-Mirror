# app/tools/financial_tools.py
from langchain_core.tools import tool
import os
import requests # You might need to run: pip install requests

# It's good practice to get API keys from the environment
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

@tool
def get_real_time_stock_price(symbol: str) -> dict:
    """
    Fetches the real-time stock price for a given stock symbol (e.g., 'AAPL', 'MSFT').
    """
    print(f"--- TOOL: Fetching real-time stock price for {symbol} ---")
    
    if not FINNHUB_API_KEY:
        print("--- WARNING: FINNHUB_API_KEY not found. Returning mock data. ---")
        return {"symbol": symbol, "price": 150.75, "change": 2.5, "status": "mock"}

    try:
        # Example using Finnhub.io API
        url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_API_KEY}"
        response = requests.get(url)
        response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)
        data = response.json()
        
        return {
            "symbol": symbol,
            "price": data.get('c'), # Current price
            "change": data.get('d'), # Change
            "percent_change": data.get('dp'), # Percent change
            "status": "live"
        }
    except requests.exceptions.RequestException as e:
        print(f"--- ERROR: Failed to fetch stock price for {symbol}. Error: {e} ---")
        return {"error": f"Could not retrieve stock price for {symbol}."}
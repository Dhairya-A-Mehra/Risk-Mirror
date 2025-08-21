from langchain_core.tools import tool

@tool
def get_user_financial_data(user_id: str) -> dict:
    """
    Fetches the user's key financial metrics...
    """
    print(f"--- TOOL CALLED: Fetching financial data for user_id: {user_id} ---")
    
    mock_data = {
        "user_id": user_id,
        "credit_score": 750,
        "investment_portfolio_value": 52350.75,
        "monthly_spending_average": 2100.50,
        "debt_to_income_ratio": 0.35
    }
    return mock_data 

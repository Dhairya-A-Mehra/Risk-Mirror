# app/tools/database_tools.py
from langchain_core.tools import tool
from bson import ObjectId
from app.services.database import get_db

@tool
def get_user_context(user_id: str) -> dict:
    """
    Fetches the complete user profile and current risk scores from the database.
    Use this to understand the user's current situation before making a routing decision.
    """
    print(f"--- TOOL: Fetching user context for user_id: {user_id} ---")
    db = get_db()
    user = db.users.find_one(
        {"_id": ObjectId(user_id)},
        {"projection": {"passwordHash": 0}} # Exclude password
    )
    if user:
        # Convert ObjectId to string for JSON serialization
        user['_id'] = str(user['_id'])
        return user
    return {"error": "User not found."}

@tool
def get_recent_transactions(user_id: str, limit: int = 5) -> list:
    """
    Fetches the most recent financial transactions for a given user.
    """
    print(f"--- TOOL: Fetching recent transactions for user_id: {user_id} ---")
    db = get_db()
    transactions = list(db.transactions.find(
        {"userId": ObjectId(user_id)}
    ).sort("transactionDate", -1).limit(limit))

    # Convert ObjectIds to strings
    for t in transactions:
        t['_id'] = str(t['_id'])
        t['userId'] = str(t['userId'])
    return transactions

# You can add more tools here, like get_health_logs, etc.
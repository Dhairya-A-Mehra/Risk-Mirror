# app/tools/database_tools.py
import json
from langchain_core.tools import tool
from bson import ObjectId
from app.services.database import get_db

def _serialize_mongo_document(doc):
    """Helper to convert MongoDB documents to JSON-serializable format."""
    if not doc: return None
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            doc[key] = str(value)
    return doc

@tool
def get_user_context(user_id: str) -> dict:
    """Fetches the user's core profile, risk scores, and gamification status."""
    print(f"--- TOOL: Fetching user context for user_id: {user_id} ---")
    db = get_db()
    user = db.users.find_one({"_id": ObjectId(user_id)}, {"projection": {"passwordHash": 0}})
    return _serialize_mongo_document(user) if user else {"error": "User not found."}

# --- THE FIX: ALL TOOLS NOW RETURN A JSON STRING ---

@tool
def get_recent_transactions(user_id: str, limit: int = 5) -> str:
    """Fetches the most recent financial transactions for a given user. Returns a JSON string."""
    print(f"--- TOOL: Fetching recent transactions for user_id: {user_id} ---")
    db = get_db()
    transactions = list(db.transactions.find({"userId": ObjectId(user_id)}).sort("transactionDate", -1).limit(limit))
    
    if not transactions:
        return "No recent transactions found for this user."
        
    serializable_transactions = [_serialize_mongo_document(t) for t in transactions]
    return json.dumps(serializable_transactions, indent=2)

@tool
def get_recent_health_logs(user_id: str, limit: int = 3) -> str:
    """Fetches the most recent daily health logs for a given user. Returns a JSON string."""
    print(f"--- TOOL: Fetching recent health logs for user_id: {user_id} ---")
    db = get_db()
    health_logs = list(db.health_logs.find({"userId": ObjectId(user_id)}).sort("logDate", -1).limit(limit))
    
    if not health_logs:
        return "No recent health logs found for this user."

    serializable_logs = [_serialize_mongo_document(log) for log in health_logs]
    return json.dumps(serializable_logs, indent=2)

@tool
def get_active_plans(user_id: str) -> str:
    """Fetches all active financial, health, or lifestyle plans for a user. Returns a JSON string."""
    print(f"--- TOOL: Fetching active plans for user_id: {user_id} ---")
    db = get_db()
    plans = list(db.plans.find({"userId": ObjectId(user_id), "status": "active"}))
    
    if not plans:
        return "No active plans found for this user."

    serializable_plans = [_serialize_mongo_document(p) for p in plans]
    return json.dumps(serializable_plans, indent=2)
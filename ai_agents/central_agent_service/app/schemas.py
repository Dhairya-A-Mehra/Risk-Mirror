from pydantic import BaseModel

class QueryRequest(BaseModel):
    """The request model for an incoming query from the user."""
    user_id: str
    query: str

class AgentResponse(BaseModel):
    """The response model containing the agent's answer."""
    response: str
    source_agent: str
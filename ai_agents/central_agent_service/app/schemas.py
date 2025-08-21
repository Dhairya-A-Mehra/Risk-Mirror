from pydantic import BaseModel

class QueryRequest(BaseModel):
    
    user_id: str
    query: str

class AgentResponse(BaseModel):
    
    response: str
    source_agent: str

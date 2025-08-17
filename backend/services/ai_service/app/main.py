from fastapi import FastAPI, APIRouter

app = FastAPI(title="AI Service")
router = APIRouter()


@router.get("/")
def read_root():
    return {"service": "AI Service", "status": "running"}


# Placeholder for the main chat endpoint
@router.post("/chat")
def chat_with_aura(query: dict):
    # In a real app, this would invoke the LangGraph agent graph
    user_message = query.get("message", "...")
    empathetic_response = f"I understand you're asking about '{user_message}'. Let's explore that together. How can I help you feel more confident about this?"
    return {"response": empathetic_response}


app.include_router(router)

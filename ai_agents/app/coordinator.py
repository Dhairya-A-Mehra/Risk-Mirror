from dotenv import load_dotenv
load_dotenv()
import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_coordinator_agent():
    prompt = PromptTemplate(
        input_variables=["query", "user_context"],
        template=(
            "You are Risk Mirror's Central AI, a financial, health, and lifestyle expert. You have access to the user's real, up-to-date data below.\n\n"
            "========================\n"
            "USER DATA (use these values directly in your answer):\n\n"
            "{user_context}\n\n"
            "========================\n\n"
            "USER QUESTION: \"{query}\"\n\n"
            "INSTRUCTIONS:\n"
            "- Use the exact values from USER DATA above in your answer. Do NOT use placeholders like [insert value] or ask for information that is already present.\n"
            "- If a value is missing, only then ask for it.\n"
            "- Provide a detailed, step-by-step, actionable answer, using the user's real numbers and goals.\n"
            "- For financial plans, break down the plan month by month, using the user's actual income, expenses, savings, debt, and goals.\n"
            "- For health or lifestyle questions, use the user's health and lifestyle data.\n"
            "- Format your answer with clear headings, bullet points, and calculations where appropriate.\n"
            "- Never repeat the user's question or restate the data; just use it to answer."
        )
    )

    llm = ChatGroq(model="llama3-8b-8192", temperature=0.2)
    return prompt | llm

class UserModel(BaseModel):
    _id: Any
    fullName: str
    email: str
    # Add more fields as needed
    class Config:
        extra = "allow"

class AgentRequest(BaseModel):
    user: UserModel
    message: str

@app.post("/agent")
async def agent_endpoint(payload: AgentRequest):
    user = payload.user
    message = payload.message
    # Compose user context string (customize as needed)
    user_context = f"Name: {user.fullName}, Email: {user.email}"
    # Use all user fields as context, but flatten key financial fields for clarity
    user_dict = user.dict()
    # Try to extract latest survey submission financials if present
    latest_survey = user_dict.get('latestSurvey') or user_dict.get('latestSurveySubmission')
    financial = None
    if latest_survey and isinstance(latest_survey, dict):
        financial = latest_survey.get('financial')
    # Build a context string with all available financial and goal details
    context_lines = []
    context_lines.append("=== USER PROFILE ===")
    context_lines.append(f"Name: {user_dict.get('fullName')}")
    context_lines.append(f"Email: {user_dict.get('email')}")
    context_lines.append("")
    if latest_survey:
        context_lines.append("=== LATEST SURVEY SUBMISSION ===")
        for k, v in latest_survey.items():
            if k == 'financial' and isinstance(v, dict):
                context_lines.append("--- Financial Details ---")
                for fk, fv in v.items():
                    context_lines.append(f"{fk}: {fv}")
            elif isinstance(v, (str, int, float, bool)):
                context_lines.append(f"{k}: {v}")
    context_lines.append("")
    context_lines.append("(Use all the above details to answer. Do NOT ask for info that is already present.)")
    user_context = '\n'.join(context_lines)
    # Run the coordinator agent
    coordinator = create_coordinator_agent()
    answer = coordinator.invoke({"query": message, "user_context": user_context})
    # answer is likely a LangChain LLMResult or similar; extract just the text
    if hasattr(answer, 'content'):
        reply = answer.content.strip()
    elif isinstance(answer, str):
        reply = answer.strip()
    else:
        reply = str(answer)
    # Format output: collapse multiple newlines, trim, and ensure single paragraph
    import re
    import markdown2
    # Add a newline after periods if not already followed by a newline or list
    formatted_reply = re.sub(r'(?<!\n)([.!?])\s+(?=[A-Z0-9])', r'\1\n', reply)
    # Add a newline before Markdown list items
    formatted_reply = re.sub(r'(\d+\.\s)', r'\n\1', formatted_reply)
    # Collapse multiple newlines
    formatted_reply = re.sub(r'\n{2,}', '\n\n', formatted_reply).strip()
    # Convert Markdown to HTML for advanced formatting
    html_reply = markdown2.markdown(formatted_reply)
    return {"reply": html_reply}
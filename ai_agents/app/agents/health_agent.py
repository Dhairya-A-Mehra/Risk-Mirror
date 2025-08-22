# app/agents/health_agent.py
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from app.tools.database_tools import get_recent_health_logs, get_active_plans

def create_health_agent():
    prompt = ChatPromptTemplate.from_messages([
        ("system", 
         "You are a specialized health and wellness assistant. Your role is to provide empathetic and general wellness advice based on the user's query and their health data provided by tools. "
         "You are not a doctor and must not give medical advice. Focus on stress, sleep, and healthy habits."),
        MessagesPlaceholder(variable_name="messages"),
    ])
    llm = ChatGroq(model="llama3-70b-8192", temperature=0.4)
    return prompt | llm.bind_tools([get_recent_health_logs, get_active_plans])
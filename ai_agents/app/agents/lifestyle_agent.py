# app/agents/lifestyle_agent.py
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from app.tools.database_tools import get_active_plans

def create_lifestyle_agent():
    prompt = ChatPromptTemplate.from_messages([
        ("system", 
         "You are a specialized lifestyle and productivity assistant. Your role is to help the user align their daily actions with their long-term goals. "
         "Provide practical advice on scheduling, routines, and work-life balance using the user's active plans as context."),
        MessagesPlaceholder(variable_name="messages"),
    ])
    llm = ChatGroq(model="llama3-70b-8192", temperature=0.5)
    return prompt | llm.bind_tools([get_active_plans])
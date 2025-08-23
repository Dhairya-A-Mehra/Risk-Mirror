# app/agents/health_agent.py
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import Runnable

# Import the specific tools this agent is allowed to use
from app.tools.database_tools import get_recent_health_logs, get_active_plans

def create_health_agent() -> Runnable:
    """Creates the specialized health and wellness agent."""
    
    prompt = ChatPromptTemplate.from_messages([
        (
            "system", 
            "You are a specialized health and wellness assistant. Your role is to provide empathetic and general wellness advice based on the user's query and their health data provided by tools."
            "The user's ID is provided in the human message. You MUST use this exact ID when calling any tool that requires a `user_id`."
            "**CRITICAL RULE:** After a tool has been called and you receive the results, you MUST formulate a final answer based on those results. "
            "If the tool returns an empty result (like no health logs), state that clearly to the user. "
            "DO NOT call the same tool again if you have already received a result for it."
            "**SAFETY RULE:** You are NOT a doctor and MUST NOT provide medical diagnoses. If the user mentions severe symptoms, advise them to consult a medical professional."
        ),
        MessagesPlaceholder(variable_name="messages"),
    ])
    
    # A slightly higher temperature allows for more empathetic and creative wellness suggestions.
    llm = ChatGroq(model="llama3-70b-8192", temperature=0.4)
    
    # Bind the health-specific tools to this agent.
    agent = prompt | llm.bind_tools([get_recent_health_logs, get_active_plans])
    
    return agent
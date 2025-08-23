# app/agents/lifestyle_agent.py
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import Runnable

# Import the specific tools this agent is allowed to use
from app.tools.database_tools import get_active_plans

def create_lifestyle_agent() -> Runnable:
    """Creates the specialized lifestyle and productivity agent."""
    
    prompt = ChatPromptTemplate.from_messages([
        (
            "system", 
            "You are a specialized lifestyle and productivity assistant. Your role is to help the user align their daily actions with their long-term goals."
            "The user's ID is provided in the human message. You MUST use this exact ID when calling any tool that requires a `user_id`."
            "**CRITICAL RULE:** After a tool has been called and you receive the results, you MUST formulate a final answer based on those results. "
            "If the tool returns an empty result (like no active plans), state that clearly to the user. "
            "DO NOT call the same tool again if you have already received a result for it."
        ),
        MessagesPlaceholder(variable_name="messages"),
    ])
    
    # A moderate temperature is good for creative yet practical lifestyle advice.
    llm = ChatGroq(model="llama3-70b-8192", temperature=0.5)
    
    # Bind the lifestyle-specific tools to this agent.
    agent = prompt | llm.bind_tools([get_active_plans])
    
    return agent
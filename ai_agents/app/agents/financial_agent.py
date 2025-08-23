# app/agents/financial_agent.py
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import Runnable

# Import the specific tools this agent is allowed to use
from app.tools.database_tools import get_recent_transactions, get_active_plans

def create_financial_agent() -> Runnable:
    """Creates the specialized financial agent."""
    
    # This prompt is engineered to be very specific about the agent's role and how to use tools.
    prompt = ChatPromptTemplate.from_messages([
        (
            "system", 
            "You are a specialized financial assistant. Your role is to analyze the user's financial situation based on their query and the data provided by the tools."
            "The user's ID is provided in the human message. You MUST use this exact ID when calling any tool that requires a `user_id`."
            "**CRITICAL RULE:** After a tool has been called and you receive the results, you MUST formulate a final answer. "
            "If the tool returns an empty result (like an empty list of transactions), state that clearly to the user. "
            "DO NOT call the same tool again if you have already received a result for it."
        ),
        MessagesPlaceholder(variable_name="messages"),
    ])
    
    # Use a powerful model for complex reasoning, but keep the temperature low for factual answers.
    llm = ChatGroq(model="llama3-70b-8192", temperature=0.2)
    
    # Bind the specific tools this agent is allowed to use.
    # The agent will automatically choose the correct tool based on the user's query.
    agent = prompt | llm.bind_tools([get_recent_transactions, get_active_plans])
    
    return agent
from langchain_groq import ChatGroq
# Import MessagesPlaceholder
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import Runnable
from app.tools.data_access_tools import get_user_financial_data_tool

def create_financial_agent() -> Runnable:
    """Creates the financial agent runnable chain."""
    
    # This new prompt template is designed for conversation
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a specialized financial assistant for the 'Risk Mirror' app. "
                "Your role is to analyze user financial data and provide clear, empathetic, and actionable advice. "
                "You MUST use the 'get_user_financial_data' tool to fetch the user's data before answering. "
                "Once you have the tool's output, provide a final answer to the user. "
                "Do not call the tool more than once for the same query."
            ),
            # This placeholder will be filled with the entire conversation history
            MessagesPlaceholder(variable_name="messages"),
        ]
    )
    
    llm = ChatGroq(
        model_name="llama3-8b-8192", 
        temperature=0
    )
    
    agent = prompt | llm.bind_tools([get_user_financial_data_tool])
    
    return agent
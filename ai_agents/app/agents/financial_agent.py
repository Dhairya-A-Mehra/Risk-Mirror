# app/agents/financial_agent.py
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from app.tools.database_tools import get_recent_transactions
# from app.tools.financial_tools import get_real_time_stock_price

def create_financial_agent():
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a specialized financial assistant. Analyze the user's query and any provided tool outputs to give a helpful financial response."),
        MessagesPlaceholder(variable_name="messages"),
    ])
    llm = ChatGroq(model="llama3-70b-8192", temperature=0.2)
    # Bind the specific tools this agent can use
    return prompt | llm.bind_tools([get_recent_transactions])
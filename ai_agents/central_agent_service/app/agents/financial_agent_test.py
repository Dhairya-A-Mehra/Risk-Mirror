import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
model_name = os.getenv("MODEL", "llama3-8b-8192") 
temperature = float(os.getenv("TEMPERATURE", 0.1)) 

llm = ChatGroq(
    model=model_name,
    temperature=temperature,
    groq_api_key=groq_api_key
)

mock_user_data = {
    "user_id": "user-xyz-987",
    "credit_score": 750,
    "investment_portfolio_value": 52350.75,
    "monthly_spending_average": 2100.50,
    "debt_to_income_ratio": 0.35, 
    "active_loans": ["Student Loan"]
}


financial_prompt = PromptTemplate(
    input_variables=["query", "user_data"],
    template="""
You are a specialized financial assistant for the 'Risk Mirror' app.
Your role is to analyze the user's financial data and provide a clear, empathetic, and actionable answer to their query.

Here is the user's financial data:
{user_data}

Here is the user's query:
{query}

Based on the data provided, generate a helpful and concise response.
Answer:
""",
)

financial_chain = financial_prompt | llm


queries = [
    "How am I doing financially overall?",
    "I want to buy a new car. Based on my data, can I afford a new loan right now?",
    "My monthly spending feels a bit high. Is it a problem given my situation?",
    "Is it a good time for me to invest more money into my portfolio?",
    "Given my student loan, should I focus on paying it off faster or investing more?"
]

print("--- Running Financial Agent Test ---")
for q in queries:
   
    result = financial_chain.invoke({
        "query": q,
        "user_data": mock_user_data
    })
    
    print(f"Query: {q}")
    print(f"Agent's Answer: {result.content.strip()}\n")
    print("-" * 30)

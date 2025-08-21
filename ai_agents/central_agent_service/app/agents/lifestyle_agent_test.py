import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
model_name = os.getenv("MODEL", "llama3-8b-8192")
temperature = float(os.getenv("TEMPERATURE", 0.5)) 

llm = ChatGroq(
    model=model_name,
    temperature=temperature,
    groq_api_key=groq_api_key
)

mock_user_lifestyle_data = {
    "user_id": "user-xyz-987",
    "long_term_goals": [
        "Learn Python for data analysis",
        "Save for a down payment on a house",
        "Improve physical fitness"
    ],
    "calendar_summary_this_week": {
        "work_meetings": 15,
        "personal_appointments": 1, 
        "social_events": 0,
        "dedicated_learning_time": 0
    },
    "social_activity_last_month": "Low (2 social outings reported)"
}


lifestyle_prompt = PromptTemplate(
    input_variables=["query", "user_data"],
    template="""
You are a specialized lifestyle and productivity assistant for the 'Risk Mirror' app.
Your persona is that of an encouraging and practical life coach.
Your goal is to help the user align their daily actions with their long-term goals and improve their work-life balance.

**RULES:**
1.  Analyze the user's goals, calendar, and social data to identify patterns and gaps.
2.  Provide actionable, small steps the user can take. Avoid overwhelming them.
3.  Be positive and focus on building sustainable habits.
4.  Do not give financial or medical advice; if the query is about those topics, gently redirect them to the appropriate agent or professional.

Here is the user's lifestyle data:
{user_data}

Here is the user's query:
{query}

Based on the user's data and query, provide a practical and encouraging response.
Answer:
""",
)

lifestyle_chain = lifestyle_prompt | llm

queries = [
    "I feel like I'm not making any progress on my long-term goals. What can I do?",
    "My schedule is packed with work. How can I find time for myself or my friends?",
    "Suggest a simple plan for next week to help me get back on track with learning Python.",
    "I'm feeling a bit isolated lately. Any suggestions based on my recent activity?",
    "Give me a quick overview of how my current lifestyle aligns with my goals."
]

print("--- Running Lifestyle Agent Test ---")
for q in queries:
    
    result = lifestyle_chain.invoke({
        "query": q,
        "user_data": mock_user_lifestyle_data
    })
    
    print(f"Query: {q}")
    print(f"Agent's Answer: {result.content.strip()}\n")
    print("-" * 30)

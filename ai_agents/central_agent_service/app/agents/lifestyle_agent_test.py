import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate

# --- 1. SETUP ---
# Load environment variables from your .env file
load_dotenv()

# Get Groq API key and model settings from environment variables
groq_api_key = os.getenv("GROQ_API_KEY")
model_name = os.getenv("MODEL", "llama3-8b-8192")
temperature = float(os.getenv("TEMPERATURE", 0.5)) # A moderate temp for creative and practical suggestions

# Initialize the Groq Chat LLM
llm = ChatGroq(
    model=model_name,
    temperature=temperature,
    groq_api_key=groq_api_key
)

# --- 2. MOCK USER LIFESTYLE DATA ---
# This data simulates a busy user who has set goals but whose calendar
# is filled with work, leaving little time for personal growth or social activities.
mock_user_lifestyle_data = {
    "user_id": "user-xyz-987",
    "long_term_goals": [
        "Learn Python for data analysis",
        "Save for a down payment on a house",
        "Improve physical fitness"
    ],
    "calendar_summary_this_week": {
        "work_meetings": 15,
        "personal_appointments": 1, # (Dentist)
        "social_events": 0,
        "dedicated_learning_time": 0
    },
    "social_activity_last_month": "Low (2 social outings reported)"
}


# --- 3. LIFESTYLE AGENT PROMPT ---
# This prompt establishes the agent as a proactive life coach focused on
# productivity, goal alignment, and work-life balance.
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

# --- 4. CREATE THE CHAIN ---
# This chain links our specialized lifestyle prompt with the LLM.
lifestyle_chain = lifestyle_prompt | llm


# --- 5. DUMMY QUERIES FOR TESTING ---
# These queries are designed to test the agent's ability to handle goals, scheduling, and social well-being.
queries = [
    "I feel like I'm not making any progress on my long-term goals. What can I do?",
    "My schedule is packed with work. How can I find time for myself or my friends?",
    "Suggest a simple plan for next week to help me get back on track with learning Python.",
    "I'm feeling a bit isolated lately. Any suggestions based on my recent activity?",
    "Give me a quick overview of how my current lifestyle aligns with my goals."
]

# --- 6. RUN THE AGENT ---
# This loop will run the agent for each query and print the results.
print("--- Running Lifestyle Agent Test ---")
for q in queries:
    # We invoke the chain, passing both the query and the user's lifestyle data
    result = lifestyle_chain.invoke({
        "query": q,
        "user_data": mock_user_lifestyle_data
    })
    
    print(f"Query: {q}")
    print(f"Agent's Answer: {result.content.strip()}\n")
    print("-" * 30)
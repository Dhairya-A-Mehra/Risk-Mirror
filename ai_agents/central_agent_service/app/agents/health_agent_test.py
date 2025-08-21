import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
model_name = os.getenv("MODEL", "llama3-8b-8192")
temperature = float(os.getenv("TEMPERATURE", 0.3))

llm = ChatGroq(
    model=model_name,
    temperature=temperature,
    groq_api_key=groq_api_key
)

mock_user_health_data = {
    "user_id": "user-xyz-987",
    "last_emotion_scan_result": "stressed",
    "avg_sleep_hours_last_week": 5.5,
    "avg_steps_per_day": 4500,
    "reported_stress_level": "high (7/10)",
    "avg_resting_hr": 78 
}

health_prompt = PromptTemplate(
    input_variables=["query", "user_data"],
    template="""
You are a specialized health and wellness assistant for the 'Risk Mirror' app.
Your persona is empathetic, supportive, and encouraging.
Your primary role is to analyze the user's health data and provide general wellness advice.

**IMPORTANT RULES:**
1.  **You are NOT a doctor.** Do not provide medical diagnoses or prescribe treatments.
2.  Your advice must focus on general wellness: stress management (like breathing exercises), sleep hygiene, and light physical activity.
3.  If a user mentions severe symptoms or a medical condition, you MUST advise them to consult a medical professional immediately.
4.  Acknowledge the user's feelings and be supportive in your response.

Here is the user's health data:
{user_data}

Here is the user's query:
{query}

Based on the user's data and query, provide a helpful, safe, and empathetic response.
Answer:
""",
)

health_chain = health_prompt | llm


queries = [
    "I've been feeling really stressed out lately. What does my data say, and what can I do?",
    "My sleep has been terrible. Any tips based on my patterns?",
    "I'm not very active. How can I start exercising more without getting overwhelmed?",
    "I'm worried about my finances, and I think it's affecting my health. What should I do?", 
    "Give me a quick summary of my overall wellness based on the data you have."
]

print("--- Running Health Agent Test ---")
for q in queries:
    
    result = health_chain.invoke({
        "query": q,
        "user_data": mock_user_health_data
    })
    
    print(f"Query: {q}")
    print(f"Agent's Answer: {result.content.strip()}\n")
    print("-" * 30)

import os
import operator
from dotenv import load_dotenv
from typing import TypedDict, Annotated, List
from langchain_core.messages import BaseMessage, HumanMessage
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate, ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import StructuredTool
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode

# --- 1. SETUP & CONFIGURATION ---
print("--- Initializing System ---")
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

# We use two LLM configurations: one for precise routing, one for creative answers
llm_router = ChatGroq(model="llama3-8b-8192", temperature=0.0, groq_api_key=groq_api_key)
llm_creative = ChatGroq(model="llama3-8b-8192", temperature=0.3, groq_api_key=groq_api_key)

# --- 2. MOCK TOOLS WITH DUMMY DATA ---

# Financial Tool Function
def _get_user_financial_data(user_id: str) -> dict:
    # <<< FIX: Added a descriptive docstring. This is what the AI reads.
    """
    Fetches the user's key financial metrics from the database, including credit score, portfolio value, and debt-to-income ratio.
    """
    print(f"--- TOOL CALLED: Fetching financial data for user_id: {user_id} ---")
    return {"credit_score": 750, "portfolio_value": 52350.75, "debt_to_income_ratio": 0.35}

# Health Tool Function
def _get_user_health_data(user_id: str) -> dict:
    # <<< FIX: Added a descriptive docstring. This is what the AI reads.
    """
    Fetches the user's key health metrics from health trackers or user input, including average sleep, stress level, and resting heart rate.
    """
    print(f"--- TOOL CALLED: Fetching health data for user_id: {user_id} ---")
    return {"avg_sleep_hours": 5.5, "reported_stress_level": "high (7/10)", "avg_resting_hr": 78}

# Lifestyle Tool Function
def _get_user_lifestyle_data(user_id: str) -> dict:
    # <<< FIX: Added a descriptive docstring. This is what the AI reads.
    """
    Fetches the user's key lifestyle data, including their long-term goals and a summary of their weekly schedule and social events.
    """
    print(f"--- TOOL CALLED: Fetching lifestyle data for user_id: {user_id} ---")
    return {"long_term_goals": ["Learn Python", "Save for a house"], "work_meetings_this_week": 15, "social_events": 0}

# Create StructuredTool objects from the functions
financial_tool = StructuredTool.from_function(func=_get_user_financial_data, name="get_user_financial_data")
health_tool = StructuredTool.from_function(func=_get_user_health_data, name="get_user_health_data")
lifestyle_tool = StructuredTool.from_function(func=_get_user_lifestyle_data, name="get_user_lifestyle_data")

# A list of ALL tools available in the graph
all_tools = [financial_tool, health_tool, lifestyle_tool]

# --- 3. SPECIALIZED AGENT DEFINITIONS ---

def create_agent(llm, system_prompt: str, tools: list):
    """A helper function to create a conversational agent."""
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        MessagesPlaceholder(variable_name="messages"),
    ])
    return prompt | llm.bind_tools(tools)

financial_agent = create_agent(
    llm_creative,
    "You are a specialized financial assistant. You MUST use the 'get_user_financial_data' tool to get data before answering.",
    [financial_tool]
)
health_agent = create_agent(
    llm_creative,
    "You are a specialized health and wellness assistant. You MUST use the 'get_user_health_data' tool to get data before answering. You are not a doctor.",
    [health_tool]
)
lifestyle_agent = create_agent(
    llm_creative,
    "You are a specialized lifestyle and productivity assistant. You MUST use the 'get_user_lifestyle_data' tool to get data before answering.",
    [lifestyle_tool]
)

# --- 4. LANGGRAPH STATE & NODES ---

class GraphState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]
    next_node: str

def financial_agent_node(state: GraphState):
    print("--- NODE: Running Financial Agent ---")
    result = financial_agent.invoke(state)
    return {"messages": [result], "next_node": "Financial Agent"}

def health_agent_node(state: GraphState):
    print("--- NODE: Running Health Agent ---")
    result = health_agent.invoke(state)
    return {"messages": [result], "next_node": "Health Agent"}

def lifestyle_agent_node(state: GraphState):
    print("--- NODE: Running Lifestyle Agent ---")
    result = lifestyle_agent.invoke(state)
    return {"messages": [result], "next_node": "Lifestyle Agent"}

tool_node = ToolNode(all_tools)

# --- 5. THE CENTRAL COORDINATOR (ROUTER) NODE ---

coordinator_prompt = PromptTemplate(
    input_variables=["query"],
    template="""You are the Central Coordinator Agent. Your job is to route the user's query to the correct specialized agent.
Choose from: 'Financial Agent', 'Health Agent', 'Lifestyle Agent'. Output ONLY the name of the agent.

User Query: {query}
Chosen Agent:""",
)
routing_chain = coordinator_prompt | llm_router

def router_node(state: GraphState):
    print("--- NODE: Central Coordinator (Routing) ---")
    query = state["messages"][0].content
    routing_result = routing_chain.invoke({"query": query})
    routed_to = routing_result.content.strip()
    print(f"--- Coordinator decision: Route to {routed_to} ---")
    return {"next_node": routed_to}

# --- 6. GRAPH EDGES AND COMPILATION ---

def should_continue(state: GraphState):
    if state["messages"][-1].tool_calls:
        return "continue"
    return "end"

def route_to_agent(state: GraphState):
    return state["next_node"]

workflow = StateGraph(GraphState)
workflow.add_node("router", router_node)
workflow.add_node("Financial Agent", financial_agent_node)
workflow.add_node("Health Agent", health_agent_node)
workflow.add_node("Lifestyle Agent", lifestyle_agent_node)
workflow.add_node("tools", tool_node)

workflow.set_entry_point("router")
workflow.add_conditional_edges("router", route_to_agent)
workflow.add_conditional_edges("Financial Agent", should_continue, {"continue": "tools", "end": END})
workflow.add_conditional_edges("Health Agent", should_continue, {"continue": "tools", "end": END})
workflow.add_conditional_edges("Lifestyle Agent", should_continue, {"continue": "tools", "end": END})
workflow.add_conditional_edges("tools", route_to_agent)

app = workflow.compile()
print("--- System Initialized. Graph is compiled and ready. ---")

# --- 7. DUMMY QUERIES & EXECUTION LOOP ---

queries = [
    "Based on my data, is my portfolio doing well?",
    "I've been feeling stressed and not sleeping enough, what should I do?",
    "I have too many work meetings. How can I find time for my goal of learning Python?",
    "I'm so worried about money that it's affecting my health. What should I prioritize?",
    # --- Complex, multi-domain queries ---
    "Given my high debt-to-income ratio and recent high stress levels, what should I focus on to improve both my financial and health situation?",
    "If I want to buy a house in 2 years but my sleep is poor and my portfolio is volatile, what steps should I take?",
    "How can I balance my goal of learning Python, improving my credit score, and reducing my stress from work meetings?",
    "Can you give me a weekly plan that helps me save money, sleep better, and still have time for social events?",
]
user_id = "test-user-123"

for q in queries:
    print("\n" + "="*50)
    print(f"PROCESSING QUERY: \"{q}\"")
    print("="*50)

    initial_message = HumanMessage(content=f"User ID: {user_id}\n\nQuery: {q}")
    initial_state = {"messages": [initial_message]}
    
    final_state = app.invoke(initial_state)
    final_answer = final_state["messages"][-1].content
    
    print("\n--- FINAL AGENT ANSWER ---")
    print(final_answer)
    print("="*50 + "\n")
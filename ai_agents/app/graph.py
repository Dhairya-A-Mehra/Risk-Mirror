# app/graph.py
import operator
import json
from datetime import datetime
from typing import TypedDict, Annotated, List, Union
from langchain_core.messages import BaseMessage, AIMessage, ToolMessage, HumanMessage
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode

# --- Imports ---
from app.coordinator import create_coordinator_agent
from app.agents.financial_agent import create_financial_agent
from app.agents.health_agent import create_health_agent
from app.agents.lifestyle_agent import create_lifestyle_agent
from app.agents.synthesizer_agent import create_synthesizer_agent
from app.tools.database_tools import get_user_context, get_recent_transactions, get_recent_health_logs, get_active_plans

# --- Graph State ---
class GraphState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]
    user_id: str
    # This will now hold responses from each agent branch
    agent_responses: dict

# --- JSON Encoder for Datetime ---
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime): return obj.isoformat()
        return super().default(obj)

# --- Node and Tool Definitions ---
financial_agent = create_financial_agent()
health_agent = create_health_agent()
lifestyle_agent = create_lifestyle_agent()
synthesizer_agent = create_synthesizer_agent()
tools = [get_recent_transactions, get_recent_health_logs, get_active_plans]
tool_node = ToolNode(tools)

# --- Node Functions ---
def coordinator_node(state: GraphState):
    print("--- NODE: Coordinator ---")
    query = state['messages'][0].content
    user_context = get_user_context.invoke({"user_id": state['user_id']})
    
    routing_decision_str = create_coordinator_agent().invoke({
        "query": query, "user_context": json.dumps(user_context, indent=2, cls=DateTimeEncoder)
    }).content
    
    # The coordinator's decision is added to the message history
    return {"messages": [AIMessage(content=routing_decision_str.strip())]}

# A generic node for running any of our specialized agents
def agent_node(state: GraphState, agent, name):
    print(f"--- NODE: Running {name} ---")
    # We pass the initial query and the full message history for context
    result = agent.invoke({"messages": state['messages']})
    
    # If the agent calls tools, we add the tool call to the messages
    if result.tool_calls:
        return {"messages": [result]}
    # If it returns a final answer, we store it in our agent_responses dictionary
    else:
        return {"agent_responses": {**state.get('agent_responses', {}), name: result.content}}

# This node combines all the individual agent responses for the final synthesizer
def synthesizer_node(state: GraphState):
    print("--- NODE: Synthesizer ---")
    query = state['messages'][0].content
    
    final_response = synthesizer_agent.invoke({
        "query": query,
        "agent_responses": json.dumps(state['agent_responses'], indent=2)
    }).content
    return {"messages": [AIMessage(content=final_response)]}


# --- Conditional Routing Logic ---
def router_logic(state: GraphState):
    routing_decision = state['messages'][-1].content
    print(f"--- ROUTER: Coordinator decision is '{routing_decision}' ---")
    
    # This is a simple router for now. It routes to the first agent found.
    # A more complex router could handle parallel forks.
    if "Financial Agent" in routing_decision: return "Financial Agent"
    if "Health Agent" in routing_decision: return "Health Agent"
    if "Lifestyle Agent" in routing_decision: return "Lifestyle Agent"
    
    print("--- ROUTE: No specific agent found, going to synthesizer. ---")
    return "synthesizer" # If no route, go to synthesizer to give a default response

# This router decides what to do after an agent has run
def after_agent_router(state: GraphState):
    last_message = state["messages"][-1]
    if last_message.tool_calls:
        # If the agent requested a tool, we go to the tool node
        return "tools"
    # If the agent is finished, we go to the synthesizer
    return "synthesizer"


# --- The Definitive Multi-Agent Graph ---
def create_agentic_graph():
    workflow = StateGraph(GraphState)

    # Add all nodes to the graph
    workflow.add_node("coordinator", coordinator_node)
    workflow.add_node("Financial Agent", lambda state: agent_node(state, financial_agent, "Financial Agent"))
    workflow.add_node("Health Agent", lambda state: agent_node(state, health_agent, "Health Agent"))
    workflow.add_node("Lifestyle Agent", lambda state: agent_node(state, lifestyle_agent, "Lifestyle Agent"))
    workflow.add_node("tools", tool_node)
    workflow.add_node("synthesizer", synthesizer_node)

    # --- Define the Graph's Flow ---
    workflow.set_entry_point("coordinator")

    # The coordinator decides which agent to call first
    workflow.add_conditional_edges(
        "coordinator",
        router_logic,
        {
            "Financial Agent": "Financial Agent",
            "Health Agent": "Health Agent",
            "Lifestyle Agent": "Lifestyle Agent",
            "synthesizer": "synthesizer" # Direct path if no agent is needed
        }
    )
    
    # After each agent, the router decides to go to tools or the synthesizer
    workflow.add_conditional_edges("Financial Agent", after_agent_router)
    workflow.add_conditional_edges("Health Agent", after_agent_router)
    workflow.add_conditional_edges("Lifestyle Agent", after_agent_router)

    # After the tool node runs, it ALWAYS goes back to the Financial Agent to process the results.
    # This is a simplification for this stage of development.
    workflow.add_edge("tools", "Financial Agent")
    
    # The final step for any branch is the synthesizer
    workflow.add_edge("synthesizer", END)
    
    return workflow.compile()
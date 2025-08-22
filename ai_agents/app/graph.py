# app/graph.py
import operator
from typing import TypedDict, Annotated, List
from langchain_core.messages import BaseMessage, HumanMessage
from langgraph.graph import StateGraph, END

from app.coordinator import create_coordinator_agent
from app.agents.financial_agent import create_financial_agent
# from app.agents.health_agent import create_health_agent
# from app.agents.lifestyle_agent import create_lifestyle_agent
from app.agents.synthesizer_agent import create_synthesizer_agent
from app.tools.database_tools import get_user_context, get_recent_transactions

# Define the state that flows through the graph
class GraphState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]
    user_id: str
    # This will hold the individual responses from the parallel agents
    agent_responses: list 

# --- Node Definitions ---

def coordinator_node(state: GraphState):
    print("--- NODE: Coordinator ---")
    user_id = state['user_id']
    query = state['messages'][0].content
    
    # 1. Call tool to get user context
    user_context = get_user_context.invoke({"user_id": user_id})
    
    # 2. Call coordinator to get routing decision
    coordinator = create_coordinator_agent()
    routing_decision = coordinator.invoke({"query": query, "user_context": user_context}).content
    
    print(f"--- Coordinator Decision: {routing_decision} ---")
    
    # We'll pass the routing decision through the state
    return {"messages": [HumanMessage(content=routing_decision)]}

def financial_agent_node(state: GraphState):
    print("--- NODE: Financial Agent ---")
    # This is a simplified tool calling logic for now
    agent = create_financial_agent()
    result = agent.invoke({"messages": state['messages']})
    return {"agent_responses": [f"Financial Agent Response: {result.content}"]}

def synthesizer_node(state: GraphState):
    print("--- NODE: Synthesizer ---")
    synthesizer = create_synthesizer_agent()
    query = state['messages'][0].content
    agent_responses_str = "\n".join(state['agent_responses'])
    
    final_response = synthesizer.invoke({"query": query, "agent_responses": agent_responses_str}).content
    return {"messages": [HumanMessage(content=final_response)]}

# --- Graph Edges (Routing Logic) ---

def route_logic(state: GraphState):
    routing_decision = state['messages'][-1].content
    if "Financial Agent" in routing_decision:
        return "financial_agent"
    # Add more logic here for health, lifestyle, and forks
    else:
        return "end" # Fallback

def create_agentic_graph():
    workflow = StateGraph(GraphState)

    workflow.add_node("coordinator", coordinator_node)
    workflow.add_node("financial_agent", financial_agent_node)
    # Add nodes for other agents here...
    workflow.add_node("synthesizer", synthesizer_node)

    workflow.set_entry_point("coordinator")

    workflow.add_conditional_edges(
        "coordinator",
        route_logic,
        {
            "financial_agent": "financial_agent",
            # Add other routes here...
            "end": END
        }
    )
    
    # For now, a simple path. We'll add parallel forks later.
    workflow.add_edge("financial_agent", "synthesizer")
    workflow.add_edge("synthesizer", END)
    
    return workflow.compile()
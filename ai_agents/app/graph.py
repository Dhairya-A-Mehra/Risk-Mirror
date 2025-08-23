# app/graph.py
import operator
import json
from datetime import datetime
from typing import TypedDict, Annotated, List
from langchain_core.messages import BaseMessage, AIMessage, ToolMessage, HumanMessage
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode

# --- Only import the creation functions, DO NOT call them here ---
from app.coordinator import create_coordinator_agent
from app.agents.financial_agent import create_financial_agent
from app.agents.health_agent import create_health_agent
from app.agents.lifestyle_agent import create_lifestyle_agent
from app.agents.synthesizer_agent import create_synthesizer_agent
from app.tools.database_tools import get_user_context, get_recent_transactions, get_recent_health_logs, get_active_plans

# --- Graph State and JSON Encoder (Unchanged) ---
class GraphState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]
    user_id: str
    agent_responses: dict

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime): return obj.isoformat()
        return super().default(obj)


# --- The Definitive Multi-Agent Graph ---
def create_agentic_graph():
    """
    This function now initializes all agents and builds the graph.
    It should only be called AFTER load_dotenv() has run.
    """
    # --- INITIALIZE ALL COMPONENTS INSIDE THIS FUNCTION ---
    coordinator_agent = create_coordinator_agent()
    financial_agent = create_financial_agent()
    health_agent = create_health_agent()
    lifestyle_agent = create_lifestyle_agent()
    synthesizer_agent = create_synthesizer_agent()
    tools = [get_user_context, get_recent_transactions, get_recent_health_logs, get_active_plans]
    tool_node = ToolNode(tools)

    # --- Node Definitions ---
    def coordinator_node(state: GraphState):
        print("--- NODE: Coordinator ---")
        query = state['messages'][0].content
        user_context = get_user_context.invoke({"user_id": state['user_id']})
        
        routing_decision = coordinator_agent.invoke({
            "query": query, "user_context": json.dumps(user_context, indent=2, cls=DateTimeEncoder)
        }).content
        
        print(f"--- Coordinator Decision: Route to --> {routing_decision} ---")
        return {"messages": [AIMessage(content=routing_decision.strip())]}

    def agent_node(state: GraphState, agent, name):
        print(f"--- NODE: Running {name} ---")
        query_with_context = HumanMessage(content=f"User ID: {state['user_id']}\n\nQuery: {state['messages'][0].content}")
        result = agent.invoke({"messages": [query_with_context]})
        return {"agent_responses": {**state.get('agent_responses', {}), name: result}}

    def synthesizer_node(state: GraphState):
        print("--- NODE: Synthesizer ---")
        query = state['messages'][0].content
        formatted_responses = []
        for agent_name, agent_result in state['agent_responses'].items():
            if not agent_result.tool_calls:
                formatted_responses.append(f"Response from {agent_name}:\n{agent_result.content}")
        
        final_response = synthesizer_agent.invoke({
            "query": query, "agent_responses": "\n\n".join(formatted_responses)
        }).content
        return {"messages": [AIMessage(content=final_response)]}

    def router_logic(state: GraphState):
        routing_decision = state['messages'][-1].content
        targets = []
        if "Financial Agent" in routing_decision: targets.append("Financial Agent")
        if "Health Agent" in routing_decision: targets.append("Health Agent")
        if "Lifestyle Agent" in routing_decision: targets.append("Lifestyle Agent")
        
        # This is a simplification. A real parallel graph is more complex.
        # For this test, we will route to the first one found.
        if targets:
            print(f"--- ROUTE: Routing to {targets[0]} ---")
            return targets[0]
        return "end"

    # --- Build the Graph ---
    workflow = StateGraph(GraphState)
    workflow.add_node("coordinator", coordinator_node)
    workflow.add_node("Financial Agent", lambda state: agent_node(state, financial_agent, "Financial Agent"))
    workflow.add_node("Health Agent", lambda state: agent_node(state, health_agent, "Health Agent"))
    workflow.add_node("Lifestyle Agent", lambda state: agent_node(state, lifestyle_agent, "Lifestyle Agent"))
    # We will simplify the graph for now to avoid tool-calling complexity
    # workflow.add_node("tools", tool_node)
    workflow.add_node("synthesizer", synthesizer_node)

    workflow.set_entry_point("coordinator")
    workflow.add_conditional_edges("coordinator", router_logic, {
        "Financial Agent": "Financial Agent",
        "Health Agent": "Health Agent",
        "Lifestyle Agent": "Lifestyle Agent",
        "end": "synthesizer" # If no route, go to synthesizer to give a default response
    })
    
    # After each agent, join at the synthesizer
    workflow.add_edge("Financial Agent", "synthesizer")
    workflow.add_edge("Health Agent", "synthesizer")
    workflow.add_edge("Lifestyle Agent", "synthesizer")
    workflow.add_edge("synthesizer", END)
    
    return workflow.compile()
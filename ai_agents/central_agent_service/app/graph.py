import operator
from typing import TypedDict, Annotated, List
from langchain_core.messages import BaseMessage, HumanMessage
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode

from app.agents.financial_agent import create_financial_agent
from app.tools.data_access_tools import get_user_financial_data_tool

# The GraphState remains the same, but we will use `messages` as the primary input
class GraphState(TypedDict):
    # We remove query and user_id as top-level keys, as they'll be in the messages
    messages: Annotated[List[BaseMessage], operator.add]

# --- Graph Nodes ---

tools = [get_user_financial_data_tool]
tool_node = ToolNode(tools)

def financial_agent_node(state: GraphState):
    """Invokes the financial agent with the current message state."""
    print("--- NODE: Running Financial Agent ---")
    agent = create_financial_agent()
    
    # Pass the entire message history to the agent
    result = agent.invoke(state) # The whole state is the input now
    
    # The result is a new message (AIMessage with tool calls or final answer)
    # We return it to be added to the state
    return {"messages": [result]}

# --- Router Logic ---
# This logic remains the same and is correct.
def router(state: GraphState) -> str:
    print("--- ROUTER: Deciding next step ---")
    last_message = state["messages"][-1]
    if last_message.tool_calls:
        return "tools"
    return "end"

# --- Build the Graph ---
def create_agentic_graph():
    """Compiles the complete agentic graph."""
    workflow = StateGraph(GraphState)

    workflow.add_node("financial_agent", financial_agent_node)
    workflow.add_node("tools", tool_node)

    workflow.set_entry_point("financial_agent")
    workflow.add_conditional_edges(
        "financial_agent",
        router,
        {"tools": "tools", "end": END},
    )
    workflow.add_edge("tools", "financial_agent")

    app = workflow.compile()
    return app
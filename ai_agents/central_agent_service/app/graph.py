import operator
from typing import TypedDict, Annotated, List
from langchain_core.messages import BaseMessage, HumanMessage
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode

from app.agents.financial_agent import create_financial_agent
from app.tools.data_access_tools import get_user_financial_data_tool

class GraphState(TypedDict):

    messages: Annotated[List[BaseMessage], operator.add]


tools = [get_user_financial_data_tool]
tool_node = ToolNode(tools)

def financial_agent_node(state: GraphState):
    """Invokes the financial agent with the current message state."""
    print("--- NODE: Running Financial Agent ---")
    agent = create_financial_agent()
    
    result = agent.invoke(state) 
    
    return {"messages": [result]}

def router(state: GraphState) -> str:
    print("--- ROUTER: Deciding next step ---")
    last_message = state["messages"][-1]
    if last_message.tool_calls:
        return "tools"
    return "end"

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

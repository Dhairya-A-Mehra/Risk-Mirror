import os
import logging
# Add HumanMessage to create the initial message
from langchain_core.messages import HumanMessage 
from fastapi import FastAPI, HTTPException, Security, Request
from fastapi.security import APIKeyHeader
from dotenv import load_dotenv

from app.schemas import QueryRequest, AgentResponse
from app.graph import create_agentic_graph

# ... (Configuration, logging, API Key logic all stays the same) ...

app = FastAPI(...)
agent_graph = create_agentic_graph()

# ... (Security logic stays the same) ...

@app.post("/invoke", response_model=AgentResponse, tags=["Agent"])
async def invoke_agent(request: QueryRequest, api_key: str = Security(get_api_key)):
    """Receives a query and invokes the agentic graph."""
    logger.info(f"Received request for user_id: {request.user_id}")
    try:
        # Construct the initial message with user_id context for the tool
        initial_human_message = HumanMessage(
            content=f"User ID: {request.user_id}\n\nQuery: {request.query}"
        )
        
        # The initial state for the graph is now a list of messages
        initial_state = {"messages": [initial_human_message]}
        
        # Use .invoke() to get the final state cleanly
        final_state = agent_graph.invoke(initial_state)
        
        # The final answer is the last AI message in the history
        final_response_message = final_state["messages"][-1].content

        if not final_response_message:
             raise ValueError("Agent did not produce a final response.")

        logger.info(f"Successfully invoked agent for user_id: {request.user_id}")
        return AgentResponse(response=final_response_message, source_agent="financial_agent")

    except Exception as e:
        logger.error(f"Error during agent invocation for user_id {request.user_id}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal Server Error")
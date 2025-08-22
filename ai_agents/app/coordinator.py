# app/coordinator.py
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from app.tools.database_tools import get_user_context

def create_coordinator_agent():
    """Creates the coordinator agent for routing."""
    
    prompt = PromptTemplate(
        input_variables=["query", "user_context"],
        template="""You are the Central Coordinator Agent. Your job is to analyze the user's query and their data context to decide which specialized agent(s) should be called.

User's Data Context:
{user_context}

User Query: "{query}"

Based on the query and context, list the agents that should be invoked.
The available agents are: 'Financial Agent', 'Health Agent', 'Lifestyle Agent'.

Rules:
- If the query is clearly about one topic, list only that agent.
- If the query is complex and touches on multiple topics (e.g., financial stress affecting health), list all relevant agents separated by commas.
- Output ONLY the agent name(s), separated by commas if multiple.

Example 1:
User Query: "How's my budget looking?"
Chosen Agents: Financial Agent

Example 2:
User Query: "I'm stressed about work and not sleeping, which is making me overspend."
Chosen Agents: Health Agent, Financial Agent, Lifestyle Agent

Chosen Agents:
""",
    )
    
    llm = ChatGroq(model="llama3-8b-8192", temperature=0.0)
    
    # We don't bind tools here. The coordinator's logic in the graph will call the tool.
    return prompt | llm
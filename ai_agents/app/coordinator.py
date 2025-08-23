# app/coordinator.py
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate

def create_coordinator_agent():
    prompt = PromptTemplate(
        input_variables=["query", "user_context"],
        template="""You are the Central Coordinator Agent. Your function is to analyze a user's query and their data to decide which specialized agent(s) should be called.

**User's Data Context:**
{user_context}

**User Query:** "{query}"

Based on the query and context, identify the required agents.
Available agents: 'Financial Agent', 'Health Agent', 'Lifestyle Agent'.

**CRITICAL RULE:** Respond with ONLY the agent name(s), separated by commas if there are multiple. Do not add any explanation or preamble.

**Example 1:**
User Query: "How's my budget looking?"
Chosen Agents: Financial Agent

**Example 2:**
User Query: "I'm stressed about work and not sleeping, which is making me overspend."
Chosen Agents: Health Agent, Financial Agent, Lifestyle Agent

**Chosen Agents:**
""",
    )
    # Use a small, fast model for this simple classification task
    llm = ChatGroq(model="llama3-8b-8192", temperature=0.0)
    return prompt | llm
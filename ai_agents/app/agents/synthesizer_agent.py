# app/agents/synthesizer_agent.py
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate

def create_synthesizer_agent():
    prompt = PromptTemplate(
        input_variables=["query", "agent_responses"],
        template="""You are a final synthesizer agent. Your job is to take the original user query and the responses from one or more specialized agents and combine them into a single, cohesive, user-friendly response.

Original User Query: "{query}"

Responses from Specialized Agents:
{agent_responses}

Synthesize these into a single, final answer. If there's only one response, rephrase it to be more conversational. If there are multiple, combine their insights and provide a prioritized action plan.

Final Answer:
""",
    )
    llm = ChatGroq(model="llama3-70b-8192", temperature=0.5)
    return prompt | llm
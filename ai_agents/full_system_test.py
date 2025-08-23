# full_system_test.py
import os
from dotenv import load_dotenv

# --- STEP 1: LOAD ENVIRONMENT VARIABLES ---
# This MUST be the first thing that happens.
print("--- Loading Environment Variables ---")
load_dotenv()
print("--- Environment Variables Loaded ---")

# --- STEP 2: NOW IMPORT THE REST OF THE APPLICATION ---
from langchain_core.messages import HumanMessage
from app.graph import create_agentic_graph
from app.services.database import connect_to_mongodb
from app.tools.database_tools import get_user_context

def run_all_tests():
    print("--- INITIALIZING TEST SUITE ---")
    connect_to_mongodb()
    
    # --- STEP 3: CREATE THE GRAPH (now that keys are loaded) ---
    print("\n--- COMPILING FULL AGENTIC GRAPH ---")
    graph = create_agentic_graph()
    print("--- GRAPH COMPILED SUCCESSFULLY ---\n")

    TEST_USER_ID = "68a7b6ba6ab9b81b98212314"
    
    complex_query = "I'm really stressed about my recent high spending, and it's making it hard for me to sleep. I also feel like I'm not making progress on my life goals. Can you give me some advice?"
    
    test_cases = [
        {"description": "Simple Financial Query", "query": "How are my recent transactions?"},
        {"description": "Complex Multi-Agent Query", "query": complex_query},
    ]

    for test in test_cases:
        print("\n" + "="*60)
        print(f"▶️  RUNNING: {test['description']}")
        print(f"   QUERY: \"{test['query']}\"")
        print("="*60)
        
        initial_state = {
            "user_id": TEST_USER_ID,
            "messages": [HumanMessage(content=test['query'])],
            "agent_responses": {}
        }

        print("\n--- EVENT STREAM ---")
        final_state = None
        # Use .stream() to see the full execution path
        for event in graph.stream(initial_state):
            print(event)
            if list(event.keys())[0] != "__end__":
                final_state = list(event.values())[0]
        print("--- END OF STREAM ---\n")
        
        final_response = final_state['messages'][-1].content
        
        print("\n--- FINAL SYNTHESIZED RESPONSE ---")
        print(final_response)
        print("-" * 60 + "\n")

if __name__ == "__main__":
    run_all_tests()
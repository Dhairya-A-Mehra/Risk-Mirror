import os
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage

# Import the necessary functions from your application
from app.graph import create_agentic_graph
from app.services.database import connect_to_mongodb, get_db

def run_all_tests():
    """
    Runs a series of tests to validate the entire agentic graph,
    from the coordinator to the specialized agents and the synthesizer.
    """
    # 1. Load environment variables and connect to the database
    print("--- INITIALIZING TEST SUITE ---")
    load_dotenv()
    connect_to_mongodb()
    
    # 2. Compile the agentic graph
    print("\n--- COMPILING AGENTIC GRAPH ---")
    graph = create_agentic_graph()
    print("--- GRAPH COMPILED SUCCESSFULLY ---\n")

    # 3. --- CRITICAL STEP ---
    # Paste the user's ObjectId string from your MongoDB Atlas 'users' collection here.
    # The test will FAIL without a valid user ID.
    TEST_USER_ID = "68a7b6ba6ab9b81b98212314"  # <-- PASTE YOUR REAL USER ID HERE
    
    # Check if the user ID is a placeholder
    if "your_real_user_id" in TEST_USER_ID or "..." in TEST_USER_ID:
        print("\n\n" + "="*60)
        print("🛑 ERROR: Please update the TEST_USER_ID in full_system_test.py")
        print(f"   Current value is: '{TEST_USER_ID}'")
        print("   You need to replace it with a real ObjectId string from your MongoDB.")
        print("="*60 + "\n")
        return # Stop the test

    # 4. Define a list of test queries to check all agent paths
    test_queries = [
        {
            "description": "Test Case 1: Purely Financial Query",
            "query": "How are my recent transactions looking, and do I have an active financial plan?",
            "expected_route": "Financial Agent"
        },
        {
            "description": "Test Case 2: Purely Health Query",
            "query": "I'm not sleeping well, what do my recent health logs say?",
            "expected_route": "Health Agent"
        },
        {
            "description": "Test Case 3: Purely Lifestyle Query",
            "query": "How can I better align my schedule with my active life goals?",
            "expected_route": "Lifestyle Agent"
        },
        {
            "description": "Test Case 4: Complex Multi-Agent Query (Finance + Health)",
            "query": "I'm very stressed about my recent high spending, and I think it's affecting my sleep. What should I do?",
            "expected_route": "Financial Agent, Health Agent"
        }
    ]

    # 5. Execute each test case
    for test in test_queries:
        print("\n" + "="*60)
        print(f"▶️  RUNNING: {test['description']}")
        print(f"   QUERY: \"{test['query']}\"")
        print(f"   EXPECTED ROUTE: {test['expected_route']}")
        print("="*60)
        
        # Prepare the initial state for the LangGraph
        initial_state = {
            "user_id": TEST_USER_ID,
            "messages": [HumanMessage(content=test['query'])],
            "agent_responses": []
        }

        # Invoke the graph and stream the events to see the step-by-step process
        full_event_stream = []
        for event in graph.stream(initial_state):
            full_event_stream.append(event)
            # Print the events as they happen to watch the flow
            print(f"EVENT: {list(event.keys())[0]} -> {list(event.values())[0]}")

        # The final response is in the last event's 'messages'
        final_response = full_event_stream[-1]['messages'][-1].content
        
        print("\n--- FINAL SYNTHESIZED RESPONSE ---")
        print(final_response)
        print("-" * 60 + "\n")

if __name__ == "__main__":
    run_all_tests()
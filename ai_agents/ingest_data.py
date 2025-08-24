# ai_agents/ingest_data.py
import os
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_redis import RedisVectorStore
from langchain_community.document_loaders import TextLoader

# --- Configuration ---
# This is the name your vector index will have in Redis
REDIS_INDEX_NAME = "risk_mirror_docs"
# Path to your source data file
SOURCE_FILE_PATH = "data/financial_knowledge.txt"

def ingest_documents():
    """
    Reads documents, splits them, creates embeddings, and stores them in Redis.
    """
    print("--- Starting Data Ingestion ---")
    load_dotenv()
    
    redis_url = os.getenv("REDIS_URL")
    if not redis_url:
        raise ValueError("REDIS_URL must be set in your .env file.")

    # 1. Load the document
    print(f"Loading document from {SOURCE_FILE_PATH}...")
    # For this example, we'll use a simple text file. You could also use PDF or web loaders.
    loader = TextLoader(SOURCE_FILE_PATH)
    documents = loader.load()

    # 2. Split the document into smaller chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_documents(documents)
    print(f"Document split into {len(chunks)} chunks.")

    # 3. Initialize the embedding model
    # This model converts your text chunks into numerical vectors
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    print("OpenAI embedding model initialized.")

    # 4. Ingest into Redis
    print(f"Ingesting chunks into Redis index: '{REDIS_INDEX_NAME}'...")
    # This command creates the index and stores all the vectorized chunks.
    # It will overwrite an existing index with the same name.
    RedisVectorStore.from_documents(
        chunks,
        embedding=embeddings,
        index_name=REDIS_INDEX_NAME,
        redis_url=redis_url
    )
    print("\n--- ✅ Data Ingestion Complete! ---")
    print(f"Your knowledge base is now ready in Redis under the index '{REDIS_INDEX_NAME}'.")

if __name__ == "__main__":
    # Create a dummy data file for the test
    if not os.path.exists("data"):
        os.makedirs("data")
    with open(SOURCE_FILE_PATH, "w") as f:
        f.write("Modern Portfolio Theory (MPT) suggests that investors can construct portfolios to optimize or maximize expected return for a given level of market risk.\n")
        f.write("A key concept in MPT is diversification. Spreading investments across various financial instruments, industries, and other categories can help mitigate unsystematic risk.\n")
        f.twrite("Dollar-cost averaging is an investment strategy that aims to reduce the impact of volatility on the purchase of assets.")
    
    ingest_documents()
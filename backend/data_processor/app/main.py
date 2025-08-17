from fastapi import FastAPI
import time
import threading


def consume_market_data():
    print("Starting Kafka consumer thread for market data...")
    while True:
        print("Data Processor: Checking for new market data messages... (mock)")
        time.sleep(15)


app = FastAPI(title="Data Processor Service")


@app.on_event("startup")
async def startup_event():
    thread = threading.Thread(target=consume_market_data)
    thread.daemon = True
    thread.start()


@app.get("/")
def read_root():
    return {
        "service": "Data Processor Service",
        "status": "running and consuming messages",
    }

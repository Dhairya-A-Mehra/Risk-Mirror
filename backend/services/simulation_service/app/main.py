from fastapi import FastAPI, APIRouter

app = FastAPI(title="Simulation Service")
router = APIRouter()


@router.get("/")
def read_root():
    return {"service": "Simulation Service", "status": "running"}


# Placeholder for the simulation endpoint
@router.post("/run")
def run_simulation(scenario: dict):
    # In a real app, this would trigger a complex calculation
    return {"scenario_received": scenario, "result": "SAFE", "new_risk_score": 72}


app.include_router(router)

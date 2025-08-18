# In simulation_service/app/main.py
from fastapi import FastAPI

app = FastAPI(title="Simulation Service")


@app.post("/run")
async def run_simulation(data: dict):
    current_score = data.get("currentRiskScore", 75)
    scenario = data.get("scenario")

    new_score = current_score
    outcome_badge = "Safe"

    if scenario == "market_crash":
        new_score -= 15.5  # Simulate a score drop
        outcome_badge = "Danger"
    elif scenario == "medical_emergency":
        new_score -= 10.2
        outcome_badge = "Caution"

    return {"newRiskScore": round(new_score, 2), "outcomeBadge": outcome_badge}

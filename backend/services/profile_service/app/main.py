from fastapi import FastAPI, APIRouter

app = FastAPI(title="Profile Service")
router = APIRouter()


@router.get("/")
def read_root():
    return {"service": "Profile Service", "status": "running"}


# Placeholder for the survey endpoint
@router.post("/survey")
def submit_survey():
    return {"message": "Survey submitted successfully"}


# Placeholder for the dashboard data endpoint
@router.get("/dashboard")
def get_dashboard_data():
    return {"live_risk_score": 75, "market_mood": "Neutral"}


app.include_router(router)

import json
from datetime import datetime
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from .database import get_db, engine
from .encryption_service import EncryptionService
from .risk_calculator import calculate_final_score

# This should create tables if they don't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Profile Service")


def get_encryption_service():
    return EncryptionService()


@app.post("/survey/{user_id}")
async def submit_survey(
    user_id: str,
    survey_data: schemas.SurveyData,
    db: Session = Depends(get_db),
    encryption_service: EncryptionService = Depends(get_encryption_service),
):
    # Check if profile already exists
    db_profile = (
        db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
    )
    if db_profile:
        raise HTTPException(
            status_code=400, detail="Profile already exists for this user."
        )

    # Encrypt the data
    encrypted_financial = encryption_service.encrypt(json.dumps(survey_data.financial))
    encrypted_health = encryption_service.encrypt(json.dumps(survey_data.health))
    encrypted_lifestyle = encryption_service.encrypt(json.dumps(survey_data.lifestyle))
    encrypted_psychometric = encryption_service.encrypt(
        json.dumps(survey_data.psychometric)
    )

    # Create new profile
    new_profile = models.Profile(
        user_id=user_id,
        financial_data_encrypted=encrypted_financial,
        health_data_encrypted=encrypted_health,
        lifestyle_data_encrypted=encrypted_lifestyle,
        psychometric_results_encrypted=encrypted_psychometric,
    )
    db.add(new_profile)

    # Calculate and save the initial risk score
    scores = calculate_final_score(survey_data.dict())
    new_score = models.RiskScore(
        user_id=user_id,
        risk_dna_score=scores["risk_dna_score"],
        calm_index_score=scores["calm_index_score"],
        recorded_at=datetime.utcnow(),
    )
    db.add(new_score)

    db.commit()

    return {"message": "Survey submitted successfully", "calculated_scores": scores}


# Add this to profile_service/app/main.py
@app.get("/dashboard/{user_id}")
async def get_dashboard_data(user_id: str, db: Session = Depends(get_db)):
    # Fetch the latest risk score for the user
    latest_score = (
        db.query(models.RiskScore)
        .filter(models.RiskScore.user_id == user_id)
        .order_by(models.RiskScore.recorded_at.desc())
        .first()
    )

    if not latest_score:
        raise HTTPException(
            status_code=404, detail="No data found for user. Please complete survey."
        )

    # In a real app, you would fetch portfolio, goals, etc. here.
    # For MVP, we'll return mock data for some parts.
    return {
        "riskDnaScore": latest_score.risk_dna_score,
        "calmIndexScore": latest_score.calm_index_score,
        "peerBenchmark": "Your investments are growing faster than 70% of peers.",
        "leaderboardRank": 42,
        "riskStreak": 5,
    }

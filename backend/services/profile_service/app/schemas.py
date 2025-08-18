from pydantic import BaseModel
from typing import Dict, Any


class SurveyData(BaseModel):
    financial: Dict[str, Any]
    health: Dict[str, Any]
    lifestyle: Dict[str, Any]
    psychometric: Dict[str, int]

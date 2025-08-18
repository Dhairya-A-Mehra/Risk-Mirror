from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Float, LargeBinary
from sqlalchemy.dialects.postgresql import UUID, JSONB
from .database import Base


class Profile(Base):
    __tablename__ = "profiles"
    user_id = Column(UUID(as_uuid=True), primary_key=True)
    financial_data_encrypted = Column(LargeBinary)
    health_data_encrypted = Column(LargeBinary)
    lifestyle_data_encrypted = Column(LargeBinary)
    psychometric_results_encrypted = Column(LargeBinary)


class RiskScore(Base):
    __tablename__ = "risk_scores"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    risk_dna_score = Column(Float, nullable=False)
    calm_index_score = Column(Float, nullable=False)
    recorded_at = Column(DateTime, nullable=False)

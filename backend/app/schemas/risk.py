from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
from datetime import datetime

class RiskBreakdown(BaseModel):
    threat_severity: float
    event_probability: float
    asset_exposure: float
    chokepoint_criticality: float
    alternative_route_gap: float

class RiskAssessmentOut(BaseModel):
    id: str
    event_id: str
    overall_risk_score: int = Field(..., ge=0, le=100)
    threat_level: str
    confidence_score: float
    breakdown: RiskBreakdown
    formula_version: str
    input_parameters: Dict[str, Any]
    weights: Dict[str, float]
    timestamp: datetime
    data_classification: str = "DERIVED"

    class Config:
        from_attributes = True

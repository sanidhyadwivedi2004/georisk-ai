from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from app.schemas.recommendation import RecommendationOut

class ScenarioParams(BaseModel):
    target_country: str = "India"
    commodity: str = "Crude Oil"
    duration_days: int = Field(..., ge=1, le=365)
    disruption_percent: float = Field(..., ge=0.0, le=100.0)
    alternative_supply_capacity_bpd: float = 0.0
    route_availability_pct: float = 100.0
    reserve_coverage_days: int = 74

class ScenarioResultOut(BaseModel):
    id: str
    scenario_id: str
    params: ScenarioParams
    baseline_risk: int
    simulated_risk: int
    baseline_exposure_pct: float
    simulated_exposure_pct: float
    projected_volume_loss_bpd: float
    simulated_delay_days: float
    remaining_reserve_days: int
    mitigation_urgency: str
    recommendations: Optional[List[RecommendationOut]] = []
    data_classification: str = "ASSUMPTION"
    calculated_at: datetime

    class Config:
        from_attributes = True

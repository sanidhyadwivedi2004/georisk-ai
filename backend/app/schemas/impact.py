from pydantic import BaseModel
from datetime import datetime

class ImpactAssessmentOut(BaseModel):
    id: str
    event_id: str
    target_country: str
    commodity: str
    import_exposure_pct: float
    supplier_concentration_hhi: float
    route_exposure_pct: float
    potential_disruption_bpd: float
    projected_delay_days: float
    reserve_runway_days: int
    price_pressure_proxy: str
    data_classification: str = "DERIVED"
    timestamp: datetime

    class Config:
        from_attributes = True

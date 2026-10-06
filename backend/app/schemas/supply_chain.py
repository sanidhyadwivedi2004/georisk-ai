from pydantic import BaseModel
from typing import List, Optional

class SupplyChainNodeOut(BaseModel):
    id: str
    name: str
    type: str # supplier, export_terminal, chokepoint, import_port, refinery
    country: str
    capacity_bpd: Optional[float] = None
    flow_bpd: Optional[float] = None
    status: str
    risk_level: str # LOW, MODERATE, HIGH, CRITICAL
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    data_classification: str = "VERIFIED"

class SupplyChainMetricsOut(BaseModel):
    target_country: str
    commodity: str
    import_exposure_percent: float
    supplier_concentration_hhi: float
    route_exposure_percent: float
    alternative_capacity_status: str
    strategic_reserve_days: int

class SupplyChainProfileOut(BaseModel):
    nodes: List[SupplyChainNodeOut]
    metrics: SupplyChainMetricsOut

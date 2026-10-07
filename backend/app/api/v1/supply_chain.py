from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.schemas.supply_chain import SupplyChainProfileOut, SupplyChainNodeOut, SupplyChainMetricsOut

router = APIRouter()

MOCK_NODES = [
    {
        "id": "node-sup-01",
        "name": "Ras Tanura Export Complex (Saudi Aramco)",
        "type": "supplier",
        "country": "Saudi Arabia",
        "capacity_bpd": 6500000.0,
        "flow_bpd": 1400000.0,
        "status": "Operational",
        "risk_level": "MODERATE",
        "latitude": 26.6439,
        "longitude": 50.1583,
        "data_classification": "VERIFIED"
    },
    {
        "id": "node-term-01",
        "name": "Ju'aymah Offshore Terminal",
        "type": "export_terminal",
        "country": "Saudi Arabia",
        "capacity_bpd": 3000000.0,
        "flow_bpd": 950000.0,
        "status": "Operational",
        "risk_level": "MODERATE",
        "latitude": 26.7833,
        "longitude": 50.1500,
        "data_classification": "VERIFIED"
    },
    {
        "id": "node-chk-01",
        "name": "Strait of Hormuz Chokepoint",
        "type": "chokepoint",
        "country": "Oman / Iran International Transit",
        "capacity_bpd": 21000000.0,
        "flow_bpd": 17800000.0,
        "status": "Restricted / Critical Threat",
        "risk_level": "CRITICAL",
        "latitude": 26.5667,
        "longitude": 56.2500,
        "data_classification": "VERIFIED"
    },
    {
        "id": "node-route-01",
        "name": "Arabian Sea North Maritime Corridor",
        "type": "maritime_route",
        "country": "International Waters",
        "capacity_bpd": 15000000.0,
        "flow_bpd": 4600000.0,
        "status": "Monitored",
        "risk_level": "ELEVATED",
        "latitude": 20.0000,
        "longitude": 65.0000,
        "data_classification": "DERIVED"
    },
    {
        "id": "node-port-01",
        "name": "Vadinar Crude Import Terminal",
        "type": "import_port",
        "country": "India (Gujarat Coast)",
        "capacity_bpd": 1800000.0,
        "flow_bpd": 1250000.0,
        "status": "Operational",
        "risk_level": "MODERATE",
        "latitude": 22.4500,
        "longitude": 69.6833,
        "data_classification": "VERIFIED"
    },
    {
        "id": "node-ref-01",
        "name": "Jamnagar Refinery Complex (Reliance / Nayara)",
        "type": "refinery",
        "country": "India",
        "capacity_bpd": 1400000.0,
        "flow_bpd": 1360000.0,
        "status": "Operational",
        "risk_level": "LOW",
        "latitude": 22.3500,
        "longitude": 69.8333,
        "data_classification": "VERIFIED"
    }
]

MOCK_METRICS = {
    "target_country": "India",
    "commodity": "Crude Oil",
    "import_exposure_percent": 60.0,
    "supplier_concentration_hhi": 65.4,
    "route_exposure_percent": 74.0,
    "alternative_capacity_status": "CONSTRAINED (+14d Cape Transit)",
    "strategic_reserve_days": 74
}

@router.get("/supply-chain", response_model=SupplyChainProfileOut)
def get_supply_chain_profile(
    country: str = Query("India", description="Importing country profile"),
    db: Session = Depends(get_db)
):
    return {
        "nodes": MOCK_NODES,
        "metrics": MOCK_METRICS
    }

@router.get("/supply-chain/{country}", response_model=SupplyChainProfileOut)
def get_supply_chain_profile_by_path(country: str, db: Session = Depends(get_db)):
    return {
        "nodes": MOCK_NODES,
        "metrics": {**MOCK_METRICS, "target_country": country}
    }

@router.get("/assets", response_model=List[SupplyChainNodeOut])
def get_assets(db: Session = Depends(get_db)):
    return [n for n in MOCK_NODES if n["type"] in ["supplier", "export_terminal", "import_port", "refinery"]]

@router.get("/routes", response_model=List[SupplyChainNodeOut])
def get_routes(db: Session = Depends(get_db)):
    return [n for n in MOCK_NODES if n["type"] == "maritime_route"]

@router.get("/chokepoints", response_model=List[SupplyChainNodeOut])
def get_chokepoints(db: Session = Depends(get_db)):
    return [n for n in MOCK_NODES if n["type"] == "chokepoint"]

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.engines.risk_engine import calculate_risk

router = APIRouter()

@router.get("/risk/global")
def get_global_risk_summary(db: Session = Depends(get_db)):
    risk_res = calculate_risk(
        threat_severity=8.5,
        event_probability=8.0,
        asset_exposure=9.0,
        chokepoint_criticality=9.5,
        alternative_route_gap=6.0
    )
    return {
        "overall_risk_score": risk_res["overall_risk_score"],
        "threat_level": risk_res["threat_level"],
        "human_readable_label": "Global Systemic Risk: Elevated (Hormuz Corridor Tension)",
        "active_critical_events": 1,
        "monitored_ports": 14,
        "countries_affected": ["India", "Oman", "Saudi Arabia", "UAE"],
        "exposed_volume_bpd": 1380000.0,
        "classification": "DERIVED"
    }

@router.get("/risk/countries/{country_code}")
def get_country_risk(country_code: str, db: Session = Depends(get_db)):
    country_upper = country_code.upper()
    risk_res = calculate_risk(
        threat_severity=8.2,
        event_probability=7.8,
        asset_exposure=8.5,
        chokepoint_criticality=9.0,
        alternative_route_gap=6.5
    )
    return {
        "country_code": country_upper,
        "overall_risk_score": risk_res["overall_risk_score"],
        "threat_level": risk_res["threat_level"],
        "crude_import_dependency_pct": 87.8,
        "primary_threat_corridor": "Strait of Hormuz",
        "breakdown": risk_res["breakdown"],
        "classification": "DERIVED"
    }

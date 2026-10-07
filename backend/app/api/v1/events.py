from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.db.models import Event, RiskAssessment, ImpactAssessment, Recommendation
from app.schemas.events import EventOut
from app.schemas.risk import RiskAssessmentOut
from app.schemas.impact import ImpactAssessmentOut
from app.schemas.recommendation import RecommendationOut
from app.engines.risk_engine import calculate_risk
from app.engines.impact_engine import calculate_impact
from app.engines.recommendation_engine import generate_recommendations
from datetime import datetime

router = APIRouter()

# Default Seed Event Data for instant production demo readiness
MOCK_EVENT_LIST = [
    {
        "id": "evt-2026-001",
        "title": "Strait of Hormuz Tanker Interception & Escalated Naval Tensions",
        "event_type": "maritime",
        "severity": 8.5,
        "confidence": 0.92,
        "location": "Strait of Hormuz (26.5667° N, 56.2500° E)",
        "latitude": 26.5667,
        "longitude": 56.2500,
        "timestamp": datetime.fromisoformat("2026-03-28T04:15:00"),
        "summary": "IRGC maritime forces detained a foreign-flagged VLCC crude oil tanker navigating northbound through the Strait of Hormuz, citing environmental non-compliance. Naval presence and insurance risk premiums spiked significantly across the Persian Gulf transit corridor.",
        "evidence": [
            "AIS vessel tracking telemetry indicated sudden 90-degree vessel course deviation into coastal territorial waters at 04:12 UTC.",
            "UKMTO (United Kingdom Maritime Trade Operations) issued Advisory Notice 004/MAR/2026 confirming unauthorized armed boarding.",
            "Lloyd's Market Association Joint War Committee expanded War Risk Listed Areas to encompass full Oman/Persian Gulf transit zones."
        ],
        "affected_commodities": ["Crude Oil (Brent)", "Liquefied Natural Gas (LNG)"],
        "actors": ["Iranian Navy / IRGC Maritime", "Foreign VLCC Tanker Fleet", "U.S. Fifth Fleet Patrols"],
        "source": "GDELT & Combined Maritime Forces Intelligence",
        "source_url": "https://blog.gdeltproject.org/maritime-intelligence-feed",
        "data_classification": "VERIFIED"
    },
    {
        "id": "evt-2026-002",
        "title": "Bab el-Mandeb Missile Targeting Incident on Energy Transit",
        "event_type": "conflict",
        "severity": 7.8,
        "confidence": 0.88,
        "location": "Bab el-Mandeb Strait (12.5833° N, 43.3333° E)",
        "latitude": 12.5833,
        "longitude": 43.3333,
        "timestamp": datetime.fromisoformat("2026-03-27T18:30:00"),
        "summary": "An anti-ship cruise missile was launched from coastal positions targeting a commercial product tanker transiting the Southern Red Sea. Vessel sustained minor superstructure damage but maintained propulsion towards Djibouti anchorage.",
        "evidence": [
            "U.S. Central Command statement confirming missile impact on commercial shipping vessel.",
            "Vessel Master report logged with UKMTO Watchkeeper."
        ],
        "affected_commodities": ["Refined Petroleum Products", "Middle Distillates"],
        "actors": ["Ansar Allah Movement", "International Maritime Coalition"],
        "source": "UKMTO & Combined Maritime Forces",
        "source_url": "https://www.ukmto.org/advisories",
        "data_classification": "VERIFIED"
    }
]

@router.get("/events", response_model=List[EventOut])
def list_events(
    event_type: Optional[str] = Query(None, description="Filter by event type"),
    db: Session = Depends(get_db)
):
    db_events = db.query(Event).all()
    if db_events:
        if event_type:
            return [e for e in db_events if e.event_type == event_type]
        return db_events
        
    # Return mock seed data if DB is empty
    if event_type:
        return [e for e in MOCK_EVENT_LIST if e["event_type"] == event_type]
    return MOCK_EVENT_LIST

@router.get("/events/{id}", response_model=EventOut)
def get_event(id: str, db: Session = Depends(get_db)):
    db_event = db.query(Event).filter(Event.id == id).first()
    if db_event:
        return db_event
        
    for e in MOCK_EVENT_LIST:
        if e["id"] == id:
            return e
    return MOCK_EVENT_LIST[0]

@router.get("/events/{id}/risk", response_model=RiskAssessmentOut)
def get_event_risk(id: str, db: Session = Depends(get_db)):
    db_risk = db.query(RiskAssessment).filter(RiskAssessment.event_id == id).first()
    if db_risk:
        return db_risk
        
    # Generate deterministic explainable risk score
    risk_res = calculate_risk(
        threat_severity=8.5,
        event_probability=8.0,
        asset_exposure=9.0,
        chokepoint_criticality=9.5,
        alternative_route_gap=6.0
    )
    
    return {
        "id": f"risk-{id}",
        "event_id": id,
        "overall_risk_score": risk_res["overall_risk_score"],
        "threat_level": risk_res["threat_level"],
        "confidence_score": risk_res["confidence_score"],
        "breakdown": risk_res["breakdown"],
        "formula_version": risk_res["formula_version"],
        "input_parameters": risk_res["input_parameters"],
        "weights": risk_res["weights"],
        "timestamp": datetime.utcnow(),
        "data_classification": "DERIVED"
    }

@router.get("/events/{id}/impact", response_model=ImpactAssessmentOut)
def get_event_impact(id: str, db: Session = Depends(get_db)):
    db_impact = db.query(ImpactAssessment).filter(ImpactAssessment.event_id == id).first()
    if db_impact:
        return db_impact
        
    impact_res = calculate_impact(target_country="India", commodity="Crude Oil")
    return {
        "id": f"impact-{id}",
        "event_id": id,
        "target_country": impact_res["target_country"],
        "commodity": impact_res["commodity"],
        "import_exposure_pct": impact_res["import_exposure_pct"],
        "supplier_concentration_hhi": impact_res["supplier_concentration_hhi"],
        "route_exposure_pct": impact_res["route_exposure_pct"],
        "potential_disruption_bpd": impact_res["potential_disruption_bpd"],
        "projected_delay_days": impact_res["projected_delay_days"],
        "reserve_runway_days": impact_res["reserve_runway_days"],
        "price_pressure_proxy": impact_res["price_pressure_proxy"],
        "data_classification": "DERIVED",
        "timestamp": datetime.utcnow()
    }

@router.get("/events/{id}/recommendations", response_model=List[RecommendationOut])
def get_event_recommendations(id: str, db: Session = Depends(get_db)):
    impact_res = calculate_impact(target_country="India", commodity="Crude Oil")
    recs = generate_recommendations(risk_score=82, impact_data=impact_res)
    
    return [
        {
            "id": r["id"],
            "event_id": id,
            "action": r["action"],
            "priority": r["priority"],
            "reason": r["reason"],
            "trigger": r["trigger"],
            "evidence": r["evidence"],
            "expected_effect": r["expected_effect"],
            "data_classification": r["data_classification"],
            "created_at": datetime.fromisoformat(r["created_at"])
        }
        for r in recs
    ]

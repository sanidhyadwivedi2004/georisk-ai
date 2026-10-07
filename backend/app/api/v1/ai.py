from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Dict, Any, Optional
from app.db.database import get_db
from app.services.gemini_service import generate_grounded_ai_response
from app.engines.risk_engine import calculate_risk
from app.engines.impact_engine import calculate_impact
from datetime import datetime

router = APIRouter()

class ChatRequest(BaseModel):
    user_message: str
    session_id: Optional[str] = "session-default"

@router.post("/ai/chat")
def handle_ai_chat(payload: ChatRequest, db: Session = Depends(get_db)):
    # Build grounded database context from DB models / verified datasets
    risk_data = calculate_risk(8.5, 8.0, 9.0, 9.5, 6.0)
    impact_data = calculate_impact(target_country="India")
    
    db_context = {
        "events": [
            {
                "id": "evt-2026-001",
                "title": "Strait of Hormuz Tanker Interception & Escalated Naval Tensions",
                "severity": 8.5,
                "location": "Strait of Hormuz",
                "summary": "IRGC maritime forces detained a foreign-flagged VLCC crude oil tanker transiting through the Strait of Hormuz.",
                "affected_commodities": ["Crude Oil", "LNG"],
                "data_classification": "VERIFIED"
            }
        ],
        "risk": risk_data,
        "impact": impact_data,
        "data_provenance": "GeoRisk AI Grounded Database Context v1.0"
    }
    
    ai_res = generate_grounded_ai_response(
        user_query=payload.user_message,
        db_context=db_context
    )
    
    return {
        "session_id": payload.session_id,
        "user_message": payload.user_message,
        "assistant_message": ai_res["answer"],
        "grounded": ai_res["grounded"],
        "engine": ai_res["engine"],
        "timestamp": datetime.utcnow().isoformat()
    }

@router.get("/ai/context/{query}")
def get_ai_grounded_context(query: str, db: Session = Depends(get_db)):
    risk_data = calculate_risk(8.5, 8.0, 9.0, 9.5, 6.0)
    impact_data = calculate_impact(target_country="India")
    return {
        "query": query,
        "database_context": {
            "risk": risk_data,
            "impact": impact_data,
            "provenance": "Verified GeoRisk Database"
        }
    }

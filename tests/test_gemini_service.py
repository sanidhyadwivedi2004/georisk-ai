import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app.services.gemini_service import generate_grounded_ai_response

def test_generate_grounded_ai_response():
    db_context = {
        "events": [{"title": "Strait of Hormuz Disruption", "severity": 8.5}],
        "risk": {"overall_risk_score": 82, "threat_level": "CRITICAL"},
        "impact": {"potential_disruption_bpd": 1380000.0, "reserve_runway_days": 72}
    }
    
    res = generate_grounded_ai_response("What is the risk score?", db_context)
    assert res["grounded"] == True
    assert "82" in res["answer"] or "CRITICAL" in res["answer"] or "Strait of Hormuz" in res["answer"]
    assert "engine" in res

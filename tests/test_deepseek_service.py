import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app.services.ai_llm_service import generate_grounded_ai_response, call_deepseek_api

def test_deepseek_service_fallback():
    db_context = {
        "events": [{"title": "Bab el-Mandeb Incident", "severity": 7.8}],
        "risk": {"overall_risk_score": 78, "threat_level": "ELEVATED"},
        "impact": {"potential_disruption_bpd": 950000.0, "reserve_runway_days": 74}
    }
    
    # Test that generate_grounded_ai_response generates grounded answer
    res = generate_grounded_ai_response("What is the impact on energy routes?", db_context)
    assert res["grounded"] == True
    assert "engine" in res
    assert "answer" in res

def test_call_deepseek_api_without_key():
    # Calling DeepSeek API without key should return None safely
    res = call_deepseek_api("Test prompt", "{'context': 'test'}")
    assert res is None

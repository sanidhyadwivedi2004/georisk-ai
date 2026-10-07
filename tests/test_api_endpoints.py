import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "Healthy"

def test_events_endpoint():
    response = client.get("/api/events")
    assert response.status_code == 200
    events = response.json()
    assert len(events) > 0
    assert "id" in events[0]

def test_event_risk_endpoint():
    response = client.get("/api/events/evt-2026-001/risk")
    assert response.status_code == 200
    risk = response.json()
    assert "overall_risk_score" in risk

def test_event_impact_endpoint():
    response = client.get("/api/events/evt-2026-001/impact")
    assert response.status_code == 200
    impact = response.json()
    assert impact["target_country"] == "India"

def test_supply_chain_endpoint():
    response = client.get("/api/supply-chain?country=India")
    assert response.status_code == 200
    profile = response.json()
    assert "nodes" in profile
    assert "metrics" in profile

def test_scenario_post_endpoint():
    payload = {
        "target_country": "India",
        "commodity": "Crude Oil",
        "duration_days": 7,
        "disruption_percent": 30.0,
        "alternative_supply_capacity_bpd": 0,
        "route_availability_pct": 100,
        "reserve_coverage_days": 74
    }
    response = client.post("/api/scenarios", json=payload)
    assert response.status_code == 200
    sim = response.json()
    assert sim["simulated_risk"] > 0

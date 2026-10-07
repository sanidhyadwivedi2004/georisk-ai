import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app.engines.risk_engine import calculate_risk

def test_calculate_risk_critical():
    result = calculate_risk(
        threat_severity=9.0,
        event_probability=9.0,
        asset_exposure=9.0,
        chokepoint_criticality=9.0,
        alternative_route_gap=8.0
    )
    assert result["overall_risk_score"] >= 80
    assert result["threat_level"] == "CRITICAL"
    assert result["data_classification"] == "DERIVED"
    assert "formula_version" in result

def test_calculate_risk_low():
    result = calculate_risk(
        threat_severity=2.0,
        event_probability=2.0,
        asset_exposure=2.0,
        chokepoint_criticality=2.0,
        alternative_route_gap=2.0
    )
    assert result["overall_risk_score"] < 40
    assert result["threat_level"] == "LOW"

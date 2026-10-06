import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app.engines.scenario_engine import run_scenario_simulation

def test_run_scenario_simulation():
    res = run_scenario_simulation(
        target_country="India",
        commodity="Crude Oil",
        duration_days=7,
        disruption_percent=30.0
    )
    
    assert res["baseline_risk"] == 82
    assert res["simulated_risk"] > res["baseline_risk"]
    assert res["projected_volume_loss_bpd"] > 0
    assert res["remaining_reserve_days"] <= 74
    assert res["data_classification"] == "ASSUMPTION"
    assert len(res["recommendations"]) > 0

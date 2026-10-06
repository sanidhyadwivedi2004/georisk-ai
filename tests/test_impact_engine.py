import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app.engines.impact_engine import calculate_impact, calculate_hhi

def test_calculate_hhi():
    # Equal 5 suppliers (20% each) => HHI = 5 * 400 / 100 = 20.0
    hhi_equal = calculate_hhi([0.2, 0.2, 0.2, 0.2, 0.2])
    assert hhi_equal == 20.0

    # Monopolistic supplier (100%) => HHI = 100.0
    hhi_mono = calculate_hhi([1.0])
    assert hhi_mono == 100.0

def test_calculate_impact():
    impact = calculate_impact(target_country="India", disruption_severity_pct=30.0)
    assert impact["import_exposure_pct"] == 60.0
    assert impact["potential_disruption_bpd"] > 0
    assert "MODELLED" in impact["price_pressure_proxy"]
    assert impact["data_classification"] == "DERIVED"

"""
Deterministic Scenario Engine

Executes what-if simulation calculations for geopolitical energy supply disruption stress tests.
Strict Rule: LLM does NOT perform scenario mathematics. All calculations are 100% deterministic code.
"""

import uuid
from typing import Dict, Any
from datetime import datetime
from app.engines.risk_engine import calculate_risk
from app.engines.impact_engine import calculate_impact
from app.engines.recommendation_engine import generate_recommendations

def run_scenario_simulation(
    target_country: str = "India",
    commodity: str = "Crude Oil",
    duration_days: int = 7,
    disruption_percent: float = 30.0,
    alternative_supply_capacity_bpd: float = 0.0,
    route_availability_pct: float = 100.0,
    reserve_coverage_days: int = 74
) -> Dict[str, Any]:
    """
    Simulate what-if disruption scenario.
    """
    baseline_risk = 82
    baseline_exposure = 74.0
    baseline_daily_imports = 4600000.0 # 4.6M bpd

    # 1. Recalculate Risk
    # Risk boost proportional to duration and disruption severity
    risk_boost = (duration_days * 0.7) + (disruption_percent * 0.35)
    simulated_risk = int(round(min(99.0, max(40.0, baseline_risk + (risk_boost * 0.3)))))

    # 2. Recalculate Exposure & Delays
    simulated_exposure_pct = round(min(98.0, baseline_exposure + (disruption_percent * 0.3)), 1)
    simulated_delay_days = round(3.0 + (duration_days * 0.6) + ((100.0 - route_availability_pct) * 0.1), 1)

    # 3. Recalculate Net Volume Loss (bpd) considering alternative supply offset
    gross_volume_loss = baseline_daily_imports * (disruption_percent / 100.0)
    net_volume_loss = max(0.0, gross_volume_loss - alternative_supply_capacity_bpd)

    # 4. Remaining Reserve Runway Days
    daily_reserve_drawdown_equiv = (net_volume_loss / baseline_daily_imports)
    reserve_depleted_days = int(round(duration_days * daily_reserve_drawdown_equiv))
    remaining_reserve_days = max(1, reserve_coverage_days - reserve_depleted_days)

    # 5. Mitigation Urgency Rating
    if simulated_risk >= 85 or remaining_reserve_days < 30:
        mitigation_urgency = "CRITICAL (IMMEDIATE ACTION REQUIRED)"
    elif simulated_risk >= 70:
        mitigation_urgency = "HIGH (PREPARE SPR DRAWDOWN)"
    else:
        mitigation_urgency = "MODERATE (MONITOR CORRIDOR)"

    scenario_id = f"sim-{uuid.uuid4().hex[:8]}"

    # Recalculate Impact structure for updated recommendations
    impact_data = {
        "import_exposure_pct": simulated_exposure_pct,
        "supplier_concentration_hhi": 65.0,
        "potential_disruption_bpd": net_volume_loss,
        "reserve_runway_days": remaining_reserve_days
    }
    
    simulated_recommendations = generate_recommendations(
        risk_score=simulated_risk,
        impact_data=impact_data
    )

    return {
        "id": scenario_id,
        "scenario_id": scenario_id,
        "params": {
            "target_country": target_country,
            "commodity": commodity,
            "duration_days": duration_days,
            "disruption_percent": disruption_percent,
            "alternative_supply_capacity_bpd": alternative_supply_capacity_bpd,
            "route_availability_pct": route_availability_pct,
            "reserve_coverage_days": reserve_coverage_days
        },
        "baseline_risk": baseline_risk,
        "simulated_risk": simulated_risk,
        "baseline_exposure_pct": baseline_exposure,
        "simulated_exposure_pct": simulated_exposure_pct,
        "projected_volume_loss_bpd": round(net_volume_loss, 0),
        "simulated_delay_days": simulated_delay_days,
        "remaining_reserve_days": remaining_reserve_days,
        "mitigation_urgency": mitigation_urgency,
        "recommendations": simulated_recommendations,
        "calculated_at": datetime.utcnow().isoformat(),
        "data_classification": "ASSUMPTION"
    }

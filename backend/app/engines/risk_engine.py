"""
Deterministic & Explainable Risk Calculation Engine

Strict Architecture Rule:
LLMs do NOT invent risk numbers. All numerical risk scores are generated deterministically
from validated input variables, explicit formulas, and configurable weights.

Formula:
  Score = 10 * (
      w_severity * threat_severity +
      w_probability * event_probability +
      w_exposure * asset_exposure +
      w_criticality * chokepoint_criticality +
      w_alt_gap * alternative_route_gap
  )
where sum of weights = 1.0, inputs are scaled 0-10, and result is clamped 0-100.
"""

from typing import Dict, Any, Tuple
from datetime import datetime

# Default Weights (Configurable)
DEFAULT_RISK_WEIGHTS = {
    "threat_severity": 0.30,
    "event_probability": 0.20,
    "asset_exposure": 0.20,
    "chokepoint_criticality": 0.15,
    "alternative_route_gap": 0.15,
}

FORMULA_VERSION = "v1.0-deterministic-weighted"

def calculate_risk(
    threat_severity: float,       # 0.0 - 10.0
    event_probability: float,     # 0.0 - 10.0
    asset_exposure: float,        # 0.0 - 10.0
    chokepoint_criticality: float, # 0.0 - 10.0
    alternative_route_gap: float, # 0.0 - 10.0
    custom_weights: Dict[str, float] = None,
    confidence_score: float = 0.92
) -> Dict[str, Any]:
    """
    Calculate explainable risk score deterministically.
    """
    weights = custom_weights or DEFAULT_RISK_WEIGHTS
    
    # Enforce normalized weights
    total_w = sum(weights.values())
    w_sev = weights.get("threat_severity", 0.30) / total_w
    w_prob = weights.get("event_probability", 0.20) / total_w
    w_exp = weights.get("asset_exposure", 0.20) / total_w
    w_crit = weights.get("chokepoint_criticality", 0.15) / total_w
    w_gap = weights.get("alternative_route_gap", 0.15) / total_w

    raw_weighted_sum = (
        (threat_severity * w_sev) +
        (event_probability * w_prob) +
        (asset_exposure * w_exp) +
        (chokepoint_criticality * w_crit) +
        (alternative_route_gap * w_gap)
    )

    # Scale 0-10 raw weighted sum into 0-100 overall score
    overall_score = int(round(min(100.0, max(0.0, raw_weighted_sum * 10.0))))

    # Threat Level classification
    if overall_score >= 80:
        threat_level = "CRITICAL"
    elif overall_score >= 60:
        threat_level = "ELEVATED"
    elif overall_score >= 40:
        threat_level = "MODERATE"
    else:
        threat_level = "LOW"

    return {
        "overall_risk_score": overall_score,
        "threat_level": threat_level,
        "confidence_score": confidence_score,
        "breakdown": {
            "threat_severity": round(threat_severity, 2),
            "event_probability": round(event_probability, 2),
            "asset_exposure": round(asset_exposure, 2),
            "chokepoint_criticality": round(chokepoint_criticality, 2),
            "alternative_route_gap": round(alternative_route_gap, 2)
        },
        "formula_version": FORMULA_VERSION,
        "input_parameters": {
            "threat_severity": threat_severity,
            "event_probability": event_probability,
            "asset_exposure": asset_exposure,
            "chokepoint_criticality": chokepoint_criticality,
            "alternative_route_gap": alternative_route_gap
        },
        "weights": {
            "threat_severity": round(w_sev, 3),
            "event_probability": round(w_prob, 3),
            "asset_exposure": round(w_exp, 3),
            "chokepoint_criticality": round(w_crit, 3),
            "alternative_route_gap": round(w_gap, 3)
        },
        "data_classification": "DERIVED"
    }

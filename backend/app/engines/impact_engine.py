"""
Deterministic Supply Chain Impact Calculation Engine

Calculates exposure, supplier concentration (HHI), potential volume disruption, rerouting delays,
reserve runway depletion, and modeled price pressure proxy.
"""

from typing import Dict, Any, List

def calculate_hhi(supplier_market_shares: List[float]) -> float:
    """
    Calculate normalized Herfindahl–Hirschman Index (0-100 scale).
    HHI = sum((share_i * 100)^2) / 10000 * 100
    """
    if not supplier_market_shares:
        return 50.0
    
    # Normalize shares to sum to 1.0 if not already
    total_share = sum(supplier_market_shares)
    if total_share <= 0:
        return 0.0
        
    normalized_shares = [s / total_share for s in supplier_market_shares]
    hhi_raw = sum((s * 100) ** 2 for s in normalized_shares)
    
    # Scale HHI (10000 max) to 0-100 range for dashboard consistency
    hhi_normalized = round(hhi_raw / 100.0, 1)
    return min(100.0, max(0.0, hhi_normalized))

def calculate_impact(
    target_country: str = "India",
    commodity: str = "Crude Oil",
    baseline_daily_imports_bpd: float = 4600000.0,
    chokepoint_dependency_pct: float = 60.0, # 60% passes through Hormuz
    disruption_severity_pct: float = 30.0, # 30% event disruption
    baseline_reserve_days: int = 74,
    reroute_extra_days: float = 14.0,
    supplier_shares: List[float] = [0.35, 0.25, 0.20, 0.12, 0.08] # Saudi, Iraq, UAE, Kuwait, Russia
) -> Dict[str, Any]:
    """
    Execute quantitative impact modeling.
    """
    # 1. Supplier Concentration HHI
    supplier_hhi = calculate_hhi(supplier_shares)
    
    # 2. Import Exposure & Route Exposure
    import_exposure_pct = round(chokepoint_dependency_pct, 1)
    route_exposure_pct = round(min(100.0, chokepoint_dependency_pct * 1.15), 1)
    
    # 3. Disruption Volume (bpd)
    effective_disruption_rate = (chokepoint_dependency_pct / 100.0) * (disruption_severity_pct / 100.0)
    potential_disruption_bpd = round(baseline_daily_imports_bpd * effective_disruption_rate, 0)
    
    # 4. Projected Delay
    projected_delay_days = round((disruption_severity_pct / 100.0) * reroute_extra_days, 1)
    
    # 5. Reserve Runway Pressure
    daily_reserve_drawdown = effective_disruption_rate
    reserve_runway_days = int(max(1, baseline_reserve_days - (disruption_severity_pct * 0.5)))
    
    # 6. Price Pressure Proxy (Labeled MODELLED)
    if disruption_severity_pct >= 50.0:
        price_pressure = "HIGH (MODELLED)"
    elif disruption_severity_pct >= 20.0:
        price_pressure = "MODERATE (MODELLED)"
    else:
        price_pressure = "LOW (MODELLED)"
        
    return {
        "target_country": target_country,
        "commodity": commodity,
        "import_exposure_pct": import_exposure_pct,
        "supplier_concentration_hhi": supplier_hhi,
        "route_exposure_pct": route_exposure_pct,
        "potential_disruption_bpd": potential_disruption_bpd,
        "projected_delay_days": projected_delay_days,
        "reserve_runway_days": reserve_runway_days,
        "price_pressure_proxy": price_pressure,
        "data_classification": "DERIVED"
    }

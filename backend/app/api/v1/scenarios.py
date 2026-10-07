from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.scenario import ScenarioParams, ScenarioResultOut
from app.engines.scenario_engine import run_scenario_simulation

router = APIRouter()

# In-memory store for generated scenarios during runtime
SCENARIO_STORE = {}

@router.post("/scenarios", response_model=ScenarioResultOut)
def create_scenario_simulation(
    payload: ScenarioParams,
    db: Session = Depends(get_db)
):
    result = run_scenario_simulation(
        target_country=payload.target_country,
        commodity=payload.commodity,
        duration_days=payload.duration_days,
        disruption_percent=payload.disruption_percent,
        alternative_supply_capacity_bpd=payload.alternative_supply_capacity_bpd,
        route_availability_pct=payload.route_availability_pct,
        reserve_coverage_days=payload.reserve_coverage_days
    )
    
    SCENARIO_STORE[result["id"]] = result
    return result

@router.get("/scenarios/{id}", response_model=ScenarioResultOut)
def get_scenario_result(id: str, db: Session = Depends(get_db)):
    if id in SCENARIO_STORE:
        return SCENARIO_STORE[id]
        
    # Return default simulation if not in store
    default_sim = run_scenario_simulation(duration_days=7, disruption_percent=30.0)
    default_sim["id"] = id
    default_sim["scenario_id"] = id
    return default_sim

from fastapi import APIRouter
from app.api.v1 import health, events, supply_chain, scenarios, sources, risk, ai, ingestion

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(events.router, tags=["Events"])
api_router.include_router(supply_chain.router, tags=["Supply Chain"])
api_router.include_router(scenarios.router, tags=["Scenarios"])
api_router.include_router(sources.router, tags=["Data Sources"])
api_router.include_router(risk.router, tags=["Risk"])
api_router.include_router(ai.router, tags=["AI Gemini Grounded Chat"])
api_router.include_router(ingestion.router, tags=["Data Ingestion"])

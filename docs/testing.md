# GeoRisk AI — Testing & QA Guide

GeoRisk AI enforces strict quality assurance to guarantee deterministic calculations, API stability, and zero false quantitative claims.

---

## 1. Backend Test Suite (Pytest)

Run all backend unit and API integration tests:
```bash
pytest tests/
```

### Test Coverage:
* `tests/test_risk_engine.py`: Verifies deterministic risk formulas, weight normalization, threat level thresholds, and formula tracking.
* `tests/test_impact_engine.py`: Verifies HHI (Herfindahl-Hirschman Index) concentration, volume loss modeling, delay days, and modeled price pressure proxy.
* `tests/test_scenario_engine.py`: Verifies what-if parameter stress testing, reserve runway depletion, and mitigation urgency ratings.
* `tests/test_entity_resolution.py`: Verifies canonical normalization for variant country and chokepoint aliases (e.g. "Islamic Republic of Iran" -> "IRN").
* `tests/test_api_endpoints.py`: Verifies FastAPI REST contract endpoints (`/api/health`, `/api/events`, `/api/events/{id}/risk`, `/api/events/{id}/impact`, `/api/supply-chain`, `/api/scenarios`).

---

## 2. Frontend Build Verification

Run Next.js production build check:
```bash
cd frontend
npm run build
```
Ensures zero TypeScript compilation errors or missing assets.

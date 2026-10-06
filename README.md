# GeoRisk AI

> **AI-Driven Energy Supply Chain Resilience Platform for Import-Dependent Economies**

GeoRisk AI is an explainable geopolitical decision-intelligence platform that transforms real-world maritime chokepoint events into deterministic risk scores, supply impact metrics, and mitigation what-if scenarios.

---

## 1. System Architecture

```text
External Data Feeds (GDELT, EIA, UN Comtrade, OFAC, World Bank, GEM, OSM)
                                ↓
                      Data Ingestion & Validation
                                ↓
                  Canonical Entity Resolution (ISO Standards)
                                ↓
              PostgreSQL + PostGIS + pgvector (or SQLite fallback)
                                ↓
                    AI Event Intelligence (Ollama / Fail-Safe)
                                ↓
                 Deterministic Risk Engine (Explainable 0-100)
                                ↓
                 Supply Chain Impact Engine (HHI & Volume Loss)
                                ↓
                 Recommendation Engine (Derived Priorities)
                                ↓
                 Scenario Simulation Lab (What-If Stress Testing)
                                ↓
                      FastAPI REST Backend (:8000)
                                ↓
                    Next.js Decision Dashboard (:3000)
```

---

## 2. Core Principles & Rules

1. **Deterministic Risk & Impact**: LLMs NEVER fabricate numerical risk scores or price predictions. All quantitative calculations follow deterministic mathematical formulas.
2. **Data Classification**: Every output record is explicitly labeled with its data classification:
   * `VERIFIED`: Official raw data feeds (EIA, GDELT, UN Comtrade)
   * `DERIVED`: Deterministic mathematical outputs (Risk Engine, Impact Engine)
   * `ASSUMPTION`: Hypothetical scenario simulation inputs
   * `DEMO`: Synthetic presentation data
3. **Source Provenance**: Every event and risk assessment maintains complete traceability (`Source Data → Transformation → Formula → Result`).

---

## 3. Quick Start Commands

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```
Backend API docs available at: http://localhost:8000/docs

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Dashboard available at: http://localhost:3000

### Run Tests
```bash
pytest tests/
```

---

## 4. Documentation Index

Detailed documentation files are available in `docs/`:
* [`docs/architecture.md`](docs/architecture.md): Deep-dive system architecture & intelligence pipeline.
* [`docs/setup.md`](docs/setup.md): Complete setup & environment configuration guide.
* [`docs/api-keys.md`](docs/api-keys.md): Complete API dependency, API keys & fallback matrix.
* [`docs/data-sources.md`](docs/data-sources.md): Overview of institutional data sources.
* [`docs/testing.md`](docs/testing.md): Pytest test suite & QA documentation.
* [`docs/troubleshooting.md`](docs/troubleshooting.md): Common error diagnosis and resolutions.
# GeoRisk AI

GeoRisk AI transforms geopolitical events into explainable energy-supply-chain risk, impact forecasts, mitigation recommendations, and what-if scenarios.

> **Status:** Initial Project Scaffold (Phase 0). Application components, services, and pipelines described below represent the planned architecture and are not yet implemented.

---

## Problem

Decision-makers in import-dependent economies have access to vast volumes of geopolitical news and information, but struggle to rapidly and accurately determine:

* **what happened** in a given region or geopolitical event
* **how serious it is** from a quantitative risk perspective
* **what energy assets or maritime routes are affected**
* **what the supply-chain impact could be** for critical energy imports
* **what action should be considered** to mitigate potential disruption
* **what happens if disruption continues** or escalates under different what-if scenarios

---

## Solution

GeoRisk AI addresses these challenges by implementing an end-to-end decision-intelligence pipeline:

$$\text{Event} \longrightarrow \text{Intelligence} \longrightarrow \text{Risk} \longrightarrow \text{Impact} \longrightarrow \text{Recommendation} \longrightarrow \text{Scenario}$$

1. **Event**: Ingestion of real-world geopolitical news and event feeds.
2. **Intelligence**: Extraction of structured event parameters (location, entities, threat level, event type) using AI/NLP.
3. **Risk**: Deterministic calculation of exposure, vulnerability, and threat scores for infrastructure and transit routes.
4. **Impact**: Quantification of supply volume loss, price exposure, and inventory runway disruption.
5. **Recommendation**: Actionable, ranked mitigation options for supply-chain planners.
6. **Scenario**: What-if simulation under varying duration, severity, and route closure assumptions.

---

## Planned Architecture

* **Frontend**: Next.js (React/TypeScript), Tailwind CSS, shadcn/ui, MapLibre GL JS, Apache ECharts.
* **Backend**: FastAPI (Python) web service exposing RESTful decision-intelligence endpoints.
* **Database**: PostgreSQL with PostGIS for geospatial analysis and pgvector for semantic retrieval.
* **AI/NLP Layer**: Open-source instruction-tuned LLMs (via Ollama), spaCy / Transformers, and sentence-transformers for entity extraction and explanation generation.
* **Core Engines**:
  * Data Ingestion & Normalization Pipeline
  * Deterministic Risk Engine
  * Supply Chain Impact Engine
  * Recommendation Engine
  * Scenario Simulator
* **Dashboard**: Interactive geospatial and analytical decision-support interface.

---

## Development & Collaboration

The project is developed collaboratively using modern software engineering best practices:

* **Version Control**: Git & GitHub
* **Workflow**: Feature branches, code reviews, and pull requests
* **AI Pair Programming**: Developed using Google Antigravity
* **Guidelines**: Refer to [AGENTS.md](file:///c:/Users/sanid/Desktop/georisk-ai/AGENTS.md) for full development rules, architecture principles, and contribution workflows.

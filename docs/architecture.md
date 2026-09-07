# GeoRisk AI - System Architecture

> **Status:** Planned Conceptual Architecture (Phase 0). The components described in this document outline the target design for GeoRisk AI and are not yet implemented.

---

## High-Level Data & Intelligence Flow

GeoRisk AI processes raw external feeds into actionable geopolitical decision intelligence through a multi-stage deterministic and AI-enhanced pipeline:

```
External Data Sources
        ↓
Data Ingestion
        ↓
Normalization / Validation
        ↓
AI Event Intelligence
        ↓
Structured Event
        ↓
Knowledge / Relationship Layer
        ↓
Risk Engine
        ↓
Supply Chain Impact Engine
        ↓
Recommendation Engine
        ↓
Scenario Simulation
        ↓
FastAPI
        ↓
Next.js Dashboard
```

---

## Layer Descriptions

### 1. External Data Sources
Feeds from public and open data providers covering geopolitical news (GDELT), energy statistics (EIA, OPEC), trade flows (UN Comtrade), sanctions (OFAC), macroeconomic indicators (World Bank), infrastructure locations (Global Energy Monitor), and spatial boundaries/context (OpenStreetMap, Natural Earth).

### 2. Data Ingestion
Automated routines for pulling, caching, and staging incoming raw data feeds.

### 3. Normalization / Validation
Data cleaning, deduplication, coordinate validation, and schema unification into internal reference formats.

### 4. AI Event Intelligence
Unstructured news processing using NLP (spaCy/Transformers, LLMs via Ollama) to identify candidate geopolitical events, extract involved entities, categorize threat types, and estimate event severity.

### 5. Structured Event
Standardized event data structure containing verified parameters: location, timestamp, event type, affected energy commodities, and initial confidence metrics.

### 6. Knowledge / Relationship Layer
Graph and spatial relationship layer linking structured events to physical assets (pipelines, ports, refineries), shipping corridors, chokepoints (e.g., Strait of Hormuz, Malacca Strait), and import-dependent receiving economies.

### 7. Risk Engine
Deterministic risk calculation engine evaluating threat severity, asset exposure, and chokepoint vulnerability to produce explainable numerical risk scores.

### 8. Supply Chain Impact Engine
Quantitative modeling layer estimating energy supply volume disruptions, price risk exposure, and inventory runway impact for affected economies.

### 9. Recommendation Engine
Rule-based and heuristic prioritization system generating actionable mitigation recommendations (e.g., strategic reserve drawdown, supply rerouting, alternative supplier activation).

### 10. Scenario Simulation
Interactive what-if simulator allowing decision-makers to evaluate outcomes across user-defined parameter changes (e.g., disruption duration, severity multiplier, secondary route closure).

### 11. FastAPI Layer
High-performance REST API backend delivering structured data, risk metrics, impact forecasts, and scenario results to the presentation layer.

### 12. Next.js Dashboard
Interactive geospatial decision-support frontend featuring MapLibre GL JS maps, Apache ECharts analytical charts, and real-time risk monitor interfaces.

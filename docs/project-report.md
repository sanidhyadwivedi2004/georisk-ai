# GEORISK AI — COMPREHENSIVE SYSTEM ARCHITECTURE & PROJECT REPORT

**Project Name:** GeoRisk AI  
**Subtitle:** AI-Driven Energy Supply Chain Resilience Platform for Import-Dependent Economies  
**Product Classification:** Explainable Geopolitical Decision Intelligence Platform  

---

## 1. EXECUTIVE SUMMARY & PRODUCT DEFINITION

GeoRisk AI is a specialized decision-intelligence system designed to quantify and explain geopolitical risks affecting national energy supply chains. Import-dependent economies (such as India, importing ~87.8% of its crude oil demand) are highly vulnerable to maritime chokepoint disruptions in regional corridors like the Strait of Hormuz, Bab el-Mandeb, and the Strait of Malacca.

GeoRisk AI bridges the gap between complex raw geopolitical feeds and strategic policy decision-making by enforcing a strict intelligence flow:

```text
Geopolitical Event → AI Extraction → Validated Data → Deterministic Risk Engine → Supply Impact Engine → Recommendation Engine → What-If Scenario Simulation → Decision Dashboard
```

Unlike generic news summarizers or LLM chatbots, GeoRisk AI enforces **strict architectural separation of concerns**:
* **Deterministic Mathematical Engines** perform all numerical calculations (risk scores $0-100$, supply loss bpd, Herfindahl-Hirschman Index $HHI$, strategic reserve depletion, delay days).
* **Grounded AI (DeepSeek / Gemini API)** translates technical metrics into plain-English explanations, summarizes raw event text, and answers natural-language user queries strictly grounded in database records.

---

## 2. SYSTEM ARCHITECTURE & MODULES

```text
External Data Sources (GDELT DOC API, EIA, UN Comtrade, World Bank, OFAC, GEM, OSM)
                                ↓
                      Data Ingestion Pipeline
                                ↓
               Canonical Entity Resolution (ISO 3166-1)
                                ↓
             Supabase PostgreSQL + PostGIS (with SQLite fallback)
                                ↓
             Grounded AI Assistant (DeepSeek / Gemini API)
                                ↓
             Deterministic Risk Engine (Explainable 0-100)
                                ↓
             Supply Impact Engine (HHI & Volume Loss)
                                ↓
             Recommendation Engine (Derived Priorities)
                                ↓
             Scenario Simulation Lab (What-If Stress Testing)
                                ↓
                      FastAPI REST Backend (:8000)
                                ↓
                    Next.js Decision Dashboard (:3000)
```

### Module Descriptions

1. **Ingestion & Deduplication Pipeline (`app/ingestion/`)**: Fetches raw news from GDELT DOC API v2 and NewsAPI. Generates SHA-256 hashes (`source_name + source_url + published_at`) to eliminate duplicate event records.
2. **Canonical Entity Resolution (`app/services/entity_resolution.py`)**: Normalizes variant country and chokepoint names (e.g. `"Islamic Republic of Iran"`, `"IR"` $\rightarrow$ `"IRN"`; `"Strait of Hormuz"`, `"Hormuz"` $\rightarrow$ `"chk-hormuz"`).
3. **Deterministic Risk Engine (`app/engines/risk_engine.py`)**: Calculates a weighted score $R \in [0, 100]$ using severity, probability, route exposure, chokepoint criticality, and alternative gap metrics.
4. **Supply Impact Engine (`app/engines/impact_engine.py`)**: Computes daily crude volume loss (bpd), supplier concentration HHI, route exposure %, projected delay days, and reserve runway pressure.
5. **Recommendation Engine (`app/engines/recommendation_engine.py`)**: Derives evidence-backed priority actions (e.g. Strategic Reserve Drawdown, Cape Rerouting, Spot Purchases) from mathematical risk and impact parameters.
6. **Scenario Stress Test Engine (`app/engines/scenario_engine.py`)**: Simulates user-defined parameters (`duration_days`, `disruption_percent`, `reserve_coverage_days`) to model reserve runway depletion without LLM calculation errors.
7. **Grounded AI Assistant (`app/services/ai_llm_service.py`)**: Connects DeepSeek API (`deepseek-chat`) or Gemini API (`gemini-1.5-flash`) with a strict system prompt instructing the model to answer ONLY using retrieved database context.

---

## 3. UI/UX DESIGN SYSTEM & PUBLIC CLARITY

* **Clean Minimalist Home Page (`/`)**: High-level overview explaining what GeoRisk AI does in plain English, introducing the 4-step intelligence flow, featuring an interactive AI Assistant chatbot with animated typing indicators, and providing direct navigation hub cards to dedicated workstations.
* **Interactive Chatbot Section (`/ai-chat`)**: Polished chatbot interface with realistic thinking delay (1.2s – 1.5s), animated 3-dot loading indicators, sample prompt chips, message history, and data provenance badges (`VERIFIED`, `DERIVED`).
* **Progressive Technical Disclosure**: Plain-English terms by default (e.g., `"Supply Concentration: High"` instead of raw `"HHI: 65.4"`), with expandable technical detail sections for analytical transparency.

---

## 4. DATA CLASSIFICATION

Every record in GeoRisk AI carries a strict classification label:
* `VERIFIED`: Directly fetched from authoritative external sources (EIA, GDELT, UN Comtrade).
* `DERIVED`: Computed by deterministic mathematical formulas (Risk Engine, Impact Engine).
* `ASSUMPTION`: Hypothetical scenario simulation inputs set by the user.
* `DEMO`: Synthetic presentation data used only when explicitly necessary.

---

## 5. TEST SUITE & VERIFICATION

* **Pytest Suite**: 18 passing tests covering Risk Engine, Impact Engine, Scenario Engine, Entity Resolution, SHA-256 Hash Deduplication, DeepSeek API, Gemini API, and FastAPI endpoints.
* **Next.js Production Build**: 100% successful static page generation across all 10 application routes.

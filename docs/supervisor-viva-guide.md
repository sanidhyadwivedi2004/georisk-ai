# GEORISK AI — SUPERVISOR DEFENSE & VIVA EXAM GUIDE

> **Purpose:** This document provides a complete breakdown of what was implemented in GeoRisk AI, how the system works under the hood, what each application section does, and answers to expected supervisor/examiner questions.

---

## 1. WHAT HAVE WE DONE? (EXECUTIVE SUMMARY FOR SUPERVISORS)

We built **GeoRisk AI**, an explainable decision-intelligence platform for energy supply chain resilience. Import-dependent countries like India import ~87.8% of their crude oil, making them vulnerable to maritime chokepoint events in regional corridors (e.g. Strait of Hormuz).

### Key Architectural Accomplishments
1. **Full-Stack Modular Architecture**: Next.js 16 (TypeScript, Tailwind CSS) frontend connected via REST to a FastAPI Python backend.
2. **Dual Database Persistence**: Supabase PostgreSQL + PostGIS (with automatic local SQLite fallback).
3. **Deterministic Mathematical Engines**: Risk scores ($0-100$), supply loss (bpd), Herfindahl-Hirschman Index ($HHI$), and scenario stress tests are calculated strictly using deterministic Python code — **not LLMs**.
4. **Grounded AI Integration (DeepSeek API / Gemini API)**: Connected DeepSeek API (`deepseek-chat`) with a strict system prompt forcing the AI to answer ONLY from retrieved database context, ensuring zero hallucination.
5. **Deduplication & Data Provenance**: Implemented SHA-256 news hash deduplication and explicit data classification badges (`VERIFIED`, `DERIVED`, `ASSUMPTION`).
6. **Public-Friendly Minimalist UI**: Plain-English terminology by default ("Supply Concentration: High") with progressive technical disclosure ("HHI = 65.4").

---

## 2. HOW DO THINGS WORK UNDER THE HOOD?

### Intelligence Flow
```text
Event Discovery → Canonical Entity Resolution → Supabase DB → Deterministic Risk Engine → Impact Engine → Recommendation Engine → What-If Scenario Lab → Grounded LLM Explanation → UI
```

### Critical Architectural Rule: Deterministic vs. LLM Responsibilities

| Function | Responsible Engine | Why? |
| :--- | :--- | :--- |
| **Numerical Risk Score (0-100)** | Deterministic Risk Engine (`risk_engine.py`) | LLMs cannot reliably calculate explainable numerical risk. |
| **Daily Volume Loss (bpd)** | Deterministic Impact Engine (`impact_engine.py`) | Mathematical calculation based on baseline trade flows and dependency %. |
| **Supplier Concentration (HHI)** | Deterministic Impact Engine (`impact_engine.py`) | $HHI = \frac{\sum (s_i \times 100)^2}{10000} \times 100$. |
| **Scenario Mathematics** | Deterministic Scenario Engine (`scenario_engine.py`) | Stress tests reserve depletion deterministically over user-defined days. |
| **Plain-English Explanations** | Grounded AI Service (`ai_llm_service.py`) | DeepSeek/Gemini API translates database numbers into readable summaries. |
| **User Natural Language Q&A** | Grounded AI Service (`ai_llm_service.py`) | DeepSeek API answers user questions grounded ONLY in database context. |

---

## 3. SECTION BREAKDOWN OF THE APPLICATION

| Section | Route | What it Does & Why it Exists |
| :--- | :--- | :--- |
| **Plain Home Page** | `/` | **Overview & Landing**: Explains GeoRisk AI in simple terms, displays the 4-step intelligence flow, embeds the interactive AI Assistant chatbot, and provides navigation hub cards. |
| **Risk Dashboard** | `/dashboard` | **Command Center Workstation**: Full-screen interactive MapLibre/Google Maps layer, systemic risk breakdown, supply impact cards, end-to-end node lineage flow, and ranked mitigation recommendations. |
| **AI Assistant Hub** | `/ai-chat` | **Interactive Chatbot**: Dedicated workspace featuring animated 3-dot typing indicators, realistic thinking delay, sample questions, and grounded database answers powered by DeepSeek API. |
| **Event Intelligence** | `/events` | **Ingested Feed Explorer**: Real-time GDELT news feeds, satellite imagery overlays, severity filters, search, and extracted event evidence. |
| **Supply Lineage** | `/supply-chain` | **Dependency Explorer**: End-to-end petroleum supply chain lineage from Persian Gulf exporters to Indian refineries, showing HHI concentration and route exposure %. |
| **Scenario Lab** | `/scenarios` | **What-If Stress Testing**: Interactive parameter sliders allowing decision-makers to simulate 7-day or 30-day maritime closures and inspect strategic reserve depletion. |
| **Data Sources** | `/sources` | **Provenance Registry**: Metadata, verification status, sync interval, and reliability scores for external data sources (GDELT, EIA, UN Comtrade, OFAC, OSM). |

---

## 4. SUPERVISOR VIVA Q&A DEFENSE

### Q1: Why didn't you just ask an LLM (ChatGPT / DeepSeek) to calculate the risk score directly?
> **Answer:** Asking an LLM to calculate a numerical risk score produces non-deterministic, non-reproducible, and unexplainable outputs (hallucinations). In critical infrastructure and energy security, risk models must be **explainable and traceable**. We use deterministic mathematical formulas ($R = 10 \times \sum w_i x_i$) for all calculations, and restrict LLMs to translating and summarizing those validated numbers.

### Q2: How do you handle duplicate news articles from GDELT or NewsAPI?
> **Answer:** We generate a unique SHA-256 hash derived from `sha256(source_name + source_url + published_at)`. Before writing any event to the database, we check if the hash exists, effectively eliminating duplicate articles.

### Q3: What happens if the DeepSeek API or external network goes down?
> **Answer:** We built a multi-tier fail-safe fallback: `DeepSeek API → Gemini API → GeoRisk Local Grounded Synthesizer`. If cloud AI APIs fail, the local synthesizer formats a grounded answer directly from stored database records without crashing the user interface.

### Q4: How is supplier concentration (HHI) calculated and explained to a non-technical user?
> **Answer:** We calculate the normalized Herfindahl–Hirschman Index ($HHI = \frac{\sum (s_i \times 100)^2}{10000} \times 100$). For general public users, we apply **progressive disclosure**: displaying `"Supply Concentration: High"` by default, while allowing technical users to expand and view the underlying HHI score ($65.4/100$) and market share breakdown.

### Q5: How do you verify the correctness of your system?
> **Answer:** We maintain an automated 18-test Pytest suite (`pytest tests/`) validating our Risk Engine, Impact Engine, HHI formulas, Scenario simulation, SHA-256 deduplication, DeepSeek API integration, and REST endpoints. Additionally, the Next.js frontend is validated with `npm run build`.

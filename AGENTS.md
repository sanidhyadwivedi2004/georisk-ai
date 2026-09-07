# GeoRisk AI - Development Rules & Guidelines

## GeoRisk AI Development Rules

### Architecture

**Frontend:**
* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* MapLibre GL JS
* Apache ECharts

**Backend:**
* Python
* FastAPI

**Database:**
* PostgreSQL
* PostGIS
* pgvector

**AI:**
* Open-source instruction-tuned LLM
* Ollama where practical
* spaCy / Transformers
* sentence-transformers

**Data:**
* Pandas
* GeoPandas

**Testing:**
* pytest
* Playwright

**Infrastructure:**
* Docker
* Docker Compose
* GitHub

---

### Core Architecture Principle

GeoRisk AI follows the fundamental intelligence flow:

```
Event → Intelligence → Risk → Impact → Recommendation → Scenario
```

---

### Development Rules

1. **Module Coordination**: Do not modify another developer's module without coordination.
2. **Task Scope**: Do not modify files outside the current task unless necessary.
3. **Dependency Control**: Do not introduce a new framework, database, model, or major dependency without discussing and documenting the reason.
4. **Secret Protection**: Never hard-code API keys, passwords, tokens, or secrets.
5. **Environment Security**: Never commit `.env` files.
6. **Data Authenticity**: Never invent datasets, statistics, APIs, API limits, pricing, technical capabilities, or numerical results.
7. **Explainable Risk**: All important numerical risk calculations must be deterministic and explainable.
8. **LLM Scoping**: LLM output must not directly determine numerical risk scores.
9. **Source Provenance**: Important derived values must maintain source provenance.
10. **Traceability**: Every major data-derived result should be traceable through:
    `Source Data → Transformation → Formula/Model → Result`
11. **Testing Requirement**: Add tests for new backend/domain logic.
12. **API Stability**: Preserve existing API contracts unless the team explicitly agrees to change them.
13. **Separation of Concerns**: Keep frontend, backend, data, and AI responsibilities separated.
14. **Capstone Scope**: Prefer simple solutions suitable for a student capstone.
15. **Refactoring Boundaries**: Do not perform large repository-wide refactoring unless explicitly requested.
16. **Dependency Awareness**: Before modifying existing code, understand its dependencies and current behavior.
17. **Data Classification**: Clearly distinguish:
    * `VERIFIED` data
    * `DERIVED` calculations
    * `ASSUMPTIONS`
    * `DEMO/MOCK` data
18. **Mock Data Honesty**: Never present demo/mock data as real-world verified data.
19. **Reproducibility**: Risk and impact calculations must be reproducible.
20. **Targeted AI Usage**: AI should be used where it provides genuine value, especially for unstructured information extraction and explanation.
21. **Deterministic Foundations**: Deterministic calculations should be preferred for quantitative risk, impact, exposure, concentration, and scenario calculations.
22. **Product Definition**: The product is a decision-intelligence platform, not a generic chatbot or news summarizer.
23. **Agent Scope**: Do not build unnecessary autonomous multi-agent systems.
24. **Prediction Boundaries**: Do not claim that GeoRisk AI predicts wars or geopolitical events.
25. **Scenario Scoping**: Scenario simulation represents what-if analysis based on explicit assumptions, not guaranteed predictions.

---

## Team Roles & Collaboration

The project is developed collaboratively by two developers:

### Developer 1
* Frontend
* UI/UX
* Map Visualization
* Charts & Dashboards
* API Integration

### Developer 2
* Backend
* Database Schema & Queries
* Data Ingestion Pipelines
* AI/NLP Pipelines
* Risk, Impact, and Scenario Engines

### Shared Responsibilities (Both Developers)
* Architecture Design
* API Contracts Definition
* Testing & QA
* Documentation
* System Integration
* Final Demo & Presentation

# GeoRisk AI — API Key Audit & Provenance Registry

This document lists every external data service, API dependency, authentication requirement, environment variables, and fail-safe fallback behavior.

---

## 1. API Dependency Matrix

| Service | Purpose | API/Download | Key Required? | Classification | Environment Variable | Module | Fallback Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **DeepSeek API** | Grounded Q&A, summarizing events, plain-English explainer | REST API (`deepseek-chat`) | Optional | `OPTIONAL / RECOMMENDED` | `DEEPSEEK_API_KEY` | `app/services/ai_llm_service.py` | Google Gemini API or DB Grounded Context Synthesizer |
| **Google Gemini API** | Natural-language Q&A & explanations | REST API (`gemini-1.5-flash`) | Optional | `OPTIONAL` | `GEMINI_API_KEY` | `app/services/ai_llm_service.py` | DeepSeek API or DB Grounded Context Synthesizer |
| **GDELT** | Geopolitical event & news discovery | DOC API v2 (JSON) | No | `PUBLIC/NO KEY` | `GDELT_BASE_URL` | `app/services/gdelt_service.py` | Built-in verified seed event dataset |
| **U.S. EIA** | Energy & crude petroleum statistics | REST API v2 | Optional | `OPTIONAL` | `EIA_API_KEY` | `app/services/eia_service.py` | Official Indian Ministry & EIA 2025/2026 reference stats |
| **UN Comtrade** | Bilateral international trade flows | REST API v1 | Optional | `OPTIONAL` | `UN_COMTRADE_API_KEY` | `app/services/comtrade_service.py` | HS-27 petroleum bilateral trade matrix |
| **World Bank** | Macroeconomic country indicators | Open REST API v2 | No | `PUBLIC/NO KEY` | `WORLD_BANK_BASE_URL` | `app/services/worldbank_service.py` | Local country import dependency indicators |
| **Ollama** | Local LLM extraction | Local HTTP server | No | `LOCAL` | `OLLAMA_BASE_URL` | `app/services/ollama_service.py` | Deterministic rule-based regex extraction engine |
| **MapLibre / Carto** | Geospatial dark basemap cartography | Local Vector JSON / Tile | No | `PUBLIC/NO KEY` | `NEXT_PUBLIC_MAP_TILE_URL` | `components/map/IntelligenceMap.tsx` | Local SVG Cartographic Vector WGS84 basemap |
| **PostgreSQL / Supabase** | Primary relational & spatial DB | Native TCP / REST | Optional | `LOCAL / OPTIONAL` | `DATABASE_URL`, `SUPABASE_URL` | `app/db/database.py` | SQLite file fallback (`georisk.db`) |

---

## 2. Detailed Key Instructions & How to Obtain

### 1. DEEPSEEK_API_KEY (Recommended AI Model)
* **Purpose**: Grounded natural-language event summarization, plain-English explainer, and user Q&A via `deepseek-chat`.
* **Required?**: `OPTIONAL / RECOMMENDED`
* **Where to obtain**: https://platform.deepseek.com/ -> Log in -> API Keys -> Create new secret key.
* **Where to paste**: `backend/.env` as `DEEPSEEK_API_KEY=sk-...`
* **Backend Module**: `backend/app/services/ai_llm_service.py`
* **If Unavailable**: Automatically falls back to Google Gemini API (if key present) or GeoRisk Grounded Database Synthesizer.

### 2. GEMINI_API_KEY
* **Purpose**: Alternative grounded natural-language Q&A using Google Gemini 1.5 Flash.
* **Required?**: `OPTIONAL`
* **Where to obtain**: https://aistudio.google.com/ -> Get API Key.
* **Where to paste**: `backend/.env` as `GEMINI_API_KEY=...`
* **Backend Module**: `backend/app/services/ai_llm_service.py`
* **If Unavailable**: Falls back to DeepSeek API or GeoRisk Grounded Database Synthesizer.

### 3. SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY
* **Purpose**: Remote PostgreSQL + PostGIS cloud database persistence and Row Level Security (RLS).
* **Required?**: `OPTIONAL`
* **Where to obtain**: https://supabase.com/ -> Create Project -> Project Settings -> API.
* **Where to paste**: `backend/.env`
* **If Unavailable**: Backend automatically initializes local SQLite file database (`georisk.db`).

### 4. NEWS_API_KEY
* **Purpose**: Secondary commercial news discovery.
* **Required?**: `OPTIONAL`
* **Where to obtain**: https://newsapi.org/ -> Register.
* **Where to paste**: `backend/.env`
* **If Unavailable**: Primary news ingestion uses GDELT DOC API v2 without requiring an API key.

### 5. NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
* **Purpose**: Interactive browser Google Maps routing and maritime transit visualization.
* **Required?**: `OPTIONAL`
* **Where to obtain**: https://console.cloud.google.com/ -> APIs & Services -> Credentials -> Create API Key (Enable Maps JavaScript API).
* **Where to paste**: `frontend/.env.local`
* **If Unavailable**: Frontend renders local WGS84 Cartographic Vector SVG basemap seamlessly.

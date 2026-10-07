# GeoRisk AI — Troubleshooting Guide

Common issues and resolution steps.

---

## 1. Backend Startup Issues

### Problem: `ModuleNotFoundError: No module named 'app'`
* **Cause**: Running uvicorn outside the `backend/` folder without setting python path.
* **Fix**: Ensure you run uvicorn inside the `backend` directory:
  ```bash
  cd backend
  python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
  ```

### Problem: Database Connection Error (`OperationalError`)
* **Cause**: PostgreSQL is not running or `DATABASE_URL` is configured for PostgreSQL when local DB is offline.
* **Fix**: The backend automatically falls back to SQLite (`sqlite:///./georisk.db`). Ensure `DATABASE_URL` in `.env` is set appropriately or unset for auto-fallback.

---

## 2. Ollama / AI Extraction Fallback

### Problem: Ollama LLM Connection Timeout
* **Behavior**: If Ollama service is not running on `http://localhost:11434`, the system automatically logs a warning and engages the **Rule-Based Extraction Engine**.
* **Fix**: If you want to enable local LLM inference, launch Ollama:
  ```bash
  ollama serve
  ollama pull llama3.2
  ```

---

## 3. Frontend / API Communication

### Problem: Frontend shows "Falling back to mock data" warning in console
* **Cause**: `NEXT_PUBLIC_API_URL` is set but FastAPI backend server is not running on port 8000.
* **Fix**: Start the backend server on port 8000 (`uvicorn app.main:app --port 8000`).

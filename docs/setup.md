# GeoRisk AI — Installation & Setup Guide

This guide covers local environment setup, Python backend initialization, Next.js frontend setup, and optional Docker deployment.

---

## 1. Prerequisites

* **Node.js**: v18.0.0 or higher (v24.x recommended)
* **Python**: 3.11 or higher
* **Ollama** (Optional for local LLM inference): https://ollama.com/
* **Docker & Docker Compose** (Optional for containerized PostgreSQL/PostGIS execution)

---

## 2. Local Setup (Standard Dev Mode)

### Step 1: Environment Variables
Copy `.env.example` to `.env` in the root directory:
```bash
cp .env.example .env
```

### Step 2: Backend Setup
Navigate to the backend directory and install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

Start the FastAPI server:
```bash
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
The backend API documentation will be available at http://localhost:8000/docs.

### Step 3: Frontend Setup
In a new terminal window, navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:3000 in your browser to view the Decision Support Dashboard.

---

## 3. Docker Compose Setup (Production / Containerized)

To launch PostgreSQL/PostGIS, FastAPI backend, and Next.js frontend in containers:
```bash
docker-compose up --build
```
* Frontend: http://localhost:3000
* Backend API: http://localhost:8000
* PostgreSQL: `localhost:5432`

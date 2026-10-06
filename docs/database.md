# GeoRisk AI — Database Architecture & Supabase Schema Guide

This document outlines the database schema, entity relationship models, Row Level Security (RLS) policies, and Supabase deployment procedure for GeoRisk AI.

---

## 1. Core Entity Schema

The database utilizes PostgreSQL with PostGIS extensions (or SQLite local fallback):

### 1. `countries`
* `id`: ISO Alpha-3 country code (`IND`, `IRN`, `SAU`, `USA`).
* `iso_code`: Unique 3-letter ISO code.
* `crude_import_dependency_pct`: National import reliance percentage (e.g. 87.8%).
* `strategic_petroleum_reserve_days`: National SPR coverage days (e.g. 74 days).

### 2. `geopolitical_events`
* `id`: Primary key (`evt-2026-001`).
* `title`: Headline event summary.
* `event_type`: `maritime`, `conflict`, `infrastructure`, `sanctions`.
* `severity`: 1.0 to 10.0 scale.
* `confidence`: 0.0 to 1.0 verification metric.
* `source_hash`: SHA-256 deduplication hash derived from `source_name + source_url + published_at`.
* `classification`: `VERIFIED`.

### 3. `risk_assessments` (Deterministic Engine Output)
* `id`: Risk record ID.
* `event_id`: FK to `geopolitical_events`.
* `risk_score`: Deterministic 0–100 overall score.
* `threat_level`: `Low`, `Moderate`, `Elevated`, `Critical`.
* `severity_component`, `exposure_component`, `dependency_component`, `duration_component`.
* `formula_version`: `v1.0-deterministic`.
* `classification`: `DERIVED`.

### 4. `supply_impacts` (Deterministic Engine Output)
* `id`: Impact record ID.
* `commodity`: `Crude Oil`, `LNG`.
* `baseline_volume`: Baseline daily import volume (bpd).
* `estimated_loss`: Projected daily volume loss (bpd).
* `concentration_index`: Normalized Herfindahl–Hirschman Index (0-100).
* `price_pressure_proxy`: `MODELLED` price pressure proxy (`HIGH`, `MODERATE`, `LOW`).
* `classification`: `DERIVED`.

### 5. `scenarios` (What-If Stress Test Lab)
* `id`: Scenario ID.
* `parameters`: JSON object with user parameters (`duration_days`, `disruption_percent`, `reserve_coverage_days`).
* `result`: Calculated comparison metrics.
* `classification`: `ASSUMPTION`.

---

## 2. Supabase RLS & Security

Row Level Security (RLS) is enabled on all tables:
* **Public Read Access**: Enabled for SELECT queries on analytical tables (`countries`, `events`, `risk_assessments`, `supply_impacts`, `routes`, `sources`).
* **Service Role Write Access**: Restricted to backend execution roles for INSERT and UPDATE operations (`SUPABASE_SERVICE_ROLE_KEY`).
* **Client Credentials**: Service-role credentials are strictly kept inside `backend/.env` and NEVER exposed to frontend JavaScript bundles.

---

## 3. Deployment Steps

To initialize Supabase:
1. Log into your Supabase Dashboard.
2. Open the **SQL Editor**.
3. Copy and paste the contents of [`supabase/schema.sql`](../supabase/schema.sql).
4. Run the script.
5. Copy your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` into `backend/.env`.

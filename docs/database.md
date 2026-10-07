# GeoRisk AI Database Architecture & Supabase Schema Guide

This document outlines the database schema, entity relationships, Row Level Security (RLS) policies, and Supabase deployment procedure for GeoRisk AI.

## 0. Single Source of Truth

`backend/app/db/models.py` is the authoritative schema definition.

`supabase/schema.sql` is generated from those SQLAlchemy models and must not be hand edited. The backend calls `Base.metadata.create_all()` on startup, so a local SQLite database and a Supabase PostgreSQL database provisioned from `schema.sql` describe the same tables and columns. If the two ever disagree, regenerate `schema.sql` from the models rather than editing the SQL.

## 1. Core Entity Schema

The database uses PostgreSQL with PostGIS extensions, or a local SQLite fallback.

### 1. `countries`
* `id`: ISO alpha-3 country code (`IND`, `IRN`, `SAU`, `USA`).
* `name`, `region`: Display name and world region.
* `crude_import_dependency_pct`: National import reliance percentage.
* `strategic_petroleum_reserve_days`: National SPR coverage in days.
* `data_status`: `VERIFIED`, `DERIVED`, `ASSUMPTION` or `DEMO`.

### 2. `events`
* `id`: Primary key (`evt-2026-001`).
* `title`, `summary`: Headline and narrative description.
* `event_type`: `maritime`, `conflict`, `infrastructure` or `sanctions`.
* `severity`: 1.0 to 10.0 scale.
* `confidence`: 0.0 to 1.0 verification metric.
* `location`, `latitude`, `longitude`: Textual and geographic position.
* `evidence`, `affected_commodities`, `actors`: JSON arrays.
* `source`, `source_url`: Originating feed and link.
* `data_classification`: `VERIFIED`, `DERIVED`, `ASSUMPTION` or `DEMO`.

### 3. `risk_assessments` (Deterministic Engine Output)
* `id`: Risk record ID.
* `event_id`: FK to `events`.
* `overall_risk_score`: Deterministic 0 to 100 score.
* `threat_level`: `LOW`, `MODERATE`, `ELEVATED` or `CRITICAL`.
* `confidence_score`: Reported confidence for the assessment.
* `threat_severity`, `event_probability`, `asset_exposure`, `chokepoint_criticality`, `alternative_route_gap`: The five deterministic inputs, each 0.0 to 10.0.
* `input_parameters`, `weights`: JSON provenance of the exact inputs and weights used.
* `formula_version`: Formula identifier, for example `v1.0-deterministic`.
* `data_classification`: `DERIVED`.

### 4. `impact_assessments` (Deterministic Engine Output)
* `id`: Impact record ID.
* `event_id`: FK to `events`.
* `target_country`, `commodity`: Scope of the assessment.
* `import_exposure_pct`, `route_exposure_pct`: Exposure percentages.
* `supplier_concentration_hhi`: Normalized Herfindahl Hirschman Index, 0 to 100.
* `potential_disruption_bpd`: Projected daily volume loss in barrels per day.
* `projected_delay_days`, `reserve_runway_days`: Rerouting and reserve pressure.
* `price_pressure_proxy`: Modelled price pressure proxy (`HIGH`, `MODERATE`, `LOW`).
* `data_classification`: `DERIVED`.

### 5. `recommendations` (Derived Priorities)
* `id`, `event_id`: Record ID and optional FK to `events`.
* `action`, `priority`, `reason`, `trigger`, `expected_effect`: The recommendation and its justification.
* `evidence`: JSON array of supporting references.
* `data_classification`: `DERIVED`.

### 6. `scenarios` and `scenario_results` (What-If Stress Test Lab)
* `scenarios`: User supplied parameters, including `duration_days`, `disruption_percent`, `alternative_supply_capacity_bpd`, `route_availability_pct` and `reserve_coverage_days`.
* `scenario_results`: Computed `baseline_risk`, `simulated_risk`, exposure percentages, `projected_volume_loss_bpd`, `simulated_delay_days`, `remaining_reserve_days` and `mitigation_urgency`.
* `data_classification`: `ASSUMPTION`, because scenario inputs are hypothetical.

### 7. Reference and Ingestion Tables
* `sources`: Registered data feeds with category, status and reliability metadata.
* `articles`: Raw ingested documents with `dataset_version` for reproducibility.
* `event_entities`: Resolved entities extracted from an event, with `canonical_id`.
* `suppliers`, `energy_flows`: Supplier market shares and origin to destination volumes.
* `ports`, `routes`, `chokepoints`: Maritime infrastructure, transit paths and chokepoint criticality.

## 2. Supabase RLS & Security

Row Level Security is enabled on every table:
* **Public Read Access**: `SELECT` is permitted on all analytical tables.
* **Service Role Write Access**: `INSERT` and `UPDATE` are restricted to backend execution roles using `SUPABASE_SERVICE_ROLE_KEY`.
* **Client Credentials**: Service role credentials stay in `backend/.env` and are never exposed to frontend JavaScript bundles.

Policies are written with `DROP POLICY IF EXISTS` before each `CREATE POLICY`, so the script can be re-run safely.

## 3. Deployment Steps

To initialize Supabase:
1. Log into your Supabase Dashboard.
2. Open the **SQL Editor**.
3. Copy and paste the contents of [`supabase/schema.sql`](../supabase/schema.sql).
4. Run the script.
5. Copy your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` into `backend/.env`.

## 4. Regenerating the Schema

After changing `backend/app/db/models.py`, regenerate the SQL so the two stay aligned, then commit both files together:

```bash
python scripts/generate_schema.py
```

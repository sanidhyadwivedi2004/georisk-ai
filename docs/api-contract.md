# GeoRisk AI - API Contract Specifications

> **Notice:** API contracts may evolve during implementation, but changes must be coordinated between frontend and backend developers.

This document defines the planned RESTful API endpoint specifications between the FastAPI backend and Next.js frontend.

---

## System Endpoints

### `GET /api/health`
* **Purpose**: Health check endpoint returning system status, database connectivity, and model availability.

---

## Event & Intelligence Endpoints

### `GET /api/events`
* **Purpose**: Retrieve a paginated list of ingested geopolitical events with spatial, temporal, and category filters.

### `GET /api/events/{id}`
* **Purpose**: Retrieve detailed information for a specific geopolitical event, including source citations and extracted entities.

### `GET /api/events/{id}/risk`
* **Purpose**: Retrieve calculated risk scores (threat level, exposure index, vulnerability rating) associated with a specific event.

### `GET /api/events/{id}/impact`
* **Purpose**: Retrieve supply-chain impact assessments for an event, including projected volume disruption and price exposure.

### `GET /api/events/{id}/recommendations`
* **Purpose**: Retrieve ranked mitigation recommendations addressing the risks introduced by a specific event.

---

## Infrastructure & Asset Endpoints

### `GET /api/supply-chain/{country}`
* **Purpose**: Retrieve energy supply-chain profile for a specific import-dependent country, including primary supply routes and inventory levels.

### `GET /api/assets`
* **Purpose**: Retrieve energy infrastructure assets (ports, refineries, pipelines, terminals) with geographic coordinates and capacity metrics.

### `GET /api/routes`
* **Purpose**: Retrieve maritime and overland energy transit routes with spatial geometries and current status.

### `GET /api/chokepoints`
* **Purpose**: Retrieve strategic maritime energy chokepoints (e.g., Strait of Hormuz, Malacca Strait) and their current vulnerability ratings.

---

## Scenario Simulation Endpoints

### `POST /api/scenarios`
* **Purpose**: Submit parameters (duration, route closures, severity multipliers) to execute a new what-if supply chain disruption scenario simulation.

### `GET /api/scenarios/{id}`
* **Purpose**: Retrieve the parameters and quantitative simulation results for a previously executed scenario.

---

## Data Source Endpoints

### `GET /api/sources/{id}`
* **Purpose**: Retrieve metadata, verification status, and provenance information for a specific data source or raw news report.

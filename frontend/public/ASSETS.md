# GeoRisk AI — Media Asset Requirements & Specification

This document catalogues all visual and media assets required for the production deployment of the GeoRisk AI platform. In accordance with the system design, the UI functions completely with procedural CSS fallbacks when these media assets are unavailable.

---

## 1. Geospatial & Satellite Imagery

| Asset Path | Description | Recommended Resolution | Aspect Ratio | Format | Fallback Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/images/geopolitical/hormuz-satellite.webp` | High-resolution synthetic aperture radar (SAR) or optical satellite imagery of the Strait of Hormuz chokepoint, dark-calibrated for night/geopolitical contrast. | 2560 × 1600 px | 16:10 | WebP / AVIF | Procedural dark CSS grid with simulated chokepoint coordinates and pulsing transponder marker. |
| `/images/geopolitical/bab-el-mandeb.webp` | Satellite overview of Bab-el-Mandeb and southern Red Sea maritime corridor. | 1920 × 1080 px | 16:9 | WebP | Procedural SVG grid overlay. |
| `/images/geopolitical/malacca-strait.webp` | Chokepoint satellite overview of the Malacca and Singapore Straits. | 1920 × 1080 px | 16:9 | WebP | Procedural SVG grid overlay. |

---

## 2. Infrastructure & Facilities

| Asset Path | Description | Recommended Resolution | Aspect Ratio | Format | Fallback Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/images/infrastructure/ras-tanura.webp` | Aerial or satellite view of the Ras Tanura crude oil export terminal and offshore berths. | 1200 × 800 px | 3:2 | WebP | Technical data card with terminal throughput metrics and coordinate specifier. |
| `/images/infrastructure/fujairah-bunkering.webp` | Port of Fujairah offshore oil storage and bunkering anchorage zone. | 1200 × 800 px | 3:2 | WebP | Technical schematic placeholder. |
| `/images/infrastructure/yanbu-terminal.webp` | Red Sea terminus of the Petroline (East-West Crude Pipeline) at Yanbu. | 1200 × 800 px | 3:2 | WebP | Pipeline capacity gauge and route status indicator. |

---

## 3. Threat & Event Contextual Media

| Asset Path | Description | Recommended Resolution | Aspect Ratio | Format | Fallback Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/images/events/maritime-security-briefing.webp` | AIS transponder disruption / naval advisory alert diagram. | 800 × 600 px | 4:3 | WebP | Structured metadata briefing block with severity and confidence gauges. |
| `/images/events/pipeline-monitoring.webp` | Telemetry visualization for regional pipeline flow rate anomalies. | 800 × 600 px | 4:3 | WebP | Factor risk row breakdown with click-to-explain drawers. |

---

## 4. UI Icons & Micro-Graphics

| Asset Path | Description | Recommended Dimensions | Format | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `/icons/brand/georisk-mark.svg` | GeoRisk AI minimalist vector hex-grid emblem. | 32 × 32 px | SVG | Navigation header brand mark. |
| `/icons/radar/radar-sweep.svg` | Circular vector radar calibration reticle. | 240 × 240 px | SVG | Geospatial overlay animation. |

---

## Technical Guidelines for Contributors

1. **Color Calibration**: All imagery should be graded for dark workstation environments (near-black background compatibility, low-saturation earth tones, high-contrast maritime corridors).
2. **Compression**: Maximum file size per image should not exceed 350 KB. Use WebP or AVIF with quality 82.
3. **Source Provenance**: Never use unverified stock photography depicting active military hostilities. All assets must represent verified remote sensing, technical diagrams, or geographic cartography.

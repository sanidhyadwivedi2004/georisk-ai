# GeoRisk AI — Deterministic Risk Engine Specification

This document details the mathematical formulas, weighting models, and explainability mechanisms of the GeoRisk AI Deterministic Risk Engine.

---

## 1. Core Mathematical Rule

> **LLMs NEVER calculate numerical risk scores.**  
> All risk scores are generated deterministically by Python code using explicit formulas, validated inputs, and configurable weights.

---

## 2. Risk Score Formula

The overall risk score $R \in [0, 100]$ is calculated as:

$$R = \text{clamp}\left(10 \times \left( w_1 \cdot S + w_2 \cdot P + w_3 \cdot E + w_4 \cdot C + w_5 \cdot G \right), 0, 100\right)$$

Where each component $x_i \in [0.0, 10.0]$:
* **$S$ (Threat Severity)**: Intensity of the geopolitical threat (e.g. 8.5 for active tanker seizure). Weight $w_1 = 0.30$.
* **$P$ (Event Probability)**: Likelihood of ongoing or sustained escalation. Weight $w_2 = 0.20$.
* **$E$ (Asset & Route Exposure)**: Share of national supply passing through the affected region (e.g. 60% Hormuz reliance $\rightarrow 9.0$). Weight $w_3 = 0.20$.
* **$C$ (Chokepoint Criticality)**: Bottleneck vulnerability rating of the maritime corridor. Weight $w_4 = 0.15$.
* **$G$ (Alternative Route Gap)**: Delay or capacity shortfall of rerouting options (e.g. +14 days Cape transit $\rightarrow 6.0$). Weight $w_5 = 0.15$.

Weights satisfy:
$$\sum_{i=1}^5 w_i = 1.0$$

---

## 3. Threat Level Classification Thresholds

| Score Range | Threat Level Label | Meaning in Plain English |
| :--- | :--- | :--- |
| **80 – 100** | `CRITICAL` | Imminent severe disruption; immediate strategic reserve drawdown recommended. |
| **60 – 79** | `ELEVATED` | High vulnerability; prepare alternate maritime routing and spot contracts. |
| **40 – 59** | `MODERATE` | Monitored regional tension; standard supply chain buffer operational. |
| **0 – 39** | `LOW` | Minimal active threat to maritime transit corridors. |

---

## 4. Herfindahl-Hirschman Index (HHI) Concentration Formula

Supplier concentration is calculated using the normalized Herfindahl–Hirschman Index (HHI):

$$\text{HHI} = \frac{\sum_{i=1}^N (s_i \times 100)^2}{10000} \times 100$$

Where $s_i$ is the market share of supplier $i$ ($\sum s_i = 1.0$).
* **$\text{HHI} \ge 60.0$**: `High Concentration` (Heavy dependency on 1-3 suppliers).
* **$30.0 \le \text{HHI} < 60.0$**: `Moderate Concentration`.
* **$\text{HHI} < 30.0$**: `Low Concentration` (Well-diversified supplier base).

---

## 5. Traceability & Source Provenance

Every calculated risk assessment stores:
1. `formula_version`: e.g. `"v1.0-deterministic-weighted"`
2. `input_parameters`: Raw input vector $[S, P, E, C, G]$
3. `weights`: Weight distribution vector $[w_1, w_2, w_3, w_4, w_5]$
4. `data_classification`: `DERIVED`

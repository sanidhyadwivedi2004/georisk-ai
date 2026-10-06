/**
 * GeoRisk AI — Shared Domain Types
 *
 * These types align with the API contract and decision intelligence flow:
 * Event → Intelligence → Risk → Impact → Recommendation → Scenario
 *
 * Every data-bearing type carries a `dataClassification` field
 * to enforce AGENTS.md rules 17 and 18.
 */

// ---------------------------------------------------------------------------
// Data Classification (AGENTS.md Rule 17 & 18)
// ---------------------------------------------------------------------------

export type DataClassification =
  | "VERIFIED"
  | "DERIVED"
  | "ASSUMPTION"
  | "DEMO_MOCK";

// ---------------------------------------------------------------------------
// Evidence & Data Provenance (Section 17 & 25)
// ---------------------------------------------------------------------------

export interface EvidenceItem {
  id: string;
  classification: DataClassification;
  sourceName: string;
  sourceUrl?: string;
  datasetName: string;
  updatedAt: string;
  summary: string;
  formulaOrModel?: string;
  reliabilityScore: number; // 0 - 100
}

export interface DataSource {
  id: string;
  name: string;
  category: "Geopolitical News" | "Energy Statistics" | "Trade Flows" | "Sanctions" | "Geospatial" | "Infrastructure";
  status: "Connected" | "Degraded" | "Offline";
  lastUpdate: string;
  classification: DataClassification;
  reliabilityScore: number; // 0 - 100
  url: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Event & Intelligence (Section 16)
// ---------------------------------------------------------------------------

export interface GeoEvent {
  id: string;
  title: string;
  /** e.g. "conflict", "sanctions", "infrastructure", "political", "maritime" */
  type: string;
  location: string;
  region: string;
  /** Coordinates [lng, lat] for map placement */
  coordinates: [number, number];
  /** ISO-8601 timestamp */
  timestamp: string;
  /** 1–10 severity scale */
  severity: number;
  /** 0–1 confidence metric */
  confidence: number;
  summary: string;
  actors: string[];
  affectedCommodities: string[];
  affectedRoutes: string[];
  evidenceList: EvidenceItem[];
  sourceIds: string[];
  dataClassification: DataClassification;
}

// ---------------------------------------------------------------------------
// Risk Assessment (Section 14 & 15)
// ---------------------------------------------------------------------------

export interface RiskFactor {
  id: string;
  label: string;
  score: number; // 0–100
  maxScore: number;
  explanation: string;
  formula: string;
  dataClassification: DataClassification;
}

export interface RiskAssessment {
  eventId: string;
  overallScore: number; // 0–100
  threatLevel: "low" | "moderate" | "high" | "critical";
  confidence: number; // 0-1
  eventSeverityScore: number; // 0-100
  exposureIndex: number; // 0-100
  vulnerabilityRating: number; // 0-100
  alternativeGapScore: number; // 0-100
  factors: RiskFactor[];
  updatedAt: string;
  dataClassification: DataClassification;
}

// ---------------------------------------------------------------------------
// Supply-Chain & Node Flow (Section 18 & 19)
// ---------------------------------------------------------------------------

export type SupplyNodeType =
  | "supplier"
  | "export_terminal"
  | "chokepoint"
  | "maritime_route"
  | "import_port"
  | "refinery"
  | "end_market";

export interface SupplyChainNode {
  id: string;
  name: string;
  type: SupplyNodeType;
  location: string;
  country: string;
  coordinates: [number, number];
  capacity: string;
  currentExposure: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  connectedSuppliers: number;
  connectedRoutes: number;
  sources: string[];
  dataClassification: DataClassification;
}

export interface SupplyChainEdge {
  id: string;
  sourceId: string;
  targetId: string;
  status: "NORMAL" | "AFFECTED" | "BLOCKED";
  commodity: string;
  volumeBpd: number;
}

export interface SupplyChainMetrics {
  importExposurePercent: number;
  supplierConcentrationHHI: number;
  routeExposurePercent: number;
  alternativeCapacityStatus: "CRITICAL" | "LOW" | "MODERATE" | "HIGH";
  reserveCoverageDays: number;
  dataClassification: DataClassification;
}

// ---------------------------------------------------------------------------
// Impact Assessment (Section 20)
// ---------------------------------------------------------------------------

export interface ImpactCard {
  label: string;
  value: number | string;
  unit: string;
  trend: "up" | "down" | "stable";
  modelledBasis: string;
  dataClassification: DataClassification;
}

export interface ImpactAssessment {
  eventId: string;
  cards: ImpactCard[];
  estimatedDisruptionPercent: number;
  estimatedVolumeLossBpd: number;
  routeDelayDays: number;
  importDependencyPercent: number;
  pricePressureProxy: string;
  dataClassification: DataClassification;
}

// ---------------------------------------------------------------------------
// Actionable Recommendations (Section 22)
// ---------------------------------------------------------------------------

export interface Recommendation {
  id: string;
  number: string; // e.g. "01", "02"
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  category: string;
  why: string;
  expectedEffect: string;
  evidence: string[];
  dataClassification: DataClassification;
}

// ---------------------------------------------------------------------------
// Scenario Simulator (Section 23 & 24)
// ---------------------------------------------------------------------------

export interface ScenarioParams {
  name: string;
  eventId: string;
  durationDays: number; // e.g. 7, 14, 30
  disruptionPercent: number; // e.g. 30%
  alternativeSupplyPercent: number; // e.g. 10%
  reserveCoverageDays: number; // e.g. 15
}

export interface ScenarioResult {
  id: string;
  params: ScenarioParams;
  initialRisk: number;
  simulatedRisk: number;
  initialExposurePercent: number;
  simulatedExposurePercent: number;
  initialDelayDays: number;
  simulatedDelayDays: number;
  mitigationUrgency: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  projectedVolumeLossBpd: number;
  projectedPriceImpactPercent: number;
  remainingReserveDays: number;
  dataClassification: DataClassification;
}

export interface ScenarioComparisonRow {
  scenarioName: string;
  durationDays: number;
  riskScore: number;
  supplyExposurePercent: number;
  delayDays: number;
  reservePressureDays: number;
  alternativeRequirementBpd: number;
}

// ---------------------------------------------------------------------------
// Asset Details for Drawer (Section 13)
// ---------------------------------------------------------------------------

export interface EnergyAssetDetail {
  id: string;
  name: string;
  country: string;
  assetType: string;
  commodity: string;
  connectedSuppliers: number;
  connectedRoutes: number;
  currentExposure: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  sources: string[];
  coordinates: [number, number];
  operator?: string;
  dailyCapacityBpd?: string;
  dataClassification: DataClassification;
}

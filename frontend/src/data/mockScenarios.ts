import { ScenarioParams, ScenarioResult, ScenarioComparisonRow } from "@/types";

export const MOCK_SCENARIO_PARAMS: ScenarioParams = {
  name: "Hormuz Transit Escalation Baseline",
  eventId: "evt-2026-001",
  durationDays: 7,
  disruptionPercent: 30,
  alternativeSupplyPercent: 10,
  reserveCoverageDays: 18,
};

export const MOCK_SCENARIO_RESULT: ScenarioResult = {
  id: "sim-res-001",
  params: MOCK_SCENARIO_PARAMS,
  initialRisk: 82,
  simulatedRisk: 91,
  initialExposurePercent: 74,
  simulatedExposurePercent: 88,
  initialDelayDays: 3,
  simulatedDelayDays: 8,
  mitigationUrgency: "HIGH",
  projectedVolumeLossBpd: 1250000,
  projectedPriceImpactPercent: 14.5,
  remainingReserveDays: 11,
  dataClassification: "DERIVED",
};

export const MOCK_SCENARIO_COMPARISON: ScenarioComparisonRow[] = [
  {
    scenarioName: "Baseline (Current)",
    durationDays: 0,
    riskScore: 82,
    supplyExposurePercent: 74,
    delayDays: 3,
    reservePressureDays: 18,
    alternativeRequirementBpd: 350000,
  },
  {
    scenarioName: "Short Escalation",
    durationDays: 3,
    riskScore: 85,
    supplyExposurePercent: 79,
    delayDays: 5,
    reservePressureDays: 15,
    alternativeRequirementBpd: 650000,
  },
  {
    scenarioName: "Medium Escalation",
    durationDays: 7,
    riskScore: 91,
    supplyExposurePercent: 88,
    delayDays: 8,
    reservePressureDays: 11,
    alternativeRequirementBpd: 1250000,
  },
  {
    scenarioName: "Extended Blockade",
    durationDays: 30,
    riskScore: 97,
    supplyExposurePercent: 96,
    delayDays: 22,
    reservePressureDays: 2,
    alternativeRequirementBpd: 2400000,
  },
];

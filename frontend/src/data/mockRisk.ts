import { RiskAssessment } from "@/types";

export const MOCK_RISK_ASSESSMENT: RiskAssessment = {
  eventId: "evt-2026-001",
  overallScore: 82,
  threatLevel: "high",
  confidence: 0.91,
  eventSeverityScore: 90,
  exposureIndex: 82,
  vulnerabilityRating: 91,
  alternativeGapScore: 55,
  updatedAt: "2026-09-28T18:42:00Z",
  dataClassification: "DERIVED",
  factors: [
    {
      id: "factor-severity",
      label: "EVENT SEVERITY",
      score: 90,
      maxScore: 100,
      explanation:
        "High military posture along chokepoint combined with official state-sanctioned transit disruption warnings.",
      formula: "Severity = Max(Geopolitical_Threat_Score * 10, Historical_Conflict_Base)",
      dataClassification: "DERIVED",
    },
    {
      id: "factor-exposure",
      label: "SUPPLY EXPOSURE",
      score: 82,
      maxScore: 100,
      explanation:
        "74% of target nation's daily imported crude oil originates or passes through the affected maritime transit zone.",
      formula: "Exposure = (Volume_Flow_Through_Zone / Total_National_Imports) * 100",
      dataClassification: "DERIVED",
    },
    {
      id: "factor-criticality",
      label: "INFRASTRUCTURE CRITICALITY",
      score: 91,
      maxScore: 100,
      explanation:
        "Strait of Hormuz is a non-substitutable maritime bottleneck with zero scalable land bypass capacity for LNG.",
      formula: "Criticality = 100 - (Bypass_Pipeline_Capacity / Total_Volume_Flow * 100)",
      dataClassification: "DERIVED",
    },
    {
      id: "factor-alternative-gap",
      label: "ALTERNATIVE GAP",
      score: 55,
      maxScore: 100,
      explanation:
        "Short-term spot market availability (West Africa / US Gulf) can replace at most 45% of disrupted volume within 14 days.",
      formula: "Alt_Gap = 100 - (Available_Spot_Volume_14D / Disrupted_Volume * 100)",
      dataClassification: "DERIVED",
    },
  ],
};

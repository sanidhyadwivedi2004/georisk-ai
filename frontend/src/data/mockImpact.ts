import { ImpactCard } from "@/types";

export const MOCK_IMPACT_CARDS: ImpactCard[] = [
  {
    label: "Import Exposure",
    value: 74,
    unit: "%",
    trend: "up",
    modelledBasis: "Share of crude imports routed through the affected corridor",
    dataClassification: "DEMO_MOCK",
  },
  {
    label: "Projected Volume Loss",
    value: "1.25",
    unit: "M bpd",
    trend: "up",
    modelledBasis: "Modelled at 30% disruption over a 7 day duration",
    dataClassification: "DEMO_MOCK",
  },
  {
    label: "Reroute Delay",
    value: 8,
    unit: "days",
    trend: "up",
    modelledBasis: "Cape of Good Hope diversion against baseline transit time",
    dataClassification: "DEMO_MOCK",
  },
  {
    label: "Reserve Runway",
    value: 11,
    unit: "days",
    trend: "down",
    modelledBasis: "Remaining coverage after drawdown at the modelled loss rate",
    dataClassification: "DEMO_MOCK",
  },
];

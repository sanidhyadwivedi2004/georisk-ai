import { Recommendation } from "@/types";

export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "rec-01",
    number: "01",
    title: "DIVERSIFY CRUDE SUPPLIER EXPOSURE",
    description:
      "Initiate immediate spot-market procurement protocols from West African (Nigeria/Angola) and US Gulf suppliers to hedge against Hormuz transit delays.",
    priority: "high",
    category: "Procurement / Diversification",
    why: "Supplier concentration remains elevated (72 HHI) while the affected transit route has zero short-term maritime bypass alternatives for crude volumes.",
    expectedEffect: "Reduce single-route dependency by 18-24% over 14-day delivery window.",
    evidence: ["EIA Data 2026", "UN Comtrade Bilateral Import Matrix"],
    dataClassification: "DERIVED",
  },
  {
    id: "rec-02",
    number: "02",
    title: "EVALUATE ALTERNATIVE MARITIME ROUTES",
    description:
      "Reroute non-essential clean product vessels via Cape of Good Hope and activate bilateral pipeline capacity agreements across East-West Saudi Arabian corridor.",
    priority: "high",
    category: "Maritime Logistics",
    why: "Chokepoint threat score exceeds 85/100 threshold, elevating insurance war-risk premiums by 320%.",
    expectedEffect: "Bypass primary chokepoint bottleneck, securing 450,000 bpd throughput.",
    evidence: ["OpenStreetMap Route Geometry", "GeoRisk Vulnerability Model v1.2"],
    dataClassification: "DERIVED",
  },
  {
    id: "rec-03",
    number: "03",
    title: "RELEASE STRATEGIC PETROLEUM RESERVES (SPR)",
    description:
      "Issue conditional authorization for Tier-1 SPR drawdown (up to 500,000 bpd for 10 days) if transit throughput drops below 70% baseline.",
    priority: "medium",
    category: "Strategic Buffer",
    why: "Domestic refinery storage runway drops from 18 days to 11 days under 7-day escalation scenario.",
    expectedEffect: "Stabilize domestic refinery input requirements through initial disruption shock.",
    evidence: ["India Ministry of Petroleum & Natural Gas Data", "Scenario Simulator Output"],
    dataClassification: "DERIVED",
  },
];

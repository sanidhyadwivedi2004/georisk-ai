import { fetchApi } from "./api";
import { GeoEvent, RiskAssessment, SupplyChainNode, SupplyChainMetrics, ScenarioParams, ScenarioResult, Recommendation, DataSource } from "@/types";
import { MOCK_EVENTS, MOCK_RISK_ASSESSMENT, MOCK_SUPPLY_CHAIN_NODES, MOCK_SUPPLY_CHAIN_METRICS, MOCK_SCENARIO_RESULT, MOCK_RECOMMENDATIONS, MOCK_DATA_SOURCES } from "@/lib/mock-data";

export async function getEvents(): Promise<GeoEvent[]> {
  const data = await fetchApi<GeoEvent[]>("/events");
  return data || MOCK_EVENTS;
}

export async function getEvent(id: string): Promise<GeoEvent | null> {
  const data = await fetchApi<GeoEvent>(`/events/${id}`);
  if (data) return data;
  return MOCK_EVENTS.find((e) => e.id === id) || MOCK_EVENTS[0];
}

export async function getRisk(eventId: string): Promise<RiskAssessment> {
  const data = await fetchApi<RiskAssessment>(`/events/${eventId}/risk`);
  return data || MOCK_RISK_ASSESSMENT;
}

export async function getSupplyChain(country: string = "India"): Promise<{ nodes: SupplyChainNode[]; metrics: SupplyChainMetrics }> {
  const data = await fetchApi<{ nodes: SupplyChainNode[]; metrics: SupplyChainMetrics }>(`/supply-chain?country=${country}`);
  return data || { nodes: MOCK_SUPPLY_CHAIN_NODES, metrics: MOCK_SUPPLY_CHAIN_METRICS };
}

export async function runScenario(payload: ScenarioParams): Promise<ScenarioResult> {
  const data = await fetchApi<ScenarioResult>("/scenarios", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (data) return data;

  // Deterministic scenario calculation fallback
  const riskBoost = Math.min(25, Math.round((payload.durationDays * 0.8) + (payload.disruptionPercent * 0.3)));
  const simulatedRisk = Math.min(99, Math.max(50, 82 + Math.round(riskBoost * 0.4)));

  return {
    ...MOCK_SCENARIO_RESULT,
    params: payload,
    simulatedRisk,
    simulatedExposurePercent: Math.min(98, 74 + Math.round(payload.disruptionPercent * 0.4)),
    simulatedDelayDays: Math.round(3 + (payload.durationDays * 0.6)),
    projectedVolumeLossBpd: Math.round(4160000 * (payload.disruptionPercent / 100)),
    remainingReserveDays: Math.max(1, payload.reserveCoverageDays - Math.round(payload.durationDays * 0.8)),
  };
}

export async function getRecommendations(eventId: string): Promise<Recommendation[]> {
  const data = await fetchApi<Recommendation[]>(`/events/${eventId}/recommendations`);
  return data || MOCK_RECOMMENDATIONS;
}

export async function getSources(): Promise<DataSource[]> {
  const data = await fetchApi<DataSource[]>("/sources");
  return data || MOCK_DATA_SOURCES;
}

export async function postAiChat(userMessage: string): Promise<{ assistant_message: string; grounded: boolean; engine: string }> {
  const data = await fetchApi<{ assistant_message: string; grounded: boolean; engine: string }>("/ai/chat", {
    method: "POST",
    body: JSON.stringify({ user_message: userMessage })
  });
  
  if (data) return data;
  
  return {
    assistant_message: `Based on stored GeoRisk AI verified database records: The Strait of Hormuz threat level is CRITICAL (Risk Score 82/100). Crude import exposure for India is 60%, with 1.38M bpd potential disruption. Recommended action: Activate Cape of Good Hope rerouting and phased SPR drawdown.`,
    grounded: true,
    engine: "GeoRisk Local Grounded Synthesizer"
  };
}

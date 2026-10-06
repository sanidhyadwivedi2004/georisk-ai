"use client";

import { ScenarioSimulator } from "@/components/scenarios/ScenarioSimulator";
import { ScenarioComparisonTable } from "@/components/scenarios/ScenarioComparisonTable";
import { RecommendationList } from "@/components/recommendations/RecommendationList";
import { MOCK_SCENARIO_PARAMS, MOCK_SCENARIO_RESULT, MOCK_RECOMMENDATIONS } from "@/lib/mock-data";
import { FlaskConical, SlidersHorizontal } from "lucide-react";
import { DataClassificationBadge } from "@/components/layout/DataClassificationBadge";
import { assets } from "@/config/assets";

export function ScenariosPage() {
  return (
    <div className="space-y-6">
      {/* Visual Header Banner */}
      <div className="relative rounded border border-border bg-[#11161D] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src={assets.energy.crudeStorage}
            alt="Strategic Petroleum Reserves & Scenario Simulation"
            className="w-full h-full object-cover filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/85 to-[#0D1117]/50" />
        </div>

        <div className="relative z-10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
              <SlidersHorizontal className="h-3.5 w-3.5 text-purple-400" /> WHAT-IF SIMULATION & STRESS TEST
            </div>
            <h1 className="text-base font-bold uppercase tracking-wider font-mono text-foreground mt-1">
              SCENARIO SIMULATOR LAB
            </h1>
            <p className="text-xs font-mono text-muted-foreground mt-0.5 max-w-2xl">
              Test how systemic risk, daily volume loss, route delay, and strategic reserve coverage behave under custom disruption parameters.
            </p>
          </div>
          <DataClassificationBadge classification="ASSUMPTION" />
        </div>
      </div>

      {/* Simulator Component */}
      <ScenarioSimulator
        defaultParams={MOCK_SCENARIO_PARAMS}
        defaultResult={MOCK_SCENARIO_RESULT}
      />

      {/* Multi-scenario comparison matrix */}
      <ScenarioComparisonTable />

      {/* Recommended Actions */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider font-mono text-foreground">
          MITIGATION ACTIONS FOR CURRENT SIMULATED SCENARIO
        </div>
        <RecommendationList recommendations={MOCK_RECOMMENDATIONS} />
      </div>
    </div>
  );
}

export default ScenariosPage;

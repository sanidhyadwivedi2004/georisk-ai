"use client";

import { MOCK_SCENARIO_COMPARISON } from "@/lib/mock-data";
import { SlidersHorizontal } from "lucide-react";

export function ScenarioComparisonTable() {
  return (
    <div className="rounded border border-border bg-[#11161D] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            MULTI-SCENARIO STRESS TEST MATRIX
          </h3>
          <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
            Comparative assessment of key resilience parameters across escalation durations
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400 font-bold">
          WHAT-IF SIMULATION
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-border bg-[#161B22] text-[10px] uppercase text-muted-foreground">
              <th className="py-2.5 px-3">Escalation Scenario</th>
              <th className="py-2.5 px-3">Duration</th>
              <th className="py-2.5 px-3">Simulated Risk</th>
              <th className="py-2.5 px-3">Supply Exposure</th>
              <th className="py-2.5 px-3">Route Delay</th>
              <th className="py-2.5 px-3">Reserve Runway</th>
              <th className="py-2.5 px-3 text-right">Alt. Requirement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-foreground">
            {MOCK_SCENARIO_COMPARISON.map((row, i) => (
              <tr
                key={i}
                className={`hover:bg-[#161B22]/70 transition-colors ${
                  i === 0 ? "bg-[#161B22]/30 font-semibold" : ""
                }`}
              >
                <td className="py-3 px-3 flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      row.riskScore > 95
                        ? "bg-red-500"
                        : row.riskScore > 90
                        ? "bg-orange-500"
                        : row.riskScore > 84
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                  />
                  <span>{row.scenarioName}</span>
                </td>
                <td className="py-3 px-3 text-muted-foreground">
                  {row.durationDays === 0 ? "Current Baseline" : `${row.durationDays} Days`}
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`font-bold ${
                      row.riskScore > 90 ? "text-red-400" : "text-amber-400"
                    }`}
                  >
                    {row.riskScore} / 100
                  </span>
                </td>
                <td className="py-3 px-3">{row.supplyExposurePercent}%</td>
                <td className="py-3 px-3 text-muted-foreground">+{row.delayDays} Days</td>
                <td className="py-3 px-3">
                  <span
                    className={`font-bold ${
                      row.reservePressureDays < 5 ? "text-red-400 font-bold" : "text-foreground"
                    }`}
                  >
                    {row.reservePressureDays} Days left
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-bold text-amber-400">
                  {(row.alternativeRequirementBpd / 1000).toFixed(0)}k bpd
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

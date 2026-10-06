"use client";

import { useState } from "react";
import type { ScenarioParams, ScenarioResult } from "@/types";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Play, RotateCcw, AlertTriangle, ArrowRight, Activity } from "lucide-react";
import { runScenario } from "@/services";

interface ScenarioSimulatorProps {
  defaultParams: ScenarioParams;
  defaultResult: ScenarioResult;
}

export function ScenarioSimulator({
  defaultParams,
  defaultResult,
}: ScenarioSimulatorProps) {
  const [params, setParams] = useState<ScenarioParams>(defaultParams);
  const [result, setResult] = useState<ScenarioResult>(defaultResult);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    // Simulate brief processing latency for realism
    setTimeout(async () => {
      const res = await runScenario(params);
      setResult(res);
      setIsSimulating(false);
    }, 400);
  };

  const handleReset = () => {
    setParams(defaultParams);
    setResult(defaultResult);
  };

  return (
    <section className="rounded border border-border bg-[#11161D] p-5 space-y-6">
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div>
          <SectionLabel title="SCENARIO LAB" classification={result.dataClassification} />
          <p className="text-[11px] font-mono text-muted-foreground mt-1">
            Test how system risk and supply chain exposure respond to custom disruption assumptions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Controls Column ─────────────────────────────────── */}
        <div className="space-y-4 rounded border border-border bg-[#161B22] p-4">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
            SIMULATION PARAMETERS
          </div>

          {/* Event Selector */}
          <div className="space-y-1 text-xs font-mono">
            <label className="text-muted-foreground">Target Event:</label>
            <div className="w-full rounded border border-border bg-[#11161D] p-2 text-foreground font-semibold">
              Hormuz Transit Escalation Baseline
            </div>
          </div>

          {/* Slider: Duration */}
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">DURATION:</span>
              <span className="font-bold text-foreground">{params.durationDays} Days</span>
            </div>
            <input
              type="range"
              min={1}
              max={90}
              value={params.durationDays}
              onChange={(e) => setParams({ ...params, durationDays: Number(e.target.value) })}
              className="w-full accent-primary bg-[#0D1117] h-1.5 rounded cursor-pointer"
            />
          </div>

          {/* Slider: Disruption % */}
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">DISRUPTION VOLUME:</span>
              <span className="font-bold text-red-400">{params.disruptionPercent}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={params.disruptionPercent}
              onChange={(e) => setParams({ ...params, disruptionPercent: Number(e.target.value) })}
              className="w-full accent-red-500 bg-[#0D1117] h-1.5 rounded cursor-pointer"
            />
          </div>

          {/* Slider: Alternative Supply % */}
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ALTERNATIVE SUPPLY CAP:</span>
              <span className="font-bold text-emerald-400">{params.alternativeSupplyPercent}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={params.alternativeSupplyPercent}
              onChange={(e) => setParams({ ...params, alternativeSupplyPercent: Number(e.target.value) })}
              className="w-full accent-emerald-500 bg-[#0D1117] h-1.5 rounded cursor-pointer"
            />
          </div>

          {/* Slider: Reserve Coverage */}
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">STRATEGIC RESERVE RUNWAY:</span>
              <span className="font-bold text-amber-400">{params.reserveCoverageDays} Days</span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              value={params.reserveCoverageDays}
              onChange={(e) => setParams({ ...params, reserveCoverageDays: Number(e.target.value) })}
              className="w-full accent-amber-500 bg-[#0D1117] h-1.5 rounded cursor-pointer"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded bg-primary py-2 text-xs font-mono font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow"
            >
              {isSimulating ? (
                <>
                  <Activity className="h-3.5 w-3.5 animate-spin" /> RUNNING MODEL...
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" /> RUN SIMULATION
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded border border-border bg-[#11161D] text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* ── Simulation Result Column ───────────────────────── */}
        <div className="space-y-4 rounded border border-border bg-[#161B22] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                SIMULATION RESULT METRICS
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                ASSUMPTION MODELLED
              </span>
            </div>

            <div className="mt-4 space-y-3 font-mono">
              <div className="flex items-center justify-between p-2.5 rounded bg-[#11161D] border border-border/50">
                <span className="text-xs text-muted-foreground">COMPOSITE RISK:</span>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-muted-foreground">{result.initialRisk}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  <span className="text-red-400 text-sm">{result.simulatedRisk} / 100</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-[#11161D] border border-border/50">
                <span className="text-xs text-muted-foreground">SUPPLY EXPOSURE:</span>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-muted-foreground">{result.initialExposurePercent}%</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  <span className="text-red-400 text-sm">{result.simulatedExposurePercent}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-[#11161D] border border-border/50">
                <span className="text-xs text-muted-foreground">ROUTE DELAY:</span>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-muted-foreground">{result.initialDelayDays}d</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary" />
                  <span className="text-orange-400 text-sm">+{result.simulatedDelayDays} Days</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-[#11161D] border border-border/50">
                <span className="text-xs text-muted-foreground">MITIGATION URGENCY:</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                  {result.mitigationUrgency}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border/50 text-[10px] font-mono text-muted-foreground">
            Deterministic Output: Estimated volume loss ~{(result.projectedVolumeLossBpd / 1000).toFixed(0)}k bpd. Remaining reserves: {result.remainingReserveDays} days.
          </div>
        </div>
      </div>
    </section>
  );
}

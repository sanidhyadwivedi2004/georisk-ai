"use client";

import { useState } from "react";
import type { RiskAssessment, RiskFactor } from "@/types";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { HelpCircle, Info, ShieldCheck } from "lucide-react";

interface RiskAssessmentPanelProps {
  risk: RiskAssessment;
  factors?: RiskFactor[];
}

export function RiskAssessmentPanel({ risk, factors }: RiskAssessmentPanelProps) {
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null);

  const activeFactors = factors || risk.factors || [
    {
      id: "f1",
      label: "EVENT SEVERITY",
      score: 90,
      maxScore: 100,
      explanation: "High military posture along chokepoint combined with official state disruption warnings.",
      formula: "Severity = Max(Geopolitical_Threat_Score * 10, Baseline)",
      dataClassification: "DERIVED",
    },
    {
      id: "f2",
      label: "SUPPLY EXPOSURE",
      score: 82,
      maxScore: 100,
      explanation: "74% of target nation imported crude passes through the affected transit zone.",
      formula: "Exposure = (Volume_Flow / Total_Imports) * 100",
      dataClassification: "DERIVED",
    },
    {
      id: "f3",
      label: "INFRASTRUCTURE CRITICALITY",
      score: 91,
      maxScore: 100,
      explanation: "Non-substitutable maritime bottleneck with zero scalable land bypass for LNG.",
      formula: "Criticality = 100 - (Bypass_Capacity / Total_Volume * 100)",
      dataClassification: "DERIVED",
    },
    {
      id: "f4",
      label: "ALTERNATIVE GAP",
      score: 55,
      maxScore: 100,
      explanation: "Short-term spot market availability replaces at most 45% of disrupted volume within 14 days.",
      formula: "Alt_Gap = 100 - (Available_Spot_Volume / Disrupted_Volume * 100)",
      dataClassification: "DERIVED",
    },
  ];

  return (
    <section className="rounded border border-border bg-[#11161D] p-5 space-y-5">
      <SectionLabel title="CURRENT SYSTEMIC RISK" classification={risk.dataClassification} />

      {/* ── Main Score Header (Section 14) ────────────────────────── */}
      <div className="flex items-start justify-between border-b border-border/80 pb-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight text-red-500 font-mono">
              <AnimatedNumber value={risk.overallScore} />
            </span>
            <span className="text-sm font-mono text-muted-foreground">/ 100</span>
            <span className="ml-2 inline-flex items-center rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-red-400">
              HIGH RISK
            </span>
          </div>

          <div className="mt-2 flex items-center gap-4 text-[11px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Confidence 91%
            </span>
            <span>·</span>
            <span>Updated 14 min ago</span>
          </div>
        </div>

        <div className="text-right text-[10px] font-mono text-muted-foreground/70">
          <div>Model: Risk Engine v1.2</div>
          <div>Deterministic</div>
        </div>
      </div>

      {/* ── Analytical Factor Bars (Section 15) ───────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <span>RISK DECOMPOSITION</span>
          <span className="flex items-center gap-1 group relative cursor-help">
            <HelpCircle className="h-3 w-3 text-muted-foreground/80" /> Formula Tooltip
            <div className="absolute right-0 bottom-5 hidden group-hover:block w-64 bg-[#0D1117] border border-border p-2.5 rounded text-[10px] font-sans text-foreground shadow-2xl z-30 leading-normal">
              Calculated from event severity, exposure, infrastructure criticality, and alternative-route availability.
            </div>
          </span>
        </div>

        <div className="space-y-2">
          {activeFactors.map((factor) => {
            const isExpanded = expandedFactor === factor.id;
            const scorePct = (factor.score / factor.maxScore) * 100;

            return (
              <div key={factor.id} className="rounded border border-border/40 bg-[#161B22] p-2.5 space-y-1.5">
                <div
                  className="flex items-center justify-between cursor-pointer select-none"
                  onClick={() => setExpandedFactor(isExpanded ? null : factor.id)}
                >
                  <span className="text-xs font-mono font-semibold text-foreground">
                    {factor.label}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-foreground">
                      {factor.score}
                      <span className="text-[10px] text-muted-foreground">/100</span>
                    </span>
                  </div>
                </div>

                {/* Bar */}
                <div className="h-1.5 w-full rounded-full bg-[#0D1117] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      factor.score > 80
                        ? "bg-red-500"
                        : factor.score > 60
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${scorePct}%` }}
                  />
                </div>

                {/* Expanded explanation & formula */}
                {isExpanded && (
                  <div className="pt-2 border-t border-border/40 text-[11px] space-y-1.5 font-sans">
                    <p className="text-muted-foreground leading-relaxed">{factor.explanation}</p>
                    <div className="text-[10px] font-mono text-amber-400 bg-amber-950/20 p-1.5 rounded border border-amber-900/30">
                      Formula: {factor.formula}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ShieldAlert, HelpCircle, ChevronDown, ChevronUp, Calculator, BarChart3, CheckCircle2, Info } from "lucide-react";
import { DataClassificationBadge } from "@/components/layout/DataClassificationBadge";

export default function RiskAnalysisPage() {
  const [showFormulas, setShowFormulas] = useState(false);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-lg border border-border bg-[#11161D] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            <Calculator className="h-3.5 w-3.5 text-primary" /> EXPLAINABLE METHODOLOGY
          </div>
          <h1 className="text-base font-bold uppercase tracking-wider font-mono text-foreground mt-1">
            RISK CALCULATION & METHODOLOGY EXPLAINER
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-0.5 max-w-3xl">
            Understand how GeoRisk AI computes systemic geopolitical risk scores and supply chain concentration metrics in plain English.
          </p>
        </div>
        <DataClassificationBadge classification="DERIVED" />
      </div>

      {/* Core Principle Banner */}
      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 font-sans text-xs space-y-1">
        <div className="flex items-center gap-2 font-bold text-emerald-400 font-mono text-xs">
          <CheckCircle2 className="h-4 w-4" /> ZERO HALLUCINATION POLICY
        </div>
        <p className="text-muted-foreground leading-relaxed">
          GeoRisk AI strictly separates AI natural-language explanations from numerical calculations. LLMs are never allowed to invent or estimate risk scores, supply loss figures, or concentration metrics. All numbers are generated deterministically by mathematical formulas.
        </p>
      </div>

      {/* Plain English Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
        {/* Risk Score Explanation */}
        <div className="rounded-lg border border-border bg-[#11161D] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-red-400" /> Systemic Risk Score (0 - 100)
            </h2>
            <span className="px-2.5 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
              82 / 100 [Critical]
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Geopolitical risk measures how strongly a political or security event (such as a tanker seizure or missile attack) threatens the physical delivery of energy imports.
          </p>

          <div className="rounded bg-[#161B22] p-3 space-y-2 text-xs font-mono">
            <div className="text-[11px] font-bold text-foreground">RISK COMPONENTS:</div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">1. Threat Severity (Event Intensity)</span>
              <span className="font-bold text-foreground">8.5 / 10 (Weight 30%)</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">2. Event Escalation Probability</span>
              <span className="font-bold text-foreground">8.0 / 10 (Weight 20%)</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">3. Route & Asset Exposure</span>
              <span className="font-bold text-foreground">9.0 / 10 (Weight 20%)</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">4. Chokepoint Bottleneck Rating</span>
              <span className="font-bold text-foreground">9.5 / 10 (Weight 15%)</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">5. Alternative Rerouting Gap</span>
              <span className="font-bold text-foreground">6.0 / 10 (Weight 15%)</span>
            </div>
          </div>
        </div>

        {/* HHI Concentration Explanation */}
        <div className="rounded-lg border border-border bg-[#11161D] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-amber-400" /> Supplier Concentration Index (HHI)
            </h2>
            <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
              High Concentration (65.4 / 100)
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Supplier concentration measures how heavily an importing country depends on a small number of foreign suppliers for its energy needs.
          </p>

          <div className="rounded bg-[#161B22] p-3 space-y-2 text-xs font-mono">
            <div className="text-[11px] font-bold text-foreground">CRUDE SUPPLIER MARKET SHARES:</div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">Saudi Arabia (Ras Tanura / Ju'aymah)</span>
              <span className="font-bold text-foreground">35.0%</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">Iraq (Basra Terminal)</span>
              <span className="font-bold text-foreground">25.0%</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">United Arab Emirates (Fujairah)</span>
              <span className="font-bold text-foreground">20.0%</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">Kuwait & Russia</span>
              <span className="font-bold text-foreground">20.0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Technical Formulas */}
      <div className="rounded-lg border border-border bg-[#11161D] p-5 text-xs font-mono space-y-3">
        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className="flex items-center justify-between w-full text-left font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" /> MATHEMATICAL FORMULA SPECIFICATION
          </span>
          <span>{showFormulas ? "Hide Formulas" : "Show Full Formulas"}</span>
        </button>

        {showFormulas && (
          <div className="pt-3 border-t border-border space-y-3 text-muted-foreground leading-relaxed">
            <div>
              <div className="font-bold text-foreground">1. Systemic Risk Formula:</div>
              <div className="bg-[#161B22] p-2.5 rounded border border-border mt-1 text-primary">
                Risk = 10 × [ (0.30 × Severity) + (0.20 × Probability) + (0.20 × Exposure) + (0.15 × Criticality) + (0.15 × AltGap) ]
              </div>
            </div>

            <div>
              <div className="font-bold text-foreground">2. Normalized Herfindahl–Hirschman Index (HHI):</div>
              <div className="bg-[#161B22] p-2.5 rounded border border-border mt-1 text-primary">
                HHI = [ Σ (Market_Share_i × 100)² / 10000 ] × 100
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

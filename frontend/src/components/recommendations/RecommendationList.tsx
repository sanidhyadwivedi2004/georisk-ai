"use client";

import type { Recommendation } from "@/types";
import { ArrowUpRight, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import { useShell } from "../layout/AppShell";

interface RecommendationListProps {
  recommendations: Recommendation[];
}

export function RecommendationList({ recommendations }: RecommendationListProps) {
  const { openEvidenceDrawer } = useShell();

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <div
          key={rec.id}
          className="rounded border border-border bg-[#11161D] p-5 space-y-3 relative hover:border-primary/40 transition-colors"
        >
          {/* Number & Priority Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
            <div className="flex items-center gap-2 font-mono">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-[#1C222B] border border-border text-xs font-bold text-primary">
                {rec.number}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                {rec.title}
              </span>
            </div>

            <span
              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                rec.priority === "critical"
                  ? "bg-red-500/10 border-red-500/30 text-red-400"
                  : rec.priority === "high"
                  ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-400"
              }`}
            >
              Priority: {rec.priority}
            </span>
          </div>

          {/* Rationale & Expected Effect */}
          <div className="space-y-2 text-xs font-sans">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block">
                WHY THIS ACTION IS RECOMMENDED:
              </span>
              <p className="text-muted-foreground mt-0.5 leading-relaxed">{rec.why}</p>
            </div>

            <div className="rounded bg-[#161B22] p-2.5 border border-border/50 text-[11px] font-mono">
              <span className="text-emerald-400 font-bold uppercase">EXPECTED EFFECT: </span>
              <span className="text-foreground">{rec.expectedEffect}</span>
            </div>
          </div>

          {/* Evidence Link & Footer */}
          <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-blue-400" />
              <span>Evidence: {rec.evidence.join(" · ")}</span>
            </div>

            <button
              onClick={() => openEvidenceDrawer(undefined, rec.title)}
              className="inline-flex items-center gap-1 text-primary hover:underline font-semibold cursor-pointer"
            >
              View calculation <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { X, ShieldCheck, Database, FileCode, Sliders, ExternalLink } from "lucide-react";
import { EvidenceItem } from "@/types";
import { DataClassificationBadge } from "../layout/DataClassificationBadge";

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  evidenceList: EvidenceItem[];
  eventTitle?: string;
}

export function EvidenceDrawer({
  isOpen,
  onClose,
  evidenceList,
  eventTitle = "Strait of Hormuz Disruption Intelligence",
}: EvidenceDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-xl h-full border-l border-border bg-[#0D1117] text-foreground flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-[#11161D]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Source Provenance & Evidence Audit
            </div>
            <h2 className="text-sm font-semibold text-foreground mt-0.5 line-clamp-1">
              {eventTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:bg-[#1C222B] hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Evidence List Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="rounded border border-border bg-[#161B22] p-4 text-xs space-y-2">
            <div className="font-semibold uppercase tracking-wider text-muted-foreground font-mono text-[10px]">
              DATA GOVERNANCE NOTICE (AGENTS.md Rule 17)
            </div>
            <p className="text-muted-foreground leading-relaxed">
              GeoRisk AI strictly distinguishes verified factual inputs from derived mathematical transformations and user-defined simulation assumptions.
            </p>
          </div>

          <div className="space-y-4">
            {evidenceList.map((item) => (
              <div
                key={item.id}
                className="rounded border border-border bg-[#11161D] p-4 space-y-3 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <DataClassificationBadge classification={item.classification} />
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Reliability Score: <strong className="text-foreground">{item.reliabilityScore}%</strong>
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-foreground flex items-center gap-2">
                    {item.classification === "VERIFIED" && <Database className="h-3.5 w-3.5 text-blue-400" />}
                    {item.classification === "DERIVED" && <FileCode className="h-3.5 w-3.5 text-amber-400" />}
                    {item.classification === "ASSUMPTION" && <Sliders className="h-3.5 w-3.5 text-purple-400" />}
                    {item.sourceName}
                  </h3>
                  <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                    Dataset: {item.datasetName} · Updated: {item.updatedAt}
                  </p>
                </div>

                <p className="text-xs text-foreground/90 leading-relaxed bg-[#161B22] p-2.5 rounded border border-border/50">
                  {item.summary}
                </p>

                {item.formulaOrModel && (
                  <div className="text-[11px] font-mono text-amber-400/90 bg-amber-950/20 border border-amber-800/30 p-2 rounded">
                    <span className="text-muted-foreground uppercase text-[9px] block">Deterministic Model Formula:</span>
                    {item.formulaOrModel}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-3 bg-[#11161D] flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>Audit Log ID: #AUD-2026-9812</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#1C222B] text-foreground rounded border border-border hover:bg-border transition-colors text-xs"
          >
            Close Audit Drawer
          </button>
        </div>
      </div>
    </div>
  );
}

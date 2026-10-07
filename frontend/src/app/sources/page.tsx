"use client";

import { MOCK_DATA_SOURCES } from "@/lib/mock-data";
import { Database, CheckCircle2, ShieldCheck, ExternalLink, RefreshCw, Cpu } from "lucide-react";
import { DataClassificationBadge } from "@/components/layout/DataClassificationBadge";
import { assets } from "@/config/assets";

export function SourcesPage() {
  return (
    <div className="space-y-6">
      {/* Visual Control Center Header */}
      <div className="relative rounded border border-border bg-[#11161D] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-35">
          <img
            src={assets.hero.controlCenter}
            alt="GeoRisk Control Center"
            className="w-full h-full object-cover filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/85 to-[#0D1117]/50" />
        </div>

        <div className="relative z-10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">
              <Cpu className="h-3.5 w-3.5 text-blue-400" /> DATA PIPELINE ARCHITECTURE
            </div>
            <h1 className="text-base font-bold uppercase tracking-wider font-mono text-foreground mt-1">
              DATA PROVENANCE & SOURCE HEALTH
            </h1>
            <p className="text-xs font-mono text-muted-foreground mt-0.5 max-w-2xl">
              Verified institutional data providers feeding the GeoRisk decision intelligence engine (GDELT, EIA, OPEC, UN Comtrade, OFAC, OSM, GEM).
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-[#0D1117]/90 px-3 py-1.5 rounded border border-emerald-500/30">
            <CheckCircle2 className="h-4 w-4" /> 7/7 Active Pipelines
          </div>
        </div>
      </div>

      {/* Sources Table */}
      <div className="rounded border border-border bg-[#11161D] p-5 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>SOURCE PROVENANCE REGISTRY</span>
          <span>SYSTEM TIME: {new Date().toISOString()}</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {MOCK_DATA_SOURCES.map((src) => (
            <div
              key={src.id}
              className="rounded border border-border bg-[#161B22] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary/40 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="font-bold text-foreground text-sm">{src.name}</span>
                  <span className="px-2 py-0.2 rounded bg-[#1C222B] text-muted-foreground border border-border text-[10px]">
                    {src.category}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" /> {src.status}
                  </span>
                </div>
                <p className="text-xs font-sans text-muted-foreground">{src.description}</p>
                <div className="text-[10px] font-mono text-muted-foreground/80 flex items-center gap-4">
                  <span>Last Sync: {src.lastUpdate}</span>
                  <span>·</span>
                  <span>Reliability Score: <strong className="text-emerald-400">{src.reliabilityScore}%</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <DataClassificationBadge classification={src.classification} />
                <a
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded p-1.5 text-muted-foreground hover:bg-[#1C222B] hover:text-foreground border border-border transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SourcesPage;

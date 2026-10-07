"use client";

import { SupplyFlow } from "@/components/supply-chain/SupplyFlow";
import { ImpactCards } from "@/components/impact/ImpactCards";
import { IntelligenceMap } from "@/components/map/IntelligenceMap";
import { MOCK_IMPACT_CARDS, MOCK_SUPPLY_CHAIN_METRICS } from "@/lib/mock-data";
import { GitMerge, Database, ShieldAlert, BarChart3, Ship } from "lucide-react";
import { DataClassificationBadge } from "@/components/layout/DataClassificationBadge";
import { assets } from "@/config/assets";

export function SupplyChainPage() {
  return (
    <div className="space-y-6">
      {/* Visual Video & Photographic Header Banner */}
      <div className="relative rounded border border-border bg-[#11161D] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none filter contrast-125 brightness-75"
          >
            <source src={assets.videos.tankerTransit} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/80 to-[#0D1117]/40" />
        </div>

        <div className="relative z-10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
              <Ship className="h-3.5 w-3.5 text-primary" /> MARITIME LOGISTICS INTELLIGENCE
            </div>
            <h1 className="text-base font-bold uppercase tracking-wider font-mono text-foreground mt-1">
              SUPPLY CHAIN RESILIENCE EXPLORER
            </h1>
            <p className="text-xs font-mono text-muted-foreground mt-0.5 max-w-2xl">
              End-to-end petroleum & LNG import dependency lineage for India across suppliers, terminals, chokepoints, ports, and refineries.
            </p>
          </div>
          <DataClassificationBadge classification="DERIVED" />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded border border-border bg-[#11161D] p-4 space-y-2">
          <div className="text-[10px] font-mono text-muted-foreground uppercase font-bold">IMPORT EXPOSURE</div>
          <div className="text-3xl font-bold font-mono text-red-400">{MOCK_SUPPLY_CHAIN_METRICS.importExposurePercent}%</div>
          <div className="text-[10px] font-mono text-muted-foreground">Of crude imports pass through Hormuz</div>
        </div>

        <div className="rounded border border-border bg-[#11161D] p-4 space-y-2">
          <div className="text-[10px] font-mono text-muted-foreground uppercase font-bold">SUPPLIER CONCENTRATION</div>
          <div className="text-3xl font-bold font-mono text-amber-400">{MOCK_SUPPLY_CHAIN_METRICS.supplierConcentrationHHI} / 100</div>
          <div className="text-[10px] font-mono text-muted-foreground">Normalized Herfindahl–Hirschman Index</div>
        </div>

        <div className="rounded border border-border bg-[#11161D] p-4 space-y-2">
          <div className="text-[10px] font-mono text-muted-foreground uppercase font-bold">ROUTE EXPOSURE</div>
          <div className="text-3xl font-bold font-mono text-orange-400">{MOCK_SUPPLY_CHAIN_METRICS.routeExposurePercent}%</div>
          <div className="text-[10px] font-mono text-muted-foreground">Bottleneck dependency index</div>
        </div>

        <div className="rounded border border-border bg-[#11161D] p-4 space-y-2">
          <div className="text-[10px] font-mono text-muted-foreground uppercase font-bold">ALT. MARITIME CAPACITY</div>
          <div className="text-3xl font-bold font-mono text-foreground">{MOCK_SUPPLY_CHAIN_METRICS.alternativeCapacityStatus}</div>
          <div className="text-[10px] font-mono text-muted-foreground">Short-term rerouting cushion</div>
        </div>
      </div>

      {/* Node Flow Component */}
      <SupplyFlow />

      {/* Impact Metrics Cards */}
      <ImpactCards cards={MOCK_IMPACT_CARDS} />

      {/* Map View */}
      <IntelligenceMap />
    </div>
  );
}

export default SupplyChainPage;

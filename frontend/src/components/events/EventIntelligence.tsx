"use client";

import type { GeoEvent } from "@/types";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { ShieldAlert, MapPin, Users, Flame, Clock, ArrowRight, ShieldCheck, Camera } from "lucide-react";
import { useShell } from "../layout/AppShell";
import { assets } from "@/config/assets";

interface EventIntelligenceProps {
  event: GeoEvent;
}

export function EventIntelligence({ event }: EventIntelligenceProps) {
  const { openEvidenceDrawer } = useShell();

  return (
    <section className="rounded border border-border bg-[#11161D] p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <SectionLabel title="EVENT INTELLIGENCE" classification={event.dataClassification} />
        <span className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          28 Sep 2026 · 18:42 UTC
        </span>
      </div>

      {/* Main Headline & Satellite Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-2 space-y-2">
          <h2 className="text-base font-bold tracking-tight text-foreground leading-snug">
            {event.title}
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {event.summary}
          </p>
        </div>

        {/* Photorealistic Satellite Card */}
        <div className="relative h-28 rounded border border-border bg-[#161B22] overflow-hidden group">
          <img
            src={assets.geopolitics.hormuzSatellite}
            alt="Strait of Hormuz Satellite Imagery"
            className="h-full w-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-foreground">
            <span className="flex items-center gap-1 bg-[#0D1117]/80 px-1.5 py-0.5 rounded border border-border">
              <Camera className="h-3 w-3 text-amber-400" /> SAR Satellite
            </span>
            <span className="text-emerald-400 font-bold">26.6°N 56.3°E</span>
          </div>
        </div>
      </div>

      {/* Structured Metadata Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="rounded border border-border/50 bg-[#161B22] p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] uppercase text-muted-foreground font-semibold">
            <Users className="h-3 w-3 text-blue-400" /> ACTORS
          </div>
          <div className="mt-1 font-bold text-foreground text-xs line-clamp-1">
            {event.actors ? event.actors.join(", ") : "Iran, IRGC Naval Forces"}
          </div>
        </div>

        <div className="rounded border border-border/50 bg-[#161B22] p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] uppercase text-muted-foreground font-semibold">
            <MapPin className="h-3 w-3 text-amber-400" /> LOCATION
          </div>
          <div className="mt-1 font-bold text-foreground text-xs line-clamp-1">
            {event.location}
          </div>
        </div>

        <div className="rounded border border-border/50 bg-[#161B22] p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] uppercase text-muted-foreground font-semibold">
            <Flame className="h-3 w-3 text-red-400" /> COMMODITY
          </div>
          <div className="mt-1 font-bold text-foreground text-xs line-clamp-1">
            {event.affectedCommodities ? event.affectedCommodities.join(" · ") : "Crude Oil · LNG"}
          </div>
        </div>

        <div className="rounded border border-border/50 bg-[#161B22] p-2.5">
          <div className="flex items-center gap-1.5 text-[10px] uppercase text-muted-foreground font-semibold">
            <ShieldCheck className="h-3 w-3 text-emerald-400" /> CONFIDENCE
          </div>
          <div className="mt-1 font-bold text-emerald-400 text-xs">
            {Math.round(event.confidence * 100)}% Verified
          </div>
        </div>
      </div>

      {/* View Evidence Action */}
      <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs font-mono">
        <span className="text-muted-foreground text-[11px]">
          Sources: EIA · UN Comtrade · GDELT News Engine
        </span>
        <button
          onClick={() => openEvidenceDrawer(event.evidenceList, event.title)}
          className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-bold tracking-tight transition-colors group cursor-pointer"
        >
          View evidence <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}

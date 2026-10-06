"use client";

import { use } from "react";
import Link from "next/link";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { ArrowLeft, ShieldAlert, MapPin, Users, Flame, Clock, Database, FileCode, Sliders } from "lucide-react";
import { DataClassificationBadge } from "@/components/layout/DataClassificationBadge";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const event = MOCK_EVENTS.find((e) => e.id === resolvedParams.id) || MOCK_EVENTS[0];

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Events Intelligence
        </Link>
      </div>

      {/* Main Header */}
      <div className="rounded border border-border bg-[#11161D] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-bold uppercase">
              SEVERITY: {event.severity} / 10
            </span>
            <span className="text-muted-foreground">ID: {event.id}</span>
            <span>·</span>
            <span className="text-emerald-400 font-bold">Confidence: {Math.round(event.confidence * 100)}%</span>
          </div>
          <DataClassificationBadge classification={event.dataClassification} />
        </div>

        <h1 className="text-lg font-bold text-foreground leading-snug">{event.title}</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">{event.summary}</p>
      </div>

      {/* Metadata Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded border border-border bg-[#11161D] p-5 space-y-3 font-mono text-xs">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-1">
            KEY ACTORS & ENTITIES
          </div>
          <ul className="space-y-1.5 text-foreground font-semibold">
            {event.actors.map((actor, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-blue-400" /> {actor}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded border border-border bg-[#11161D] p-5 space-y-3 font-mono text-xs">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-1">
            GEOGRAPHIC LOCATION & ZONE
          </div>
          <div className="space-y-1 text-foreground font-semibold">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-amber-400" /> {event.location} ({event.region})
            </div>
            <div className="text-[11px] text-muted-foreground">
              Coordinates: {event.coordinates[1]}°N, {event.coordinates[0]}°E
            </div>
          </div>
        </div>

        <div className="rounded border border-border bg-[#11161D] p-5 space-y-3 font-mono text-xs">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-1">
            AFFECTED ENERGY COMMODITIES
          </div>
          <ul className="space-y-1.5 text-foreground font-semibold">
            {event.affectedCommodities.map((comm, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Flame className="h-3.5 w-3.5 text-red-400" /> {comm}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Raw Evidence List */}
      <div className="rounded border border-border bg-[#11161D] p-5 space-y-4 font-mono text-xs">
        <div className="text-xs font-bold uppercase tracking-wider text-foreground border-b border-border/80 pb-2">
          INGESTED EVIDENCE & SOURCE AUDIT TRAIL
        </div>

        <div className="space-y-3">
          {event.evidenceList.map((item) => (
            <div key={item.id} className="rounded border border-border/60 bg-[#161B22] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground flex items-center gap-2">
                  {item.classification === "VERIFIED" && <Database className="h-3.5 w-3.5 text-blue-400" />}
                  {item.classification === "DERIVED" && <FileCode className="h-3.5 w-3.5 text-amber-400" />}
                  {item.classification === "ASSUMPTION" && <Sliders className="h-3.5 w-3.5 text-purple-400" />}
                  {item.sourceName} ({item.datasetName})
                </span>
                <DataClassificationBadge classification={item.classification} />
              </div>
              <p className="text-xs font-sans text-muted-foreground">{item.summary}</p>
              {item.formulaOrModel && (
                <div className="text-[10px] text-amber-400 bg-amber-950/20 p-1.5 rounded border border-amber-900/30">
                  Formula: {item.formulaOrModel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

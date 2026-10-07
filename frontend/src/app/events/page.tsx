"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { ShieldAlert, Search, Filter, MapPin, Users, Flame, Clock, ArrowRight, Camera } from "lucide-react";
import { DataClassificationBadge } from "@/components/layout/DataClassificationBadge";
import { assets } from "@/config/assets";

export function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredEvents = MOCK_EVENTS.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || e.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getEventImage = (id: string) => {
    if (id === "evt-2026-001") return assets.geopolitics.hormuzSatellite;
    if (id === "evt-2026-002") return assets.geopolitics.babElMandeb;
    return assets.energy.refinery;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-base font-bold uppercase tracking-wider font-mono text-foreground flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-red-400" />
            INTELLIGENCE EVENTS EXPLORER
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-0.5">
            Active geopolitical event feeds ingested via GDELT & GDM intelligence pipelines
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border border-border bg-[#11161D] pl-8 pr-3 py-1.5 text-xs font-mono text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded border border-border bg-[#11161D] px-3 py-1.5 text-xs font-mono text-foreground outline-none cursor-pointer"
          >
            <option value="all">All Event Types</option>
            <option value="maritime">Maritime Chokepoint</option>
            <option value="conflict">Armed Conflict</option>
            <option value="infrastructure">Infrastructure Cyber</option>
          </select>
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="space-y-4">
        {filteredEvents.map((event) => {
          const eventImg = getEventImage(event.id);

          return (
            <div
              key={event.id}
              className="rounded border border-border bg-[#11161D] p-5 space-y-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-bold uppercase">
                      SEVERITY: {event.severity} / 10
                    </span>
                    <span className="text-muted-foreground">ID: {event.id}</span>
                    <span>·</span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {new Date(event.timestamp).toUTCString()}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-foreground mt-1">{event.title}</h2>
                </div>

                <DataClassificationBadge classification={event.dataClassification} />
              </div>

              {/* Event Body with Satellite Image */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="md:col-span-3">
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">{event.summary}</p>
                </div>
                <div className="relative h-24 rounded border border-border overflow-hidden group bg-[#161B22]">
                  <img
                    src={eventImg}
                    alt={event.title}
                    className="h-full w-full object-cover brightness-85 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
                  <div className="absolute bottom-1.5 left-2 text-[9px] font-mono text-foreground font-semibold flex items-center gap-1">
                    <Camera className="h-3 w-3 text-amber-400" /> Satellite View
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-2 border-t border-border/50">
                <div className="rounded bg-[#161B22] p-2">
                  <span className="text-[10px] text-muted-foreground block font-semibold">ACTORS</span>
                  <span className="font-bold text-foreground">{event.actors.join(", ")}</span>
                </div>
                <div className="rounded bg-[#161B22] p-2">
                  <span className="text-[10px] text-muted-foreground block font-semibold">LOCATION</span>
                  <span className="font-bold text-foreground">{event.location}</span>
                </div>
                <div className="rounded bg-[#161B22] p-2">
                  <span className="text-[10px] text-muted-foreground block font-semibold">AFFECTED COMMODITY</span>
                  <span className="font-bold text-foreground">{event.affectedCommodities.join(" · ")}</span>
                </div>
                <div className="rounded bg-[#161B22] p-2">
                  <span className="text-[10px] text-muted-foreground block font-semibold">CONFIDENCE SCORE</span>
                  <span className="font-bold text-emerald-400">{Math.round(event.confidence * 100)}% Verified</span>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <Link
                  href={`/events/${event.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary hover:underline"
                >
                  Inspect Event Intelligence Details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="rounded border border-border bg-[#11161D] p-12 text-center space-y-2 font-mono text-xs">
            <div className="text-muted-foreground font-bold">NO ACTIVE EVENTS MATCHING CRITERIA</div>
            <p className="text-muted-foreground/60">No events currently exceed the selected risk threshold. Last checked 14 minutes ago.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsPage;

"use client";

import { useState } from "react";
import { Anchor, Factory, ShieldAlert, GitBranch, MapPin, ZoomIn, ZoomOut, Layers, AlertTriangle } from "lucide-react";
import { SupplyChainNode } from "@/types";
import { MOCK_SUPPLY_CHAIN_NODES } from "@/lib/mock-data";
import { useShell } from "../layout/AppShell";

export function IntelligenceMap() {
  const { openAssetInspector } = useShell();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredNodes = MOCK_SUPPLY_CHAIN_NODES.filter((node) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "chokepoint") return node.type === "chokepoint";
    if (selectedCategory === "ports") return node.type === "import_port" || node.type === "export_terminal";
    if (selectedCategory === "refineries") return node.type === "refinery";
    return true;
  });

  return (
    <div className="relative w-full h-[520px] rounded border border-border bg-[#0B0E14] overflow-hidden flex flex-col">
      {/* ── Map Header Toolbar ────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-border bg-[#11161D]/90 px-4 py-2.5 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-foreground">
            <Layers className="h-3.5 w-3.5 text-primary" />
            GEOSPATIAL RISK MAP
          </div>
          <span className="text-muted-foreground/40">|</span>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Vector Cartography · WGS84
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-2.5 py-1 rounded border text-[11px] transition-colors ${
              selectedCategory === "all"
                ? "bg-[#1C222B] text-foreground border-primary/50"
                : "bg-transparent text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            All Layers
          </button>
          <button
            onClick={() => setSelectedCategory("chokepoint")}
            className={`px-2.5 py-1 rounded border text-[11px] transition-colors ${
              selectedCategory === "chokepoint"
                ? "bg-[#1C222B] text-foreground border-primary/50"
                : "bg-transparent text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            Chokepoints ◉
          </button>
          <button
            onClick={() => setSelectedCategory("ports")}
            className={`px-2.5 py-1 rounded border text-[11px] transition-colors ${
              selectedCategory === "ports"
                ? "bg-[#1C222B] text-foreground border-primary/50"
                : "bg-transparent text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            Terminals & Ports □
          </button>
          <button
            onClick={() => setSelectedCategory("refineries")}
            className={`px-2.5 py-1 rounded border text-[11px] transition-colors ${
              selectedCategory === "refineries"
                ? "bg-[#1C222B] text-foreground border-primary/50"
                : "bg-transparent text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            Refineries △
          </button>
        </div>
      </div>

      {/* ── Map Canvas Area (Institutional Vector SVG Layer) ──── */}
      <div className="relative flex-1 bg-[#090C10] overflow-hidden select-none">
        {/* Geographic Grid Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2A313B" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Latitude / Longitude lines */}
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#4C8ED9" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#4C8ED9" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
        </svg>

        {/* World Landmass Silhouettes (Simplified SVG vector path) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 1000 500">
          {/* Middle East & Indian Ocean Coastline Outline */}
          <path
            d="M 350,150 Q 400,140 450,180 T 520,220 T 600,240 T 680,220 T 750,260 L 780,320 L 700,380 L 580,360 L 480,320 L 380,260 Z"
            fill="#141922"
            stroke="#2A313B"
            strokeWidth="1"
          />
          <path
            d="M 450,200 L 490,210 L 480,250 L 440,240 Z"
            fill="#181F2A"
            stroke="#343E4C"
            strokeWidth="1"
          />
          <path
            d="M 650,180 L 740,190 L 710,290 L 640,240 Z"
            fill="#181F2A"
            stroke="#343E4C"
            strokeWidth="1"
          />
        </svg>

        {/* Maritime Shipping Routes (Restrained Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 500">
          {/* Affected Route: Hormuz -> Arabian Sea -> Vadinar Port */}
          <path
            d="M 470,220 L 520,230 L 610,270 L 660,260"
            fill="none"
            stroke="#C94A4A"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="animate-pulse"
          />

          {/* Normal Secondary Route */}
          <path
            d="M 480,260 L 550,300 L 650,280"
            fill="none"
            stroke="#6688A8"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </svg>

        {/* Interactive Map Marker Pins */}
        <div className="absolute inset-0 pointer-events-auto">
          {/* Strait of Hormuz Chokepoint (Special High Threat Event Marker) */}
          <div
            style={{ left: "51.5%", top: "43.5%" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            onClick={() =>
              openAssetInspector(
                MOCK_SUPPLY_CHAIN_NODES.find((n) => n.type === "chokepoint") || MOCK_SUPPLY_CHAIN_NODES[2]
              )
            }
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute h-8 w-8 rounded-full bg-red-500/20 animate-ping opacity-75" />
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#11161D] border-2 border-red-500 text-red-400 font-mono font-bold text-xs shadow-lg group-hover:scale-110 transition-transform">
                ◉
              </div>
            </div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#0D1117]/95 border border-red-500/40 text-red-400 text-[10px] font-mono px-2 py-0.5 rounded whitespace-nowrap shadow-md">
              HORMUZ CHOKEPOINT [82 HIGH]
            </div>
          </div>

          {/* Ras Tanura Port */}
          <div
            style={{ left: "46%", top: "41%" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            onClick={() => openAssetInspector(MOCK_SUPPLY_CHAIN_NODES[1])}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#11161D] border border-amber-500 text-amber-400 text-[10px] font-mono font-bold shadow group-hover:scale-110 transition-transform">
              □
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#0D1117]/90 border border-border text-muted-foreground text-[9px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap hidden group-hover:block z-20">
              Ras Tanura Terminal
            </div>
          </div>

          {/* Vadinar Import Port */}
          <div
            style={{ left: "66%", top: "49%" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            onClick={() => openAssetInspector(MOCK_SUPPLY_CHAIN_NODES[4])}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#11161D] border border-blue-400 text-blue-400 text-[10px] font-mono font-bold shadow group-hover:scale-110 transition-transform">
              □
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#0D1117]/90 border border-border text-muted-foreground text-[9px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap hidden group-hover:block z-20">
              Vadinar Port (India)
            </div>
          </div>

          {/* Jamnagar Refinery */}
          <div
            style={{ left: "67.5%", top: "48%" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            onClick={() => openAssetInspector(MOCK_SUPPLY_CHAIN_NODES[5])}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded bg-[#11161D] border border-emerald-400 text-emerald-400 text-[10px] font-mono font-bold shadow group-hover:scale-110 transition-transform">
              △
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#0D1117]/90 border border-border text-muted-foreground text-[9px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap hidden group-hover:block z-20">
              Jamnagar Refinery
            </div>
          </div>
        </div>

        {/* Map Visual Key Legend */}
        <div className="absolute bottom-3 left-3 bg-[#0D1117]/95 border border-border rounded p-3 text-[11px] font-mono space-y-1.5 shadow-xl backdrop-blur">
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold border-b border-border/50 pb-1 mb-1">
            CARTOGRAPHIC LEGEND
          </div>
          <div className="flex items-center gap-2 text-red-400">
            <span className="font-bold">◉</span> Chokepoint Bottleneck
          </div>
          <div className="flex items-center gap-2 text-amber-400">
            <span className="font-bold">□</span> Export / Import Terminal
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="font-bold">△</span> Refinery Complex
          </div>
          <div className="flex items-center gap-2 text-blue-400">
            <span className="font-bold">●</span> Primary Crude Supplier
          </div>
          <div className="flex items-center gap-2 text-muted-foreground border-t border-border/50 pt-1 text-[10px]">
            <span className="w-4 h-0.5 bg-red-500 inline-block" /> Affected Maritime Route
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
            className="flex h-7 w-7 items-center justify-center rounded border border-border bg-[#161B22] text-foreground hover:bg-[#1C222B]"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="flex h-7 w-7 items-center justify-center rounded border border-border bg-[#161B22] text-foreground hover:bg-[#1C222B]"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

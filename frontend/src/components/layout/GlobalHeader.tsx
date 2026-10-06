"use client";

import { useState } from "react";
import { Globe2, Flame, Clock, ShieldCheck, UserCheck, AlertCircle, Video } from "lucide-react";
import { useShell } from "./AppShell";

export function GlobalHeader() {
  const { isVideoEnabled, setIsVideoEnabled } = useShell();
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedCommodity, setSelectedCommodity] = useState("Crude Oil");
  const [timeRange, setTimeRange] = useState("24h");

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border bg-[#0D1117]/90 px-6 backdrop-blur-md">
      {/* --- Context Controls --- */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 rounded border border-border bg-[#161B22] px-2.5 py-1 text-foreground">
          <Globe2 className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Target:</span>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-transparent font-medium text-foreground outline-none cursor-pointer"
          >
            <option value="India" className="bg-[#161B22]">India</option>
            <option value="Global" className="bg-[#161B22]">Global Overview</option>
            <option value="EU" className="bg-[#161B22]">European Union</option>
            <option value="Japan" className="bg-[#161B22]">Japan</option>
          </select>
        </div>

        <div className="flex items-center gap-2 rounded border border-border bg-[#161B22] px-2.5 py-1 text-foreground">
          <Flame className="h-3.5 w-3.5 text-amber-500/80" />
          <span className="text-muted-foreground">Commodity:</span>
          <select
            value={selectedCommodity}
            onChange={(e) => setSelectedCommodity(e.target.value)}
            className="bg-transparent font-medium text-foreground outline-none cursor-pointer"
          >
            <option value="Crude Oil" className="bg-[#161B22]">Crude Oil (Brent/Arab Light)</option>
            <option value="LNG" className="bg-[#161B22]">Liquefied Natural Gas (LNG)</option>
            <option value="Distillates" className="bg-[#161B22]">Middle Distillates & Diesel</option>
          </select>
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded border border-border bg-[#161B22] px-2.5 py-1 text-foreground">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Range:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent font-medium text-foreground outline-none cursor-pointer"
          >
            <option value="24h" className="bg-[#161B22]">Last 24 Hours</option>
            <option value="7d" className="bg-[#161B22]">Last 7 Days</option>
            <option value="30d" className="bg-[#161B22]">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* --- System Status & User Badge --- */}
      <div className="flex items-center gap-5 text-xs">
        {/* Background Video Atmosphere Control Button */}
        <button
          onClick={() => setIsVideoEnabled(!isVideoEnabled)}
          title="Toggle Background Video Atmosphere"
          className={`flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-[11px] transition-colors cursor-pointer ${
            isVideoEnabled
              ? "border-primary/50 bg-primary/10 text-primary"
              : "border-border bg-[#161B22] text-muted-foreground hover:text-foreground"
          }`}
        >
          <Video className="h-3.5 w-3.5" />
          <span>VIDEO {isVideoEnabled ? "ON" : "OFF"}</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-foreground font-medium">OPERATIONAL</span>
        </div>

        <div className="hidden md:block text-[11px] font-mono text-muted-foreground border-l border-border pl-4">
          Last sync: <span className="text-foreground">12m ago</span>
        </div>

        <div className="flex items-center gap-2 border-l border-border pl-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1C222B] text-[10px] font-mono font-bold text-muted-foreground border border-border">
            SD
          </div>
          <div className="hidden lg:block text-left text-[11px]">
            <div className="font-medium text-foreground leading-tight">Analyst Workstation</div>
            <div className="text-[10px] font-mono text-muted-foreground">Senior Energy Analyst</div>
          </div>
        </div>
      </div>
    </header>
  );
}

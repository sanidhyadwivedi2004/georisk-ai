"use client";

import Link from "next/link";
import { AiChatbotSection } from "@/components/ai/AiChatbotSection";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Activity,
  ShieldAlert,
  GitMerge,
  FlaskConical,
  Database,
  ArrowRight,
  Bot,
  LayoutDashboard,
  HelpCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { assets } from "@/config/assets";

export default function PlainHomePage() {
  return (
    <div className="space-y-10 max-w-6xl mx-auto py-2">
      {/* --- 1. Minimalist Hero Banner --- */}
      <AnimatedSection delay={0.05} className="relative rounded-2xl border border-border bg-[#11161D] overflow-hidden p-8 md:p-10 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
          <img
            src={assets.hero.energyInfrastructure}
            alt="GeoRisk AI Energy Infrastructure"
            className="w-full h-full object-cover filter contrast-125 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/90 to-[#0D1117]/60" />
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-mono font-bold text-primary">
            <Activity className="h-3.5 w-3.5" /> AI-DRIVEN DECISION INTELLIGENCE PLATFORM
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground font-sans leading-tight">
            Understanding Geopolitical Risks to National Energy Supply
          </h1>

          <p className="text-sm md:text-base text-muted-foreground font-sans leading-relaxed">
            GeoRisk AI converts complex maritime chokepoint events into plain-English risk scores, supply disruption metrics, and what-if scenarios — giving decision-makers clear, explainable insights without technical jargon.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-mono font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-md"
            >
              <LayoutDashboard className="h-4 w-4" /> Open Risk Dashboard <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/ai-chat"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-[#161B22] px-5 py-2.5 text-xs font-mono font-bold text-foreground hover:bg-[#1C222B] transition-all"
            >
              <Bot className="h-4 w-4 text-primary" /> Ask GeoRisk AI Chatbot
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* --- 2. Plain English Core Intelligence Flow --- */}
      <AnimatedSection delay={0.1} className="space-y-4">
        <div className="text-center space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            HOW GEORISK AI WORKS
          </div>
          <h2 className="text-xl font-bold text-foreground">From Geopolitical Event to Decision Action</h2>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto font-sans">
            Every step is explainable, traceable, and backed by mathematical engines with zero AI hallucination.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="rounded-xl border border-border bg-[#11161D] p-5 space-y-2 hover:border-primary/40 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400 font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-sm font-bold text-foreground">1. Event Discovery</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Real-time monitoring of maritime chokepoints, tanker incidents, and geopolitical news via GDELT pipelines.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-[#11161D] p-5 space-y-2 hover:border-primary/40 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-sm font-bold text-foreground">2. Deterministic Risk Engine</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Calculates an explainable 0–100 risk score based on severity, route exposure, and alternative supply availability.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-[#11161D] p-5 space-y-2 hover:border-primary/40 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-sm font-bold text-foreground">3. Supply Lineage & HHI</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Quantifies daily crude oil volume loss (bpd), strategic reserve runway, and supplier concentration in plain English.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-[#11161D] p-5 space-y-2 hover:border-primary/40 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 font-mono font-bold text-xs">
              04
            </div>
            <h3 className="text-sm font-bold text-foreground">4. What-If Scenario Lab</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Simulates supply disruption scenarios (e.g. 7-day or 30-day Hormuz closure) to evaluate strategic reserve resilience.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* --- 3. Featured AI Chatbot Assistant Section --- */}
      <AnimatedSection delay={0.15} className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-primary tracking-wider">
              <Bot className="h-4 w-4" /> INTERACTIVE AI ASSISTANT CHATBOT
            </div>
            <h2 className="text-base font-bold text-foreground mt-0.5">
              Ask GeoRisk AI Anything About Energy Security
            </h2>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            Grounded Grounding · Typing Indicators Active
          </span>
        </div>

        {/* Embedded Chatbot Component with realistic loading dots */}
        <AiChatbotSection />
      </AnimatedSection>

      {/* --- 4. Clean Navigation Hub Cards --- */}
      <AnimatedSection delay={0.2} className="space-y-4 pt-4">
        <div className="text-center space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            WORKSTATION HUB DIRECTORY
          </div>
          <h2 className="text-lg font-bold text-foreground">Navigate Dedicated Workstations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Risk Dashboard */}
          <Link
            href="/dashboard"
            className="group rounded-xl border border-border bg-[#11161D] p-6 space-y-3 hover:border-primary/60 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Risk Dashboard Command Center</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-sans">
                Full-screen geospatial intelligence map, systemic risk panel, supply disruption metrics, and ranked actions.
              </p>
            </div>
          </Link>

          {/* Card 2: Events Explorer */}
          <Link
            href="/events"
            className="group rounded-xl border border-border bg-[#11161D] p-6 space-y-3 hover:border-primary/60 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Event Intelligence Feed</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-sans">
                Explore real-time GDELT news feeds, satellite imagery overlays, and extracted event evidence.
              </p>
            </div>
          </Link>

          {/* Card 3: Supply Chain Lineage */}
          <Link
            href="/supply-chain"
            className="group rounded-xl border border-border bg-[#11161D] p-6 space-y-3 hover:border-primary/60 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                <GitMerge className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Supply Chain Lineage & HHI</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-sans">
                End-to-end petroleum lineage from Middle East suppliers to Indian West-Coast refineries.
              </p>
            </div>
          </Link>

          {/* Card 4: Scenario Lab */}
          <Link
            href="/scenarios"
            className="group rounded-xl border border-border bg-[#11161D] p-6 space-y-3 hover:border-primary/60 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <FlaskConical className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Scenario Stress Test Lab</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-sans">
                Interactive parameter simulation to test reserve depletion under 7-day or 30-day maritime closures.
              </p>
            </div>
          </Link>

          {/* Card 5: AI Assistant Page */}
          <Link
            href="/ai-chat"
            className="group rounded-xl border border-border bg-[#11161D] p-6 space-y-3 hover:border-primary/60 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <Bot className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">AI Assistant Chatbot Page</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-sans">
                Dedicated conversation workspace powered by DeepSeek / Gemini grounded database models.
              </p>
            </div>
          </Link>

          {/* Card 6: Data Provenance */}
          <Link
            href="/sources"
            className="group rounded-xl border border-border bg-[#11161D] p-6 space-y-3 hover:border-primary/60 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Database className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Data Provenance Registry</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-sans">
                Inspect official institutional data providers (GDELT, EIA, UN Comtrade, OFAC, OSM) and sync status.
              </p>
            </div>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}

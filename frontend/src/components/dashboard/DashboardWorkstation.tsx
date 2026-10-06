"use client";

import { useState } from "react";
import { EventIntelligence } from "@/components/events/EventIntelligence";
import { RiskAssessmentPanel } from "@/components/risk/RiskAssessmentPanel";
import { IntelligenceMap } from "@/components/map/IntelligenceMap";
import { ImpactCards } from "@/components/impact/ImpactCards";
import { SupplyFlow } from "@/components/supply-chain/SupplyFlow";
import { RecommendationList } from "@/components/recommendations/RecommendationList";
import { ScenarioSimulator } from "@/components/scenarios/ScenarioSimulator";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { assets } from "@/config/assets";
import { Radio, ChevronDown, ChevronUp, HelpCircle, LayoutDashboard } from "lucide-react";

import {
  MOCK_EVENTS,
  MOCK_RISK_ASSESSMENT,
  MOCK_IMPACT_CARDS,
  MOCK_RECOMMENDATIONS,
  MOCK_SCENARIO_PARAMS,
  MOCK_SCENARIO_RESULT,
} from "@/lib/mock-data";

export function DashboardWorkstation() {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="relative rounded-lg border border-border bg-[#11161D] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none filter contrast-125 brightness-75"
          >
            <source src={assets.videos.globalEnergyHero} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/80 to-[#0D1117]/50" />
        </div>

        <div className="relative z-10 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
              <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
              GLOBAL RISK WORKSTATION COMMAND CENTER
            </div>
            <h1 className="text-lg font-bold tracking-tight text-foreground font-sans">
              Geopolitical Energy Risk & Resilience Pipeline
            </h1>
            <p className="text-xs text-muted-foreground font-sans max-w-3xl">
              Transforming maritime chokepoint events into explainable risk scores, supply impact metrics, and mitigation what-if scenarios.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs shrink-0">
            <div className="rounded border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-400 font-bold text-center">
              <div>CRITICAL THREAT</div>
              <div className="text-[10px] text-red-400/80 font-normal">Hormuz Chokepoint</div>
            </div>
            <div className="rounded border border-border bg-[#161B22]/90 px-3 py-1.5 text-foreground text-center">
              <div className="font-bold text-amber-400">82 / 100</div>
              <div className="text-[10px] text-muted-foreground">Elevated Risk</div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Event Intelligence (Left) + Systemic Risk Score (Right) */}
      <AnimatedSection delay={0.05} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EventIntelligence event={MOCK_EVENTS[0]} />
        </div>
        <div>
          <RiskAssessmentPanel risk={MOCK_RISK_ASSESSMENT} />
        </div>
      </AnimatedSection>

      {/* Row 2: Hero Geospatial Intelligence Map */}
      <AnimatedSection delay={0.1}>
        <IntelligenceMap />
      </AnimatedSection>

      {/* Row 3: Supply Chain Impact Cards & Lineage */}
      <AnimatedSection delay={0.15} className="space-y-6">
        <ImpactCards cards={MOCK_IMPACT_CARDS} />
        <SupplyFlow />
      </AnimatedSection>

      {/* Row 4: Recommendations & Scenario Lab */}
      <AnimatedSection delay={0.2} className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-wider font-mono text-foreground flex items-center justify-between">
            <span>RECOMMENDED DECISION ACTIONS</span>
            <span className="text-[10px] text-muted-foreground font-normal">Ranked by Priority</span>
          </div>
          <RecommendationList recommendations={MOCK_RECOMMENDATIONS} />
        </div>
        <div>
          <ScenarioSimulator
            defaultParams={MOCK_SCENARIO_PARAMS}
            defaultResult={MOCK_SCENARIO_RESULT}
          />
        </div>
      </AnimatedSection>
    </div>
  );
}

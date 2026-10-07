"use client";

import { AiChatbotSection } from "@/components/ai/AiChatbotSection";
import { Bot, HelpCircle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { DataClassificationBadge } from "@/components/layout/DataClassificationBadge";

export default function AiChatPage() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-lg border border-border bg-[#11161D] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            <Bot className="h-3.5 w-3.5 text-primary" /> GROUNDED AI ASSISTANT HUB
          </div>
          <h1 className="text-base font-bold uppercase tracking-wider font-mono text-foreground mt-1">
            EXPLAINABLE GEOPOLITICAL & ENERGY RISK CHATBOT
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-0.5 max-w-3xl">
            Ask any question regarding geopolitical news, maritime chokepoints, supply chain exposure, or scenario stress testing. Answers are strictly grounded in verified database context.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <DataClassificationBadge classification="VERIFIED" />
        </div>
      </div>

      {/* Main Chatbot Interface Component */}
      <AiChatbotSection />
    </div>
  );
}

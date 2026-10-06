"use client";

import type { ImpactCard } from "@/types";
import { ArrowUpRight, ArrowDownRight, Minus, Info } from "lucide-react";

interface ImpactCardsProps {
  cards: ImpactCard[];
}

export function ImpactCards({ cards }: ImpactCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="rounded border border-border bg-[#11161D] p-4 flex flex-col justify-between space-y-3 relative group"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
              {card.label}
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 text-[9px] font-mono font-bold text-amber-400">
              MODELLED
            </span>
          </div>

          {/* Metric Value */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                {card.value}
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                {card.unit}
              </span>
            </div>

            {/* Trend */}
            <span
              className={`flex h-6 w-6 items-center justify-center rounded border text-xs font-bold ${
                card.trend === "up"
                  ? "bg-red-500/10 border-red-500/30 text-red-400"
                  : card.trend === "down"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-muted/10 border-border text-muted-foreground"
              }`}
            >
              {card.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : card.trend === "down" ? (
                <ArrowDownRight className="h-4 w-4" />
              ) : (
                <Minus className="h-4 w-4" />
              )}
            </span>
          </div>

          {/* Explicit Modelled Rationale Tooltip / Footer */}
          <div className="pt-2 border-t border-border/50 text-[10px] font-mono text-muted-foreground/80 flex items-center justify-between">
            <span className="line-clamp-1">{card.modelledBasis || "Based on 30% disruption & 7d duration"}</span>
            <Info className="h-3 w-3 shrink-0 text-muted-foreground/60 cursor-help" />
          </div>
        </div>
      ))}
    </div>
  );
}

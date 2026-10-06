"use client";

import { useState } from "react";
import type { Recommendation } from "@/types";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { PRIORITY_CONFIG } from "@/lib/design-tokens";

interface RecommendationPanelProps {
  recommendations: Recommendation[];
}

/**
 * Numbered analyst action list with expand/collapse for detail.
 * Replaces the card-based recommendation list.
 */
export function RecommendationPanel({
  recommendations,
}: RecommendationPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section>
      <SectionLabel title="Recommendations" classification="DEMO_MOCK" />

      <div className="mt-5 space-y-0 divide-y divide-border rounded-lg border border-border">
        {recommendations.map((rec, index) => {
          const isExpanded = expandedId === rec.id;
          const priorityConfig = PRIORITY_CONFIG[rec.priority];

          return (
            <div key={rec.id} className="bg-card">
              <button
                onClick={() => setExpandedId(isExpanded ? null : rec.id)}
                className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                aria-expanded={isExpanded}
              >
                {/* Number */}
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded text-[11px] font-bold tabular-nums text-muted-foreground bg-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {rec.title}
                    </h3>
                    <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-[0.06em] ${priorityConfig.color}`}>
                      {priorityConfig.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                    {rec.description}
                  </p>
                </div>

                {/* Expand icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Expanded Detail */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: isExpanded ? "300px" : "0",
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                <div className="border-t border-border bg-secondary/20 px-5 py-4 ml-[52px]">
                  <div className="space-y-3 text-xs text-muted-foreground">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 mb-1">
                        Rationale
                      </p>
                      <p className="leading-relaxed">{rec.description}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 mb-1">
                        Expected Effect
                      </p>
                      <p className="leading-relaxed">
                        Reduce dependency concentration and improve supply chain resilience
                        for affected energy corridors.
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground/40">
                      Source: GeoRisk Recommendation Engine v1.0 · DEMO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

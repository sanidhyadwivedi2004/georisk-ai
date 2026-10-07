export const DURATION = {
  instant: 0.12,
  fast: 0.2,
  normal: 0.32,
  slow: 0.5,
  cinematic: 1.2,
} as const;

export const STAGGER = {
  tight: 0.04,
  normal: 0.08,
  loose: 0.16,
} as const;

export const EASING = {
  standard: "cubic-bezier(0.25,0.1,0.25,1)",
  decelerate: "cubic-bezier(0.0,0.0,0.2,1)",
  accelerate: "cubic-bezier(0.4,0.0,1,1)",
} as const;

export type RecommendationPriority = "low" | "medium" | "high" | "critical";

export interface PriorityConfigEntry {
  label: string;
  color: string;
  border: string;
  background: string;
}

export const PRIORITY_CONFIG: Record<RecommendationPriority, PriorityConfigEntry> = {
  critical: {
    label: "Critical",
    color: "text-red-400",
    border: "border-red-500/30",
    background: "bg-red-500/10",
  },
  high: {
    label: "High",
    color: "text-orange-400",
    border: "border-orange-500/30",
    background: "bg-orange-500/10",
  },
  medium: {
    label: "Medium",
    color: "text-amber-400",
    border: "border-amber-500/30",
    background: "bg-amber-500/10",
  },
  low: {
    label: "Low",
    color: "text-muted-foreground",
    border: "border-border",
    background: "bg-muted/10",
  },
};

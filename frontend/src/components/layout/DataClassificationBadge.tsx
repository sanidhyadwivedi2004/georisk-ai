import type { DataClassification } from "@/types";

interface DataClassificationBadgeProps {
  classification: DataClassification;
  size?: "sm" | "md";
  className?: string;
}

const CONFIG: Record<DataClassification, { label: string; style: string }> = {
  VERIFIED: { label: "Verified Data", style: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
  DERIVED: { label: "Derived Calc", style: "text-blue-400 border-blue-400/30 bg-blue-500/10" },
  ASSUMPTION: { label: "Assumption", style: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  DEMO_MOCK: { label: "Demo Mode", style: "text-muted-foreground border-border bg-[#161B22]" },
};

export function DataClassificationBadge({
  classification,
  size = "md",
  className = "",
}: DataClassificationBadgeProps) {
  const { label, style } = CONFIG[classification];
  const sizeClasses = size === "sm" ? "px-1.5 py-0.2 text-[9px]" : "px-2 py-0.5 text-[10px]";

  return (
    <span
      className={`inline-flex items-center rounded border font-mono font-bold uppercase tracking-[0.08em] ${sizeClasses} ${style} ${className}`}
    >
      {label}
    </span>
  );
}

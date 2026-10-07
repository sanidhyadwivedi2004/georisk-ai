import type { DataClassification } from "@/types";
import { DataClassificationBadge } from "./DataClassificationBadge";

interface SectionLabelProps {
  title: string;
  classification?: DataClassification;
  className?: string;
}

/**
 * Editorial section divider used throughout the dashboard.
 * Replaces card headers with a stronger typographic hierarchy.
 */
export function SectionLabel({
  title,
  classification,
  className = "",
}: SectionLabelProps) {
  return (
    <div
      className={`flex items-center justify-between border-b border-border pb-2 ${className}`}
    >
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {title}
      </h2>
      {classification && (
        <DataClassificationBadge classification={classification} />
      )}
    </div>
  );
}

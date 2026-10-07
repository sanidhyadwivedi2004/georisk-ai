import type { RiskAssessment } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RiskScoreProps {
  risk: RiskAssessment;
}

const THREAT_COLORS: Record<string, string> = {
  low: "text-emerald-400",
  moderate: "text-amber-400",
  high: "text-orange-400",
  critical: "text-red-400",
};

const THREAT_RING_COLORS: Record<string, string> = {
  low: "stroke-emerald-500",
  moderate: "stroke-amber-500",
  high: "stroke-orange-500",
  critical: "stroke-red-500",
};

export function RiskScore({ risk }: RiskScoreProps) {
  const circumference = 2 * Math.PI * 54; // r = 54
  const offset = circumference - (risk.overallScore / 100) * circumference;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Risk Score</CardTitle>
          <Badge
            variant="outline"
            className="text-[10px] uppercase tracking-wider text-amber-400 border-amber-500/30 bg-amber-500/10"
          >
            Demo Data
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {/* Circular score */}
        <div className="relative flex items-center justify-center">
          <svg width="140" height="140" className="-rotate-90">
            {/* Background ring */}
            <circle
              cx="70"
              cy="70"
              r="54"
              fill="none"
              stroke="currentColor"
              className="text-muted/40"
              strokeWidth="10"
            />
            {/* Score ring */}
            <circle
              cx="70"
              cy="70"
              r="54"
              fill="none"
              className={THREAT_RING_COLORS[risk.threatLevel]}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span
              className={`text-3xl font-bold tabular-nums ${THREAT_COLORS[risk.threatLevel]}`}
            >
              {risk.overallScore}
            </span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>

        {/* Threat level label */}
        <Badge
          variant="outline"
          className={`capitalize ${THREAT_COLORS[risk.threatLevel]}`}
        >
          {risk.threatLevel} threat
        </Badge>

        {/* Sub-scores */}
        <div className="w-full space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Exposure Index</span>
            <span className="font-medium tabular-nums">
              {risk.exposureIndex}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Vulnerability</span>
            <span className="font-medium tabular-nums">
              {risk.vulnerabilityRating}
            </span>
          </div>
        </div>

        <p className="mt-1 text-center text-[11px] text-muted-foreground/60">
          ⚠ This score is DEMO/MOCK data — not a real GeoRisk AI calculation.
        </p>
      </CardContent>
    </Card>
  );
}

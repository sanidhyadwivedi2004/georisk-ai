"use client";

import type { ScenarioParams, ScenarioResult } from "@/types";
import { ScenarioSimulator } from "./ScenarioSimulator";

interface ScenarioPanelProps {
  defaultParams: ScenarioParams;
  defaultResult: ScenarioResult;
}

export function ScenarioPanel({
  defaultParams,
  defaultResult,
}: ScenarioPanelProps) {
  return (
    <ScenarioSimulator
      defaultParams={defaultParams}
      defaultResult={defaultResult}
    />
  );
}

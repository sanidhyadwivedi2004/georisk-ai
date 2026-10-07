import type { ImpactCard as ImpactCardType } from "@/types";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { ImpactCards } from "./ImpactCards";

interface SupplyChainImpactProps {
  cards: ImpactCardType[];
}

export function SupplyChainImpact({ cards }: SupplyChainImpactProps) {
  return (
    <section className="space-y-3">
      <SectionLabel title="SUPPLY CHAIN DISRUPTION IMPACT" classification="DERIVED" />
      <ImpactCards cards={cards} />
    </section>
  );
}

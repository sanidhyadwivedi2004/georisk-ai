"use client";

import { ChevronRight, Anchor, Factory, ShieldAlert, Database } from "lucide-react";
import { SupplyChainNode } from "@/types";
import { MOCK_SUPPLY_CHAIN_NODES } from "@/lib/mock-data";
import { useShell } from "../layout/AppShell";
import { getAssetForNodeType } from "@/config/assets";

export function SupplyFlow() {
  const { openAssetInspector } = useShell();

  return (
    <div className="rounded border border-border bg-[#11161D] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono">
            END-TO-END SUPPLY CHAIN NODE FLOW
          </h3>
          <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
            Interactive node lineage: Click any asset to inspect live metadata & exposure
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold">
          DERIVED LINEAGE
        </span>
      </div>

      {/* Horizontal Flow Container */}
      <div className="flex items-center gap-2 overflow-x-auto py-3 px-1 scrollbar-thin">
        {MOCK_SUPPLY_CHAIN_NODES.map((node, index) => {
          const thumbnailImg = getAssetForNodeType(node.type);

          return (
            <div key={node.id} className="flex items-center shrink-0">
              {/* Node Card with Photographic Thumbnail */}
              <button
                onClick={() => openAssetInspector(node)}
                className={`group flex flex-col items-start rounded border overflow-hidden w-[200px] text-left transition-all cursor-pointer ${
                  node.currentExposure === "CRITICAL"
                    ? "border-red-500/50 bg-red-950/20 hover:border-red-400"
                    : node.currentExposure === "HIGH"
                    ? "border-orange-500/50 bg-orange-950/20 hover:border-orange-400"
                    : "border-border bg-[#161B22] hover:border-primary/50"
                }`}
              >
                {/* Photo Header */}
                <div className="relative h-20 w-full overflow-hidden bg-[#0D1117]">
                  <img
                    src={thumbnailImg}
                    alt={node.name}
                    className="h-full w-full object-cover brightness-85 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-transparent" />
                  <span
                    className={`absolute top-2 right-2 font-bold px-1.5 py-0.2 rounded text-[9px] font-mono ${
                      node.currentExposure === "CRITICAL"
                        ? "text-white bg-red-500/90"
                        : node.currentExposure === "HIGH"
                        ? "text-white bg-orange-500/90"
                        : "text-black bg-amber-400/90"
                    }`}
                  >
                    {node.currentExposure}
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-3 space-y-1 w-full">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {node.type.replace("_", " ")}
                  </div>

                  <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {node.name}
                  </div>

                  <div className="text-[10px] font-mono text-muted-foreground pt-1 border-t border-border/40">
                    Cap: <span className="text-foreground font-semibold">{node.capacity}</span>
                  </div>
                </div>
              </button>

              {/* Connector Arrow */}
              {index < MOCK_SUPPLY_CHAIN_NODES.length - 1 && (
                <div className="px-2 text-muted-foreground/40">
                  <ChevronRight className="h-5 w-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

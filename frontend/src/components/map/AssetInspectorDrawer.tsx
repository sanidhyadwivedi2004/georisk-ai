"use client";

import { X, Anchor, Factory, ShieldAlert, GitBranch, Database, MapPin } from "lucide-react";
import { SupplyChainNode } from "@/types";
import { DataClassificationBadge } from "../layout/DataClassificationBadge";
import { getAssetForNodeType } from "@/config/assets";

interface AssetInspectorDrawerProps {
  node: SupplyChainNode | null;
  onClose: () => void;
}

export function AssetInspectorDrawer({ node, onClose }: AssetInspectorDrawerProps) {
  if (!node) return null;

  const assetImg = getAssetForNodeType(node.type);

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-[#0D1117] text-foreground shadow-2xl animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-[#11161D] px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-border bg-[#1C222B] text-primary">
            {node.type === "import_port" || node.type === "export_terminal" ? (
              <Anchor className="h-4 w-4" />
            ) : node.type === "refinery" ? (
              <Factory className="h-4 w-4" />
            ) : (
              <ShieldAlert className="h-4 w-4 text-amber-500" />
            )}
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground uppercase tracking-tight">
              {node.name}
            </h2>
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
              <span>{node.country}</span>
              <span>·</span>
              <span className="capitalize">{node.type.replace("_", " ")}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded p-1 text-muted-foreground hover:bg-[#1C222B] hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Hero Media Preview */}
      <div className="relative h-44 w-full bg-[#161B22] border-b border-border overflow-hidden select-none">
        <img
          src={assetImg}
          alt={node.name}
          className="h-full w-full object-cover brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/40 to-transparent" />
        
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-xs">
          <span className="flex items-center gap-1 text-[11px] text-foreground font-semibold bg-[#0D1117]/80 px-2 py-0.5 rounded border border-border">
            <MapPin className="h-3 w-3 text-amber-400" />
            {node.coordinates[1].toFixed(2)}°N, {node.coordinates[0].toFixed(2)}°E
          </span>
          <span
            className={`font-bold px-2 py-0.5 rounded text-[10px] ${
              node.currentExposure === "CRITICAL"
                ? "bg-red-500/80 text-white"
                : node.currentExposure === "HIGH"
                ? "bg-orange-500/80 text-white"
                : "bg-amber-500/80 text-black"
            }`}
          >
            {node.currentExposure} RISK EXPOSURE
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs font-sans">
        {/* Operational Attributes */}
        <div className="space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            ASSET SPECIFICATIONS & THROUGHPUT
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded border border-border bg-[#11161D] p-3">
              <div className="text-muted-foreground text-[10px] font-mono">CAPACITY / THROUGHPUT</div>
              <div className="text-sm font-bold text-foreground mt-1 font-mono">{node.capacity}</div>
            </div>

            <div className="rounded border border-border bg-[#11161D] p-3">
              <div className="text-muted-foreground text-[10px] font-mono">LOCATION ZONE</div>
              <div className="text-xs font-bold text-foreground mt-1 font-mono">{node.location}</div>
            </div>

            <div className="rounded border border-border bg-[#11161D] p-3">
              <div className="text-muted-foreground text-[10px] font-mono">CONNECTED SUPPLIERS</div>
              <div className="text-sm font-bold text-foreground mt-1 font-mono">{node.connectedSuppliers}</div>
            </div>

            <div className="rounded border border-border bg-[#11161D] p-3">
              <div className="text-muted-foreground text-[10px] font-mono">CONNECTED ROUTES</div>
              <div className="text-sm font-bold text-foreground mt-1 font-mono">{node.connectedRoutes}</div>
            </div>
          </div>
        </div>

        {/* Provenance Sources */}
        <div className="space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            DATA PROVENANCE & SOURCES
          </div>
          <div className="flex flex-wrap gap-2">
            {node.sources.map((src, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded border border-border bg-[#161B22] px-2.5 py-1 text-[11px] font-mono text-foreground"
              >
                <Database className="h-3 w-3 text-blue-400" />
                {src}
              </span>
            ))}
          </div>
        </div>

        {/* Classification */}
        <div className="pt-2 border-t border-border flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground font-mono">CLASSIFICATION:</span>
          <DataClassificationBadge classification={node.dataClassification} />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-border bg-[#11161D] p-4 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 rounded border border-border bg-[#1C222B] py-2 text-xs font-semibold text-foreground hover:bg-border transition-colors cursor-pointer"
        >
          Close Inspector
        </button>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GRAPH_HUB, graphCurvePath } from "@/lib/graph-layout";

export type TeamworkGraphNode = {
  key: string;
  x: number;
  y: number;
  node: React.ReactNode;
  lineColor?: string;
  lineOpacity?: number;
  curveBend?: number;
};

export function TeamworkGraphCanvas({
  nodes,
  center,
  hubX = GRAPH_HUB.x,
  hubY = GRAPH_HUB.y,
  variant = "dark",
  className,
  minHeight = 420,
  visible = true,
}: {
  nodes: TeamworkGraphNode[];
  center: React.ReactNode;
  hubX?: number;
  hubY?: number;
  variant?: "dark" | "light";
  className?: string;
  minHeight?: number;
  visible?: boolean;
}) {
  const isDark = variant === "dark";
  const lineDefault = isDark ? "rgba(255,255,255,0.22)" : "#111827";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[1.75rem] border",
        isDark
          ? "border-white/[0.08] bg-[#161b26] shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
          : "border-fynk-border bg-white shadow-[0_20px_50px_rgba(0,72,56,0.08)]",
        className,
      )}
      style={{ minHeight }}
    >
      {/* Subtle grid — reference: Teamwork Graph background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      {/* Graph field — square, vertically balanced with padding */}
      <div className="absolute inset-x-3 inset-y-6 sm:inset-x-5 sm:inset-y-8">
        <div className="relative mx-auto h-full w-full max-w-[400px]" style={{ aspectRatio: "1 / 1.05" }}>
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            {nodes.map(({ key, x, y, lineColor, lineOpacity = 0.55, curveBend = 0.16 }) => (
              <path
                key={key}
                d={graphCurvePath(hubX, hubY, x, y, curveBend)}
                fill="none"
                stroke={lineColor ?? lineDefault}
                strokeWidth="0.55"
                strokeOpacity={lineOpacity}
                strokeLinecap="round"
              />
            ))}
            {/* Hub glow (fynk-orange-tinted in light mode) */}
            <circle
              cx={hubX}
              cy={hubY}
              r="8"
              fill={isDark ? "rgba(0,72,56,0.35)" : "#FFF4EF"}
              stroke={isDark ? "rgba(0,230,130,0.4)" : "rgba(240,90,40,0.35)"}
              strokeWidth="0.4"
            />
          </svg>

          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${hubX}%`, top: `${hubY}%` }}
          >
            {center}
          </div>

          {nodes.map(({ key, x, y, node }, i) => (
            <div
              key={key}
              className={cn(
                "absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-700",
                visible ? "opacity-100" : "opacity-0",
              )}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ORBIT_CENTER } from "@/lib/orbit-layout";

const INK = "#111827";

export type OrbitHubNode = {
  key: string;
  x: number;
  y: number;
  node: React.ReactNode;
  lineColor?: string;
  lineOpacity?: number;
  midLabel?: string;
};

export function OrbitHubCanvas({
  nodes,
  center,
  topLeftLabel,
  bottomRightLabel,
  orbitRadius = 36,
  className,
  minHeight = 380,
  lineColor = INK,
  visible = true,
  accent,
}: {
  nodes: OrbitHubNode[];
  center: React.ReactNode;
  topLeftLabel?: string;
  bottomRightLabel?: string;
  orbitRadius?: number;
  className?: string;
  minHeight?: number;
  lineColor?: string;
  visible?: boolean;
  accent?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-visible rounded-[1.75rem] border-2 border-fynk-ink/10 bg-[#F9FAFB] shadow-[0_20px_50px_rgba(0,0,0,0.06)]",
        className,
      )}
      style={{ minHeight }}
    >
      {topLeftLabel && (
        <span
          className="pointer-events-none absolute left-4 top-4 z-30 max-w-[45%] -rotate-6 font-handwriting text-[1.15rem] font-bold leading-tight text-brand sm:left-5 sm:top-5 sm:text-[1.35rem]"
          aria-hidden
        >
          {topLeftLabel}
        </span>
      )}
      {bottomRightLabel && (
        <span
          className="pointer-events-none absolute bottom-4 right-4 z-30 max-w-[45%] rotate-3 text-right font-handwriting text-[1.05rem] font-bold leading-tight text-fynk-orange sm:bottom-5 sm:right-5 sm:text-[1.25rem]"
          aria-hidden
        >
          {bottomRightLabel}
        </span>
      )}

      {accent}

      {/* Square orbit field — keeps SVG % coords aligned with HTML overlays */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[88%] max-w-[340px] -translate-x-1/2 -translate-y-1/2 sm:w-[84%]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <circle
            cx={ORBIT_CENTER}
            cy={ORBIT_CENTER}
            r={orbitRadius}
            fill="none"
            stroke={lineColor}
            strokeWidth="0.35"
            strokeDasharray="2 2"
            strokeOpacity="0.18"
          />
          {nodes.map(({ key, x, y, lineColor: nodeLineColor, lineOpacity = 0.28, midLabel }) => {
            const stroke = nodeLineColor ?? lineColor;
            const mx = (ORBIT_CENTER + x) / 2;
            const my = (ORBIT_CENTER + y) / 2;
            return (
              <g key={key}>
                <line
                  x1={ORBIT_CENTER}
                  y1={ORBIT_CENTER}
                  x2={x}
                  y2={y}
                  stroke={stroke}
                  strokeWidth="0.45"
                  strokeDasharray="1.4 1.1"
                  strokeOpacity={lineOpacity}
                  strokeLinecap="round"
                />
                {midLabel && (
                  <>
                    <rect
                      x={mx - 14}
                      y={my - 4}
                      width="28"
                      height="8"
                      rx="2"
                      fill="#fff"
                      stroke={stroke}
                      strokeWidth="0.35"
                      strokeOpacity="0.45"
                    />
                    <text
                      x={mx}
                      y={my + 2}
                      textAnchor="middle"
                      fill={stroke}
                      fontSize="3.2"
                      fontWeight="700"
                    >
                      {midLabel}
                    </text>
                  </>
                )}
              </g>
            );
          })}
          <circle
            cx={ORBIT_CENTER}
            cy={ORBIT_CENTER}
            r="10"
            fill="#e6fff0"
            stroke={lineColor}
            strokeWidth="0.5"
          />
          <circle
            cx={ORBIT_CENTER}
            cy={ORBIT_CENTER}
            r="6.5"
            fill="#fff"
            stroke={lineColor}
            strokeWidth="0.3"
            strokeOpacity="0.3"
          />
        </svg>

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          {center}
        </div>

        {nodes.map(({ key, x, y, node }, i) => (
          <div
            key={key}
            className={cn(
              "absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity duration-700",
              visible ? "opacity-100" : "opacity-0",
            )}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transitionDelay: `${i * 50}ms`,
            }}
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  );
}

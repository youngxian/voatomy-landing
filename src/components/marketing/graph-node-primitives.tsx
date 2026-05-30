"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Hexagonal icon container — reference: integration logo strip */
export function HexIconBadge({
  children,
  className,
  size = 64,
}: {
  children: React.ReactNode;
  className?: string;
  size?: number;
}) {
  const h = Math.round(size * 1.15);
  return (
    <div
      className={cn("relative flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: h }}
    >
      <svg
        className="absolute inset-0 h-full w-full drop-shadow-sm"
        viewBox="0 0 64 74"
        aria-hidden
      >
        <polygon
          points="32,2 62,19 62,55 32,72 2,55 2,19"
          fill="#fff"
          stroke="#E5E7EB"
          strokeWidth="1.5"
        />
      </svg>
      <div className="relative z-10 flex items-center justify-center">{children}</div>
    </div>
  );
}

/** Category label pill — reference: "Work item", "Project", "Roadmap" nodes */
export function GraphLabelPill({
  label,
  color,
  icon,
  dark = true,
  className,
}: {
  label: string;
  color: string;
  icon?: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border px-2.5 py-1.5 shadow-lg sm:px-3 sm:py-2",
        dark ? "border-white/10 bg-[#252b3b]" : "border-fynk-border bg-white",
        className,
      )}
      style={{ borderColor: dark ? `${color}55` : `${color}33` }}
    >
      {icon && (
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg sm:h-8 sm:w-8"
          style={{ backgroundColor: `${color}22` }}
        >
          {icon}
        </div>
      )}
      <span
        className={cn(
          "whitespace-nowrap text-[10px] font-semibold sm:text-xs",
          dark ? "text-white" : "text-fynk-ink",
        )}
      >
        {label}
      </span>
    </div>
  );
}

/** Small square tool icon node on the graph */
export function GraphIconNode({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border border-white/15 bg-white shadow-md",
        size === "sm" ? "h-9 w-9" : "h-10 w-10",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Horizontal hex icon strip — reference: top logo row */
export function HexIconStrip({
  icons,
  className,
}: {
  icons: { key: string; node: React.ReactNode }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 sm:gap-4",
        className,
      )}
    >
      {icons.map(({ key, node }) => (
        <HexIconBadge key={key} size={56}>
          {node}
        </HexIconBadge>
      ))}
    </div>
  );
}

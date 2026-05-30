"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeSize = "sm" | "md" | "lg" | "xl";

const SIZE_MAP: Record<
  BadgeSize,
  { box: string; icon: string; border: string; shadow: string }
> = {
  sm: { box: "h-10 w-10 rounded-xl", icon: "h-[18px] w-[18px]", border: "border-[1.5px]", shadow: "shadow-sm" },
  md: { box: "h-12 w-12 rounded-2xl", icon: "h-5 w-5", border: "border-2", shadow: "shadow-md" },
  lg: { box: "h-14 w-14 rounded-2xl", icon: "h-7 w-7", border: "border-2", shadow: "shadow-lg" },
  xl: { box: "h-16 w-16 rounded-[1.25rem]", icon: "h-8 w-8", border: "border-[3px]", shadow: "shadow-xl" },
};

export function ColoredIconBadge({
  children,
  size = "md",
  bg,
  ringColor = "rgba(255,255,255,0.75)",
  className,
  float = false,
  rotate = 0,
}: {
  children: React.ReactNode;
  size?: BadgeSize;
  /** CSS background — gradient or solid */
  bg: string;
  ringColor?: string;
  className?: string;
  float?: boolean;
  rotate?: number;
}) {
  const s = SIZE_MAP[size];
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110",
        s.box,
        s.shadow,
        s.border,
        "border-solid",
        float && "animate-float-slow",
        className,
      )}
      style={{
        background: bg,
        borderColor: ringColor,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      <span className={cn("relative z-[1] flex items-center justify-center", s.icon)}>{children}</span>
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-40"
        style={{
          background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.55), transparent 55%)",
        }}
        aria-hidden
      />
    </span>
  );
}

/** Pill label with embedded colored dot icon */
export function ColoredIconPill({
  icon,
  label,
  bg,
  color,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  bg: string;
  color: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] shadow-sm",
        className,
      )}
      style={{ backgroundColor: bg, color }}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90 shadow-sm">{icon}</span>
      {label}
    </span>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { GitBranch, Link2, Network, Share2, Workflow } from "lucide-react";

const BRAND_ORANGE = "#f16e2c";
const FLOW_TEAL = "#0d9488";
const FLOW_DEEP = "#004838";

const STAGE = ["Ingest", "Signals", "Share", "Plan", "Ship"] as const;

/**
 * Data-flow strip: gradient wire (teal → brand orange), travelling pulse, labeled nodes.
 */
export function WireflowRail({
  className,
  label = "End-to-end data flow",
  dark = false,
}: {
  className?: string;
  label?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn("relative mx-auto w-full max-w-3xl py-2", className)}
      role="img"
      aria-label={label}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border px-2.5 py-3 shadow-sm",
          dark
            ? "border-white/15 bg-gradient-to-r from-white/[0.07] via-white/[0.04] to-white/[0.09]"
            : "border-teal/12 bg-gradient-to-r from-white via-teal/[0.03] to-coral/[0.06]",
        )}
      >
        <svg
          className="pointer-events-none absolute left-[5%] right-[5%] top-1/2 h-6 w-[90%] -translate-y-1/2"
          viewBox="0 0 400 24"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={FLOW_DEEP} stopOpacity={dark ? 0.45 : 0.5} />
              <stop offset="50%" stopColor={FLOW_TEAL} stopOpacity={0.95} />
              <stop offset="100%" stopColor={BRAND_ORANGE} stopOpacity={dark ? 0.8 : 0.92} />
            </linearGradient>
          </defs>
          <line
            x1="4"
            y1="12"
            x2="396"
            y2="12"
            stroke="url(#flow-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 8"
            opacity="0.92"
          />
        </svg>

        <div
          className={cn(
            "pointer-events-none absolute top-1/2 z-[1] h-2.5 w-14 -translate-y-1/2 rounded-full bg-gradient-to-r opacity-90 blur-[2.5px] animate-wire-crawl",
            dark
              ? "from-transparent via-white/60 to-transparent"
              : "from-[#004838]/0 via-[#0d9488] to-[#f16e2c]/90",
          )}
        />

        <div className="relative z-[2] flex h-12 items-center justify-between px-[4%] sm:px-[5%]">
          {([GitBranch, Network, Share2, Workflow, Link2] as const).map((Icon, i) => (
            <div key={STAGE[i]} className="flex flex-col items-center gap-0.5">
              <div
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-xl border shadow-md transition-transform duration-500 animate-float-slow sm:h-9 sm:w-9",
                  dark
                    ? "border-white/20 bg-gradient-to-b from-white/15 to-white/5 text-accent-lime"
                    : "border-white/80 bg-gradient-to-b from-white to-cream/80 text-teal shadow-black/[0.06]",
                )}
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.5} />
              </div>
              <span
                className={cn(
                  "text-[8px] font-bold uppercase leading-none tracking-wider sm:text-[9px]",
                  dark ? "text-white/45" : "text-charcoal/45",
                )}
              >
                {STAGE[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

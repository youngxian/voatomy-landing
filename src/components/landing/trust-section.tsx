"use client";

import { TEAM_LABELS, WORKFLOW_STAGES } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { Cpu } from "lucide-react";
import { SectionBackgroundDecor } from "@/components/marketing/section-background-decor";

const BRAND_LOGOS = [
  { name: "Linear", style: "font-semibold" },
  { name: "TOZO", style: "font-black tracking-wider" },
  { name: "HubSpot", style: "font-bold italic" },
  { name: "GitHub", style: "font-semibold" },
  { name: "Slack", style: "font-bold" },
  { name: "Figma", style: "font-semibold" },
  { name: "Notion", style: "font-semibold" },
  { name: "Vercel", style: "font-bold tracking-wide" },
] as const;

export function TrustSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="light-surface-typography relative overflow-hidden bg-violet-light px-4 py-16 sm:py-24 transition-colors duration-300">
      <SectionBackgroundDecor tone="violet" />
      <div
        ref={ref}
        className={cn(
          "relative z-[1] mx-auto max-w-container transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
      >
        {/* Logo strip — neutral treatment + hover reveal (common B2B SaaS pattern) */}
        <div className="mb-14 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-charcoal/40">
            Works alongside the tools you already use
          </p>
          <div
            className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12"
            aria-label="Product toolchain categories"
          >
            {BRAND_LOGOS.map((brand) => (
              <span
                key={brand.name}
                className={cn(
                  "text-base text-charcoal/30 grayscale transition-all duration-300 hover:grayscale-0 sm:text-lg",
                  brand.style,
                )}
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto mb-14 h-px max-w-2xl bg-charcoal/8" />

        {/* Impact stats row */}
        <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { stat: "80%", desc: "Reduction in planning overhead" },
            { stat: "2-4x", desc: "Higher estimation accuracy than competitors" },
            { stat: "40%", desc: "Increase in sprint delivery rate" },
          ].map((item, i) => (
            <div
              key={item.stat}
              className={cn(
                "text-center transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-5xl font-bold tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
                {item.stat}
              </div>
              <p className="mx-auto mt-3 max-w-[200px] text-xs font-medium uppercase tracking-widest text-charcoal/45">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Flow orchestrator */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-charcoal">
            One flow for every team
          </h2>
          <p className="mx-auto mt-1.5 mb-9 max-w-[520px] text-sm text-charcoal/60">
            Turn fragmented handoffs into a single wireframe of intent, execution,
            quality, and growth.
          </p>
        </div>

        <div className="relative mx-auto mb-5 h-[42px] max-w-[930px]">
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-gradient-to-r from-teal/20 via-violet/50 to-[#f16e2c]/35"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-1/2 h-0 -translate-y-1/2 border-t border-dashed border-charcoal/12"
            aria-hidden="true"
          />
          {[18, 50, 82].map((pos, i) => (
            <span
              key={pos}
              className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white shadow-sm bg-gradient-to-br from-violet/80 to-teal/70 animate-trust-dot"
              style={{ left: `${pos}%`, animationDelay: `${i * 0.35}s` }}
              aria-hidden="true"
            />
          ))}
          <span className="absolute left-1/2 top-1/2 z-[1] inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-dashed border-violet/35 bg-white px-3 py-1.5 shadow-lg shadow-violet/15 ring-1 ring-[#f16e2c]/10">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-violet/20 to-teal/15">
              <Cpu className="h-3 w-3 text-violet" />
            </span>
            <span className="text-xs font-semibold text-charcoal">
              Flow Orchestrator
            </span>
          </span>
        </div>

        <div className="mx-auto grid max-w-[930px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-7">
          {TEAM_LABELS.map((team, i) => (
            <article
              key={team.abbr}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-2xl border border-charcoal/10 bg-white p-3.5 transition-all duration-500 hover:border-violet/25 hover:shadow-md",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet/10 text-xs font-bold text-violet/90">
                {team.abbr}
              </span>
              <span className="text-[11px] font-medium text-charcoal/60">
                {team.label}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {WORKFLOW_STAGES.map((stage, i) => (
            <span
              key={stage}
              className={cn(
                "rounded-full border border-charcoal/10 bg-white px-3.5 py-1.5 text-xs font-medium text-charcoal/60 transition-all duration-500 hover:border-violet/25 hover:text-charcoal",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
              style={{ transitionDelay: `${(i + 7) * 0.06}s` }}
            >
              {stage}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

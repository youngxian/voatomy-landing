"use client";

import { PROBLEM_STATS, PROBLEM_IMPACT } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { TrendingDown, Clock, BarChart3, AlertTriangle, ArrowRight } from "lucide-react";
import { BrokenChainIllustration } from "@/components/illustrations/abstract-illustrations";
import { SectionBackgroundDecor } from "@/components/marketing/section-background-decor";

const STAT_ICONS = [TrendingDown, Clock, BarChart3] as const;

export function ProblemSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="light-surface-typography relative overflow-hidden bg-coral-light px-4 py-16 sm:py-24 transition-colors duration-300">
      <SectionBackgroundDecor tone="coral" />
      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        <div
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <BrokenChainIllustration className="mx-auto mb-2 h-20 w-full max-w-md animate-float-slow sm:h-24" />
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-coral">
            <AlertTriangle className="h-3.5 w-3.5" />
            The Problem
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1">
            Sprint planning is broken. Everyone knows it.
          </h2>
        </div>

        {/* Bento-style stat cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {PROBLEM_STATS.map((stat, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <article
                key={stat.stat}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-charcoal/10 bg-cream p-8 transition-all duration-500 hover:border-teal/20 hover:shadow-lg",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                )}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-teal/[0.04] transition-transform duration-500 group-hover:scale-150" />
                <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-coral/15 transition-colors group-hover:bg-coral/20">
                  <Icon className="h-5 w-5 text-coral" />
                  </div>
                  <div className="mt-6 text-5xl font-bold tracking-tight text-coral sm:text-6xl">
                    {stat.stat}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                    {stat.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Impact banner */}
        <div
          className={cn(
            "mt-6 flex flex-col items-center gap-4 rounded-2xl border border-coral/20 bg-coral/5 p-8 sm:flex-row sm:justify-between transition-all duration-700 delay-[0.4s]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div>
            <div className="text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
              {PROBLEM_IMPACT.stat}
            </div>
            <p className="mt-2 text-sm text-charcoal/60">
              {PROBLEM_IMPACT.description}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-dark">
            See how ATLAS fixes this
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </section>
  );
}

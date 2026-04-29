"use client";

import { ATLAS_SIGNALS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import {
  Braces,
  Users,
  BarChart3,
  AlertTriangle,
  Hexagon,
  DollarSign,
  Brain,
  CheckCircle2,
  ShieldAlert,
  ArrowDown,
} from "lucide-react";

const SIGNAL_ICONS = [Braces, Users, BarChart3, AlertTriangle, Hexagon, DollarSign] as const;

export function WorkflowsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: convRef, isVisible: convVisible } = useScrollAnimation();

  return (
    <section className="light-surface-typography bg-sky-light px-4 py-16 sm:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-container">
        <div
          ref={ref}
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-sky shadow-sm">
            How ATLAS Works
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1">
            Six signals. One intelligent sprint plan.
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] text-body-lg text-charcoal/60">
            ATLAS ingests six data sources and synthesizes them into a single,
            high-confidence sprint plan. No guessing required.
          </p>
        </div>

        {/* Bento grid: first 2 cards span wider */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {ATLAS_SIGNALS.map((signal, i) => {
            const Icon = SIGNAL_ICONS[i];
            const isWide = i < 2;
            return (
              <article
                key={signal.title}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-charcoal/10 bg-white p-6 transition-all duration-500 hover:border-sky/25 hover:shadow-lg",
                  isWide ? "lg:col-span-3" : "lg:col-span-2",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-[0.06] transition-transform duration-500 group-hover:scale-[2]" style={{ backgroundColor: signal.color }} />
                <div
                  className="grid h-11 w-11 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${signal.color}12`,
                  }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: signal.color }}
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-charcoal">
                  {signal.title}
                </h3>
                <p className="mt-1.5 text-sm text-charcoal/60">
                  {signal.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {signal.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-2.5 text-xs text-charcoal/60"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: signal.color }}
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Convergence */}
        <div
          ref={convRef}
          className={cn(
            "relative mt-12 transition-all duration-700",
            convVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8",
          )}
        >
          {/* Arrow indicator */}
          <div className="flex justify-center py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sky/20 bg-white shadow-sm">
              <ArrowDown className="h-4 w-4 text-sky" />
            </div>
          </div>

          {/* Result card */}
          <div className="relative mx-auto max-w-lg overflow-hidden rounded-2xl border border-sky/20 bg-white p-8 text-center shadow-xl shadow-sky/10 transition-colors duration-300">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(14,165,233,0.04), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="grid h-14 w-14 mx-auto place-items-center rounded-2xl bg-sky/10">
                <Brain className="h-7 w-7 text-sky" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-charcoal">
                AI Sprint Plan Generated
              </h3>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-sky-light p-3">
                  <div className="text-2xl font-bold text-sky">87%</div>
                  <div className="text-[11px] text-charcoal/50">Accuracy</div>
                </div>
                <div className="rounded-xl bg-sky-light p-3">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-sky">
                    <CheckCircle2 className="h-5 w-5" />
                    HIGH
                  </div>
                  <div className="text-[11px] text-charcoal/50">Confidence</div>
                </div>
                <div className="rounded-xl bg-sky-light p-3">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-charcoal">
                    <ShieldAlert className="h-5 w-5 text-yellow-600/70" />
                    2
                  </div>
                  <div className="text-[11px] text-charcoal/50">Risk Items</div>
                </div>
              </div>

              <div className="mx-auto mt-5 max-w-[260px]">
                <div className="h-2.5 overflow-hidden rounded-full bg-cream">
                  <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-sky to-accent-lime/60" />
                </div>
              </div>
              <p className="mt-3 text-xs text-charcoal/50">
                Sprint 24 &middot; 2 weeks &middot; 8 members &middot; 47 points
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

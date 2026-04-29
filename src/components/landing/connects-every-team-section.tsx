"use client";

import { TEAM_LABELS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, GitBranch, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionBackgroundDecor } from "@/components/marketing/section-background-decor";
import { WireflowRail } from "@/components/marketing/wireflow-rail";

export function ConnectsEveryTeamSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:py-24 transition-colors duration-300">
      <SectionBackgroundDecor tone="white" />
      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        {/* Header */}
        <div
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/15 bg-teal/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal">
            One Platform
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1">
            How Voatomy connects every team
          </h2>
          <p className="mx-auto mt-3 max-w-[600px] text-body-lg text-charcoal/60">
            Six AI products work as one intelligent system — data flows automatically from customer signal to organizational intelligence.
          </p>
        </div>

        <WireflowRail className="mt-4 max-w-2xl" label="Flow between teams" />

        {/* Bento grid — Clause style */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {/* Large top card — Dynamic dashboard style */}
          <div
            className={cn(
              "lg:col-span-3 rounded-2xl border border-charcoal/10 bg-cream p-8 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10">
                  <GitBranch className="h-6 w-6 text-teal" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-charcoal">
                  One flow for every team
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                  Turn fragmented handoffs into a single wireframe of intent, execution, quality, and growth.
                </p>
                <Button
                  variant="primary"
                  className="mt-5 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
                  asChild
                >
                  <Link href="/products/atlas">
                    Start with ATLAS
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              {/* Visual: simplified flow bars */}
              <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-charcoal">Data flow</span>
                  <span className="rounded-full bg-accent-lime/20 px-2 py-0.5 text-[10px] font-semibold text-teal">
                    Live
                  </span>
                </div>
                <div className="flex h-24 items-end justify-between gap-2">
                  {[65, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-teal/30 transition-all hover:bg-teal/50"
                      style={{ height: `${h}%`, minHeight: "24px" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom left — Smart notifications style */}
          <div
            className={cn(
              "rounded-2xl border border-charcoal/10 bg-cream p-6 transition-all duration-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10">
              <Users className="h-5 w-5 text-teal" strokeWidth={1.5} />
            </div>
            <h4 className="mt-4 font-semibold text-charcoal">Connected teams</h4>
            <p className="mt-1.5 text-sm text-charcoal/60">
              Engineering, Product, Design — all aligned on one sprint plan.
            </p>
            <div className="mt-4 space-y-2">
              {TEAM_LABELS.slice(0, 4).map((team) => (
                <div
                  key={team.abbr}
                  className="flex items-center justify-between rounded-lg border border-charcoal/8 bg-white px-3 py-2"
                >
                  <span className="text-xs font-medium text-charcoal">{team.label}</span>
                  <span className="h-2 w-2 rounded-full bg-teal/50" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom right — Task management style */}
          <div
            className={cn(
              "lg:col-span-2 rounded-2xl border border-charcoal/10 bg-cream p-6 transition-all duration-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10">
              <BarChart3 className="h-5 w-5 text-teal" strokeWidth={1.5} />
            </div>
            <h4 className="mt-4 font-semibold text-charcoal">Revenue-weighted priorities</h4>
            <p className="mt-1.5 text-sm text-charcoal/60">
              Customer signal flows into LOOP, priorities flow into ATLAS, and features ship faster.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Signal capture", "LOOP", "ATLAS", "SIGNAL", "NEXUS"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-teal/15 bg-white px-3 py-1 text-[11px] font-medium text-charcoal/70"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

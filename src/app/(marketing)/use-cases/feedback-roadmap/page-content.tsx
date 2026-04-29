"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import {
  ArrowRight,
  ArrowDown,
  BarChart3,
  Bell,
  BrainCircuit,
  CheckCircle2,
  CircleDollarSign,
  DollarSign,
  FileBarChart,
  Filter,
  Headphones,
  Infinity,
  Layers,
  LineChart,
  Mail,
  MessageSquare,
  Mic,
  Phone,
  Rocket,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

/* ================================================================
   FEEDBACK TO ROADMAP — Use-Case Landing Page
   Turns scattered customer feedback into sprint-ready,
   revenue-weighted engineering priorities.
   Product: LOOP (#6366F1 indigo)
   ================================================================ */

const INDIGO = "#6366F1";
const INDIGO_LIGHT = "rgba(99, 102, 241, 0.12)";
const INDIGO_GLOW = "rgba(99, 102, 241, 0.18)";
const RED_BADGE = "#EF4444";
const GREEN_ACCENT = "#12FF80";

/* ---------- animated entrance hook ---------- */
function useReveal() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);
  return visible;
}

/* ---------- scroll-triggered visibility ---------- */
function useInView(threshold = 0.15) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ================================================================
   1. HERO — Feedback flowing into unified roadmap
   ================================================================ */
function HeroSection() {
  const loaded = useReveal();

  const sources = [
    { label: "Sales Calls", icon: Mic, delay: 0 },
    { label: "Support", icon: Headphones, delay: 80 },
    { label: "Churn Data", icon: Bell, delay: 160 },
    { label: "NPS Surveys", icon: BarChart3, delay: 240 },
  ];

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-theme px-4 pb-24 pt-32">
      {/* Indigo radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(99,102,241,0.16), transparent)",
        }}
        aria-hidden="true"
      />
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid"
        style={{ backgroundSize: "36px 36px" }}
        aria-hidden="true"
      />

      <div className="relative z-[2] mx-auto max-w-container text-center">
        {/* Badge */}
        <div
          className={cn(
            "transition-all duration-700",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold"
            style={{
              borderColor: "rgba(99,102,241,0.3)",
              background: INDIGO_LIGHT,
              color: INDIGO,
            }}
          >
            <span
              className="h-2 w-2 rounded-full animate-glow-pulse"
              style={{ background: INDIGO }}
            />
            Use Case &middot; Feedback to Roadmap
          </span>
        </div>

        {/* Headline */}
        <h1
          className={cn(
            "mx-auto mt-8 max-w-[900px] text-4xl font-semibold leading-[1.06] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-100",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          Customer demand directly into{" "}
          <span style={{ color: INDIGO }}>sprint prioritization</span>
        </h1>

        {/* Subheadline */}
        <p
          className={cn(
            "mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-theme-m transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          Stop losing revenue-critical feedback in Slack threads, spreadsheets,
          and PDF reports. LOOP turns every customer signal into a
          dollar-weighted backlog item that ships on schedule.
        </p>

        {/* Feedback sources flowing into roadmap visual */}
        <div
          className={cn(
            "mx-auto mt-16 max-w-[700px] transition-all duration-1000 delay-300",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          {/* Source nodes */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {sources.map((src, i) => {
              const Icon = src.icon;
              return (
                <div
                  key={src.label}
                  className={cn(
                    "flex flex-col items-center gap-2 transition-all duration-600",
                    loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                  )}
                  style={{ transitionDelay: `${src.delay + 400}ms` }}
                >
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl border shadow-lg sm:h-14 sm:w-14"
                    style={{
                      borderColor: "rgba(99,102,241,0.3)",
                      background: INDIGO_LIGHT,
                      boxShadow: `0 4px 24px rgba(99,102,241,0.12)`,
                    }}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: INDIGO }} />
                  </div>
                  <span className="text-[10px] font-medium text-theme-m sm:text-xs">
                    {src.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Converging lines */}
          <div className="relative mx-auto my-4 flex h-12 items-center justify-center">
            <div
              className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
              style={{
                background: `linear-gradient(to bottom, rgba(99,102,241,0.4), ${INDIGO})`,
              }}
            />
            <ArrowDown
              className="relative z-10 h-5 w-5 animate-float"
              style={{ color: INDIGO }}
            />
          </div>

          {/* Central LOOP node */}
          <div className="flex justify-center">
            <div
              className="flex items-center gap-2 rounded-2xl border px-6 py-3 shadow-xl"
              style={{
                borderColor: "rgba(99,102,241,0.4)",
                background: `linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.05))`,
                boxShadow: `0 8px 40px rgba(99,102,241,0.2)`,
              }}
            >
              <Infinity className="h-6 w-6" style={{ color: INDIGO }} />
              <span
                className="text-lg font-bold tracking-wider"
                style={{ color: INDIGO }}
              >
                LOOP
              </span>
              <span className="text-sm text-theme-m">&mdash; Revenue-Weighted Roadmap</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={cn(
            "mx-auto mt-12 flex max-w-md flex-col items-center gap-3 sm:flex-row transition-all duration-700 delay-500",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <Button asChild size="lg" className="w-full sm:w-auto gap-2 text-white" style={{ background: INDIGO }}>
            <Link href="/products/loop">
              See How LOOP Works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
            <Link href="/pricing">
              View Pricing
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   2. THE BROKEN FUNNEL — Where feedback gets lost today
   ================================================================ */
function BrokenFunnelSection() {
  const { ref, inView } = useInView();

  const funnels = [
    {
      source: "Sales Calls",
      icon: Phone,
      middle: "Slack thread",
      end: "Forgotten",
      badge: "Lost",
      badgeColor: RED_BADGE,
    },
    {
      source: "Support Tickets",
      icon: Headphones,
      middle: "Spreadsheet",
      end: "Outdated",
      badge: "Delayed",
      badgeColor: "#F59E0B",
    },
    {
      source: "Churn Signals",
      icon: Bell,
      middle: "Quarterly review",
      end: "Too late",
      badge: "Lost",
      badgeColor: RED_BADGE,
    },
    {
      source: "NPS Surveys",
      icon: BarChart3,
      middle: "PDF report",
      end: "Never read",
      badge: "Delayed",
      badgeColor: "#F59E0B",
    },
  ];

  return (
    <Section variant="white" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={RED_BADGE} className="mb-4">
            The Problem
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            The broken <span style={{ color: RED_BADGE }}>feedback funnel</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            Every team collects customer feedback. Almost none of it reaches the
            engineering backlog with the revenue context needed to prioritize it.
          </p>
        </div>

        <div className="mx-auto grid max-w-[960px] gap-5 sm:grid-cols-2">
          {funnels.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card
                key={f.source}
                variant="light"
                className={cn(
                  "group relative overflow-hidden transition-all duration-500",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{ transitionDelay: `${i * 100 + 150}ms` }}
              >
                {/* Badge */}
                <span
                  className="absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ background: f.badgeColor }}
                >
                  {f.badge}
                </span>

                <div className="flex items-center gap-3">
                  <div
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                    style={{ background: "rgba(239,68,68,0.08)" }}
                  >
                    <Icon className="h-5 w-5" style={{ color: RED_BADGE }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-theme">{f.source}</p>
                  </div>
                </div>

                {/* Flow visualization */}
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="rounded-lg bg-theme-subtle px-3 py-1.5 text-xs font-medium text-theme-s">
                    {f.source}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-theme-f shrink-0" />
                  <span className="rounded-lg bg-theme-subtle px-3 py-1.5 text-xs font-medium text-theme-m">
                    {f.middle}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-theme-f shrink-0" />
                  <span
                    className="rounded-lg px-3 py-1.5 text-xs font-medium"
                    style={{
                      background: `${f.badgeColor}15`,
                      color: f.badgeColor,
                    }}
                  >
                    {f.end}
                  </span>
                </div>

                {/* Strike-through line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-full opacity-40"
                  style={{
                    background: `linear-gradient(to right, transparent, ${f.badgeColor}, transparent)`,
                  }}
                />
              </Card>
            );
          })}
        </div>

        {/* Impact stat */}
        <div
          className={cn(
            "mx-auto mt-10 max-w-xl text-center transition-all duration-700 delay-500",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <p className="text-lg font-semibold text-theme">
            Result:{" "}
            <span style={{ color: RED_BADGE }}>68% of feature requests</span>{" "}
            never reach a product backlog.
          </p>
          <p className="mt-1 text-sm text-theme-m">
            The rest arrive stripped of revenue context, weeks too late.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   3. THE LOOP SOLUTION — Complete pipeline
   ================================================================ */
function LoopSolutionSection() {
  const { ref, inView } = useInView();

  const steps = [
    {
      step: "01",
      label: "Capture",
      icon: Mic,
      desc: "Ingest signals from Gong, Zendesk, Salesforce, and NPS platforms automatically.",
      tools: ["Gong", "Zendesk", "Salesforce", "NPS"],
      color: INDIGO,
    },
    {
      step: "02",
      label: "Process",
      icon: BrainCircuit,
      desc: "AI aggregates, deduplicates, and weights every request by account revenue and expansion potential.",
      tools: ["Dedup", "Revenue-weight", "Cluster"],
      color: INDIGO,
    },
    {
      step: "03",
      label: "Prioritize",
      icon: Target,
      desc: "Revenue-weighted backlog with dollar values attached to every feature request.",
      tools: ["$-Scoring", "Segments", "Trends"],
      color: INDIGO,
    },
    {
      step: "04",
      label: "Ship",
      icon: Rocket,
      desc: "Features land in the sprint backlog with full context. Engineering builds what moves the needle.",
      tools: ["Sprint Plan", "Context", "Ship"],
      color: GREEN_ACCENT,
    },
    {
      step: "05",
      label: "Close Loop",
      icon: Send,
      desc: "Auto-notify every requesting account when their feature ships. Sales gets deal-ready ammo.",
      tools: ["Auto-notify", "Sales Brief", "CS Alert"],
      color: GREEN_ACCENT,
    },
  ];

  return (
    <Section variant="violet" className="py-20 sm:py-28 overflow-hidden">
      <div ref={ref}>
        <div className="text-center mb-16">
          <Chip dotColor={INDIGO} className="mb-4">
            The LOOP Solution
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            From scattered signals to{" "}
            <span style={{ color: INDIGO }}>shipped features</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            Five stages. One continuous loop. Every signal captured, processed,
            prioritized, shipped, and closed back to the customer.
          </p>
        </div>

        {/* Pipeline steps */}
        <div className="relative mx-auto max-w-[960px]">
          {/* Vertical connector line */}
          <div
            className="absolute left-6 top-0 hidden h-full w-px sm:left-8 md:block"
            style={{
              background: `linear-gradient(to bottom, transparent, ${INDIGO}, ${GREEN_ACCENT}, transparent)`,
            }}
          />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.label}
                  className={cn(
                    "relative flex gap-5 transition-all duration-600 md:gap-8",
                    inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6",
                  )}
                  style={{ transitionDelay: `${i * 120 + 200}ms` }}
                >
                  {/* Step number node */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border text-sm font-bold sm:h-16 sm:w-16"
                      style={{
                        borderColor: `${step.color}40`,
                        background: `${step.color}15`,
                        color: step.color,
                        boxShadow: `0 4px 24px ${step.color}20`,
                      }}
                    >
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className="flex-1 rounded-2xl border border-theme bg-theme-subtle p-5 sm:p-6"
                    style={{
                      boxShadow: `0 0 0 1px ${step.color}08`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: step.color }}
                      >
                        Step {step.step}
                      </span>
                      <span className="text-base font-semibold text-theme sm:text-lg">
                        {step.label}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-theme-m">
                      {step.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {step.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                          style={{
                            background: `${step.color}12`,
                            color: step.color,
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   4. SIGNAL DASHBOARD MOCK
   ================================================================ */
function SignalDashboardSection() {
  const { ref, inView } = useInView();

  const topFeatures = [
    { rank: 1, name: "SSO Authentication", accounts: 47, pipeline: "$2.3M", trend: "+12%" },
    { rank: 2, name: "Advanced API v2", accounts: 38, pipeline: "$1.8M", trend: "+8%" },
    { rank: 3, name: "Custom Webhooks", accounts: 34, pipeline: "$1.5M", trend: "+15%" },
    { rank: 4, name: "Role-Based Access", accounts: 31, pipeline: "$1.2M", trend: "+6%" },
    { rank: 5, name: "Bulk Data Export", accounts: 28, pipeline: "$980K", trend: "+22%" },
    { rank: 6, name: "White-Label Portal", accounts: 24, pipeline: "$870K", trend: "+4%" },
    { rank: 7, name: "Audit Log API", accounts: 21, pipeline: "$720K", trend: "+9%" },
    { rank: 8, name: "Multi-Currency", accounts: 19, pipeline: "$640K", trend: "+18%" },
    { rank: 9, name: "Custom Dashboards", accounts: 17, pipeline: "$510K", trend: "+11%" },
    { rank: 10, name: "Sandbox Mode", accounts: 14, pipeline: "$380K", trend: "+7%" },
  ];

  const sources = [
    { label: "Sales", pct: 42, color: INDIGO },
    { label: "Support", pct: 31, color: "#8B5CF6" },
    { label: "Churn", pct: 18, color: "#F59E0B" },
    { label: "NPS", pct: 9, color: GREEN_ACCENT },
  ];

  const trendData = [28, 35, 32, 41, 38, 52, 48, 61, 57, 72, 68, 85];

  return (
    <Section variant="amber" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={INDIGO} className="mb-4">
            Signal Intelligence
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Your feedback, <span style={{ color: INDIGO }}>quantified</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            Every request tagged with dollar value, account context, and demand
            trend. No more guessing what to build next.
          </p>
        </div>

        {/* Dashboard mock */}
        <div
          className={cn(
            "mx-auto max-w-[1080px] rounded-2xl border border-theme bg-theme-card shadow-2xl transition-all duration-1000",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
          style={{ boxShadow: `0 24px 80px rgba(99,102,241,0.06)` }}
        >
          {/* Window bar */}
          <div className="flex items-center gap-2 border-b border-theme px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="ml-4 flex items-center gap-1.5 text-xs text-theme-f">
              <Infinity className="h-3 w-3" style={{ color: INDIGO }} />
              LOOP &mdash; Signal Dashboard
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-[1fr_340px]">
            {/* Left: Top features table */}
            <div className="rounded-xl border border-theme bg-theme-subtle p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-theme-s">
                  Top 10 Requested Features by Pipeline Value
                </p>
                <div className="flex items-center gap-1 text-[10px] text-theme-f">
                  <Filter className="h-3 w-3" />
                  All segments
                </div>
              </div>
              <div className="space-y-1">
                {topFeatures.map((f) => (
                  <div
                    key={f.rank}
                    className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-xs transition-colors hover:bg-theme-subtle"
                  >
                    <span
                      className="grid h-5 w-5 shrink-0 place-items-center rounded text-[10px] font-bold"
                      style={{
                        background: f.rank <= 3 ? INDIGO_LIGHT : "transparent",
                        color: f.rank <= 3 ? INDIGO : "var(--text-muted)",
                      }}
                    >
                      {f.rank}
                    </span>
                    <span className="flex-1 font-medium text-theme-s truncate">
                      {f.name}
                    </span>
                    <span className="text-theme-m">{f.accounts} accts</span>
                    <span className="font-semibold" style={{ color: INDIGO }}>
                      {f.pipeline}
                    </span>
                    <span className="text-brand text-[10px]">{f.trend}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Source breakdown + trend */}
            <div className="flex flex-col gap-4">
              {/* Source breakdown */}
              <div className="rounded-xl border border-theme bg-theme-subtle p-4">
                <p className="mb-3 text-xs font-semibold text-theme-s">
                  Signal Sources
                </p>
                <div className="space-y-3">
                  {sources.map((s) => (
                    <div key={s.label}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-theme-s">{s.label}</span>
                        <span className="font-semibold" style={{ color: s.color }}>
                          {s.pct}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-theme-subtle overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: inView ? `${s.pct}%` : "0%",
                            background: s.color,
                            opacity: 0.7,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demand trend chart */}
              <div className="flex-1 rounded-xl border border-theme bg-theme-subtle p-4">
                <p className="mb-3 text-xs font-semibold text-theme-s">
                  Feature Demand Trend (12mo)
                </p>
                <div className="flex items-end gap-1 h-24">
                  {trendData.map((v, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t transition-all duration-700"
                      style={{
                        height: inView ? `${v}%` : "0%",
                        background: `linear-gradient(to top, ${INDIGO}40, ${INDIGO}90)`,
                        transitionDelay: `${i * 60}ms`,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[9px] text-theme-f">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
                </div>
              </div>

              {/* Account tracking mini */}
              <div className="rounded-xl border border-theme bg-theme-subtle p-4">
                <p className="mb-2 text-xs font-semibold text-theme-s">
                  Account-Level Tracking
                </p>
                <div className="space-y-1.5">
                  {[
                    { name: "Acme Corp", feature: "SSO", status: "Requested", statusColor: INDIGO },
                    { name: "TechFlow Inc", feature: "API v2", status: "In Sprint", statusColor: "#F59E0B" },
                    { name: "DataScale", feature: "Webhooks", status: "Shipped", statusColor: GREEN_ACCENT },
                  ].map((a) => (
                    <div key={a.name} className="flex items-center justify-between text-[11px]">
                      <span className="text-theme-s font-medium">{a.name}</span>
                      <span className="text-theme-m">{a.feature}</span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
                        style={{
                          background: `${a.statusColor}15`,
                          color: a.statusColor,
                        }}
                      >
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   5. THE REVENUE CONNECTION — Feature journey story
   ================================================================ */
function RevenueConnectionSection() {
  const { ref, inView } = useInView();

  const timeline = [
    {
      icon: MessageSquare,
      label: "Signal Detected",
      detail: "47 accounts request SSO Authentication across sales calls, support tickets, and NPS surveys.",
      metric: "$2.3M pipeline attached",
      metricColor: INDIGO,
    },
    {
      icon: Target,
      label: "Prioritized by Revenue",
      detail: "LOOP scores SSO as the #1 revenue-weighted feature. Added to Sprint 26 backlog automatically.",
      metric: "Sprint 26 priority #1",
      metricColor: INDIGO,
    },
    {
      icon: Rocket,
      label: "Shipped in Sprint 28",
      detail: "Engineering delivers SSO with full context from original customer requests.",
      metric: "2 sprints to ship",
      metricColor: GREEN_ACCENT,
    },
    {
      icon: Send,
      label: "Loop Closed",
      detail: "All 47 requesting accounts auto-notified. Sales gets deal-specific talking points.",
      metric: "12 deals accelerated",
      metricColor: GREEN_ACCENT,
    },
    {
      icon: DollarSign,
      label: "Revenue Realized",
      detail: "Ship-aligned selling and renewal conversations directly influenced by the delivered feature.",
      metric: "$1.4M influenced revenue",
      metricColor: GREEN_ACCENT,
    },
  ];

  return (
    <Section variant="violet" className="py-20 sm:py-28 overflow-hidden">
      <div ref={ref}>
        <div className="text-center mb-16">
          <Chip dotColor={GREEN_ACCENT} className="mb-4">
            Revenue Impact
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            One feature. <span style={{ color: GREEN_ACCENT }}>$1.4M influenced.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            See how a single feature request traveled from scattered customer
            signals to shipped product to closed revenue.
          </p>
        </div>

        {/* Feature journey card */}
        <div className="mx-auto max-w-[800px]">
          {/* Hero stat card */}
          <div
            className={cn(
              "mb-8 rounded-2xl border p-6 text-center transition-all duration-700",
              inView ? "opacity-100 scale-100" : "opacity-0 scale-95",
            )}
            style={{
              borderColor: "rgba(99,102,241,0.3)",
              background: `linear-gradient(135deg, rgba(99,102,241,0.1), rgba(99,102,241,0.03))`,
            }}
          >
            <p className="text-sm font-medium text-theme-m">Feature: SSO Authentication</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-6">
              <div>
                <p className="text-3xl font-bold" style={{ color: INDIGO }}>47</p>
                <p className="text-xs text-theme-m">Accounts</p>
              </div>
              <div className="h-8 w-px bg-theme-subtle" />
              <div>
                <p className="text-3xl font-bold" style={{ color: INDIGO }}>$2.3M</p>
                <p className="text-xs text-theme-m">Pipeline Value</p>
              </div>
              <div className="h-8 w-px bg-theme-subtle" />
              <div>
                <p className="text-3xl font-bold text-brand">$1.4M</p>
                <p className="text-xs text-theme-m">Revenue Influenced</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div
              className="absolute left-6 top-0 hidden h-full w-px sm:block"
              style={{
                background: `linear-gradient(to bottom, ${INDIGO}, ${GREEN_ACCENT})`,
              }}
            />

            <div className="space-y-5">
              {timeline.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.label}
                    className={cn(
                      "relative flex gap-5 transition-all duration-600",
                      inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6",
                    )}
                    style={{ transitionDelay: `${i * 120 + 300}ms` }}
                  >
                    <div
                      className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-xl border"
                      style={{
                        borderColor: `${step.metricColor}40`,
                        background: `${step.metricColor}12`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: step.metricColor }} />
                    </div>
                    <div className="flex-1 rounded-xl border border-theme bg-theme-subtle p-4">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-theme">{step.label}</span>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                          style={{
                            background: `${step.metricColor}15`,
                            color: step.metricColor,
                          }}
                        >
                          {step.metric}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-theme-m">{step.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   6. BEFORE VS AFTER
   ================================================================ */
function BeforeAfterSection() {
  const { ref, inView } = useInView();

  const beforeItems = [
    { icon: MessageSquare, text: "Feedback scattered across Slack, email, and spreadsheets" },
    { icon: Target, text: "Gut-feel prioritization based on loudest voices" },
    { icon: DollarSign, text: "No revenue context attached to feature requests" },
    { icon: Mail, text: "Manual follow-up when features ship (if at all)" },
    { icon: Users, text: "Product and sales teams constantly misaligned" },
    { icon: LineChart, text: "No visibility into demand trends or pipeline impact" },
  ];

  const afterItems = [
    { icon: Layers, text: "Unified signal hub from every customer touchpoint" },
    { icon: CircleDollarSign, text: "Revenue-weighted backlog with dollar values" },
    { icon: FileBarChart, text: "Every request tagged with ARR, segment, and expansion potential" },
    { icon: Send, text: "Auto-close loop: accounts notified the moment features ship" },
    { icon: Sparkles, text: "Sales, CS, and Product aligned on a single source of truth" },
    { icon: TrendingUp, text: "Real-time demand trends driving sprint decisions" },
  ];

  return (
    <Section variant="white" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={INDIGO} className="mb-4">
            The Transformation
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            From feedback chaos to{" "}
            <span style={{ color: INDIGO }}>revenue clarity</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-[1000px] gap-6 lg:grid-cols-2">
          {/* BEFORE */}
          <div
            className={cn(
              "rounded-2xl border p-6 transition-all duration-700",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
            )}
            style={{
              borderColor: "rgba(239,68,68,0.2)",
              background: "var(--bg-card)",
            }}
          >
            <div className="mb-5 flex items-center gap-2">
              <div
                className="grid h-8 w-8 place-items-center rounded-lg"
                style={{ background: "rgba(239,68,68,0.1)" }}
              >
                <X className="h-4 w-4" style={{ color: RED_BADGE }} />
              </div>
              <span
                className="text-sm font-bold uppercase tracking-widest"
                style={{ color: RED_BADGE }}
              >
                Before LOOP
              </span>
            </div>
            <div className="space-y-3">
              {beforeItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl bg-theme-subtle p-3"
                  >
                    <div
                      className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg"
                      style={{ background: "rgba(239,68,68,0.08)" }}
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: RED_BADGE }} />
                    </div>
                    <p className="text-sm text-theme-m leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AFTER */}
          <div
            className={cn(
              "rounded-2xl border p-6 transition-all duration-700 delay-200",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            )}
            style={{
              borderColor: "rgba(99,102,241,0.25)",
              background: "var(--bg-card)",
              boxShadow: `0 8px 40px rgba(99,102,241,0.06)`,
            }}
          >
            <div className="mb-5 flex items-center gap-2">
              <div
                className="grid h-8 w-8 place-items-center rounded-lg"
                style={{ background: INDIGO_LIGHT }}
              >
                <CheckCircle2 className="h-4 w-4" style={{ color: INDIGO }} />
              </div>
              <span
                className="text-sm font-bold uppercase tracking-widest"
                style={{ color: INDIGO }}
              >
                After LOOP
              </span>
            </div>
            <div className="space-y-3">
              {afterItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl bg-theme-subtle p-3"
                  >
                    <div
                      className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg"
                      style={{ background: INDIGO_LIGHT }}
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: INDIGO }} />
                    </div>
                    <p className="text-sm text-theme-s leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   7. CTA — Start connecting feedback to revenue
   ================================================================ */
function CtaSection() {
  const { ref, inView } = useInView();

  return (
    <Section variant="amber" className="py-24 sm:py-32">
      <div ref={ref} className="text-center">
        <div className="relative mx-auto max-w-[680px]">
          {/* Indigo glow */}
          <div
            className="pointer-events-none absolute -inset-20 rounded-full opacity-25 blur-3xl"
            style={{ background: INDIGO }}
            aria-hidden="true"
          />

          <div className="relative">
            <div
              className={cn(
                "transition-all duration-700",
                inView ? "opacity-100 scale-100" : "opacity-0 scale-90",
              )}
            >
              <div
                className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border"
                style={{
                  borderColor: "rgba(99,102,241,0.3)",
                  background: INDIGO_LIGHT,
                }}
              >
                <Infinity className="h-8 w-8" style={{ color: INDIGO }} />
              </div>
            </div>

            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700 delay-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              Start connecting feedback to{" "}
              <span style={{ color: INDIGO }}>revenue</span>
            </h2>

            <p
              className={cn(
                "mx-auto mt-4 max-w-md text-theme-m transition-all duration-700 delay-200",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              Stop building features that don&apos;t move the needle. Let customer
              demand, weighted by real revenue, drive every sprint decision.
            </p>

            {/* CTA buttons */}
            <div
              className={cn(
                "mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center transition-all duration-700 delay-300",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto gap-2 text-white"
                style={{ background: INDIGO }}
              >
                <Link href="/products/loop">
                  Explore LOOP
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>

            {/* Supporting stats */}
            <div
              className={cn(
                "mt-10 grid grid-cols-3 gap-6 mx-auto max-w-md transition-all duration-700 delay-400",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              {[
                { value: "68%", label: "Less feedback lost" },
                { value: "3.2x", label: "Faster prioritization" },
                { value: "$1.4M", label: "Avg revenue influenced" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold" style={{ color: INDIGO }}>
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] text-theme-m">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom links */}
        <div
          className={cn(
            "mt-14 flex flex-wrap items-center justify-center gap-6 text-sm transition-all duration-700 delay-500",
            inView ? "opacity-100" : "opacity-0",
          )}
        >
          <Link
            href="/products/atlas"
            className="flex items-center gap-1.5 text-theme-s transition-colors hover:text-theme"
          >
            <Zap className="h-4 w-4 text-brand" />
            Explore ATLAS (AI Sprint Planner)
            <ArrowRight className="h-3 w-3" />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-theme-s transition-colors hover:text-theme"
          >
            <Sparkles className="h-4 w-4" style={{ color: INDIGO }} />
            Back to Voatomy Platform
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   PAGE COMPOSITION
   ================================================================ */
export default function FeedbackToRoadmapPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <BrokenFunnelSection />
      <LoopSolutionSection />
      <SignalDashboardSection />
      <RevenueConnectionSection />
      <BeforeAfterSection />
      <CtaSection />
    </main>
  );
}

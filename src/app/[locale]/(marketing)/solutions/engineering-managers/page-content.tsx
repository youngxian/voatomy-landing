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
  Clock,
  Brain,
  Bug,
  GitBranch,
  Sparkles,
  Shield,
  AlertTriangle,
  TrendingUp,
  Timer,
  BarChart3,
  CheckCircle2,
  Zap,
  Target,
  Activity,
  ChevronRight,
  Quote,
  Users,
  Calendar,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Engineering Managers Solution Page
   ──────────────────────────────────────────────────────────── */

const PAIN_POINTS = [
  {
    icon: Clock,
    title: "Sprint planning takes 2+ hours",
    stat: "2.1 hrs",
    statLabel: "avg. planning meeting",
    description:
      "Your team loses an entire morning debating scope, re-estimating stories, and context-switching between Jira, Slack, and spreadsheets.",
    accentColor: "#EF4444",
  },
  {
    icon: Brain,
    title: "Estimates based on gut feel",
    stat: "47%",
    statLabel: "of sprints miss target",
    description:
      "Without code-aware sizing, estimates are guesses. Overcommits erode trust with product, and padding wastes capacity.",
    accentColor: "#F59E0B",
  },
  {
    icon: Bug,
    title: "Tech debt invisible until it blocks",
    stat: "3.2 days",
    statLabel: "avg. unplanned debt work per sprint",
    description:
      "Debt hides in legacy modules until a critical feature is blocked. By then, the sprint is already at risk.",
    accentColor: "#EF4444",
  },
  {
    icon: GitBranch,
    title: "No cross-team dependency visibility",
    stat: "68%",
    statLabel: "of delays from external deps",
    description:
      "You discover blocking dependencies mid-sprint. Other teams have their own priorities, and your timeline slips.",
    accentColor: "#F59E0B",
  },
];

const PRODUCT_STACK = [
  {
    name: "ATLAS",
    color: "#f16e2c",
    role: "Primary",
    tagline: "AI Sprint Planner",
    features: [
      "Code-aware sprint generation",
      "AI confidence scoring",
      "Historical velocity learning",
      "Capacity-adjusted plans",
    ],
    description:
      "ATLAS analyzes your codebase, team velocity, and business priorities to generate sprint plans with confidence-scored estimates in minutes, not hours.",
  },
  {
    name: "PHANTOM",
    color: "#22D3EE",
    role: "Essential",
    tagline: "Tech Debt Intelligence",
    features: [
      "Debt hotspot detection",
      "Remediation planning",
      "Impact-on-velocity scoring",
      "Quarterly debt trending",
    ],
    description:
      "PHANTOM maps technical debt across your codebase and surfaces the debt that is actually slowing you down, so you can plan remediation with confidence.",
  },
  {
    name: "SIGNAL",
    color: "#EF4444",
    role: "Supporting",
    tagline: "Revenue-Aware Incidents",
    features: [
      "Sprint impact assessment",
      "Auto-context routing",
      "Severity-to-velocity mapping",
      "Post-incident sprint rebalance",
    ],
    description:
      "SIGNAL connects incident response to sprint execution. When a P2 fires, SIGNAL routes context and automatically adjusts sprint capacity.",
  },
];

const TIMELINE_EVENTS = [
  {
    time: "9:00 AM",
    title: "ATLAS generates your sprint plan",
    description:
      "AI analyzes 3 repos, 14 open PRs, and team capacity. Produces a prioritized sprint with confidence scores.",
    highlight: "2 min vs 2 hours",
    product: "ATLAS",
    productColor: "#f16e2c",
    icon: Sparkles,
  },
  {
    time: "10:00 AM",
    title: "Review AI confidence scores with team",
    description:
      "Walk through flagged stories where AI confidence is below 75%. Team aligns on scope adjustments in a 15-min standup.",
    highlight: "15 min focused review",
    product: "ATLAS",
    productColor: "#f16e2c",
    icon: Users,
  },
  {
    time: "11:30 AM",
    title: "PHANTOM flags debt hotspot in auth module",
    description:
      "Proactive alert: auth token refresh logic has a 4.2x complexity score. Remediation plan auto-generated with 3-point estimate.",
    highlight: "Caught before it blocked",
    product: "PHANTOM",
    productColor: "#22D3EE",
    icon: Shield,
  },
  {
    time: "2:00 PM",
    title: "SIGNAL routes P2 incident context",
    description:
      "Payment service latency spike detected. SIGNAL attaches relevant code owners, recent deploys, and auto-adjusts sprint buffer.",
    highlight: "Auto-context, zero scramble",
    product: "SIGNAL",
    productColor: "#EF4444",
    icon: AlertTriangle,
  },
  {
    time: "4:00 PM",
    title: "Sprint accuracy dashboard shows 87%",
    description:
      "End-of-day check: team is tracking to plan. Velocity stable, no scope surprises. You leave on time.",
    highlight: "Predictability, not firefighting",
    product: "ATLAS",
    productColor: "#f16e2c",
    icon: BarChart3,
  },
];

const METRICS = [
  {
    label: "Sprint Accuracy",
    values: ["82%", "85%", "87%"],
    current: "87%",
    trend: "+5%",
    trendDirection: "up" as const,
    icon: Target,
    description: "Trending up over 3 sprints",
    barWidth: "87%",
    color: "#0d9488",
  },
  {
    label: "Team Velocity",
    values: ["38", "41", "42"],
    current: "42 pts",
    trend: "Stable",
    trendDirection: "stable" as const,
    icon: Activity,
    description: "Consistent output, no burnout",
    barWidth: "84%",
    color: "#0d9488",
  },
  {
    label: "Tech Debt Index",
    values: ["24%", "18%", "12%"],
    current: "-12%",
    trend: "-12% this quarter",
    trendDirection: "down" as const,
    icon: Bug,
    description: "Decreasing quarter over quarter",
    barWidth: "35%",
    color: "#22D3EE",
  },
  {
    label: "Planning Time",
    values: ["2.1 hrs", "45 min", "18 min"],
    current: "18 min",
    trend: "-86%",
    trendDirection: "down" as const,
    icon: Timer,
    description: "Was 2.1 hours, now 18 minutes",
    barWidth: "15%",
    color: "#f16e2c",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "ATLAS turned our Monday planning from a 2-hour argument into a 15-minute alignment session. The AI confidence scores changed how my team thinks about estimation.",
    name: "Sarah Chen",
    role: "Engineering Manager",
    company: "Lattice",
    initials: "SC",
  },
  {
    quote:
      "For the first time, I can show leadership exactly why a sprint slipped and it is not because the team was slow. PHANTOM surfaced the debt that was dragging us down.",
    name: "Marcus Johnson",
    role: "Senior Engineering Manager",
    company: "Datadog",
    initials: "MJ",
  },
  {
    quote:
      "We went from 62% sprint accuracy to 89% in two quarters. The biggest win was predictability. My PM finally trusts our estimates because the data backs them up.",
    name: "Priya Patel",
    role: "Engineering Manager, Platform",
    company: "Figma",
    initials: "PP",
  },
];

/* ─── Component ─── */

export default function EngineeringManagersPage() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="em-solution">
      {/* ═══════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] overflow-hidden bg-theme px-4 pb-20 pt-28 transition-colors duration-300">
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 bg-dot-grid"
          style={{ backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />

        {/* Green glow background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(18,255,128,0.10), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto max-w-container">
          {/* Eyebrow */}
          <div
            className={cn(
              "text-center transition-all duration-700 delay-[0s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Chip dotColor="#0d9488" className="border border-brand/20 bg-brand/[0.08] text-brand font-semibold">
              For Engineering Managers
            </Chip>
          </div>

          {/* Headline */}
          <h1
            className={cn(
              "mx-auto mt-8 max-w-[860px] text-center text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-[0.1s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            Sprint plans in minutes.{" "}
            <span className="text-brand">Estimates you can trust.</span>
          </h1>

          {/* Sub-headline */}
          <p
            className={cn(
              "mx-auto mt-6 max-w-[640px] text-center text-lg leading-relaxed text-theme-m transition-all duration-700 delay-[0.2s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            AI-driven sprint plans, accurate estimates, and tech debt visibility.
            Stop guessing. Start shipping with confidence.
          </p>

          {/* CTA Buttons */}
          <div
            className={cn(
              "mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row transition-all duration-700 delay-[0.3s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href="/products/atlas">
                Try ATLAS Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/pricing">See Pricing</Link>
            </Button>
          </div>

          {/* Before / After Comparison */}
          <div
            className={cn(
              "mx-auto mt-16 grid max-w-[960px] gap-6 md:grid-cols-2 transition-all duration-1000 delay-[0.5s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {/* BEFORE — Painful sprint planning */}
            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-red-400">
                <Clock className="h-4 w-4" />
                Before Voatomy
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { text: "2-hour sprint planning meeting", icon: "x" },
                  { text: "Estimates based on gut feel", icon: "x" },
                  { text: "Tech debt surprises mid-sprint", icon: "x" },
                  { text: "62% sprint accuracy", icon: "x" },
                  { text: "Constant scope negotiation", icon: "x" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5 text-sm text-theme-m">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 text-xs">
                      x
                    </span>
                    {item.text}
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-red-500/10 bg-red-500/[0.04] px-4 py-3">
                <div className="text-xs text-red-400/60 uppercase tracking-wider font-medium">
                  Monday 9 AM
                </div>
                <div className="mt-1 text-sm text-theme-m">
                  &quot;Alright team, let&apos;s go through the backlog one by one...&quot;
                </div>
                <div className="mt-1 text-xs text-red-400/40">
                  11:14 AM &mdash; Still estimating story #7 of 24
                </div>
              </div>
            </div>

            {/* AFTER — Serene ATLAS dashboard */}
            <div className="rounded-2xl border border-brand/20 bg-brand/[0.04] p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand">
                <Sparkles className="h-4 w-4" />
                With Voatomy
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "Sprint plan generated in 2 minutes",
                  "AI confidence scores per story",
                  "Debt hotspots surfaced proactively",
                  "87% sprint accuracy",
                  "Data-driven scope decisions",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm text-theme-s">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
                    {text}
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-brand/10 bg-brand/[0.04] px-4 py-3">
                <div className="flex items-center gap-1.5 text-xs text-brand/60 uppercase tracking-wider font-medium">
                  <Sparkles className="h-3 w-3" />
                  ATLAS Dashboard
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-theme-m">Sprint 24 Confidence</span>
                  <span className="font-semibold text-brand">87%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-brand/10">
                  <div className="h-2 rounded-full bg-brand/60" style={{ width: "87%" }} />
                </div>
                <div className="mt-2 text-xs text-brand/40">
                  Plan ready &mdash; 9:02 AM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — PAIN POINTS
          ═══════════════════════════════════════════════ */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand/70">
            The Problem
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Sound familiar?
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Engineering Managers carry the weight of delivery. These are the
            friction points that slow every sprint.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PAIN_POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <Card
                key={point.title}
                variant="light"
                className={cn(
                  "group relative overflow-hidden transition-all duration-500 hover:border-theme-h",
                  "animate-fade-in-up"
                )}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Warning accent line */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{ background: point.accentColor }}
                />

                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${point.accentColor}15` }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: point.accentColor }}
                  />
                </div>

                <div
                  className="text-2xl font-bold"
                  style={{ color: point.accentColor }}
                >
                  {point.stat}
                </div>
                <div className="text-xs text-theme-m mt-0.5">{point.statLabel}</div>

                <h3 className="mt-3 text-heading-3 text-theme">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-theme-m">
                  {point.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — YOUR VOATOMY STACK
          ═══════════════════════════════════════════════ */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand/70">
            Your Toolkit
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Your Voatomy Stack
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Three products that work together to give you sprint confidence,
            debt visibility, and incident clarity.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PRODUCT_STACK.map((product, i) => (
            <div
              key={product.name}
              className={cn(
                "group relative rounded-2xl border border-theme bg-theme-card p-8 transition-all duration-500 hover:border-theme-h",
                "animate-fade-in-up"
              )}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Product color accent */}
              <div
                className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl"
                style={{ background: product.color }}
              />

              {/* Role badge */}
              <Chip
                dotColor={product.color}
                className="mb-4 text-xs"
              >
                {product.role}
              </Chip>

              <h3 className="text-heading-2 font-bold" style={{ color: product.color }}>
                {product.name}
              </h3>
              <p className="text-sm text-theme-m mt-0.5">{product.tagline}</p>

              <p className="mt-4 text-body-base leading-relaxed text-theme-s">
                {product.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-theme-s">
                    <CheckCircle2
                      className="h-4 w-4 shrink-0"
                      style={{ color: product.color }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-theme">
                <Link
                  href={`/products/${product.name.toLowerCase()}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: product.color }}
                >
                  Learn more about {product.name}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Visual connection line */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#f16e2c]/40" />
          <div className="h-2 w-2 rounded-full" style={{ background: "#f16e2c" }} />
          <div className="h-[1px] w-10 bg-gradient-to-r from-[#f16e2c]/40 to-[#22D3EE]/40" />
          <div className="h-2 w-2 rounded-full" style={{ background: "#22D3EE" }} />
          <div className="h-[1px] w-10 bg-gradient-to-r from-[#22D3EE]/40 to-[#EF4444]/40" />
          <div className="h-2 w-2 rounded-full" style={{ background: "#EF4444" }} />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#EF4444]/40" />
        </div>
        <p className="mt-3 text-center text-xs text-theme-f">
          Integrated intelligence across planning, debt, and incidents
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — DAY IN THE LIFE
          ═══════════════════════════════════════════════ */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand/70">
            A Day With Voatomy
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Your day, reimagined
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            From reactive firefighting to proactive leadership. Here is what
            Monday looks like with Voatomy.
          </p>
        </div>

        <div className="relative mt-14 max-w-[720px] mx-auto">
          {/* Vertical timeline line */}
          <div
            className="absolute left-[23px] top-2 bottom-2 w-[2px] sm:left-[27px]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(18,255,128,0.3), rgba(18,255,128,0.08))",
            }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {TIMELINE_EVENTS.map((event, i) => {
              const Icon = event.icon;
              return (
                <div
                  key={event.time}
                  className={cn(
                    "relative flex gap-5 sm:gap-6 animate-fade-in-up"
                  )}
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  {/* Timeline node */}
                  <div className="relative z-[1] flex shrink-0 flex-col items-center">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl border sm:h-14 sm:w-14"
                      style={{
                        borderColor: `${event.productColor}30`,
                        background: `${event.productColor}10`,
                      }}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: event.productColor }} />
                    </div>
                  </div>

                  {/* Event content */}
                  <div className="flex-1 rounded-2xl border border-theme bg-theme-card p-5 transition-all duration-300 hover:border-theme-h">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-theme">{event.time}</span>
                      <Chip dotColor={event.productColor} className="text-xs">
                        {event.product}
                      </Chip>
                    </div>

                    <h3 className="mt-2 text-heading-3 text-theme">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-theme-m">
                      {event.description}
                    </p>

                    {/* Highlight badge */}
                    <div
                      className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold"
                      style={{
                        background: `${event.productColor}12`,
                        color: event.productColor,
                      }}
                    >
                      <Zap className="h-3 w-3" />
                      {event.highlight}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — KEY METRICS DASHBOARD MOCK
          ═══════════════════════════════════════════════ */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand/70">
            Metrics That Matter
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Your EM dashboard
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Real-time visibility into the metrics that define sprint health and
            team performance.
          </p>
        </div>

        {/* Dashboard mock */}
        <div className="mx-auto mt-14 max-w-[900px]">
          <div className="rounded-2xl border border-theme bg-theme-card shadow-2xl shadow-brand/[0.03] overflow-hidden">
            {/* Window bar */}
            <div className="flex items-center gap-2 border-b border-theme bg-theme-subtle px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="ml-4 flex items-center gap-1.5 text-xs text-theme-f">
                <BarChart3 className="h-3 w-3 text-brand/60" />
                EM Performance Dashboard &mdash; Sprint 24
              </span>
            </div>

            <div className="p-6">
              {/* Metric cards grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {METRICS.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-theme bg-theme-subtle p-4 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="h-4 w-4 text-theme-m" />
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            metric.trendDirection === "up" && "text-brand",
                            metric.trendDirection === "stable" && "text-brand",
                            metric.trendDirection === "down" && metric.label === "Tech Debt Index" && "text-[#22D3EE]",
                            metric.trendDirection === "down" && metric.label === "Planning Time" && "text-[#f16e2c]"
                          )}
                        >
                          {metric.trend}
                        </span>
                      </div>
                      <div className="mt-2 text-2xl font-bold text-theme">
                        {metric.current}
                      </div>
                      <div className="text-xs text-theme-m mt-0.5">
                        {metric.label}
                      </div>

                      {/* Mini bar */}
                      <div className="mt-3 h-1.5 rounded-full bg-theme-subtle">
                        <div
                          className="h-1.5 rounded-full transition-all duration-1000"
                          style={{
                            width: metric.barWidth,
                            background: metric.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sprint accuracy trend chart mockup */}
              <div className="mt-6 rounded-xl border border-theme bg-theme-subtle p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-theme">Sprint Accuracy Trend</h4>
                    <p className="text-xs text-theme-m mt-0.5">Last 6 sprints</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-brand">
                    <TrendingUp className="h-4 w-4" />
                    +5pp
                  </div>
                </div>

                {/* Chart bars */}
                <div className="flex items-end gap-3 h-32">
                  {[
                    { label: "S19", value: 68, color: "bg-theme-m" },
                    { label: "S20", value: 72, color: "bg-theme-m" },
                    { label: "S21", value: 78, color: "bg-brand/40" },
                    { label: "S22", value: 82, color: "bg-brand/50" },
                    { label: "S23", value: 85, color: "bg-brand/60" },
                    { label: "S24", value: 87, color: "bg-brand" },
                  ].map((bar) => (
                    <div key={bar.label} className="flex flex-1 flex-col items-center gap-1.5">
                      <span className="text-[10px] font-medium text-theme-m">
                        {bar.value}%
                      </span>
                      <div
                        className={cn("w-full rounded-t-md transition-all duration-700", bar.color)}
                        style={{ height: `${(bar.value / 100) * 100}%` }}
                      />
                      <span className="text-[10px] text-theme-f">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom stats row */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-theme bg-theme-subtle p-3 text-center">
                  <div className="text-lg font-bold text-brand">42 pts</div>
                  <div className="text-[10px] text-theme-m uppercase tracking-wider">
                    Avg Velocity
                  </div>
                </div>
                <div className="rounded-xl border border-theme bg-theme-subtle p-3 text-center">
                  <div className="text-lg font-bold text-theme">6/8</div>
                  <div className="text-[10px] text-theme-m uppercase tracking-wider">
                    Stories Completed
                  </div>
                </div>
                <div className="rounded-xl border border-theme bg-theme-subtle p-3 text-center">
                  <div className="text-lg font-bold text-[#22D3EE]">0</div>
                  <div className="text-[10px] text-theme-m uppercase tracking-wider">
                    Carryover Items
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          SECTION 6 — TESTIMONIALS
          ═══════════════════════════════════════════════ */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand/70">
            From Engineering Managers
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Trusted by EMs who ship
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <Card
              key={testimonial.name}
              variant="light"
              className={cn(
                "relative animate-fade-in-up"
              )}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <Quote className="h-8 w-8 text-brand/20 mb-4" />

              <p className="text-body-base leading-relaxed text-theme-s">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-theme pt-5">
                {/* Avatar placeholder */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-theme">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-theme-m">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          SECTION 7 — CTA
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-theme px-4 py-24 sm:py-32 transition-colors duration-300">
        {/* Green glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(18,255,128,0.10), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 bg-dot-grid"
          style={{ backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto max-w-container text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/[0.08] px-4 py-1.5 text-sm font-semibold text-brand mb-6">
            <Calendar className="h-3.5 w-3.5" />
            Start in under 5 minutes
          </div>

          <h2 className="mx-auto max-w-[700px] text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 md:text-display-2">
            Start planning sprints{" "}
            <span className="text-brand">with AI</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[520px] text-lg leading-relaxed text-theme-m">
            Connect your repo, import your backlog, and let ATLAS generate your
            first AI-powered sprint plan. No credit card required.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href="/products/atlas">
                Try ATLAS Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/pricing">Compare Plans</Link>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-theme-m">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              Free tier available
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              GitHub &amp; GitLab integration
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              SOC 2 compliant
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

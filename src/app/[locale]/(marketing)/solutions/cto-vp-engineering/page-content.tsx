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
  BarChart3,
  Users,
  TrendingUp,
  Eye,
  Sparkles,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Zap,
  ChevronRight,
  Quote,
  Calendar,
  LineChart,
  Building2,
  Presentation,
  LayoutDashboard,
  GitBranch,
} from "lucide-react";
import { BRAND_GREEN } from "@/lib/marketing-visual";



const PAIN_POINTS = [
  {
    icon: BarChart3,
    title: "Board asks questions you can't answer",
    stat: "73%",
    statLabel: "of CTOs lack board-ready metrics",
    description:
      "When the board asks about engineering ROI, you cobble together slides from five different tools. The data is stale before you present it.",
    accentColor: "#EF4444",
  },
  {
    icon: Users,
    title: "Cross-team visibility is a spreadsheet",
    stat: "4.2 hrs",
    statLabel: "weekly on manual status reports",
    description:
      "You rely on weekly syncs and stale spreadsheets to understand what 8 teams are doing. Dependencies surface as surprises, not signals.",
    accentColor: "#F59E0B",
  },
  {
    icon: TrendingUp,
    title: "Velocity justification is gut-feel",
    stat: "61%",
    statLabel: "of eng leaders can't justify headcount",
    description:
      "When the CFO asks whether adding 5 engineers will move the needle, you have conviction but no data to back it up.",
    accentColor: "#EF4444",
  },
  {
    icon: Eye,
    title: "No single source of truth",
    stat: "8+",
    statLabel: "tools to get the full picture",
    description:
      "Jira, GitHub, Linear, Datadog, Slack, spreadsheets — the engineering narrative lives everywhere except one place.",
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
      "Org-level velocity tracking",
      "Cross-team dependency mapping",
      "Board-ready reporting",
      "Headcount justification",
    ],
    description:
      "ATLAS gives you a real-time view of velocity, capacity, and delivery across every team — so you can walk into board meetings with data, not anecdotes.",
  },
  {
    name: "PHANTOM",
    color: "#22D3EE",
    role: "Essential",
    tagline: "Tech Debt Intelligence",
    features: [
      "Org-wide debt quantification",
      "Executive remediation dashboards",
      "ROI-based debt prioritization",
      "Quarterly debt trending",
    ],
    description:
      "PHANTOM quantifies technical debt across the entire organization and shows the business impact, so you can prioritize remediation by revenue risk.",
  },
  {
    name: "NEXUS",
    color: "#0d9488",
    role: "Unifying",
    tagline: "Cross-Product Intelligence",
    features: [
      "Cross-product intelligence",
      "Org-level KPIs",
      "Executive dashboards",
      "Unified data layer",
    ],
    description:
      "NEXUS connects every Voatomy product into a single executive layer. One dashboard for velocity, debt, incidents, and business alignment.",
  },
];

const TIMELINE_EVENTS = [
  {
    time: "8:00 AM",
    title: "Board prep in 2 minutes, not 2 days",
    description:
      "NEXUS auto-generates your board deck data: org velocity trends, debt trajectory, delivery confidence, and headcount ROI — all current as of this morning.",
    highlight: "2 min vs 2 days",
    product: "NEXUS",
    productColor: "#0d9488",
    icon: Presentation,
  },
  {
    time: "10:00 AM",
    title: "Cross-team dependency review",
    description:
      "ATLAS surfaces a blocking dependency between Platform and Payments teams. You reroute priorities before it becomes a sprint miss.",
    highlight: "Caught 3 days early",
    product: "ATLAS",
    productColor: "#f16e2c",
    icon: GitBranch,
  },
  {
    time: "12:00 PM",
    title: "Quarterly debt review with leadership",
    description:
      "PHANTOM shows tech debt decreased 18% this quarter. The auth module remediation saved 3.2 hours/week of developer time. CFO approves next phase.",
    highlight: "Data-backed debt ROI",
    product: "PHANTOM",
    productColor: "#22D3EE",
    icon: Shield,
  },
  {
    time: "2:30 PM",
    title: "Incident impact assessment",
    description:
      "P1 in the payments service. NEXUS shows real-time revenue impact, affected customers, and auto-routes the right team leads. You have context in 30 seconds.",
    highlight: "30-second situational awareness",
    product: "NEXUS",
    productColor: "#0d9488",
    icon: AlertTriangle,
  },
  {
    time: "4:00 PM",
    title: "Executive dashboard review",
    description:
      "End-of-day check: 8 teams on track, debt trending down, velocity stable across the org. You close your laptop with clarity, not anxiety.",
    highlight: "Org-wide confidence",
    product: "NEXUS",
    productColor: "#0d9488",
    icon: LayoutDashboard,
  },
];

const METRICS = [
  {
    label: "Engineering ROI",
    values: ["1.8x", "2.1x", "2.4x"],
    current: "2.4x",
    trend: "+0.6x",
    trendDirection: "up" as const,
    icon: TrendingUp,
    description: "Revenue per engineering dollar",
    barWidth: "80%",
    color: BRAND_GREEN,
  },
  {
    label: "Cross-team Velocity",
    values: ["312", "338", "354"],
    current: "354 pts",
    trend: "+13%",
    trendDirection: "up" as const,
    icon: Users,
    description: "Aggregate across 8 teams",
    barWidth: "88%",
    color: BRAND_GREEN,
  },
  {
    label: "Debt-to-Revenue Ratio",
    values: ["22%", "16%", "11%"],
    current: "11%",
    trend: "-11pp",
    trendDirection: "down" as const,
    icon: Shield,
    description: "Trending down QoQ",
    barWidth: "30%",
    color: "#22D3EE",
  },
  {
    label: "Time to Board Report",
    values: ["2 days", "4 hrs", "2 min"],
    current: "2 min",
    trend: "-99%",
    trendDirection: "down" as const,
    icon: Clock,
    description: "Was 2 days, now 2 minutes",
    barWidth: "10%",
    color: "#f16e2c",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "For the first time, I walked into a board meeting and answered every engineering question with live data. The board's confidence in engineering doubled overnight.",
    name: "David Kim",
    role: "CTO",
    company: "Plaid",
    initials: "DK",
  },
  {
    quote:
      "NEXUS gave me the single pane of glass I've been asking for since I joined. Eight teams, one dashboard, zero surprises. It changed how I lead.",
    name: "Rachel Torres",
    role: "VP Engineering",
    company: "Notion",
    initials: "RT",
  },
  {
    quote:
      "We used PHANTOM's debt ROI data to justify a 6-engineer platform team to the CFO. The business case wrote itself — 40% faster feature delivery within two quarters.",
    name: "James Okafor",
    role: "CTO",
    company: "Brex",
    initials: "JO",
  },
];

export default function CTOVPEngineeringPage() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="cto-vp-solution">
      {/* ═══ SECTION 1 — HERO ═══ */}
      <section className="relative min-h-[90vh] overflow-hidden bg-theme px-4 pb-20 pt-28 transition-colors duration-300">
        <div
          className="pointer-events-none absolute inset-0 bg-dot-grid"
          style={{ backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(18,255,128,0.10), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto max-w-container">
          <div
            className={cn(
              "text-center transition-all duration-700 delay-[0s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Chip dotColor="#0d9488" className="border border-brand/20 bg-brand/[0.08] text-brand font-semibold">
              For CTOs &amp; VP Engineering
            </Chip>
          </div>

          <h1
            className={cn(
              "mx-auto mt-8 max-w-[860px] text-center text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-[0.1s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            Board-ready metrics.{" "}
            <span className="text-brand">Organization-wide clarity.</span>
          </h1>

          <p
            className={cn(
              "mx-auto mt-6 max-w-[640px] text-center text-lg leading-relaxed text-theme-m transition-all duration-700 delay-[0.2s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            Board-ready engineering metrics, velocity justification, and
            cross-team visibility. Make data-driven decisions at the
            organizational level.
          </p>

          <div
            className={cn(
              "mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row transition-all duration-700 delay-[0.3s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href="/products/nexus">
                Explore NEXUS
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/pricing">See Pricing</Link>
            </Button>
          </div>

          <div
            className={cn(
              "mx-auto mt-16 grid max-w-[960px] gap-6 md:grid-cols-2 transition-all duration-1000 delay-[0.5s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-red-400">
                <Clock className="h-4 w-4" />
                Before Voatomy
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "2-day board prep scramble",
                  "Cross-team visibility via spreadsheets",
                  "Headcount requests denied for lack of data",
                  "8+ tools to piece together the picture",
                  "Debt invisible until production breaks",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm text-theme-m">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 text-xs">
                      x
                    </span>
                    {text}
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-red-500/10 bg-red-500/[0.04] px-4 py-3">
                <div className="text-xs text-red-400/60 uppercase tracking-wider font-medium">
                  Board Meeting Eve
                </div>
                <div className="mt-1 text-sm text-theme-m">
                  &quot;Can someone pull the velocity data from Jira? And the debt numbers from...where are those?&quot;
                </div>
                <div className="mt-1 text-xs text-red-400/40">
                  11 PM &mdash; Still building slides from 5 different tools
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-brand/20 bg-brand/[0.04] p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand">
                <Sparkles className="h-4 w-4" />
                With Voatomy
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "Board deck data generated in 2 minutes",
                  "Real-time org-wide velocity dashboard",
                  "Data-backed headcount justification",
                  "One unified executive view",
                  "Debt quantified with revenue impact",
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
                  NEXUS Executive Dashboard
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-theme-m">Org Engineering ROI</span>
                  <span className="font-semibold text-brand">2.4x</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-brand/10">
                  <div className="h-2 rounded-full bg-brand/60" style={{ width: "80%" }} />
                </div>
                <div className="mt-2 text-xs text-brand/40">
                  Live data &mdash; updated 2 min ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 — PAIN POINTS ═══ */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand/70">
            The Problem
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Sound familiar?
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            CTOs and VP Engineering carry the weight of organizational
            engineering decisions. These are the gaps that keep you up at night.
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

      {/* ═══ SECTION 3 — YOUR VOATOMY STACK ═══ */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand/70">
            Your Toolkit
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Your Voatomy Stack
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Three products that work together to give you organizational
            visibility, debt intelligence, and a unified executive layer.
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
              <div
                className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl"
                style={{ background: product.color }}
              />

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

        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#f16e2c]/40" />
          <div className="h-2 w-2 rounded-full" style={{ background: "#f16e2c" }} />
          <div className="h-[1px] w-10 bg-gradient-to-r from-[#f16e2c]/40 to-[#22D3EE]/40" />
          <div className="h-2 w-2 rounded-full" style={{ background: "#22D3EE" }} />
          <div className="h-[1px] w-10 bg-gradient-to-r from-[#22D3EE]/40 to-[#0d9488]/40" />
          <div className="h-2 w-2 rounded-full" style={{ background: "#0d9488" }} />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#0d9488]/40" />
        </div>
        <p className="mt-3 text-center text-xs text-theme-f">
          Integrated intelligence across velocity, debt, and executive reporting
        </p>
      </Section>

      {/* ═══ SECTION 4 — DAY IN THE LIFE ═══ */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand/70">
            A Day With Voatomy
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Your day, reimagined
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            From scrambling for data to leading with clarity. Here is what
            a CTO&apos;s day looks like with Voatomy.
          </p>
        </div>

        <div className="relative mt-14 max-w-[720px] mx-auto">
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

      {/* ═══ SECTION 5 — KEY METRICS DASHBOARD ═══ */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand/70">
            Metrics That Matter
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Your executive dashboard
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Real-time visibility into the metrics that define organizational
            engineering health and business impact.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-[900px]">
          <div className="rounded-2xl border border-theme bg-theme-card shadow-2xl shadow-brand/[0.03] overflow-hidden">
            <div className="flex items-center gap-2 border-b border-theme bg-theme-subtle px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="ml-4 flex items-center gap-1.5 text-xs text-theme-f">
                <LineChart className="h-3 w-3 text-brand/60" />
                NEXUS Executive Dashboard &mdash; Q2 2025
              </span>
            </div>

            <div className="p-6">
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
                            metric.trendDirection === "down" && metric.label === "Debt-to-Revenue Ratio" && "text-[#22D3EE]",
                            metric.trendDirection === "down" && metric.label === "Time to Board Report" && "text-[#f16e2c]"
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

              <div className="mt-6 rounded-xl border border-theme bg-theme-subtle p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-theme">Org Velocity Trend</h4>
                    <p className="text-xs text-theme-m mt-0.5">Last 6 quarters</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-brand">
                    <TrendingUp className="h-4 w-4" />
                    +13%
                  </div>
                </div>

                <div className="flex items-end gap-3 h-32">
                  {[
                    { label: "Q1'24", value: 68, color: "bg-theme-m" },
                    { label: "Q2'24", value: 74, color: "bg-theme-m" },
                    { label: "Q3'24", value: 79, color: "bg-brand/40" },
                    { label: "Q4'24", value: 84, color: "bg-brand/50" },
                    { label: "Q1'25", value: 89, color: "bg-brand/60" },
                    { label: "Q2'25", value: 94, color: "bg-brand" },
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

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-theme bg-theme-subtle p-3 text-center">
                  <div className="text-lg font-bold text-brand">354 pts</div>
                  <div className="text-[10px] text-theme-m uppercase tracking-wider">
                    Org Velocity
                  </div>
                </div>
                <div className="rounded-xl border border-theme bg-theme-subtle p-3 text-center">
                  <div className="text-lg font-bold text-theme">8/8</div>
                  <div className="text-[10px] text-theme-m uppercase tracking-wider">
                    Teams On Track
                  </div>
                </div>
                <div className="rounded-xl border border-theme bg-theme-subtle p-3 text-center">
                  <div className="text-lg font-bold text-[#22D3EE]">-18%</div>
                  <div className="text-[10px] text-theme-m uppercase tracking-wider">
                    Debt Reduction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ SECTION 6 — TESTIMONIALS ═══ */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand/70">
            From Engineering Leaders
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Trusted by CTOs who lead with data
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

      {/* ═══ SECTION 7 — CTA ═══ */}
      <section className="relative overflow-hidden bg-theme px-4 py-24 sm:py-32 transition-colors duration-300">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(18,255,128,0.10), transparent)",
          }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-dot-grid"
          style={{ backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto max-w-container text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/[0.08] px-4 py-1.5 text-sm font-semibold text-brand mb-6">
            <Building2 className="h-3.5 w-3.5" />
            Enterprise-ready from day one
          </div>

          <h2 className="mx-auto max-w-[700px] text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 md:text-display-2">
            Lead engineering{" "}
            <span className="text-brand">with data</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[520px] text-lg leading-relaxed text-theme-m">
            Connect your tools, unify your data, and let NEXUS generate your
            executive engineering dashboard. Board-ready in minutes.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href="/products/nexus">
                Explore NEXUS
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/pricing">Compare Plans</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-theme-m">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              Free tier available
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              SOC 2 &amp; SSO included
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              Setup in under 5 minutes
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

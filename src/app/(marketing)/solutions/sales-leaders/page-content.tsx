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
  XCircle,
  Clock,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Zap,
  ChevronRight,
  Quote,
  Calendar,
  BarChart3,
  Target,
  DollarSign,
  Handshake,
  Bell,
  PieChart,
  LineChart,
  Megaphone,
} from "lucide-react";

const BRAND_GREEN = "#12FF80";

const PAIN_POINTS = [
  {
    icon: XCircle,
    title: "Deals blocked by missing features",
    stat: "34%",
    statLabel: "of deals lost to feature gaps",
    description:
      "Your biggest prospect needs one feature to close. Engineering says it's on the roadmap, but nobody can tell you when it will ship.",
    accentColor: "#EF4444",
  },
  {
    icon: Clock,
    title: "No visibility into engineering timelines",
    stat: "2.8 wks",
    statLabel: "avg delay learning about ship dates",
    description:
      "You promised a Q2 delivery. Engineering shipped in Q3. You found out from the changelog, not from a notification.",
    accentColor: "#F59E0B",
  },
  {
    icon: MessageSquare,
    title: "Customer feedback never reaches engineering",
    stat: "67%",
    statLabel: "of feedback lost in translation",
    description:
      "Your team logs feature requests in Salesforce. Engineering lives in Linear. The feedback dies in the gap between them.",
    accentColor: "#EF4444",
  },
  {
    icon: TrendingDown,
    title: "Pipeline stalled by product blockers",
    stat: "$1.2M",
    statLabel: "avg quarterly pipeline at risk",
    description:
      "Deals sit in 'pending feature' limbo for months. Revenue slips, forecasts miss, and nobody connects the dots to engineering.",
    accentColor: "#F59E0B",
  },
];

const PRODUCT_STACK = [
  {
    name: "LOOP",
    color: "#6366F1",
    role: "Primary",
    tagline: "Revenue-Engineering Bridge",
    features: [
      "Revenue-weighted backlogs",
      "Deal-feature mapping",
      "Ship date visibility",
      "Win/loss intelligence",
    ],
    description:
      "LOOP connects your CRM to engineering delivery. See which features are blocking which deals, track ship dates in real time, and prioritize by revenue impact.",
  },
  {
    name: "SIGNAL",
    color: "#EF4444",
    role: "Essential",
    tagline: "Revenue-Aware Incidents",
    features: [
      "Outage impact on deals",
      "Customer-facing incident comms",
      "SLA tracking",
      "Revenue-aware routing",
    ],
    description:
      "SIGNAL shows the revenue impact of every incident. Know which deals are affected, auto-generate customer comms, and route escalations by deal value.",
  },
];

const TIMELINE_EVENTS = [
  {
    time: "8:30 AM",
    title: "Pipeline review with revenue intelligence",
    description:
      "LOOP surfaces 12 deals blocked by 3 features. Total pipeline at risk: $2.1M. You see ship dates for each feature and can forecast with confidence.",
    highlight: "$2.1M pipeline clarity",
    product: "LOOP",
    productColor: "#6366F1",
    icon: PieChart,
  },
  {
    time: "10:00 AM",
    title: "Deal rescue with ship date visibility",
    description:
      "Enterprise prospect about to churn to competitor. LOOP shows the feature they need ships in 8 days. You share a live status link and save the deal.",
    highlight: "$340K deal saved",
    product: "LOOP",
    productColor: "#6366F1",
    icon: Handshake,
  },
  {
    time: "12:30 PM",
    title: "Feature request auto-routed to engineering",
    description:
      "Three customers requested the same integration this week. LOOP aggregates the requests, attaches $890K in combined ARR, and routes to the PM.",
    highlight: "$890K revenue signal",
    product: "LOOP",
    productColor: "#6366F1",
    icon: Megaphone,
  },
  {
    time: "2:00 PM",
    title: "Incident notification before customers call",
    description:
      "Payment API degradation detected. SIGNAL identifies 4 deals in active POC and auto-sends proactive status updates. Your reps know before prospects do.",
    highlight: "Proactive, not reactive",
    product: "SIGNAL",
    productColor: "#EF4444",
    icon: Bell,
  },
  {
    time: "4:30 PM",
    title: "Win/loss analysis with feature intelligence",
    description:
      "Weekly win/loss review: 3 wins tied to recently shipped features, 2 losses tied to missing integrations. Product gets the data to prioritize Q3.",
    highlight: "Data-driven roadmap input",
    product: "LOOP",
    productColor: "#6366F1",
    icon: BarChart3,
  },
];

const METRICS = [
  {
    label: "Deal Velocity",
    values: ["32 days", "26 days", "21 days"],
    current: "21 days",
    trend: "-34%",
    trendDirection: "down" as const,
    icon: Target,
    description: "Average days to close",
    barWidth: "65%",
    color: "#6366F1",
  },
  {
    label: "Feature-to-Revenue",
    values: ["$120K", "$280K", "$410K"],
    current: "$410K",
    trend: "+242%",
    trendDirection: "up" as const,
    icon: DollarSign,
    description: "Revenue tied to shipped features",
    barWidth: "82%",
    color: BRAND_GREEN,
  },
  {
    label: "Pipeline Coverage",
    values: ["2.8x", "3.1x", "3.6x"],
    current: "3.6x",
    trend: "+0.8x",
    trendDirection: "up" as const,
    icon: PieChart,
    description: "Healthy and unblocked",
    barWidth: "90%",
    color: BRAND_GREEN,
  },
  {
    label: "Win Rate",
    values: ["28%", "34%", "41%"],
    current: "41%",
    trend: "+13pp",
    trendDirection: "up" as const,
    icon: Handshake,
    description: "Up from 28% last quarter",
    barWidth: "41%",
    color: "#6366F1",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "LOOP changed everything. We went from losing deals because nobody knew when features would ship to proactively sharing timelines with prospects. Win rate jumped 13 points.",
    name: "Alex Rivera",
    role: "VP Sales",
    company: "Stripe",
    initials: "AR",
  },
  {
    quote:
      "For the first time, my team can see the engineering roadmap through a revenue lens. We stopped guessing which features matter and started selling what is actually coming.",
    name: "Keiko Tanaka",
    role: "Head of Sales",
    company: "Datadog",
    initials: "KT",
  },
  {
    quote:
      "SIGNAL's proactive incident notifications saved us from three deal-killing outages last quarter. Our reps contacted prospects before they even noticed. That is trust.",
    name: "Michael Chen",
    role: "CRO",
    company: "PagerDuty",
    initials: "MC",
  },
];

export default function SalesLeadersPage() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="sales-leaders-solution">
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
            <Chip dotColor="#6366F1" className="border border-brand/20 bg-brand/[0.08] text-brand font-semibold">
              For Sales Leaders
            </Chip>
          </div>

          <h1
            className={cn(
              "mx-auto mt-8 max-w-[860px] text-center text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-[0.1s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            Close deals faster.{" "}
            <span className="text-brand">Ship what sells.</span>
          </h1>

          <p
            className={cn(
              "mx-auto mt-6 max-w-[640px] text-center text-lg leading-relaxed text-theme-m transition-all duration-700 delay-[0.2s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            Stop losing deals to missing features. Get real-time visibility into
            engineering delivery and enable your team with product intelligence.
          </p>

          <div
            className={cn(
              "mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row transition-all duration-700 delay-[0.3s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href="/products/loop">
                Explore LOOP
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
                <XCircle className="h-4 w-4" />
                Before Voatomy
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "Deals lost to unknown feature gaps",
                  "Ship dates learned from changelogs",
                  "Customer feedback lost between CRM and backlog",
                  "$1.2M+ pipeline blocked quarterly",
                  "Win/loss reviews without product data",
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
                  Deal Review
                </div>
                <div className="mt-1 text-sm text-theme-m">
                  &quot;When is that integration shipping? The prospect is about to sign with a competitor...&quot;
                </div>
                <div className="mt-1 text-xs text-red-400/40">
                  3 weeks later &mdash; Deal lost, feature shipped the following month
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
                  "Revenue-weighted feature prioritization",
                  "Real-time ship date visibility per deal",
                  "Customer voice routed directly to roadmap",
                  "Pipeline unblocked with proactive alerts",
                  "Win/loss tied to feature delivery data",
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
                  LOOP Deal Intelligence
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-theme-m">Pipeline Unblocked</span>
                  <span className="font-semibold text-brand">$2.1M</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-brand/10">
                  <div className="h-2 rounded-full bg-brand/60" style={{ width: "85%" }} />
                </div>
                <div className="mt-2 text-xs text-brand/40">
                  Live data &mdash; 12 deals tracked
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
            Sales leaders are caught between customer demand and engineering
            delivery. These are the gaps that cost you deals.
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
            Two products that bridge the gap between sales and engineering,
            turning product delivery into revenue acceleration.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 max-w-[800px] mx-auto">
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
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#6366F1]/40" />
          <div className="h-2 w-2 rounded-full" style={{ background: "#6366F1" }} />
          <div className="h-[1px] w-10 bg-gradient-to-r from-[#6366F1]/40 to-[#EF4444]/40" />
          <div className="h-2 w-2 rounded-full" style={{ background: "#EF4444" }} />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#EF4444]/40" />
        </div>
        <p className="mt-3 text-center text-xs text-theme-f">
          Integrated intelligence across deals, features, and incidents
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
            From chasing engineering for updates to closing deals with product
            intelligence. Here is what Monday looks like with Voatomy.
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
            Your sales intelligence dashboard
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Real-time visibility into the metrics that connect engineering
            delivery to revenue outcomes.
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
                LOOP Revenue Dashboard &mdash; Q2 2025
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
                            metric.trendDirection === "down" && metric.label === "Deal Velocity" && "text-[#6366F1]"
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
                    <h4 className="text-sm font-semibold text-theme">Win Rate Trend</h4>
                    <p className="text-xs text-theme-m mt-0.5">Last 6 months</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-brand">
                    <TrendingUp className="h-4 w-4" />
                    +13pp
                  </div>
                </div>

                <div className="flex items-end gap-3 h-32">
                  {[
                    { label: "Jan", value: 28, color: "bg-theme-m" },
                    { label: "Feb", value: 31, color: "bg-theme-m" },
                    { label: "Mar", value: 34, color: "bg-brand/40" },
                    { label: "Apr", value: 36, color: "bg-brand/50" },
                    { label: "May", value: 39, color: "bg-brand/60" },
                    { label: "Jun", value: 41, color: "bg-brand" },
                  ].map((bar) => (
                    <div key={bar.label} className="flex flex-1 flex-col items-center gap-1.5">
                      <span className="text-[10px] font-medium text-theme-m">
                        {bar.value}%
                      </span>
                      <div
                        className={cn("w-full rounded-t-md transition-all duration-700", bar.color)}
                        style={{ height: `${(bar.value / 50) * 100}%` }}
                      />
                      <span className="text-[10px] text-theme-f">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-theme bg-theme-subtle p-3 text-center">
                  <div className="text-lg font-bold text-[#6366F1]">$2.1M</div>
                  <div className="text-[10px] text-theme-m uppercase tracking-wider">
                    Pipeline Unblocked
                  </div>
                </div>
                <div className="rounded-xl border border-theme bg-theme-subtle p-3 text-center">
                  <div className="text-lg font-bold text-theme">12</div>
                  <div className="text-[10px] text-theme-m uppercase tracking-wider">
                    Deals Tracked
                  </div>
                </div>
                <div className="rounded-xl border border-theme bg-theme-subtle p-3 text-center">
                  <div className="text-lg font-bold text-brand">$410K</div>
                  <div className="text-[10px] text-theme-m uppercase tracking-wider">
                    Feature Revenue
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
            From Sales Leaders
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Trusted by teams that close
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
            <Calendar className="h-3.5 w-3.5" />
            Connect your CRM in minutes
          </div>

          <h2 className="mx-auto max-w-[700px] text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 md:text-display-2">
            Align sales and engineering{" "}
            <span className="text-brand">for revenue</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[520px] text-lg leading-relaxed text-theme-m">
            Connect your CRM, link deals to features, and let LOOP give your
            team real-time product intelligence. Start closing faster today.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href="/products/loop">
                Explore LOOP
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
              Salesforce &amp; HubSpot integration
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              Free tier available
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

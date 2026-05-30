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
  AlertTriangle,
  Eye,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Clock,
  CheckCircle2,
  Zap,
  ChevronRight,
  Quote,
  Calendar,
  Bell,
  Heart,
  Shield,
  Send,
  FileText,
  LineChart,
  HeartPulse,
  Users,
} from "lucide-react";
import { BRAND_GREEN } from "@/lib/marketing-visual";



const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    title: "Learning about outages from customers",
    stat: "42%",
    statLabel: "of CS teams hear about issues from customers first",
    description:
      "Your biggest customer Slacks you about downtime before your own engineering team tells you. You scramble for answers you don't have.",
    accentColor: "#EF4444",
  },
  {
    icon: Eye,
    title: "Churn signals siloed in engineering",
    stat: "3.1x",
    statLabel: "higher churn when CS lacks product visibility",
    description:
      "Engineering knows the product is degrading for key accounts. CS finds out when the customer cancels. The data existed — it just never reached you.",
    accentColor: "#F59E0B",
  },
  {
    icon: MessageSquare,
    title: "No proactive communication tools",
    stat: "68%",
    statLabel: "of customers want proactive updates",
    description:
      "Customers expect to hear from you before they experience issues. Instead, you're always one step behind, reacting to complaints.",
    accentColor: "#EF4444",
  },
  {
    icon: TrendingDown,
    title: "Feature requests disappear into backlogs",
    stat: "78%",
    statLabel: "of requests never get status updates",
    description:
      "Your customer asked for an integration 6 months ago. It shipped last week. Nobody told them — or you. The renewal is next month.",
    accentColor: "#F59E0B",
  },
];

const PRODUCT_STACK = [
  {
    name: "SIGNAL",
    color: "#EF4444",
    role: "Primary",
    tagline: "Revenue-Aware Incidents",
    features: [
      "Proactive incident alerts",
      "Customer impact scoring",
      "Auto-generated status updates",
      "Revenue-aware escalation",
    ],
    description:
      "SIGNAL alerts you to incidents that affect your customers before they notice. See impact scores by account, auto-generate comms, and escalate by revenue risk.",
  },
  {
    name: "LOOP",
    color: "#6366F1",
    role: "Essential",
    tagline: "Revenue-Engineering Bridge",
    features: [
      "Feature request tracking",
      "Customer voice to roadmap",
      "Ship notifications",
      "Churn signal integration",
    ],
    description:
      "LOOP connects customer feedback to engineering delivery. Track feature requests by account, get notified when they ship, and spot churn signals early.",
  },
];

const TIMELINE_EVENTS = [
  {
    time: "8:00 AM",
    title: "Customer health check with live data",
    description:
      "SIGNAL shows real-time health scores for your top 50 accounts. Two accounts flagged: one has elevated error rates, another has a pending feature request about to ship.",
    highlight: "2 at-risk accounts caught early",
    product: "SIGNAL",
    productColor: "#EF4444",
    icon: HeartPulse,
  },
  {
    time: "10:30 AM",
    title: "Incident alert before the customer calls",
    description:
      "API latency spike affecting 8 enterprise accounts. SIGNAL sends you impact scores and auto-generates a customer-facing status update. You reach out proactively.",
    highlight: "8 accounts notified in 30 seconds",
    product: "SIGNAL",
    productColor: "#EF4444",
    icon: Bell,
  },
  {
    time: "1:00 PM",
    title: "Proactive customer communication",
    description:
      "The incident is resolved. SIGNAL auto-generates a personalized follow-up for each affected account with RCA summary and prevention steps. You send with one click.",
    highlight: "One-click personalized comms",
    product: "SIGNAL",
    productColor: "#EF4444",
    icon: Send,
  },
  {
    time: "2:30 PM",
    title: "Feature shipped — customer notified instantly",
    description:
      "The SSO integration that Acme Corp requested 3 months ago just shipped. LOOP detects it, links it to Acme's request, and drafts a personalized announcement.",
    highlight: "Zero-lag feature notification",
    product: "LOOP",
    productColor: "#6366F1",
    icon: Sparkles,
  },
  {
    time: "4:00 PM",
    title: "QBR prep in minutes, not days",
    description:
      "LOOP generates a customer-specific report: features requested, features delivered, open items with ETAs, health score trends, and incident history. QBR deck ready.",
    highlight: "QBR prep in 3 minutes",
    product: "LOOP",
    productColor: "#6366F1",
    icon: FileText,
  },
];

const METRICS = [
  {
    label: "Net Revenue Retention",
    values: ["94%", "98%", "108%"],
    current: "108%",
    trend: "+14pp",
    trendDirection: "up" as const,
    icon: Heart,
    description: "Above 100% = net expansion",
    barWidth: "92%",
    color: BRAND_GREEN,
  },
  {
    label: "Time to Notify",
    values: ["4.2 hrs", "45 min", "30 sec"],
    current: "30 sec",
    trend: "-99%",
    trendDirection: "down" as const,
    icon: Clock,
    description: "From hours to seconds",
    barWidth: "8%",
    color: "#EF4444",
  },
  {
    label: "Request Resolution",
    values: ["12%", "34%", "67%"],
    current: "67%",
    trend: "+55pp",
    trendDirection: "up" as const,
    icon: CheckCircle2,
    description: "Feature requests with status updates",
    barWidth: "67%",
    color: "#6366F1",
  },
  {
    label: "Customer Health Score",
    values: ["62", "74", "86"],
    current: "86",
    trend: "+24pts",
    trendDirection: "up" as const,
    icon: HeartPulse,
    description: "Avg across top 50 accounts",
    barWidth: "86%",
    color: BRAND_GREEN,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "SIGNAL changed our entire relationship with customers. We went from apologizing for outages to proactively updating them before they even noticed. Our NPS jumped 22 points.",
    name: "Lisa Nakamura",
    role: "VP Customer Success",
    company: "Twilio",
    initials: "LN",
  },
  {
    quote:
      "LOOP solved the black hole problem. Feature requests used to disappear into engineering backlogs. Now customers get notified the moment their request ships. Renewals are easier.",
    name: "Daniel Osei",
    role: "Head of Customer Success",
    company: "Amplitude",
    initials: "DO",
  },
  {
    quote:
      "We reduced churn by 34% in two quarters. The biggest driver was SIGNAL's proactive incident alerts — customers told us they renewed specifically because of how we communicated during outages.",
    name: "Sarah Mitchell",
    role: "Director of CS",
    company: "LaunchDarkly",
    initials: "SM",
  },
];

export default function CustomerSuccessPage() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="cs-solution">
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
            <Chip dotColor="#EF4444" className="border border-brand/20 bg-brand/[0.08] text-brand font-semibold">
              For Customer Success
            </Chip>
          </div>

          <h1
            className={cn(
              "mx-auto mt-8 max-w-[860px] text-center text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-[0.1s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            Proactive, not reactive.{" "}
            <span className="text-brand">Retain with confidence.</span>
          </h1>

          <p
            className={cn(
              "mx-auto mt-6 max-w-[640px] text-center text-lg leading-relaxed text-theme-m transition-all duration-700 delay-[0.2s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            Stop learning about outages from your customers. Get proactive
            visibility into product health, churn signals, and customer impact.
          </p>

          <div
            className={cn(
              "mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row transition-all duration-700 delay-[0.3s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href="/products/signal">
                Explore SIGNAL
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
                <AlertTriangle className="h-4 w-4" />
                Before Voatomy
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "Outage alerts from customer Slack messages",
                  "Churn signals invisible until too late",
                  "Feature requests lost in engineering backlogs",
                  "QBR prep takes days of manual work",
                  "Reactive firefighting instead of proactive care",
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
                  Customer Slack
                </div>
                <div className="mt-1 text-sm text-theme-m">
                  &quot;Hey, is your API down? We&apos;re seeing errors on our end...&quot;
                </div>
                <div className="mt-1 text-xs text-red-400/40">
                  4 hours after incident started &mdash; CS learns from customer
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
                  "Proactive alerts before customers notice",
                  "Real-time health scores per account",
                  "Auto-generated status updates and comms",
                  "Feature ship notifications by account",
                  "QBR prep in 3 minutes, not 3 days",
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
                  SIGNAL Health Dashboard
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-theme-m">Customer Health Avg</span>
                  <span className="font-semibold text-brand">86/100</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-brand/10">
                  <div className="h-2 rounded-full bg-brand/60" style={{ width: "86%" }} />
                </div>
                <div className="mt-2 text-xs text-brand/40">
                  Live data &mdash; 50 accounts monitored
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
            Customer Success teams are caught between product reality and
            customer expectations. These are the gaps that drive churn.
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
            Two products that transform customer success from reactive
            firefighting to proactive retention and expansion.
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
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#EF4444]/40" />
          <div className="h-2 w-2 rounded-full" style={{ background: "#EF4444" }} />
          <div className="h-[1px] w-10 bg-gradient-to-r from-[#EF4444]/40 to-[#6366F1]/40" />
          <div className="h-2 w-2 rounded-full" style={{ background: "#6366F1" }} />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#6366F1]/40" />
        </div>
        <p className="mt-3 text-center text-xs text-theme-f">
          Integrated intelligence across incidents, health, and customer voice
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
            From apologizing for outages to proactively delighting customers.
            Here is what Monday looks like with Voatomy.
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
            Your CS health dashboard
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Real-time visibility into the metrics that define customer health,
            retention, and proactive engagement.
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
                SIGNAL Customer Health &mdash; Q2 2025
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
                            metric.trendDirection === "down" && metric.label === "Time to Notify" && "text-[#EF4444]"
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
                    <h4 className="text-sm font-semibold text-theme">NRR Trend</h4>
                    <p className="text-xs text-theme-m mt-0.5">Last 6 months</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-brand">
                    <TrendingUp className="h-4 w-4" />
                    +14pp
                  </div>
                </div>

                <div className="flex items-end gap-3 h-32">
                  {[
                    { label: "Jan", value: 94, color: "bg-theme-m" },
                    { label: "Feb", value: 96, color: "bg-theme-m" },
                    { label: "Mar", value: 99, color: "bg-brand/40" },
                    { label: "Apr", value: 102, color: "bg-brand/50" },
                    { label: "May", value: 105, color: "bg-brand/60" },
                    { label: "Jun", value: 108, color: "bg-brand" },
                  ].map((bar) => (
                    <div key={bar.label} className="flex flex-1 flex-col items-center gap-1.5">
                      <span className="text-[10px] font-medium text-theme-m">
                        {bar.value}%
                      </span>
                      <div
                        className={cn("w-full rounded-t-md transition-all duration-700", bar.color)}
                        style={{ height: `${((bar.value - 85) / 25) * 100}%` }}
                      />
                      <span className="text-[10px] text-theme-f">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-theme bg-theme-subtle p-3 text-center">
                  <div className="text-lg font-bold text-brand">50</div>
                  <div className="text-[10px] text-theme-m uppercase tracking-wider">
                    Accounts Monitored
                  </div>
                </div>
                <div className="rounded-xl border border-theme bg-theme-subtle p-3 text-center">
                  <div className="text-lg font-bold text-[#EF4444]">0</div>
                  <div className="text-[10px] text-theme-m uppercase tracking-wider">
                    Surprise Churns
                  </div>
                </div>
                <div className="rounded-xl border border-theme bg-theme-subtle p-3 text-center">
                  <div className="text-lg font-bold text-[#6366F1]">23</div>
                  <div className="text-[10px] text-theme-m uppercase tracking-wider">
                    Features Shipped
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
            From CS Leaders
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Trusted by teams that retain
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
            Start retaining in minutes
          </div>

          <h2 className="mx-auto max-w-[700px] text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 md:text-display-2">
            Retain customers{" "}
            <span className="text-brand">proactively</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[520px] text-lg leading-relaxed text-theme-m">
            Connect your infrastructure, link incidents to customers, and let
            SIGNAL transform your team from reactive to proactive. No credit
            card required.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href="/products/signal">
                Explore SIGNAL
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
              PagerDuty &amp; Datadog integration
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

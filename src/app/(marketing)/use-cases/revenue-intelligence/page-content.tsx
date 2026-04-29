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
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  CircleDollarSign,
  DollarSign,
  HeadphonesIcon,
  Layers,
  LineChart,
  MessageSquare,
  Mic,
  Phone,
  Rocket,
  Send,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingDown,
  Users,
  Zap,
} from "lucide-react";

/* ================================================================
   REVENUE INTELLIGENCE — Use-Case Landing Page
   Accent: Gold/Amber #F59E0B
   Products: LOOP + ATLAS
   ================================================================ */

const GOLD = "#F59E0B";
const GOLD_LIGHT = "rgba(245, 158, 11, 0.12)";
const GOLD_MUTED = "rgba(245, 158, 11, 0.06)";

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

/* ---------- animated counter ---------- */
function useCounter(target: number, duration = 2000, active = false) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!active) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

/* ================================================================
   1. HERO — Link customer feedback to business outcomes
   ================================================================ */
function HeroSection() {
  const loaded = useReveal();

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-theme px-4 pb-24 pt-32">
      {/* Gold radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 32%, rgba(245,158,11,0.14), transparent)",
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
              borderColor: "rgba(245,158,11,0.3)",
              background: GOLD_LIGHT,
              color: GOLD,
            }}
          >
            <CircleDollarSign className="h-4 w-4" />
            Revenue Intelligence
          </span>
        </div>

        {/* Headline */}
        <h1
          className={cn(
            "mx-auto mt-8 max-w-[900px] text-4xl font-semibold leading-[1.06] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-100",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          Link customer feedback to{" "}
          <span style={{ color: GOLD }}>business outcomes</span>
        </h1>

        {/* Subheadline */}
        <p
          className={cn(
            "mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-theme-m transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          Stop guessing which features drive revenue. LOOP and ATLAS transform
          scattered customer signals into dollar-weighted engineering priorities
          -- so every sprint ships what the business actually needs.
        </p>

        {/* Signal flow visual */}
        <div
          className={cn(
            "mx-auto mt-14 transition-all duration-1000 delay-300",
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-90",
          )}
        >
          <RevenueFlowVisual />
        </div>

        {/* CTA */}
        <div
          className={cn(
            "mx-auto mt-12 flex max-w-lg flex-col items-center gap-3 sm:flex-row sm:justify-center transition-all duration-700 delay-500",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <Button asChild size="lg" className="w-full sm:w-auto gap-2">
            <Link href="/products/loop">
              Explore LOOP
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto gap-2"
          >
            <Link href="/products/atlas">
              Explore ATLAS
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Meta */}
        <div
          className={cn(
            "mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-theme-m transition-all duration-700 delay-[600ms]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <span className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5" style={{ color: GOLD }} />
            Revenue-weighted prioritization
          </span>
          <span className="text-theme-f">|</span>
          <span>Powered by LOOP + ATLAS</span>
          <span className="text-theme-f">|</span>
          <span>14-day free trial</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- revenue flow: signals → $ → priorities ---------- */
function RevenueFlowVisual() {
  const steps = [
    {
      icon: MessageSquare,
      label: "Customer Signals",
      detail: "Calls, tickets, surveys",
    },
    {
      icon: DollarSign,
      label: "Revenue Impact",
      detail: "$2.3M pipeline blocked",
    },
    {
      icon: Target,
      label: "Engineering Priorities",
      detail: "Sprint 26 backlog ranked",
    },
  ];

  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center gap-4 sm:flex-row sm:gap-0">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center gap-3 flex-1">
              <div
                className="grid h-16 w-16 place-items-center rounded-2xl border shadow-lg"
                style={{
                  borderColor: "rgba(245,158,11,0.3)",
                  background: `linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.04))`,
                  boxShadow: `0 8px 32px rgba(245,158,11,0.12)`,
                }}
              >
                <Icon className="h-7 w-7" style={{ color: GOLD }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-theme">{step.label}</p>
                <p className="text-xs text-theme-m">{step.detail}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden sm:flex items-center px-2">
                <div
                  className="h-px w-16"
                  style={{
                    background: `linear-gradient(to right, rgba(245,158,11,0.5), rgba(245,158,11,0.2))`,
                  }}
                />
                <ArrowRight className="h-4 w-4 -ml-1" style={{ color: GOLD }} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ================================================================
   2. THE REVENUE BLIND SPOT — 3 big stats
   ================================================================ */
function BlindSpotSection() {
  const { ref, inView } = useInView();

  const stats = [
    {
      value: "$1T+",
      label: "Lost annually to cross-functional misalignment",
      icon: TrendingDown,
    },
    {
      value: "73%",
      label: "Of product decisions lack revenue data",
      icon: ShieldAlert,
    },
    {
      value: "23%",
      label: "Of pipeline lost to unaddressed feature gaps",
      icon: Target,
    },
  ];

  return (
    <Section variant="rose" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={GOLD} className="mb-4">
            The Problem
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            The revenue{" "}
            <span style={{ color: GOLD }}>blind spot</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            Most teams build in the dark. Product doesn't know which features
            drive revenue, sales can't influence what ships, and engineering
            prioritizes by gut feel.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={cn(
                  "group relative flex flex-col items-center rounded-2xl border border-theme p-8 text-center transition-all duration-500 overflow-hidden",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{
                  transitionDelay: `${i * 120 + 150}ms`,
                  background: "var(--bg-card)",
                }}
              >
                <div
                  className="mb-5 grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: GOLD_LIGHT }}
                >
                  <Icon className="h-7 w-7" style={{ color: GOLD }} />
                </div>
                <span
                  className="text-5xl font-bold tracking-tight"
                  style={{ color: GOLD }}
                >
                  {stat.value}
                </span>
                <span className="mt-3 text-sm leading-relaxed text-theme-s">
                  {stat.label}
                </span>
                {/* subtle glow on hover */}
                <div
                  className="pointer-events-none absolute -bottom-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: GOLD }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   3. REVENUE SIGNAL SOURCES
   ================================================================ */
function SignalSourcesSection() {
  const { ref, inView } = useInView();

  const sources = [
    {
      icon: Mic,
      name: "Sales Calls",
      integration: "Gong",
      action: "Feature demand extraction",
      example: '"47 accounts requested SSO in the last 90 days"',
      color: "#7C3AED",
    },
    {
      icon: HeadphonesIcon,
      name: "Support Tickets",
      integration: "Zendesk",
      action: "Churn risk detection",
      example: '"API rate limiting caused 12 escalations this month"',
      color: "#EF4444",
    },
    {
      icon: BarChart3,
      name: "CRM Data",
      integration: "Salesforce",
      action: "Pipeline impact per feature",
      example: '"$2.3M in pipeline blocked on SSO integration"',
      color: "#00A1E0",
    },
    {
      icon: Users,
      name: "Customer Surveys",
      integration: "NPS / CSAT",
      action: "Satisfaction correlation",
      example: '"NPS dropped 14pts among accounts missing webhooks"',
      color: "#10B981",
    },
  ];

  return (
    <Section variant="coral" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={GOLD} className="mb-4">
            Signal Sources
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Where <span style={{ color: GOLD }}>revenue intelligence</span> comes from
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            LOOP ingests signals from every customer-facing tool and transforms
            raw data into revenue-weighted feature demand.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {sources.map((source, i) => {
            const Icon = source.icon;
            return (
              <Card
                key={source.name}
                variant="light"
                className={cn(
                  "group relative overflow-hidden transition-all duration-500",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{ transitionDelay: `${i * 100 + 150}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${source.color}18` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: source.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-theme">{source.name}</h3>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          background: `${source.color}18`,
                          color: source.color,
                        }}
                      >
                        {source.integration}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium" style={{ color: GOLD }}>
                      {source.action}
                    </p>
                    <div
                      className="mt-3 rounded-lg border border-theme p-3"
                      style={{ background: GOLD_MUTED }}
                    >
                      <p className="text-xs italic leading-relaxed text-theme-s">
                        {source.example}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: source.color }}
                />
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   4. REVENUE DASHBOARD MOCK
   ================================================================ */
function DashboardSection() {
  const { ref, inView } = useInView();

  const features = [
    { name: "SSO Integration", value: "$2.3M", bar: 100, accounts: 47, risk: "high" },
    { name: "API v2", value: "$1.8M", bar: 78, accounts: 31, risk: "medium" },
    { name: "Webhooks", value: "$950K", bar: 41, accounts: 18, risk: "low" },
    { name: "RBAC", value: "$720K", bar: 31, accounts: 14, risk: "low" },
    { name: "Custom Reports", value: "$580K", bar: 25, accounts: 9, risk: "medium" },
  ];

  const healthScores = [
    { account: "Acme Corp", score: 92, risk: "low", arr: "$340K" },
    { account: "TechFlow Inc", score: 67, risk: "medium", arr: "$280K" },
    { account: "DataPrime", score: 41, risk: "high", arr: "$520K" },
    { account: "ScaleOps", score: 88, risk: "low", arr: "$190K" },
  ];

  return (
    <Section variant="rose" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={GOLD} className="mb-4">
            Revenue Dashboard
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Revenue intelligence,{" "}
            <span style={{ color: GOLD }}>at a glance</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            A single dashboard where product, sales, and engineering see the
            same numbers -- denominated in dollars, not opinions.
          </p>
        </div>

        {/* Mock dashboard container */}
        <div
          className={cn(
            "mx-auto max-w-[1060px] rounded-2xl border border-theme shadow-2xl transition-all duration-1000 overflow-hidden",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
          style={{
            background: "var(--bg-card)",
            boxShadow: `0 24px 80px rgba(245,158,11,0.06)`,
          }}
        >
          {/* Window bar */}
          <div className="flex items-center gap-2 border-b border-theme px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="ml-4 flex items-center gap-1.5 text-xs text-theme-f">
              <CircleDollarSign className="h-3 w-3" style={{ color: GOLD }} />
              Revenue Intelligence Dashboard
            </span>
          </div>

          {/* Top metrics row */}
          <div className="grid grid-cols-2 gap-4 p-5 md:grid-cols-4">
            <DashCard
              label="Revenue Influenced This Quarter"
              value="$4.2M"
              change="+38% vs Q2"
              positive
              color={GOLD}
            />
            <DashCard
              label="Pipeline Blocked by Feature Gaps"
              value="$3.1M"
              change="-18% vs last month"
              positive
              color="#EF4444"
            />
            <DashCard
              label="Signals Processed Today"
              value="136"
              change="+22 from yesterday"
              positive
              color={GOLD}
            />
            <DashCard
              label="At-Risk Revenue"
              value="$1.4M"
              change="3 accounts flagged"
              positive={false}
              color="#EF4444"
            />
          </div>

          {/* Feature demand + account health */}
          <div className="grid grid-cols-1 gap-4 px-5 pb-5 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Feature demand ranked by $ value */}
            <div className="rounded-xl border border-theme p-4" style={{ background: "var(--bg-subtle)" }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-theme-s uppercase tracking-wider">
                  Feature Demand by Revenue Impact
                </p>
                <span className="text-[10px] text-theme-f">Sorted by $ value</span>
              </div>
              <div className="space-y-3">
                {features.map((feat) => (
                  <div key={feat.name} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-theme">{feat.name}</span>
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            feat.risk === "high" && "bg-red-400",
                            feat.risk === "medium" && "bg-yellow-400",
                            feat.risk === "low" && "bg-green-400",
                          )}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-theme-m">{feat.accounts} accounts</span>
                        <span className="text-sm font-bold" style={{ color: GOLD }}>
                          {feat.value}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: GOLD_MUTED }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${feat.bar}%`,
                          background: `linear-gradient(to right, ${GOLD}, rgba(245,158,11,0.5))`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account health scores */}
            <div className="rounded-xl border border-theme p-4" style={{ background: "var(--bg-subtle)" }}>
              <p className="text-xs font-semibold text-theme-s uppercase tracking-wider mb-4">
                Account Health Scores
              </p>
              <div className="space-y-3">
                {healthScores.map((acct) => (
                  <div
                    key={acct.account}
                    className="flex items-center justify-between rounded-lg border border-theme p-3"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <div>
                      <p className="text-sm font-medium text-theme">{acct.account}</p>
                      <p className="text-xs text-theme-m">{acct.arr} ARR</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span
                          className={cn(
                            "text-lg font-bold",
                            acct.risk === "high" && "text-red-400",
                            acct.risk === "medium" && "text-yellow-400",
                            acct.risk === "low" && "text-green-400",
                          )}
                        >
                          {acct.score}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                          acct.risk === "high" && "bg-red-400/10 text-red-400",
                          acct.risk === "medium" && "bg-yellow-400/10 text-yellow-400",
                          acct.risk === "low" && "bg-green-400/10 text-green-400",
                        )}
                      >
                        {acct.risk === "high" ? "At Risk" : acct.risk === "medium" ? "Watch" : "Healthy"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function DashCard({
  label,
  value,
  change,
  positive,
  color,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-theme p-4" style={{ background: "var(--bg-subtle)" }}>
      <p className="text-[11px] text-theme-m leading-tight">{label}</p>
      <p className="mt-1.5 text-2xl font-bold" style={{ color }}>
        {value}
      </p>
      <p
        className={cn(
          "mt-1 text-xs",
          positive ? "text-green-400" : "text-red-400",
        )}
      >
        {change}
      </p>
    </div>
  );
}

/* ================================================================
   5. THE REVENUE-TO-SPRINT CONNECTION
   ================================================================ */
function RevenueToSprintSection() {
  const { ref, inView } = useInView();

  const steps = [
    {
      step: "01",
      icon: BrainCircuit,
      product: "LOOP",
      title: "LOOP identifies demand",
      desc: '$2.3M in pipeline blocked on SSO integration across 47 accounts.',
      badge: "$2.3M identified",
    },
    {
      step: "02",
      icon: Target,
      product: "ATLAS",
      title: "ATLAS prioritizes by revenue weight",
      desc: "SSO moves to top of Sprint 26 backlog based on revenue impact score, code complexity, and team capacity.",
      badge: "Sprint 26 prioritized",
    },
    {
      step: "03",
      icon: Rocket,
      product: "Engineering",
      title: "Engineering ships SSO",
      desc: "The team ships SSO integration in Sprint 26 with full context on which accounts need it and why.",
      badge: "Feature shipped",
    },
    {
      step: "04",
      icon: Send,
      product: "LOOP",
      title: "LOOP notifies requesting accounts",
      desc: "47 accounts receive personalized notifications. Sales gets deal-ready briefs. CS gets renewal ammo.",
      badge: "47 accounts notified",
    },
    {
      step: "05",
      icon: DollarSign,
      product: "Revenue",
      title: "Sales closes influenced deals",
      desc: "12 deals close within 30 days of SSO ship, directly attributed to the feature launch.",
      badge: "$1.4M influenced",
    },
  ];

  return (
    <Section variant="white" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={GOLD} className="mb-4">
            The Connection
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            From revenue signal to{" "}
            <span style={{ color: GOLD }}>closed deal</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            See how LOOP and ATLAS work together to turn a $2.3M pipeline blocker
            into $1.4M of influenced revenue in a single sprint cycle.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-[800px]">
          {/* Vertical connector line */}
          <div
            className="absolute left-6 top-0 hidden h-full w-px sm:block"
            style={{
              background: `linear-gradient(to bottom, transparent, ${GOLD}, ${GOLD}, transparent)`,
            }}
          />

          <div className="space-y-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className={cn(
                    "relative flex gap-6 transition-all duration-500",
                    inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6",
                  )}
                  style={{ transitionDelay: `${i * 120 + 200}ms` }}
                >
                  {/* Step circle */}
                  <div className="relative z-[2] shrink-0">
                    <div
                      className="grid h-12 w-12 place-items-center rounded-2xl border shadow-lg"
                      style={{
                        borderColor: "rgba(245,158,11,0.3)",
                        background: `linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.04))`,
                        boxShadow: `0 4px 20px rgba(245,158,11,0.1)`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: GOLD }} />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 rounded-2xl border border-theme p-5 transition-all duration-300 hover:shadow-md" style={{ background: "var(--bg-card)" }}>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: GOLD }}
                      >
                        {s.step}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          background: GOLD_LIGHT,
                          color: GOLD,
                        }}
                      >
                        {s.product}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-theme">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-theme-m">{s.desc}</p>
                    <div className="mt-3">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          background: GOLD_LIGHT,
                          color: GOLD,
                        }}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {s.badge}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary bar */}
          <div
            className={cn(
              "mt-10 flex flex-col items-center gap-4 rounded-2xl border-2 p-6 sm:flex-row sm:justify-between transition-all duration-700",
              inView ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-6",
            )}
            style={{
              borderColor: GOLD,
              background: GOLD_MUTED,
            }}
          >
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-theme">End-to-end revenue attribution</p>
              <p className="text-xs text-theme-m">From customer signal to closed deal in one sprint cycle</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="text-2xl font-bold" style={{ color: GOLD }}>$2.3M</span>
                <p className="text-[10px] text-theme-m">Pipeline identified</p>
              </div>
              <ArrowRight className="h-5 w-5 text-theme-m hidden sm:block" />
              <div className="text-center">
                <span className="text-2xl font-bold text-brand">$1.4M</span>
                <p className="text-[10px] text-theme-m">Revenue influenced</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   6. ROI PROOF POINTS — Animated counters
   ================================================================ */
function ROISection() {
  const { ref, inView } = useInView();

  const revenueCount = useCounter(42, 2000, inView);
  const signalsCount = useCounter(136, 2000, inView);
  const dealsCount = useCounter(7, 1500, inView);
  const cycleCount = useCounter(42, 2000, inView);

  const metrics = [
    {
      value: `$${revenueCount === 42 ? "4.2" : (revenueCount / 10).toFixed(1)}M`,
      rawTarget: 42,
      label: "Revenue influenced per quarter",
      desc: "Average across LOOP + ATLAS customers",
      icon: DollarSign,
    },
    {
      value: `${signalsCount}`,
      rawTarget: 136,
      label: "Customer signals processed daily",
      desc: "Across calls, tickets, surveys & CRM",
      icon: Sparkles,
    },
    {
      value: `${dealsCount}`,
      rawTarget: 7,
      label: "Deals accelerated per feature ship",
      desc: "Average deal velocity increase",
      icon: Zap,
    },
    {
      value: `${cycleCount}%`,
      rawTarget: 42,
      label: "Faster sales cycle on influenced deals",
      desc: "Compared to unattributed pipeline",
      icon: LineChart,
    },
  ];

  return (
    <Section variant="coral" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={GOLD} className="mb-4">
            Proof Points
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Numbers that move{" "}
            <span style={{ color: GOLD }}>boardroom conversations</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            Revenue intelligence isn't theoretical. These are projected outcomes
            based on customer signal analysis and sales attribution modeling.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className={cn(
                  "group relative flex flex-col items-center rounded-2xl border border-theme p-8 text-center transition-all duration-500 overflow-hidden",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{
                  transitionDelay: `${i * 100 + 150}ms`,
                  background: "var(--bg-card)",
                }}
              >
                <div
                  className="mb-4 grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: GOLD_LIGHT }}
                >
                  <Icon className="h-7 w-7" style={{ color: GOLD }} />
                </div>
                <span
                  className="text-4xl font-bold tracking-tight tabular-nums"
                  style={{ color: GOLD }}
                >
                  {metric.value}
                </span>
                <span className="mt-3 text-sm font-semibold text-theme">
                  {metric.label}
                </span>
                <span className="mt-1 text-xs text-theme-m">
                  {metric.desc}
                </span>
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -bottom-6 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: GOLD }}
                />
              </div>
            );
          })}
        </div>

        {/* Testimonial */}
        <div
          className={cn(
            "mx-auto mt-16 max-w-2xl text-center transition-all duration-700 delay-500",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <blockquote className="text-lg italic leading-relaxed text-theme-s">
            &ldquo;For the first time, our product roadmap has a dollar sign next
            to every initiative. Engineering knows exactly what they&apos;re
            building and why it matters to the business.&rdquo;
          </blockquote>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div
              className="h-10 w-10 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, rgba(245,158,11,0.4))`,
              }}
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-theme">James Whitfield</p>
              <p className="text-xs text-theme-m">VP Revenue Operations, NovaTech</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   7. CTA — Start linking feedback to revenue
   ================================================================ */
function CTASection() {
  const { ref, inView } = useInView();

  return (
    <Section variant="rose" className="py-24 sm:py-32">
      <div ref={ref} className="text-center">
        {/* Gold glow background */}
        <div className="relative mx-auto max-w-[680px]">
          <div
            className="pointer-events-none absolute -inset-20 rounded-full opacity-20 blur-3xl"
            style={{ background: GOLD }}
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
                  borderColor: "rgba(245,158,11,0.3)",
                  background: GOLD_LIGHT,
                }}
              >
                <CircleDollarSign className="h-8 w-8" style={{ color: GOLD }} />
              </div>
            </div>

            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700 delay-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              Start linking feedback to{" "}
              <span style={{ color: GOLD }}>revenue</span>
            </h2>

            <p
              className={cn(
                "mx-auto mt-4 max-w-md text-theme-m transition-all duration-700 delay-200",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              Every day without revenue intelligence is another sprint spent
              building the wrong thing. See the dollar value behind every feature
              request.
            </p>

            <div
              className={cn(
                "mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center transition-all duration-700 delay-300",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              <Button asChild size="lg" className="w-full sm:w-auto gap-2">
                <Link href="/products/loop">
                  Explore LOOP
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto gap-2"
              >
                <Link href="/pricing">
                  View Pricing
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Supporting links */}
            <div
              className={cn(
                "mt-8 flex flex-wrap items-center justify-center gap-6 text-sm transition-all duration-700 delay-400",
                inView ? "opacity-100" : "opacity-0",
              )}
            >
              <Link
                href="/products/atlas"
                className="flex items-center gap-1.5 text-theme-s transition-colors hover:text-theme"
              >
                <Layers className="h-4 w-4 text-brand" />
                ATLAS Sprint Planner
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/products/loop"
                className="flex items-center gap-1.5 text-theme-s transition-colors hover:text-theme"
              >
                <Phone className="h-4 w-4" style={{ color: GOLD }} />
                LOOP Feedback Engine
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Trust signals */}
            <div
              className={cn(
                "mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-theme-m transition-all duration-700 delay-500",
                inView ? "opacity-100" : "opacity-0",
              )}
            >
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ background: GOLD }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ background: GOLD }}
                  />
                </span>
                Join 840+ teams on the waitlist
              </span>
              <span className="text-theme-f">|</span>
              <span>No credit card required</span>
              <span className="text-theme-f">|</span>
              <span>14-day free trial</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   PAGE COMPOSITION
   ================================================================ */
export default function RevenueIntelligencePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <BlindSpotSection />
      <SignalSourcesSection />
      <DashboardSection />
      <RevenueToSprintSection />
      <ROISection />
      <CTASection />
    </main>
  );
}

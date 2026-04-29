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
  Bell,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  DollarSign,
  Eye,
  FileText,
  Gauge,
  GitBranch,
  Infinity,
  Layers,
  LineChart,
  MessageSquare,
  Palette,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

/* ================================================================
   SOLUTIONS — PRODUCT LEADERS
   VP Product, PM, Head of Product
   Revenue-weighted backlogs, customer signal alignment
   ================================================================ */

const INDIGO = "#6366F1";
const INDIGO_LIGHT = "rgba(99, 102, 241, 0.12)";
const ATLAS_COLOR = "#f16e2c";
const DRIFT_COLOR = "#8B5CF6";

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
   HERO — Revenue-weighted backlogs, customer signal alignment
   ================================================================ */
function HeroSection() {
  const loaded = useReveal();

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-theme px-4 pb-24 pt-32">
      {/* Indigo radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 28%, rgba(99,102,241,0.14), transparent)",
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
            <Target className="h-3.5 w-3.5" />
            For Product Leaders
          </span>
        </div>

        {/* Headline */}
        <h1
          className={cn(
            "mx-auto mt-8 max-w-[900px] text-4xl font-semibold leading-[1.06] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-100",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          Revenue-weighted backlogs.{" "}
          <span style={{ color: INDIGO }}>Customer signal alignment.</span>
        </h1>

        {/* Subheadline */}
        <p
          className={cn(
            "mx-auto mt-6 max-w-[660px] text-lg leading-relaxed text-theme-m transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          Stop guessing what to build. Voatomy connects customer demand signals
          to engineering delivery so every sprint moves the revenue needle.
        </p>

        {/* Before/After disconnect visual */}
        <div
          className={cn(
            "mx-auto mt-14 max-w-[780px] transition-all duration-1000 delay-300",
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-90",
          )}
        >
          <DisconnectVisual />
        </div>

        {/* CTA */}
        <div
          className={cn(
            "mx-auto mt-12 flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center transition-all duration-700 delay-500",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <Button asChild size="lg" className="gap-2 text-white" style={{ background: INDIGO }}>
            <Link href="/products/loop">
              Explore LOOP
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="gap-2">
            <Link href="/pricing">
              View Pricing
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Roles */}
        <div
          className={cn(
            "mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-theme-m transition-all duration-700 delay-[600ms]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" style={{ color: INDIGO }} />
            VP Product &middot; Head of Product &middot; Senior PM
          </span>
          <span className="text-theme-f">|</span>
          <span>Used by 200+ product leaders</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Before/After disconnect visual ---------- */
function DisconnectVisual() {
  const beforeSteps = [
    { label: "Customer Feedback", icon: MessageSquare },
    { label: "???", icon: null },
    { label: "Engineering Priorities", icon: Layers },
  ];

  const afterSteps = [
    { label: "Customer Feedback", icon: MessageSquare },
    { label: "LOOP", icon: Infinity, accent: true },
    { label: "Revenue Backlog", icon: DollarSign },
    { label: "Engineering Sprint", icon: Zap },
  ];

  return (
    <div className="space-y-6">
      {/* BEFORE */}
      <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-red-400">
          Today -- The Disconnect
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {beforeSteps.map((step, i) => (
            <React.Fragment key={step.label}>
              {i > 0 && (
                <ArrowRight
                  className="h-4 w-4 shrink-0"
                  style={{ color: step.label === "???" ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.2)" }}
                />
              )}
              <div
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-4 py-2.5",
                  step.label === "???"
                    ? "border-red-500/30 bg-red-500/10"
                    : "border-theme bg-theme-subtle",
                )}
              >
                {step.icon && (
                  <step.icon
                    className="h-4 w-4"
                    style={{ color: step.label === "???" ? "#ef4444" : "rgba(255,255,255,0.4)" }}
                  />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    step.label === "???" ? "text-red-400" : "text-theme-s",
                  )}
                >
                  {step.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* AFTER */}
      <div
        className="rounded-2xl border p-5"
        style={{
          borderColor: "rgba(99,102,241,0.25)",
          background: "rgba(99,102,241,0.04)",
        }}
      >
        <p
          className="mb-4 text-xs font-bold uppercase tracking-widest"
          style={{ color: INDIGO }}
        >
          With Voatomy -- The Closed Loop
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {afterSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                {i > 0 && (
                  <ArrowRight className="h-4 w-4 shrink-0" style={{ color: INDIGO }} />
                )}
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-4 py-2.5",
                    step.accent
                      ? "shadow-lg"
                      : "border-theme bg-theme-subtle",
                  )}
                  style={
                    step.accent
                      ? {
                          borderColor: "rgba(99,102,241,0.4)",
                          background: "rgba(99,102,241,0.15)",
                          boxShadow: "0 4px 24px rgba(99,102,241,0.2)",
                        }
                      : undefined
                  }
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: step.accent ? INDIGO : "rgba(99,102,241,0.6)" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: step.accent ? INDIGO : undefined }}
                  >
                    {step.label}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   PAIN POINTS — 4 PM frustrations
   ================================================================ */
function PainPointsSection() {
  const { ref, inView } = useInView();

  const pains = [
    {
      icon: MessageSquare,
      title: "Customer feedback goes into a black hole",
      desc: "Requests get logged in spreadsheets, Slack threads, and CRM notes -- then quietly disappear. Nothing connects demand to delivery.",
      stat: "73% of PMs",
      statLabel: "say feedback is poorly tracked",
    },
    {
      icon: CircleDollarSign,
      title: "No way to quantify feature demand in dollars",
      desc: "You know customers want SSO, but is it worth $500K or $5M in pipeline? Without revenue weighting, prioritization is just gut feel.",
      stat: "$2.3M",
      statLabel: "avg pipeline stuck on missing features",
    },
    {
      icon: RefreshCcw,
      title: "Sales and engineering speak different languages",
      desc: "Sales talks deals and timelines. Engineering talks sprints and story points. Product sits in the middle, translating endlessly.",
      stat: "6 hrs/wk",
      statLabel: "spent syncing teams manually",
    },
    {
      icon: Bell,
      title: "Shipped features never reach the customers who asked",
      desc: "Engineering ships the feature. But the sales rep who needed it for the deal? They find out three weeks later -- after the deal is lost.",
      stat: "41%",
      statLabel: "of shipped features go unnoticed by sales",
    },
  ];

  return (
    <Section variant="coral" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor="#ef4444" className="mb-4">
            The Problem
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Sound familiar?{" "}
            <span className="text-red-400">Every PM knows this pain.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            Product leaders lose millions in pipeline every quarter because
            customer signals never make it to sprint planning.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {pains.map((pain, i) => {
            const Icon = pain.icon;
            return (
              <Card
                key={pain.title}
                variant="light"
                className={cn(
                  "group relative overflow-hidden transition-all duration-500 hover:border-red-500/20",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{ transitionDelay: `${i * 100 + 150}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-red-500/10 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-theme">{pain.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-theme-m">{pain.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1">
                      <span className="text-sm font-bold text-red-400">{pain.stat}</span>
                      <span className="text-xs text-red-400/70">{pain.statLabel}</span>
                    </div>
                  </div>
                </div>
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-500 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.06]" />
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   YOUR VOATOMY STACK — Products for PLs
   ================================================================ */
function ProductStackSection() {
  const { ref, inView } = useInView();

  const products = [
    {
      name: "LOOP",
      color: INDIGO,
      colorLight: INDIGO_LIGHT,
      icon: Infinity,
      tagline: "Revenue Feedback Engine",
      features: [
        "Revenue-weighted feature requests",
        "Customer signal aggregation",
        "Auto-generated sales briefs on ship",
        "Pipeline demand quantification",
      ],
      primary: true,
      href: "/products/loop",
    },
    {
      name: "ATLAS",
      color: ATLAS_COLOR,
      colorLight: "rgba(241, 110, 44, 0.12)",
      icon: Layers,
      tagline: "AI Sprint Planner",
      features: [
        "Sprint planning visibility",
        "Delivery tracking & velocity",
        "Code-aware estimation",
        "Cross-team dependency mapping",
      ],
      primary: false,
      href: "/products/atlas",
    },
    {
      name: "DRIFT",
      color: DRIFT_COLOR,
      colorLight: "rgba(139, 92, 246, 0.12)",
      icon: Palette,
      tagline: "Design Intelligence",
      features: [
        "Design system adoption tracking",
        "UX analytics & friction detection",
        "Figma-to-sprint scope alignment",
        "Component coverage reporting",
      ],
      primary: false,
      href: "/products/drift",
    },
  ];

  return (
    <Section variant="sky" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={INDIGO} className="mb-4">
            Your Voatomy Stack
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Three products.{" "}
            <span style={{ color: INDIGO }}>One unified view.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            The product leader stack that connects customer demand, engineering
            delivery, and design execution in a single command center.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <div
                key={product.name}
                className={cn(
                  "group relative flex flex-col rounded-2xl border p-6 transition-all duration-500 hover:shadow-xl",
                  product.primary ? "border-2" : "border-theme",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{
                  transitionDelay: `${i * 120 + 150}ms`,
                  borderColor: product.primary
                    ? product.color
                    : undefined,
                  background: "var(--bg-card)",
                }}
              >
                {product.primary && (
                  <span
                    className="absolute -top-3 left-6 rounded-full px-3 py-0.5 text-xs font-bold text-white"
                    style={{ background: product.color }}
                  >
                    Primary for PMs
                  </span>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: product.colorLight }}
                  >
                    <Icon className="h-6 w-6" style={{ color: product.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: product.color }}>
                      {product.name}
                    </h3>
                    <p className="text-xs text-theme-m">{product.tagline}</p>
                  </div>
                </div>

                <ul className="flex-1 space-y-3 mb-6">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-theme-s">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: product.color }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full gap-2 text-white"
                  style={{
                    background: product.primary ? product.color : "transparent",
                    border: product.primary ? "none" : `1px solid ${product.color}`,
                    color: product.primary ? "white" : product.color,
                  }}
                >
                  <Link href={product.href}>
                    Explore {product.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   REVENUE FEEDBACK LOOP — Creative step visualization
   ================================================================ */
function RevenueFeedbackLoopSection() {
  const { ref, inView } = useInView();

  const steps = [
    {
      step: "01",
      title: 'Customer says "We need SSO"',
      desc: "Signal captured from a Gong call with Acme Corp. Tagged to their $450K renewal and 3 open expansion opportunities.",
      icon: MessageSquare,
      detail: "Acme Corp -- $450K ARR",
      accent: "rgba(99,102,241,0.15)",
    },
    {
      step: "02",
      title: "LOOP captures $2.3M pipeline demand",
      desc: "SSO is requested by 14 accounts representing $2.3M in combined pipeline. LOOP auto-calculates revenue weight and priority score.",
      icon: DollarSign,
      detail: "14 accounts -- $2.3M pipeline",
      accent: "rgba(99,102,241,0.15)",
    },
    {
      step: "03",
      title: "PM prioritizes in revenue-weighted backlog",
      desc: "SSO moves to #1 in the backlog -- not because someone yelled loudest, but because the data shows $2.3M depends on it.",
      icon: Target,
      detail: "Priority: #1 -- Revenue-weighted",
      accent: "rgba(99,102,241,0.15)",
    },
    {
      step: "04",
      title: "Engineering ships in Sprint 26",
      desc: "ATLAS estimates 13 story points based on codebase analysis. Engineering delivers SSO in a single sprint with clear acceptance criteria.",
      icon: Zap,
      detail: "Sprint 26 -- 13 story points",
      accent: "rgba(241,110,44,0.12)",
    },
    {
      step: "05",
      title: "LOOP auto-generates all collateral",
      desc: "On ship, LOOP creates a sales brief, CS talking points, marketing changelog entry, and deal-specific follow-up scripts.",
      icon: FileText,
      detail: "4 assets auto-generated",
      accent: "rgba(18,255,128,0.1)",
    },
    {
      step: "06",
      title: "Customer gets notified. Renewal secured.",
      desc: "Acme Corp's CSM receives a personalized script. The sales rep gets a deal alert. The customer gets notified. Renewal signed within a week.",
      icon: CheckCircle2,
      detail: "$450K renewal -- secured",
      accent: "rgba(18,255,128,0.1)",
    },
  ];

  return (
    <Section variant="white" className="py-20 sm:py-28 overflow-hidden">
      <div ref={ref}>
        <div className="text-center mb-16">
          <Chip dotColor={INDIGO} className="mb-4">
            The Revenue Feedback Loop
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            From customer signal to{" "}
            <span style={{ color: INDIGO }}>closed revenue</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            Watch a single feature request flow through the entire loop -- from
            demand capture to renewal secured.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-[800px]">
          {/* Vertical connector line */}
          <div
            className="absolute left-[23px] top-0 hidden h-full w-px sm:block"
            style={{
              background: `linear-gradient(to bottom, transparent, ${INDIGO}, ${INDIGO}, transparent)`,
            }}
          />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className={cn(
                    "group relative flex gap-6 transition-all duration-600",
                    inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6",
                  )}
                  style={{ transitionDelay: `${i * 120 + 200}ms` }}
                >
                  {/* Step number circle */}
                  <div
                    className="relative z-[1] grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 text-sm font-bold text-white shadow-lg"
                    style={{
                      borderColor: INDIGO,
                      background: i === steps.length - 1 ? "#12FF80" : INDIGO,
                      color: i === steps.length - 1 ? "#0a0a0a" : "white",
                      boxShadow: `0 4px 20px ${i === steps.length - 1 ? "rgba(18,255,128,0.3)" : "rgba(99,102,241,0.3)"}`,
                    }}
                  >
                    {step.step}
                  </div>

                  {/* Content card */}
                  <div
                    className="flex-1 rounded-2xl border border-theme p-5 transition-all duration-300 group-hover:shadow-lg"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-theme">{step.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-theme-m">
                          {step.desc}
                        </p>
                      </div>
                      <div
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{ background: step.accent }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{
                            color: i >= 4 ? "#12FF80" : INDIGO,
                          }}
                        />
                      </div>
                    </div>

                    {/* Detail badge */}
                    <div
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        background: step.accent,
                        color: i >= 4 ? "#12FF80" : INDIGO,
                      }}
                    >
                      <TrendingUp className="h-3 w-3" />
                      {step.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Loop-back arrow */}
          <div
            className={cn(
              "mt-8 flex items-center justify-center gap-3 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
            style={{ transitionDelay: "1000ms" }}
          >
            <RefreshCcw className="h-5 w-5 animate-[spin_4s_linear_infinite]" style={{ color: INDIGO }} />
            <span className="text-sm font-semibold" style={{ color: INDIGO }}>
              Loop repeats -- every signal, every sprint, every ship
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   FEATURE DEMAND DASHBOARD — Mock UI
   ================================================================ */
function FeatureDemandDashboardSection() {
  const { ref, inView } = useInView();

  const features = [
    { name: "SSO / SAML", requests: 14, pipeline: "$2.3M", accounts: "Acme, Bolt, Zephyr +11", status: "In Sprint", statusColor: INDIGO },
    { name: "Custom Webhooks", requests: 11, pipeline: "$1.7M", accounts: "CloudBase, Nexio +9", status: "Backlog #2", statusColor: "rgba(99,102,241,0.6)" },
    { name: "Advanced RBAC", requests: 9, pipeline: "$1.2M", accounts: "FinTrust, RegulaCo +7", status: "Backlog #3", statusColor: "rgba(99,102,241,0.4)" },
    { name: "API Rate Limiting", requests: 7, pipeline: "$890K", accounts: "StreamLabs, DataFlow +5", status: "Next Quarter", statusColor: "rgba(255,255,255,0.3)" },
    { name: "Audit Log Export", requests: 6, pipeline: "$620K", accounts: "CompliancePro +5", status: "Evaluating", statusColor: "rgba(255,255,255,0.2)" },
  ];

  return (
    <Section variant="coral" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={INDIGO} className="mb-4">
            Feature Demand Dashboard
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Every feature request,{" "}
            <span style={{ color: INDIGO }}>priced in dollars</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            See what customers want, how much pipeline depends on it, and where
            each feature sits in the delivery lifecycle.
          </p>
        </div>

        {/* Mock dashboard */}
        <div
          className={cn(
            "mx-auto max-w-[1000px] rounded-2xl border border-theme bg-theme-subtle shadow-2xl transition-all duration-1000",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
          style={{ boxShadow: "0 24px 80px rgba(99,102,241,0.08)" }}
        >
          {/* Window bar */}
          <div className="flex items-center gap-2 border-b border-theme px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="ml-4 flex items-center gap-1.5 text-xs text-theme-f">
              <BarChart3 className="h-3 w-3" style={{ color: INDIGO }} />
              Feature Demand -- Revenue Impact View
            </span>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-2 gap-4 p-5 md:grid-cols-4">
            <DashboardMetric label="Total Pipeline at Risk" value="$6.7M" color={INDIGO} />
            <DashboardMetric label="Features Requested" value="47" color={INDIGO} />
            <DashboardMetric label="Accounts with Requests" value="89" color="#12FF80" />
            <DashboardMetric label="Signal-to-Ship Avg" value="18 days" color="#12FF80" />
          </div>

          {/* Feature demand table */}
          <div className="px-5 pb-5">
            <div className="rounded-xl border border-theme overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr] gap-4 border-b border-theme bg-theme-subtle px-4 py-2.5 text-xs font-semibold text-theme-m">
                <span>Feature</span>
                <span className="text-right">Requests</span>
                <span className="text-right">Pipeline</span>
                <span className="hidden sm:block">Top Accounts</span>
                <span className="text-right">Status</span>
              </div>

              {/* Table rows */}
              {features.map((feat, i) => (
                <div
                  key={feat.name}
                  className={cn(
                    "grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr] gap-4 border-b border-theme px-4 py-3 text-sm transition-all duration-500 last:border-0 hover:bg-theme-subtle",
                    inView ? "opacity-100" : "opacity-0",
                  )}
                  style={{ transitionDelay: `${i * 80 + 400}ms` }}
                >
                  <span className="font-medium text-theme">{feat.name}</span>
                  <span className="text-right text-theme-s">{feat.requests}</span>
                  <span className="text-right font-semibold" style={{ color: INDIGO }}>
                    {feat.pipeline}
                  </span>
                  <span className="hidden text-xs text-theme-m sm:block">{feat.accounts}</span>
                  <span className="text-right">
                    <span
                      className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{
                        background: `${feat.statusColor}20`,
                        color: feat.statusColor,
                      }}
                    >
                      {feat.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom charts row */}
          <div className="grid grid-cols-1 gap-4 px-5 pb-5 lg:grid-cols-2">
            {/* Pipeline impact bar chart */}
            <div className="rounded-xl border border-theme bg-theme-subtle p-4">
              <p className="mb-3 text-xs font-semibold text-theme-s">
                Pipeline Impact per Feature
              </p>
              <div className="flex items-end gap-2 h-24">
                {[
                  { label: "SSO", pct: 100, val: "$2.3M" },
                  { label: "Webhooks", pct: 74, val: "$1.7M" },
                  { label: "RBAC", pct: 52, val: "$1.2M" },
                  { label: "Rate Limit", pct: 39, val: "$890K" },
                  { label: "Audit", pct: 27, val: "$620K" },
                ].map((bar) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[9px] font-medium" style={{ color: INDIGO }}>
                      {bar.val}
                    </span>
                    <div
                      className="w-full rounded-t-md transition-all duration-1000"
                      style={{
                        height: `${bar.pct}%`,
                        background: `linear-gradient(to top, rgba(99,102,241,0.3), rgba(99,102,241,0.7))`,
                      }}
                    />
                    <span className="text-[9px] text-theme-f">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Account demand breakdown */}
            <div className="rounded-xl border border-theme bg-theme-subtle p-4">
              <p className="mb-3 text-xs font-semibold text-theme-s">
                Account-Level Demand Breakdown
              </p>
              <div className="space-y-2.5">
                {[
                  { name: "Acme Corp", arr: "$450K", features: 6, health: 92 },
                  { name: "Bolt Technologies", arr: "$320K", features: 4, health: 78 },
                  { name: "Zephyr Inc", arr: "$280K", features: 5, health: 85 },
                  { name: "CloudBase", arr: "$210K", features: 3, health: 71 },
                ].map((acct) => (
                  <div key={acct.name} className="flex items-center gap-3 text-xs">
                    <div
                      className="h-6 w-6 shrink-0 rounded-md grid place-items-center text-[8px] font-bold text-white"
                      style={{ background: INDIGO }}
                    >
                      {acct.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-theme truncate">{acct.name}</span>
                        <span className="text-theme-m ml-2">{acct.arr} ARR</span>
                      </div>
                      <div className="mt-1 flex gap-2">
                        <span className="text-theme-f">{acct.features} requests</span>
                        <span className="text-theme-f">&middot;</span>
                        <span style={{ color: acct.health >= 80 ? "#12FF80" : "#f59e0b" }}>
                          {acct.health}% health
                        </span>
                      </div>
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

function DashboardMetric({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-theme bg-theme-subtle p-4">
      <p className="text-xs text-theme-m">{label}</p>
      <p className="mt-1 text-2xl font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

/* ================================================================
   CROSS-TEAM VISIBILITY
   ================================================================ */
function CrossTeamVisibilitySection() {
  const { ref, inView } = useInView();

  const views = [
    {
      icon: Gauge,
      title: "Engineering Velocity",
      desc: "See sprint throughput, cycle times, and delivery predictability without attending standup. Know if the SSO feature will hit the target date.",
      metrics: ["Sprint velocity: 42 pts/sprint", "Cycle time: 4.2 days", "Predictability: 87%"],
      color: ATLAS_COLOR,
      colorLight: "rgba(241,110,44,0.12)",
    },
    {
      icon: Palette,
      title: "Design Scope",
      desc: "Track design system adoption, Figma-to-code coverage, and UX friction points. See which designs are in review, approved, or blocked.",
      metrics: ["Design coverage: 94%", "Components used: 312", "Friction hotspots: 3"],
      color: DRIFT_COLOR,
      colorLight: "rgba(139,92,246,0.12)",
    },
    {
      icon: LineChart,
      title: "Customer Impact",
      desc: "Every sprint, see which accounts are impacted by shipped features. Track signal-to-ship time and revenue influenced per release.",
      metrics: ["Revenue influenced: $1.4M", "Accounts impacted: 23", "Signal-to-ship: 18d"],
      color: INDIGO,
      colorLight: INDIGO_LIGHT,
    },
  ];

  return (
    <Section variant="sky" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={INDIGO} className="mb-4">
            Cross-Team Visibility
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Engineering, design, and impact --{" "}
            <span style={{ color: INDIGO }}>one view</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-theme-m">
            Product leaders need the full picture. See velocity, design progress,
            and customer impact without switching tools or asking for updates.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {views.map((view, i) => {
            const Icon = view.icon;
            return (
              <div
                key={view.title}
                className={cn(
                  "group rounded-2xl border border-theme p-6 transition-all duration-500 hover:shadow-lg",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{
                  transitionDelay: `${i * 120 + 150}ms`,
                  background: "var(--bg-card)",
                }}
              >
                <div
                  className="mb-5 grid h-12 w-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: view.colorLight }}
                >
                  <Icon className="h-6 w-6" style={{ color: view.color }} />
                </div>

                <h3 className="text-lg font-semibold text-theme">{view.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-theme-m">{view.desc}</p>

                {/* Live metrics mock */}
                <div className="mt-5 space-y-2 rounded-xl border border-theme bg-theme-subtle p-3">
                  {view.metrics.map((metric) => {
                    const [label, val] = metric.split(": ");
                    return (
                      <div key={metric} className="flex items-center justify-between text-xs">
                        <span className="text-theme-m">{label}</span>
                        <span className="font-semibold" style={{ color: view.color }}>
                          {val}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Connector strip */}
        <div
          className={cn(
            "mx-auto mt-10 flex items-center justify-center gap-4 transition-all duration-700",
            inView ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="h-px flex-1 max-w-[100px]" style={{ background: ATLAS_COLOR }} />
          <div
            className="flex items-center gap-2 rounded-full border px-4 py-2"
            style={{
              borderColor: "rgba(99,102,241,0.3)",
              background: INDIGO_LIGHT,
            }}
          >
            <Eye className="h-4 w-4" style={{ color: INDIGO }} />
            <span className="text-xs font-semibold" style={{ color: INDIGO }}>
              Unified Product Command Center
            </span>
          </div>
          <div className="h-px flex-1 max-w-[100px]" style={{ background: DRIFT_COLOR }} />
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   TESTIMONIALS
   ================================================================ */
function TestimonialsSection() {
  const { ref, inView } = useInView();

  const testimonials = [
    {
      quote:
        "Before Voatomy, I had to manually pull data from Salesforce, cross-reference Gong transcripts, and beg engineering for sprint updates. Now I open one dashboard and see exactly where customer demand meets delivery.",
      name: "Sarah Chen",
      role: "VP Product, ScaleFlow",
      metric: "6 hrs/wk saved on syncs",
    },
    {
      quote:
        "The revenue-weighted backlog changed everything. We stopped arguing about what to build and started using data. Our first sprint with LOOP shipped a feature that unblocked $800K in pipeline.",
      name: "Marcus Rivera",
      role: "Head of Product, TerraStack",
      metric: "$800K pipeline unblocked",
    },
    {
      quote:
        "What sold me was the closed loop. Engineering ships a feature, and sales gets a brief the same day. No more 'did we ship that yet?' messages. Our time-to-close dropped by a third.",
      name: "Priya Patel",
      role: "Senior PM, CloudSync",
      metric: "33% faster time-to-close",
    },
  ];

  return (
    <Section variant="coral" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={INDIGO} className="mb-4">
            What Product Leaders Say
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Trusted by{" "}
            <span style={{ color: INDIGO }}>product leaders</span> who ship
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={cn(
                "group flex flex-col rounded-2xl border border-theme p-6 transition-all duration-500 hover:shadow-lg",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{
                transitionDelay: `${i * 100 + 150}ms`,
                background: "var(--bg-card)",
              }}
            >
              {/* Quote */}
              <blockquote className="flex-1 text-sm italic leading-relaxed text-theme-s">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Metric badge */}
              <div
                className="mt-5 mb-5 inline-flex self-start items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: INDIGO_LIGHT,
                  color: INDIGO,
                }}
              >
                <TrendingUp className="h-3 w-3" />
                {t.metric}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-theme pt-5">
                <div
                  className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${INDIGO}, rgba(99,102,241,0.4))`,
                  }}
                >
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-theme">{t.name}</p>
                  <p className="text-xs text-theme-m">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   CTA — Start aligning product with revenue
   ================================================================ */
function CTASection() {
  const { ref, inView } = useInView();

  return (
    <Section variant="sky" className="py-24 sm:py-32">
      <div ref={ref} className="text-center">
        {/* Indigo glow */}
        <div className="relative mx-auto max-w-[720px]">
          <div
            className="pointer-events-none absolute -inset-24 rounded-full opacity-25 blur-3xl"
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
                <Target className="h-8 w-8" style={{ color: INDIGO }} />
              </div>
            </div>

            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 transition-all duration-700 delay-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              Start aligning product{" "}
              <span style={{ color: INDIGO }}>with revenue</span>
            </h2>

            <p
              className={cn(
                "mx-auto mt-4 max-w-lg text-theme-m transition-all duration-700 delay-200",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              Stop guessing. Start building what drives revenue. Join the product
              leaders who use Voatomy to connect customer demand to engineering
              delivery.
            </p>

            <div
              className={cn(
                "mx-auto mt-10 flex max-w-md flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-700 delay-300",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              <Button asChild size="lg" className="gap-2 text-white w-full sm:w-auto" style={{ background: INDIGO }}>
                <Link href="/products/loop">
                  <Infinity className="h-4 w-4" />
                  Explore LOOP
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="gap-2 w-full sm:w-auto">
                <Link href="/pricing">
                  View Pricing
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Bottom links */}
            <div
              className={cn(
                "mt-10 flex flex-wrap items-center justify-center gap-6 text-sm transition-all duration-700 delay-400",
                inView ? "opacity-100" : "opacity-0",
              )}
            >
              <Link
                href="/products/atlas"
                className="flex items-center gap-1.5 text-theme-s transition-colors hover:text-theme"
              >
                <Layers className="h-4 w-4" style={{ color: ATLAS_COLOR }} />
                Explore ATLAS
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/products/drift"
                className="flex items-center gap-1.5 text-theme-s transition-colors hover:text-theme"
              >
                <Palette className="h-4 w-4" style={{ color: DRIFT_COLOR }} />
                Explore DRIFT
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/"
                className="flex items-center gap-1.5 text-theme-s transition-colors hover:text-theme"
              >
                <Sparkles className="h-4 w-4" style={{ color: INDIGO }} />
                Voatomy Platform
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Trust bar */}
            <div
              className={cn(
                "mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-theme-m transition-all duration-700 delay-500",
                inView ? "opacity-100" : "opacity-0",
              )}
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" style={{ color: INDIGO }} />
                SOC 2 compliant
              </span>
              <span className="text-theme-f">|</span>
              <span className="flex items-center gap-1.5">
                <GitBranch className="h-3.5 w-3.5" style={{ color: INDIGO }} />
                GitHub &amp; GitLab integrations
              </span>
              <span className="text-theme-f">|</span>
              <span>14-day free trial</span>
              <span className="text-theme-f">|</span>
              <span>No credit card required</span>
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
export default function ProductLeadersSolutionPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <PainPointsSection />
      <ProductStackSection />
      <RevenueFeedbackLoopSection />
      <FeatureDemandDashboardSection />
      <CrossTeamVisibilitySection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoopIllustration } from "@/components/illustrations/product-illustrations";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  Check,
  CircleDot,
  DollarSign,
  FileText,
  Headphones,
  Infinity,
  Layers,
  LineChart,
  Mail,
  Shield,
  MessageSquare,
  Mic,
  Phone,
  Repeat2,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  Database,
  GitMerge,
  Gauge,
  Activity,
  Cpu,
  Filter,
  Megaphone,
  ChevronRight,
} from "lucide-react";
import { usePricing } from "@/hooks/use-pricing";
import { buildProductCheckoutUrl } from "@/lib/product-purchase";

/* ================================================================
   LOOP — Revenue Feedback Engine
   Product Landing Page
   ================================================================ */

const LOOP_COLOR = "#6366F1";
const LOOP_COLOR_LIGHT = "rgba(99, 102, 241, 0.12)";

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
   HERO
   ================================================================ */
function HeroSection() {
  const loaded = useReveal();

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-theme px-4 pb-24 pt-24 text-charcoal">
      {/* Premium hero background */}
      <div className="product-hero-gradient" style={{ "--hero-gradient": "radial-gradient(ellipse, #6366f1, transparent 70%)", "--hero-gradient-secondary": "radial-gradient(ellipse, #8b5cf6, transparent 70%)" } as React.CSSProperties} />
      <div className="pointer-events-none absolute inset-0 fine-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 noise-overlay" aria-hidden="true" />

      <div className="relative z-[2] mx-auto max-w-container text-center">
        {/* Badge */}
        <div
          className={cn(
            "transition-all duration-700 flex items-center justify-center gap-3",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold backdrop-blur-sm"
            style={{
              borderColor: "rgba(99,102,241,0.3)",
              background: LOOP_COLOR_LIGHT,
              color: LOOP_COLOR,
            }}
          >
            <span
              className="h-2 w-2 rounded-full animate-glow-pulse"
              style={{ background: LOOP_COLOR }}
            />
            Available on Pro &amp; Business
          </span>
          <span className="enterprise-badge">
            <Shield className="h-3 w-3" />
            Enterprise Ready
          </span>
        </div>

        {/* Headline */}
        <h1
          className={cn(
            "mx-auto mt-8 max-w-[860px] text-4xl font-semibold leading-[1.06] tracking-tight text-[#073127] sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-100",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          Close the loop between{" "}
          <span style={{ color: LOOP_COLOR }}>customer demand</span> and{" "}
          <span style={{ color: LOOP_COLOR }}>engineering delivery</span>
        </h1>

        {/* Subheadline */}
        <p
          className={cn(
            "mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-[#333F3C]/80 transition-all duration-700 delay-200",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          LOOP is the revenue feedback engine that turns sales calls, support
          tickets, and churn signals into prioritized engineering work -- then
          pushes ship updates back to every revenue team automatically.
        </p>

        {/* Animated feedback loop visual */}
        <div
          className={cn(
            "mx-auto mt-14 flex items-center justify-center transition-all duration-1000 delay-300",
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-90",
          )}
        >
          <FeedbackLoopVisual />
        </div>

        {/* CTA */}
        <div
          className={cn(
            "mx-auto mt-12 flex max-w-lg flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center transition-all duration-700 delay-500",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <Button
            size="lg"
            className="w-full gap-2 text-white sm:w-auto"
            style={{ background: LOOP_COLOR }}
            asChild
          >
            <Link href={buildProductCheckoutUrl({ product: "loop", plan: "pro" })}>
              Start 14-day trial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto"
            asChild
          >
            <Link href="/pricing">View pricing</Link>
          </Button>
        </div>

        {/* Meta */}
        <div
          className={cn(
            "mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-charcoal/70 transition-all duration-700 delay-[600ms]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" style={{ color: LOOP_COLOR }} />
            PMs &middot; Sales &middot; Marketing &middot; CS
          </span>
          <span className="text-charcoal/40">|</span>
          <span>Add-on from $6/user/mo (billed annually)</span>
          <span className="text-charcoal/40">|</span>
          <span>14-day trial, then subscribe on-site</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- animated feedback loop infinity diagram ---------- */
function FeedbackLoopVisual() {
  const nodes = [
    { label: "Customers", icon: Headphones, angle: 0 },
    { label: "Sales", icon: Phone, angle: 45 },
    { label: "Product", icon: Target, angle: 90 },
    { label: "Engineering", icon: Layers, angle: 135 },
    { label: "Ship", icon: Zap, angle: 180 },
    { label: "Marketing", icon: Send, angle: 225 },
    { label: "CS", icon: MessageSquare, angle: 270 },
    { label: "Revenue", icon: DollarSign, angle: 315 },
  ];

  return (
    <div className="relative h-[320px] w-[320px] sm:h-[380px] sm:w-[380px]">
      {/* Outer ring */}
      <div
        className="absolute inset-4 rounded-full border-2 border-dashed animate-[spin_30s_linear_infinite]"
        style={{ borderColor: "rgba(99,102,241,0.25)" }}
      />
      {/* Inner ring */}
      <div
        className="absolute inset-16 rounded-full border animate-[spin_20s_linear_infinite_reverse]"
        style={{ borderColor: "rgba(99,102,241,0.15)" }}
      />
      {/* Center infinity */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center gap-1 rounded-2xl border px-4 py-2"
          style={{
            borderColor: "rgba(99,102,241,0.3)",
            background: "rgba(99,102,241,0.08)",
          }}
        >
          <Infinity className="h-6 w-6" style={{ color: LOOP_COLOR }} />
          <span
            className="text-sm font-bold tracking-wider"
            style={{ color: LOOP_COLOR }}
          >
            LOOP
          </span>
        </div>
      </div>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const r = 46;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        const Icon = node.icon;
        return (
          <div
            key={node.label}
            className="absolute flex flex-col items-center gap-1"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${i * 0.12}s`,
            }}
          >
            <div
              className="grid h-10 w-10 place-items-center rounded-xl border shadow-lg sm:h-11 sm:w-11"
              style={{
                borderColor: "rgba(99,102,241,0.3)",
                background: "rgba(99,102,241,0.1)",
                boxShadow: `0 4px 24px rgba(99,102,241,0.15)`,
              }}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: LOOP_COLOR }} />
            </div>
            <span className="text-[10px] font-medium text-charcoal/70 sm:text-xs">
              {node.label}
            </span>
          </div>
        );
      })}

      {/* Pulsing data dots */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`dot-${i}`}
          className="absolute h-2 w-2 rounded-full animate-[spin_8s_linear_infinite]"
          style={{
            background: LOOP_COLOR,
            left: `${50 + 38 * Math.cos((i * Math.PI) / 2 + Date.now() / 3000)}%`,
            top: `${50 + 38 * Math.sin((i * Math.PI) / 2 + Date.now() / 3000)}%`,
            animationDelay: `${i * 2}s`,
            boxShadow: `0 0 12px ${LOOP_COLOR}`,
          }}
        />
      ))}
    </div>
  );
}

/* ================================================================
   THE LOOP VISUALIZATION (full-width)
   ================================================================ */
function LoopVisualizationSection() {
  const { ref, inView } = useInView();

  const inbound = [
    { label: "Sales Calls", icon: Mic, desc: "Gong transcripts analyzed" },
    { label: "Support Tickets", icon: Headphones, desc: "Zendesk signals extracted" },
    { label: "Churn Signals", icon: Bell, desc: "At-risk accounts flagged" },
    { label: "NPS / CSAT", icon: BarChart3, desc: "Sentiment trends tracked" },
  ];

  const processing = [
    { label: "AI Aggregation", icon: BrainCircuit },
    { label: "Revenue Weighting", icon: DollarSign },
    { label: "Priority Scoring", icon: Target },
  ];

  const outbound = [
    { label: "Sales Briefs", icon: FileText, desc: "Deal-ready feature updates" },
    { label: "Marketing Copy", icon: BookOpen, desc: "Ship announcements drafted" },
    { label: "CS Talking Points", icon: MessageSquare, desc: "Renewal ammo generated" },
    { label: "Deal Risk Alerts", icon: Shield, desc: "Revenue protection signals" },
  ];

  return (
    <Section variant="violet" className="py-20 sm:py-28 overflow-hidden">
      <div ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <Chip dotColor={LOOP_COLOR} className="mb-4">
            How it works
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            The closed-loop{" "}
            <span style={{ color: LOOP_COLOR }}>revenue engine</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal/70">
            Every customer signal flows in, gets weighted by revenue impact,
            prioritized by AI, and when features ship -- every revenue team gets
            armed automatically.
          </p>
        </div>

        {/* Three-column flow */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* INBOUND */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div
                className="grid h-8 w-8 place-items-center rounded-lg"
                style={{ background: LOOP_COLOR_LIGHT }}
              >
                <ArrowRight className="h-4 w-4" style={{ color: LOOP_COLOR }} />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: LOOP_COLOR }}>
                Inbound Signals
              </span>
            </div>
            {inbound.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border border-theme bg-theme-subtle p-4 transition-all duration-500",
                    inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
                  )}
                  style={{ transitionDelay: `${i * 100 + 200}ms` }}
                >
                  <div
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                    style={{ background: LOOP_COLOR_LIGHT }}
                  >
                    <Icon className="h-5 w-5" style={{ color: LOOP_COLOR }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{item.label}</p>
                    <p className="text-xs text-charcoal/70">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PROCESSING (center) */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div
              className="hidden lg:block h-full w-px"
              style={{ background: `linear-gradient(to bottom, transparent, ${LOOP_COLOR}, transparent)` }}
            />
            <div className="flex lg:flex-col items-center gap-4">
              {processing.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={cn(
                      "flex flex-col items-center gap-2 transition-all duration-700",
                      inView ? "opacity-100 scale-100" : "opacity-0 scale-75",
                    )}
                    style={{ transitionDelay: `${i * 150 + 400}ms` }}
                  >
                    <div
                      className="grid h-14 w-14 place-items-center rounded-2xl border shadow-lg"
                      style={{
                        borderColor: "rgba(99,102,241,0.4)",
                        background: `linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.05))`,
                        boxShadow: `0 8px 32px rgba(99,102,241,0.2)`,
                      }}
                    >
                      <Icon className="h-6 w-6" style={{ color: LOOP_COLOR }} />
                    </div>
                    <span className="text-xs font-medium text-charcoal/80 text-center">
                      {item.label}
                    </span>
                    {i < processing.length - 1 && (
                      <div
                        className="hidden lg:block h-6 w-px"
                        style={{ background: "rgba(99,102,241,0.3)" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div
              className="hidden lg:block h-full w-px"
              style={{ background: `linear-gradient(to bottom, ${LOOP_COLOR}, transparent)` }}
            />
          </div>

          {/* OUTBOUND */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div
                className="grid h-8 w-8 place-items-center rounded-lg"
                style={{ background: "rgba(18,255,128,0.12)" }}
              >
                <ArrowUpRight className="h-4 w-4 text-brand" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-brand">
                Outbound Intelligence
              </span>
            </div>
            {outbound.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border border-theme bg-theme-subtle p-4 transition-all duration-500",
                    inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
                  )}
                  style={{ transitionDelay: `${i * 100 + 200}ms` }}
                >
                  <div
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                    style={{ background: "rgba(18,255,128,0.1)" }}
                  >
                    <Icon className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{item.label}</p>
                    <p className="text-xs text-charcoal/70">{item.desc}</p>
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
   INBOUND INTELLIGENCE
   ================================================================ */
function InboundIntelligenceSection() {
  const { ref, inView } = useInView();

  const cards = [
    {
      icon: Mic,
      title: "Signal Extraction from Gong Calls",
      desc: "AI listens to every sales and CS call, extracting feature requests, objections, competitive mentions, and pain points -- tagged to accounts and revenue.",
      stat: "340+ signals/week",
    },
    {
      icon: Headphones,
      title: "Support Ticket Analysis",
      desc: "Cluster Zendesk and Intercom tickets by theme. Surface recurring friction automatically, weighted by account tier and renewal date.",
      stat: "12x faster triage",
    },
    {
      icon: Bell,
      title: "Churn Signal Detection",
      desc: "Combine usage drops, support escalations, NPS declines, and engagement loss into a composite churn risk score for every account.",
      stat: "31% churn reduction",
    },
    {
      icon: DollarSign,
      title: "Revenue-Weighted Requests",
      desc: "Stop building for the loudest voice. LOOP weights every feature request by ARR, expansion potential, segment, and strategic fit.",
      stat: "$2.3M pipeline clarity",
    },
  ];

  return (
    <Section variant="sky" className="py-20 sm:py-28">
      <div ref={ref} className="text-center mb-14">
        <Chip dotColor={LOOP_COLOR} className="mb-4">
          Inbound Intelligence
        </Chip>
        <h2
          className={cn(
            "text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          Every signal, <span style={{ color: LOOP_COLOR }}>revenue-weighted</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-charcoal/70">
          LOOP ingests signals from every customer touchpoint and ranks them by
          what actually matters -- revenue impact.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
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
                  style={{ background: LOOP_COLOR_LIGHT }}
                >
                  <Icon className="h-6 w-6" style={{ color: LOOP_COLOR }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-charcoal">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{card.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-theme-subtle px-3 py-1 text-xs font-semibold" style={{ color: LOOP_COLOR }}>
                    <TrendingUp className="h-3 w-3" />
                    {card.stat}
                  </div>
                </div>
              </div>
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: LOOP_COLOR }}
              />
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

/* ================================================================
   OUTBOUND INTELLIGENCE
   ================================================================ */
function OutboundIntelligenceSection() {
  const { ref, inView } = useInView();

  const features = [
    {
      icon: FileText,
      title: "Auto-Generated Sales Enablement",
      desc: "When a feature ships, LOOP writes sales briefs explaining the customer impact, competitive positioning, and deal-specific talking points.",
    },
    {
      icon: BookOpen,
      title: "Marketing Copy from Ships",
      desc: "Turn release notes into blog post drafts, changelog entries, and social copy -- all grounded in the customer demand that drove the feature.",
    },
    {
      icon: MessageSquare,
      title: "CS Talking Points",
      desc: "Customer Success gets auto-generated renewal and expansion scripts, linking shipped features to each account's specific requests.",
    },
    {
      icon: Shield,
      title: "Deal Risk Alerts",
      desc: "When a deal depends on a feature still in progress, LOOP surfaces the risk. When it ships, the account team gets notified instantly.",
    },
  ];

  return (
    <Section variant="white" className="py-20 sm:py-28">
      <div ref={ref} className="text-center mb-14">
        <Chip dotColor="#12FF80" className="mb-4">
          Outbound Intelligence
        </Chip>
        <h2
          className={cn(
            "text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          Every ship, <span className="text-brand">amplified</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-charcoal/70">
          Features don't die in release notes. LOOP ensures every ship reaches
          the teams who can turn it into revenue.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className={cn(
                "group rounded-2xl border border-theme p-6 transition-all duration-500 hover:border-brand/30 hover:shadow-lg",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{
                transitionDelay: `${i * 80 + 150}ms`,
                background: "var(--bg-card)",
              }}
            >
              <div
                className="mb-4 grid h-11 w-11 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(18,255,128,0.1)" }}
              >
                <Icon className="h-5 w-5 text-brand" />
              </div>
              <h3 className="text-base font-semibold text-charcoal">{feat.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{feat.desc}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ================================================================
   REVENUE IMPACT DASHBOARD MOCK
   ================================================================ */
function DashboardSection() {
  const { ref, inView } = useInView();

  return (
    <Section variant="violet" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={LOOP_COLOR} className="mb-4">
            Revenue Impact Dashboard
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Revenue intelligence,{" "}
            <span style={{ color: LOOP_COLOR }}>at a glance</span>
          </h2>
        </div>

        {/* Mock dashboard */}
        <div
          className={cn(
            "mx-auto max-w-[960px] rounded-2xl border border-theme bg-theme-subtle shadow-2xl transition-all duration-1000",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
          style={{ boxShadow: `0 24px 80px rgba(99,102,241,0.08)` }}
        >
          {/* Window bar */}
          <div className="flex items-center gap-2 border-b border-theme px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="ml-4 flex items-center gap-1.5 text-xs text-charcoal/45">
              <Infinity className="h-3 w-3" style={{ color: LOOP_COLOR }} />
              LOOP Dashboard &mdash; Revenue Impact
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Pipeline Blocked */}
            <DashboardCard
              label="Pipeline Blocked"
              value="$1.8M"
              change="-23% vs last sprint"
              changePositive
              color={LOOP_COLOR}
            />
            {/* Revenue Influenced */}
            <DashboardCard
              label="Revenue Influenced"
              value="$3.2M"
              change="+41% this quarter"
              changePositive
              color="#12FF80"
            />
            {/* Signals Processed */}
            <DashboardCard
              label="Signals / Day"
              value="136"
              change="+18 from last week"
              changePositive
              color={LOOP_COLOR}
            />
            {/* Account Health */}
            <DashboardCard
              label="Avg Account Health"
              value="87%"
              change="+5pts this month"
              changePositive
              color="#12FF80"
            />
          </div>

          {/* Second row - feature demand + chart */}
          <div className="grid grid-cols-1 gap-4 px-6 pb-6 lg:grid-cols-2">
            {/* Feature demand heatmap mock */}
            <div className="rounded-xl border border-theme bg-theme-subtle p-4">
              <p className="mb-3 text-xs font-semibold text-charcoal/80">
                Feature Demand Heatmap
              </p>
              <div className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: 25 }).map((_, i) => {
                  const intensity = [0.1, 0.2, 0.35, 0.55, 0.8, 0.95][Math.floor(Math.random() * 6)];
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-md transition-colors"
                      style={{
                        background: `rgba(99,102,241,${intensity})`,
                      }}
                    />
                  );
                })}
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-charcoal/45">
                <span>Low demand</span>
                <div className="flex gap-1">
                  {[0.15, 0.3, 0.5, 0.7, 0.9].map((o) => (
                    <div
                      key={o}
                      className="h-2 w-4 rounded-sm"
                      style={{ background: `rgba(99,102,241,${o})` }}
                    />
                  ))}
                </div>
                <span>High demand</span>
              </div>
            </div>

            {/* Revenue by ship chart mock */}
            <div className="rounded-xl border border-theme bg-theme-subtle p-4">
              <p className="mb-3 text-xs font-semibold text-charcoal/80">
                Revenue Influenced by Recent Ships
              </p>
              <div className="flex items-end gap-2 h-28">
                {[
                  { label: "SSO", h: 65, v: "$420K" },
                  { label: "API v2", h: 90, v: "$780K" },
                  { label: "Webhooks", h: 45, v: "$310K" },
                  { label: "Reports", h: 100, v: "$1.2M" },
                  { label: "RBAC", h: 55, v: "$480K" },
                ].map((bar) => (
                  <div
                    key={bar.label}
                    className="flex flex-1 flex-col items-center gap-1"
                  >
                    <span className="text-[9px] font-medium" style={{ color: LOOP_COLOR }}>
                      {bar.v}
                    </span>
                    <div
                      className="w-full rounded-t-md transition-all duration-1000"
                      style={{
                        height: `${bar.h}%`,
                        background: `linear-gradient(to top, rgba(99,102,241,0.3), rgba(99,102,241,0.7))`,
                      }}
                    />
                    <span className="text-[9px] text-charcoal/45">{bar.label}</span>
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

function DashboardCard({
  label,
  value,
  change,
  changePositive,
  color,
}: {
  label: string;
  value: string;
  change: string;
  changePositive: boolean;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-theme bg-theme-subtle p-4">
      <p className="text-xs text-charcoal/70">{label}</p>
      <p className="mt-1 text-2xl font-bold" style={{ color }}>
        {value}
      </p>
      <p
        className={cn(
          "mt-1 text-xs",
          changePositive ? "text-brand" : "text-red-400",
        )}
      >
        {change}
      </p>
    </div>
  );
}

/* ================================================================
   CROSS-TEAM ALIGNMENT
   ================================================================ */
function CrossTeamSection() {
  const { ref, inView } = useInView();

  const teams = [
    {
      name: "Product",
      icon: Target,
      role: "Prioritize by revenue impact",
      connections: ["Engineering", "Sales", "CS"],
    },
    {
      name: "Engineering",
      icon: Layers,
      role: "Build what moves the needle",
      connections: ["Product", "Marketing"],
    },
    {
      name: "Sales",
      icon: Phone,
      role: "Sell shipped value, flag demand",
      connections: ["Product", "CS"],
    },
    {
      name: "Marketing",
      icon: Send,
      role: "Amplify every ship with context",
      connections: ["Engineering", "Sales"],
    },
    {
      name: "CS",
      icon: MessageSquare,
      role: "Renew with proof of delivered value",
      connections: ["Product", "Sales"],
    },
  ];

  return (
    <Section variant="sky" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={LOOP_COLOR} className="mb-4">
            Cross-Team Alignment
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            One loop.{" "}
            <span style={{ color: LOOP_COLOR }}>Every team aligned.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal/70">
            No more Slack threads asking "did we ship that?" LOOP keeps every
            revenue-facing team on the same page, automatically.
          </p>
        </div>

        {/* Team cards with visual connectors */}
        <div className="relative">
          {/* Connector line (hidden on mobile) */}
          <div
            className="absolute left-1/2 top-16 hidden h-px w-[70%] -translate-x-1/2 lg:block"
            style={{
              background: `linear-gradient(to right, transparent, ${LOOP_COLOR}, transparent)`,
            }}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {teams.map((team, i) => {
              const Icon = team.icon;
              return (
                <div
                  key={team.name}
                  className={cn(
                    "group relative flex flex-col items-center rounded-2xl border border-theme p-6 text-center transition-all duration-500 hover:border-opacity-50",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  )}
                  style={{
                    transitionDelay: `${i * 100 + 150}ms`,
                    background: "var(--bg-card)",
                  }}
                >
                  {/* Connector dot */}
                  <div
                    className="absolute -top-2 left-1/2 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 lg:block"
                    style={{
                      borderColor: LOOP_COLOR,
                      background: "var(--bg-primary)",
                    }}
                  />
                  <div
                    className="mb-3 grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: LOOP_COLOR_LIGHT }}
                  >
                    <Icon className="h-7 w-7" style={{ color: LOOP_COLOR }} />
                  </div>
                  <h3 className="text-base font-semibold text-charcoal">{team.name}</h3>
                  <p className="mt-1 text-xs text-charcoal/70 leading-relaxed">{team.role}</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-1">
                    {team.connections.map((c) => (
                      <span
                        key={c}
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{
                          background: LOOP_COLOR_LIGHT,
                          color: LOOP_COLOR,
                        }}
                      >
                        {c}
                      </span>
                    ))}
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
   INTEGRATION CARDS
   ================================================================ */
function IntegrationsSection() {
  const { ref, inView } = useInView();

  const integrations = [
    {
      name: "Gong",
      desc: "Extract feature requests, objections, and competitive intelligence from every recorded call.",
      color: "#7C3AED",
    },
    {
      name: "Zendesk",
      desc: "Cluster support tickets by theme and surface recurring product friction by account tier.",
      color: "#03363D",
    },
    {
      name: "Salesforce",
      desc: "Sync pipeline data, account health, and deal stages for revenue-weighted prioritization.",
      color: "#00A1E0",
    },
    {
      name: "Slack",
      desc: "Deliver ship alerts, deal risk notifications, and weekly signal digests where teams already work.",
      color: "#4A154B",
    },
    {
      name: "HubSpot",
      desc: "Ingest CRM data and marketing engagement signals to enrich feature demand scoring.",
      color: "#FF7A59",
    },
  ];

  return (
    <Section variant="white" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={LOOP_COLOR} className="mb-4">
            Integrations
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Plugs into your{" "}
            <span style={{ color: LOOP_COLOR }}>existing stack</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-charcoal/70">
            LOOP connects to the tools your teams already use. No migration,
            no context-switching -- just signal flow.
          </p>
        </div>

        <div className="mx-auto grid max-w-[900px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((int, i) => (
            <Card
              key={int.name}
              variant="light"
              className={cn(
                "group transition-all duration-500 hover:shadow-lg",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${i * 80 + 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl text-sm font-bold text-white"
                  style={{ background: int.color }}
                >
                  {int.name[0]}
                </div>
                <h3 className="text-base font-semibold text-charcoal">{int.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-charcoal/70">{int.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   SOCIAL PROOF / STATS
   ================================================================ */
function StatsSection() {
  const { ref, inView } = useInView();

  const stats = [
    {
      value: "$2.3M",
      label: "Pipeline unblocked",
      desc: "Average quarterly impact",
      icon: DollarSign,
    },
    {
      value: "136",
      label: "Signals processed daily",
      desc: "Across calls, tickets & NPS",
      icon: Sparkles,
    },
    {
      value: "7",
      label: "Deals influenced per ship",
      desc: "Average across customers",
      icon: Repeat2,
    },
    {
      value: "42%",
      label: "Faster time-to-close",
      desc: "With ship-aligned selling",
      icon: LineChart,
    },
  ];

  return (
    <Section variant="coral" withGrid withNoise className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={LOOP_COLOR} className="mb-4 backdrop-blur-sm">
            Projected Impact
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Numbers that move{" "}
            <span style={{ color: LOOP_COLOR }}>boardroom conversations</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={cn(
                  "group flex flex-col items-center rounded-2xl enterprise-card p-8 text-center transition-all duration-500",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{
                  transitionDelay: `${i * 100 + 150}ms`,
                  background: "var(--bg-card)",
                }}
              >
                <div
                  className="mb-4 grid h-12 w-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: LOOP_COLOR_LIGHT }}
                >
                  <Icon className="h-6 w-6" style={{ color: LOOP_COLOR }} />
                </div>
                <span
                  className="text-4xl font-bold tracking-tight"
                  style={{ color: LOOP_COLOR }}
                >
                  {stat.value}
                </span>
                <span className="mt-2 text-sm font-semibold text-charcoal">
                  {stat.label}
                </span>
                <span className="mt-1 text-xs text-charcoal/70">{stat.desc}</span>
              </div>
            );
          })}
        </div>

        {/* Testimonial-style quote */}
        <div
          className={cn(
            "mx-auto mt-16 max-w-2xl text-center transition-all duration-700 delay-500",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <blockquote className="text-lg italic leading-relaxed text-charcoal/80">
            &ldquo;We used to spend 4 hours a week syncing product and sales on
            what shipped and what was coming. LOOP made that meeting
            obsolete.&rdquo;
          </blockquote>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div
              className="h-10 w-10 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${LOOP_COLOR}, rgba(99,102,241,0.4))`,
              }}
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-charcoal">Sarah Chen</p>
              <p className="text-xs text-charcoal/70">VP Product, ScaleFlow (Beta)</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   PURCHASE CTA
   ================================================================ */
function WaitlistSection() {
  const { ref, inView } = useInView();

  return (
    <Section variant="sky" className="py-24 sm:py-32">
      <div ref={ref} className="text-center">
        {/* Indigo glow background */}
        <div className="relative mx-auto max-w-[680px]">
          <div
            className="pointer-events-none absolute -inset-20 rounded-full opacity-30 blur-3xl"
            style={{ background: LOOP_COLOR }}
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
                  background: LOOP_COLOR_LIGHT,
                }}
              >
                <Infinity className="h-8 w-8" style={{ color: LOOP_COLOR }} />
              </div>
            </div>

            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1 transition-all duration-700 delay-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              Add{" "}
              <span style={{ color: LOOP_COLOR }}>LOOP</span> to your plan
            </h2>

            <p
              className={cn(
                "mx-auto mt-4 max-w-md text-charcoal/70 transition-all duration-700 delay-200",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              Close the loop between revenue signals and your backlog. Start a 14-day trial
              and complete purchase on the next step—no sales call required for Pro or Business.
            </p>

            <div
              className={cn(
                "mx-auto mt-8 flex max-w-md flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                "transition-all duration-700 delay-300",
              )}
            >
              <Button
                size="lg"
                className="w-full gap-2 text-white sm:w-auto"
                style={{ background: LOOP_COLOR }}
                asChild
              >
                <Link href={buildProductCheckoutUrl({ product: "loop", plan: "pro" })}>
                  Start 14-day trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                <Link href={buildProductCheckoutUrl({ product: "loop", plan: "business" })}>
                  Business plan checkout
                </Link>
              </Button>
            </div>

            <p
              className={cn(
                "mt-6 text-xs text-charcoal/55",
                inView ? "opacity-100" : "opacity-0",
                "transition-all duration-700 delay-400",
              )}
            >
              Need Enterprise (SSO, VPC)?{" "}
              <Link href="/contact?plan=enterprise" className="font-medium underline-offset-2 hover:underline" style={{ color: LOOP_COLOR }}>
                Contact sales
              </Link>
            </p>
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
            className="flex items-center gap-1.5 text-charcoal/80 transition-colors hover:text-charcoal"
          >
            <CircleDot className="h-4 w-4 text-brand" />
            Explore ATLAS (AI Sprint Planner)
            <ArrowRight className="h-3 w-3" />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-charcoal/80 transition-colors hover:text-charcoal"
          >
            <Sparkles className="h-4 w-4" style={{ color: LOOP_COLOR }} />
            Back to Voatomy Platform
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================
   PRICING PREVIEW
   ================================================================ */
function PricingPreviewSection() {
  const { ref, inView } = useInView();
  const { tiers } = usePricing();

  return (
    <Section variant="white" className="py-20 sm:py-28">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={LOOP_COLOR} className="mb-4">
            Pricing
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Simple, transparent{" "}
            <span style={{ color: LOOP_COLOR }}>pricing</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-charcoal/70">
            Start small, scale as your team&apos;s feedback loop matures. All
            plans include a 14-day free trial.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1080px] gap-6 lg:grid-cols-4">
          {tiers.map((tier, i) => {
            const isEnterprise = tier.monthlyPrice < 0;
            const priceLabel = isEnterprise
              ? "Custom"
              : tier.monthlyPrice === 0
                ? "$0"
                : `$${tier.monthlyPrice}`;
            const unitLabel = isEnterprise
              ? ""
              : tier.monthlyPrice === 0
                ? ""
                : tier.period || "/user/mo";

            return (
              <div
                key={tier.name}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-6 transition-all duration-500",
                  tier.popular ? "border-2 shadow-xl" : "border-theme",
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                )}
                style={{
                  transitionDelay: `${i * 100 + 150}ms`,
                  borderColor: tier.popular ? LOOP_COLOR : undefined,
                  background: "var(--bg-card)",
                }}
              >
                {tier.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-bold text-white"
                    style={{ background: LOOP_COLOR }}
                  >
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-charcoal">
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: LOOP_COLOR }}
                  >
                    {priceLabel}
                  </span>
                  {unitLabel && (
                    <span className="text-sm text-charcoal/70">{unitLabel}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-charcoal/70">{tier.description}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li
                      key={f.text}
                      className="flex items-center gap-2 text-sm text-charcoal/80"
                    >
                      <span
                        className="grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
                        style={{ background: LOOP_COLOR }}
                      >
                        &#10003;
                      </span>
                      {f.text}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full text-white"
                  size="md"
                  style={{
                    background: tier.popular ? LOOP_COLOR : "transparent",
                    border: tier.popular
                      ? "none"
                      : `1px solid ${LOOP_COLOR}`,
                    color: tier.popular ? "white" : LOOP_COLOR,
                  }}
                  asChild
                >
                  <Link
                    href={
                      isEnterprise
                        ? "/contact?plan=enterprise"
                        : tier.monthlyPrice === 0
                          ? "/auth/signup"
                          : tier.name === "Pro"
                            ? buildProductCheckoutUrl({ product: "loop", plan: "pro" })
                            : buildProductCheckoutUrl({ product: "loop", plan: "business" })
                    }
                  >
                    {isEnterprise ? "Contact Sales" : tier.cta}
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
   AI WORKFLOW PIPELINE
   ================================================================ */

const LOOP_PIPELINE = [
  {
    id: "collect",
    icon: Database,
    title: "Signal Collection",
    desc: "Multi-channel ingestion from every customer touchpoint",
    detail: "Gong calls, Zendesk tickets, NPS surveys, CRM events, usage analytics, and Slack mentions are ingested in real-time via webhooks and API polling.",
    inputs: ["Gong Calls", "Support Tickets", "NPS/CSAT", "CRM Events", "Usage Data", "Slack Mentions"],
    color: "#818cf8",
  },
  {
    id: "extract",
    icon: Filter,
    title: "Signal Extraction",
    desc: "NLP-powered feature request & sentiment mining",
    detail: "Transformer models extract feature requests, objections, competitive mentions, pain points, and sentiment — tagged to accounts and dollar values.",
    inputs: ["Entity extraction", "Sentiment scoring", "Topic clustering", "Intent classification"],
    color: LOOP_COLOR,
  },
  {
    id: "weight",
    icon: DollarSign,
    title: "Revenue Weighting",
    desc: "Every signal scored by business impact",
    detail: "Signals are weighted by ARR, expansion potential, renewal timeline, strategic segment, and deal stage — so you build for revenue, not volume.",
    inputs: ["ARR weight", "Expansion potential", "Renewal proximity", "Segment priority"],
    color: "#a78bfa",
  },
  {
    id: "prioritize",
    icon: Target,
    title: "AI Prioritization",
    desc: "Demand clustering & opportunity scoring",
    detail: "Multi-dimensional clustering groups related signals, then a scoring model ranks themes by total addressable revenue and strategic fit.",
    inputs: ["Demand clusters", "Revenue score", "Effort estimate", "Strategic fit"],
    color: "#f59e0b",
  },
  {
    id: "route",
    icon: GitMerge,
    title: "Smart Routing",
    desc: "Right signal to the right team at the right time",
    detail: "Product gets prioritized themes, Engineering gets sized tickets, Sales gets deal-specific briefs, CS gets renewal ammunition — all automatically.",
    inputs: ["Product roadmap", "Engineering backlog", "Sales briefs", "CS playbooks"],
    color: "#10b981",
  },
  {
    id: "amplify",
    icon: Megaphone,
    title: "Ship Amplification",
    desc: "Closed-loop delivery back to every revenue team",
    detail: "When features ship, LOOP auto-generates sales enablement, marketing copy, CS talking points, and deal-risk resolution notifications.",
    inputs: ["Sales enablement", "Marketing copy", "CS scripts", "Deal alerts"],
    color: "#12FF80",
  },
];

function LoopAIWorkflowSection() {
  const { ref, inView } = useInView();
  const [activeStage, setActiveStage] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(() => {
    if (!playing || !inView) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % LOOP_PIPELINE.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [playing, inView]);

  const stage = LOOP_PIPELINE[activeStage];
  const StageIcon = stage.icon;

  return (
    <Section variant="sky" className="py-20 sm:py-28 overflow-hidden">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={LOOP_COLOR} className="mb-4">
            AI Workflow
          </Chip>
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1 transition-all duration-700",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Inside LOOP&apos;s{" "}
            <span style={{ color: LOOP_COLOR }}>intelligence engine</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal/70">
            Follow a customer signal through six AI stages — from a raw Gong
            mention to a revenue-weighted feature brief in every team&apos;s hands.
          </p>
        </div>

        {/* ── Pipeline Progress Bar ── */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex items-center gap-1">
            {LOOP_PIPELINE.map((s, i) => {
              const Icon = s.icon;
              const active = i === activeStage;
              const past = i < activeStage;
              return (
                <button
                  key={s.id}
                  onClick={() => { setActiveStage(i); setPlaying(false); }}
                  className="flex-1 group cursor-pointer"
                >
                  <div
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500 mb-3",
                      active ? "h-2" : "",
                    )}
                    style={{
                      background: active || past ? s.color : "rgba(128,128,128,0.15)",
                      boxShadow: active ? `0 0 12px ${s.color}40` : "none",
                    }}
                  />
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 border",
                        active ? "scale-110 shadow-lg" : past ? "opacity-70" : "opacity-40",
                      )}
                      style={{
                        borderColor: active ? s.color : "transparent",
                        backgroundColor: active || past ? `${s.color}15` : "rgba(128,128,128,0.06)",
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: active || past ? s.color : "rgba(128,128,128,0.4)" }} />
                    </div>
                    <span className={cn(
                      "text-[10px] font-medium text-center hidden sm:block transition-colors",
                      active ? "text-charcoal" : "text-charcoal/70",
                    )}>
                      {s.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active Stage Card ── */}
        <div
          className={cn(
            "max-w-5xl mx-auto rounded-2xl border shadow-xl transition-all duration-500",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ borderColor: `${stage.color}25`, boxShadow: `0 8px 48px ${stage.color}08` }}
        >
          <div className="rounded-xl bg-theme-card">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left — info */}
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-theme">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stage.color}15` }}
                  >
                    <StageIcon className="h-6 w-6" style={{ color: stage.color }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-charcoal/70 uppercase">
                      Stage {String(activeStage + 1).padStart(2, "0")} of {LOOP_PIPELINE.length}
                    </div>
                    <h3 className="text-lg font-semibold text-charcoal">{stage.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-charcoal/80 leading-relaxed mb-5">{stage.detail}</p>
                <div className="flex flex-wrap gap-1.5">
                  {stage.inputs.map((input, j) => (
                    <span
                      key={input}
                      className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border"
                      style={{
                        borderColor: `${stage.color}30`,
                        color: stage.color,
                        backgroundColor: `${stage.color}08`,
                        animation: `loop-tag-pop 0.3s ease-out ${j * 60}ms both`,
                      }}
                    >
                      {input}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setPlaying(!playing)}
                  className="mt-5 flex items-center gap-2 text-xs text-charcoal/70 hover:text-charcoal/80 transition-colors"
                >
                  <div className={cn("h-2 w-2 rounded-full", playing ? "animate-pulse bg-green-400" : "bg-gray-400")} />
                  {playing ? "Auto-playing" : "Paused"}
                </button>
              </div>

              {/* Right — visualization */}
              <div className="p-6 lg:p-8 flex flex-col justify-center min-h-[300px]">
                {activeStage === 0 && <LoopCollectVisual color={stage.color} />}
                {activeStage === 1 && <LoopExtractVisual color={stage.color} />}
                {activeStage === 2 && <LoopWeightVisual color={stage.color} />}
                {activeStage === 3 && <LoopPrioritizeVisual color={stage.color} />}
                {activeStage === 4 && <LoopRouteVisual color={stage.color} />}
                {activeStage === 5 && <LoopAmplifyVisual color={stage.color} />}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
          {[
            { label: "Signal-to-brief", value: "< 30 sec" },
            { label: "Signals processed daily", value: "136+" },
            { label: "Revenue accuracy", value: "94%" },
            { label: "Teams auto-notified", value: "5 avg" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center rounded-xl border border-theme bg-theme-card p-4 text-center">
              <div className="text-sm font-bold" style={{ color: LOOP_COLOR }}>{stat.value}</div>
              <div className="text-[11px] text-charcoal/70 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes loop-tag-pop {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </Section>
  );
}

/* ── LOOP Visual: Signal Collection ── */
function LoopCollectVisual({ color }: { color: string }) {
  const channels = [
    { name: "Gong", icon: Mic },
    { name: "Zendesk", icon: Headphones },
    { name: "Salesforce", icon: DollarSign },
    { name: "NPS", icon: BarChart3 },
    { name: "Slack", icon: MessageSquare },
    { name: "Analytics", icon: Activity },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-mono text-charcoal/70">Ingesting from 6 channels…</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {channels.map((ch, i) => {
          const Icon = ch.icon;
          return (
            <div
              key={ch.name}
              className="flex items-center gap-2.5 rounded-lg border border-theme p-2.5 transition-all"
              style={{ animation: `loop-slide-in 0.4s ease-out ${i * 80}ms both` }}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}12` }}>
                <Icon className="h-4 w-4" style={{ color }} />
              </div>
              <div>
                <div className="text-xs font-semibold text-charcoal">{ch.name}</div>
                <div className="text-[10px] text-charcoal/70">{Math.floor(Math.random() * 40 + 10)} signals/hr</div>
              </div>
              <div className="ml-auto h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
            </div>
          );
        })}
      </div>
      {/* Live signal ticker */}
      <div className="rounded-lg border border-theme p-3 overflow-hidden">
        <div className="text-[10px] font-semibold text-charcoal/70 mb-2">Live Signal Feed</div>
        {[
          { text: '"Need SSO before Q3 renewal" — Acme Corp ($420K ARR)', type: "request" },
          { text: 'Churn risk: 3 unanswered tickets from Globex ($180K)', type: "risk" },
          { text: '"Competitors have webhooks" — mentioned in 4 calls', type: "competitive" },
        ].map((sig, i) => (
          <div
            key={i}
            className="flex items-start gap-2 py-1.5 border-t border-theme first:border-0"
            style={{ animation: `loop-slide-in 0.5s ease-out ${i * 150 + 300}ms both` }}
          >
            <div
              className="h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0"
              style={{ backgroundColor: sig.type === "risk" ? "#ef4444" : sig.type === "competitive" ? "#f59e0b" : color }}
            />
            <span className="text-[11px] text-charcoal/80 leading-relaxed">{sig.text}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes loop-slide-in {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ── LOOP Visual: Signal Extraction ── */
function LoopExtractVisual({ color }: { color: string }) {
  const extractions = [
    { category: "Feature Request", count: 23, sentiment: 0.72, color },
    { category: "Competitive Mention", count: 8, sentiment: -0.3, color: "#f59e0b" },
    { category: "Pain Point", count: 15, sentiment: -0.65, color: "#ef4444" },
    { category: "Positive Feedback", count: 31, sentiment: 0.89, color: "#12FF80" },
    { category: "Objection", count: 6, sentiment: -0.45, color: "#f97316" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        <span className="text-xs font-mono text-charcoal/70">NLP extraction running… 347 signals processed</span>
      </div>
      {extractions.map((ext, i) => (
        <div key={ext.category} className="flex items-center gap-3" style={{ animation: `loop-row-fade 0.4s ease-out ${i * 100}ms both` }}>
          <span className="text-[11px] text-charcoal/70 w-36 truncate">{ext.category}</span>
          <div className="flex-1 h-2 rounded-full bg-theme-subtle overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(ext.count / 31) * 100}%`, backgroundColor: ext.color }}
            />
          </div>
          <span className="text-[11px] font-mono text-charcoal/80 w-6 text-right">{ext.count}</span>
          <div className="w-16 flex items-center gap-1">
            <div className="flex-1 h-1 rounded-full bg-theme-subtle overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.abs(ext.sentiment) * 100}%`,
                  marginLeft: ext.sentiment < 0 ? `${(1 - Math.abs(ext.sentiment)) * 100}%` : "0",
                  backgroundColor: ext.sentiment >= 0 ? "#12FF80" : "#ef4444",
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between text-[9px] text-charcoal/45 pt-1">
        <span>Category &amp; Count</span>
        <span>Sentiment</span>
      </div>
      <style jsx>{`
        @keyframes loop-row-fade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── LOOP Visual: Revenue Weighting ── */
function LoopWeightVisual({ color }: { color: string }) {
  const accounts = [
    { name: "Acme Corp", arr: 420, weight: 92, tier: "Enterprise" },
    { name: "Globex Inc", arr: 180, weight: 78, tier: "Mid-Market" },
    { name: "Initech", arr: 85, weight: 61, tier: "SMB" },
    { name: "Hooli", arr: 310, weight: 88, tier: "Enterprise" },
    { name: "Pied Piper", arr: 55, weight: 44, tier: "Startup" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        <span className="text-xs font-mono text-charcoal/70">Revenue weighting model active</span>
      </div>
      <div className="rounded-lg border border-theme overflow-hidden">
        <div className="grid grid-cols-[1fr_70px_60px_60px] gap-2 px-3 py-2 border-b border-theme bg-theme-subtle/30 text-[10px] font-bold text-charcoal/70 uppercase tracking-wider">
          <span>Account</span><span className="text-right">ARR</span><span className="text-center">Tier</span><span className="text-center">Weight</span>
        </div>
        {accounts.map((a, i) => (
          <div
            key={a.name}
            className="grid grid-cols-[1fr_70px_60px_60px] gap-2 px-3 py-2.5 border-b last:border-0 border-theme items-center"
            style={{ animation: `loop-row-fade 0.4s ease-out ${i * 80}ms both` }}
          >
            <span className="text-xs text-charcoal font-medium">{a.name}</span>
            <span className="text-xs text-charcoal/80 text-right font-mono">${a.arr}K</span>
            <span className="text-[10px] text-center rounded-full px-1.5 py-0.5" style={{ backgroundColor: `${color}12`, color }}>{a.tier}</span>
            <div className="flex items-center justify-center gap-1">
              <div className="h-1.5 w-6 rounded-full bg-theme-subtle overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${a.weight}%`, backgroundColor: a.weight >= 80 ? "#12FF80" : color }} />
              </div>
              <span className="text-[10px] font-bold" style={{ color: a.weight >= 80 ? "#12FF80" : color }}>{a.weight}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-[11px] text-charcoal/70 pt-1">
        Revenue-weighted score = ARR × renewal proximity × strategic fit
      </div>
      <style jsx>{`
        @keyframes loop-row-fade {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ── LOOP Visual: AI Prioritization ── */
function LoopPrioritizeVisual({ color }: { color: string }) {
  const themes = [
    { name: "SSO / Enterprise Auth", score: 94, revenue: "$1.2M", signals: 47, status: "Top Priority" },
    { name: "Webhook Support", score: 82, revenue: "$780K", signals: 31, status: "High" },
    { name: "Advanced Reporting", score: 76, revenue: "$540K", signals: 22, status: "Medium" },
    { name: "Mobile App", score: 58, revenue: "$310K", signals: 18, status: "Low" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        <span className="text-xs font-mono text-charcoal/70">Clustering 347 signals into themes…</span>
      </div>
      {themes.map((t, i) => {
        const barColor = t.score >= 90 ? "#12FF80" : t.score >= 75 ? color : t.score >= 60 ? "#f59e0b" : "rgba(128,128,128,0.4)";
        return (
          <div
            key={t.name}
            className="rounded-lg border border-theme p-3"
            style={{ animation: `loop-card-pop 0.5s ease-out ${i * 120}ms both` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-charcoal">{t.name}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${barColor}15`, color: barColor }}>
                {t.status}
              </span>
            </div>
            <div className="h-2 rounded-full bg-theme-subtle overflow-hidden mb-2">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${t.score}%`, backgroundColor: barColor }} />
            </div>
            <div className="flex items-center gap-4 text-[10px] text-charcoal/70">
              <span>Score: <strong style={{ color: barColor }}>{t.score}</strong></span>
              <span>Revenue: <strong className="text-charcoal/80">{t.revenue}</strong></span>
              <span>Signals: <strong className="text-charcoal/80">{t.signals}</strong></span>
            </div>
          </div>
        );
      })}
      <style jsx>{`
        @keyframes loop-card-pop {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ── LOOP Visual: Smart Routing ── */
function LoopRouteVisual({ color }: { color: string }) {
  const routes = [
    { team: "Product", icon: Target, output: "Prioritized theme cards with revenue context", items: 12 },
    { team: "Engineering", icon: Layers, output: "Pre-sized tickets linked to demand clusters", items: 8 },
    { team: "Sales", icon: Phone, output: "Deal-specific feature briefs & talking points", items: 24 },
    { team: "CS", icon: MessageSquare, output: "Account renewal playbooks with shipped features", items: 15 },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-mono text-charcoal/70">Routing intelligence to 4 teams…</span>
      </div>
      {/* Central hub → team flows */}
      <div className="flex items-center justify-center mb-4">
        <div className="h-12 w-12 rounded-xl flex items-center justify-center border" style={{ borderColor: `${color}40`, backgroundColor: `${color}15` }}>
          <BrainCircuit className="h-5 w-5" style={{ color }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {routes.map((r, i) => {
          const Icon = r.icon;
          return (
            <div
              key={r.team}
              className="rounded-lg border border-theme p-3"
              style={{ animation: `loop-route-in 0.4s ease-out ${i * 100}ms both` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
                  <Icon className="h-3.5 w-3.5" style={{ color }} />
                </div>
                <span className="text-xs font-semibold text-charcoal">{r.team}</span>
                <span className="ml-auto text-[10px] font-mono text-charcoal/70">{r.items} items</span>
              </div>
              <p className="text-[10px] text-charcoal/70 leading-relaxed">{r.output}</p>
              <div className="mt-2 flex items-center gap-1">
                <ChevronRight className="h-3 w-3" style={{ color }} />
                <span className="text-[9px]" style={{ color }}>Auto-delivered to workspace</span>
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes loop-route-in {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ── LOOP Visual: Ship Amplification ── */
function LoopAmplifyVisual({ color }: { color: string }) {
  const outputs = [
    { type: "Sales Brief", preview: "SSO is live! Here's how to position it for Enterprise deals…", icon: FileText, status: "Generated" },
    { type: "Blog Draft", preview: "Enterprise-grade security: SSO, SCIM, and more…", icon: BookOpen, status: "Ready for review" },
    { type: "CS Playbook", preview: "Acme Corp requested SSO in March — it shipped today. Renewal script…", icon: MessageSquare, status: "Sent to CS" },
    { type: "Deal Alert", preview: "3 deals with SSO dependency now unblocked ($780K total)", icon: Shield, status: "Notified" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        <span className="text-xs font-mono text-charcoal/70">Feature "SSO" shipped → amplifying to 4 teams</span>
      </div>
      {/* Ship event */}
      <div className="rounded-lg border p-3 mb-2" style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4" style={{ color }} />
          <span className="text-xs font-semibold" style={{ color }}>Ship Event Detected</span>
          <span className="ml-auto text-[10px] text-charcoal/70">2 min ago</span>
        </div>
        <p className="text-[11px] text-charcoal/80 mt-1">PR #847 merged → "Enterprise SSO with SAML support"</p>
      </div>
      {/* Generated outputs */}
      {outputs.map((out, i) => {
        const Icon = out.icon;
        return (
          <div
            key={out.type}
            className="flex items-start gap-2.5 rounded-lg border border-theme p-2.5"
            style={{ animation: `loop-amp-slide 0.5s ease-out ${i * 120 + 200}ms both` }}
          >
            <div className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${color}12` }}>
              <Icon className="h-3.5 w-3.5" style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-charcoal">{out.type}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${color}12`, color }}>{out.status}</span>
              </div>
              <p className="text-[10px] text-charcoal/70 mt-0.5 truncate">{out.preview}</p>
            </div>
          </div>
        );
      })}
      <style jsx>{`
        @keyframes loop-amp-slide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ================================================================
   PAGE COMPOSITION
   ================================================================ */
export default function LoopProductPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <LoopVisualizationSection />
      <LoopAIWorkflowSection />
      <InboundIntelligenceSection />
      <OutboundIntelligenceSection />
      <DashboardSection />
      <CrossTeamSection />
      <IntegrationsSection />
      <StatsSection />
      <PricingPreviewSection />
      <WaitlistSection />
    </main>
  );
}

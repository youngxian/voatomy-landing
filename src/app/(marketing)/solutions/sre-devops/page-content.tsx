"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  AlertTriangle,
  Activity,
  Radio,
  Shield,
  Users,
  DollarSign,
  ArrowRight,
  Zap,
  BarChart3,
  Bell,
  Server,
  MessageSquare,
  Eye,
  Target,
  CheckCircle2,
  ChevronRight,
  FileText,
  Send,
  Database,
  Headphones,
  Briefcase,
  Timer,
  ArrowDown,
  Gauge,
  Bug,
  CircleDot,
  Workflow,
} from "lucide-react";

/* ─────────────────────────── Constants ─────────────────────────── */

const RED = "#EF4444";
const RED_DIM = "rgba(239,68,68,0.12)";
const RED_GLOW = "rgba(239,68,68,0.25)";
const CYAN = "#22D3EE";
const ORANGE = "#f16e2c";

const PAIN_POINTS = [
  {
    icon: Bell,
    title: "Alerts fire, impact unknown",
    description:
      "Your monitoring catches the failure, but nobody knows which customers or revenue lines are affected until the post-mortem.",
    metric: "Avg 4.2 hrs to understand business impact",
    color: RED,
  },
  {
    icon: Users,
    title: "Context routing is manual",
    description:
      "SRE scrambles in Slack. Customer Success finds out days later from angry tickets. Sales discovers pipeline risk at QBR.",
    metric: "3 teams, 3 separate war rooms",
    color: "#F97316",
  },
  {
    icon: FileText,
    title: "Post-mortems take hours",
    description:
      "Engineers spend half a day stitching together timelines, screenshots, and Slack threads instead of preventing the next incident.",
    metric: "6+ hours per post-mortem on average",
    color: "#8B5CF6",
  },
  {
    icon: Bug,
    title: "Tech debt degrades reliability",
    description:
      "The same modules cause repeated incidents. But there is no data linking code health to outage frequency, so it never gets prioritized.",
    metric: "42% of incidents from known debt",
    color: CYAN,
  },
];

const PRODUCT_STACK = [
  {
    name: "SIGNAL",
    tagline: "Incident Intelligence",
    description:
      "Auto-detect blast radius, map affected customers and ARR, route tailored context to every team, and generate post-mortems in seconds.",
    color: RED,
    isPrimary: true,
    href: "/products/signal",
    features: [
      "Revenue-aware incident alerts",
      "Role-based context routing",
      "Auto-generated post-mortems",
    ],
  },
  {
    name: "PHANTOM",
    tagline: "Tech Debt Radar",
    description:
      "Surface the code hotspots causing repeated incidents. Translate tech debt into dollar cost so reliability investments get funded.",
    color: CYAN,
    isPrimary: false,
    href: "/products/phantom",
    features: [
      "Incident-to-debt correlation",
      "Reliability cost modeling",
      "Prioritized remediation queue",
    ],
  },
  {
    name: "ATLAS",
    tagline: "Sprint-Aware Response",
    description:
      "Know which sprints, features, and deployments are in the blast radius. Automatically adjust estimates and re-plan around incidents.",
    color: ORANGE,
    isPrimary: false,
    href: "/products/atlas",
    features: [
      "Sprint impact analysis",
      "Deployment-aware alerting",
      "Auto-adjusted planning",
    ],
  },
];

const FLOW_STEPS = [
  {
    step: "01",
    icon: Bell,
    title: "Alert Triggered",
    description:
      "PagerDuty, Datadog, or CloudWatch fires an alert. SIGNAL ingests it instantly and begins enrichment.",
    status: "critical",
  },
  {
    step: "02",
    icon: Target,
    title: "Auto-Detect Blast Radius",
    description:
      "Service topology mapping identifies every affected service, region, and dependency in the blast radius.",
    status: "processing",
  },
  {
    step: "03",
    icon: DollarSign,
    title: "Map Customers + ARR",
    description:
      "Cross-reference affected services with customer deployments. Surface total ARR at risk and renewal proximity.",
    status: "impact",
  },
  {
    step: "04",
    icon: Send,
    title: "Route Context to Teams",
    description:
      "SRE gets runbooks and blast radius. CS gets talking points. Sales gets deal alerts. Leadership gets the board brief.",
    status: "routing",
  },
  {
    step: "05",
    icon: FileText,
    title: "Post-Mortem Auto-Generated",
    description:
      "Full incident timeline, root cause analysis, action items, and business impact summary -- ready in minutes, not hours.",
    status: "complete",
  },
];

const DASHBOARD_METRICS = [
  {
    label: "MTTR",
    value: "23 min",
    trend: "-38%",
    trendDown: true,
    icon: Timer,
    sparkline: [45, 42, 38, 35, 30, 28, 25, 23],
  },
  {
    label: "Incident Frequency",
    value: "4.2 / wk",
    trend: "-22%",
    trendDown: true,
    icon: Activity,
    sparkline: [8, 7.5, 6.8, 6, 5.5, 5, 4.8, 4.2],
  },
  {
    label: "SLA Compliance",
    value: "99.94%",
    trend: "+0.12%",
    trendDown: false,
    icon: Shield,
    sparkline: [99.7, 99.75, 99.8, 99.82, 99.85, 99.88, 99.91, 99.94],
  },
  {
    label: "Error Budget Burn",
    value: "12%",
    trend: "-8%",
    trendDown: true,
    icon: Gauge,
    sparkline: [35, 30, 25, 22, 20, 18, 15, 12],
  },
];

const INTEGRATIONS = [
  { name: "Datadog", icon: Activity, color: "#632CA6" },
  { name: "PagerDuty", icon: Bell, color: "#06AC38" },
  { name: "CloudWatch", icon: Database, color: "#FF9900" },
  { name: "Slack", icon: MessageSquare, color: "#4A154B" },
];

/* ─────────────────────────── Helpers ─────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400 mb-3">
      {children}
    </p>
  );
}

function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-heading-1 text-theme max-w-3xl", className)}>
      {children}
    </h2>
  );
}

function SectionSub({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-body-lg text-theme-s max-w-2xl mt-4", className)}>
      {children}
    </p>
  );
}

function StatusDot({ color, pulse }: { color: string; pulse?: boolean }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      {pulse && (
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ background: color }}
        />
      )}
      <span
        className="relative inline-flex rounded-full h-2.5 w-2.5"
        style={{ background: color }}
      />
    </span>
  );
}

function MiniSparkline({
  data,
  color,
  width = 80,
  height = 28,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function SreDevOpsSolutionPage() {
  const [alertPhase, setAlertPhase] = useState<"raw" | "enriched">("raw");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const [mounted, setMounted] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Scroll-reveal observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  /* Alert transformation cycle */
  useEffect(() => {
    const interval = setInterval(() => {
      setAlertPhase((prev) => (prev === "raw" ? "enriched" : "raw"));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);
  const registerRef =
    (id: string) => (el: HTMLDivElement | null) => {
      sectionRefs.current[id] = el;
    };

  return (
    <div className="relative overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                             */}
      {/* ================================================================ */}
      <Section
        variant="sky"
        className="relative min-h-[92vh] flex items-center overflow-hidden pt-32 pb-24"
      >
        {/* Background: red radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 20%, ${RED_GLOW}, transparent 70%)`,
          }}
        />
        {/* Background: dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(239,68,68,0.07) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Scan line */}
        <div
          className="pointer-events-none absolute left-0 right-0 h-px opacity-15"
          style={{
            background: `linear-gradient(90deg, transparent, ${RED}, transparent)`,
            animation: "heroScan 5s ease-in-out infinite",
            top: "35%",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center gap-8">
          {/* Status badges row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Chip
              dotColor={RED}
              className="border border-red-500/20 bg-red-500/10 text-red-300"
            >
              SRE / DevOps
            </Chip>
            <Chip className="border border-theme bg-theme-subtle text-theme-s text-xs">
              Platform Engineering
            </Chip>
            <Chip className="border border-theme bg-theme-subtle text-theme-s text-xs">
              VP Engineering
            </Chip>
          </div>

          {/* Pulsing status indicators */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <StatusDot color="#22C55E" pulse />
              <span className="text-xs text-theme-m font-mono">
                api-gateway
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot color={RED} pulse />
              <span className="text-xs text-red-400 font-mono">
                billing-svc
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot color="#22C55E" />
              <span className="text-xs text-theme-m font-mono">auth</span>
            </div>
          </div>

          {/* Main heading */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-display-2 sm:text-display-1 text-theme">
              Revenue-aware incidents.
              <br />
              <span className="text-red-400">Alert intelligence.</span>
            </h1>
            <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
              Stop triaging alerts in a business vacuum. Voatomy translates
              every incident into customer impact, routes context to every
              team, and turns your post-mortems into prevention.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600 text-white border-0"
              asChild
            >
              <Link href="/products/signal">
                Explore SIGNAL <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/pricing">
                View Pricing <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* ── Alert transformation mockup ── */}
          <div className="mt-10 w-full max-w-3xl">
            <Card
              variant="light"
              className="border-red-500/20 bg-black/50 backdrop-blur-sm p-0 overflow-hidden"
            >
              {/* Mock header bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-red-500/10 bg-red-500/5">
                <div className="flex items-center gap-3">
                  <StatusDot color={RED} pulse />
                  <span className="text-sm font-semibold text-red-300">
                    Incoming Alert
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-theme-m">
                    {alertPhase === "raw" ? "Raw" : "Enriched"}
                  </span>
                  <div
                    className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
                    style={{
                      background: alertPhase === "raw" ? RED : "#12FF80",
                    }}
                  />
                </div>
              </div>

              {/* Transformation content */}
              <div className="relative px-6 py-8 min-h-[160px] flex flex-col items-center justify-center">
                {/* Raw alert */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-700",
                    alertPhase === "raw"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-6"
                  )}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-xs font-mono text-red-400 uppercase tracking-wider">
                      PagerDuty Alert
                    </span>
                  </div>
                  <p className="text-heading-2 text-theme font-mono text-center">
                    P1: API Gateway 500 errors
                  </p>
                  <p className="text-sm text-theme-m mt-2 font-mono">
                    Error rate &gt; 5% for 3 minutes on api-gateway-prod
                  </p>
                </div>

                {/* Enriched alert */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-700",
                    alertPhase === "enriched"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  )}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Radio className="w-5 h-5 text-red-400" />
                    <span className="text-xs font-mono text-red-400 uppercase tracking-wider">
                      SIGNAL Intelligence
                    </span>
                  </div>
                  <p className="text-heading-2 text-red-400 text-center">
                    $450K ARR at risk
                  </p>
                  <p className="text-sm text-theme-s mt-2 text-center">
                    12 enterprise accounts affected -- 3 in active renewal
                    window
                  </p>
                </div>

                {/* Center arrow indicator */}
                <div
                  className={cn(
                    "absolute bottom-3 left-1/2 -translate-x-1/2 transition-all duration-500",
                    alertPhase === "enriched" ? "opacity-100" : "opacity-0"
                  )}
                >
                  <span className="text-[10px] text-theme-f">
                    Auto-enriched in 8 seconds
                  </span>
                </div>
              </div>

              {/* Impact strip */}
              <div className="grid grid-cols-3 gap-px bg-red-500/10">
                {[
                  {
                    label: "Services",
                    value: "3 affected",
                    sub: "api-gw, billing, auth",
                  },
                  {
                    label: "Revenue Impact",
                    value: "$450K ARR",
                    sub: "12 enterprise accounts",
                  },
                  {
                    label: "Est. Resolution",
                    value: "~38 min",
                    sub: "based on similar incidents",
                  },
                ].map((item) => (
                  <div key={item.label} className="bg-black/60 px-4 py-3">
                    <p className="text-[10px] text-theme-m uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-theme mt-1">
                      {item.value}
                    </p>
                    <p className="text-[10px] text-theme-f mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  PAIN POINTS                                                      */}
      {/* ================================================================ */}
      <Section variant="mint" className="py-24">
        <div
          id="pain-points"
          ref={registerRef("pain-points")}
          className={cn(
            "transition-all duration-700",
            isVisible("pain-points")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <div className="text-center mb-16">
            <SectionLabel>The Problem</SectionLabel>
            <SectionHeading className="mx-auto">
              Your alerts lack business context
            </SectionHeading>
            <SectionSub className="mx-auto">
              Monitoring tools track technical failures. But the revenue
              impact, customer exposure, and cross-team context remain
              invisible until it is too late.
            </SectionSub>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAIN_POINTS.map((pain, i) => (
              <Card
                key={pain.title}
                variant="light"
                className={cn(
                  "relative overflow-hidden transition-all duration-500",
                  isVisible("pain-points")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: pain.color }}
                />
                <div className="flex flex-col gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{ background: `${pain.color}15` }}
                  >
                    <pain.icon
                      className="w-5 h-5"
                      style={{ color: pain.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-theme">
                      {pain.title}
                    </h3>
                    <p className="text-sm text-theme-s mt-2 leading-relaxed">
                      {pain.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-theme">
                    <p className="text-xs text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      {pain.metric}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  YOUR VOATOMY STACK                                               */}
      {/* ================================================================ */}
      <Section variant="sky" className="py-24">
        <div
          id="stack"
          ref={registerRef("stack")}
          className={cn(
            "transition-all duration-700",
            isVisible("stack")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <div className="text-center mb-16">
            <SectionLabel>Your Voatomy Stack</SectionLabel>
            <SectionHeading className="mx-auto">
              Three products. One reliability platform.
            </SectionHeading>
            <SectionSub className="mx-auto">
              Purpose-built for SRE and DevOps teams who need incident
              intelligence, tech debt visibility, and sprint-aware response
              -- all connected.
            </SectionSub>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRODUCT_STACK.map((product, i) => (
              <Card
                key={product.name}
                variant="light"
                className={cn(
                  "relative overflow-hidden transition-all duration-500 group",
                  product.isPrimary
                    ? "border-red-500/25 lg:scale-105 lg:-my-2"
                    : "border-theme hover:border-red-500/15",
                  isVisible("stack")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${i * 120 + 200}ms` }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: product.color }}
                />

                {/* Primary badge */}
                {product.isPrimary && (
                  <div className="mb-4">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider text-white"
                      style={{ background: RED }}
                    >
                      Primary for SRE
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{ background: `${product.color}15` }}
                  >
                    <Radio
                      className="w-5 h-5"
                      style={{ color: product.color }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-heading-3 font-semibold"
                      style={{ color: product.color }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-theme-m">{product.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-theme-s leading-relaxed mb-5">
                  {product.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {product.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-theme-m"
                    >
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: product.color }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={product.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 group-hover:gap-2.5"
                  style={{ color: product.color }}
                >
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  INCIDENT RESPONSE FLOW                                           */}
      {/* ================================================================ */}
      <Section variant="mint" className="py-24">
        <div
          id="flow"
          ref={registerRef("flow")}
          className={cn(
            "transition-all duration-700",
            isVisible("flow")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <div className="text-center mb-16">
            <SectionLabel>SIGNAL Workflow</SectionLabel>
            <SectionHeading className="mx-auto">
              From alert to full context in seconds
            </SectionHeading>
            <SectionSub className="mx-auto">
              Every incident triggers an automated intelligence pipeline that
              maps blast radius, calculates business impact, and routes
              tailored briefs to every team.
            </SectionSub>
          </div>

          {/* Vertical timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical connector line */}
            <div
              className="absolute left-6 sm:left-8 top-0 bottom-0 w-px"
              style={{
                background: `linear-gradient(180deg, ${RED}, ${RED}40, transparent)`,
              }}
            />

            <div className="space-y-8">
              {FLOW_STEPS.map((step, i) => {
                const statusColors: Record<string, string> = {
                  critical: RED,
                  processing: "#F97316",
                  impact: RED,
                  routing: "#3B82F6",
                  complete: "#22C55E",
                };
                const dotColor = statusColors[step.status] || RED;

                return (
                  <div
                    key={step.step}
                    className={cn(
                      "relative flex items-start gap-5 sm:gap-7 transition-all duration-600",
                      isVisible("flow")
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    )}
                    style={{ transitionDelay: `${i * 120 + 200}ms` }}
                  >
                    {/* Step dot on the line */}
                    <div className="relative z-10 flex-shrink-0">
                      {i === 0 && (
                        <span
                          className="absolute -inset-2 rounded-full animate-ping opacity-25"
                          style={{ background: dotColor }}
                        />
                      )}
                      <div
                        className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border-2"
                        style={{
                          borderColor: dotColor,
                          background: `${dotColor}10`,
                        }}
                      >
                        <step.icon
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          style={{ color: dotColor }}
                        />
                      </div>
                    </div>

                    {/* Step content */}
                    <Card
                      variant="light"
                      className="flex-1 border-theme hover:border-red-500/15 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-[10px] font-mono font-bold uppercase tracking-wider"
                          style={{ color: dotColor }}
                        >
                          Step {step.step}
                        </span>
                        {i === 0 && (
                          <span className="flex items-center gap-1 text-[10px] text-red-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                            Live
                          </span>
                        )}
                      </div>
                      <h3 className="text-heading-3 text-theme mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-theme-s leading-relaxed">
                        {step.description}
                      </p>

                      {/* Context routing detail for step 04 */}
                      {step.step === "04" && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                          {[
                            {
                              role: "SRE",
                              gets: "Runbooks",
                              icon: Server,
                              c: "#F97316",
                            },
                            {
                              role: "CS",
                              gets: "Talk Points",
                              icon: Headphones,
                              c: "#8B5CF6",
                            },
                            {
                              role: "Sales",
                              gets: "Deal Alerts",
                              icon: Briefcase,
                              c: "#3B82F6",
                            },
                            {
                              role: "Exec",
                              gets: "Board Brief",
                              icon: Eye,
                              c: RED,
                            },
                          ].map((ctx) => (
                            <div
                              key={ctx.role}
                              className="flex items-center gap-2 rounded-lg px-2.5 py-2"
                              style={{ background: `${ctx.c}08` }}
                            >
                              <ctx.icon
                                className="w-3.5 h-3.5 flex-shrink-0"
                                style={{ color: ctx.c }}
                              />
                              <div>
                                <p
                                  className="text-[10px] font-semibold"
                                  style={{ color: ctx.c }}
                                >
                                  {ctx.role}
                                </p>
                                <p className="text-[10px] text-theme-m">
                                  {ctx.gets}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* Time callout */}
            <div className="flex justify-center mt-10">
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border"
                style={{
                  borderColor: `${RED}30`,
                  background: `${RED}08`,
                }}
              >
                <Zap className="w-4 h-4 text-red-400" />
                <span className="text-sm text-theme-s">
                  Full pipeline from alert to team briefs:{" "}
                  <span className="font-semibold text-theme">8 seconds</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  ALERT-TO-IMPACT TRANSLATION                                      */}
      {/* ================================================================ */}
      <Section variant="sky" className="py-24">
        <div
          id="translation"
          ref={registerRef("translation")}
          className={cn(
            "transition-all duration-700",
            isVisible("translation")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <div className="text-center mb-14">
            <SectionLabel>Alert-to-Impact Translation</SectionLabel>
            <SectionHeading className="mx-auto">
              From PagerDuty alert to business context
            </SectionHeading>
            <SectionSub className="mx-auto">
              SIGNAL takes a raw technical alert, enriches it with service
              topology and customer data, and produces a complete business
              impact assessment.
            </SectionSub>
          </div>

          {/* Translation pipeline */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 lg:gap-0 items-stretch">
              {/* Stage 1: Raw Alert */}
              <Card
                variant="light"
                className="border-red-500/20 flex flex-col items-center justify-center text-center p-6"
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{ background: RED_DIM }}
                >
                  <Bell className="w-6 h-6 text-red-400" />
                </div>
                <p className="text-[10px] uppercase tracking-wider text-theme-m mb-2">
                  PagerDuty Alert
                </p>
                <p className="text-sm font-mono font-semibold text-theme">
                  P1: Database connection
                </p>
                <p className="text-sm font-mono font-semibold text-theme">
                  pool exhausted
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <StatusDot color={RED} pulse />
                  <span className="text-xs text-red-400 font-mono">
                    SEV-1
                  </span>
                </div>
              </Card>

              {/* Arrow 1 */}
              <div className="hidden lg:flex items-center justify-center px-3">
                <div className="flex flex-col items-center gap-1">
                  <Workflow className="w-4 h-4 text-red-400" />
                  <ArrowRight className="w-5 h-5 text-red-400" />
                </div>
              </div>
              <div className="flex lg:hidden items-center justify-center py-1">
                <ArrowDown className="w-5 h-5 text-red-400" />
              </div>

              {/* Stage 2: SIGNAL Enrichment */}
              <Card
                variant="light"
                className="border-red-500/25 flex flex-col items-center justify-center text-center p-6"
                style={{ background: `${RED}05` }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{ background: RED }}
                >
                  <Radio className="w-6 h-6 text-white" />
                </div>
                <p className="text-[10px] uppercase tracking-wider text-red-400 mb-2">
                  SIGNAL Enrichment
                </p>
                <div className="space-y-1.5 text-xs text-theme-s">
                  <p className="flex items-center gap-2">
                    <CircleDot
                      className="w-3 h-3 flex-shrink-0"
                      style={{ color: RED }}
                    />
                    Blast radius mapped
                  </p>
                  <p className="flex items-center gap-2">
                    <CircleDot
                      className="w-3 h-3 flex-shrink-0"
                      style={{ color: RED }}
                    />
                    Customer data joined
                  </p>
                  <p className="flex items-center gap-2">
                    <CircleDot
                      className="w-3 h-3 flex-shrink-0"
                      style={{ color: RED }}
                    />
                    Revenue calculated
                  </p>
                  <p className="flex items-center gap-2">
                    <CircleDot
                      className="w-3 h-3 flex-shrink-0"
                      style={{ color: RED }}
                    />
                    Context routed
                  </p>
                </div>
              </Card>

              {/* Arrow 2 */}
              <div className="hidden lg:flex items-center justify-center px-3">
                <div className="flex flex-col items-center gap-1">
                  <Zap className="w-4 h-4 text-brand" />
                  <ArrowRight className="w-5 h-5 text-brand" />
                </div>
              </div>
              <div className="flex lg:hidden items-center justify-center py-1">
                <ArrowDown className="w-5 h-5 text-brand" />
              </div>

              {/* Stage 3: Business Context */}
              <Card
                variant="light"
                className="border-brand/20 flex flex-col items-center justify-center text-center p-6"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-brand/15">
                  <DollarSign className="w-6 h-6 text-brand" />
                </div>
                <p className="text-[10px] uppercase tracking-wider text-brand mb-2">
                  Business Context
                </p>
                <p className="text-heading-3 text-red-400 mb-1">
                  $340K ARR at risk
                </p>
                <div className="space-y-1 text-xs text-theme-s mt-2">
                  <p>3 services affected</p>
                  <p>8 accounts on renewal this month</p>
                  <p>47 enterprise users impacted</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  RELIABILITY DASHBOARD                                            */}
      {/* ================================================================ */}
      <Section variant="mint" className="py-24">
        <div
          id="dashboard"
          ref={registerRef("dashboard")}
          className={cn(
            "transition-all duration-700",
            isVisible("dashboard")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <div className="text-center mb-14">
            <SectionLabel>Reliability Dashboard</SectionLabel>
            <SectionHeading className="mx-auto">
              Your reliability posture, at a glance
            </SectionHeading>
            <SectionSub className="mx-auto">
              Track MTTR trends, incident frequency, SLA compliance, and
              error budget burn rate -- all connected to revenue impact.
            </SectionSub>
          </div>

          {/* Dashboard mockup */}
          <div className="max-w-5xl mx-auto">
            <Card
              variant="light"
              className="border-red-500/15 p-0 overflow-hidden"
            >
              {/* Dashboard header */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-theme bg-red-500/[0.03]">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg"
                    style={{ background: RED_DIM }}
                  >
                    <BarChart3 className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-theme">
                      Reliability Overview
                    </p>
                    <p className="text-[10px] text-theme-m">
                      Last 30 days -- All services
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusDot color="#22C55E" pulse />
                  <span className="text-xs text-theme-m">Live</span>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-theme-subtle/30">
                {DASHBOARD_METRICS.map((metric, i) => (
                  <div
                    key={metric.label}
                    className={cn(
                      "bg-theme-card px-5 py-5 transition-all duration-500",
                      isVisible("dashboard")
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                    style={{ transitionDelay: `${i * 100 + 300}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-lg"
                        style={{ background: RED_DIM }}
                      >
                        <metric.icon className="w-4 h-4 text-red-400" />
                      </div>
                      <MiniSparkline
                        data={metric.sparkline}
                        color={metric.trendDown ? "#22C55E" : RED}
                      />
                    </div>
                    <p className="text-xs text-theme-m uppercase tracking-wider">
                      {metric.label}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <p className="text-heading-2 text-theme">
                        {metric.value}
                      </p>
                      <span
                        className={cn(
                          "text-xs font-semibold",
                          metric.trendDown
                            ? "text-green-400"
                            : "text-green-400"
                        )}
                      >
                        {metric.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom: incident bar chart mock */}
              <div className="px-5 sm:px-6 py-5 border-t border-theme">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-theme flex items-center gap-2">
                    <Activity
                      className="w-4 h-4"
                      style={{ color: RED }}
                    />
                    Incident Volume (12 weeks)
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-theme-m">
                    <span className="flex items-center gap-1">
                      <span
                        className="h-2 w-2 rounded-sm"
                        style={{ background: RED }}
                      />
                      P1/P2
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-sm bg-orange-500/60" />
                      P3/P4
                    </span>
                  </div>
                </div>
                <div className="flex items-end gap-1.5 h-16">
                  {[
                    { p1: 8, p3: 12 },
                    { p1: 7, p3: 10 },
                    { p1: 9, p3: 11 },
                    { p1: 6, p3: 9 },
                    { p1: 5, p3: 8 },
                    { p1: 7, p3: 7 },
                    { p1: 4, p3: 8 },
                    { p1: 5, p3: 6 },
                    { p1: 3, p3: 7 },
                    { p1: 4, p3: 5 },
                    { p1: 3, p3: 5 },
                    { p1: 2, p3: 4 },
                  ].map((bar, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-stretch gap-0.5"
                    >
                      <div
                        className="rounded-t-sm transition-all duration-700"
                        style={{
                          height: mounted ? `${bar.p1 * 3}px` : "0px",
                          background: RED,
                          transitionDelay: `${i * 50}ms`,
                        }}
                      />
                      <div
                        className="rounded-b-sm transition-all duration-700"
                        style={{
                          height: mounted ? `${bar.p3 * 2.5}px` : "0px",
                          background: "rgba(249,115,22,0.5)",
                          transitionDelay: `${i * 50 + 100}ms`,
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[9px] text-theme-f font-mono">
                  {Array.from({ length: 12 }, (_, i) => (
                    <span key={i}>W{i + 1}</span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  INTEGRATION STRIP                                                */}
      {/* ================================================================ */}
      <Section variant="sky" className="py-16">
        <div
          id="integrations"
          ref={registerRef("integrations")}
          className={cn(
            "transition-all duration-700",
            isVisible("integrations")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <div className="text-center mb-10">
            <h2 className="text-heading-2 text-theme mb-2">
              Integrates with your stack
            </h2>
            <p className="text-body-base text-theme-s">
              SIGNAL connects to the monitoring and communication tools your
              team already uses.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {INTEGRATIONS.map((integration, i) => (
              <div
                key={integration.name}
                className={cn(
                  "flex flex-col items-center gap-3 rounded-xl border border-theme p-5 transition-all duration-500 hover:border-red-500/20 bg-theme-subtle/30",
                  isVisible("integrations")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${i * 80 + 200}ms` }}
              >
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{ background: `${integration.color}15` }}
                >
                  <integration.icon
                    className="w-5 h-5"
                    style={{ color: integration.color }}
                  />
                </div>
                <span className="text-sm font-medium text-theme">
                  {integration.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ================================================================ */}
      {/*  CTA                                                              */}
      {/* ================================================================ */}
      <Section variant="mint" className="py-24">
        <div
          id="cta"
          ref={registerRef("cta")}
          className={cn(
            "transition-all duration-700",
            isVisible("cta")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          <Card
            variant="light"
            className="relative overflow-hidden border-red-500/15 max-w-3xl mx-auto text-center px-8 py-16"
          >
            {/* Background glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, ${RED_GLOW}, transparent 70%)`,
                opacity: 0.25,
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Icon */}
              <div
                className="flex items-center justify-center w-14 h-14 rounded-2xl"
                style={{ background: RED }}
              >
                <Radio className="w-7 h-7 text-white" />
              </div>

              <div>
                <h2 className="text-heading-1 text-theme mb-3">
                  Start translating incidents into impact
                </h2>
                <p className="text-body-lg text-theme-s max-w-lg mx-auto">
                  Every minute without business context is a minute your
                  customers spend wondering if you know. Connect your
                  alerts to revenue today.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                <Button
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white border-0"
                  asChild
                >
                  <Link href="/products/signal">
                    Explore SIGNAL <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/pricing">
                    View Pricing <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-theme-m mt-2">
                No credit card required. Free tier includes 1 team and 50
                incidents/month.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* ── Footer accent ── */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(to right, transparent, ${RED}, transparent)`,
        }}
      />

      {/* ── Global keyframes ── */}
      <style jsx>{`
        @keyframes heroScan {
          0%,
          100% {
            transform: translateY(-200px);
            opacity: 0;
          }
          10% {
            opacity: 0.15;
          }
          50% {
            transform: translateY(400px);
            opacity: 0.1;
          }
          90% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

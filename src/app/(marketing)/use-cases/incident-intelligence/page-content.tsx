"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import {
  DollarSign,
  Route,
  FileSearch,
  Map,
  BarChart3,
  Link2,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plug,
  ScanSearch,
  Bell,
  ShieldCheck,
  Quote,
  Clock,
  Zap,
  ChevronRight,
  Star,
  Activity,
  Users,
  Timer,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const ACCENT = "#EF4444";

const PROBLEM_STATS = [
  {
    value: "73%",
    label: "of incidents lack business context",
    sub: "Responders fly blind without revenue data",
  },
  {
    value: "$420K",
    label: "avg revenue impact per major outage",
    sub: "Discovered only after post-mortem analysis",
  },
  {
    value: "45 min",
    label: "avg time to assemble right responders",
    sub: "Manual escalation chains burn critical minutes",
  },
];

const CAPABILITIES = [
  {
    icon: DollarSign,
    title: "Revenue Impact Scoring",
    description:
      "Every incident is scored by real-time revenue exposure so your team knows what matters most.",
  },
  {
    icon: Route,
    title: "Smart Routing",
    description:
      "Incidents route to the right on-call responder based on service ownership and business impact.",
  },
  {
    icon: FileSearch,
    title: "Auto-Context Enrichment",
    description:
      "Runbooks, recent deploys, and service dependencies are attached before the first responder opens the alert.",
  },
  {
    icon: Map,
    title: "Customer Impact Maps",
    description:
      "See which customers, accounts, and revenue tiers are affected the moment an incident fires.",
  },
  {
    icon: BarChart3,
    title: "Post-Incident Revenue Analysis",
    description:
      "Quantify the dollar cost of every incident to justify reliability investments to leadership.",
  },
  {
    icon: Link2,
    title: "SLA-to-Revenue Correlation",
    description:
      "Map SLA tiers to revenue so breaches are prioritized by business impact, not arbitrary severity.",
  },
];

const INCIDENT_FEED = [
  {
    id: "INC-1042",
    title: "Payment gateway timeout — US East",
    revenue: "$18.4K/hr",
    severity: "P1",
    customers: 2340,
    response: "2 min",
    severityColor: "#EF4444",
  },
  {
    id: "INC-1041",
    title: "Search indexing delay — EU region",
    revenue: "$4.2K/hr",
    severity: "P2",
    customers: 870,
    response: "6 min",
    severityColor: "#F59E0B",
  },
  {
    id: "INC-1040",
    title: "Dashboard chart rendering error",
    revenue: "$0.8K/hr",
    severity: "P3",
    customers: 310,
    response: "14 min",
    severityColor: "#22D3EE",
  },
  {
    id: "INC-1039",
    title: "Notification service queue backlog",
    revenue: "$2.1K/hr",
    severity: "P2",
    customers: 1250,
    response: "4 min",
    severityColor: "#F59E0B",
  },
  {
    id: "INC-1038",
    title: "Auth token refresh race condition",
    revenue: "$9.7K/hr",
    severity: "P1",
    customers: 1890,
    response: "3 min",
    severityColor: "#EF4444",
  },
  {
    id: "INC-1037",
    title: "CDN cache invalidation stale content",
    revenue: "$1.3K/hr",
    severity: "P3",
    customers: 540,
    response: "11 min",
    severityColor: "#22D3EE",
  },
];

const MTTR_DATA = [
  { incident: 1, mttr: 48, label: "Incident 1" },
  { incident: 2, mttr: 36, label: "Incident 2" },
  { incident: 3, mttr: 28, label: "Incident 3" },
  { incident: 4, mttr: 19, label: "Incident 4" },
  { incident: 5, mttr: 14, label: "Incident 5" },
  { incident: 6, mttr: 11, label: "Incident 6" },
];

const BEFORE_ITEMS = [
  { text: "Severity-based triage ignoring business value", icon: Clock },
  { text: "No revenue context until the post-mortem", icon: XCircle },
  { text: "Manual escalation chains burning critical minutes", icon: AlertTriangle },
  { text: "Responders assemble without service context", icon: XCircle },
];

const AFTER_ITEMS = [
  { text: "Revenue-aware routing from the first alert", icon: Zap },
  { text: "Dollar impact visible in real time", icon: CheckCircle2 },
  { text: "Auto-escalation to the right team in seconds", icon: CheckCircle2 },
  { text: "Full context attached before the page fires", icon: CheckCircle2 },
];

const WORKFLOW_STEPS = [
  {
    step: 1,
    icon: Plug,
    title: "Connect Monitoring Tools",
    description: "Link PagerDuty, Datadog, or your alerting stack. SIGNAL ingests every signal.",
  },
  {
    step: 2,
    icon: ScanSearch,
    title: "SIGNAL Indexes Services",
    description: "Your service catalog, ownership map, and revenue tiers are mapped automatically.",
  },
  {
    step: 3,
    icon: Bell,
    title: "Incident Detected & Enriched",
    description: "Alerts fire with revenue impact, affected customers, and runbook context attached.",
  },
  {
    step: 4,
    icon: ShieldCheck,
    title: "Revenue-Aware Response",
    description: "The right responders are paged with full business context to resolve fast.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We used to find out an outage cost us $200K three days later. Now we know the dollar impact within 30 seconds of the first alert.",
    name: "Jordan Malik",
    role: "VP of SRE, ScaleGrid",
    rating: 5,
  },
  {
    quote:
      "SIGNAL cut our MTTR by 62%. The revenue scoring alone changed how our execs view reliability investments.",
    name: "Priya Venkatesh",
    role: "Director of Engineering, FinOps Cloud",
    rating: 5,
  },
  {
    quote:
      "Before SIGNAL, our on-call team had zero business context. Now they know exactly which customers are impacted before they even open the dashboard.",
    name: "Marcus Dahl",
    role: "Platform Lead, NordTech",
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function IncidentIntelligencePage() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="incident-intelligence">
      {/* ============================================================ */}
      {/* 1. HERO                                                       */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] overflow-hidden bg-theme px-4 pb-20 pt-32 transition-colors duration-300">
        <div
          className="pointer-events-none absolute inset-0 bg-dot-grid"
          style={{ backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 38%, rgba(239,68,68,0.10), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto max-w-container">
          <div
            className={cn(
              "text-center transition-all duration-700",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Chip dotColor={ACCENT} className={`border border-[${ACCENT}]/20 bg-[${ACCENT}]/[0.08]`}>
              <span className="font-semibold" style={{ color: ACCENT }}>
                SIGNAL Incident Intelligence
              </span>
            </Chip>
          </div>

          <h1
            className={cn(
              "mx-auto mt-8 max-w-[860px] text-center text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-100",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            Incidents measured in{" "}
            <span style={{ color: ACCENT }}>dollars, not just severity</span>
          </h1>

          <p
            className={cn(
              "mx-auto mt-6 max-w-[620px] text-center text-lg leading-relaxed text-theme-m transition-all duration-700 delay-200",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            SIGNAL correlates incidents with revenue impact in real time. Route,
            triage, and resolve based on business context — not just severity
            levels.
          </p>

          <div
            className={cn(
              "mx-auto mt-10 flex max-w-md items-center justify-center gap-4 transition-all duration-700 delay-300",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Button size="lg" className="bg-[#EF4444] hover:bg-[#DC2626] text-white" asChild>
              <Link href="/auth/signup">
                Try SIGNAL Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/products/signal">See How It Works</Link>
            </Button>
          </div>

          {/* Before / After visual */}
          <div
            className={cn(
              "mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2 transition-all duration-700 delay-[400ms]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="group relative overflow-hidden rounded-card border border-theme bg-theme-card p-6">
              <span className="mb-4 inline-block rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                Before SIGNAL
              </span>
              <div className="space-y-3">
                {[
                  { label: "P1 — Gateway Down", detail: "Severity: Critical", extra: "No revenue data" },
                  { label: "P2 — Search Slow", detail: "Severity: High", extra: "No customer count" },
                  { label: "P3 — UI Glitch", detail: "Severity: Low", extra: "No impact context" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-red-500/10 bg-red-500/[0.04] px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-theme">{item.label}</p>
                      <p className="text-xs text-theme-m">{item.detail}</p>
                    </div>
                    <span className="text-xs text-red-400">{item.extra}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-theme-m">
                Severity-based triage with zero business context.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-card border border-[#EF4444]/30 bg-theme-card p-6">
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "rgba(239,68,68,0.12)", color: ACCENT }}
              >
                With SIGNAL
              </span>
              <div className="space-y-2">
                {[
                  { id: "INC-1042", title: "Payment gateway timeout", revenue: "$18.4K/hr", severity: "P1", color: "#EF4444" },
                  { id: "INC-1041", title: "Search indexing delay", revenue: "$4.2K/hr", severity: "P2", color: "#F59E0B" },
                  { id: "INC-1040", title: "Dashboard chart error", revenue: "$0.8K/hr", severity: "P3", color: "#22D3EE" },
                  { id: "INC-1039", title: "Notification queue backlog", revenue: "$2.1K/hr", severity: "P2", color: "#F59E0B" },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-theme bg-theme-subtle px-3 py-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: t.color }} />
                      <span className="text-xs font-mono text-theme-s">{t.id}</span>
                      <span className="text-sm text-theme">{t.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold" style={{ color: ACCENT }}>
                        {t.revenue}
                      </span>
                      <span className="text-xs text-theme-m">{t.severity}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-theme-s">
                <span>
                  Active P1s: <span style={{ color: ACCENT }} className="font-semibold">2</span>
                </span>
                <span>
                  Revenue at Risk: <span style={{ color: ACCENT }} className="font-semibold">$28.1K/hr</span>
                </span>
              </div>
              <p className="mt-3 text-sm text-theme-m">
                Revenue-aware feed with business impact on every incident.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THE PROBLEM                                                */}
      {/* ============================================================ */}
      <Section variant="coral">
        <div className="text-center">
          <Chip dotColor={ACCENT}>The Problem</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Incident response is flying blind
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Teams triage by severity labels while millions in revenue slip away.
            Business context arrives days later — in the post-mortem.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {PROBLEM_STATS.map((stat, i) => (
            <Card key={i} variant="light" className="text-center">
              <p
                className="text-5xl font-bold tracking-tight"
                style={{ color: ACCENT }}
              >
                {stat.value}
              </p>
              <p className="mt-3 text-lg font-semibold text-theme">{stat.label}</p>
              <p className="mt-2 text-sm text-theme-m">{stat.sub}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 3. HOW SIGNAL SOLVES IT                                       */}
      {/* ============================================================ */}
      <Section variant="sky">
        <div className="text-center">
          <Chip dotColor={ACCENT}>6 Intelligence Capabilities</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            How SIGNAL delivers revenue-aware response
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-body-lg text-theme-m">
            SIGNAL enriches every incident with business context so your team
            resolves what matters most — first.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <Card key={i} variant="light" className="group relative overflow-hidden">
                <div
                  className="absolute inset-x-0 top-0 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }}
                />
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "rgba(239,68,68,0.12)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                </div>
                <h3 className="text-lg font-semibold text-theme">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-theme-s">
                  {cap.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 4. INCIDENT FEED DEMO                                         */}
      {/* ============================================================ */}
      <Section variant="coral">
        <div className="text-center">
          <Chip dotColor={ACCENT}>Live Incident Feed</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            What a revenue-aware incident feed looks like
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-body-lg text-theme-m">
            Real incidents. Real revenue impact. Real customer counts. Prioritized
            by business value — not just severity.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-card border border-theme bg-theme-card">
          <div className="flex items-center justify-between border-b border-theme px-6 py-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(239,68,68,0.15)" }}
              >
                <Activity className="h-4 w-4" style={{ color: ACCENT }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-theme">Incident Feed</p>
                <p className="text-xs text-theme-m">Live — last updated 12 sec ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-theme-s">
                Active:{" "}
                <span className="font-bold" style={{ color: ACCENT }}>
                  6
                </span>
              </span>
              <span className="text-theme-s">
                Revenue at Risk:{" "}
                <span className="font-bold" style={{ color: ACCENT }}>
                  $36.5K/hr
                </span>
              </span>
            </div>
          </div>

          <div className="divide-y divide-theme">
            {INCIDENT_FEED.map((incident, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                    style={{
                      background: `${incident.severityColor}15`,
                      color: incident.severityColor,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: incident.severityColor }}
                    />
                    {incident.severity}
                  </span>
                  <span className="font-mono text-xs text-theme-m">{incident.id}</span>
                  <span className="text-sm text-theme">{incident.title}</span>
                </div>
                <div className="flex items-center gap-4 pl-8 sm:pl-0">
                  <span className="flex items-center gap-1 text-xs text-theme-m">
                    <Users className="h-3 w-3" /> {incident.customers.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-theme-m">
                    <Timer className="h-3 w-3" /> {incident.response}
                  </span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: ACCENT }}
                  >
                    {incident.revenue}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-theme bg-red-500/[0.04] px-6 py-3">
            <div className="flex items-start gap-2">
              <AlertTriangle
                className="mt-0.5 h-4 w-4 flex-shrink-0"
                style={{ color: ACCENT }}
              />
              <p className="text-sm text-theme-s">
                <span className="font-semibold" style={{ color: ACCENT }}>
                  Priority:
                </span>{" "}
                INC-1042 is impacting 2,340 customers at $18.4K/hr. Payment team
                auto-paged. Runbook attached.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 5. MTTR REDUCTION OVER TIME                                   */}
      {/* ============================================================ */}
      <Section variant="sky">
        <div className="text-center">
          <Chip dotColor={ACCENT}>Learning Engine</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            MTTR that shrinks with every incident
          </h2>
          <p className="mx-auto mt-4 max-w-[580px] text-body-lg text-theme-m">
            SIGNAL learns your incident patterns. Every resolution makes the next
            response faster and more accurate.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative overflow-hidden rounded-card border border-theme bg-theme-card p-8">
            <div className="absolute left-3 top-8 flex h-[200px] flex-col justify-between text-[10px] text-theme-m">
              <span>50 min</span>
              <span>35 min</span>
              <span>20 min</span>
              <span>5 min</span>
            </div>

            <div className="ml-10">
              <div className="relative h-[200px]">
                {[50, 35, 20, 5].map((line) => (
                  <div
                    key={line}
                    className="absolute left-0 right-0 border-t border-theme"
                    style={{ top: `${((50 - line) / 45) * 100}%` }}
                  />
                ))}

                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 500 200"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="mttrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M${(0 / 5) * 500} ${200 - ((48 - 5) / 45) * 200} L${(1 / 5) * 500} ${200 - ((36 - 5) / 45) * 200} L${(2 / 5) * 500} ${200 - ((28 - 5) / 45) * 200} L${(3 / 5) * 500} ${200 - ((19 - 5) / 45) * 200} L${(4 / 5) * 500} ${200 - ((14 - 5) / 45) * 200} L${(5 / 5) * 500} ${200 - ((11 - 5) / 45) * 200} L${(5 / 5) * 500} 200 L${(0 / 5) * 500} 200 Z`}
                    fill="url(#mttrGrad)"
                  />
                  <path
                    d={`M${(0 / 5) * 500} ${200 - ((48 - 5) / 45) * 200} L${(1 / 5) * 500} ${200 - ((36 - 5) / 45) * 200} L${(2 / 5) * 500} ${200 - ((28 - 5) / 45) * 200} L${(3 / 5) * 500} ${200 - ((19 - 5) / 45) * 200} L${(4 / 5) * 500} ${200 - ((14 - 5) / 45) * 200} L${(5 / 5) * 500} ${200 - ((11 - 5) / 45) * 200}`}
                    stroke={ACCENT}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {MTTR_DATA.map((d, i) => {
                  const xPercent = (i / 5) * 100;
                  const yPercent = ((50 - d.mttr) / 45) * 100;
                  return (
                    <div
                      key={i}
                      className="absolute flex flex-col items-center"
                      style={{
                        left: `${xPercent}%`,
                        top: `${yPercent}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className="h-4 w-4 rounded-full border-2 bg-theme-card shadow-md"
                        style={{ borderColor: ACCENT, boxShadow: `0 0 12px rgba(239,68,68,0.4)` }}
                      />
                      <div className="mt-2 flex flex-col items-center">
                        <span className="text-sm font-bold" style={{ color: ACCENT }}>
                          {d.mttr}m
                        </span>
                        <span className="text-[10px] text-theme-m">{d.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/[0.06] px-4 py-2.5">
              <Activity className="h-4 w-4" style={{ color: ACCENT }} />
              <span className="text-sm font-medium text-theme-s">
                SIGNAL learns resolution patterns &mdash; MTTR drops with every
                incident
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 6. BEFORE VS AFTER                                            */}
      {/* ============================================================ */}
      <Section variant="coral">
        <div className="text-center">
          <Chip dotColor={ACCENT}>The Transformation</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Before vs. After SIGNAL
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-body-lg text-theme-m">
            See what changes when every incident carries revenue context from the
            first alert.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card variant="light" className="border-red-500/20">
            <div className="mb-6 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-semibold text-red-400">Without SIGNAL</h3>
            </div>
            <div className="space-y-4">
              {BEFORE_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400/70" />
                    <span className="text-sm text-theme-s">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card variant="light" className="border-[#EF4444]/30">
            <div className="mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" style={{ color: ACCENT }} />
              <h3 className="text-lg font-semibold" style={{ color: ACCENT }}>
                With SIGNAL
              </h3>
            </div>
            <div className="space-y-4">
              {AFTER_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <Icon
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: ACCENT }}
                    />
                    <span className="text-sm text-theme-s">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 7. WORKFLOW STEPS                                              */}
      {/* ============================================================ */}
      <Section variant="sky">
        <div className="text-center">
          <Chip dotColor={ACCENT}>Setup in Minutes</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Four steps to revenue-aware incidents
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Connect your monitoring tools. SIGNAL handles the rest.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative">
                  <Card variant="light" className="h-full text-center">
                    <div
                      className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white"
                      style={{ background: ACCENT }}
                    >
                      {step.step}
                    </div>
                    <div
                      className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "rgba(239,68,68,0.1)" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                    </div>
                    <h3 className="text-base font-semibold text-theme">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-theme-s">{step.description}</p>
                  </Card>

                  {i < WORKFLOW_STEPS.length - 1 && (
                    <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                      <ChevronRight
                        className="h-5 w-5"
                        style={{ color: ACCENT }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 8. TESTIMONIALS                                               */}
      {/* ============================================================ */}
      <Section variant="coral">
        <div className="text-center">
          <Chip dotColor={ACCENT}>What Teams Say</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Trusted by SRE and DevOps teams
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} variant="light" className="flex flex-col justify-between">
              <div>
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-[#EF4444]"
                      style={{ color: ACCENT }}
                    />
                  ))}
                </div>
                <Quote className="mb-2 h-5 w-5 text-theme-f" />
                <p className="text-sm leading-relaxed text-theme-s">
                  {t.quote}
                </p>
              </div>
              <div className="mt-6 border-t border-theme pt-4">
                <p className="text-sm font-semibold text-theme">{t.name}</p>
                <p className="text-xs text-theme-m">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 9. FINAL CTA                                                  */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-theme px-4 py-20 sm:py-28 transition-colors duration-300">
        {[
          "top-4 left-[10%]",
          "top-[40%] right-[5%]",
          "bottom-8 left-[30%]",
          "bottom-[20%] right-[20%]",
        ].map((pos, i) => (
          <span
            key={i}
            className={`absolute h-[160px] w-[160px] rounded-3xl opacity-20 blur-3xl ${pos}`}
            style={{
              background:
                "linear-gradient(to bottom, rgba(239,68,68,0.3), rgba(239,68,68,0.05))",
            }}
            aria-hidden="true"
          />
        ))}

        <div className="relative z-[1] mx-auto max-w-container text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Start resolving by revenue impact
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-body-lg text-theme-m">
            Join 800+ SRE teams already using SIGNAL to correlate incidents with
            revenue. Free to get started.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white sm:w-auto"
              asChild
            >
              <Link href="/auth/signup">
                Start Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/products/signal">Explore SIGNAL</Link>
            </Button>
          </div>

          <p className="mt-5 text-sm text-theme-f">
            Free forever plan &middot; No credit card required &middot; Setup in
            5 minutes
          </p>
        </div>
      </section>
    </div>
  );
}

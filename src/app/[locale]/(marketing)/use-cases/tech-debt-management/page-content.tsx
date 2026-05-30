"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import {
  Flame,
  DollarSign,
  Gauge,
  ListChecks,
  BarChart3,
  Trophy,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  GitBranch,
  ScanSearch,
  Target,
  TrendingDown,
  Quote,
  Clock,
  Zap,
  ChevronRight,
  Star,
  Bug,
  FileCode,
  FolderTree,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const ACCENT = "#22D3EE";

const PROBLEM_STATS = [
  {
    value: "67%",
    label: "of engineering time lost to undocumented debt",
    sub: "Invisible drag on every sprint's velocity",
  },
  {
    value: "$4.2M",
    label: "avg annual cost of unmanaged tech debt",
    sub: "Hidden in slower releases, outages, and rework",
  },
  {
    value: "82%",
    label: "of debt remediation is reactive",
    sub: "Teams only fix debt when it becomes a crisis",
  },
];

const CAPABILITIES = [
  {
    icon: Flame,
    title: "Debt Hotspot Detection",
    description:
      "PHANTOM identifies the exact files, modules, and services where debt is concentrated and compounding.",
  },
  {
    icon: DollarSign,
    title: "Dollar-Value Scoring",
    description:
      "Every debt item is scored in dollars — engineering cost, velocity drag, and incident risk combined.",
  },
  {
    icon: Gauge,
    title: "Velocity Impact Analysis",
    description:
      "See exactly how much debt is slowing your team's throughput, measured in days per sprint.",
  },
  {
    icon: ListChecks,
    title: "Remediation Planning",
    description:
      "AI-generated remediation plans with effort estimates, dependencies, and recommended sequencing.",
  },
  {
    icon: BarChart3,
    title: "Executive Dashboards",
    description:
      "Board-ready views translating tech debt into business language that leadership understands.",
  },
  {
    icon: Trophy,
    title: "ROI-Based Prioritization",
    description:
      "Rank debt remediation by return on investment so your team fixes what delivers the most value first.",
  },
];

const DEBT_ITEMS = [
  {
    file: "src/payments/processor.ts",
    module: "Payments",
    dollarCost: "$142K/yr",
    velocityDrag: "2.1 days/sprint",
    severity: "critical",
  },
  {
    file: "src/auth/legacy-provider.ts",
    module: "Auth",
    dollarCost: "$98K/yr",
    velocityDrag: "1.4 days/sprint",
    severity: "high",
  },
  {
    file: "src/api/v1/routes.ts",
    module: "API",
    dollarCost: "$67K/yr",
    velocityDrag: "0.9 days/sprint",
    severity: "high",
  },
  {
    file: "src/db/migrations/legacy.ts",
    module: "Database",
    dollarCost: "$54K/yr",
    velocityDrag: "0.7 days/sprint",
    severity: "medium",
  },
  {
    file: "src/ui/components/table.tsx",
    module: "UI",
    dollarCost: "$31K/yr",
    velocityDrag: "0.4 days/sprint",
    severity: "medium",
  },
  {
    file: "src/utils/date-helpers.ts",
    module: "Utilities",
    dollarCost: "$12K/yr",
    velocityDrag: "0.2 days/sprint",
    severity: "low",
  },
];

const DEBT_INDEX_DATA = [
  { month: 1, index: 84, label: "Month 1" },
  { month: 2, index: 72, label: "Month 2" },
  { month: 3, index: 61, label: "Month 3" },
  { month: 4, index: 48, label: "Month 4" },
  { month: 5, index: 37, label: "Month 5" },
  { month: 6, index: 28, label: "Month 6" },
];

const BEFORE_ITEMS = [
  { text: "Debt is invisible until it causes an outage", icon: Clock },
  { text: "No way to quantify debt in business terms", icon: XCircle },
  { text: "Remediation is reactive and unplanned", icon: AlertTriangle },
  { text: "Leadership can't justify debt paydown investment", icon: XCircle },
];

const AFTER_ITEMS = [
  { text: "Every debt item scored in dollars and velocity drag", icon: Zap },
  { text: "Proactive remediation plans with ROI estimates", icon: CheckCircle2 },
  { text: "Executive dashboards leadership actually reads", icon: CheckCircle2 },
  { text: "Debt index trending down every month", icon: CheckCircle2 },
];

const WORKFLOW_STEPS = [
  {
    step: 1,
    icon: GitBranch,
    title: "Connect Repos",
    description: "Link your repositories. PHANTOM ingests your entire codebase history.",
  },
  {
    step: 2,
    icon: ScanSearch,
    title: "PHANTOM Scans Codebase",
    description: "Code complexity, churn patterns, and dependency risks are analyzed automatically.",
  },
  {
    step: 3,
    icon: Target,
    title: "Debt Scored & Prioritized",
    description: "Every debt item gets a dollar score, velocity impact, and remediation estimate.",
  },
  {
    step: 4,
    icon: TrendingDown,
    title: "Remediation Tracked",
    description: "Track debt paydown progress with ROI metrics and trending debt index.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We showed the board PHANTOM's dollar-cost view and got $800K approved for debt paydown the same quarter. First time engineering debt was taken seriously.",
    name: "Tomás Rivera",
    role: "VP Engineering, Centrifuge",
    rating: 5,
  },
  {
    quote:
      "PHANTOM found that 60% of our velocity drag came from three files. We fixed them in one sprint and saw a 22% throughput increase immediately.",
    name: "Suki Patel",
    role: "Engineering Manager, Vantage Health",
    rating: 5,
  },
  {
    quote:
      "We went from 'tech debt is a feeling' to 'tech debt costs us $3.1M annually, here's the fix plan.' PHANTOM changed the conversation entirely.",
    name: "Erik Lindqvist",
    role: "CTO, Nordbeam",
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function severityStyle(severity: string) {
  if (severity === "critical")
    return { bg: "bg-red-500/15", text: "text-red-400", dot: "#f87171" };
  if (severity === "high")
    return { bg: "bg-orange-500/15", text: "text-orange-400", dot: "#fb923c" };
  if (severity === "medium")
    return { bg: "bg-amber-500/15", text: "text-amber-400", dot: "#fbbf24" };
  return { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "#34d399" };
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function TechDebtManagementPage() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="tech-debt-management">
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
              "radial-gradient(ellipse 60% 50% at 50% 38%, rgba(34,211,238,0.10), transparent)",
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
                PHANTOM Tech Debt Intelligence
              </span>
            </Chip>
          </div>

          <h1
            className={cn(
              "mx-auto mt-8 max-w-[860px] text-center text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-100",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            Tech debt measured in{" "}
            <span style={{ color: ACCENT }}>dollars, not story points</span>
          </h1>

          <p
            className={cn(
              "mx-auto mt-6 max-w-[620px] text-center text-lg leading-relaxed text-theme-m transition-all duration-700 delay-200",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            PHANTOM translates tech debt into business impact. Know exactly which
            debt is costing you money, slowing your team, and blocking your
            roadmap.
          </p>

          <div
            className={cn(
              "mx-auto mt-10 flex max-w-md items-center justify-center gap-4 transition-all duration-700 delay-300",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Button size="lg" className="bg-[#22D3EE] hover:bg-[#06B6D4] text-black" asChild>
              <Link href="/auth/signup">
                Try PHANTOM Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/products/phantom">See How It Works</Link>
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
                Before PHANTOM
              </span>
              <div className="space-y-3">
                {[
                  { label: "Payment processor — old patterns", status: "Unknown cost" },
                  { label: "Auth provider — legacy code", status: "Unknown impact" },
                  { label: "API routes — no versioning", status: "Unknown risk" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-red-500/10 bg-red-500/[0.04] px-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <Bug className="h-3.5 w-3.5 text-red-400/60" />
                      <span className="text-sm text-theme">{item.label}</span>
                    </div>
                    <span className="text-xs text-red-400">{item.status}</span>
                  </div>
                ))}
                <div className="flex items-center justify-center gap-1 rounded-lg border border-dashed border-red-500/20 bg-red-500/[0.02] px-4 py-3 text-xs text-red-400">
                  <AlertTriangle className="h-3 w-3" /> Debt is invisible until it causes a crisis
                </div>
              </div>
              <p className="mt-4 text-sm text-theme-m">
                Debt is a feeling, not a metric. No dollar values, no priorities.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-card border border-[#22D3EE]/30 bg-theme-card p-6">
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "rgba(34,211,238,0.12)", color: ACCENT }}
              >
                With PHANTOM
              </span>
              <div className="space-y-2">
                {[
                  { file: "processor.ts", module: "Payments", cost: "$142K/yr", severity: "critical" },
                  { file: "legacy-provider.ts", module: "Auth", cost: "$98K/yr", severity: "high" },
                  { file: "v1/routes.ts", module: "API", cost: "$67K/yr", severity: "high" },
                  { file: "legacy.ts", module: "Database", cost: "$54K/yr", severity: "medium" },
                ].map((t, i) => {
                  const s = severityStyle(t.severity);
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-theme bg-theme-subtle px-3 py-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full" style={{ background: s.dot }} />
                        <span className="text-xs font-mono text-theme-s">{t.file}</span>
                        <span className="text-sm text-theme">{t.module}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn("text-xs font-semibold", s.text)}>
                          {t.severity}
                        </span>
                        <span className="text-xs font-bold" style={{ color: ACCENT }}>
                          {t.cost}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-theme-s">
                <span>
                  Total Debt: <span style={{ color: ACCENT }} className="font-semibold">$404K/yr</span>
                </span>
                <span>
                  Debt Index: <span style={{ color: ACCENT }} className="font-semibold">84/100</span>
                </span>
              </div>
              <p className="mt-3 text-sm text-theme-m">
                Every debt item quantified in dollars with clear remediation ROI.
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
            Tech debt is a black box
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Teams know debt exists but can&apos;t quantify it. Leadership
            can&apos;t justify paydown without business impact numbers.
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
      {/* 3. HOW PHANTOM SOLVES IT                                      */}
      {/* ============================================================ */}
      <Section variant="sky">
        <div className="text-center">
          <Chip dotColor={ACCENT}>6 Intelligence Capabilities</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            How PHANTOM translates debt to dollars
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-body-lg text-theme-m">
            PHANTOM scans your codebase and maps every debt item to its real
            business cost — so you fix what matters most.
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
                  style={{ background: "rgba(34,211,238,0.12)" }}
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
      {/* 4. TECH DEBT DASHBOARD DEMO                                   */}
      {/* ============================================================ */}
      <Section variant="coral">
        <div className="text-center">
          <Chip dotColor={ACCENT}>Live Dashboard</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            What a debt-to-dollar dashboard looks like
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-body-lg text-theme-m">
            Real hotspots. Real dollar costs. Real velocity drag. Prioritized by
            ROI — not gut feeling.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-card border border-theme bg-theme-card">
          <div className="flex items-center justify-between border-b border-theme px-6 py-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(34,211,238,0.15)" }}
              >
                <FolderTree className="h-4 w-4" style={{ color: ACCENT }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-theme">Tech Debt Hotspot Map</p>
                <p className="text-xs text-theme-m">Last scan: 2 hrs ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-theme-s">
                Total Cost:{" "}
                <span className="font-bold" style={{ color: ACCENT }}>
                  $404K/yr
                </span>
              </span>
              <span className="text-theme-s">
                Velocity Drag:{" "}
                <span className="font-bold" style={{ color: ACCENT }}>
                  5.7 days/sprint
                </span>
              </span>
            </div>
          </div>

          <div className="divide-y divide-theme">
            {DEBT_ITEMS.map((item, i) => {
              const s = severityStyle(item.severity);
              return (
                <div
                  key={i}
                  className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        s.bg,
                        s.text
                      )}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: s.dot }}
                      />
                      {item.severity}
                    </span>
                    <span className="font-mono text-xs text-theme-m">{item.file}</span>
                    <span className="text-sm text-theme">{item.module}</span>
                  </div>
                  <div className="flex items-center gap-4 pl-8 sm:pl-0">
                    <span className="flex items-center gap-1 text-xs text-theme-m">
                      <Gauge className="h-3 w-3" /> {item.velocityDrag}
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: ACCENT }}
                    >
                      {item.dollarCost}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-theme bg-cyan-500/[0.04] px-6 py-3">
            <div className="flex items-start gap-2">
              <AlertTriangle
                className="mt-0.5 h-4 w-4 flex-shrink-0"
                style={{ color: ACCENT }}
              />
              <p className="text-sm text-theme-s">
                <span className="font-semibold" style={{ color: ACCENT }}>
                  Top Priority:
                </span>{" "}
                Payments processor.ts accounts for 35% of total debt cost.
                Remediation ROI: 4.2x in 1 sprint.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 5. DEBT INDEX REDUCTION OVER TIME                             */}
      {/* ============================================================ */}
      <Section variant="sky">
        <div className="text-center">
          <Chip dotColor={ACCENT}>Continuous Improvement</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            A debt index that actually goes down
          </h2>
          <p className="mx-auto mt-4 max-w-[580px] text-body-lg text-theme-m">
            PHANTOM tracks your debt paydown progress and proves ROI to
            leadership with every sprint.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative overflow-hidden rounded-card border border-theme bg-theme-card p-8">
            <div className="absolute left-3 top-8 flex h-[200px] flex-col justify-between text-[10px] text-theme-m">
              <span>100</span>
              <span>70</span>
              <span>40</span>
              <span>10</span>
            </div>

            <div className="ml-8">
              <div className="relative h-[200px]">
                {[100, 70, 40, 10].map((line) => (
                  <div
                    key={line}
                    className="absolute left-0 right-0 border-t border-theme"
                    style={{ top: `${((100 - line) / 90) * 100}%` }}
                  />
                ))}

                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 500 200"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="debtGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M${(0 / 5) * 500} ${200 - ((84 - 10) / 90) * 200} L${(1 / 5) * 500} ${200 - ((72 - 10) / 90) * 200} L${(2 / 5) * 500} ${200 - ((61 - 10) / 90) * 200} L${(3 / 5) * 500} ${200 - ((48 - 10) / 90) * 200} L${(4 / 5) * 500} ${200 - ((37 - 10) / 90) * 200} L${(5 / 5) * 500} ${200 - ((28 - 10) / 90) * 200} L${(5 / 5) * 500} 200 L${(0 / 5) * 500} 200 Z`}
                    fill="url(#debtGrad)"
                  />
                  <path
                    d={`M${(0 / 5) * 500} ${200 - ((84 - 10) / 90) * 200} L${(1 / 5) * 500} ${200 - ((72 - 10) / 90) * 200} L${(2 / 5) * 500} ${200 - ((61 - 10) / 90) * 200} L${(3 / 5) * 500} ${200 - ((48 - 10) / 90) * 200} L${(4 / 5) * 500} ${200 - ((37 - 10) / 90) * 200} L${(5 / 5) * 500} ${200 - ((28 - 10) / 90) * 200}`}
                    stroke={ACCENT}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {DEBT_INDEX_DATA.map((d, i) => {
                  const xPercent = (i / 5) * 100;
                  const yPercent = ((100 - d.index) / 90) * 100;
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
                        style={{ borderColor: ACCENT, boxShadow: `0 0 12px rgba(34,211,238,0.4)` }}
                      />
                      <div className="mt-2 flex flex-col items-center">
                        <span className="text-sm font-bold" style={{ color: ACCENT }}>
                          {d.index}
                        </span>
                        <span className="text-[10px] text-theme-m">{d.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-[#22D3EE]/20 bg-[#22D3EE]/[0.06] px-4 py-2.5">
              <TrendingDown className="h-4 w-4" style={{ color: ACCENT }} />
              <span className="text-sm font-medium text-theme-s">
                PHANTOM tracks paydown progress &mdash; your debt index drops
                with every remediation
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
            Before vs. After PHANTOM
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-body-lg text-theme-m">
            See what changes when tech debt has a dollar sign attached to it.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card variant="light" className="border-red-500/20">
            <div className="mb-6 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-semibold text-red-400">Without PHANTOM</h3>
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

          <Card variant="light" className="border-[#22D3EE]/30">
            <div className="mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" style={{ color: ACCENT }} />
              <h3 className="text-lg font-semibold" style={{ color: ACCENT }}>
                With PHANTOM
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
            Four steps to debt-to-dollar intelligence
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Connect your repos. PHANTOM does the rest.
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
                      className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-black"
                      style={{ background: ACCENT }}
                    >
                      {step.step}
                    </div>
                    <div
                      className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "rgba(34,211,238,0.1)" }}
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
            Trusted by engineering leaders
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
                      className="h-4 w-4 fill-[#22D3EE]"
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
                "linear-gradient(to bottom, rgba(34,211,238,0.3), rgba(34,211,238,0.05))",
            }}
            aria-hidden="true"
          />
        ))}

        <div className="relative z-[1] mx-auto max-w-container text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Turn tech debt into a boardroom conversation
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-body-lg text-theme-m">
            Join 900+ engineering teams already using PHANTOM to quantify and
            eliminate tech debt. Free to get started.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-[#22D3EE] hover:bg-[#06B6D4] text-black sm:w-auto"
              asChild
            >
              <Link href="/auth/signup">
                Start Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/products/phantom">Explore PHANTOM</Link>
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

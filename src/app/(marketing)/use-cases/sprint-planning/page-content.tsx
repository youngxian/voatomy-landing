"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import {
  Brain,
  Users,
  MessageSquare,
  Bug,
  Palette,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  GitBranch,
  Import,
  Cpu,
  Rocket,
  Quote,
  Clock,
  Target,
  Zap,
  ChevronRight,
  Star,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PROBLEM_STATS = [
  {
    value: "60%",
    label: "of sprint tasks are misestimated",
    sub: "Leading to scope creep and missed deadlines",
  },
  {
    value: "2+ hrs",
    label: "wasted per sprint in planning",
    sub: "Debating story points instead of shipping",
  },
  {
    value: "40%+",
    label: "overruns from gut-feel estimates",
    sub: "Because humans can't weigh 6 variables at once",
  },
];

const SIGNALS = [
  {
    icon: Brain,
    title: "Code Complexity",
    description: "AI reads your codebase to understand actual implementation difficulty per ticket.",
    accent: "#f16e2c",
  },
  {
    icon: Users,
    title: "Team Capacity",
    description: "PTO, skill mapping, and historical velocity factored into every plan.",
    accent: "#f16e2c",
  },
  {
    icon: MessageSquare,
    title: "Customer Demand",
    description: "Support tickets and sales objections create revenue-weighted priorities.",
    accent: "#f16e2c",
  },
  {
    icon: Bug,
    title: "Tech Debt",
    description: "Debt hotspots are surfaced and factored into every time estimate.",
    accent: "#f16e2c",
  },
  {
    icon: Palette,
    title: "Design Scope",
    description: "Figma complexity is analyzed so UI effort is never an afterthought.",
    accent: "#f16e2c",
  },
  {
    icon: TrendingUp,
    title: "Business Priority",
    description: "Revenue data from your CRM informs trade-offs automatically.",
    accent: "#f16e2c",
  },
];

const SPRINT_TICKETS = [
  {
    id: "FE-42",
    title: "Refactor dashboard charts to use new design system",
    confidence: 95,
    points: 5,
    complexity: "low",
    assignee: "Sarah K.",
  },
  {
    id: "BE-18",
    title: "Migrate payment webhook handler to v3 API",
    confidence: 72,
    points: 13,
    complexity: "high",
    assignee: "Marcus R.",
  },
  {
    id: "FE-44",
    title: "Implement onboarding wizard step 3 & 4",
    confidence: 88,
    points: 8,
    complexity: "medium",
    assignee: "Priya M.",
  },
  {
    id: "API-3",
    title: "Build rate-limiting middleware for public endpoints",
    confidence: 91,
    points: 5,
    complexity: "low",
    assignee: "James L.",
  },
  {
    id: "BE-21",
    title: "Add multi-tenant data isolation layer",
    confidence: 76,
    points: 8,
    complexity: "high",
    assignee: "Marcus R.",
  },
  {
    id: "FE-46",
    title: "Notification center real-time updates via WebSocket",
    confidence: 83,
    points: 3,
    complexity: "medium",
    assignee: "Sarah K.",
  },
];

const ACCURACY_DATA = [
  { sprint: 1, accuracy: 62, label: "Sprint 1" },
  { sprint: 3, accuracy: 78, label: "Sprint 3" },
  { sprint: 5, accuracy: 85, label: "Sprint 5" },
  { sprint: 8, accuracy: 91, label: "Sprint 8" },
];

const BEFORE_ITEMS = [
  { text: "2-hour planning meetings", icon: Clock },
  { text: "Story point debates with no data", icon: XCircle },
  { text: "Mid-sprint surprises and scope creep", icon: AlertTriangle },
  { text: "Capacity guesswork every sprint", icon: XCircle },
];

const AFTER_ITEMS = [
  { text: "20-minute data-backed planning", icon: Zap },
  { text: "Code-complexity-backed estimates", icon: CheckCircle2 },
  { text: "Risks pre-flagged before sprint starts", icon: CheckCircle2 },
  { text: "Real capacity from velocity + PTO data", icon: CheckCircle2 },
];

const WORKFLOW_STEPS = [
  {
    step: 1,
    icon: GitBranch,
    title: "Connect GitHub",
    description: "Link your repos. ATLAS indexes your codebase structure and complexity.",
  },
  {
    step: 2,
    icon: Import,
    title: "Import Jira Backlog",
    description: "Sync your backlog. Tickets are enriched with code and design context.",
  },
  {
    step: 3,
    icon: Cpu,
    title: "ATLAS Analyzes",
    description: "Six signals converge. AI scores complexity, risk, and capacity fit.",
  },
  {
    step: 4,
    icon: Rocket,
    title: "Sprint Plan Ready",
    description: "A confidence-scored, risk-flagged plan lands in your sprint board.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We went from two-hour grooming sessions to twenty minutes. The AI catches complexity our seniors miss because it actually reads the code.",
    name: "Andrea Chen",
    role: "Engineering Manager, Streamline",
    rating: 5,
  },
  {
    quote:
      "Sprint overruns dropped 38% in three months. ATLAS factoring in tech debt was the unlock we didn't know we needed.",
    name: "Daniel Okafor",
    role: "VP Engineering, FinLedger",
    rating: 5,
  },
  {
    quote:
      "Planning poker felt like a ritual. Now we spend that time actually building. The confidence scores let us have honest conversations about risk.",
    name: "Rachel Torres",
    role: "Scrum Master, Pivotal Health",
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Helper: complexity color                                           */
/* ------------------------------------------------------------------ */

function complexityColor(c: string) {
  if (c === "low") return { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "#34d399" };
  if (c === "medium") return { bg: "bg-amber-500/15", text: "text-amber-400", dot: "#fbbf24" };
  return { bg: "bg-orange-500/15", text: "text-orange-400", dot: "#f97316" };
}

function confidenceColor(n: number) {
  if (n >= 90) return "text-emerald-400";
  if (n >= 80) return "text-amber-300";
  return "text-orange-400";
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function SprintPlanningPage() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="sprint-planning">
      {/* ============================================================ */}
      {/* 1. HERO                                                       */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] overflow-hidden bg-theme px-4 pb-20 pt-32 transition-colors duration-300">
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 bg-dot-grid"
          style={{ backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />

        {/* Orange glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 38%, rgba(241,110,44,0.10), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto max-w-container">
          {/* Eyebrow */}
          <div
            className={cn(
              "text-center transition-all duration-700",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Chip dotColor="#f16e2c" className="border border-[#f16e2c]/20 bg-[#f16e2c]/[0.08]">
              <span className="font-semibold" style={{ color: "#f16e2c" }}>
                ATLAS Sprint Planner
              </span>
            </Chip>
          </div>

          {/* Headline */}
          <h1
            className={cn(
              "mx-auto mt-8 max-w-[860px] text-center text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-100",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            Replace gut-feel with{" "}
            <span style={{ color: "#f16e2c" }}>data-driven estimation</span>
          </h1>

          {/* Sub */}
          <p
            className={cn(
              "mx-auto mt-6 max-w-[620px] text-center text-lg leading-relaxed text-theme-m transition-all duration-700 delay-200",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            ATLAS analyzes your code, team capacity, tech debt, and business
            priorities to generate sprint plans your team actually trusts.
          </p>

          {/* CTAs */}
          <div
            className={cn(
              "mx-auto mt-10 flex max-w-md items-center justify-center gap-4 transition-all duration-700 delay-300",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Button size="lg" className="bg-[#f16e2c] hover:bg-[#d85d1f] text-white" asChild>
              <Link href="/auth/signup">
                Try ATLAS Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/products/atlas">See How It Works</Link>
            </Button>
          </div>

          {/* Before / After visual */}
          <div
            className={cn(
              "mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2 transition-all duration-700 delay-[400ms]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {/* BEFORE - messy whiteboard */}
            <div className="group relative overflow-hidden rounded-card border border-theme bg-theme-card p-6">
              <span className="mb-4 inline-block rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                Before ATLAS
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Auth flow?", rotate: "-3deg", bg: "bg-amber-400/80" },
                  { label: "~5 pts??", rotate: "2deg", bg: "bg-pink-400/80" },
                  { label: "Need design", rotate: "-1deg", bg: "bg-blue-400/80" },
                  { label: "Tech debt!", rotate: "4deg", bg: "bg-red-400/80" },
                  { label: "Who owns?", rotate: "-2deg", bg: "bg-green-400/80" },
                  { label: "Blocked?", rotate: "1deg", bg: "bg-purple-400/80" },
                  { label: "8 or 13?", rotate: "-4deg", bg: "bg-orange-400/80" },
                  { label: "API dep.", rotate: "3deg", bg: "bg-cyan-400/80" },
                  { label: "Carryover", rotate: "-1deg", bg: "bg-yellow-400/80" },
                ].map((note, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center justify-center rounded-lg p-3 text-xs font-bold text-black shadow-sm transition-transform duration-300 group-hover:rotate-0",
                      note.bg
                    )}
                    style={{ transform: `rotate(${note.rotate})` }}
                  >
                    {note.label}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-theme-m">
                Sticky notes, gut-feel debates, and capacity guesswork.
              </p>
            </div>

            {/* AFTER - ATLAS dashboard */}
            <div className="relative overflow-hidden rounded-card border border-[#f16e2c]/30 bg-theme-card p-6">
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "rgba(241,110,44,0.12)", color: "#f16e2c" }}
              >
                With ATLAS
              </span>
              <div className="space-y-2">
                {[
                  { id: "FE-42", title: "Refactor dashboard charts", conf: 95, pts: 5, c: "low" },
                  { id: "BE-18", title: "Migrate payment webhooks", conf: 72, pts: 13, c: "high" },
                  { id: "FE-44", title: "Onboarding wizard step 3-4", conf: 88, pts: 8, c: "medium" },
                  { id: "API-3", title: "Rate-limiting middleware", conf: 91, pts: 5, c: "low" },
                ].map((t, i) => {
                  const cc = complexityColor(t.c);
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-theme bg-theme-subtle px-3 py-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={cn("h-2 w-2 rounded-full")} style={{ background: cc.dot }} />
                        <span className="text-xs font-mono text-theme-s">{t.id}</span>
                        <span className="text-sm text-theme">{t.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn("text-xs font-semibold", confidenceColor(t.conf))}>
                          {t.conf}%
                        </span>
                        <span className="text-xs text-theme-m">{t.pts} pts</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-theme-s">
                <span>
                  Capacity: <span style={{ color: "#f16e2c" }} className="font-semibold">87%</span>
                </span>
                <span>
                  Sprint Points: <span style={{ color: "#f16e2c" }} className="font-semibold">42</span>
                </span>
              </div>
              <p className="mt-3 text-sm text-theme-m">
                AI-generated plan with confidence scores and risk flags.
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
          <Chip dotColor="#f16e2c">The Problem</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Sprint planning is broken
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Teams rely on intuition to estimate work they haven't read the code
            for, then act surprised when sprints blow up.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {PROBLEM_STATS.map((stat, i) => (
            <Card key={i} variant="light" className="text-center">
              <p
                className="text-5xl font-bold tracking-tight"
                style={{ color: "#f16e2c" }}
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
      {/* 3. HOW ATLAS SOLVES IT - 6 SIGNALS                           */}
      {/* ============================================================ */}
      <Section variant="sky">
        <div className="text-center">
          <Chip dotColor="#f16e2c">6 Intelligence Signals</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            How ATLAS builds smarter sprint plans
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-body-lg text-theme-m">
            Instead of guessing, ATLAS converges six real-time data signals into
            every estimate it produces.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNALS.map((signal, i) => {
            const Icon = signal.icon;
            return (
              <Card key={i} variant="light" className="group relative overflow-hidden">
                {/* Subtle accent line at top */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${signal.accent}, transparent)` }}
                />
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "rgba(241,110,44,0.12)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "#f16e2c" }} />
                </div>
                <h3 className="text-lg font-semibold text-theme">{signal.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-theme-s">
                  {signal.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 4. SPRINT PLAN DEMO                                           */}
      {/* ============================================================ */}
      <Section variant="coral">
        <div className="text-center">
          <Chip dotColor="#f16e2c">Live Sprint Plan</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            What an AI-generated sprint looks like
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-body-lg text-theme-m">
            Real tickets. Real confidence scores. Real risk flags. All generated
            in under 30 seconds.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-card border border-theme bg-theme-card">
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-theme px-6 py-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(241,110,44,0.15)" }}
              >
                <Target className="h-4 w-4" style={{ color: "#f16e2c" }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-theme">Sprint 24 Plan</p>
                <p className="text-xs text-theme-m">Dec 9 - Dec 22, 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-theme-s">
                Total:{" "}
                <span className="font-bold" style={{ color: "#f16e2c" }}>
                  42 pts
                </span>
              </span>
              <span className="text-theme-s">
                Capacity:{" "}
                <span className="font-bold" style={{ color: "#f16e2c" }}>
                  87%
                </span>
              </span>
            </div>
          </div>

          {/* Ticket rows */}
          <div className="divide-y divide-theme">
            {SPRINT_TICKETS.map((ticket, i) => {
              const cc = complexityColor(ticket.complexity);
              return (
                <div
                  key={i}
                  className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        cc.bg,
                        cc.text
                      )}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: cc.dot }}
                      />
                      {ticket.complexity}
                    </span>
                    <span className="font-mono text-xs text-theme-m">{ticket.id}</span>
                    <span className="text-sm text-theme">{ticket.title}</span>
                  </div>
                  <div className="flex items-center gap-4 pl-8 sm:pl-0">
                    <span className="text-xs text-theme-m">{ticket.assignee}</span>
                    <span className="text-xs font-semibold text-theme-s">
                      {ticket.points} pts
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold",
                        ticket.confidence >= 90
                          ? "bg-emerald-500/10 text-emerald-400"
                          : ticket.confidence >= 80
                            ? "bg-amber-500/10 text-amber-300"
                            : "bg-orange-500/10 text-orange-400"
                      )}
                    >
                      {ticket.confidence}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Risk flag */}
          <div className="border-t border-theme bg-orange-500/[0.04] px-6 py-3">
            <div className="flex items-start gap-2">
              <AlertTriangle
                className="mt-0.5 h-4 w-4 flex-shrink-0"
                style={{ color: "#f16e2c" }}
              />
              <p className="text-sm text-theme-s">
                <span className="font-semibold" style={{ color: "#f16e2c" }}>
                  Risk:
                </span>{" "}
                BE-18 depends on API-3 completion. Recommend sequencing API-3
                first to unblock payment migration by mid-sprint.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 5. ACCURACY OVER TIME                                         */}
      {/* ============================================================ */}
      <Section variant="sky">
        <div className="text-center">
          <Chip dotColor="#f16e2c">Learning Engine</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Accuracy that compounds every sprint
          </h2>
          <p className="mx-auto mt-4 max-w-[580px] text-body-lg text-theme-m">
            ATLAS learns your team's unique patterns. Every completed sprint
            makes the next plan more precise.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          {/* Chart area */}
          <div className="relative overflow-hidden rounded-card border border-theme bg-theme-card p-8">
            {/* Y-axis labels */}
            <div className="absolute left-3 top-8 flex h-[200px] flex-col justify-between text-[10px] text-theme-m">
              <span>100%</span>
              <span>80%</span>
              <span>60%</span>
              <span>40%</span>
            </div>

            {/* Chart body */}
            <div className="ml-8">
              {/* Grid lines */}
              <div className="relative h-[200px]">
                {[100, 80, 60, 40].map((line) => (
                  <div
                    key={line}
                    className="absolute left-0 right-0 border-t border-theme"
                    style={{ top: `${((100 - line) / 60) * 100}%` }}
                  />
                ))}

                {/* Data points + connecting lines */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 400 200"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  {/* Gradient fill under line */}
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f16e2c" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#f16e2c" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M${(0 / 7) * 400} ${200 - ((62 - 40) / 60) * 200} L${(2 / 7) * 400} ${200 - ((78 - 40) / 60) * 200} L${(4 / 7) * 400} ${200 - ((85 - 40) / 60) * 200} L${(7 / 7) * 400} ${200 - ((91 - 40) / 60) * 200} L${(7 / 7) * 400} 200 L${(0 / 7) * 400} 200 Z`}
                    fill="url(#chartGrad)"
                  />
                  <path
                    d={`M${(0 / 7) * 400} ${200 - ((62 - 40) / 60) * 200} L${(2 / 7) * 400} ${200 - ((78 - 40) / 60) * 200} L${(4 / 7) * 400} ${200 - ((85 - 40) / 60) * 200} L${(7 / 7) * 400} ${200 - ((91 - 40) / 60) * 200}`}
                    stroke="#f16e2c"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Data points with labels */}
                {ACCURACY_DATA.map((d, i) => {
                  const xPercent = ((d.sprint - 1) / 7) * 100;
                  const yPercent = ((100 - d.accuracy) / 60) * 100;
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
                        className="h-4 w-4 rounded-full border-2 border-[#f16e2c] bg-theme-card shadow-md"
                        style={{ boxShadow: "0 0 12px rgba(241,110,44,0.4)" }}
                      />
                      <div className="mt-2 flex flex-col items-center">
                        <span className="text-sm font-bold" style={{ color: "#f16e2c" }}>
                          {d.accuracy}%
                        </span>
                        <span className="text-[10px] text-theme-m">{d.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Annotation callout */}
            <div className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-[#f16e2c]/20 bg-[#f16e2c]/[0.06] px-4 py-2.5">
              <Brain className="h-4 w-4" style={{ color: "#f16e2c" }} />
              <span className="text-sm font-medium text-theme-s">
                AI learns your team's patterns &mdash; accuracy compounds with
                every sprint
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
          <Chip dotColor="#f16e2c">The Transformation</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Before vs. After ATLAS
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-body-lg text-theme-m">
            See what changes when estimation is backed by code analysis instead of
            conference-room debates.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Before column */}
          <Card variant="light" className="border-red-500/20">
            <div className="mb-6 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-semibold text-red-400">
                Without ATLAS
              </h3>
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

          {/* After column */}
          <Card variant="light" className="border-[#f16e2c]/30">
            <div className="mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" style={{ color: "#f16e2c" }} />
              <h3 className="text-lg font-semibold" style={{ color: "#f16e2c" }}>
                With ATLAS
              </h3>
            </div>
            <div className="space-y-4">
              {AFTER_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <Icon
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: "#f16e2c" }}
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
      {/* 7. INTEGRATION WORKFLOW                                        */}
      {/* ============================================================ */}
      <Section variant="sky">
        <div className="text-center">
          <Chip dotColor="#f16e2c">Setup in Minutes</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Four steps to your first AI sprint
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Connect your tools. ATLAS does the rest.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative">
                  <Card variant="light" className="h-full text-center">
                    {/* Step number */}
                    <div
                      className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white"
                      style={{ background: "#f16e2c" }}
                    >
                      {step.step}
                    </div>
                    <div
                      className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "rgba(241,110,44,0.1)" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "#f16e2c" }} />
                    </div>
                    <h3 className="text-base font-semibold text-theme">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-theme-s">{step.description}</p>
                  </Card>

                  {/* Arrow connector (hidden on last item and on mobile) */}
                  {i < WORKFLOW_STEPS.length - 1 && (
                    <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                      <ChevronRight
                        className="h-5 w-5"
                        style={{ color: "#f16e2c" }}
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
          <Chip dotColor="#f16e2c">What Teams Say</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Trusted by engineering teams
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} variant="light" className="flex flex-col justify-between">
              {/* Stars */}
              <div>
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-[#f16e2c]"
                      style={{ color: "#f16e2c" }}
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
        {/* Orange glow blocks */}
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
                "linear-gradient(to bottom, rgba(241,110,44,0.3), rgba(241,110,44,0.05))",
            }}
            aria-hidden="true"
          />
        ))}

        <div className="relative z-[1] mx-auto max-w-container text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Plan your first AI sprint
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-body-lg text-theme-m">
            Join 1,200+ engineering teams already using ATLAS to replace gut-feel
            with data-driven estimation. Free to get started.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-[#f16e2c] hover:bg-[#d85d1f] text-white sm:w-auto"
              asChild
            >
              <Link href="/auth/signup">
                Start Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/products/atlas">Explore ATLAS</Link>
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

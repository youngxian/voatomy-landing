"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import {
  ScanEye,
  RefreshCcw,
  LayoutGrid,
  Image,
  MapPin,
  DollarSign,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Figma,
  GitBranch,
  Bell,
  Sparkles,
  Quote,
  Clock,
  Zap,
  ChevronRight,
  Star,
  Palette,
  ShieldCheck,
  Component,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const ACCENT = "#A855F7";

const PROBLEM_STATS = [
  {
    value: "62%",
    label: "of design tokens drift within 3 months",
    sub: "Silent divergence compounds into inconsistent UIs",
  },
  {
    value: "14 hrs",
    label: "per month spent on manual design audits",
    sub: "Engineering time wasted on detective work",
  },
  {
    value: "3.2x",
    label: "more bugs from design-code mismatches",
    sub: "Visual regressions that slip through code review",
  },
];

const CAPABILITIES = [
  {
    icon: ScanEye,
    title: "Real-Time Drift Detection",
    description:
      "Continuously compares Figma sources and code components to catch divergence the moment it happens.",
  },
  {
    icon: RefreshCcw,
    title: "Token Sync Monitoring",
    description:
      "Color, spacing, and typography tokens are tracked across design and code with automatic diff reports.",
  },
  {
    icon: LayoutGrid,
    title: "Component Coverage Tracking",
    description:
      "See which Figma components have matching code implementations and which are missing or outdated.",
  },
  {
    icon: Image,
    title: "Visual Regression Alerts",
    description:
      "Pixel-level comparison catches visual drift that code diffs miss, before it reaches production.",
  },
  {
    icon: MapPin,
    title: "Figma-to-Code Mapping",
    description:
      "Every Figma component is linked to its code counterpart so ownership and status are always clear.",
  },
  {
    icon: DollarSign,
    title: "Revenue-Aware Design Priority",
    description:
      "Drift on high-traffic, revenue-critical pages is surfaced first so fixes target what matters most.",
  },
];

const DASHBOARD_COMPONENTS = [
  { name: "Button", figma: "v4.2", code: "v4.2", status: "synced", coverage: 100 },
  { name: "Modal", figma: "v3.1", code: "v2.8", status: "drifted", coverage: 76 },
  { name: "Card", figma: "v5.0", code: "v5.0", status: "synced", coverage: 100 },
  { name: "Sidebar", figma: "v2.4", code: "v2.1", status: "drifted", coverage: 62 },
  { name: "Avatar", figma: "v1.3", code: "v1.3", status: "synced", coverage: 100 },
  { name: "Tooltip", figma: "v2.0", code: "—", status: "missing", coverage: 0 },
];

const COVERAGE_DATA = [
  { month: 1, coverage: 41, label: "Month 1" },
  { month: 2, coverage: 58, label: "Month 2" },
  { month: 3, coverage: 72, label: "Month 3" },
  { month: 4, coverage: 83, label: "Month 4" },
  { month: 5, coverage: 91, label: "Month 5" },
  { month: 6, coverage: 96, label: "Month 6" },
];

const BEFORE_ITEMS = [
  { text: "Figma and code diverge silently over weeks", icon: Clock },
  { text: "Inconsistent UIs ship to production unnoticed", icon: XCircle },
  { text: "Manual audits consume 14+ hours per month", icon: AlertTriangle },
  { text: "No single source of truth for component status", icon: XCircle },
];

const AFTER_ITEMS = [
  { text: "Real-time drift detection on every commit", icon: Zap },
  { text: "Auto-sync suggestions before code merges", icon: CheckCircle2 },
  { text: "100% component coverage tracking", icon: CheckCircle2 },
  { text: "Figma-to-code mapping as the single source of truth", icon: CheckCircle2 },
];

const WORKFLOW_STEPS = [
  {
    step: 1,
    icon: Figma,
    title: "Connect Figma + Repos",
    description: "Link your Figma files and code repositories. DRIFT maps everything automatically.",
  },
  {
    step: 2,
    icon: Component,
    title: "DRIFT Maps Tokens & Components",
    description: "Design tokens, components, and variants are indexed and linked across systems.",
  },
  {
    step: 3,
    icon: Bell,
    title: "Drift Detected & Alerted",
    description: "Any divergence triggers an alert with a visual diff and affected file locations.",
  },
  {
    step: 4,
    icon: Sparkles,
    title: "Auto-Sync Suggestions",
    description: "DRIFT proposes code changes to resolve drift, ready for review and merge.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We discovered 47 drifted tokens in the first scan. DRIFT paid for itself in the first week by eliminating our monthly manual audits.",
    name: "Lena Sørensen",
    role: "Design Systems Lead, Nordera",
    rating: 5,
  },
  {
    quote:
      "Our designers and engineers finally speak the same language. DRIFT's Figma-to-code mapping ended the 'which version is correct?' debate.",
    name: "Kai Nakamura",
    role: "Staff Design Engineer, Canopy",
    rating: 5,
  },
  {
    quote:
      "Visual regressions dropped 80% after we turned on DRIFT. The coverage dashboard alone changed how our team prioritizes component work.",
    name: "Amara Obi",
    role: "Frontend Architect, Quiltr",
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function statusStyle(status: string) {
  if (status === "synced")
    return { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "#34d399" };
  if (status === "drifted")
    return { bg: "bg-amber-500/15", text: "text-amber-400", dot: "#fbbf24" };
  return { bg: "bg-red-500/15", text: "text-red-400", dot: "#f87171" };
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function DesignSystemHealthPage() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="design-system-health">
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
              "radial-gradient(ellipse 60% 50% at 50% 38%, rgba(168,85,247,0.10), transparent)",
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
                DRIFT Design System Health
              </span>
            </Chip>
          </div>

          <h1
            className={cn(
              "mx-auto mt-8 max-w-[860px] text-center text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-100",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            Design systems that{" "}
            <span style={{ color: ACCENT }}>never drift out of sync</span>
          </h1>

          <p
            className={cn(
              "mx-auto mt-6 max-w-[620px] text-center text-lg leading-relaxed text-theme-m transition-all duration-700 delay-200",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            DRIFT continuously monitors your design system for drift between
            Figma and code. Catch inconsistencies before they ship.
          </p>

          <div
            className={cn(
              "mx-auto mt-10 flex max-w-md items-center justify-center gap-4 transition-all duration-700 delay-300",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <Button size="lg" className="bg-[#A855F7] hover:bg-[#9333EA] text-white" asChild>
              <Link href="/auth/signup">
                Try DRIFT Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/products/drift">See How It Works</Link>
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
                Before DRIFT
              </span>
              <div className="space-y-3">
                {[
                  { label: "Button", figma: "v4.2", code: "v3.9", drift: true },
                  { label: "Modal", figma: "v3.1", code: "v2.8", drift: true },
                  { label: "Card", figma: "v5.0", code: "v5.0", drift: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center justify-between rounded-lg border px-4 py-3",
                      item.drift
                        ? "border-red-500/10 bg-red-500/[0.04]"
                        : "border-theme bg-theme-subtle"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-theme">{item.label}</span>
                      <span className="text-xs text-theme-m">Figma {item.figma}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-theme-m">Code {item.code}</span>
                      {item.drift && (
                        <span className="text-xs font-semibold text-red-400">DRIFTED</span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center gap-1 rounded-lg border border-dashed border-red-500/20 bg-red-500/[0.02] px-4 py-3 text-xs text-red-400">
                  <AlertTriangle className="h-3 w-3" /> 23 more drifted components undetected
                </div>
              </div>
              <p className="mt-4 text-sm text-theme-m">
                Figma and code diverge silently. Manual audits catch a fraction.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-card border border-[#A855F7]/30 bg-theme-card p-6">
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "rgba(168,85,247,0.12)", color: ACCENT }}
              >
                With DRIFT
              </span>
              <div className="space-y-2">
                {[
                  { name: "Button", status: "synced", coverage: "100%" },
                  { name: "Modal", status: "drifted", coverage: "76%" },
                  { name: "Card", status: "synced", coverage: "100%" },
                  { name: "Sidebar", status: "drifted", coverage: "62%" },
                ].map((c, i) => {
                  const s = statusStyle(c.status);
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-theme bg-theme-subtle px-3 py-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full" style={{ background: s.dot }} />
                        <span className="text-sm text-theme">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn("text-xs font-semibold", s.text)}>
                          {c.status}
                        </span>
                        <span className="text-xs text-theme-m">{c.coverage}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-theme-s">
                <span>
                  Coverage: <span style={{ color: ACCENT }} className="font-semibold">84%</span>
                </span>
                <span>
                  Drift Alerts: <span style={{ color: ACCENT }} className="font-semibold">2 active</span>
                </span>
              </div>
              <p className="mt-3 text-sm text-theme-m">
                Full visibility into every component&apos;s sync status.
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
            Design systems silently fall apart
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Tokens drift, components diverge, and inconsistent UIs ship — all
            because no one is watching the gap between Figma and code.
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
      {/* 3. HOW DRIFT SOLVES IT                                        */}
      {/* ============================================================ */}
      <Section variant="sky">
        <div className="text-center">
          <Chip dotColor={ACCENT}>6 Intelligence Capabilities</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            How DRIFT keeps design and code in sync
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-body-lg text-theme-m">
            DRIFT watches your design system from both sides — Figma and code —
            so drift is caught before it ships.
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
                  style={{ background: "rgba(168,85,247,0.12)" }}
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
      {/* 4. DESIGN SYSTEM DASHBOARD DEMO                               */}
      {/* ============================================================ */}
      <Section variant="coral">
        <div className="text-center">
          <Chip dotColor={ACCENT}>Live Dashboard</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            What a design system health dashboard looks like
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-body-lg text-theme-m">
            Real components. Real sync status. Real coverage metrics. Updated on
            every commit and Figma publish.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-card border border-theme bg-theme-card">
          <div className="flex items-center justify-between border-b border-theme px-6 py-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(168,85,247,0.15)" }}
              >
                <Palette className="h-4 w-4" style={{ color: ACCENT }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-theme">Design System Health</p>
                <p className="text-xs text-theme-m">Last sync: 4 min ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-theme-s">
                Coverage:{" "}
                <span className="font-bold" style={{ color: ACCENT }}>
                  84%
                </span>
              </span>
              <span className="text-theme-s">
                Drifted:{" "}
                <span className="font-bold" style={{ color: ACCENT }}>
                  2
                </span>
              </span>
            </div>
          </div>

          <div className="divide-y divide-theme">
            {DASHBOARD_COMPONENTS.map((comp, i) => {
              const s = statusStyle(comp.status);
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
                      {comp.status}
                    </span>
                    <span className="text-sm font-semibold text-theme">{comp.name}</span>
                  </div>
                  <div className="flex items-center gap-4 pl-8 sm:pl-0">
                    <span className="text-xs text-theme-m">Figma {comp.figma}</span>
                    <span className="text-xs text-theme-m">Code {comp.code}</span>
                    <span className="text-xs font-semibold" style={{ color: ACCENT }}>
                      {comp.coverage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-theme bg-purple-500/[0.04] px-6 py-3">
            <div className="flex items-start gap-2">
              <AlertTriangle
                className="mt-0.5 h-4 w-4 flex-shrink-0"
                style={{ color: ACCENT }}
              />
              <p className="text-sm text-theme-s">
                <span className="font-semibold" style={{ color: ACCENT }}>
                  Drift Alert:
                </span>{" "}
                Modal component v3.1 in Figma differs from v2.8 in code.
                Auto-sync PR ready for review.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 5. COVERAGE IMPROVEMENT OVER TIME                             */}
      {/* ============================================================ */}
      <Section variant="sky">
        <div className="text-center">
          <Chip dotColor={ACCENT}>Continuous Improvement</Chip>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Coverage that grows every month
          </h2>
          <p className="mx-auto mt-4 max-w-[580px] text-body-lg text-theme-m">
            DRIFT identifies gaps and guides your team to full design system
            coverage, sprint by sprint.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative overflow-hidden rounded-card border border-theme bg-theme-card p-8">
            <div className="absolute left-3 top-8 flex h-[200px] flex-col justify-between text-[10px] text-theme-m">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
            </div>

            <div className="ml-10">
              <div className="relative h-[200px]">
                {[100, 75, 50, 25].map((line) => (
                  <div
                    key={line}
                    className="absolute left-0 right-0 border-t border-theme"
                    style={{ top: `${((100 - line) / 75) * 100}%` }}
                  />
                ))}

                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 500 200"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="coverageGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M${(0 / 5) * 500} ${200 - ((41 - 25) / 75) * 200} L${(1 / 5) * 500} ${200 - ((58 - 25) / 75) * 200} L${(2 / 5) * 500} ${200 - ((72 - 25) / 75) * 200} L${(3 / 5) * 500} ${200 - ((83 - 25) / 75) * 200} L${(4 / 5) * 500} ${200 - ((91 - 25) / 75) * 200} L${(5 / 5) * 500} ${200 - ((96 - 25) / 75) * 200} L${(5 / 5) * 500} 200 L${(0 / 5) * 500} 200 Z`}
                    fill="url(#coverageGrad)"
                  />
                  <path
                    d={`M${(0 / 5) * 500} ${200 - ((41 - 25) / 75) * 200} L${(1 / 5) * 500} ${200 - ((58 - 25) / 75) * 200} L${(2 / 5) * 500} ${200 - ((72 - 25) / 75) * 200} L${(3 / 5) * 500} ${200 - ((83 - 25) / 75) * 200} L${(4 / 5) * 500} ${200 - ((91 - 25) / 75) * 200} L${(5 / 5) * 500} ${200 - ((96 - 25) / 75) * 200}`}
                    stroke={ACCENT}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {COVERAGE_DATA.map((d, i) => {
                  const xPercent = (i / 5) * 100;
                  const yPercent = ((100 - d.coverage) / 75) * 100;
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
                        style={{ borderColor: ACCENT, boxShadow: `0 0 12px rgba(168,85,247,0.4)` }}
                      />
                      <div className="mt-2 flex flex-col items-center">
                        <span className="text-sm font-bold" style={{ color: ACCENT }}>
                          {d.coverage}%
                        </span>
                        <span className="text-[10px] text-theme-m">{d.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-[#A855F7]/20 bg-[#A855F7]/[0.06] px-4 py-2.5">
              <ShieldCheck className="h-4 w-4" style={{ color: ACCENT }} />
              <span className="text-sm font-medium text-theme-s">
                DRIFT closes coverage gaps &mdash; your design system gets
                healthier every month
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
            Before vs. After DRIFT
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-body-lg text-theme-m">
            See what changes when design-code sync is monitored continuously
            instead of audited quarterly.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card variant="light" className="border-red-500/20">
            <div className="mb-6 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-semibold text-red-400">Without DRIFT</h3>
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

          <Card variant="light" className="border-[#A855F7]/30">
            <div className="mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" style={{ color: ACCENT }} />
              <h3 className="text-lg font-semibold" style={{ color: ACCENT }}>
                With DRIFT
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
            Four steps to design system health
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Connect Figma and your repos. DRIFT handles the rest.
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
                      style={{ background: "rgba(168,85,247,0.1)" }}
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
            Trusted by design system teams
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
                      className="h-4 w-4 fill-[#A855F7]"
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
                "linear-gradient(to bottom, rgba(168,85,247,0.3), rgba(168,85,247,0.05))",
            }}
            aria-hidden="true"
          />
        ))}

        <div className="relative z-[1] mx-auto max-w-container text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Keep your design system in perfect sync
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-body-lg text-theme-m">
            Join 600+ design system teams already using DRIFT to eliminate
            design-code drift. Free to get started.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white sm:w-auto"
              asChild
            >
              <Link href="/auth/signup">
                Start Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/products/drift">Explore DRIFT</Link>
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

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeftRight,
  PenTool,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Figma,
  TrendingUp,
  TrendingDown,
  Eye,
  Palette,
  Accessibility,
  Layers,
  GitPullRequest,
  ShieldCheck,
  Zap,
  Sparkles,
  Component,
  DollarSign,
  Users,
  RefreshCw,
  MessageSquare,
  Timer,
  Ban,
  Heart,
  ArrowUp,
} from "lucide-react";

/* ─────────────────────── Constants ─────────────────────── */

const PURPLE = "#8B5CF6";
const PURPLE_LIGHT = "rgba(139, 92, 246, 0.10)";
const PURPLE_BORDER = "rgba(139, 92, 246, 0.22)";
const PURPLE_GLOW = "rgba(139, 92, 246, 0.06)";
const INDIGO = "#6366F1";
const ORANGE = "#f16e2c";

const PAIN_POINTS = [
  {
    icon: Palette,
    title: "Design tokens drift from code silently",
    description:
      "A designer updates a color in Figma. Three weeks later, the code still references the old value. Nobody noticed until the brand audit.",
    stat: "73%",
    statLabel: "of teams have token drift",
  },
  {
    icon: Eye,
    title: "No way to know which components are actually used",
    description:
      "Your design system has 120 components. Are 40 of them dead weight? Without usage data, you are maintaining ghosts.",
    stat: "38%",
    statLabel: "avg unused components",
  },
  {
    icon: DollarSign,
    title: "Design changes can't be tied to business outcomes",
    description:
      "You redesigned the checkout flow. Conversions went up. But can you prove the design change caused it? Not without LOOP.",
    stat: "0",
    statLabel: "revenue attribution today",
  },
  {
    icon: Accessibility,
    title: "Accessibility regressions happen without warning",
    description:
      "A new component ships. It looks perfect. But contrast ratio dropped from AA to A. No one checked until a user filed a complaint.",
    stat: "4.2x",
    statLabel: "cost to fix post-launch",
  },
];

const PRODUCT_STACK = [
  {
    name: "DRIFT",
    color: PURPLE,
    colorLight: PURPLE_LIGHT,
    colorBorder: PURPLE_BORDER,
    tag: "Primary",
    description: "Design-code sync and drift detection. Continuously monitors your Figma tokens against production code and flags every mismatch.",
    features: ["Token-level diffing", "One-click fix PRs", "CI drift gates", "A11y scoring"],
    icon: RefreshCw,
  },
  {
    name: "LOOP",
    color: INDIGO,
    colorLight: "rgba(99, 102, 241, 0.10)",
    colorBorder: "rgba(99, 102, 241, 0.22)",
    tag: "Feedback",
    description: "User feedback on design decisions. Connect qualitative and quantitative signals to the components that drive them.",
    features: ["In-product feedback", "Component-level NPS", "Heatmap overlays", "Sentiment trends"],
    icon: MessageSquare,
  },
  {
    name: "ATLAS",
    color: ORANGE,
    colorLight: "rgba(241, 110, 44, 0.10)",
    colorBorder: "rgba(241, 110, 44, 0.22)",
    tag: "Planning",
    description: "Design scope estimation in sprints. Analyzes Figma complexity to predict implementation effort before a single line of code.",
    features: ["Figma complexity analysis", "Sprint estimation", "Design debt scoring", "Capacity planning"],
    icon: Timer,
  },
];

const COMPONENTS_HEALTH = [
  { name: "Button", adoption: 96, drift: "synced", a11y: 98, icon: Component },
  { name: "Input", adoption: 91, drift: "synced", a11y: 95, icon: Component },
  { name: "Card", adoption: 84, drift: "warning", a11y: 92, icon: Layers },
  { name: "Modal", adoption: 78, drift: "drifted", a11y: 86, icon: Layers },
  { name: "Tooltip", adoption: 88, drift: "synced", a11y: 100, icon: Component },
  { name: "Avatar", adoption: 72, drift: "synced", a11y: 94, icon: Component },
  { name: "Badge", adoption: 65, drift: "drifted", a11y: 90, icon: Component },
  { name: "Tabs", adoption: 93, drift: "synced", a11y: 97, icon: Component },
];

const DRIFT_ITEMS = [
  {
    property: "Color Token",
    token: "color.primary.500",
    figma: "#6366F1",
    code: "#6365F0",
    isDrifted: true,
    type: "color" as const,
  },
  {
    property: "Spacing",
    token: "spacing.md",
    figma: "16px",
    code: "14px",
    isDrifted: true,
    type: "value" as const,
  },
  {
    property: "Border Radius",
    token: "radius.card",
    figma: "12px",
    code: "12px",
    isDrifted: false,
    type: "value" as const,
  },
  {
    property: "Font Weight",
    token: "font.weight.semibold",
    figma: "600",
    code: "600",
    isDrifted: false,
    type: "value" as const,
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Design in Figma",
    description: "Update tokens, create variants, refine components. Work naturally in your design tool.",
    icon: Figma,
    accent: PURPLE,
  },
  {
    step: "02",
    title: "DRIFT detects changes",
    description: "Every token publish triggers automatic comparison against the live codebase. Drift surfaces instantly.",
    icon: Eye,
    accent: PURPLE,
  },
  {
    step: "03",
    title: "Auto-generates code PR",
    description: "AI-powered fix suggestions become one-click pull requests. No manual code translation needed.",
    icon: GitPullRequest,
    accent: PURPLE,
  },
  {
    step: "04",
    title: "CI blocks any drift",
    description: "Pre-merge checks ensure no drifted tokens ship. Your design system stays pristine in production.",
    icon: ShieldCheck,
    accent: PURPLE,
  },
];

/* ─────────────────────── Helpers ─────────────────────── */

function HealthBar({ value, color }: { value: number; color?: string }) {
  const barColor =
    color ||
    (value >= 90
      ? "#12FF80"
      : value >= 75
        ? PURPLE
        : value >= 60
          ? "#F59E0B"
          : "#EF4444");
  return (
    <div className="w-full h-1.5 rounded-full bg-theme-subtle overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${value}%`, background: barColor }}
      />
    </div>
  );
}

function DriftStatus({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; dot: string; label: string }> = {
    synced: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400", label: "Synced" },
    warning: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400", label: "Warning" },
    drifted: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400", label: "Drifted" },
  };
  const s = config[status] || config.synced;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold", s.bg, s.text)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

/* ─────────────────────── Main Page ─────────────────────── */

export default function DesignTeamsSolutionPage() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="design-teams-solution">
      {/* ═══════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden bg-theme px-4 pb-20 pt-28 transition-colors duration-300">
        {/* Dot grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "var(--dot-grid)", backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />
        {/* Purple glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 70% 50% at 50% 35%, ${PURPLE}1A, transparent)` }}
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto max-w-container text-center">
          {/* Audience chip */}
          <div className={cn("transition-all duration-700", loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{ background: PURPLE_LIGHT, color: PURPLE, border: `1px solid ${PURPLE_BORDER}` }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              For Design Teams
            </span>
          </div>

          {/* Headline */}
          <h1
            className={cn(
              "mx-auto mt-8 max-w-[900px] text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-100",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Design system governance.
            <br />
            <span style={{ color: PURPLE }}>Code sync. UX analytics.</span>
          </h1>

          {/* Sub headline */}
          <p
            className={cn(
              "mx-auto mt-6 max-w-[660px] text-lg leading-relaxed text-theme-m transition-all duration-700 delay-200",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Voatomy gives product designers, design system leads, and UX engineers
            the tools to keep Figma and code permanently in sync — and connect every
            design decision to business outcomes.
          </p>

          {/* CTA buttons */}
          <div
            className={cn(
              "mx-auto mt-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-300",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <Button asChild size="lg" className="gap-2" style={{ background: PURPLE }}>
              <Link href="/products/drift">
                Explore DRIFT
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>

          {/* Audience labels */}
          <div
            className={cn(
              "mx-auto mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-theme-m transition-all duration-700 delay-[400ms]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <span className="flex items-center gap-1.5">
              <PenTool className="h-3.5 w-3.5" style={{ color: PURPLE }} />
              Product Designers
            </span>
            <span className="text-theme-f">|</span>
            <span className="flex items-center gap-1.5">
              <Component className="h-3.5 w-3.5" style={{ color: PURPLE }} />
              Design System Leads
            </span>
            <span className="text-theme-f">|</span>
            <span className="flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5" style={{ color: PURPLE }} />
              UX Engineers
            </span>
          </div>

          {/* ── Split-screen visual: Figma vs Code ── */}
          <div
            className={cn(
              "mx-auto mt-14 max-w-[1000px] transition-all duration-1000 delay-500",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="rounded-2xl border border-theme bg-theme-subtle shadow-2xl transition-colors duration-300 overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-theme px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                <span className="ml-4 flex items-center gap-1.5 text-xs font-medium" style={{ color: PURPLE }}>
                  <RefreshCw className="h-3 w-3" />
                  DRIFT — Design System Sync Monitor
                </span>
              </div>

              {/* Split content */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
                {/* Figma artboard side */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <PenTool className="h-4 w-4" style={{ color: PURPLE }} />
                    <span className="text-xs font-semibold text-theme-s uppercase tracking-wider">
                      Figma Design Tokens
                    </span>
                  </div>
                  <div className="rounded-xl border border-theme bg-theme-subtle p-4 space-y-3 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">color.primary</span>
                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded" style={{ background: "#6366F1" }} />
                        <code className="text-xs font-mono text-theme-s">#6366F1</code>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">spacing.md</span>
                      <code className="text-xs font-mono text-theme-s">16px</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">radius.card</span>
                      <code className="text-xs font-mono text-theme-s">12px</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">font.weight.bold</span>
                      <code className="text-xs font-mono text-theme-s">600</code>
                    </div>
                  </div>
                  {/* Component preview */}
                  <div className="rounded-lg border border-dashed border-theme p-4 text-center">
                    <div
                      className="mx-auto h-10 w-36 rounded-xl flex items-center justify-center text-xs font-semibold text-white"
                      style={{ background: "#6366F1" }}
                    >
                      Button/Primary
                    </div>
                    <p className="text-[10px] text-theme-m mt-2">Figma component preview</p>
                  </div>
                </div>

                {/* Center divider with sync animation */}
                <div className="hidden md:flex flex-col items-center justify-center border-x border-theme px-4 py-6 gap-3">
                  <div className="rounded-full p-2 animate-pulse" style={{ background: PURPLE_LIGHT }}>
                    <ArrowLeftRight className="h-5 w-5" style={{ color: PURPLE }} />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-6 w-px" style={{ background: PURPLE_BORDER }} />
                    {/* Green check for matching */}
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <div className="h-3 w-px" style={{ background: PURPLE_BORDER }} />
                    {/* Red alert for drift */}
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <div className="h-3 w-px" style={{ background: PURPLE_BORDER }} />
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <div className="h-6 w-px" style={{ background: PURPLE_BORDER }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: PURPLE }}>
                    Sync
                  </span>
                </div>

                {/* Code output side */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="h-4 w-4" style={{ color: PURPLE }} />
                    <span className="text-xs font-semibold text-theme-s uppercase tracking-wider">
                      Code Output
                    </span>
                  </div>
                  <div className="rounded-xl border border-theme bg-theme-subtle p-4 space-y-3 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">color.primary</span>
                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded" style={{ background: "#6365F0" }} />
                        <code className="text-xs font-mono text-red-400">#6365F0</code>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">spacing.md</span>
                      <code className="text-xs font-mono text-red-400">14px</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">radius.card</span>
                      <code className="text-xs font-mono text-emerald-400">12px</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">font.weight.bold</span>
                      <code className="text-xs font-mono text-emerald-400">600</code>
                    </div>
                  </div>
                  {/* Component preview with drift */}
                  <div className="rounded-lg border border-dashed border-red-400/30 p-4 text-center">
                    <div
                      className="mx-auto h-10 w-36 rounded-[10px] flex items-center justify-center text-xs font-semibold text-white"
                      style={{ background: "#6365F0" }}
                    >
                      Button/Primary
                    </div>
                    <p className="text-[10px] text-red-400 mt-2">2 token mismatches detected</p>
                  </div>
                </div>
              </div>

              {/* Bottom drift alert bar */}
              <div
                className="flex items-center justify-between border-t px-5 py-2.5 text-xs"
                style={{ borderColor: PURPLE_BORDER, background: PURPLE_LIGHT }}
              >
                <span className="flex items-center gap-2 font-medium" style={{ color: PURPLE }}>
                  <AlertTriangle className="h-3.5 w-3.5" />
                  2 drift issues detected &middot; 2 tokens synced
                </span>
                <span className="hidden sm:inline text-theme-m">Last synced 8s ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. PAIN POINTS
      ═══════════════════════════════════════════════════ */}
      <Section variant="violet" className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={PURPLE} className="mb-4">
            The Challenge
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[720px] mx-auto">
            Design teams are{" "}
            <span style={{ color: PURPLE }}>flying blind</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[560px] mx-auto">
            Without the right tooling, design systems degrade silently. Here are the
            problems you already know but cannot solve with spreadsheets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[960px] mx-auto">
          {PAIN_POINTS.map((pain) => (
            <Card key={pain.title} variant="light" className="relative group overflow-hidden">
              {/* Faint accent glow */}
              <div
                className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-[0.06] blur-2xl"
                style={{ background: PURPLE }}
                aria-hidden="true"
              />
              <div className="flex items-start gap-4">
                <div
                  className="mt-0.5 shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: PURPLE_LIGHT }}
                >
                  <pain.icon className="h-5 w-5" style={{ color: PURPLE }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-theme mb-1.5">
                    {pain.title}
                  </h3>
                  <p className="text-xs text-theme-m leading-relaxed">
                    {pain.description}
                  </p>
                </div>
              </div>
              {/* Stat callout */}
              <div className="mt-4 flex items-center gap-3 rounded-lg bg-theme-subtle border border-theme px-3 py-2">
                <span className="text-lg font-bold" style={{ color: PURPLE }}>
                  {pain.stat}
                </span>
                <span className="text-[10px] text-theme-m uppercase tracking-wider">
                  {pain.statLabel}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          3. YOUR VOATOMY STACK
      ═══════════════════════════════════════════════════ */}
      <Section variant="coral" className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={PURPLE} className="mb-4">
            Your Stack
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[720px] mx-auto">
            Three products,{" "}
            <span style={{ color: PURPLE }}>one design workflow</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[560px] mx-auto">
            Voatomy gives design teams purpose-built tools that work together.
            Start with DRIFT, layer on LOOP and ATLAS as you scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1080px] mx-auto">
          {PRODUCT_STACK.map((product, i) => (
            <Card
              key={product.name}
              variant="light"
              className="relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Big watermark number */}
              <span
                className="absolute -top-4 -right-2 text-[100px] font-bold leading-none select-none pointer-events-none opacity-[0.04]"
                style={{ color: product.color }}
              >
                {i + 1}
              </span>

              {/* Product badge */}
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: product.colorLight }}
                >
                  <product.icon className="h-5 w-5" style={{ color: product.color }} />
                </div>
                <div>
                  <span className="text-lg font-bold text-theme">{product.name}</span>
                  <span
                    className="ml-2 text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5"
                    style={{ background: product.colorLight, color: product.color }}
                  >
                    {product.tag}
                  </span>
                </div>
              </div>

              <p className="text-sm text-theme-m leading-relaxed mb-5">
                {product.description}
              </p>

              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-theme-s">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: product.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: product.color }}
              />
            </Card>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          4. DESIGN SYSTEM HEALTH GRID
      ═══════════════════════════════════════════════════ */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={PURPLE} className="mb-4">
            System Health
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[720px] mx-auto">
            Your design system&apos;s{" "}
            <span style={{ color: PURPLE }}>vital signs</span>, at a glance
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[560px] mx-auto">
            Every component scored by adoption, drift status, and accessibility.
            Know exactly where your system is strong and where it needs attention.
          </p>
        </div>

        {/* Overall health score */}
        <div className="mx-auto max-w-[1080px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center"
                style={{ background: PURPLE_LIGHT }}
              >
                <Heart className="h-6 w-6" style={{ color: PURPLE }} />
              </div>
              <div>
                <p className="text-xs text-theme-m uppercase tracking-wider">Overall Health Score</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold" style={{ color: PURPLE }}>94</span>
                  <span className="text-sm text-theme-m">/100</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-theme-m">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Synced
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Warning
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                Drifted
              </span>
            </div>
          </div>

          {/* Component grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMPONENTS_HEALTH.map((comp) => (
              <div
                key={comp.name}
                className="rounded-xl border border-theme bg-theme-card p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <comp.icon className="h-4 w-4 text-theme-m" />
                    <span className="text-sm font-semibold text-theme">{comp.name}</span>
                  </div>
                  <DriftStatus status={comp.drift} />
                </div>

                {/* Adoption */}
                <div className="mb-3">
                  <div className="flex justify-between text-[10px] uppercase tracking-wider text-theme-m mb-1">
                    <span>Adoption</span>
                    <span className="font-semibold text-theme-s">{comp.adoption}%</span>
                  </div>
                  <HealthBar value={comp.adoption} />
                </div>

                {/* A11y score */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-theme-m">A11y Score</span>
                  <span
                    className={cn(
                      "text-[10px] font-bold rounded px-1.5 py-0.5",
                      comp.a11y >= 95
                        ? "bg-emerald-400/10 text-emerald-400"
                        : comp.a11y >= 90
                          ? "bg-blue-400/10 text-blue-400"
                          : "bg-amber-400/10 text-amber-400",
                    )}
                  >
                    {comp.a11y}/100
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          5. DRIFT DETECTION VISUAL
      ═══════════════════════════════════════════════════ */}
      <Section variant="violet" className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={PURPLE} className="mb-4">
            Drift Detection
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[720px] mx-auto">
            See exactly where{" "}
            <span style={{ color: PURPLE }}>design and code diverge</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[560px] mx-auto">
            Token-level comparison between Figma and your codebase. Every mismatch
            is flagged, explained, and fixable in one click.
          </p>
        </div>

        {/* Drift comparison panel */}
        <div className="mx-auto max-w-[800px] rounded-2xl border border-theme bg-theme overflow-hidden shadow-2xl">
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-theme px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-lg flex items-center justify-center" style={{ background: PURPLE_LIGHT }}>
                <Eye className="h-3.5 w-3.5" style={{ color: PURPLE }} />
              </div>
              <span className="text-sm font-semibold text-theme">Drift Report</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] rounded-full px-2 py-0.5 bg-red-500/10 text-red-400 font-semibold">
                2 drifted
              </span>
              <span className="text-[10px] rounded-full px-2 py-0.5 bg-emerald-500/10 text-emerald-400 font-semibold">
                2 synced
              </span>
            </div>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-[1.2fr_1fr_1fr_auto] gap-3 px-6 py-2.5 border-b border-theme text-[10px] uppercase tracking-wider text-theme-m font-semibold">
            <span>Token</span>
            <span>Figma</span>
            <span>Code</span>
            <span className="w-8 text-center">Status</span>
          </div>

          {/* Drift rows */}
          <div className="divide-y divide-theme">
            {DRIFT_ITEMS.map((item) => (
              <div
                key={item.token}
                className={cn(
                  "grid grid-cols-[1.2fr_1fr_1fr_auto] gap-3 items-center px-6 py-3.5 text-xs transition-colors",
                  item.isDrifted ? "bg-red-500/[0.03]" : "",
                )}
              >
                <div>
                  <span className="font-mono text-theme-s">{item.token}</span>
                  <p className="text-[10px] text-theme-m mt-0.5">{item.property}</p>
                </div>
                <div className="flex items-center gap-2">
                  {item.type === "color" && (
                    <span className="h-4 w-4 rounded border border-theme" style={{ background: item.figma }} />
                  )}
                  <code className="font-mono text-theme-s">{item.figma}</code>
                </div>
                <div className="flex items-center gap-2">
                  {item.type === "color" && (
                    <span className="h-4 w-4 rounded border border-theme" style={{ background: item.code }} />
                  )}
                  <code className={cn("font-mono", item.isDrifted ? "text-red-400" : "text-emerald-400")}>
                    {item.code}
                  </code>
                </div>
                <div className="w-8 flex justify-center">
                  {item.isDrifted ? (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div
            className="flex items-center justify-between border-t px-6 py-4"
            style={{ borderColor: PURPLE_BORDER, background: PURPLE_GLOW }}
          >
            <div className="flex items-center gap-2 text-xs text-theme-m">
              <Zap className="h-3.5 w-3.5" style={{ color: PURPLE }} />
              AI-suggested fixes ready for 2 drifted tokens
            </div>
            <Button
              size="sm"
              className="gap-2 text-white"
              style={{ background: PURPLE }}
            >
              <GitPullRequest className="h-3.5 w-3.5" />
              Generate Fix PR
            </Button>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          6. REVENUE-CONNECTED DESIGN
      ═══════════════════════════════════════════════════ */}
      <Section variant="coral" className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={PURPLE} className="mb-4">
            Revenue-Connected
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[720px] mx-auto">
            Link design decisions to{" "}
            <span style={{ color: PURPLE }}>real revenue</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[560px] mx-auto">
            Stop arguing about design with opinions. Use data. Every component is
            tied to the business outcomes it influences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px] mx-auto">
          {/* High-impact: Pricing Card */}
          <Card variant="light" className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-bl-full opacity-10"
              style={{ background: PURPLE }}
              aria-hidden="true"
            />
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{ background: PURPLE_LIGHT }}
              >
                <TrendingUp className="h-5 w-5" style={{ color: PURPLE }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-theme">High-Impact Component</h3>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: PURPLE }}>
                  Revenue Driver
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-theme bg-theme-subtle p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Component</span>
                <span className="text-xs font-semibold text-theme">Pricing Card</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Used by paying users</span>
                <span className="text-xs font-bold" style={{ color: PURPLE }}>80%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Revenue attribution</span>
                <span className="text-xs font-bold text-emerald-500">$2.4M ARR</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Usage trend (90d)</span>
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" />
                  +18%
                </span>
              </div>
              <HealthBar value={95} color={PURPLE} />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-medium" style={{ color: PURPLE }}>
              <Sparkles className="h-3.5 w-3.5" />
              Prioritize drift fixes for this component
            </div>
          </Card>

          {/* Low-impact: Legacy Accordion */}
          <Card variant="light" className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-bl-full opacity-10 bg-amber-400"
              aria-hidden="true"
            />
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-amber-400/10">
                <TrendingDown className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-theme">Deprecation Candidate</h3>
                <p className="text-[10px] text-amber-500 uppercase tracking-wider">Low Adoption</p>
              </div>
            </div>

            <div className="rounded-xl border border-theme bg-theme-subtle p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Component</span>
                <span className="text-xs font-semibold text-theme">Legacy Accordion</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Adoption</span>
                <span className="text-xs font-bold text-amber-400">12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Usage trend (90d)</span>
                <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  -34%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Revenue impact</span>
                <span className="text-xs font-bold text-theme-m">$12K ARR</span>
              </div>
              <HealthBar value={18} />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-amber-400">
              <Ban className="h-3.5 w-3.5" />
              Low adoption pattern — deprecation candidate
            </div>
          </Card>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          7. DESIGNER WORKFLOW
      ═══════════════════════════════════════════════════ */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={PURPLE} className="mb-4">
            Workflow
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[720px] mx-auto">
            From Figma to production,{" "}
            <span style={{ color: PURPLE }}>zero drift</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[560px] mx-auto">
            A four-step flow that keeps every design token, spacing value, and color
            decision perfectly synchronized between design and code.
          </p>
        </div>

        <div className="mx-auto max-w-[960px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {WORKFLOW_STEPS.map((step, idx) => (
              <div key={step.step} className="relative flex flex-col items-center text-center px-4 py-6 group">
                {/* Connecting line (between steps) */}
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-[52px] left-[60%] right-0 h-px"
                    style={{ background: `linear-gradient(to right, ${PURPLE_BORDER}, ${PURPLE}40)` }}
                    aria-hidden="true"
                  />
                )}

                {/* Step number circle */}
                <div
                  className="relative z-[1] mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: PURPLE_LIGHT,
                    borderColor: PURPLE_BORDER,
                  }}
                >
                  <step.icon className="h-6 w-6" style={{ color: PURPLE }} />
                </div>

                {/* Step label */}
                <span
                  className="text-[10px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: PURPLE }}
                >
                  Step {step.step}
                </span>

                <h3 className="text-sm font-semibold text-theme mb-1.5">{step.title}</h3>
                <p className="text-xs text-theme-m leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Convergence badge */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <div
              className="h-px flex-1 max-w-[140px]"
              style={{ background: `linear-gradient(to right, transparent, ${PURPLE_BORDER})` }}
            />
            <div
              className="rounded-full px-5 py-2.5 flex items-center gap-2 text-xs font-semibold border"
              style={{ background: PURPLE_LIGHT, color: PURPLE, borderColor: PURPLE_BORDER }}
            >
              <CheckCircle2 className="h-4 w-4" />
              Design = Code, always
            </div>
            <div
              className="h-px flex-1 max-w-[140px]"
              style={{ background: `linear-gradient(to left, transparent, ${PURPLE_BORDER})` }}
            />
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          8. CTA
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden px-4 py-24 sm:py-32">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${PURPLE}14 0%, ${PURPLE}06 50%, transparent 100%)` }}
          aria-hidden="true"
        />
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "var(--dot-grid)", backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />
        {/* Purple glow orb */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: PURPLE }}
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto max-w-[640px] text-center">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: PURPLE_LIGHT }}
          >
            <ArrowLeftRight className="h-8 w-8" style={{ color: PURPLE }} />
          </div>

          <h2 className="text-heading-1 text-theme">
            Start keeping design and code{" "}
            <span style={{ color: PURPLE }}>in sync</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[500px] mx-auto">
            Stop shipping mismatched tokens, invisible drift, and dead components.
            Voatomy gives your design team the visibility and control it deserves.
          </p>

          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-2 text-white" style={{ background: PURPLE }}>
              <Link href="/products/drift">
                Explore DRIFT
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-theme-m">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" style={{ color: PURPLE }} />
              Product Designers &middot; System Leads &middot; UX Engineers
            </span>
            <span className="text-theme-f">|</span>
            <span className="flex items-center gap-1.5">
              <Figma className="h-3.5 w-3.5" style={{ color: PURPLE }} />
              Figma &middot; GitHub &middot; Amplitude
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

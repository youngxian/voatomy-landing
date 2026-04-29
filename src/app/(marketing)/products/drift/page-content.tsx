"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buildProductCheckoutUrl } from "@/lib/product-purchase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import { DriftIllustration } from "@/components/illustrations/product-illustrations";
import {
  ArrowRight,
  ArrowLeftRight,
  Scan,
  Wand2,
  ShieldCheck,
  Figma,
  BarChart3,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  TrendingUp,
  Eye,
  Palette,
  Move,
  Accessibility,
  Layers,
  GitPullRequest,
  Clock,
  Zap,
  Heart,
  Users,
  ArrowDown,
  ArrowUp,
  RefreshCw,
  Code2,
  PenTool,
  CircleDot,
  Minus,
  Github,
} from "lucide-react";
import { ProductHeroAtmosphere } from "@/components/marketing/product-hero-atmosphere";
import { productBrand } from "@/lib/product-brand";

/* ─────────────────────── Constants ─────────────────────── */

const DRIFT_PURPLE = productBrand.drift.accent;
const DRIFT_PURPLE_LIGHT = productBrand.drift.accentLight;
const DRIFT_PURPLE_BORDER = productBrand.drift.accentBorder;

const DRIFT_EXAMPLES = [
  {
    label: "Color Token Mismatch",
    icon: Palette,
    design: "#6366F1",
    code: "#6365F0",
    severity: "warning",
  },
  {
    label: "Spacing Inconsistency",
    icon: Move,
    design: "16px",
    code: "14px",
    severity: "critical",
  },
  {
    label: "Missing Variant",
    icon: Layers,
    design: "Button/Ghost",
    code: "undefined",
    severity: "critical",
  },
  {
    label: "A11y Score Drop",
    icon: Accessibility,
    design: "AA Pass",
    code: "AA Fail",
    severity: "warning",
  },
];

const PILLARS = [
  {
    icon: Scan,
    title: "Detect",
    description:
      "Auto-scan for design-code drift across tokens, spacing, typography, and colors. DRIFT continuously monitors your design system for divergence.",
    features: [
      "Token-level diffing",
      "Typography audit",
      "Color space matching",
      "Spacing grid validation",
    ],
  },
  {
    icon: Wand2,
    title: "Resolve",
    description:
      "AI-suggested fixes with one-click PR generation. DRIFT proposes code changes that precisely match your design intent.",
    features: [
      "AI fix suggestions",
      "One-click PR creation",
      "Batch resolution",
      "Conflict preview",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Prevent",
    description:
      "CI/CD integration that blocks drift-introducing PRs before they merge. Prevention is cheaper than detection.",
    features: [
      "Pre-merge checks",
      "PR drift scoring",
      "Automated blocking",
      "Threshold configuration",
    ],
  },
];

const COMPONENTS_HEALTH = [
  { name: "Button", health: 98, adoption: 94, a11y: "AA", status: "healthy" },
  { name: "Input", health: 91, adoption: 87, a11y: "AA", status: "healthy" },
  { name: "Card", health: 85, adoption: 76, a11y: "AA", status: "warning" },
  { name: "Modal", health: 72, adoption: 68, a11y: "A", status: "critical" },
  { name: "Tooltip", health: 95, adoption: 82, a11y: "AAA", status: "healthy" },
  { name: "Avatar", health: 88, adoption: 71, a11y: "AA", status: "healthy" },
  { name: "Badge", health: 67, adoption: 54, a11y: "AA", status: "critical" },
  { name: "Tabs", health: 93, adoption: 89, a11y: "AA", status: "healthy" },
];

const INTEGRATIONS = [
  {
    name: "Figma",
    icon: Figma,
    description: "Deep token sync with real-time change detection. Publish tokens in Figma, DRIFT picks them up instantly.",
    features: ["Token extraction", "Component mapping", "Version tracking"],
  },
  {
    name: "GitHub",
    icon: Github,
    description: "PR-level drift checks, automated fix suggestions, and status checks that block drifted code.",
    features: ["PR status checks", "Auto-fix PRs", "Branch protection"],
  },
  {
    name: "Amplitude",
    icon: BarChart3,
    description: "Connect component usage to real user behavior. Prioritize fixes based on actual product impact.",
    features: ["Usage analytics", "Impact scoring", "Deprecation signals"],
  },
];

/* ─────────────────────── Helpers ─────────────────────── */

function SeverityBadge({ level }: { level: string }) {
  const styles: Record<string, { bg: string; text: string; dot: string }> = {
    critical: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
    warning: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      dot: "bg-amber-400",
    },
    info: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      dot: "bg-blue-400",
    },
  };
  const s = styles[level] || styles.info;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        s.bg,
        s.text,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}

function HealthBar({ value, size = "md" }: { value: number; size?: "sm" | "md" }) {
  const color =
    value >= 90
      ? "#0d9488"
      : value >= 75
        ? DRIFT_PURPLE
        : value >= 60
          ? "#F59E0B"
          : "#EF4444";
  return (
    <div
      className={cn(
        "w-full rounded-full bg-theme-subtle",
        size === "sm" ? "h-1" : "h-1.5",
      )}
    >
      <div
        className="rounded-full transition-all duration-1000"
        style={{
          width: `${value}%`,
          background: color,
          height: "100%",
        }}
      />
    </div>
  );
}

/* ─────────────────────── AI Workflow ─────────────────────── */

const DRIFT_PIPELINE = [
  {
    id: "scan",
    icon: Scan,
    title: "Token Scanning",
    desc: "Continuous sync from Figma design files",
    detail: "DRIFT's Figma plugin watches for token publishes and component edits in real-time, extracting colors, spacing, typography, shadows, and border radii into a structured token map.",
    tags: ["Colors", "Spacing", "Typography", "Shadows", "Radii", "Breakpoints"],
    color: DRIFT_PURPLE,
  },
  {
    id: "diff",
    icon: ArrowLeftRight,
    title: "Token Diffing",
    desc: "Byte-level comparison between design and code",
    detail: "Every extracted design token is compared against your codebase tokens (CSS vars, Tailwind config, or style-dictionary output) using perceptual and exact-match algorithms.",
    tags: ["Perceptual color diff", "Exact match", "Fuzzy spacing", "Alias resolution"],
    color: "#A78BFA",
  },
  {
    id: "classify",
    icon: AlertTriangle,
    title: "Drift Classification",
    desc: "Severity scoring and impact analysis",
    detail: "Each drift is classified by severity (critical/warning/info), affected components, user-facing impact, and revenue attribution based on component usage analytics.",
    tags: ["Severity score", "Component mapping", "UX impact", "Revenue weight"],
    color: "#F59E0B",
  },
  {
    id: "fix",
    icon: Wand2,
    title: "AI Fix Generation",
    desc: "Automated code patches aligned to design intent",
    detail: "GPT-powered code generation creates precise patches — updating CSS vars, Tailwind classes, or style-dictionary tokens to match the latest Figma source of truth.",
    tags: ["CSS var patches", "Tailwind updates", "Token file edits", "PR description"],
    color: "#0d9488",
  },
  {
    id: "gate",
    icon: ShieldCheck,
    title: "CI/CD Gating",
    desc: "Pre-merge drift checks block drifted code",
    detail: "DRIFT's GitHub Action runs on every PR, scoring the change for design compliance. PRs that introduce drift are blocked until fixed, with inline annotations.",
    tags: ["PR status check", "Inline annotations", "Drift score", "Block threshold"],
    color: "#3B82F6",
  },
  {
    id: "learn",
    icon: TrendingUp,
    title: "Health Tracking",
    desc: "Design system health trends over time",
    detail: "Every scan feeds a dashboard showing system-wide health, component adoption, drift trends, and a11y scores — giving design and eng teams a shared source of truth.",
    tags: ["Health score", "Adoption %", "Drift trend", "A11y compliance"],
    color: DRIFT_PURPLE,
  },
];

function DriftAIWorkflow() {
  const [activeStage, setActiveStage] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!playing || !visible) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % DRIFT_PIPELINE.length);
    }, 3400);
    return () => clearInterval(timer);
  }, [playing, visible]);

  const stage = DRIFT_PIPELINE[activeStage];
  const StageIcon = stage.icon;

  return (
    <Section variant="rose" className="py-20 sm:py-28 overflow-hidden">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={DRIFT_PURPLE} className="mb-4">
            AI Workflow
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[720px] mx-auto">
            Inside DRIFT&apos;s{" "}
            <span style={{ color: DRIFT_PURPLE }}>design-code sync engine</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-2xl mx-auto">
            Follow a Figma token change through six AI stages — from design
            publish to code fix to CI gate, automatically.
          </p>
        </div>

        {/* Pipeline progress */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex items-center gap-1">
            {DRIFT_PIPELINE.map((s, i) => {
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
                    className={cn("h-1.5 rounded-full transition-all duration-500 mb-3", active ? "h-2" : "")}
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
                    <span className={cn("text-[10px] font-medium text-center hidden sm:block", active ? "text-theme" : "text-theme-m")}>
                      {s.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage detail card */}
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl border shadow-xl transition-all duration-500"
            style={{ borderColor: `${stage.color}25`, boxShadow: `0 8px 48px ${stage.color}08` }}
          >
            <div className="rounded-xl bg-theme-card">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left info */}
                <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-theme">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-11 w-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stage.color}15` }}>
                      <StageIcon className="h-5 w-5" style={{ color: stage.color }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-theme-m uppercase">Stage {String(activeStage + 1).padStart(2, "0")}</div>
                      <h3 className="text-lg font-semibold text-theme">{stage.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-theme-s leading-relaxed mb-5">{stage.detail}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {stage.tags.map((tag, j) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border"
                        style={{
                          borderColor: `${stage.color}30`,
                          color: stage.color,
                          backgroundColor: `${stage.color}08`,
                          animation: `drift-tag-pop 0.3s ease-out ${j * 60}ms both`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setPlaying(!playing)}
                    className="mt-5 flex items-center gap-2 text-xs text-theme-m hover:text-theme-s transition-colors"
                  >
                    <div className={cn("h-2 w-2 rounded-full", playing ? "animate-pulse bg-green-400" : "bg-gray-400")} />
                    {playing ? "Auto-playing" : "Paused"}
                  </button>
                </div>

                {/* Right visualization */}
                <div className="p-6 lg:p-8 flex flex-col justify-center min-h-[300px]">
                  {activeStage === 0 && <DriftScanVisual />}
                  {activeStage === 1 && <DriftDiffVisual />}
                  {activeStage === 2 && <DriftClassifyVisual />}
                  {activeStage === 3 && <DriftFixVisual />}
                  {activeStage === 4 && <DriftGateVisual />}
                  {activeStage === 5 && <DriftHealthVisual />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes drift-tag-pop {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </Section>
  );
}

/* Drift Visual: Token Scanning */
function DriftScanVisual() {
  const tokens = [
    { name: "color.primary", value: "#6366F1", type: "color" },
    { name: "spacing.md", value: "16px", type: "spacing" },
    { name: "radius.lg", value: "12px", type: "radius" },
    { name: "font.weight.bold", value: "700", type: "typography" },
    { name: "shadow.card", value: "0 4px 12px", type: "shadow" },
    { name: "color.success", value: "#0d9488", type: "color" },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: DRIFT_PURPLE }} />
        <span className="text-xs font-mono text-theme-m">Scanning Figma tokens… 142 extracted</span>
      </div>
      {tokens.map((t, i) => (
        <div
          key={t.name}
          className="flex items-center gap-2 rounded-lg border border-theme p-2"
          style={{ animation: `drift-scan-in 0.3s ease-out ${i * 70}ms both` }}
        >
          {t.type === "color" && <span className="h-4 w-4 rounded" style={{ background: t.value }} />}
          {t.type !== "color" && <span className="h-4 w-4 rounded bg-theme-subtle flex items-center justify-center text-[8px] text-theme-m">{t.type[0].toUpperCase()}</span>}
          <code className="text-[11px] font-mono text-theme-s flex-1">{t.name}</code>
          <code className="text-[11px] font-mono text-theme-m">{t.value}</code>
          <CheckCircle2 className="h-3 w-3 text-green-400 flex-shrink-0" />
        </div>
      ))}
      <style jsx>{`@keyframes drift-scan-in { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </div>
  );
}

/* Drift Visual: Token Diffing */
function DriftDiffVisual() {
  const diffs = [
    { token: "color.primary", figma: "#6366F1", code: "#6365F0", match: false, delta: "ΔE=1.2" },
    { token: "spacing.md", figma: "16px", code: "14px", match: false, delta: "Δ2px" },
    { token: "radius.lg", figma: "12px", code: "12px", match: true, delta: "exact" },
    { token: "font.weight.bold", figma: "700", code: "700", match: true, delta: "exact" },
    { token: "shadow.card", figma: "0 4px 12px", code: "0 2px 8px", match: false, delta: "Δ2+4px" },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "#A78BFA" }} />
        <span className="text-xs font-mono text-theme-m">Running token diff… 3 mismatches found</span>
      </div>
      <div className="rounded-lg border border-theme overflow-hidden">
        <div className="grid grid-cols-[1fr_70px_70px_50px] gap-1 px-2 py-1.5 border-b border-theme bg-theme-subtle/30 text-[9px] font-bold text-theme-m uppercase tracking-wider">
          <span>Token</span><span className="text-center">Figma</span><span className="text-center">Code</span><span className="text-center">Delta</span>
        </div>
        {diffs.map((d, i) => (
          <div
            key={d.token}
            className={cn("grid grid-cols-[1fr_70px_70px_50px] gap-1 px-2 py-2 border-b last:border-0 border-theme items-center", !d.match && "bg-red-500/[0.03]")}
            style={{ animation: `drift-diff-in 0.3s ease-out ${i * 60}ms both` }}
          >
            <code className="text-[10px] font-mono text-theme-s truncate">{d.token}</code>
            <code className="text-[10px] font-mono text-theme-m text-center">{d.figma}</code>
            <code className={cn("text-[10px] font-mono text-center", d.match ? "text-theme-m" : "text-red-400")}>{d.code}</code>
            <span className={cn("text-[9px] text-center font-medium", d.match ? "text-green-400" : "text-amber-400")}>{d.delta}</span>
          </div>
        ))}
      </div>
      <style jsx>{`@keyframes drift-diff-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}

/* Drift Visual: Classification */
function DriftClassifyVisual() {
  const items = [
    { name: "color.primary drift", severity: "warning", impact: "Visual inconsistency", revenue: "$2.4M component", score: 72 },
    { name: "spacing.md drift", severity: "critical", impact: "Layout shift on mobile", revenue: "Checkout flow", score: 94 },
    { name: "shadow.card drift", severity: "info", impact: "Subtle shadow mismatch", revenue: "Low-traffic page", score: 31 },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Classifying drift severity…</span>
      </div>
      {items.map((item, i) => (
        <div key={item.name} className="rounded-lg border border-theme p-3" style={{ animation: `drift-class-in 0.4s ease-out ${i * 100}ms both` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-theme">{item.name}</span>
            <SeverityBadge level={item.severity} />
          </div>
          <div className="h-1.5 rounded-full bg-theme-subtle overflow-hidden mb-2">
            <div className="h-full rounded-full" style={{ width: `${item.score}%`, backgroundColor: item.score >= 80 ? "#EF4444" : item.score >= 50 ? "#F59E0B" : DRIFT_PURPLE }} />
          </div>
          <div className="flex items-center gap-3 text-[10px] text-theme-m">
            <span>Impact: <strong className="text-theme-s">{item.impact}</strong></span>
            <span>Scope: <strong className="text-theme-s">{item.revenue}</strong></span>
          </div>
        </div>
      ))}
      <style jsx>{`@keyframes drift-class-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

/* Drift Visual: AI Fix Generation */
function DriftFixVisual() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Generating code patches…</span>
      </div>
      {/* Mock code diff */}
      <div className="rounded-lg border border-theme overflow-hidden font-mono text-[11px]">
        <div className="px-3 py-1.5 border-b border-theme bg-theme-subtle/30 text-[10px] text-theme-m">
          tokens/colors.css — AI-generated fix
        </div>
        <div className="p-3 space-y-0.5">
          <div className="flex items-center gap-2 text-red-400 bg-red-500/[0.05] px-2 py-0.5 rounded">
            <span className="w-4 text-right text-theme-f">12</span>
            <span>- --color-primary: #6365F0;</span>
          </div>
          <div className="flex items-center gap-2 text-green-400 bg-green-500/[0.05] px-2 py-0.5 rounded">
            <span className="w-4 text-right text-theme-f">12</span>
            <span>+ --color-primary: #6366F1;</span>
          </div>
          <div className="h-2" />
          <div className="flex items-center gap-2 text-red-400 bg-red-500/[0.05] px-2 py-0.5 rounded">
            <span className="w-4 text-right text-theme-f">18</span>
            <span>- --spacing-md: 14px;</span>
          </div>
          <div className="flex items-center gap-2 text-green-400 bg-green-500/[0.05] px-2 py-0.5 rounded">
            <span className="w-4 text-right text-theme-f">18</span>
            <span>+ --spacing-md: 16px;</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg p-2 border" style={{ borderColor: `${DRIFT_PURPLE}30`, backgroundColor: `${DRIFT_PURPLE}08` }}>
        <Wand2 className="h-4 w-4" style={{ color: DRIFT_PURPLE }} />
        <span className="text-[11px]" style={{ color: DRIFT_PURPLE }}>2 files patched — ready for PR creation</span>
      </div>
    </div>
  );
}

/* Drift Visual: CI/CD Gate */
function DriftGateVisual() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">CI/CD drift check running…</span>
      </div>
      {/* PR status mock */}
      <div className="rounded-lg border border-theme p-3">
        <div className="flex items-center gap-2 mb-3">
          <GitPullRequest className="h-4 w-4" style={{ color: DRIFT_PURPLE }} />
          <span className="text-xs font-semibold text-theme">PR #284 — Update pricing card styles</span>
        </div>
        <div className="space-y-2">
          {[
            { check: "DRIFT: Token Compliance", status: "pass", score: "100%" },
            { check: "DRIFT: Component Drift", status: "pass", score: "0 new drifts" },
            { check: "DRIFT: A11y Check", status: "pass", score: "AA pass" },
            { check: "DRIFT: Overall Score", status: "pass", score: "98/100" },
          ].map((c, i) => (
            <div key={c.check} className="flex items-center gap-2" style={{ animation: `drift-gate-in 0.3s ease-out ${i * 80}ms both` }}>
              <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
              <span className="text-[11px] text-theme-s flex-1">{c.check}</span>
              <span className="text-[10px] font-mono text-green-400">{c.score}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg p-2 bg-green-500/[0.06] border border-green-500/20 text-center">
          <span className="text-xs font-semibold text-green-400">✓ All drift checks passed — ready to merge</span>
        </div>
      </div>
      <style jsx>{`@keyframes drift-gate-in { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </div>
  );
}

/* Drift Visual: Health Tracking */
function DriftHealthVisual() {
  const trend = [78, 82, 85, 88, 90, 92, 94, 96];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: DRIFT_PURPLE }} />
        <span className="text-xs font-mono text-theme-m">Design system health trending up</span>
      </div>
      {/* Health chart */}
      <div className="rounded-lg border border-theme p-4">
        <div className="text-[10px] text-theme-m font-semibold mb-3">System Health — Last 8 Weeks</div>
        <div className="flex items-end gap-2 h-24">
          {trend.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] font-bold" style={{ color: v >= 90 ? "#0d9488" : DRIFT_PURPLE }}>{v}%</span>
              <div className="w-full rounded-t-md bg-theme-subtle" style={{ height: "100%" }}>
                <div
                  className="w-full rounded-t-md"
                  style={{
                    height: `${v}%`,
                    marginTop: `${100 - v}%`,
                    background: v >= 90 ? `linear-gradient(180deg, #0d9488, ${DRIFT_PURPLE}50)` : `linear-gradient(180deg, ${DRIFT_PURPLE}, ${DRIFT_PURPLE}40)`,
                  }}
                />
              </div>
              <span className="text-[8px] text-theme-f">W{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Health Score", value: "96%", color: "#0d9488" },
          { label: "Adoption", value: "92%", color: DRIFT_PURPLE },
          { label: "A11y", value: "AA+", color: "#3B82F6" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-theme p-2 text-center">
            <div className="text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[9px] text-theme-m">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── Main Page ─────────────────────── */

export default function DriftPage() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="drift-landing">
      {/* ═══════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden bg-theme px-4 pb-20 pt-20 transition-colors duration-300">
        <ProductHeroAtmosphere variant="drift" />
        <div
          className="product-hero-gradient z-[1]"
          style={
            {
              "--hero-gradient": productBrand.drift.heroGradient,
              "--hero-gradient-secondary": productBrand.drift.heroGradientSecondary,
            } as React.CSSProperties
          }
        />
        <div className="pointer-events-none absolute inset-0 z-[1] fine-grid" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 z-[1] noise-overlay" aria-hidden="true" />

        <div className="relative z-[2] mx-auto max-w-container text-center">
          {/* Status badge */}
          <div
            className={cn(
              "transition-all duration-700 flex items-center justify-center gap-3",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold backdrop-blur-sm"
              style={{
                background: DRIFT_PURPLE_LIGHT,
                color: DRIFT_PURPLE,
                border: `1px solid ${DRIFT_PURPLE_BORDER}`,
              }}
            >
              <span
                className="h-2 w-2 rounded-full animate-glow-pulse"
                style={{ background: DRIFT_PURPLE }}
              />
              Available on Pro &amp; Business
            </span>
            <span className="enterprise-badge">
              <ShieldCheck className="h-3 w-3" />
              Enterprise Ready
            </span>
          </div>

          {/* Headline */}
          <h1
            className={cn(
              "mx-auto mt-8 max-w-[860px] text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-100",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Design says one thing.
            <br />
            <span style={{ color: DRIFT_PURPLE }}>Code says another.</span>
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              "mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-theme-m transition-all duration-700 delay-200",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            DRIFT keeps Figma designs and code components in permanent sync.
            Detect drift, resolve mismatches, and prevent divergence before it
            ships.
          </p>

          {/* CTA */}
          <div
            className={cn(
              "mx-auto mt-10 flex max-w-lg flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center transition-all duration-700 delay-300",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <Button size="lg" className="w-full gap-2 sm:w-auto" style={{ background: DRIFT_PURPLE }} asChild>
              <Link href={buildProductCheckoutUrl({ product: "drift", plan: "pro" })}>
                Start 14-day trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>

          {/* Meta info */}
          <div
            className={cn(
              "mx-auto mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-theme-m transition-all duration-700 delay-[350ms]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" style={{ color: DRIFT_PURPLE }} />
              Design &middot; Frontend &middot; Product
            </span>
            <span className="text-theme-f">|</span>
            <span>Add-on from $4/user/mo (annual)</span>
            <span className="text-theme-f">|</span>
            <span>Checkout on-site after trial</span>
          </div>

          {/* Split-screen visual: Figma vs Code */}
          <div
            className={cn(
              "mx-auto mt-14 max-w-[960px] transition-all duration-1000 delay-500",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="rounded-2xl border border-theme bg-theme-subtle shadow-2xl transition-colors duration-300 overflow-hidden">
              {/* Window bar */}
              <div className="flex items-center gap-2 border-b border-theme px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                <span
                  className="ml-4 flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: DRIFT_PURPLE }}
                >
                  <RefreshCw className="h-3 w-3" />
                  DRIFT &mdash; Design System Sync
                </span>
              </div>

              {/* Split screen */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
                {/* Figma side */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <PenTool className="h-4 w-4" style={{ color: DRIFT_PURPLE }} />
                    <span className="text-xs font-semibold text-theme-s uppercase tracking-wider">
                      Figma Design
                    </span>
                  </div>
                  <div className="rounded-xl border border-theme bg-theme-subtle p-4 space-y-3 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">Primary Color</span>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-4 w-4 rounded"
                          style={{ background: "#6366F1" }}
                        />
                        <code className="text-xs font-mono text-theme-s">
                          #6366F1
                        </code>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">Spacing.md</span>
                      <code className="text-xs font-mono text-theme-s">16px</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">Border Radius</span>
                      <code className="text-xs font-mono text-theme-s">12px</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">Font Weight</span>
                      <code className="text-xs font-mono text-theme-s">600</code>
                    </div>
                  </div>
                  {/* Mock component preview */}
                  <div className="rounded-lg border border-dashed border-theme p-3 text-center">
                    <div
                      className="mx-auto h-10 w-32 rounded-xl flex items-center justify-center text-xs font-semibold text-white"
                      style={{ background: "#6366F1" }}
                    >
                      Button/Primary
                    </div>
                  </div>
                </div>

                {/* Sync arrows center divider */}
                <div className="hidden md:flex flex-col items-center justify-center border-x border-theme px-4 py-6 gap-3">
                  <div
                    className="rounded-full p-2 animate-pulse"
                    style={{ background: DRIFT_PURPLE_LIGHT }}
                  >
                    <ArrowLeftRight
                      className="h-5 w-5"
                      style={{ color: DRIFT_PURPLE }}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="h-8 w-px"
                      style={{ background: DRIFT_PURPLE_BORDER }}
                    />
                    <CircleDot
                      className="h-3 w-3"
                      style={{ color: DRIFT_PURPLE }}
                    />
                    <div
                      className="h-8 w-px"
                      style={{ background: DRIFT_PURPLE_BORDER }}
                    />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: DRIFT_PURPLE }}
                  >
                    Sync
                  </span>
                </div>

                {/* Code side */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="h-4 w-4" style={{ color: DRIFT_PURPLE }} />
                    <span className="text-xs font-semibold text-theme-s uppercase tracking-wider">
                      Code Output
                    </span>
                  </div>
                  <div className="rounded-xl border border-theme bg-theme-subtle p-4 space-y-3 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">Primary Color</span>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-4 w-4 rounded"
                          style={{ background: "#6365F0" }}
                        />
                        <code className="text-xs font-mono text-red-400">
                          #6365F0
                        </code>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">Spacing.md</span>
                      <code className="text-xs font-mono text-red-400">14px</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">Border Radius</span>
                      <code className="text-xs font-mono text-theme-s">12px</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-theme-m">Font Weight</span>
                      <code className="text-xs font-mono text-theme-s">600</code>
                    </div>
                  </div>
                  {/* Mock component with drift */}
                  <div className="rounded-lg border border-dashed border-red-400/30 p-3 text-center">
                    <div
                      className="mx-auto h-10 w-32 rounded-[10px] flex items-center justify-center text-xs font-semibold text-white"
                      style={{ background: "#6365F0" }}
                    >
                      Button/Primary
                    </div>
                  </div>
                </div>
              </div>

              {/* Drift alert bar at bottom */}
              <div
                className="flex items-center justify-between border-t px-5 py-2.5 text-xs"
                style={{
                  borderColor: DRIFT_PURPLE_BORDER,
                  background: DRIFT_PURPLE_LIGHT,
                }}
              >
                <span className="flex items-center gap-2 font-medium" style={{ color: DRIFT_PURPLE }}>
                  <AlertTriangle className="h-3.5 w-3.5" />
                  2 drift issues detected
                </span>
                <span className="text-theme-m">
                  Last synced 12s ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. THE DRIFT PROBLEM
      ═══════════════════════════════════════════════════ */}
      <Section variant="amber" withGrid withNoise className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={DRIFT_PURPLE} className="mb-4 backdrop-blur-sm">
            The Problem
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[680px] mx-auto">
            Design drift is{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${DRIFT_PURPLE}, ${productBrand.drift.secondary})` }}>invisible</span> until
            it&apos;s expensive
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[560px] mx-auto">
            Tiny mismatches between Figma and code compound into major
            inconsistencies. Most teams only notice when users complain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DRIFT_EXAMPLES.map((example) => (
            <Card key={example.label} variant="light" className="relative group">
              <div className="flex items-center justify-between mb-4">
                <example.icon
                  className="h-5 w-5"
                  style={{ color: DRIFT_PURPLE }}
                />
                <SeverityBadge level={example.severity} />
              </div>
              <h3 className="text-sm font-semibold text-theme mb-3">
                {example.label}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-theme-subtle px-3 py-2">
                  <span className="text-[10px] uppercase tracking-wider text-theme-m">
                    Design
                  </span>
                  <code className="text-xs font-mono text-theme-s">
                    {example.design}
                  </code>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-red-500/[0.06] px-3 py-2 border border-red-500/10">
                  <span className="text-[10px] uppercase tracking-wider text-theme-m">
                    Code
                  </span>
                  <code className="text-xs font-mono text-red-400">
                    {example.code}
                  </code>
                </div>
              </div>
              {/* Drift line */}
              <div className="mt-3 flex items-center gap-2">
                <Minus className="h-3 w-3 text-red-400" />
                <div className="flex-1 h-px bg-gradient-to-r from-red-400/40 to-transparent" />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          3. REAL-TIME SYNC DASHBOARD
      ═══════════════════════════════════════════════════ */}
      <Section variant="violet" className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={DRIFT_PURPLE} className="mb-4">
            Live Dashboard
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[680px] mx-auto">
            Your design system&apos;s{" "}
            <span style={{ color: DRIFT_PURPLE }}>vital signs</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[560px] mx-auto">
            A real-time dashboard showing token diffs, component adoption, drift
            alerts, and accessibility scores.
          </p>
        </div>

        {/* Mock Dashboard */}
        <div className="rounded-2xl border border-theme bg-theme-subtle overflow-hidden shadow-xl mx-auto max-w-[1080px]">
          {/* Dashboard header */}
          <div className="flex items-center justify-between border-b border-theme px-6 py-3">
            <div className="flex items-center gap-3">
              <div
                className="h-6 w-6 rounded-lg flex items-center justify-center"
                style={{ background: DRIFT_PURPLE_LIGHT }}
              >
                <Eye className="h-3.5 w-3.5" style={{ color: DRIFT_PURPLE }} />
              </div>
              <span className="text-sm font-semibold text-theme">
                DRIFT Dashboard
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-theme-m">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Synced &middot; 4s ago
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-theme-subtle">
            {/* Token Diff Viewer */}
            <div className="lg:col-span-2 bg-theme p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-theme-m">
                  Token Diff Viewer
                </h3>
                <span className="text-[10px] rounded-full px-2 py-0.5 bg-red-500/10 text-red-400 font-medium">
                  3 drifted
                </span>
              </div>
              {[
                {
                  token: "color.primary",
                  figma: "#6366F1",
                  code: "#6365F0",
                  drifted: true,
                },
                {
                  token: "spacing.md",
                  figma: "16px",
                  code: "14px",
                  drifted: true,
                },
                {
                  token: "radius.lg",
                  figma: "12px",
                  code: "12px",
                  drifted: false,
                },
                {
                  token: "font.weight.bold",
                  figma: "700",
                  code: "700",
                  drifted: false,
                },
                {
                  token: "shadow.card",
                  figma: "0 4px 12px",
                  code: "0 2px 8px",
                  drifted: true,
                },
              ].map((row) => (
                <div
                  key={row.token}
                  className={cn(
                    "grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 rounded-lg px-3 py-2.5 text-xs border transition-colors",
                    row.drifted
                      ? "border-red-500/15 bg-red-500/[0.04]"
                      : "border-theme bg-theme-subtle",
                  )}
                >
                  <code className="font-mono text-theme-s">{row.token}</code>
                  <span className="text-theme-m font-mono">{row.figma}</span>
                  <span
                    className={cn(
                      "font-mono",
                      row.drifted ? "text-red-400" : "text-theme-m",
                    )}
                  >
                    {row.code}
                  </span>
                  {row.drifted ? (
                    <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                  )}
                </div>
              ))}
            </div>

            {/* Right sidebar */}
            <div className="bg-theme p-6 space-y-6">
              {/* Adoption rate */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-theme-m mb-3">
                  Component Adoption
                </h3>
                <div className="rounded-xl border border-theme bg-theme-subtle p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold" style={{ color: DRIFT_PURPLE }}>
                      92%
                    </span>
                    <span className="flex items-center gap-0.5 text-xs text-green-400 font-medium">
                      <TrendingUp className="h-3 w-3" />
                      +7%
                    </span>
                  </div>
                  <p className="text-[10px] text-theme-m mt-1">
                    85% &rarr; 92% over 30 days
                  </p>
                </div>
              </div>

              {/* Drift Alerts */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-theme-m mb-3">
                  Drift Alerts
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      msg: "Color token mismatch in Button",
                      level: "critical",
                      icon: AlertCircle,
                    },
                    {
                      msg: "Spacing drift in Card component",
                      level: "warning",
                      icon: AlertTriangle,
                    },
                    {
                      msg: "New token added in Figma",
                      level: "info",
                      icon: Info,
                    },
                  ].map((alert) => (
                    <div
                      key={alert.msg}
                      className="flex items-start gap-2 rounded-lg bg-theme-subtle border border-theme px-3 py-2"
                    >
                      <alert.icon
                        className={cn(
                          "h-3.5 w-3.5 mt-0.5 shrink-0",
                          alert.level === "critical" && "text-red-400",
                          alert.level === "warning" && "text-amber-400",
                          alert.level === "info" && "text-blue-400",
                        )}
                      />
                      <div>
                        <p className="text-[11px] text-theme-s leading-tight">
                          {alert.msg}
                        </p>
                        <SeverityBadge level={alert.level} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* A11y Score */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-theme-m mb-3">
                  Accessibility Score
                </h3>
                <div className="rounded-xl border border-theme bg-theme-subtle p-4 text-center">
                  <div
                    className="text-3xl font-bold"
                    style={{ color: "#0d9488" }}
                  >
                    94
                  </div>
                  <p className="text-[10px] text-theme-m mt-1">
                    WCAG 2.1 AA Compliance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          AI WORKFLOW PIPELINE
      ═══════════════════════════════════════════════════ */}
      <DriftAIWorkflow />

      {/* ═══════════════════════════════════════════════════
          4. THREE PILLARS
      ═══════════════════════════════════════════════════ */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={DRIFT_PURPLE} className="mb-4">
            How It Works
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[680px] mx-auto">
            Three pillars of{" "}
            <span style={{ color: DRIFT_PURPLE }}>design-code harmony</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => (
            <Card
              key={pillar.title}
              variant="light"
              className="relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Pillar number watermark */}
              <span
                className="absolute -top-4 -right-2 text-[120px] font-bold leading-none select-none pointer-events-none opacity-[0.04]"
                style={{ color: DRIFT_PURPLE }}
              >
                {i + 1}
              </span>

              <div
                className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: DRIFT_PURPLE_LIGHT }}
              >
                <pillar.icon
                  className="h-6 w-6"
                  style={{ color: DRIFT_PURPLE }}
                />
              </div>

              <h3 className="text-heading-2 text-theme mb-2">{pillar.title}</h3>
              <p className="text-sm text-theme-m leading-relaxed mb-5">
                {pillar.description}
              </p>

              <ul className="space-y-2">
                {pillar.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-theme-s">
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: DRIFT_PURPLE }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          5. COMPONENT HEALTH GRID
      ═══════════════════════════════════════════════════ */}
      <Section variant="rose" className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={DRIFT_PURPLE} className="mb-4">
            Component Health
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[680px] mx-auto">
            Your design system&apos;s{" "}
            <span style={{ color: DRIFT_PURPLE }}>status page</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[560px] mx-auto">
            Every component scored for health, adoption, and accessibility.
            Like a status page, but for your design system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1080px] mx-auto">
          {COMPONENTS_HEALTH.map((comp) => (
            <div
              key={comp.name}
              className="rounded-xl border border-theme bg-theme p-4 hover:border-theme-h transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-theme">
                  {comp.name}
                </span>
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    comp.status === "healthy" && "bg-green-400",
                    comp.status === "warning" && "bg-amber-400",
                    comp.status === "critical" && "bg-red-400",
                  )}
                />
              </div>

              {/* Health score */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] uppercase tracking-wider text-theme-m mb-1">
                  <span>Health</span>
                  <span
                    className="font-semibold"
                    style={{
                      color:
                        comp.health >= 90
                          ? "#0d9488"
                          : comp.health >= 75
                            ? DRIFT_PURPLE
                            : "#F59E0B",
                    }}
                  >
                    {comp.health}%
                  </span>
                </div>
                <HealthBar value={comp.health} />
              </div>

              {/* Adoption */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] uppercase tracking-wider text-theme-m mb-1">
                  <span>Adoption</span>
                  <span className="font-semibold text-theme-s">
                    {comp.adoption}%
                  </span>
                </div>
                <HealthBar value={comp.adoption} size="sm" />
              </div>

              {/* A11y badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-theme-m">
                  A11y
                </span>
                <span
                  className={cn(
                    "text-[10px] font-bold rounded px-1.5 py-0.5",
                    comp.a11y === "AAA" && "bg-green-400/10 text-green-400",
                    comp.a11y === "AA" && "bg-blue-400/10 text-blue-400",
                    comp.a11y === "A" && "bg-amber-400/10 text-amber-400",
                  )}
                >
                  WCAG {comp.a11y}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          6. REVENUE-AWARE DESIGN
      ═══════════════════════════════════════════════════ */}
      <Section variant="violet" className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={DRIFT_PURPLE} className="mb-4">
            Revenue-Aware
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[720px] mx-auto">
            Connect design decisions to{" "}
            <span style={{ color: DRIFT_PURPLE }}>business outcomes</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[560px] mx-auto">
            DRIFT links component usage to real revenue data so you know
            which design patterns actually drive growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {/* High-impact component */}
          <Card variant="light" className="relative overflow-hidden">
            <div
              className="absolute top-0 right-0 h-32 w-32 rounded-bl-full opacity-10"
              style={{ background: DRIFT_PURPLE }}
            />
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{ background: DRIFT_PURPLE_LIGHT }}
              >
                <TrendingUp className="h-5 w-5" style={{ color: DRIFT_PURPLE }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-theme">
                  High-Impact Component
                </h3>
                <p className="text-[10px] text-theme-m uppercase tracking-wider">
                  Priority: Critical
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-theme bg-theme-subtle p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Component</span>
                <span className="text-xs font-semibold text-theme">
                  Pricing Card
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Used by paying users</span>
                <span
                  className="text-xs font-bold"
                  style={{ color: DRIFT_PURPLE }}
                >
                  80%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Revenue attribution</span>
                <span className="text-xs font-bold text-green-400">$2.4M ARR</span>
              </div>
              <HealthBar value={95} />
            </div>

            <div
              className="mt-4 flex items-center gap-2 text-xs font-medium"
              style={{ color: DRIFT_PURPLE }}
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Prioritize drift fixes for this component
            </div>
          </Card>

          {/* Deprecation candidate */}
          <Card variant="light" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full opacity-10 bg-amber-400" />
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-amber-400/10">
                <ArrowDown className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-theme">
                  Deprecation Candidate
                </h3>
                <p className="text-[10px] text-theme-m uppercase tracking-wider">
                  Priority: Low
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-theme bg-theme-subtle p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Component</span>
                <span className="text-xs font-semibold text-theme">
                  Legacy Accordion
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Used by paying users</span>
                <span className="text-xs font-bold text-amber-400">12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-theme-m">Usage trend (90d)</span>
                <span className="text-xs font-bold text-red-400">-34%</span>
              </div>
              <HealthBar value={28} />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-amber-400">
              <AlertTriangle className="h-3.5 w-3.5" />
              Low adoption pattern &mdash; deprecation candidate
            </div>
          </Card>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          7. INTEGRATION CARDS
      ═══════════════════════════════════════════════════ */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={DRIFT_PURPLE} className="mb-4">
            Integrations
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[680px] mx-auto">
            Plugs into your{" "}
            <span style={{ color: DRIFT_PURPLE }}>existing workflow</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[560px] mx-auto">
            DRIFT connects deeply with the tools you already use, not just
            surface-level integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INTEGRATIONS.map((integration) => (
            <Card
              key={integration.name}
              variant="light"
              className="group hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: DRIFT_PURPLE_LIGHT }}
              >
                <integration.icon
                  className="h-6 w-6"
                  style={{ color: DRIFT_PURPLE }}
                />
              </div>

              <h3 className="text-heading-3 text-theme mb-2">
                {integration.name}
              </h3>
              <p className="text-sm text-theme-m leading-relaxed mb-5">
                {integration.description}
              </p>

              <div className="space-y-2 border-t border-theme pt-4">
                {integration.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-xs text-theme-s"
                  >
                    <CheckCircle2
                      className="h-3 w-3 shrink-0"
                      style={{ color: DRIFT_PURPLE }}
                    />
                    {f}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          8. DESIGNER + DEVELOPER WORKFLOW
      ═══════════════════════════════════════════════════ */}
      <Section variant="rose" className="py-20 sm:py-28">
        <div className="text-center mb-16">
          <Chip dotColor={DRIFT_PURPLE} className="mb-4">
            Workflow
          </Chip>
          <h2 className="text-heading-1 text-theme max-w-[720px] mx-auto">
            One system,{" "}
            <span style={{ color: DRIFT_PURPLE }}>two perspectives</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[560px] mx-auto">
            Designers and developers work in their own tools. DRIFT is the
            bridge that keeps them in sync.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[960px] mx-auto">
          {/* Designer workflow */}
          <div className="rounded-2xl border border-theme bg-theme p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{ background: DRIFT_PURPLE_LIGHT }}
              >
                <PenTool className="h-5 w-5" style={{ color: DRIFT_PURPLE }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-theme">
                  Designer Workflow
                </h3>
                <p className="text-[10px] text-theme-m">Figma-first experience</p>
              </div>
            </div>

            {/* Steps */}
            {[
              {
                step: "01",
                title: "Design in Figma",
                desc: "Create and update components with design tokens",
                icon: Figma,
              },
              {
                step: "02",
                title: "Publish Tokens",
                desc: "Push token changes through Figma's publish flow",
                icon: Zap,
              },
              {
                step: "03",
                title: "Auto-Detected",
                desc: "DRIFT picks up changes instantly, no manual export",
                icon: Eye,
              },
              {
                step: "04",
                title: "Review Impact",
                desc: "See which code components are affected by your changes",
                icon: BarChart3,
              },
            ].map((step, idx) => (
              <div key={step.step} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{
                      background: DRIFT_PURPLE_LIGHT,
                      color: DRIFT_PURPLE,
                    }}
                  >
                    {step.step}
                  </div>
                  {idx < 3 && (
                    <div
                      className="w-px h-6 mt-1"
                      style={{ background: DRIFT_PURPLE_BORDER }}
                    />
                  )}
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-2">
                    <step.icon className="h-3.5 w-3.5 text-theme-m" />
                    <span className="text-xs font-semibold text-theme">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-theme-m mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Developer workflow */}
          <div className="rounded-2xl border border-theme bg-theme p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{ background: DRIFT_PURPLE_LIGHT }}
              >
                <Code2 className="h-5 w-5" style={{ color: DRIFT_PURPLE }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-theme">
                  Developer Workflow
                </h3>
                <p className="text-[10px] text-theme-m">Code-first experience</p>
              </div>
            </div>

            {/* Steps */}
            {[
              {
                step: "01",
                title: "Write Code",
                desc: "Build components with your preferred framework and tools",
                icon: Code2,
              },
              {
                step: "02",
                title: "Open PR",
                desc: "Push changes and create a pull request as usual",
                icon: GitPullRequest,
              },
              {
                step: "03",
                title: "Drift Check",
                desc: "DRIFT CI runs automatically, flags any design drift",
                icon: ShieldCheck,
              },
              {
                step: "04",
                title: "Drift Blocked",
                desc: "Drifted PRs are blocked with AI-suggested fixes inline",
                icon: AlertCircle,
              },
            ].map((step, idx) => (
              <div key={step.step} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{
                      background: DRIFT_PURPLE_LIGHT,
                      color: DRIFT_PURPLE,
                    }}
                  >
                    {step.step}
                  </div>
                  {idx < 3 && (
                    <div
                      className="w-px h-6 mt-1"
                      style={{ background: DRIFT_PURPLE_BORDER }}
                    />
                  )}
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-2">
                    <step.icon className="h-3.5 w-3.5 text-theme-m" />
                    <span className="text-xs font-semibold text-theme">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-theme-m mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center convergence */}
        <div className="flex items-center justify-center mt-8 gap-4">
          <div
            className="h-px flex-1 max-w-[120px]"
            style={{
              background: `linear-gradient(to right, transparent, ${DRIFT_PURPLE_BORDER})`,
            }}
          />
          <div
            className="rounded-full px-4 py-2 flex items-center gap-2 text-xs font-semibold border"
            style={{
              background: DRIFT_PURPLE_LIGHT,
              color: DRIFT_PURPLE,
              borderColor: DRIFT_PURPLE_BORDER,
            }}
          >
            <ArrowLeftRight className="h-4 w-4" />
            Always in Sync
          </div>
          <div
            className="h-px flex-1 max-w-[120px]"
            style={{
              background: `linear-gradient(to left, transparent, ${DRIFT_PURPLE_BORDER})`,
            }}
          />
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════
          9. WAITLIST CTA
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden px-4 py-24 sm:py-32">
        {/* Full purple gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${DRIFT_PURPLE}18 0%, ${DRIFT_PURPLE}08 50%, transparent 100%)`,
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "var(--dot-grid)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        {/* Purple glow orb */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: DRIFT_PURPLE }}
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto max-w-[640px] text-center">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: DRIFT_PURPLE_LIGHT }}
          >
            <RefreshCw
              className="h-8 w-8"
              style={{ color: DRIFT_PURPLE }}
            />
          </div>

          <h2 className="text-heading-1 text-theme">
            Stop shipping{" "}
            <span style={{ color: DRIFT_PURPLE }}>drifted designs</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-[480px] mx-auto">
            Subscribe to DRIFT as a Voatomy add-on. Use the same checkout as every other
            product—Pro or Business, seats, 14-day trial, then pay on-site.
          </p>

          <div className="mx-auto mt-8 flex max-w-md flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button size="lg" className="w-full gap-2 text-white sm:w-auto" style={{ background: DRIFT_PURPLE }} asChild>
              <Link href={buildProductCheckoutUrl({ product: "drift", plan: "pro" })}>
                Start 14-day trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
              <Link href={buildProductCheckoutUrl({ product: "drift", plan: "business" })}>Business checkout</Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-theme-m">
            <span className="flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5" style={{ color: DRIFT_PURPLE }} />
              14-day trial included
            </span>
            <span className="text-theme-f">|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" style={{ color: DRIFT_PURPLE }} />
              Billed with your Voatomy plan
            </span>
            <span className="text-theme-f">|</span>
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" style={{ color: DRIFT_PURPLE }} />
              <Link href="/contact?plan=enterprise" className="hover:text-theme underline-offset-2 hover:underline">
                Enterprise
              </Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

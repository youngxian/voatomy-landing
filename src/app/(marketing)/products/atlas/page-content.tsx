"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Users,
  BarChart3,
  Bug,
  Palette,
  Target,
  GitBranch,
  Zap,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Star,
  Sparkles,
  Send,
  Layers,
  LayoutGrid,
  Database,
  Cpu,
  Gauge,
  Activity,
  Shield,
  FileCode2,
  Calendar,
  Clock,
} from "lucide-react";
import { AtlasIllustration } from "@/components/illustrations/product-illustrations";
import { BrandIcon } from "@/components/icons/brand-icons";
import { usePricing } from "@/hooks/use-pricing";
import { buildProductCheckoutUrl } from "@/lib/product-purchase";
import { ProductHeroAtmosphere } from "@/components/marketing/product-hero-atmosphere";
import { productBrand } from "@/lib/product-brand";

/* ─────────────────── Constants ─────────────────── */

const ATLAS_ORANGE = productBrand.atlas.accent;
const ATLAS_TEAL = productBrand.atlas.support;

const SIGNALS = [
  { icon: Brain, label: "Code Complexity", desc: "Repo-aware story sizing from AST analysis", delay: 0 },
  { icon: Users, label: "Team Capacity", desc: "Velocity, PTO, on-call & focus time", delay: 80 },
  { icon: Target, label: "Customer Demand", desc: "Support tickets, NPS, sales objections", delay: 160 },
  { icon: Bug, label: "Tech Debt", desc: "Hotspot detection across the codebase", delay: 240 },
  { icon: Palette, label: "Design Scope", desc: "Figma frame count & component complexity", delay: 320 },
  { icon: BarChart3, label: "Business Priority", desc: "Revenue weighting & OKR alignment", delay: 400 },
];

const STEPS = [
  { num: "01", title: "Connect", desc: "Link GitHub, Jira, Linear, and Figma in under 2 minutes.", icon: GitBranch },
  { num: "02", title: "Plan", desc: "ATLAS analyzes 6 signals and generates a confidence-scored sprint plan.", icon: Brain },
  { num: "03", title: "Ship", desc: "Your team executes with clear priorities and realistic commitments.", icon: Zap },
  { num: "04", title: "Learn", desc: "Post-sprint retro data feeds the model for ever-improving accuracy.", icon: TrendingUp },
];

const OLD_WAY = [
  "2-hour planning meetings",
  "Gut-feel estimates",
  "Scope creep every sprint",
  "Missed deadlines",
  "No data on accuracy",
];

const ATLAS_WAY = [
  "20-minute AI-driven plans",
  "Data-backed confidence scores",
  "Right-sized sprints every time",
  "Predictable delivery cadence",
  "87% estimation accuracy",
];

const INTEGRATIONS = [
  { name: "GitHub", icon: GitBranch, color: "#8b5cf6" },
  { name: "Jira", icon: LayoutGrid, color: "#0052CC" },
  { name: "Linear", icon: Layers, color: "#5E6AD2" },
  { name: "Figma", icon: Palette, color: "#F24E1E" },
];

const TESTIMONIALS = [
  {
    quote: "ATLAS cut our sprint planning from 2 hours to 20 minutes. The confidence scores let us commit to deadlines we actually hit.",
    name: "Sarah Chen",
    role: "Engineering Manager, Raycast",
    avatar: "SC",
  },
  {
    quote: "We stopped over-committing the moment ATLAS started factoring in our tech debt. Game changer for a team of 12.",
    name: "Marcus Rivera",
    role: "Tech Lead, Vercel",
    avatar: "MR",
  },
  {
    quote: "The integration with Figma means design scope is finally part of the conversation at planning time. No more surprises mid-sprint.",
    name: "Aisha Patel",
    role: "Product Manager, Loom",
    avatar: "AP",
  },
];

function useAtlasPricingTiers() {
  const { tiers } = usePricing();
  return tiers
    .filter((t) => t.name !== "Enterprise")
    .map((t) => ({
      name: t.name === "Starter" ? "Free" : t.name,
      price: t.monthlyPrice <= 0 ? "$0" : `$${t.monthlyPrice}`,
      period: t.monthlyPrice <= 0 ? "forever" : t.period || "/user/mo",
      desc: t.description,
      features: t.features.map((f) => f.text),
      cta: t.cta,
      highlighted: t.popular,
    }));
}

/* ─────────────────── Scroll Animation Hook ─────────────────── */

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);
}

/* ─────────────────── Animated Counter ─────────────────── */

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─────────────────── Mock Dashboard Sprint Row ─────────────────── */

function SprintRow({ title, points, confidence, status, delay }: { title: string; points: number; confidence: number; status: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const confidenceColor = confidence >= 85 ? ATLAS_TEAL : confidence >= 70 ? ATLAS_ORANGE : "#ef4444";

  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_60px_80px_90px] items-center gap-3 rounded-lg border border-theme px-4 py-3 transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
      )}
    >
      <span className="text-sm text-theme truncate">{title}</span>
      <span className="text-sm text-theme-s text-center">{points}pt</span>
      <div className="flex items-center gap-1.5 justify-center">
        <div className="h-1.5 w-12 rounded-full bg-theme-subtle overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${confidence}%`, backgroundColor: confidenceColor, transitionDelay: `${delay + 300}ms` }}
          />
        </div>
        <span className="text-xs font-medium" style={{ color: confidenceColor }}>
          {confidence}%
        </span>
      </div>
      <Chip dotColor={status === "Ready" ? ATLAS_TEAL : status === "Review" ? ATLAS_ORANGE : "#a1a3a7"} className="text-xs justify-center">
        {status}
      </Chip>
    </div>
  );
}

/* ─────────────────── AI Workflow Pipeline Section ─────────────────── */

const PIPELINE_STAGES = [
  {
    id: "ingest",
    icon: Database,
    title: "Data Ingestion",
    desc: "Real-time sync from connected tools",
    detail: "Pulls commits, PRs, tickets, design frames, capacity & business data every 60 seconds.",
    sources: ["GitHub", "Jira", "Linear", "Figma", "Calendar", "CRM"],
    color: "#6366f1",
  },
  {
    id: "extract",
    icon: FileCode2,
    title: "Feature Extraction",
    desc: "AST parsing & metric derivation",
    detail: "Parses code ASTs for complexity, derives file-change heat maps, and normalizes ticket metadata.",
    sources: ["Cyclomatic complexity", "Change frequency", "Coupling score", "PR review time"],
    color: "#8b5cf6",
  },
  {
    id: "analyze",
    icon: Cpu,
    title: "Signal Analysis",
    desc: "Six-signal fusion model",
    detail: "Proprietary multi-signal model weighs code, capacity, demand, debt, design & priority in parallel.",
    sources: ["Code signal", "Capacity signal", "Demand signal", "Debt signal", "Design signal", "Priority signal"],
    color: ATLAS_ORANGE,
  },
  {
    id: "score",
    icon: Gauge,
    title: "Confidence Scoring",
    desc: "Per-ticket & sprint-level scores",
    detail: "Monte-Carlo simulation with 10 000 iterations produces confidence intervals for every story.",
    sources: ["P10 estimate", "P50 estimate", "P90 estimate", "Sprint fit %"],
    color: "#f59e0b",
  },
  {
    id: "optimize",
    icon: Activity,
    title: "Sprint Optimization",
    desc: "Constraint-aware plan generation",
    detail: "Integer-programming optimizer respects capacity, dependencies & business deadlines.",
    sources: ["Dependency graph", "Capacity ceiling", "Deadline constraints", "Priority ranking"],
    color: "#10b981",
  },
  {
    id: "deliver",
    icon: Shield,
    title: "Delivery & Learn",
    desc: "Continuous accuracy feedback loop",
    detail: "Post-sprint retro data auto-tunes weights so every plan is better than the last.",
    sources: ["Accuracy delta", "Velocity trend", "Scope creep %", "Model retrain"],
    color: ATLAS_TEAL,
  },
];

function AIWorkflowSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [animPhase, setAnimPhase] = useState<"idle" | "processing" | "done">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for triggering animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimPhase("processing");
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance pipeline stages
  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => {
        const next = (prev + 1) % PIPELINE_STAGES.length;
        if (next === 0) setAnimPhase("done");
        return next;
      });
    }, 3200);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isVisible]);

  const stage = PIPELINE_STAGES[activeStage];
  const StageIcon = stage.icon;

  return (
    <Section variant="white" className="py-20 sm:py-28 overflow-hidden">
      <div ref={sectionRef} className="text-center mb-14 animate-on-scroll">
        <Chip dotColor={ATLAS_ORANGE} className="mb-4 mx-auto">
          AI Workflow
        </Chip>
        <h2 className="text-heading-1 text-theme mb-4">
          Inside the{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${ATLAS_ORANGE}, #ff9a5c)` }}>
            intelligence engine
          </span>
        </h2>
        <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
          Follow your data through ATLAS&apos;s six-stage AI pipeline — from raw signals to a confidence-scored sprint plan.
        </p>
      </div>

      {/* ── Pipeline Stages (horizontal) ── */}
      <div className="relative max-w-5xl mx-auto mb-12">
        {/* Connecting line */}
        <div className="hidden lg:block absolute top-[28px] left-[8%] right-[8%] h-0.5 bg-theme-subtle z-0">
          <div
            className="h-full transition-all duration-700 ease-out rounded-full"
            style={{
              width: `${(activeStage / (PIPELINE_STAGES.length - 1)) * 100}%`,
              background: `linear-gradient(90deg, #6366f1, ${ATLAS_ORANGE}, ${ATLAS_TEAL})`,
            }}
          />
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {PIPELINE_STAGES.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === activeStage;
            const isPast = i < activeStage;
            return (
              <button
                key={s.id}
                onClick={() => { setActiveStage(i); setIsAutoPlaying(false); }}
                className={cn(
                  "relative z-10 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 group cursor-pointer",
                  isActive ? "scale-105" : "hover:bg-theme-subtle/50",
                )}
              >
                <div
                  className={cn(
                    "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                    isActive ? "shadow-lg scale-110" : isPast ? "opacity-80" : "opacity-50",
                  )}
                  style={{
                    borderColor: isActive ? s.color : isPast ? `${s.color}60` : "transparent",
                    backgroundColor: isActive ? `${s.color}20` : isPast ? `${s.color}10` : "rgba(128,128,128,0.08)",
                    boxShadow: isActive ? `0 0 24px ${s.color}30` : "none",
                  }}
                >
                  <Icon
                    className="h-6 w-6 transition-colors duration-300"
                    style={{ color: isActive || isPast ? s.color : "rgba(128,128,128,0.4)" }}
                  />
                </div>
                <span
                  className={cn(
                    "text-[11px] font-semibold text-center leading-tight transition-colors duration-300",
                    isActive ? "text-theme" : isPast ? "text-theme-s" : "text-theme-m",
                  )}
                >
                  {s.title}
                </span>
                {/* Active dot pulse */}
                {isActive && (
                  <span
                    className="absolute -top-1 -right-1 h-3 w-3 rounded-full animate-ping"
                    style={{ backgroundColor: s.color, opacity: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Active Stage Detail Card ── */}
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-2xl border p-1 shadow-xl transition-all duration-500"
          style={{ borderColor: `${stage.color}30`, boxShadow: `0 4px 40px ${stage.color}10` }}
        >
          <div className="rounded-xl bg-theme-card">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-0">
              {/* Left — Stage info */}
              <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-theme">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stage.color}15` }}
                  >
                    <StageIcon className="h-5 w-5" style={{ color: stage.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest text-theme-m uppercase">
                      Stage {String(activeStage + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-heading-3 text-theme">{stage.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-theme-s leading-relaxed mb-5">{stage.detail}</p>

                {/* Source tags */}
                <div className="flex flex-wrap gap-1.5">
                  {stage.sources.map((src, j) => (
                    <span
                      key={src}
                      className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border transition-all duration-300"
                      style={{
                        borderColor: `${stage.color}30`,
                        color: stage.color,
                        backgroundColor: `${stage.color}08`,
                        animationDelay: `${j * 80}ms`,
                      }}
                    >
                      {src}
                    </span>
                  ))}
                </div>

                {/* Auto-play toggle */}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="mt-6 flex items-center gap-2 text-xs text-theme-m hover:text-theme-s transition-colors"
                >
                  <div className={cn("h-2 w-2 rounded-full", isAutoPlaying ? "animate-pulse bg-green-400" : "bg-gray-400")} />
                  {isAutoPlaying ? "Auto-playing" : "Paused"} — click stages to explore
                </button>
              </div>

              {/* Right — Animated visualization */}
              <div className="p-6 lg:p-8 flex flex-col justify-center min-h-[320px]">
                {activeStage === 0 && <IngestVisual color={stage.color} />}
                {activeStage === 1 && <ExtractVisual color={stage.color} />}
                {activeStage === 2 && <AnalyzeVisual />}
                {activeStage === 3 && <ScoreVisual color={stage.color} />}
                {activeStage === 4 && <OptimizeVisual />}
                {activeStage === 5 && <DeliverVisual color={stage.color} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom stats bar ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
        {[
          { icon: Clock, label: "Pipeline latency", value: "< 4 sec" },
          { icon: Database, label: "Data points analyzed", value: "12 000+" },
          { icon: Activity, label: "Simulation iterations", value: "10 000" },
          { icon: Calendar, label: "Accuracy improvement", value: "+22% avg" },
        ].map((stat) => {
          const SIcon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-theme bg-theme-card p-4 animate-on-scroll"
            >
              <div className="h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${ATLAS_ORANGE}12` }}>
                <SIcon className="h-4 w-4" style={{ color: ATLAS_ORANGE }} />
              </div>
              <div>
                <div className="text-sm font-bold text-theme">{stat.value}</div>
                <div className="text-[11px] text-theme-m">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ──── Stage Visual: Data Ingestion ──── */
function IngestVisual({ color }: { color: string }) {
  const tools = [
    { name: "GitHub", x: 10, y: 15 },
    { name: "Jira", x: 10, y: 40 },
    { name: "Linear", x: 10, y: 65 },
    { name: "Figma", x: 10, y: 90 },
    { name: "Calendar", x: 75, y: 15 },
    { name: "CRM", x: 75, y: 40 },
  ];
  return (
    <div className="relative h-64">
      {/* Central hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="h-16 w-16 rounded-2xl flex items-center justify-center animate-pulse"
          style={{ backgroundColor: `${color}20`, border: `2px solid ${color}40` }}
        >
          <Database className="h-7 w-7" style={{ color }} />
        </div>
        <div className="text-[10px] font-bold text-center mt-1.5 text-theme-m">INGEST</div>
      </div>
      {/* Orbiting sources */}
      {tools.map((tool, i) => (
        <div
          key={tool.name}
          className="absolute flex items-center gap-1.5"
          style={{
            left: `${tool.x}%`,
            top: `${tool.y}%`,
            animation: `atlas-float ${2.5 + i * 0.3}s ease-in-out infinite alternate`,
          }}
        >
          <div className="h-8 w-8 rounded-lg border border-theme bg-theme-card flex items-center justify-center">
            <GitBranch className="h-3.5 w-3.5 text-theme-m" />
          </div>
          <span className="text-[11px] font-medium text-theme-s">{tool.name}</span>
        </div>
      ))}
      {/* Animated connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 260">
        {[
          { x1: 80, y1: 50, x2: 180, y2: 125 },
          { x1: 80, y1: 110, x2: 180, y2: 125 },
          { x1: 80, y1: 175, x2: 180, y2: 130 },
          { x1: 80, y1: 235, x2: 180, y2: 135 },
          { x1: 330, y1: 50, x2: 225, y2: 125 },
          { x1: 330, y1: 110, x2: 225, y2: 125 },
        ].map((line, i) => (
          <g key={i}>
            <line
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke={`${color}30`} strokeWidth="1.5" strokeDasharray="4 4"
            />
            <circle r="3" fill={color} opacity="0.7">
              <animateMotion
                dur={`${1.5 + i * 0.2}s`}
                repeatCount="indefinite"
                path={`M${line.x1},${line.y1} L${line.x2},${line.y2}`}
              />
            </circle>
          </g>
        ))}
      </svg>
      <style jsx>{`
        @keyframes atlas-float {
          from { transform: translateY(0); }
          to { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

/* ──── Stage Visual: Feature Extraction ──── */
function ExtractVisual({ color }: { color: string }) {
  const metrics = [
    { label: "Cyclomatic Complexity", value: 14, max: 25, bar: 56 },
    { label: "Change Frequency", value: 87, max: 100, bar: 87 },
    { label: "Coupling Score", value: 0.42, max: 1, bar: 42 },
    { label: "PR Review Time", value: 3.2, max: 8, bar: 40 },
    { label: "File Heat Score", value: 92, max: 100, bar: 92 },
    { label: "Test Coverage", value: 78, max: 100, bar: 78 },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Parsing AST nodes… extracting features</span>
      </div>
      {metrics.map((m, i) => (
        <div key={m.label} className="flex items-center gap-3">
          <span className="text-[11px] text-theme-m w-36 truncate">{m.label}</span>
          <div className="flex-1 h-2 rounded-full bg-theme-subtle overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${m.bar}%`,
                background: `linear-gradient(90deg, ${color}, ${color}80)`,
                animation: `atlas-bar-grow 1.2s ease-out ${i * 0.15}s both`,
              }}
            />
          </div>
          <span className="text-[11px] font-mono text-theme-s w-10 text-right">{m.value}</span>
        </div>
      ))}
      <style jsx>{`
        @keyframes atlas-bar-grow {
          from { width: 0%; }
        }
      `}</style>
    </div>
  );
}

/* ──── Stage Visual: Signal Analysis (Radar) ──── */
function AnalyzeVisual() {
  const signals = [
    { name: "Code", value: 0.85, angle: 0 },
    { name: "Capacity", value: 0.72, angle: 60 },
    { name: "Demand", value: 0.91, angle: 120 },
    { name: "Debt", value: 0.44, angle: 180 },
    { name: "Design", value: 0.67, angle: 240 },
    { name: "Priority", value: 0.88, angle: 300 },
  ];

  const cx = 150, cy = 130, r = 90;
  const points = signals.map((s) => {
    const rad = ((s.angle - 90) * Math.PI) / 180;
    return {
      ...s,
      px: cx + r * s.value * Math.cos(rad),
      py: cy + r * s.value * Math.sin(rad),
      lx: cx + (r + 22) * Math.cos(rad),
      ly: cy + (r + 22) * Math.sin(rad),
    };
  });
  const polyPoints = points.map((p) => `${p.px},${p.py}`).join(" ");

  return (
    <div className="flex justify-center">
      <svg width="300" height="280" viewBox="0 0 300 280" className="overflow-visible">
        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map((s) => (
          <polygon
            key={s}
            points={signals
              .map((sig) => {
                const rad = ((sig.angle - 90) * Math.PI) / 180;
                return `${cx + r * s * Math.cos(rad)},${cy + r * s * Math.sin(rad)}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(128,128,128,0.15)"
            strokeWidth="1"
          />
        ))}
        {/* Axes */}
        {points.map((p) => (
          <line
            key={p.name}
            x1={cx} y1={cy}
            x2={cx + r * Math.cos(((p.angle - 90) * Math.PI) / 180)}
            y2={cy + r * Math.sin(((p.angle - 90) * Math.PI) / 180)}
            stroke="rgba(128,128,128,0.15)" strokeWidth="1"
          />
        ))}
        {/* Data polygon */}
        <polygon
          points={polyPoints}
          fill={`${ATLAS_ORANGE}20`}
          stroke={ATLAS_ORANGE}
          strokeWidth="2"
          style={{ animation: "atlas-radar-draw 1.5s ease-out" }}
        />
        {/* Data points */}
        {points.map((p, i) => (
          <g key={p.name}>
            <circle cx={p.px} cy={p.py} r="4" fill={ATLAS_ORANGE} stroke="white" strokeWidth="1.5">
              <animate attributeName="r" values="3;5;3" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <text x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle" className="text-[10px] fill-current text-theme-m font-medium">
              {p.name}
            </text>
          </g>
        ))}
        {/* Center label */}
        <text x={cx} y={cy - 6} textAnchor="middle" className="text-[18px] fill-current text-theme font-bold">
          6-Signal
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" className="text-[10px] fill-current text-theme-m">
          Fusion Model
        </text>
        <style>{`
          @keyframes atlas-radar-draw {
            from { opacity: 0; transform: scale(0.3); transform-origin: ${cx}px ${cy}px; }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </svg>
    </div>
  );
}

/* ──── Stage Visual: Confidence Scoring ──── */
function ScoreVisual({ color }: { color: string }) {
  const tickets = [
    { title: "Auth migration", p10: 5, p50: 8, p90: 13, confidence: 92 },
    { title: "Dashboard v2", p10: 8, p50: 13, p90: 21, confidence: 71 },
    { title: "Rate limiter", p10: 3, p50: 5, p90: 8, confidence: 95 },
    { title: "Onboarding flow", p10: 5, p50: 8, p90: 13, confidence: 78 },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        <span className="text-xs font-mono text-theme-m">Monte-Carlo simulation (10 000 iterations)</span>
      </div>
      <div className="rounded-lg border border-theme overflow-hidden">
        <div className="grid grid-cols-[1fr_50px_50px_50px_70px] gap-2 px-3 py-2 border-b border-theme bg-theme-subtle/30 text-[10px] font-bold text-theme-m uppercase tracking-wider">
          <span>Ticket</span><span className="text-center">P10</span><span className="text-center">P50</span><span className="text-center">P90</span><span className="text-center">Confidence</span>
        </div>
        {tickets.map((t, i) => {
          const confColor = t.confidence >= 90 ? ATLAS_TEAL : t.confidence >= 75 ? ATLAS_ORANGE : "#ef4444";
          return (
            <div
              key={t.title}
              className="grid grid-cols-[1fr_50px_50px_50px_70px] gap-2 px-3 py-2.5 border-b last:border-0 border-theme items-center"
              style={{ animation: `atlas-row-fade 0.5s ease-out ${i * 0.1}s both` }}
            >
              <span className="text-xs text-theme truncate">{t.title}</span>
              <span className="text-xs text-theme-m text-center font-mono">{t.p10}</span>
              <span className="text-xs text-theme font-semibold text-center font-mono">{t.p50}</span>
              <span className="text-xs text-theme-m text-center font-mono">{t.p90}</span>
              <div className="flex items-center justify-center gap-1">
                <div className="h-1.5 w-8 rounded-full bg-theme-subtle overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${t.confidence}%`, backgroundColor: confColor }} />
                </div>
                <span className="text-[11px] font-bold" style={{ color: confColor }}>{t.confidence}%</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Distribution curve */}
      <div className="mt-3 p-3 rounded-lg border border-theme">
        <div className="text-[10px] text-theme-m mb-2 font-semibold">Sprint-Level Confidence Distribution</div>
        <svg viewBox="0 0 300 60" className="w-full h-12">
          <defs>
            <linearGradient id="atlas-bell" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path d="M0,55 C50,55 80,50 110,40 C130,33 140,15 150,5 C160,15 170,33 190,40 C220,50 250,55 300,55 Z" fill="url(#atlas-bell)" stroke={color} strokeWidth="1.5" />
          <line x1="150" y1="0" x2="150" y2="55" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
          <text x="150" y="55" textAnchor="middle" className="text-[9px] fill-current text-theme-m">87% conf.</text>
        </svg>
      </div>
      <style jsx>{`
        @keyframes atlas-row-fade {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ──── Stage Visual: Sprint Optimization ──── */
function OptimizeVisual() {
  const items = [
    { name: "Auth migration", pts: 8, dep: null, slot: 1 },
    { name: "Rate limiter", pts: 5, dep: null, slot: 1 },
    { name: "Dashboard v2", pts: 13, dep: "Auth migration", slot: 2 },
    { name: "Onboarding v2", pts: 8, dep: "Dashboard v2", slot: 3 },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Constraint optimizer running…</span>
      </div>
      {/* Gantt-like timeline */}
      <div className="rounded-lg border border-theme p-4">
        <div className="flex items-center justify-between text-[10px] text-theme-m mb-3 font-semibold">
          <span>Week 1</span><span>Week 2</span>
        </div>
        <div className="space-y-2">
          {items.map((item, i) => {
            const widthPct = (item.pts / 13) * 50;
            const leftPct = (item.slot - 1) * 33;
            return (
              <div key={item.name} className="relative h-8 rounded-md bg-theme-subtle/30">
                <div
                  className="absolute top-0 h-full rounded-md flex items-center px-2"
                  style={{
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    minWidth: "80px",
                    background: `linear-gradient(90deg, ${ATLAS_ORANGE}30, ${ATLAS_ORANGE}15)`,
                    borderLeft: `3px solid ${ATLAS_ORANGE}`,
                    animation: `atlas-gantt-slide 0.8s ease-out ${i * 0.15}s both`,
                  }}
                >
                  <span className="text-[10px] text-theme font-medium truncate">{item.name}</span>
                  <span className="text-[9px] text-theme-m ml-auto pl-2 flex-shrink-0">{item.pts}pt</span>
                </div>
              </div>
            );
          })}
        </div>
        {/* Capacity indicator */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-theme-subtle overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "89%", background: `linear-gradient(90deg, ${ATLAS_ORANGE}, ${ATLAS_TEAL})` }} />
          </div>
          <span className="text-[11px] text-theme-s font-semibold">34/38 pts (89%)</span>
        </div>
        <div className="text-[10px] text-theme-m mt-1">Capacity utilization — <span style={{ color: ATLAS_TEAL }}>healthy range</span></div>
      </div>
      {/* Dependency arrows */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Dependencies resolved", value: "3", color: ATLAS_TEAL },
          { label: "Constraints satisfied", value: "8/8", color: ATLAS_ORANGE },
          { label: "Deadline conflicts", value: "0", color: ATLAS_TEAL },
        ].map((c) => (
          <div key={c.label} className="rounded-lg border border-theme p-2.5 text-center">
            <div className="text-sm font-bold" style={{ color: c.color }}>{c.value}</div>
            <div className="text-[10px] text-theme-m">{c.label}</div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes atlas-gantt-slide {
          from { opacity: 0; transform: scaleX(0); transform-origin: left; }
          to { opacity: 1; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

/* ──── Stage Visual: Delivery & Learn ──── */
function DeliverVisual({ color }: { color: string }) {
  const sprints = [
    { id: "S20", accuracy: 68, improved: false },
    { id: "S21", accuracy: 74, improved: true },
    { id: "S22", accuracy: 79, improved: true },
    { id: "S23", accuracy: 85, improved: true },
    { id: "S24", accuracy: 87, improved: true },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        <span className="text-xs font-mono text-theme-m">Feedback loop active — model retraining…</span>
      </div>
      {/* Accuracy trend */}
      <div className="rounded-lg border border-theme p-4">
        <div className="text-[11px] font-semibold text-theme mb-3">Accuracy Improvement Over Sprints</div>
        <div className="flex items-end gap-3 h-32">
          {sprints.map((s, i) => (
            <div key={s.id} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[11px] font-bold" style={{ color: s.accuracy >= 80 ? ATLAS_TEAL : ATLAS_ORANGE }}>
                {s.accuracy}%
              </span>
              <div className="w-full rounded-t-md bg-theme-subtle overflow-hidden" style={{ height: "100%" }}>
                <div
                  className="w-full rounded-t-md"
                  style={{
                    height: `${s.accuracy}%`,
                    marginTop: `${100 - s.accuracy}%`,
                    background: s.accuracy >= 80 ? `linear-gradient(180deg, ${ATLAS_TEAL}, ${color}50)` : `linear-gradient(180deg, ${ATLAS_ORANGE}, ${ATLAS_ORANGE}40)`,
                    animation: `atlas-bar-grow 1s ease-out ${i * 0.15}s both`,
                  }}
                />
              </div>
              <span className="text-[10px] text-theme-m font-mono">{s.id}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Feedback loop diagram */}
      <div className="flex items-center gap-2 justify-center py-2">
        {["Plan", "Execute", "Measure", "Retrain"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className="rounded-lg px-3 py-1.5 text-[11px] font-semibold border"
              style={{
                borderColor: `${color}40`,
                color,
                backgroundColor: `${color}10`,
              }}
            >
              {step}
            </div>
            {i < 3 && (
              <ArrowRight className="h-3 w-3 text-theme-m" />
            )}
          </div>
        ))}
      </div>
      <div className="text-center text-[11px] text-theme-m">
        Every sprint makes the next plan <span className="font-semibold" style={{ color }}>more accurate</span>
      </div>
      <style jsx>{`
        @keyframes atlas-bar-grow {
          from { height: 0%; margin-top: 100%; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────── Main Page Component ─────────────────── */

export default function AtlasProductPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [activeMetric, setActiveMetric] = useState(0);
  const PRICING_TIERS = useAtlasPricingTiers();

  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* ═══════════════ 1. HERO ═══════════════ */}
      <Section variant="coral" container={false} className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
        <ProductHeroAtmosphere variant="atlas" />
        {/* Premium Background Effects */}
        <div
          className="product-hero-gradient z-[1]"
          style={
            {
              "--hero-gradient": productBrand.atlas.heroGradient,
              "--hero-gradient-secondary": productBrand.atlas.heroGradientSecondary,
            } as React.CSSProperties
          }
        />
        <div className="pointer-events-none absolute inset-0 z-[1] fine-grid" />
        <div className="pointer-events-none absolute inset-0 z-[1] noise-overlay" />

        <div className="relative z-[3] mx-auto w-full max-w-container px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Copy */}
            <div className="flex flex-col items-start gap-6">
              <div className={cn("transition-all duration-700", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
                <div className="flex items-center gap-3 mb-4">
                  <Chip dotColor={ATLAS_ORANGE} className="backdrop-blur-sm">
                    Available Now
                  </Chip>
                  <span className="enterprise-badge">
                    <Shield className="h-3 w-3" />
                    Enterprise Ready
                  </span>
                </div>
              </div>

              <h1
                className={cn(
                  "text-display-2 lg:text-display-1 text-theme transition-all duration-700 delay-100",
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
              >
                Sprint planning,{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${ATLAS_ORANGE}, #ff9a5c, ${ATLAS_ORANGE})`, backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>
                  reimagined
                </span>
              </h1>

              <p
                className={cn(
                  "text-body-lg text-theme-s max-w-lg transition-all duration-700 delay-200",
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
              >
                ATLAS analyzes code complexity, team capacity, and business priority to generate confidence-scored sprint plans in minutes, not hours.
              </p>

              <div
                className={cn(
                  "flex flex-col sm:flex-row gap-3 w-full sm:w-auto transition-all duration-700 delay-300",
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
              >
                <Button size="lg" asChild>
                  <Link href={buildProductCheckoutUrl({ product: "atlas", plan: "pro" })}>
                    Start 14-day trial <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>

              <div
                className={cn(
                  "flex items-center gap-6 pt-2 text-sm text-theme-m transition-all duration-700 delay-[400ms]",
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
              >
                <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ATLAS_ORANGE }} />EMs</span>
                <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ATLAS_ORANGE, opacity: 0.7 }} />Tech Leads</span>
                <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ATLAS_ORANGE, opacity: 0.4 }} />PMs</span>
              </div>
            </div>

            {/* Right - Mock Dashboard */}
            <div
              className={cn(
                "relative transition-all duration-1000 delay-500",
                heroLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95",
              )}
            >
              <div className="dashboard-mock premium-shadow rounded-2xl bg-theme-s p-1">
                <div className="rounded-xl bg-theme-card p-5 space-y-4">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ATLAS_ORANGE}20` }}>
                        <Sparkles className="h-4 w-4" style={{ color: ATLAS_ORANGE }} />
                      </div>
                      <span className="text-sm font-semibold text-theme">Sprint 24 Plan</span>
                    </div>
                    <Chip dotColor={ATLAS_TEAL} className="text-xs">AI Generated</Chip>
                  </div>

                  {/* Mini Metric Bar */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Confidence", value: "87%", color: ATLAS_TEAL },
                      { label: "Velocity Match", value: "94%", color: ATLAS_ORANGE },
                      { label: "Risk Score", value: "Low", color: ATLAS_TEAL },
                    ].map((m, i) => (
                      <div
                        key={m.label}
                        className={cn(
                          "rounded-lg border border-theme p-2.5 text-center transition-all duration-300",
                          activeMetric === i && "border-theme-h",
                        )}
                      >
                        <div className="text-xs text-theme-m mb-0.5">{m.label}</div>
                        <div className="text-sm font-bold" style={{ color: m.color }}>
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sprint Rows */}
                  <div className="space-y-2">
                    <SprintRow title="Auth service migration" points={8} confidence={92} status="Ready" delay={600} />
                    <SprintRow title="Dashboard redesign" points={13} confidence={78} status="Review" delay={800} />
                    <SprintRow title="API rate limiting" points={5} confidence={95} status="Ready" delay={1000} />
                    <SprintRow title="Onboarding flow v2" points={8} confidence={71} status="Draft" delay={1200} />
                  </div>

                  {/* Bottom bar */}
                  <div className="flex items-center justify-between text-xs text-theme-m pt-1 border-t border-theme">
                    <span>Total: 34 points / 38 capacity</span>
                    <span style={{ color: ATLAS_TEAL }}>Healthy Sprint Load</span>
                  </div>
                </div>
              </div>
              {/* Floating accent */}
              <div
                className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full opacity-30 blur-2xl animate-glow-pulse"
                style={{ background: ATLAS_ORANGE }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 2. SIX SIGNALS ═══════════════ */}
      <Section variant="coral" withGrid withNoise className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={ATLAS_ORANGE} className="mb-4 mx-auto backdrop-blur-sm">
            The Intelligence Layer
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            6 signals.{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${ATLAS_ORANGE}, #ff9a5c)` }}>One plan.</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            ATLAS converges six real-time data streams into a single, confidence-scored sprint plan that your team can trust.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SIGNALS.map((signal, i) => {
            const Icon = signal.icon;
            return (
              <Card
                key={signal.label}
                variant="enterprise"
                className={cn("animate-on-scroll group relative overflow-hidden", `stagger-${i + 1}`)}
              >
                <div className="relative z-10">
                  <div
                    className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${ATLAS_ORANGE}15` }}
                  >
                    <Icon className="h-5 w-5 transition-colors duration-300" style={{ color: ATLAS_ORANGE }} />
                  </div>
                  <h3 className="text-heading-3 text-theme mb-1.5">{signal.label}</h3>
                  <p className="text-sm text-theme-s leading-relaxed">{signal.desc}</p>
                </div>
                <div
                  className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 blur-3xl"
                  style={{ background: ATLAS_ORANGE }}
                />
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════ 3. AI WORKFLOW PIPELINE ═══════════════ */}
      <AIWorkflowSection />

      {/* ═══════════════ 4. HOW IT WORKS ═══════════════ */}
      <Section id="how-it-works" variant="amber" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={ATLAS_ORANGE} className="mb-4 mx-auto">
            How It Works
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">From repo to roadmap in 4 steps</h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Connect your tools, and ATLAS does the heavy lifting. No spreadsheets. No guesswork.
          </p>
        </div>

        <div className="relative grid md:grid-cols-4 gap-6">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px border-t border-dashed border-theme-h z-0" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className={cn("animate-on-scroll relative z-10 text-center", `stagger-${i + 1}`)}>
                <div className="mx-auto mb-5 flex h-[104px] w-[104px] flex-col items-center justify-center rounded-2xl border border-theme bg-theme-card transition-all duration-300 hover:border-theme-h hover:shadow-lg">
                  <span className="text-xs font-bold tracking-widest text-theme-m mb-1">{step.num}</span>
                  <Icon className="h-6 w-6" style={{ color: ATLAS_ORANGE }} />
                </div>
                <h3 className="text-heading-3 text-theme mb-1.5">{step.title}</h3>
                <p className="text-sm text-theme-s leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════ 4. BEFORE / AFTER ═══════════════ */}
      <Section variant="rose" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="text-heading-1 text-theme mb-4">The old way is broken</h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Stop wasting hours debating story points. Let data decide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 animate-on-scroll">
          {/* Old Way */}
          <Card variant="dark" className="border-red-500/20 hover:border-red-500/30">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <XCircle className="h-4 w-4 text-red-400" />
              </div>
              <h3 className="text-heading-3 text-theme">Without ATLAS</h3>
            </div>
            <ul className="space-y-3">
              {OLD_WAY.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-theme-s">
                  <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-400/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* ATLAS Way */}
          <Card variant="dark" className="hover:shadow-lg" style={{ borderColor: `${ATLAS_ORANGE}30` }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ATLAS_ORANGE}15` }}>
                <CheckCircle2 className="h-4 w-4" style={{ color: ATLAS_ORANGE }} />
              </div>
              <h3 className="text-heading-3 text-theme">With ATLAS</h3>
            </div>
            <ul className="space-y-3">
              {ATLAS_WAY.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-theme-s">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: ATLAS_ORANGE }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* ═══════════════ 5. LIVE DASHBOARD PREVIEW ═══════════════ */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={ATLAS_ORANGE} className="mb-4 mx-auto">
            Dashboard Preview
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">Your sprint command center</h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Real-time metrics, accuracy tracking, and confidence scoring all in one view.
          </p>
        </div>

        <div className="animate-on-scroll">
          <div className="rounded-2xl border border-theme bg-theme-s p-1 shadow-2xl max-w-4xl mx-auto">
            <div className="rounded-xl bg-theme-card">
              {/* Tab Bar */}
              <div className="flex items-center gap-1 border-b border-theme px-5 pt-4 pb-0">
                {["Overview", "Sprint Plan", "Accuracy", "Signals"].map((tab, i) => (
                  <button
                    key={tab}
                    className={cn(
                      "px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors duration-200",
                      i === 0
                        ? "text-theme border-b-2"
                        : "text-theme-m hover:text-theme-s",
                    )}
                    style={i === 0 ? { borderBottomColor: ATLAS_ORANGE } : undefined}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-5 space-y-5">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Sprint Accuracy", value: "87%", change: "+3%", up: true },
                    { label: "Avg Planning Time", value: "18 min", change: "-65%", up: true },
                    { label: "Velocity Trend", value: "42 pts", change: "+8%", up: true },
                    { label: "Scope Creep", value: "4%", change: "-12%", up: true },
                  ].map((kpi) => (
                    <div key={kpi.label} className="rounded-xl border border-theme p-4">
                      <div className="text-xs text-theme-m mb-1">{kpi.label}</div>
                      <div className="text-heading-2 text-theme">{kpi.value}</div>
                      <div className="text-xs font-medium mt-1" style={{ color: ATLAS_TEAL }}>
                        {kpi.change} this quarter
                      </div>
                    </div>
                  ))}
                </div>

                {/* Accuracy Chart Mock */}
                <div className="rounded-xl border border-theme p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-theme">Estimation Accuracy Over Time</span>
                    <span className="text-xs text-theme-m">Last 8 sprints</span>
                  </div>
                  <div className="flex items-end gap-2 h-28">
                    {[62, 68, 71, 75, 79, 82, 85, 87].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] text-theme-m">{val}%</span>
                        <div
                          className="w-full rounded-t-md transition-all duration-700"
                          style={{
                            height: `${val}%`,
                            background: i === 7 ? ATLAS_ORANGE : `${ATLAS_ORANGE}40`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {Array.from({ length: 8 }, (_, i) => (
                      <span key={i} className="flex-1 text-center text-[10px] text-theme-f">
                        S{i + 17}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 6. INTEGRATIONS ═══════════════ */}
      <Section variant="violet" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={ATLAS_ORANGE} className="mb-4 mx-auto">
            Integrations
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">Plugs into your workflow</h2>
          <p className="text-body-lg text-theme-s max-w-md mx-auto">
            Connect the tools your team already uses. Set up in under 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-on-scroll">
          {INTEGRATIONS.map((integration, i) => {
            return (
              <Card
                key={integration.name}
                variant="dark"
                className={cn("text-center hover:border-theme-h group", `stagger-${i + 1}`)}
              >
                <div
                  className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${integration.color}15` }}
                >
                  <BrandIcon name={integration.name} size={24} className="opacity-80" />
                </div>
                <h3 className="text-sm font-semibold text-theme">{integration.name}</h3>
                <span className="text-xs text-theme-m mt-1 block">Connected</span>
              </Card>
            );
          })}
        </div>

        {/* Connection lines visual */}
        <div className="flex justify-center mt-8 animate-on-scroll stagger-5">
          <div className="flex items-center gap-2 rounded-full border border-theme bg-theme-card px-5 py-2.5">
            <div className="h-2 w-2 rounded-full animate-glow-pulse" style={{ backgroundColor: ATLAS_TEAL }} />
            <span className="text-sm text-theme-s">All systems synced</span>
          </div>
        </div>
      </Section>

      {/* ═══════════════ VULNERABILITY SCANNER ═══════════════ */}
      <Section variant="white" withGrid className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={ATLAS_ORANGE} className="mb-4 mx-auto backdrop-blur-sm">
            Security
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Ticket Vulnerability Scanner
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Like Snyk for your code, but for your tickets. AI-powered detection of PII, API keys, and sensitive data across
            every ticket, description, and comment — with one-click remediation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { title: "Vulnerability scanning", desc: "Every ticket, description & comment scanned automatically" },
            { title: "AI-powered classification", desc: "Full reasoning transparency — see why AI flagged each finding" },
            { title: "One-click remediation", desc: "AI actions to redact, mask, or replace sensitive data in-place" },
            { title: "Per-project toggle", desc: "Enable when you need it, disable when you don't" },
            { title: "Ownership audit trail", desc: "Track every assignee change with automatic escalation" },
            { title: "Compliance dashboard", desc: "Severity breakdown, resolution times, and trend tracking" },
          ].map((feat, i) => (
            <Card
              key={feat.title}
              variant="enterprise"
              className={cn("animate-on-scroll", `stagger-${i + 1}`)}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${ATLAS_ORANGE}15` }}
                >
                  <Shield className="h-4 w-4" style={{ color: ATLAS_ORANGE }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-theme mb-1">{feat.title}</h3>
                  <p className="text-xs text-theme-s leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 7. ACCURACY METRICS ═══════════════ */}
      <Section variant="mint" className="py-20 sm:py-28">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: 87, suffix: "%", label: "Sprint estimation accuracy", sub: "across all connected teams" },
            { value: 20, suffix: " min", label: "Average planning time", sub: "down from 2+ hours" },
            { value: 3, suffix: "x", label: "Faster sprint planning", sub: "compared to manual estimation" },
          ].map((metric, i) => (
            <div key={metric.label} className={cn("animate-on-scroll", `stagger-${i + 1}`)}>
              <div className="text-display-1 font-bold mb-2" style={{ color: ATLAS_ORANGE }}>
                <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </div>
              <div className="text-heading-3 text-theme mb-1">{metric.label}</div>
              <div className="text-sm text-theme-m">{metric.sub}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 8. TESTIMONIALS ═══════════════ */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="text-heading-1 text-theme mb-4">Loved by engineering teams</h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Teams shipping faster with data-driven sprint planning.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Card key={t.name} variant="dark" className={cn("animate-on-scroll hover:border-theme-h", `stagger-${i + 1}`)}>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-current" style={{ color: ATLAS_ORANGE }} />
                ))}
              </div>
              <p className="text-sm text-theme-s leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-theme">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(t.name)}&backgroundColor=transparent`}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full bg-brand/10"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-semibold text-theme">{t.name}</div>
                  <div className="text-xs text-theme-m">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 9. PRICING PREVIEW ═══════════════ */}
      <Section variant="coral" withGrid className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={ATLAS_ORANGE} className="mb-4 mx-auto backdrop-blur-sm">
            Pricing
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">Start free. Scale as you grow.</h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            No credit card required. Upgrade when your team is ready.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {PRICING_TIERS.map((tier, i) => (
            <Card
              key={tier.name}
              variant="enterprise"
              className={cn(
                "animate-on-scroll flex flex-col relative",
                `stagger-${i + 1}`,
                tier.highlighted && "!border-transparent",
              )}
              style={tier.highlighted ? { boxShadow: `0 0 0 1px ${ATLAS_ORANGE}, 0 8px 24px rgba(0,0,0,0.2)` } : undefined}
            >
              {tier.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-bold text-white"
                  style={{ backgroundColor: ATLAS_ORANGE }}
                >
                  Most Popular
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-heading-3 text-theme mb-1">{tier.name}</h3>
                <p className="text-xs text-theme-m">{tier.desc}</p>
              </div>
              <div className="mb-5">
                <span className="text-heading-1 text-theme">{tier.price}</span>
                <span className="text-sm text-theme-m ml-1">{tier.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-theme-s">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: ATLAS_ORANGE }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant={tier.highlighted ? "primary" : "secondary"} size="md" className="w-full" asChild>
                <Link
                  href={
                    tier.name === "Free"
                      ? "/auth/signup"
                      : tier.name === "Pro"
                        ? buildProductCheckoutUrl({ product: "atlas", plan: "pro" })
                        : buildProductCheckoutUrl({ product: "atlas", plan: "business" })
                  }
                >
                  {tier.cta}
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 animate-on-scroll stagger-4">
          <Button variant="link" asChild>
            <Link href="/pricing">
              View full pricing details <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}

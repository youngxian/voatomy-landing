"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import { buildProductCheckoutUrl } from "@/lib/product-purchase";
import { PhantomIllustration } from "@/components/illustrations/product-illustrations";
import {
  Radar,
  Ghost,
  GitBranch,
  Activity,
  DollarSign,
  Shield,
  ArrowRight,
  BarChart3,
  Code2,
  Users,
  TrendingUp,
  Zap,
  Eye,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  ArrowDownRight,
  Server,
  FileCode2,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CYAN = "#22D3EE";
const CYAN_DIM = "rgba(34,211,238,0.15)";
const CYAN_GLOW = "rgba(34,211,238,0.25)";

const HEATMAP_DATA = [
  [0.1, 0.2, 0.8, 0.3, 0.1, 0.4, 0.2, 0.1, 0.3, 0.2, 0.1, 0.5],
  [0.3, 0.9, 1.0, 0.7, 0.2, 0.1, 0.6, 0.3, 0.1, 0.4, 0.2, 0.3],
  [0.1, 0.4, 0.6, 0.2, 0.1, 0.3, 0.8, 0.9, 0.4, 0.1, 0.3, 0.1],
  [0.2, 0.1, 0.3, 0.5, 0.7, 0.2, 0.3, 0.6, 0.2, 0.3, 0.1, 0.2],
  [0.4, 0.3, 0.1, 0.2, 0.9, 0.8, 0.1, 0.2, 0.5, 0.7, 0.4, 0.1],
  [0.1, 0.2, 0.4, 0.1, 0.3, 0.5, 0.2, 0.1, 0.3, 0.9, 0.8, 0.3],
  [0.3, 0.1, 0.2, 0.3, 0.1, 0.2, 0.4, 0.3, 0.1, 0.4, 0.6, 0.2],
  [0.1, 0.5, 0.3, 0.1, 0.2, 0.1, 0.3, 0.2, 0.6, 0.2, 0.3, 0.1],
];

const SEVERITY_DATA = [
  { label: "Critical", count: 12, pct: 15, color: "#ef4444" },
  { label: "High", count: 34, pct: 42, color: "#f97316" },
  { label: "Medium", count: 28, pct: 35, color: "#eab308" },
  { label: "Low", count: 7, pct: 8, color: "#22d3ee" },
];

const MODULE_COSTS = [
  { name: "auth-service", cost: "$48K/yr", pct: 85 },
  { name: "payment-engine", cost: "$36K/yr", pct: 64 },
  { name: "user-dashboard", cost: "$28K/yr", pct: 50 },
  { name: "notification-svc", cost: "$14K/yr", pct: 25 },
  { name: "api-gateway", cost: "$9K/yr", pct: 16 },
];

const SCAN_STEPS = [
  {
    icon: GitBranch,
    title: "Connect Repository",
    desc: "Link your GitHub, GitLab, or Bitbucket repos. PHANTOM ingests your codebase securely.",
  },
  {
    icon: Radar,
    title: "Deep Scan",
    desc: "Static analysis maps complexity, coupling, duplication, and dependency health across every module.",
  },
  {
    icon: DollarSign,
    title: "Debt-to-Dollar Mapping",
    desc: "Proprietary models translate code metrics into dollar impact using your team size and velocity.",
  },
  {
    icon: Target,
    title: "Prioritized Remediation",
    desc: "Get a ranked queue of fixes ordered by ROI — highest dollar-impact-per-hour items first.",
  },
];

const JARGON_TRANSLATIONS = [
  {
    code: "Cyclomatic complexity: 47",
    business: "$34K/quarter delivery overhead",
    icon: Code2,
    bIcon: DollarSign,
  },
  {
    code: "Coupling score: 0.89",
    business: "2.3x slower feature velocity",
    icon: Layers,
    bIcon: TrendingUp,
  },
  {
    code: "Code duplication: 23%",
    business: "$18K/year in redundant maintenance",
    icon: FileCode2,
    bIcon: DollarSign,
  },
  {
    code: "Dependency depth: 14 layers",
    business: "4.1 hrs average incident resolution",
    icon: Server,
    bIcon: Clock,
  },
];

const INTEGRATIONS = [
  {
    name: "GitHub",
    desc: "Ingest repos, PRs, and commit history. Track debt introduction in real time.",
    icon: GitBranch,
  },
  {
    name: "Jira",
    desc: "Auto-create remediation tickets. Link debt items to sprint planning.",
    icon: Layers,
  },
  {
    name: "Datadog",
    desc: "Correlate runtime performance with debt hotspots. Map latency to code quality.",
    icon: Activity,
  },
];

/* ------------------------------------------------------------------ */
/*  Animated Radar Component                                           */
/* ------------------------------------------------------------------ */

function RadarSweep() {
  return (
    <div className="relative mx-auto h-[320px] w-[320px] sm:h-[400px] sm:w-[400px]">
      {/* Concentric rings */}
      {[1, 2, 3, 4].map((ring) => (
        <div
          key={ring}
          className="absolute left-1/2 top-1/2 rounded-full border"
          style={{
            width: `${ring * 25}%`,
            height: `${ring * 25}%`,
            transform: "translate(-50%, -50%)",
            borderColor: `rgba(34,211,238,${0.12 + ring * 0.04})`,
          }}
        />
      ))}

      {/* Crosshairs */}
      <div
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
        style={{ background: `rgba(34,211,238,0.12)` }}
      />
      <div
        className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
        style={{ background: `rgba(34,211,238,0.12)` }}
      />

      {/* Sweep line */}
      <div
        className="absolute left-1/2 top-1/2 h-1/2 w-px origin-top"
        style={{
          background: `linear-gradient(to bottom, ${CYAN}, transparent)`,
          animation: "radarSweep 4s linear infinite",
          transformOrigin: "top center",
        }}
      />

      {/* Sweep glow cone */}
      <div
        className="absolute left-1/2 top-1/2 h-1/2 w-1/2 origin-top-left"
        style={{
          background: `conic-gradient(from 0deg, ${CYAN_GLOW}, transparent 30deg)`,
          animation: "radarSweep 4s linear infinite",
          transformOrigin: "top left",
          borderRadius: "0 0 100% 0",
        }}
      />

      {/* Blips */}
      {[
        { top: "28%", left: "62%", delay: "0.5s", size: 6 },
        { top: "45%", left: "35%", delay: "1.2s", size: 8 },
        { top: "60%", left: "70%", delay: "2.1s", size: 5 },
        { top: "38%", left: "55%", delay: "3.0s", size: 7 },
        { top: "70%", left: "42%", delay: "1.8s", size: 4 },
      ].map((blip, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: blip.top,
            left: blip.left,
            width: blip.size,
            height: blip.size,
            background: CYAN,
            boxShadow: `0 0 12px ${CYAN}, 0 0 24px ${CYAN_DIM}`,
            animation: `radarBlip 4s ease-in-out infinite ${blip.delay}`,
          }}
        />
      ))}

      {/* Center dot */}
      <div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: CYAN,
          boxShadow: `0 0 20px ${CYAN}, 0 0 40px ${CYAN_DIM}`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Heatmap Cell Component                                             */
/* ------------------------------------------------------------------ */

function HeatmapCell({ value }: { value: number }) {
  const alpha = Math.max(0.08, value);
  const color =
    value > 0.7
      ? `rgba(239,68,68,${alpha})`
      : value > 0.5
        ? `rgba(249,115,22,${alpha})`
        : value > 0.3
          ? `rgba(234,179,8,${alpha * 0.7})`
          : `rgba(34,211,238,${alpha * 0.5})`;

  return (
    <div
      className="aspect-square rounded-[3px] transition-colors duration-500"
      style={{
        background: color,
        border: value > 0.7 ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(255,255,255,0.04)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  AI Workflow                                                        */
/* ------------------------------------------------------------------ */

const PHANTOM_PIPELINE = [
  {
    id: "ingest",
    icon: GitBranch,
    title: "Code Ingestion",
    desc: "Secure repository connection and indexing",
    detail: "PHANTOM connects to your GitHub, GitLab, or Bitbucket repos via read-only tokens. It indexes every file, dependency, and commit history — building a comprehensive map of your codebase architecture.",
    tags: ["Git history", "Dependency tree", "File graph", "Branch analysis", "Commit patterns"],
    color: CYAN,
  },
  {
    id: "scan",
    icon: Radar,
    title: "Deep Scan",
    desc: "Static + dynamic analysis across every module",
    detail: "Multi-pass analysis measures cyclomatic complexity, coupling, duplication, dependency depth, dead code percentage, and test coverage gaps — at the file, module, and service level.",
    tags: ["Complexity", "Coupling", "Duplication", "Dead code", "Test gaps", "Dep depth"],
    color: "#F97316",
  },
  {
    id: "classify",
    icon: AlertTriangle,
    title: "Debt Classification",
    desc: "Categorize and severity-score each debt item",
    detail: "Every detected issue is classified by type (architectural, dependency, test, documentation, design) and scored by severity, age, and growth rate. Historical commits reveal when debt was introduced.",
    tags: ["Architectural", "Dependency", "Test debt", "Design debt", "Age tracking"],
    color: "#EF4444",
  },
  {
    id: "dollar",
    icon: DollarSign,
    title: "Debt-to-Dollar Mapping",
    desc: "Translate code metrics into business impact",
    detail: "Proprietary models combine your team size, hourly rate, velocity data, and incident history to translate every debt item into real dollar costs — hours wasted, incidents caused, velocity drag.",
    tags: ["$/quarter impact", "Hours wasted", "Velocity drag", "Incident risk", "Growth tax"],
    color: "#EAB308",
  },
  {
    id: "prioritize",
    icon: Target,
    title: "ROI Prioritization",
    desc: "Rank remediation by dollar-impact-per-hour",
    detail: "PHANTOM generates a prioritized remediation queue ranking every fix by ROI. It calculates effort-to-fix vs. annual savings, grouping quick-wins separately from strategic refactors.",
    tags: ["ROI score", "Quick wins", "Strategic fixes", "Effort estimate", "Annual savings"],
    color: "#12FF80",
  },
  {
    id: "track",
    icon: TrendingUp,
    title: "Continuous Monitoring",
    desc: "Track debt health over time with CI gates",
    detail: "After initial scan, PHANTOM runs on every PR via CI integration. It blocks PRs that increase debt above thresholds, and generates weekly executive reports showing debt trend and remediation progress.",
    tags: ["PR gate", "Debt trend", "Weekly reports", "Threshold alerts", "Team scores"],
    color: "#8B5CF6",
  },
];

function PhantomAIWorkflow() {
  const [activeStage, setActiveStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % PHANTOM_PIPELINE.length);
    }, 3400);
    return () => clearInterval(timer);
  }, [playing, visible]);

  const stage = PHANTOM_PIPELINE[activeStage];
  const StageIcon = stage.icon;

  return (
    <Section variant="sky" className="py-20 sm:py-28 overflow-hidden">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={CYAN} className="mb-4">AI Workflow</Chip>
          <h2 className="text-heading-1 text-theme max-w-[720px] mx-auto">
            Inside PHANTOM&apos;s{" "}
            <span style={{ color: CYAN }}>debt intelligence engine</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-2xl mx-auto">
            Follow a code commit through six AI stages — from repo ingestion
            to dollar-denominated debt reports, automatically.
          </p>
        </div>

        {/* Pipeline progress */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex items-center gap-1">
            {PHANTOM_PIPELINE.map((s, i) => {
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
                      <div className="text-[10px] font-bold tracking-widest text-theme-m uppercase">
                        Stage {String(activeStage + 1).padStart(2, "0")}
                      </div>
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
                          animation: `phantom-tag-pop 0.3s ease-out ${j * 60}ms both`,
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
                  {activeStage === 0 && <PhantomIngestVisual />}
                  {activeStage === 1 && <PhantomScanVisual />}
                  {activeStage === 2 && <PhantomClassifyVisual />}
                  {activeStage === 3 && <PhantomDollarVisual />}
                  {activeStage === 4 && <PhantomPrioritizeVisual />}
                  {activeStage === 5 && <PhantomTrackVisual />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes phantom-tag-pop {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </Section>
  );
}

/* Visual: Code Ingestion */
function PhantomIngestVisual() {
  const repos = [
    { name: "api-gateway", files: 342, lang: "TypeScript" },
    { name: "auth-service", files: 128, lang: "Go" },
    { name: "payment-engine", files: 256, lang: "Python" },
    { name: "user-dashboard", files: 487, lang: "React" },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: CYAN }} />
        <span className="text-xs font-mono text-theme-m">Indexing repositories… 1,213 files mapped</span>
      </div>
      {repos.map((r, i) => (
        <div
          key={r.name}
          className="flex items-center gap-3 rounded-lg border border-theme p-2.5"
          style={{ animation: `phantomFadeIn 0.3s ease-out ${i * 70}ms both` }}
        >
          <GitBranch className="h-4 w-4 flex-shrink-0" style={{ color: CYAN }} />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-theme truncate">{r.name}</div>
            <div className="text-[10px] text-theme-m">{r.files} files · {r.lang}</div>
          </div>
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
        </div>
      ))}
      <style jsx>{`@keyframes phantomFadeIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}

/* Visual: Deep Scan */
function PhantomScanVisual() {
  const metrics = [
    { label: "Avg Complexity", value: "14.7", status: "warning", max: 25 },
    { label: "Coupling Score", value: "0.73", status: "high", max: 1 },
    { label: "Duplication", value: "8.2%", status: "ok", max: 20 },
    { label: "Dead Code", value: "12.4%", status: "warning", max: 30 },
    { label: "Test Coverage", value: "61%", status: "low", max: 100 },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Deep scan in progress… 4 modules analyzed</span>
      </div>
      {metrics.map((m, i) => {
        const pct = m.label === "Coupling Score" ? parseFloat(m.value) * 100 : parseFloat(m.value);
        const barPct = Math.min(100, (pct / m.max) * 100);
        const color = m.status === "ok" ? "#22D3EE" : m.status === "warning" ? "#F59E0B" : m.status === "high" ? "#EF4444" : "#F97316";
        return (
          <div key={m.label} className="space-y-1" style={{ animation: `phantomBarIn 0.4s ease-out ${i * 80}ms both` }}>
            <div className="flex justify-between text-[11px]">
              <span className="text-theme-s font-medium">{m.label}</span>
              <span className="font-mono font-bold" style={{ color }}>{m.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-theme-subtle overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${barPct}%`, backgroundColor: color }} />
            </div>
          </div>
        );
      })}
      <style jsx>{`@keyframes phantomBarIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}

/* Visual: Debt Classification */
function PhantomClassifyVisual() {
  const items = [
    { type: "Architectural", count: 12, severity: "critical", color: "#EF4444" },
    { type: "Dependency", count: 23, severity: "high", color: "#F97316" },
    { type: "Test Debt", count: 18, severity: "medium", color: "#EAB308" },
    { type: "Design Debt", count: 8, severity: "low", color: CYAN },
    { type: "Documentation", count: 15, severity: "info", color: "#8B5CF6" },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Classifying 76 debt items…</span>
      </div>
      {items.map((item, i) => (
        <div key={item.type} className="flex items-center gap-3 rounded-lg border border-theme p-2.5" style={{ animation: `phantomFadeIn 0.3s ease-out ${i * 60}ms both` }}>
          <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
            <span className="text-xs font-bold" style={{ color: item.color }}>{item.count}</span>
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-theme">{item.type}</div>
            <div className="text-[10px] text-theme-m capitalize">{item.severity} severity</div>
          </div>
          <div className="h-1.5 w-16 rounded-full bg-theme-subtle overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${(item.count / 23) * 100}%`, backgroundColor: item.color }} />
          </div>
        </div>
      ))}
      <style jsx>{`@keyframes phantomFadeIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}

/* Visual: Debt-to-Dollar */
function PhantomDollarVisual() {
  const translations = [
    { metric: "Complexity hotspots", cost: "$48K/yr", impact: "Slows feature delivery 2.3x" },
    { metric: "High coupling", cost: "$36K/yr", impact: "Increases incident rate 40%" },
    { metric: "Missing tests", cost: "$28K/yr", impact: "Avg 4.1hr incident resolution" },
    { metric: "Dead code", cost: "$14K/yr", impact: "Wasted CI and cognitive load" },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Calculating business impact… $126K/yr total</span>
      </div>
      {translations.map((t, i) => (
        <div key={t.metric} className="rounded-lg border border-theme p-3" style={{ animation: `phantomDollar 0.4s ease-out ${i * 80}ms both` }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-theme">{t.metric}</span>
            <span className="text-xs font-bold text-amber-400">{t.cost}</span>
          </div>
          <div className="text-[10px] text-theme-m">{t.impact}</div>
        </div>
      ))}
      <div className="mt-3 rounded-lg p-3 border text-center" style={{ borderColor: `${CYAN}30`, backgroundColor: `${CYAN}08` }}>
        <DollarSign className="h-4 w-4 mx-auto mb-1" style={{ color: CYAN }} />
        <span className="text-sm font-bold" style={{ color: CYAN }}>$126K/yr</span>
        <span className="text-[10px] text-theme-m block">Total identified tech debt cost</span>
      </div>
      <style jsx>{`@keyframes phantomDollar { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }`}</style>
    </div>
  );
}

/* Visual: ROI Prioritization */
function PhantomPrioritizeVisual() {
  const queue = [
    { name: "Decouple auth-service", effort: "3d", savings: "$18K/yr", roi: "6.0x", color: "#12FF80" },
    { name: "Add payment tests", effort: "2d", savings: "$12K/yr", roi: "4.8x", color: "#12FF80" },
    { name: "Remove dead endpoints", effort: "1d", savings: "$4K/yr", roi: "4.0x", color: "#22D3EE" },
    { name: "Refactor data layer", effort: "8d", savings: "$28K/yr", roi: "3.5x", color: "#22D3EE" },
    { name: "Update dep tree", effort: "5d", savings: "$8K/yr", roi: "1.6x", color: "#F59E0B" },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Remediation queue ranked by ROI</span>
      </div>
      <div className="rounded-lg border border-theme overflow-hidden">
        <div className="grid grid-cols-[1fr_40px_60px_50px] gap-1 px-3 py-1.5 border-b border-theme bg-theme-subtle/30 text-[9px] font-bold text-theme-m uppercase tracking-wider">
          <span>Fix</span><span className="text-center">Effort</span><span className="text-center">Savings</span><span className="text-center">ROI</span>
        </div>
        {queue.map((q, i) => (
          <div key={q.name} className="grid grid-cols-[1fr_40px_60px_50px] gap-1 px-3 py-2 border-b last:border-0 border-theme items-center" style={{ animation: `phantomFadeIn 0.3s ease-out ${i * 60}ms both` }}>
            <span className="text-[11px] text-theme-s font-medium truncate">{q.name}</span>
            <span className="text-[10px] text-theme-m text-center font-mono">{q.effort}</span>
            <span className="text-[10px] text-center font-mono" style={{ color: q.color }}>{q.savings}</span>
            <span className="text-[10px] text-center font-bold" style={{ color: q.color }}>{q.roi}</span>
          </div>
        ))}
      </div>
      <style jsx>{`@keyframes phantomFadeIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}

/* Visual: Continuous Monitoring */
function PhantomTrackVisual() {
  const trend = [142, 138, 130, 122, 115, 108, 98, 89];
  const max = Math.max(...trend);
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "#8B5CF6" }} />
        <span className="text-xs font-mono text-theme-m">Debt items trending down — 89 remaining</span>
      </div>
      <div className="rounded-lg border border-theme p-4">
        <div className="text-[10px] text-theme-m font-semibold mb-3">Debt Item Count — Last 8 Sprints</div>
        <div className="flex items-end gap-2 h-24">
          {trend.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] font-bold" style={{ color: v <= 100 ? "#12FF80" : CYAN }}>{v}</span>
              <div className="w-full rounded-t-md bg-theme-subtle" style={{ height: "100%" }}>
                <div
                  className="w-full rounded-t-md"
                  style={{
                    height: `${(v / max) * 100}%`,
                    marginTop: `${100 - (v / max) * 100}%`,
                    background: v <= 100 ? `linear-gradient(180deg, #12FF80, ${CYAN}50)` : `linear-gradient(180deg, ${CYAN}, ${CYAN}40)`,
                  }}
                />
              </div>
              <span className="text-[8px] text-theme-f">S{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Debt Score", value: "B+", color: CYAN },
          { label: "Trend", value: "↓ 37%", color: "#12FF80" },
          { label: "PR Gate", value: "Active", color: "#8B5CF6" },
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

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function PhantomPage() {
  const [devCount, setDevCount] = useState(25);
  const [mounted, setMounted] = useState(false);
  const roiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const annualSavings = devCount * 12 * 12 * 3.2;
  const formattedSavings = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(annualSavings);

  return (
    <>
      {/* Keyframes injected once */}
      <style jsx global>{`
        @keyframes radarSweep {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes radarBlip {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
        }
        @keyframes scanLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(34, 211, 238, 0.5);
          }
        }
        @keyframes debtCascade {
          0% {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes translateArrow {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(6px);
          }
        }
        @keyframes trendDraw {
          from {
            stroke-dashoffset: 300;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <Section
        variant="violet"
        className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-28"
      >
        {/* Premium background */}
        <div className="product-hero-gradient" style={{ "--hero-gradient": `radial-gradient(ellipse, ${CYAN}, transparent 70%)`, "--hero-gradient-secondary": "radial-gradient(ellipse, #06b6d4, transparent 70%)" } as React.CSSProperties} />
        <div className="pointer-events-none absolute inset-0 fine-grid" />
        <div className="pointer-events-none absolute inset-0 noise-overlay" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-6">
            <Chip
              dotColor={CYAN}
              className="border border-cyan-500/20 bg-cyan-950/30 backdrop-blur-sm"
            >
              Add-on at checkout
            </Chip>
            <span className="enterprise-badge">
              <Shield className="h-3 w-3" />
              Enterprise Ready
            </span>
          </div>

          <div className="mb-8">
            <RadarSweep />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Ghost
              className="h-8 w-8"
              style={{ color: CYAN }}
            />
            <h1
              className="text-display-2 sm:text-display-1 font-semibold tracking-tight"
              style={{
                background: `linear-gradient(135deg, #ffffff 0%, ${CYAN} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              PHANTOM
            </h1>
          </div>

          <p
            className="text-heading-2 font-semibold mb-4"
            style={{ color: CYAN }}
          >
            Tech Debt Radar
          </p>

          <p className="text-body-lg text-theme-s max-w-2xl mx-auto mb-8">
            Tech debt visible in dollars for leadership — not jargon. PHANTOM
            scans your codebase, translates complexity into cost, and gives every
            stakeholder the view they need.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Chip dotColor="#22d3ee" className="text-xs">
              Eng Directors
            </Chip>
            <Chip dotColor="#22d3ee" className="text-xs">
              VP Engineering
            </Chip>
            <Chip dotColor="#22d3ee" className="text-xs">
              CTO
            </Chip>
            <Chip dotColor="#22d3ee" className="text-xs">
              CFO
            </Chip>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-cyan-500 text-black hover:bg-cyan-400" asChild>
              <Link href={buildProductCheckoutUrl({ product: "phantom", plan: "pro" })} className="inline-flex items-center gap-2">
                Start 14-day trial
                <ArrowDownRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  THE PROBLEM                                                  */}
      {/* ============================================================ */}
      <Section variant="mint" className="py-20 sm:py-28">
        <div className="text-center mb-14">
          <Chip dotColor="#ef4444" className="mb-4">
            The Hidden Cost
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Tech debt is invisible — until it isn&apos;t
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            It accumulates silently, then cascades into missed deadlines,
            spiraling costs, and engineer burnout. Leadership only sees the
            symptoms — never the source.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-14">
          <Card
            variant="light"
            className="relative overflow-hidden border-red-500/20 p-8"
          >
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{
                background: "linear-gradient(to right, #ef4444, transparent)",
              }}
            />
            <AlertTriangle className="h-6 w-6 text-red-400 mb-3" />
            <p className="text-display-2 font-semibold text-theme mb-1">73%</p>
            <p className="text-body-base text-theme-s">
              of engineering leaders say tech debt significantly slows feature
              delivery
            </p>
          </Card>
          <Card
            variant="light"
            className="relative overflow-hidden border-red-500/20 p-8"
          >
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{
                background: "linear-gradient(to right, #f97316, transparent)",
              }}
            />
            <DollarSign className="h-6 w-6 text-orange-400 mb-3" />
            <p className="text-display-2 font-semibold text-theme mb-1">$85B</p>
            <p className="text-body-base text-theme-s">
              estimated annual cost of technical debt across the software
              industry
            </p>
          </Card>
        </div>

        {/* Cascade cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            {
              step: "01",
              title: "Silent accumulation",
              desc: "Quick fixes and shortcuts pile up over months. Nobody tracks the interest.",
              delay: "0s",
            },
            {
              step: "02",
              title: "Velocity collapse",
              desc: "Simple features take 3x longer. Engineers avoid entire modules. Morale drops.",
              delay: "0.15s",
            },
            {
              step: "03",
              title: "Crisis erupts",
              desc: "Production outage. Rewrite demanded. Budget blown. Leadership blindsided.",
              delay: "0.3s",
            },
          ].map((item) => (
            <Card
              key={item.step}
              variant="light"
              className="relative overflow-hidden"
              style={{
                animation: mounted
                  ? `debtCascade 0.6s ease-out ${item.delay} both`
                  : undefined,
              }}
            >
              <span
                className="text-xs font-mono font-bold mb-2 block"
                style={{ color: CYAN }}
              >
                STAGE {item.step}
              </span>
              <h3 className="text-heading-3 text-theme mb-2">{item.title}</h3>
              <p className="text-sm text-theme-s">{item.desc}</p>
              {item.step !== "03" && (
                <ArrowRight
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-theme-f hidden sm:block"
                  style={{ animation: "translateArrow 2s ease-in-out infinite" }}
                />
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  AI WORKFLOW PIPELINE                                          */}
      {/* ============================================================ */}
      <PhantomAIWorkflow />

      {/* ============================================================ */}
      {/*  DEBT RADAR DASHBOARD                                         */}
      {/* ============================================================ */}
      <Section variant="violet" withGrid withNoise className="py-20 sm:py-28">
        <div className="text-center mb-14">
          <Chip dotColor={CYAN} className="mb-4 border border-cyan-500/20 bg-cyan-950/30 backdrop-blur-sm">
            Dashboard Preview
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Your codebase, fully scanned
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            PHANTOM&apos;s dashboard gives you an X-ray view of technical debt
            across every module, file, and function.
          </p>
        </div>

        {/* Dashboard mock */}
        <div
          className="max-w-5xl mx-auto rounded-2xl border p-1 sm:p-2"
          style={{
            borderColor: "rgba(34,211,238,0.15)",
            background:
              "linear-gradient(145deg, rgba(34,211,238,0.03), rgba(0,0,0,0.4))",
            animation: "pulseGlow 6s ease-in-out infinite",
          }}
        >
          {/* Dashboard header */}
          <div
            className="flex items-center justify-between rounded-t-xl px-4 py-3 sm:px-6 sm:py-4 border-b"
            style={{
              background: "rgba(34,211,238,0.04)",
              borderColor: "rgba(34,211,238,0.1)",
            }}
          >
            <div className="flex items-center gap-2">
              <Radar className="h-5 w-5" style={{ color: CYAN }} />
              <span className="text-sm font-semibold text-theme">
                PHANTOM Debt Radar
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-theme-m">
              <span className="hidden sm:inline">Last scan: 2 min ago</span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  background: "rgba(34,211,238,0.12)",
                  color: CYAN,
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Live
              </span>
            </div>
          </div>

          {/* Dashboard body */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/[0.03] rounded-b-xl overflow-hidden">
            {/* Heatmap */}
            <div className="lg:col-span-2 p-4 sm:p-6 bg-theme-s">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-theme flex items-center gap-2">
                  <Eye className="h-4 w-4" style={{ color: CYAN }} />
                  Codebase Heatmap
                </h3>
                <span className="text-xs text-theme-m font-mono">
                  142 modules scanned
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                {HEATMAP_DATA.flat().map((val, i) => (
                  <HeatmapCell key={i} value={val} />
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-theme-m">
                <span>Low debt</span>
                <div className="flex gap-1">
                  {[0.1, 0.3, 0.5, 0.7, 0.9].map((v) => (
                    <div
                      key={v}
                      className="h-2 w-6 rounded-sm"
                      style={{
                        background:
                          v > 0.7
                            ? `rgba(239,68,68,${v})`
                            : v > 0.5
                              ? `rgba(249,115,22,${v})`
                              : v > 0.3
                                ? `rgba(234,179,8,${v * 0.7})`
                                : `rgba(34,211,238,${v * 0.5})`,
                      }}
                    />
                  ))}
                </div>
                <span>Critical</span>
              </div>
            </div>

            {/* Right panel */}
            <div className="flex flex-col gap-px bg-white/[0.03]">
              {/* Severity */}
              <div className="p-4 sm:p-5 bg-theme-s">
                <h3 className="text-sm font-semibold text-theme mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" style={{ color: CYAN }} />
                  Severity Breakdown
                </h3>
                <div className="space-y-2.5">
                  {SEVERITY_DATA.map((s) => (
                    <div key={s.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-theme-s">{s.label}</span>
                        <span className="text-theme-m font-mono">
                          {s.count} items
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: mounted ? `${s.pct}%` : "0%",
                            background: s.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dollar impact */}
              <div className="p-4 sm:p-5 bg-theme-s flex-1">
                <h3 className="text-sm font-semibold text-theme mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" style={{ color: CYAN }} />
                  Dollar Impact / Module
                </h3>
                <div className="space-y-2">
                  {MODULE_COSTS.map((m) => (
                    <div key={m.name} className="flex items-center gap-3">
                      <span className="text-xs text-theme-m font-mono w-28 truncate">
                        {m.name}
                      </span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: mounted ? `${m.pct}%` : "0%",
                            background: `linear-gradient(to right, ${CYAN}, #06b6d4)`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-theme w-16 text-right">
                        {m.cost}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trend line */}
          <div
            className="mx-4 mb-4 mt-2 sm:mx-6 rounded-xl p-4"
            style={{ background: "rgba(34,211,238,0.03)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-theme flex items-center gap-2">
                <TrendingUp className="h-4 w-4" style={{ color: CYAN }} />
                Debt Accumulation Trend
              </h3>
              <span className="text-xs text-theme-m">Last 12 months</span>
            </div>
            <svg
              viewBox="0 0 600 80"
              className="w-full h-16 sm:h-20"
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              {[20, 40, 60].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="600"
                  y2={y}
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              ))}
              {/* Fill */}
              <path
                d="M0,70 L50,65 L100,58 L150,55 L200,48 L250,42 L300,38 L350,30 L400,25 L450,22 L500,18 L550,12 L600,8 L600,80 L0,80 Z"
                fill="url(#cyanFill)"
              />
              {/* Line */}
              <path
                d="M0,70 L50,65 L100,58 L150,55 L200,48 L250,42 L300,38 L350,30 L400,25 L450,22 L500,18 L550,12 L600,8"
                fill="none"
                stroke={CYAN}
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 300,
                  animation: mounted
                    ? "trendDraw 2s ease-out forwards"
                    : undefined,
                }}
              />
              <defs>
                <linearGradient
                  id="cyanFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={CYAN}
                    stopOpacity="0.15"
                  />
                  <stop
                    offset="100%"
                    stopColor={CYAN}
                    stopOpacity="0.01"
                  />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex justify-between text-[10px] text-theme-f mt-1 font-mono">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                (m) => (
                  <span key={m}>{m}</span>
                ),
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  THREE VIEWS                                                  */}
      {/* ============================================================ */}
      <Section variant="mint" className="py-20 sm:py-28">
        <div className="text-center mb-14">
          <Chip dotColor={CYAN} className="mb-4">
            Role-Based Views
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            One scanner. Three lenses.
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Every stakeholder sees debt through their own context — from
            file-level metrics to board-level ROI projections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Engineer */}
          <Card variant="enterprise" className="relative overflow-hidden group">
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{
                background: `linear-gradient(to right, ${CYAN}, transparent)`,
              }}
            />
            <div
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg mb-4"
              style={{ background: CYAN_DIM }}
            >
              <Code2 className="h-5 w-5" style={{ color: CYAN }} />
            </div>
            <h3 className="text-heading-3 text-theme mb-2">Engineer View</h3>
            <p className="text-sm text-theme-s mb-4">
              Actionable, file-level insights to tackle debt where it lives.
            </p>
            <ul className="space-y-2 text-sm text-theme-m">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: CYAN }} />
                File-level debt scores and complexity metrics
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: CYAN }} />
                Inline remediation suggestions per function
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: CYAN }} />
                Dependency graph with risk annotations
              </li>
            </ul>
          </Card>

          {/* VP Eng */}
          <Card variant="enterprise" className="relative overflow-hidden group">
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{
                background: `linear-gradient(to right, #8b5cf6, transparent)`,
              }}
            />
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg mb-4 bg-purple-500/15">
              <Users className="h-5 w-5 text-purple-400" />
            </div>
            <h3 className="text-heading-3 text-theme mb-2">VP Engineering</h3>
            <p className="text-sm text-theme-s mb-4">
              Module-level health to drive sprint and quarterly planning.
            </p>
            <ul className="space-y-2 text-sm text-theme-m">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-purple-400" />
                Module health scores across all services
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-purple-400" />
                Team debt velocity — is it growing or shrinking?
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-purple-400" />
                Prioritized remediation queue by business impact
              </li>
            </ul>
          </Card>

          {/* CFO / CTO */}
          <Card variant="enterprise" className="relative overflow-hidden group">
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{
                background: `linear-gradient(to right, #12ff80, transparent)`,
              }}
            />
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg mb-4 bg-brand/15">
              <DollarSign className="h-5 w-5 text-brand" />
            </div>
            <h3 className="text-heading-3 text-theme mb-2">CFO / CTO</h3>
            <p className="text-sm text-theme-s mb-4">
              Dollar-denominated debt for executive decision-making.
            </p>
            <ul className="space-y-2 text-sm text-theme-m">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand" />
                Total dollar impact of tech debt portfolio
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand" />
                ROI projections for remediation investments
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand" />
                Strategic remediation plans with timelines
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  HOW SCANNING WORKS                                           */}
      {/* ============================================================ */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center mb-14">
          <Chip dotColor={CYAN} className="mb-4 border border-cyan-500/20 bg-cyan-950/30">
            How It Works
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            From repo to remediation in minutes
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            PHANTOM runs a deep diagnostic scan, maps every line to a dollar
            figure, and produces a prioritized action plan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {SCAN_STEPS.map((step, i) => (
            <div key={step.title} className="relative">
              <Card variant="light" className="h-full relative overflow-hidden">
                {/* Scan line overlay */}
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden opacity-20"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${CYAN_DIM}, transparent)`,
                    backgroundSize: "100% 200%",
                    animation: `scanLine ${3 + i * 0.5}s linear infinite`,
                  }}
                />
                <span
                  className="text-xs font-mono font-bold mb-3 block"
                  style={{ color: CYAN }}
                >
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <step.icon
                  className="h-8 w-8 mb-3"
                  style={{ color: CYAN }}
                />
                <h3 className="text-heading-3 text-theme mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-theme-s">{step.desc}</p>
              </Card>
              {/* Connector arrow */}
              {i < SCAN_STEPS.length - 1 && (
                <ChevronRight
                  className="absolute -right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-theme-f hidden lg:block"
                  style={{ color: CYAN }}
                />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  DEBT-TO-DOLLAR TRANSLATION                                   */}
      {/* ============================================================ */}
      <Section variant="mint" className="py-20 sm:py-28">
        <div className="text-center mb-14">
          <Chip dotColor={CYAN} className="mb-4">
            The Translation Layer
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            From engineering jargon to business impact
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            PHANTOM translates every code metric into language your CFO
            understands. No more black-box engineering reports.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {JARGON_TRANSLATIONS.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-center"
            >
              {/* Code side */}
              <Card variant="light" className="flex items-center gap-3 p-4">
                <item.icon className="h-5 w-5 shrink-0 text-red-400" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-theme-m block mb-0.5">
                    Code Metric
                  </span>
                  <span className="text-sm font-mono text-theme">
                    {item.code}
                  </span>
                </div>
              </Card>

              {/* Arrow */}
              <div className="hidden sm:flex flex-col items-center gap-1">
                <Ghost className="h-5 w-5" style={{ color: CYAN }} />
                <ArrowRight
                  className="h-4 w-4"
                  style={{ color: CYAN }}
                />
              </div>

              {/* Business side */}
              <Card
                variant="light"
                className="flex items-center gap-3 p-4 border-cyan-500/20"
              >
                <item.bIcon className="h-5 w-5 shrink-0" style={{ color: CYAN }} />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-theme-m block mb-0.5">
                    Business Impact
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: CYAN }}
                  >
                    {item.business}
                  </span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  INTEGRATION STRIP                                            */}
      {/* ============================================================ */}
      <Section variant="sky" className="py-16 sm:py-20">
        <div className="text-center mb-10">
          <h2 className="text-heading-2 text-theme mb-2">
            Plugs into your existing stack
          </h2>
          <p className="text-body-base text-theme-s">
            PHANTOM integrates with the tools you already use.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {INTEGRATIONS.map((integ) => (
            <Card
              key={integ.name}
              variant="light"
              className="text-center p-6"
            >
              <div
                className="inline-flex items-center justify-center h-12 w-12 rounded-xl mb-4 mx-auto"
                style={{ background: CYAN_DIM }}
              >
                <integ.icon className="h-6 w-6" style={{ color: CYAN }} />
              </div>
              <h3 className="text-heading-3 text-theme mb-2">{integ.name}</h3>
              <p className="text-sm text-theme-s">{integ.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  ROI CALCULATOR                                               */}
      {/* ============================================================ */}
      <Section variant="mint" className="py-20 sm:py-28">
        <div className="text-center mb-14">
          <Chip dotColor={CYAN} className="mb-4">
            ROI Calculator
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Calculate your savings
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            See how much PHANTOM could save your organization by eliminating
            wasted engineering hours on untracked tech debt.
          </p>
        </div>

        <div className="max-w-2xl mx-auto" ref={roiRef}>
          <Card variant="enterprise" className="relative overflow-hidden p-8 premium-shadow">
            {/* Decorative scan line */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{
                background: `linear-gradient(180deg, transparent 40%, ${CYAN_DIM} 50%, transparent 60%)`,
                backgroundSize: "100% 300%",
                animation: "scanLine 5s linear infinite",
                opacity: 0.15,
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <label className="text-sm font-semibold text-theme">
                  Team Size (developers)
                </label>
                <span
                  className="text-heading-2 font-mono font-semibold"
                  style={{ color: CYAN }}
                >
                  {devCount}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="5"
                max="200"
                value={devCount}
                onChange={(e) => setDevCount(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer mb-8"
                style={{
                  background: `linear-gradient(to right, ${CYAN} ${((devCount - 5) / 195) * 100}%, rgba(255,255,255,0.08) ${((devCount - 5) / 195) * 100}%)`,
                  accentColor: CYAN,
                }}
              />

              <div className="flex items-center justify-between text-xs text-theme-m mb-8">
                <span>5 devs</span>
                <span>200 devs</span>
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  className="rounded-xl p-4 text-center"
                  style={{ background: "rgba(34,211,238,0.06)" }}
                >
                  <p className="text-xs text-theme-m mb-1">Monthly Cost</p>
                  <p className="text-heading-3 font-mono" style={{ color: CYAN }}>
                    ${(devCount * 12).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-theme-f">
                    at $12/dev/mo
                  </p>
                </div>
                <div
                  className="rounded-xl p-4 text-center"
                  style={{ background: "rgba(34,211,238,0.06)" }}
                >
                  <p className="text-xs text-theme-m mb-1">Annual Cost</p>
                  <p className="text-heading-3 font-mono" style={{ color: CYAN }}>
                    ${(devCount * 12 * 12).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-theme-f">
                    billed annually
                  </p>
                </div>
                <div
                  className="rounded-xl p-4 text-center border"
                  style={{
                    background: "rgba(34,211,238,0.1)",
                    borderColor: "rgba(34,211,238,0.3)",
                  }}
                >
                  <p className="text-xs text-theme-m mb-1">
                    Estimated Annual Savings
                  </p>
                  <p className="text-heading-3 font-mono font-bold text-brand">
                    {formattedSavings}
                  </p>
                  <p className="text-[10px] text-theme-f">
                    avg. 3.2x ROI
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-theme-f mt-4 text-center">
                Based on industry averages: engineers spend 33% of time on tech
                debt. PHANTOM helps reclaim 40% of that through prioritized
                remediation.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  PRICING NOTE                                                 */}
      {/* ============================================================ */}
      <Section variant="sky" className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" style={{ color: CYAN }} />
              <span className="text-sm text-theme-s">
                From <span className="font-semibold text-theme">$12/dev/mo</span>
              </span>
            </div>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" style={{ color: CYAN }} />
              <span className="text-sm text-theme-s">
                SOC 2 compliant
              </span>
            </div>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" style={{ color: CYAN }} />
              <span className="text-sm text-theme-s">
                Setup in <span className="font-semibold text-theme">5 minutes</span>
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  WAITLIST CTA                                                 */}
      {/* ============================================================ */}
      <Section variant="mint" className="py-20 sm:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <Ghost className="h-12 w-12 mx-auto mb-6" style={{ color: CYAN }} />
          <h2 className="text-heading-1 text-theme mb-4">
            Quantify debt in dollars, on your timeline
          </h2>
          <p className="text-body-lg text-theme-s mb-8 max-w-lg mx-auto">
            PHANTOM is a priced add-on to your Voatomy plan. Start a 14-day trial, configure seats
            on checkout, and subscribe on-site.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <Button size="lg" className="w-full sm:w-auto bg-cyan-500 text-black hover:bg-cyan-400 shrink-0" asChild>
              <Link href={buildProductCheckoutUrl({ product: "phantom", plan: "pro" })} className="inline-flex items-center gap-2">
                Start 14-day trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
              <Link href={buildProductCheckoutUrl({ product: "phantom", plan: "business" })}>Business checkout</Link>
            </Button>
          </div>

          <p className="text-xs text-theme-f mt-4">
            Enterprise?{" "}
            <Link href="/contact?plan=enterprise" className="text-brand underline-offset-2 hover:underline">
              Contact sales
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  FOOTER ACCENT                                                */}
      {/* ============================================================ */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(to right, transparent, ${CYAN}, transparent)`,
        }}
      />
    </>
  );
}

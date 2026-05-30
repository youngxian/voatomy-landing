"use client";

import { cn } from "@/lib/utils";
import { buildProductCheckoutUrl } from "@/lib/product-purchase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  AlertTriangle,
  Activity,
  Radio,
  Shield,
  Users,
  DollarSign,
  Clock,
  ArrowRight,
  Zap,
  BarChart3,
  Bell,
  GitBranch,
  Server,
  MessageSquare,
  TrendingDown,
  Eye,
  Target,
  CheckCircle2,
  ChevronRight,
  FileText,
  Send,
  Wifi,
  Database,
  Headphones,
  Briefcase,
  Crown,
  Timer,
  ArrowDown,
  Cpu,
  Network,
  Gauge,
  ScanLine,
  Brain,
  Route,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { SignalIllustration } from "@/components/illustrations/product-illustrations";
import { ProductHeroAtmosphere } from "@/components/marketing/product-hero-atmosphere";
import { productBrand } from "@/lib/product-brand";

/* ─────────────────────────── Constants ─────────────────────────── */

const SIGNAL_RED = productBrand.signal.accent;
const SIGNAL_RED_LIGHT = productBrand.signal.accentLight;
const SIGNAL_RED_GLOW = productBrand.signal.accentGlow;
const SIGNAL_AMBER = productBrand.signal.secondary;

const PROBLEM_ROLES = [
  {
    role: "SRE",
    icon: Server,
    sees: "Logs, dashboards, runbooks",
    pain: "No idea which customers are affected",
    color: SIGNAL_AMBER,
  },
  {
    role: "Customer Success",
    icon: Headphones,
    sees: "Support tickets flooding in",
    pain: "No technical context to respond",
    color: "#8B5CF6",
  },
  {
    role: "Sales",
    icon: Briefcase,
    sees: "Silent pipeline risk",
    pain: "Discovers impact days later",
    color: "#3B82F6",
  },
  {
    role: "Leadership",
    icon: Crown,
    sees: "... nothing until it escalates",
    pain: "Revenue impact is invisible",
    color: "SIGNAL_RED",
  },
];

const INTELLIGENCE_STEPS = [
  {
    icon: Wifi,
    title: "Auto-Detect Affected Services",
    description:
      "SIGNAL maps your service topology and instantly identifies every service in the blast radius.",
  },
  {
    icon: Users,
    title: "Map Affected Customers + ARR",
    description:
      "Cross-reference affected services with customer deployments and contract data to surface ARR at risk.",
  },
  {
    icon: DollarSign,
    title: "Calculate Business Impact",
    description:
      "Real-time revenue impact scoring based on customer tier, contract value, and renewal proximity.",
  },
  {
    icon: Send,
    title: "Route Context to Right Teams",
    description:
      "Each team gets a tailored brief -- technical depth for SRE, talking points for CS, pipeline data for Sales.",
  },
];

const DASHBOARD_TABS = [
  {
    id: "sre",
    label: "SRE / DevOps",
    icon: Server,
    color: SIGNAL_AMBER,
    items: [
      { label: "Blast Radius", value: "3 services, 2 regions", icon: Target },
      { label: "Related Alerts", value: "4 correlated alerts", icon: Bell },
      { label: "Runbook", value: "Auto-attached: DB Failover v2.1", icon: FileText },
      { label: "Root Cause", value: "Connection pool exhaustion", icon: GitBranch },
    ],
  },
  {
    id: "cs",
    label: "Customer Success",
    icon: Headphones,
    color: "#8B5CF6",
    items: [
      { label: "Affected Accounts", value: "12 enterprise, 34 pro", icon: Users },
      { label: "Talking Points", value: "Auto-generated from incident", icon: MessageSquare },
      { label: "Status Template", value: "Ready to send via email/Slack", icon: Send },
      { label: "Escalation Risk", value: "3 accounts in renewal window", icon: AlertTriangle },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    icon: Briefcase,
    color: "#3B82F6",
    items: [
      { label: "At-Risk Deals", value: "$1.2M pipeline exposure", icon: TrendingDown },
      { label: "Pipeline Impact", value: "2 deals in POC phase affected", icon: BarChart3 },
      { label: "Hold Recommendation", value: "Pause outreach to 3 accounts", icon: Timer },
      { label: "Recovery Actions", value: "Post-resolution follow-up plan", icon: CheckCircle2 },
    ],
  },
  {
    id: "leadership",
    label: "Leadership",
    icon: Crown,
    color: "SIGNAL_RED",
    items: [
      { label: "Revenue Impact", value: "$450K ARR at risk", icon: DollarSign },
      { label: "Customer Exposure", value: "12 enterprise accounts", icon: Eye },
      { label: "Resolution ETA", value: "~45 minutes (based on similar)", icon: Clock },
      { label: "Board-Ready Brief", value: "Auto-generated summary", icon: FileText },
    ],
  },
];

const TIMELINE_EVENTS = [
  { time: "14:03:22", label: "Alert Triggered", icon: Bell, status: "critical" },
  { time: "14:03:24", label: "Services Identified", icon: Server, status: "processing" },
  { time: "14:03:27", label: "Impact Calculated", icon: DollarSign, status: "processing" },
  { time: "14:03:30", label: "Teams Notified", icon: Send, status: "active" },
  { time: "14:47:11", label: "Incident Resolved", icon: CheckCircle2, status: "resolved" },
  { time: "14:48:00", label: "Post-mortem Generated", icon: FileText, status: "complete" },
];

const INTEGRATIONS = [
  {
    name: "Datadog",
    description: "Ingest alerts, APM traces, and service maps for automatic blast radius detection.",
    icon: Activity,
    color: "#632CA6",
  },
  {
    name: "PagerDuty",
    description: "Sync on-call schedules, escalation policies, and incident state in real time.",
    icon: Bell,
    color: "#06AC38",
  },
  {
    name: "CloudWatch",
    description: "Pull AWS alarms, logs, and metrics to correlate infrastructure-level incidents.",
    icon: Database,
    color: "#FF9900",
  },
  {
    name: "Slack",
    description: "Deliver role-tailored incident briefs to the right channels, automatically.",
    icon: MessageSquare,
    color: "#4A154B",
  },
];

const STATS = [
  { value: "40%", label: "MTTR Reduction", icon: Timer },
  { value: "<60s", label: "Revenue Visibility", icon: DollarSign },
  { value: "Zero", label: "Customer Surprise", icon: Shield },
];

/* ─────────────────────────── Helpers ─────────────────────────── */

function PulseRing({ className }: { className?: string }) {
  return (
    <span className={cn("absolute rounded-full border-2 border-red-500/40 animate-ping", className)} />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400 mb-3">{children}</p>
  );
}

function SectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-heading-1 text-theme max-w-3xl", className)}>{children}</h2>
  );
}

function SectionSubheading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-body-lg text-theme-s max-w-2xl mt-4", className)}>{children}</p>
  );
}

/* ─────────────────────────── AI WORKFLOW ─────────────────────────── */

const SIGNAL_PIPELINE = [
  {
    id: "detect",
    icon: ScanLine,
    title: "Alert Detection",
    desc: "Ingest & de-duplicate alerts from all monitoring sources",
    detail: "SIGNAL ingests alerts from Datadog, PagerDuty, CloudWatch, and custom webhooks, correlating related alerts and de-duplicating noise in real-time.",
    metrics: ["Alert sources: 4", "Correlation window: 30s", "Noise reduction: 73%", "P1 detection: < 2s"],
    color: SIGNAL_RED,
  },
  {
    id: "map",
    icon: Network,
    title: "Service Mapping",
    desc: "Auto-discover blast radius across service topology",
    detail: "SIGNAL maintains a live service dependency graph and instantly identifies every upstream/downstream service in the blast radius of an incident.",
    metrics: ["Services scanned: 142", "Dependencies mapped: 380+", "Blast radius: 3 services", "Regions affected: 2"],
    color: SIGNAL_AMBER,
  },
  {
    id: "impact",
    icon: DollarSign,
    title: "Impact Calculation",
    desc: "Cross-reference affected services with customer data",
    detail: "Affected services are mapped to customer deployments, contract values, renewal timelines, and account tiers to compute real-time revenue exposure.",
    metrics: ["Accounts matched: 46", "ARR at risk: $450K", "Renewal < 30d: 3", "Enterprise affected: 12"],
    color: "SIGNAL_RED",
  },
  {
    id: "analyze",
    icon: Brain,
    title: "Root Cause AI",
    desc: "Pattern match against historical incidents",
    detail: "Machine learning models compare the current incident signature against historical patterns to suggest root cause, estimate resolution time, and recommend runbooks.",
    metrics: ["Historical matches: 4", "Confidence: 87%", "Est. resolution: 45m", "Runbook: DB Failover v2.1"],
    color: "#8B5CF6",
  },
  {
    id: "route",
    icon: Route,
    title: "Smart Routing",
    desc: "Tailored briefs delivered to the right teams",
    detail: "Each team receives a role-specific brief: technical depth for SRE, customer impact for CS, pipeline exposure for Sales, and executive summary for Leadership.",
    metrics: ["SRE brief: sent", "CS brief: sent", "Sales alert: sent", "Exec summary: sent"],
    color: "#3B82F6",
  },
  {
    id: "resolve",
    icon: Shield,
    title: "Resolution & Learn",
    desc: "Auto-generate post-mortem and retrain models",
    detail: "When resolved, SIGNAL auto-generates a structured post-mortem, updates the pattern library, and closes the loop with all notified teams.",
    metrics: ["Post-mortem: generated", "Model updated: yes", "Teams notified: 4", "MTTR saved: 40%"],
    color: "#0d9488",
  },
];

function SignalAIWorkflow({
  isVisible,
  registerRef,
}: {
  isVisible: (id: string) => boolean;
  registerRef: (id: string) => (el: HTMLDivElement | null) => void;
}) {
  const [activeStage, setActiveStage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay || !isVisible("ai-workflow")) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % SIGNAL_PIPELINE.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [autoPlay, isVisible]);

  const stage = SIGNAL_PIPELINE[activeStage];
  const StageIcon = stage.icon;

  return (
    <Section variant="sky" className="py-24 overflow-hidden">
      <div
        id="ai-workflow"
        ref={registerRef("ai-workflow")}
        className={cn(
          "transition-all duration-700",
          isVisible("ai-workflow") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
      >
        <div className="text-center mb-14">
          <SectionLabel>AI Workflow</SectionLabel>
          <SectionHeading className="mx-auto">
            Inside the <span className="text-red-400">incident intelligence engine</span>
          </SectionHeading>
          <SectionSubheading className="mx-auto">
            Follow an alert through SIGNAL&apos;s six-stage AI pipeline — from raw alert
            to full business-context delivery in under 10 seconds.
          </SectionSubheading>
        </div>

        {/* Pipeline timeline */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-5 left-[8%] right-[8%] h-0.5 bg-theme-subtle z-0 hidden md:block">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${(activeStage / (SIGNAL_PIPELINE.length - 1)) * 100}%`,
                  background: `linear-gradient(90deg, ${SIGNAL_RED}, ${SIGNAL_AMBER}, #3B82F6, #0d9488)`,
                }}
              />
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {SIGNAL_PIPELINE.map((s, i) => {
                const Icon = s.icon;
                const active = i === activeStage;
                const past = i < activeStage;
                return (
                  <button
                    key={s.id}
                    onClick={() => { setActiveStage(i); setAutoPlay(false); }}
                    className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <div
                      className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 border-2",
                        active ? "scale-110 shadow-lg" : past ? "opacity-70" : "opacity-40",
                      )}
                      style={{
                        borderColor: active ? s.color : past ? `${s.color}50` : "transparent",
                        backgroundColor: active ? `${s.color}20` : past ? `${s.color}08` : "rgba(128,128,128,0.06)",
                        boxShadow: active ? `0 0 20px ${s.color}25` : "none",
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: active || past ? s.color : "rgba(128,128,128,0.3)" }} />
                    </div>
                    <span className={cn(
                      "text-[10px] font-medium text-center hidden sm:block leading-tight",
                      active ? "text-theme" : "text-theme-m",
                    )}>
                      {s.title}
                    </span>
                    {active && (
                      <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full animate-ping" style={{ backgroundColor: s.color, opacity: 0.5 }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Stage Detail */}
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl border shadow-xl transition-all duration-500"
            style={{ borderColor: `${stage.color}20`, boxShadow: `0 8px 48px ${stage.color}08` }}
          >
            <div className="rounded-xl bg-theme-card">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left - Info */}
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

                  {/* Key metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    {stage.metrics.map((m, j) => {
                      const [label, value] = m.split(": ");
                      return (
                        <div
                          key={m}
                          className="rounded-lg border border-theme p-2"
                          style={{ animation: `signal-metric-pop 0.3s ease-out ${j * 60}ms both` }}
                        >
                          <div className="text-[10px] text-theme-m">{label}</div>
                          <div className="text-xs font-bold" style={{ color: stage.color }}>{value}</div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setAutoPlay(!autoPlay)}
                    className="mt-5 flex items-center gap-2 text-xs text-theme-m hover:text-theme-s transition-colors"
                  >
                    <div className={cn("h-2 w-2 rounded-full", autoPlay ? "animate-pulse bg-green-400" : "bg-gray-400")} />
                    {autoPlay ? "Auto-playing" : "Paused"} — click stages to explore
                  </button>
                </div>

                {/* Right - Visualization */}
                <div className="p-6 lg:p-8 flex flex-col justify-center min-h-[300px]">
                  {activeStage === 0 && <SignalDetectVisual />}
                  {activeStage === 1 && <SignalMapVisual />}
                  {activeStage === 2 && <SignalImpactVisual />}
                  {activeStage === 3 && <SignalRootCauseVisual />}
                  {activeStage === 4 && <SignalRouteVisual />}
                  {activeStage === 5 && <SignalResolveVisual />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
          {[
            { label: "Alert to context", value: "< 8 sec", color: SIGNAL_RED },
            { label: "Alert noise reduced", value: "73%" },
            { label: "Root cause accuracy", value: "87%" },
            { label: "MTTR improvement", value: "40%" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center rounded-xl border border-theme bg-theme-card p-4 text-center">
              <div className="text-sm font-bold" style={{ color: stat.color || SIGNAL_RED }}>{stat.value}</div>
              <div className="text-[11px] text-theme-m mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes signal-metric-pop {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </Section>
  );
}

/* ── Signal Visual: Alert Detection ── */
function SignalDetectVisual() {
  const alerts = [
    { source: "Datadog", msg: "API Gateway latency > 5s", sev: "critical", time: "14:03:22" },
    { source: "CloudWatch", msg: "HTTP 503 spike — us-east-1", sev: "critical", time: "14:03:23" },
    { source: "PagerDuty", msg: "Auto-escalation triggered", sev: "warning", time: "14:03:24" },
    { source: "Datadog", msg: "auth-service error rate 45%", sev: "warning", time: "14:03:25" },
    { source: "Custom", msg: "billing-api timeout cluster", sev: "critical", time: "14:03:26" },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
        <span className="text-xs font-mono text-theme-m">Ingesting alerts… correlating duplicates</span>
      </div>
      {alerts.map((a, i) => {
        const sevColor = a.sev === "critical" ? SIGNAL_RED : SIGNAL_AMBER;
        return (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-theme p-2"
            style={{ animation: `signal-alert-in 0.4s ease-out ${i * 100}ms both` }}
          >
            <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: sevColor }} />
            <span className="text-[10px] font-mono text-theme-m w-12">{a.time}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: `${sevColor}15`, color: sevColor }}>{a.source}</span>
            <span className="text-[11px] text-theme-s truncate flex-1">{a.msg}</span>
            {i < 2 && <span className="text-[9px] px-1 py-0.5 rounded bg-red-500/10 text-red-400 flex-shrink-0">correlated</span>}
          </div>
        );
      })}
      <div className="mt-3 rounded-lg p-2 text-center" style={{ backgroundColor: `${SIGNAL_RED}08`, border: `1px solid ${SIGNAL_RED}20` }}>
        <span className="text-[11px] text-theme-s">5 alerts → <strong className="text-red-400">1 incident</strong> (3 correlated, 73% noise reduced)</span>
      </div>
      <style jsx>{`
        @keyframes signal-alert-in {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Signal Visual: Service Mapping ── */
function SignalMapVisual() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 self-start mb-4">
        <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Mapping blast radius…</span>
      </div>
      <svg width="280" height="220" viewBox="0 0 280 220" className="overflow-visible">
        {/* Service nodes */}
        {[
          { x: 140, y: 30, name: "api-gw", affected: true },
          { x: 60, y: 100, name: "auth", affected: true },
          { x: 220, y: 100, name: "billing", affected: true },
          { x: 30, y: 180, name: "users-db", affected: false },
          { x: 140, y: 180, name: "payments", affected: false },
          { x: 250, y: 180, name: "analytics", affected: false },
        ].map((node, i) => (
          <g key={node.name}>
            {/* Connections */}
            {i === 1 && <line x1={140} y1={46} x2={60} y2={84} stroke={node.affected ? `${SIGNAL_RED}60` : "rgba(128,128,128,0.2)"} strokeWidth="1.5" strokeDasharray={node.affected ? "none" : "4 4"} />}
            {i === 2 && <line x1={140} y1={46} x2={220} y2={84} stroke={node.affected ? `${SIGNAL_RED}60` : "rgba(128,128,128,0.2)"} strokeWidth="1.5" />}
            {i === 3 && <line x1={60} y1={116} x2={30} y2={164} stroke="rgba(128,128,128,0.2)" strokeWidth="1" strokeDasharray="4 4" />}
            {i === 4 && <line x1={220} y1={116} x2={140} y2={164} stroke="rgba(128,128,128,0.2)" strokeWidth="1" strokeDasharray="4 4" />}
            {i === 5 && <line x1={220} y1={116} x2={250} y2={164} stroke="rgba(128,128,128,0.2)" strokeWidth="1" strokeDasharray="4 4" />}

            {/* Pulse ring for affected */}
            {node.affected && (
              <circle cx={node.x} cy={node.y} r="22" fill="none" stroke={SIGNAL_RED} strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="18;26;18" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            )}
            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r="16"
              fill={node.affected ? `${SIGNAL_RED}20` : "rgba(128,128,128,0.08)"}
              stroke={node.affected ? SIGNAL_RED : "rgba(128,128,128,0.2)"}
              strokeWidth="1.5"
            />
            {/* Label */}
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              className="text-[9px] fill-current font-mono"
              style={{ color: node.affected ? SIGNAL_RED : "rgba(128,128,128,0.5)" }}
            >
              {node.name}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex items-center gap-4 mt-2 text-[10px] text-theme-m">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: SIGNAL_RED }} /> Affected</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-gray-400/30" /> Healthy</span>
      </div>
    </div>
  );
}

/* ── Signal Visual: Impact Calculation ── */
function SignalImpactVisual() {
  const accounts = [
    { name: "Acme Corp", arr: 120, risk: 92, renewal: "32d", tier: "Enterprise" },
    { name: "TechFlow", arr: 95, risk: 78, renewal: "89d", tier: "Enterprise" },
    { name: "DataBridge", arr: 80, risk: 95, renewal: "14d", tier: "Enterprise" },
    { name: "CloudNova", arr: 65, risk: 61, renewal: "121d", tier: "Pro" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Calculating revenue exposure…</span>
      </div>
      <div className="rounded-lg border border-theme overflow-hidden">
        <div className="grid grid-cols-[1fr_60px_50px_50px] gap-1 px-3 py-2 border-b border-theme bg-theme-subtle/30 text-[10px] font-bold text-theme-m uppercase tracking-wider">
          <span>Account</span><span className="text-right">ARR</span><span className="text-center">Risk</span><span className="text-center">Renew</span>
        </div>
        {accounts.map((a, i) => {
          const riskColor = a.risk >= 90 ? SIGNAL_RED : a.risk >= 70 ? SIGNAL_AMBER : "#f59e0b";
          return (
            <div
              key={a.name}
              className="grid grid-cols-[1fr_60px_50px_50px] gap-1 px-3 py-2 border-b last:border-0 border-theme items-center"
              style={{ animation: `signal-row-in 0.4s ease-out ${i * 80}ms both` }}
            >
              <div>
                <span className="text-xs text-theme font-medium">{a.name}</span>
                <span className="text-[9px] text-theme-m ml-1">{a.tier}</span>
              </div>
              <span className="text-xs text-theme-s text-right font-mono">${a.arr}K</span>
              <div className="flex justify-center">
                <span className="text-[10px] font-bold" style={{ color: riskColor }}>{a.risk}%</span>
              </div>
              <span className={cn("text-[10px] text-center", parseInt(a.renewal) < 30 ? "text-red-400 font-bold" : "text-theme-m")}>{a.renewal}</span>
            </div>
          );
        })}
      </div>
      <div className="rounded-lg p-3 text-center" style={{ backgroundColor: `${SIGNAL_RED}08`, border: `1px solid ${SIGNAL_RED}20` }}>
        <span className="text-sm font-bold text-red-400">$450K ARR at risk</span>
        <span className="text-[11px] text-theme-m ml-2">across 12 enterprise accounts</span>
      </div>
      <style jsx>{`
        @keyframes signal-row-in {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Signal Visual: Root Cause AI ── */
function SignalRootCauseVisual() {
  const matches = [
    { id: "INC-2847", cause: "Connection pool exhaustion", similarity: 92, resolved: "38 min" },
    { id: "INC-2103", cause: "DB connection limit", similarity: 78, resolved: "52 min" },
    { id: "INC-1956", cause: "Memory leak in auth-svc", similarity: 65, resolved: "1h 20m" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Pattern matching against 2,847 historical incidents…</span>
      </div>
      {/* Best match */}
      <div className="rounded-lg border-2 p-3" style={{ borderColor: "#8B5CF660", backgroundColor: "#8B5CF608" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold" style={{ color: "#8B5CF6" }}>Best Match — 92% confidence</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-bold">RECOMMENDED</span>
        </div>
        <p className="text-sm font-semibold text-theme">Connection pool exhaustion</p>
        <p className="text-[11px] text-theme-m mt-1">Runbook: DB Failover v2.1 — auto-attached to incident channel</p>
        <div className="flex items-center gap-3 mt-2 text-[10px] text-theme-m">
          <span>Avg resolution: <strong className="text-theme-s">38 min</strong></span>
          <span>Last seen: <strong className="text-theme-s">12 days ago</strong></span>
        </div>
      </div>
      {/* Other matches */}
      {matches.slice(1).map((m, i) => (
        <div key={m.id} className="flex items-center gap-3 rounded-lg border border-theme p-2.5" style={{ animation: `signal-match-in 0.4s ease-out ${i * 100 + 200}ms both` }}>
          <span className="text-[10px] font-mono text-theme-m">{m.id}</span>
          <span className="text-[11px] text-theme-s flex-1">{m.cause}</span>
          <span className="text-[10px] font-bold" style={{ color: m.similarity >= 75 ? "#8B5CF6" : "rgba(128,128,128,0.6)" }}>{m.similarity}%</span>
          <span className="text-[10px] text-theme-m">{m.resolved}</span>
        </div>
      ))}
      <style jsx>{`
        @keyframes signal-match-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Signal Visual: Smart Routing ── */
function SignalRouteVisual() {
  const briefs = [
    { team: "SRE / DevOps", icon: Server, color: SIGNAL_AMBER, detail: "Root cause + runbook + blast radius map", status: "Delivered" },
    { team: "Customer Success", icon: Headphones, color: "#8B5CF6", detail: "Affected accounts + talking points + status template", status: "Delivered" },
    { team: "Sales", icon: Briefcase, color: "#3B82F6", detail: "Pipeline exposure + hold recommendations", status: "Delivered" },
    { team: "Leadership", icon: Crown, color: "SIGNAL_RED", detail: "Revenue impact + ETA + board-ready brief", status: "Delivered" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Routing context to 4 teams…</span>
      </div>
      {briefs.map((b, i) => {
        const Icon = b.icon;
        return (
          <div
            key={b.team}
            className="flex items-center gap-3 rounded-lg border border-theme p-3"
            style={{ animation: `signal-route-in 0.4s ease-out ${i * 100}ms both` }}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${b.color}12` }}>
              <Icon className="h-4 w-4" style={{ color: b.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-theme">{b.team}</div>
              <div className="text-[10px] text-theme-m truncate">{b.detail}</div>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 font-medium flex-shrink-0">
              {b.status}
            </span>
          </div>
        );
      })}
      <style jsx>{`
        @keyframes signal-route-in {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Signal Visual: Resolution & Learn ── */
function SignalResolveVisual() {
  const steps = [
    { label: "Incident resolved", time: "14:47:11", done: true },
    { label: "Post-mortem generated", time: "14:48:00", done: true },
    { label: "Pattern library updated", time: "14:48:02", done: true },
    { label: "All teams notified of resolution", time: "14:48:05", done: true },
    { label: "Model retrained with new data", time: "14:49:00", done: true },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Incident closed — learning cycle active</span>
      </div>
      {/* Timeline */}
      <div className="relative pl-4">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-green-400/30" />
        {steps.map((s, i) => (
          <div
            key={s.label}
            className="relative flex items-center gap-3 py-2"
            style={{ animation: `signal-resolve-in 0.4s ease-out ${i * 100}ms both` }}
          >
            <div className="absolute left-[-8px] h-3.5 w-3.5 rounded-full border-2 border-green-400 bg-theme-card z-10" />
            <span className="text-[10px] font-mono text-theme-m w-16 ml-4">{s.time}</span>
            <span className="text-[11px] text-theme-s">{s.label}</span>
            <CheckCircle2 className="h-3 w-3 text-green-400 ml-auto flex-shrink-0" />
          </div>
        ))}
      </div>
      {/* Summary */}
      <div className="rounded-lg p-3 mt-2" style={{ backgroundColor: "rgba(18,255,128,0.06)", border: "1px solid rgba(18,255,128,0.2)" }}>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-400" />
          <span className="text-xs font-semibold text-green-400">Feedback Loop Complete</span>
        </div>
        <p className="text-[11px] text-theme-m mt-1">Incident resolved in 44 min (40% faster than avg). Pattern added to knowledge base.</p>
      </div>
      <style jsx>{`
        @keyframes signal-resolve-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function SignalProductPage() {
  const [activeTab, setActiveTab] = useState("sre");
  const [pulseActive, setPulseActive] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  /* Pulse interval for hero */
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive(false);
      setTimeout(() => setPulseActive(true), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);
  const registerRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el;
  };

  const currentTab = DASHBOARD_TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="relative overflow-hidden">
      {/* ═══════════════ HERO ═══════════════ */}
      <Section
        variant="premium"
        className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 pb-24"
      >
        <ProductHeroAtmosphere variant="signal" />
        <div
          className="product-hero-gradient z-[1]"
          style={
            {
              "--hero-gradient": productBrand.signal.heroGradient,
              "--hero-gradient-secondary": productBrand.signal.heroGradientSecondary,
            } as React.CSSProperties
          }
        />
        <div className="pointer-events-none absolute inset-0 z-[1] fine-grid" />
        <div className="pointer-events-none absolute inset-0 z-[1] noise-overlay" />

        {/* Animated scan line */}
        <div
          className="pointer-events-none absolute left-0 right-0 h-px opacity-20 z-[1]"
          style={{
            background: `linear-gradient(90deg, transparent, ${SIGNAL_RED}, transparent)`,
            animation: "scanLine 4s ease-in-out infinite",
            top: "30%",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center gap-8">
          {/* Status badge */}
          <div className="flex items-center gap-3">
            <Chip dotColor={SIGNAL_RED} className="border border-red-500/20 bg-red-500/10 text-red-300 backdrop-blur-sm">
              Available now · add-on
            </Chip>
            <span className="enterprise-badge">
              <Shield className="h-3 w-3" />
              Enterprise Ready
            </span>
          </div>

          {/* Pulsing alert icon */}
          <div className="relative flex items-center justify-center w-20 h-20">
            {pulseActive && (
              <>
                <PulseRing className="w-20 h-20 -inset-0" />
                <PulseRing className="w-16 h-16 inset-2 animation-delay-300" />
              </>
            )}
            <div
              className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl"
              style={{ background: SIGNAL_RED }}
            >
              <Radio className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-display-1 text-theme">
              <span className="text-red-400">SIGNAL</span>
            </h1>
            <p className="text-heading-2 text-theme-s font-normal">Incident Intelligence</p>
          </div>

          <p className="text-body-lg text-theme-s max-w-xl">
            Translate every incident into revenue impact. Give SRE, CS, Sales, and Leadership
            the right context at the right time -- so no customer is ever surprised.
          </p>

          {/* Audience chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {["SRE / DevOps", "VP Engineering", "CTO"].map((role) => (
              <Chip key={role} className="border border-theme bg-theme-subtle text-theme-s text-xs">
                {role}
              </Chip>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white border-0" asChild>
              <Link href={buildProductCheckoutUrl({ product: "signal", plan: "pro" })} className="flex items-center gap-2">
                Start 14-day trial <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/pricing" className="flex items-center gap-2">
                View pricing <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Hero incident mockup */}
          <div className="mt-12 w-full max-w-3xl">
            <Card
              variant="light"
              className="border-red-500/20 bg-black/40 backdrop-blur-sm p-0 overflow-hidden"
            >
              {/* Mockup header bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-red-500/10 bg-red-500/5">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  <span className="text-sm font-semibold text-red-300">P1 -- API Gateway Timeout</span>
                </div>
                <span className="text-xs text-theme-m font-mono">14:03:22 UTC</span>
              </div>

              {/* Mockup body */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-red-500/10">
                {[
                  { label: "Services Affected", value: "3", sub: "api-gw, auth, billing" },
                  { label: "ARR at Risk", value: "$450K", sub: "12 enterprise accounts" },
                  { label: "Est. Resolution", value: "~45 min", sub: "based on similar incidents" },
                ].map((item) => (
                  <div key={item.label} className="bg-black/60 px-5 py-4">
                    <p className="text-xs text-theme-m uppercase tracking-wider">{item.label}</p>
                    <p className="text-heading-2 text-theme mt-1">{item.value}</p>
                    <p className="text-xs text-theme-m mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ═══════════════ PROBLEM ═══════════════ */}
      <Section variant="sky" className="py-24">
        <div
          id="problem"
          ref={registerRef("problem")}
          className={cn(
            "transition-all duration-700",
            isVisible("problem") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <SectionLabel>The Problem</SectionLabel>
            <SectionHeading className="mx-auto">
              When an incident hits, everyone scrambles differently
            </SectionHeading>
            <SectionSubheading className="mx-auto">
              Your monitoring tools see the technical failure. But nobody sees the business impact until
              it is too late. Teams operate in silos, customers get surprised, and revenue bleeds silently.
            </SectionSubheading>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROBLEM_ROLES.map((r, i) => (
              <Card
                key={r.role}
                variant="light"
                className={cn(
                  "relative overflow-hidden transition-all duration-500",
                  isVisible("problem") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: r.color }}
                />
                <div className="flex flex-col gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{ background: `${r.color}15` }}
                  >
                    <r.icon className="w-5 h-5" style={{ color: r.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-theme">{r.role}</p>
                    <p className="text-sm text-theme-s mt-1">{r.sees}</p>
                  </div>
                  <div className="pt-3 border-t border-theme">
                    <p className="text-xs text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3" />
                      {r.pain}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Connecting arrow */}
          <div className="flex flex-col items-center mt-12 gap-3">
            <ArrowDown className="w-5 h-5 text-red-400 animate-bounce" />
            <p className="text-sm text-theme-m text-center max-w-md">
              Result: Slow response, surprised customers, invisible revenue impact, and
              post-mortems that don&apos;t prevent the next one.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════ INCIDENT INTELLIGENCE FLOW ═══════════════ */}
      <Section variant="rose" className="py-24" id="how-it-works">
        <div
          id="intelligence"
          ref={registerRef("intelligence")}
          className={cn(
            "transition-all duration-700",
            isVisible("intelligence") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <SectionLabel>Incident Intelligence</SectionLabel>
            <SectionHeading className="mx-auto">
              From alert to business impact in seconds
            </SectionHeading>
            <SectionSubheading className="mx-auto">
              SIGNAL ingests your alerts, maps them to your service topology, calculates revenue exposure,
              and routes tailored context to every team -- automatically.
            </SectionSubheading>
          </div>

          {/* Flow visualization */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent -translate-y-1/2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {INTELLIGENCE_STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className={cn(
                    "relative transition-all duration-600",
                    isVisible("intelligence") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  )}
                  style={{ transitionDelay: `${i * 150 + 200}ms` }}
                >
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold text-white"
                      style={{ background: SIGNAL_RED }}
                    >
                      {i + 1}
                    </span>
                    {i < INTELLIGENCE_STEPS.length - 1 && (
                      <div className="hidden lg:block flex-1 h-px bg-red-500/20" />
                    )}
                  </div>

                  <Card variant="light" className="border-red-500/10 hover:border-red-500/25 h-full">
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                      style={{ background: SIGNAL_RED_LIGHT }}
                    >
                      <step.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-heading-3 text-theme mb-2">{step.title}</h3>
                    <p className="text-sm text-theme-s leading-relaxed">{step.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ AI WORKFLOW PIPELINE ═══════════════ */}
      <SignalAIWorkflow
        isVisible={isVisible}
        registerRef={registerRef}
      />

      {/* ═══════════════ SMART ROUTING DASHBOARD ═══════════════ */}
      <Section variant="sky" className="py-24">
        <div
          id="dashboard"
          ref={registerRef("dashboard")}
          className={cn(
            "transition-all duration-700",
            isVisible("dashboard") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-12">
            <SectionLabel>Smart Routing</SectionLabel>
            <SectionHeading className="mx-auto">
              One incident, four tailored dashboards
            </SectionHeading>
            <SectionSubheading className="mx-auto">
              Every team sees exactly what they need. No noise. No digging. Just the right
              context to act fast.
            </SectionSubheading>
          </div>

          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {DASHBOARD_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
                    isActive
                      ? "text-white shadow-lg"
                      : "bg-theme-subtle text-theme-s hover:text-theme hover:bg-theme-card",
                  )}
                  style={isActive ? { background: tab.color } : undefined}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Dashboard mock */}
          <Card variant="light" className="border-theme overflow-hidden p-0 max-w-4xl mx-auto">
            {/* Dashboard header */}
            <div
              className="flex items-center gap-3 px-6 py-4 border-b border-theme"
              style={{ background: `${currentTab.color}08` }}
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ background: `${currentTab.color}20` }}
              >
                <currentTab.icon className="w-4 h-4" style={{ color: currentTab.color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-theme">{currentTab.label} View</p>
                <p className="text-xs text-theme-m">P1 -- API Gateway Timeout</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: currentTab.color }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: currentTab.color }} />
                </span>
                <span className="text-xs text-theme-m">Live</span>
              </div>
            </div>

            {/* Dashboard grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-theme-subtle/50">
              {currentTab.items.map((item) => (
                <div
                  key={item.label}
                  className="bg-theme-card px-6 py-5 flex items-start gap-4 transition-all duration-300"
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg mt-0.5"
                    style={{ background: `${currentTab.color}12` }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: currentTab.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-theme-m uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-semibold text-theme mt-1">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* ═══════════════ INCIDENT TIMELINE ═══════════════ */}
      <Section variant="rose" className="py-24">
        <div
          id="timeline"
          ref={registerRef("timeline")}
          className={cn(
            "transition-all duration-700",
            isVisible("timeline") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <SectionLabel>Incident Lifecycle</SectionLabel>
            <SectionHeading className="mx-auto">
              Every second is tracked, every action logged
            </SectionHeading>
            <SectionSubheading className="mx-auto">
              From the first alert to auto-generated post-mortem, SIGNAL captures the full
              incident lifecycle with precise timing.
            </SectionSubheading>
          </div>

          {/* Horizontal timeline */}
          <div className="relative overflow-x-auto pb-4">
            <div className="flex items-start gap-0 min-w-[800px] px-4">
              {TIMELINE_EVENTS.map((event, i) => {
                const statusColors: Record<string, string> = {
                  critical: SIGNAL_RED,
                  processing: SIGNAL_AMBER,
                  active: "#3B82F6",
                  resolved: "#22C55E",
                  complete: "#0d9488",
                };
                const dotColor = statusColors[event.status] || SIGNAL_RED;
                const isLast = i === TIMELINE_EVENTS.length - 1;

                return (
                  <div
                    key={event.label}
                    className={cn(
                      "flex-1 relative transition-all duration-500",
                      isVisible("timeline") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                    )}
                    style={{ transitionDelay: `${i * 120 + 200}ms` }}
                  >
                    {/* Connector line */}
                    {!isLast && (
                      <div
                        className="absolute top-5 left-[calc(50%+16px)] right-0 h-px"
                        style={{
                          background: `linear-gradient(90deg, ${dotColor}60, ${
                            statusColors[TIMELINE_EVENTS[i + 1]?.status] || SIGNAL_RED
                          }60)`,
                        }}
                      />
                    )}

                    <div className="flex flex-col items-center text-center px-2">
                      {/* Dot */}
                      <div className="relative mb-3">
                        {event.status === "critical" && (
                          <span
                            className="absolute -inset-2 rounded-full animate-ping opacity-30"
                            style={{ background: dotColor }}
                          />
                        )}
                        <div
                          className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2"
                          style={{ borderColor: dotColor, background: `${dotColor}15` }}
                        >
                          <event.icon className="w-4 h-4" style={{ color: dotColor }} />
                        </div>
                      </div>

                      {/* Label */}
                      <p className="text-sm font-semibold text-theme mb-1">{event.label}</p>
                      <p className="text-xs font-mono text-theme-m">{event.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time saved callout */}
          <div className="flex justify-center mt-10">
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border"
              style={{ borderColor: `${SIGNAL_RED}30`, background: `${SIGNAL_RED}08` }}
            >
              <Zap className="w-4 h-4 text-red-400" />
              <span className="text-sm text-theme-s">
                Total time from alert to full business context:{" "}
                <span className="font-semibold text-theme">8 seconds</span>
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ REVENUE IMPACT TRANSLATION ═══════════════ */}
      <Section variant="sky" className="py-24">
        <div
          id="revenue"
          ref={registerRef("revenue")}
          className={cn(
            "transition-all duration-700",
            isVisible("revenue") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-12">
            <SectionLabel>Revenue Translation</SectionLabel>
            <SectionHeading className="mx-auto">
              See the dollar sign behind every incident
            </SectionHeading>
            <SectionSubheading className="mx-auto">
              SIGNAL converts technical severity into business language everyone understands.
            </SectionSubheading>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card variant="light" className="border-theme overflow-hidden p-0">
              {/* Translation header */}
              <div className="flex flex-col sm:flex-row items-stretch">
                {/* Left: Incident */}
                <div className="flex-1 p-8 flex flex-col justify-center items-center text-center border-b sm:border-b-0 sm:border-r border-theme">
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                    style={{ background: SIGNAL_RED_LIGHT }}
                  >
                    <AlertTriangle className="w-7 h-7 text-red-400" />
                  </div>
                  <p className="text-xs text-theme-m uppercase tracking-wider mb-1">Incident</p>
                  <p className="text-heading-2 text-theme">P1 Severity</p>
                  <p className="text-sm text-theme-s mt-1">API Gateway Timeout</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center px-4 py-3 sm:py-0">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ background: SIGNAL_RED_LIGHT }}
                  >
                    <ArrowRight className="w-5 h-5 text-red-400" />
                  </div>
                </div>

                {/* Right: Impact */}
                <div className="flex-1 p-8 flex flex-col justify-center items-center text-center">
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                    style={{ background: "rgba(239,68,68,0.08)" }}
                  >
                    <DollarSign className="w-7 h-7 text-red-400" />
                  </div>
                  <p className="text-xs text-theme-m uppercase tracking-wider mb-1">Business Impact</p>
                  <p className="text-heading-2 text-red-400">$450K ARR at Risk</p>
                  <p className="text-sm text-theme-s mt-1">Across 12 enterprise accounts</p>
                </div>
              </div>

              {/* Breakdown bars */}
              <div className="border-t border-theme px-8 py-6">
                <p className="text-xs text-theme-m uppercase tracking-wider mb-4">Impact Breakdown</p>
                <div className="space-y-4">
                  {[
                    { account: "Acme Corp", arr: "$120K", pct: 72, tier: "Enterprise", renewal: "32 days" },
                    { account: "TechFlow Inc", arr: "$95K", pct: 57, tier: "Enterprise", renewal: "89 days" },
                    { account: "DataBridge", arr: "$80K", pct: 48, tier: "Enterprise", renewal: "14 days" },
                    { account: "CloudNova", arr: "$65K", pct: 39, tier: "Pro", renewal: "121 days" },
                    { account: "+8 others", arr: "$90K", pct: 54, tier: "Mixed", renewal: "Various" },
                  ].map((row) => (
                    <div key={row.account} className="flex items-center gap-4">
                      <div className="w-28 sm:w-32 flex-shrink-0">
                        <p className="text-sm font-medium text-theme truncate">{row.account}</p>
                      </div>
                      <div className="flex-1 h-2 rounded-full bg-theme-subtle overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: isVisible("revenue") ? `${row.pct}%` : "0%",
                            background: `linear-gradient(90deg, ${SIGNAL_RED}, ${SIGNAL_RED}99)`,
                          }}
                        />
                      </div>
                      <div className="w-16 text-right flex-shrink-0">
                        <p className="text-sm font-semibold text-theme">{row.arr}</p>
                      </div>
                      <div className="hidden sm:block w-20 text-right flex-shrink-0">
                        <p className="text-xs text-theme-m">{row.tier}</p>
                      </div>
                      <div className="hidden md:block w-24 text-right flex-shrink-0">
                        <p
                          className={cn(
                            "text-xs",
                            parseInt(row.renewal) < 30 ? "text-red-400 font-semibold" : "text-theme-m",
                          )}
                        >
                          {parseInt(row.renewal) < 30 ? `Renews in ${row.renewal}` : `${row.renewal}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ═══════════════ INTEGRATIONS ═══════════════ */}
      <Section variant="rose" className="py-24">
        <div
          id="integrations"
          ref={registerRef("integrations")}
          className={cn(
            "transition-all duration-700",
            isVisible("integrations") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-12">
            <SectionLabel>Integrations</SectionLabel>
            <SectionHeading className="mx-auto">
              Plugs into the tools you already use
            </SectionHeading>
            <SectionSubheading className="mx-auto">
              SIGNAL connects to your monitoring, alerting, and communication stack
              with zero-config setup.
            </SectionSubheading>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {INTEGRATIONS.map((int, i) => (
              <Card
                key={int.name}
                variant="light"
                className={cn(
                  "border-theme hover:border-red-500/20 transition-all duration-500 group",
                  isVisible("integrations") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${int.color}15` }}
                >
                  <int.icon className="w-6 h-6" style={{ color: int.color }} />
                </div>
                <h3 className="text-heading-3 text-theme mb-2">{int.name}</h3>
                <p className="text-sm text-theme-s leading-relaxed">{int.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════ STATS ═══════════════ */}
      <Section variant="sky" className="py-24">
        <div
          id="stats"
          ref={registerRef("stats")}
          className={cn(
            "transition-all duration-700",
            isVisible("stats") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-12">
            <SectionLabel>By the Numbers</SectionLabel>
            <SectionHeading className="mx-auto">
              Incident response, transformed
            </SectionHeading>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {STATS.map((stat, i) => (
              <Card
                key={stat.label}
                variant="light"
                className={cn(
                  "text-center border-theme hover:border-red-500/20 transition-all duration-500",
                  isVisible("stats") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
                style={{ transitionDelay: `${i * 120 + 200}ms` }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-4"
                  style={{ background: SIGNAL_RED_LIGHT }}
                >
                  <stat.icon className="w-6 h-6 text-red-400" />
                </div>
                <p className="text-display-2 text-red-400 leading-none">{stat.value}</p>
                <p className="text-sm text-theme-s mt-3 uppercase tracking-wider">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════ PRICING PREVIEW ═══════════════ */}
      <Section variant="rose" className="py-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <div className="text-center sm:text-left">
            <p className="text-xs text-theme-m uppercase tracking-wider">Starting at</p>
            <p className="text-heading-1 text-theme">
              $15<span className="text-heading-3 text-theme-s font-normal">/seat/mo</span>
            </p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-theme-subtle" />
          <div className="text-center sm:text-left max-w-xs">
            <p className="text-sm text-theme-s leading-relaxed">
              Includes unlimited incidents, all integrations, role-based dashboards, and
              auto-generated post-mortems. Volume pricing available.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════ EARLY ACCESS CTA ═══════════════ */}
      <Section variant="sky" className="py-24">
        <div
          id="cta"
          ref={registerRef("cta")}
          className={cn(
            "transition-all duration-700",
            isVisible("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <Card
            variant="light"
            className="relative overflow-hidden border-red-500/15 max-w-3xl mx-auto text-center px-8 py-16"
          >
            {/* Glow background */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, ${SIGNAL_RED_GLOW}, transparent 70%)`,
                opacity: 0.3,
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-2xl"
                style={{ background: SIGNAL_RED }}
              >
                <Radio className="w-7 h-7 text-white" />
              </div>

              <div>
                <h2 className="text-heading-1 text-theme mb-3">
                  Add SIGNAL to your stack
                </h2>
                <p className="text-body-lg text-theme-s max-w-lg mx-auto">
                  Revenue-aware incident intelligence is available as a subscription add-on. Start
                  a 14-day trial and check out on the next screen—same flow as the rest of Voatomy.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white border-0" asChild>
                  <Link href={buildProductCheckoutUrl({ product: "signal", plan: "pro" })} className="flex items-center gap-2">
                    Start 14-day trial <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link href={buildProductCheckoutUrl({ product: "signal", plan: "business" })} className="flex items-center gap-2">
                    Business checkout
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-theme-m mt-4">
                Card collected after trial. Enterprise (SSO, dedicated support) via{" "}
                <Link href="/contact?plan=enterprise" className="text-brand underline-offset-2 hover:underline">
                  contact sales
                </Link>
                .
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* ═══════════════ GLOBAL STYLES ═══════════════ */}
      <style jsx>{`
        @keyframes scanLine {
          0%,
          100% {
            transform: translateY(-200px);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          50% {
            transform: translateY(400px);
            opacity: 0.15;
          }
          90% {
            opacity: 0;
          }
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
}

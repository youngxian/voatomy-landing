"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import { buildProductCheckoutUrl } from "@/lib/product-purchase";
import { NexusIllustration } from "@/components/illustrations/product-illustrations";
import {
  Search,
  Shield,
  Users,
  Globe,
  Lock,
  Activity,
  ArrowRight,
  GitBranch,
  MessageSquare,
  AlertTriangle,
  Palette,
  TrendingUp,
  Server,
  FileCheck,
  Clock,
  ChevronRight,
  Sparkles,
  Network,
  Eye,
  Target,
  LineChart,
  Gauge,
  ShieldCheck,
  KeyRound,
  Database,
  Headphones,
  FileText,
  Building2,
} from "lucide-react";

/* ─────────────────────── constants ─────────────────────── */

const PRODUCT_COLORS = {
  atlas: "#F97316",
  loop: "#6366F1",
  phantom: "#06B6D4",
  signal: "#EF4444",
  drift: "#A855F7",
  nexus: "#10B981",
};

const PRODUCTS = [
  {
    name: "ATLAS",
    tagline: "Sprint Intelligence Engine",
    icon: GitBranch,
    color: PRODUCT_COLORS.atlas,
    description: "AI-powered sprint planning that understands code complexity, team velocity, and business priority.",
  },
  {
    name: "LOOP",
    tagline: "Revenue Feedback Engine",
    icon: MessageSquare,
    color: PRODUCT_COLORS.loop,
    description: "Close the loop between customer feedback, revenue signals, and product decisions.",
  },
  {
    name: "PHANTOM",
    tagline: "Tech Debt Intelligence",
    icon: AlertTriangle,
    color: PRODUCT_COLORS.phantom,
    description: "Surface hidden tech debt, quantify its cost, and prioritize remediation automatically.",
  },
  {
    name: "SIGNAL",
    tagline: "Incident Intelligence",
    icon: Activity,
    color: PRODUCT_COLORS.signal,
    description: "Revenue-aware incident management that correlates outages with business impact in real time.",
  },
  {
    name: "DRIFT",
    tagline: "Design Sync Engine",
    icon: Palette,
    color: PRODUCT_COLORS.drift,
    description: "Keep design systems, code components, and product specs in perfect alignment.",
  },
];

const UNIFIED_QUERY_RESULTS = [
  {
    product: "LOOP",
    color: PRODUCT_COLORS.loop,
    icon: MessageSquare,
    label: "Feature Request",
    value: "$2.3M pipeline",
    detail: "47 enterprise accounts requesting Auth SSO",
  },
  {
    product: "ATLAS",
    color: PRODUCT_COLORS.atlas,
    icon: GitBranch,
    label: "Sprint Ticket",
    value: "Sprint 26",
    detail: "AUTH-1847 assigned to Platform team, 13pt estimate",
  },
  {
    product: "PHANTOM",
    color: PRODUCT_COLORS.phantom,
    icon: AlertTriangle,
    label: "Tech Debt",
    value: "2.3x overhead",
    detail: "Legacy auth module adds 2.3x to all auth-related work",
  },
  {
    product: "SIGNAL",
    color: PRODUCT_COLORS.signal,
    icon: Activity,
    label: "Incident",
    value: "P2 Active",
    detail: "SSO callback timeout affecting 12% of enterprise logins",
  },
  {
    product: "DRIFT",
    color: PRODUCT_COLORS.drift,
    icon: Palette,
    label: "Component",
    value: "92% adoption",
    detail: "AuthModal component used across 23 of 25 surfaces",
  },
];

const EXECUTIVE_METRICS = [
  { label: "Org Health Score", value: "87", suffix: "/100", color: "#10B981", icon: Gauge },
  { label: "Revenue Pipeline", value: "$14.2M", suffix: " aligned", color: "#6366F1", icon: TrendingUp },
  { label: "Delivery Velocity", value: "94%", suffix: " on-track", color: "#F97316", icon: Activity },
  { label: "Debt Ratio", value: "1.4x", suffix: " trending down", color: "#06B6D4", icon: LineChart },
  { label: "Design Coverage", value: "96%", suffix: " synced", color: "#A855F7", icon: Eye },
  { label: "Incident MTTR", value: "18min", suffix: " avg", color: "#EF4444", icon: Clock },
];

const ROLES = [
  {
    title: "CTO",
    subtitle: "Technology Strategy",
    icon: Building2,
    color: PRODUCT_COLORS.nexus,
    insights: [
      "Unified tech health across all teams",
      "Debt-to-velocity ratio trending",
      "Architecture decision impact tracking",
    ],
  },
  {
    title: "VP Engineering",
    subtitle: "Delivery Excellence",
    icon: GitBranch,
    color: PRODUCT_COLORS.atlas,
    insights: [
      "Cross-team sprint analytics",
      "Dependency bottleneck detection",
      "Capacity planning with AI",
    ],
  },
  {
    title: "VP Product",
    subtitle: "Revenue Alignment",
    icon: Target,
    color: PRODUCT_COLORS.loop,
    insights: [
      "Feature-to-revenue attribution",
      "Customer demand signal aggregation",
      "Roadmap confidence scoring",
    ],
  },
  {
    title: "VP Design",
    subtitle: "System Coherence",
    icon: Palette,
    color: PRODUCT_COLORS.drift,
    insights: [
      "Design system adoption metrics",
      "Component drift detection",
      "Cross-platform consistency scoring",
    ],
  },
  {
    title: "VP Sales",
    subtitle: "Pipeline Intelligence",
    icon: TrendingUp,
    color: PRODUCT_COLORS.signal,
    insights: [
      "Feature delivery ETAs for deals",
      "Competitive gap analysis",
      "Customer health scoring",
    ],
  },
  {
    title: "VP Customer Success",
    subtitle: "Retention & Growth",
    icon: Users,
    color: PRODUCT_COLORS.phantom,
    insights: [
      "Issue-to-resolution pipeline view",
      "Churn risk signal aggregation",
      "Product adoption analytics",
    ],
  },
];

const ENTERPRISE_FEATURES = [
  { icon: KeyRound, title: "SSO / SAML / SCIM", description: "Enterprise identity management with all major providers" },
  { icon: ShieldCheck, title: "Role-Based Access", description: "Granular RBAC with custom roles and permission policies" },
  { icon: FileText, title: "Audit Logging", description: "Complete audit trail for every action across all products" },
  { icon: Database, title: "VPC Deployment", description: "Dedicated infrastructure within your own cloud environment" },
  { icon: Headphones, title: "Dedicated Support", description: "Named account team with 24/7 priority support channel" },
  { icon: FileCheck, title: "Custom SLAs", description: "Tailored uptime guarantees and response time commitments" },
];

const JOURNEY_STEPS = [
  { product: "ATLAS", color: PRODUCT_COLORS.atlas, label: "Start Here", description: "AI Sprint Planning", year: "Today" },
  { product: "LOOP", color: PRODUCT_COLORS.loop, label: "Add Revenue Context", description: "Feedback Engine", year: "Month 3" },
  { product: "PHANTOM", color: PRODUCT_COLORS.phantom, label: "Surface Hidden Debt", description: "Tech Debt Intel", year: "Month 6" },
  { product: "SIGNAL", color: PRODUCT_COLORS.signal, label: "Connect Incidents", description: "Incident Intelligence", year: "Month 9" },
  { product: "DRIFT", color: PRODUCT_COLORS.drift, label: "Align Design", description: "Design Sync", year: "Month 12" },
  { product: "NEXUS", color: PRODUCT_COLORS.nexus, label: "Full Platform", description: "AI Nerve Center", year: "2027" },
];

/* ─────────────────── animation hook ─────────────────── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

/* ──────────────── Neural Network Canvas ──────────────── */

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#F97316", "#6366F1", "#06B6D4", "#EF4444", "#A855F7", "#10B981"];
    const nodeCount = 60;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${nodes[i].color}${Math.round((1 - dist / 140) * 25).toString(16).padStart(2, "0")}`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "90";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.5 }}
    />
  );
}

/* ──────────────────── Product Orbit SVG ──────────────────── */

function ProductOrbit() {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const angleOffset = useRef(0);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      angleOffset.current += 0.002;
      forceUpdate((c) => c + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const cx = 300;
  const cy = 300;
  const radius = 200;

  return (
    <div className="relative mx-auto w-full max-w-[600px] aspect-square">
      <svg viewBox="0 0 600 600" className="w-full h-full">
        {/* Orbit ring */}
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx={cx} cy={cy} r={radius * 0.6} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Connection lines to center */}
        {PRODUCTS.map((_, i) => {
          const angle = (i / PRODUCTS.length) * Math.PI * 2 + angleOffset.current;
          const px = cx + Math.cos(angle) * radius;
          const py = cy + Math.sin(angle) * radius;
          return (
            <line
              key={`line-${i}`}
              x1={cx}
              y1={cy}
              x2={px}
              y2={py}
              stroke={`${PRODUCTS[i].color}30`}
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
          );
        })}

        {/* Cross-connections */}
        {PRODUCTS.map((_, i) => {
          const j = (i + 2) % PRODUCTS.length;
          const a1 = (i / PRODUCTS.length) * Math.PI * 2 + angleOffset.current;
          const a2 = (j / PRODUCTS.length) * Math.PI * 2 + angleOffset.current;
          return (
            <line
              key={`cross-${i}`}
              x1={cx + Math.cos(a1) * radius}
              y1={cy + Math.sin(a1) * radius}
              x2={cx + Math.cos(a2) * radius}
              y2={cy + Math.sin(a2) * radius}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          );
        })}

        {/* Center NEXUS node */}
        <circle cx={cx} cy={cy} r="44" fill="url(#nexusGradient)" opacity="0.15" />
        <circle cx={cx} cy={cy} r="32" fill="#10B981" opacity="0.2" />
        <circle cx={cx} cy={cy} r="22" fill="#10B981" opacity="0.6" />
        <text x={cx} y={cy + 5} textAnchor="middle" fill="white" fontSize="10" fontWeight="700" letterSpacing="1">
          NEXUS
        </text>

        {/* Gradient def */}
        <defs>
          <radialGradient id="nexusGradient">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#10B98100" />
          </radialGradient>
        </defs>

        {/* Product nodes */}
        {PRODUCTS.map((p, i) => {
          const angle = (i / PRODUCTS.length) * Math.PI * 2 + angleOffset.current;
          const px = cx + Math.cos(angle) * radius;
          const py = cy + Math.sin(angle) * radius;
          const isActive = activeProduct === i;
          return (
            <g
              key={p.name}
              onMouseEnter={() => setActiveProduct(i)}
              onMouseLeave={() => setActiveProduct(null)}
              className="cursor-pointer"
            >
              <circle cx={px} cy={py} r={isActive ? 36 : 30} fill={`${p.color}18`} />
              <circle cx={px} cy={py} r={isActive ? 24 : 20} fill={`${p.color}40`} />
              <circle cx={px} cy={py} r="12" fill={p.color} />
              <text x={px} y={py - 36} textAnchor="middle" fill="white" fontSize="11" fontWeight="600">
                {p.name}
              </text>
              <text x={px} y={py + 44} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
                {p.tagline}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ──────────────────── Pulsing Dot ──────────────────── */

function PulsingDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-3 w-3">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}

/* ──────────────────── AI Workflow ──────────────────── */

const NEXUS_GREEN = "#10B981";

const NEXUS_PIPELINE = [
  {
    id: "connect",
    icon: Network,
    title: "Product Connection",
    desc: "Plug every Voatomy product into a unified graph",
    detail: "NEXUS connects to ATLAS (sprints), LOOP (revenue signals), SIGNAL (incidents), DRIFT (design debt), and PHANTOM (tech debt) — building a real-time knowledge graph of your entire engineering and business operation.",
    tags: ["ATLAS", "LOOP", "SIGNAL", "DRIFT", "PHANTOM", "Knowledge graph"],
    color: NEXUS_GREEN,
  },
  {
    id: "correlate",
    icon: Activity,
    title: "Cross-Product Correlation",
    desc: "Discover hidden patterns across products",
    detail: "AI correlation engine detects relationships invisible in isolation: sprint velocity drops linked to rising tech debt, revenue churn correlated with incident frequency, design drift preceding customer complaints.",
    tags: ["Velocity ↔ debt", "Churn ↔ incidents", "Drift ↔ complaints", "Pattern mining"],
    color: "#6366F1",
  },
  {
    id: "reason",
    icon: Sparkles,
    title: "Unified Reasoning",
    desc: "GPT-powered analysis across all data streams",
    detail: "A fine-tuned LLM reasons over the entire knowledge graph — answering natural-language questions like 'Why did velocity drop last sprint?' with multi-product causal explanations.",
    tags: ["Natural language", "Causal reasoning", "Multi-product", "Root cause"],
    color: "#F97316",
  },
  {
    id: "predict",
    icon: TrendingUp,
    title: "Predictive Intelligence",
    desc: "Forecast risks and opportunities across the stack",
    detail: "Combining signals from all products, NEXUS predicts: sprint delivery risk, revenue impact of engineering decisions, upcoming incident likelihood, and optimal resource allocation.",
    tags: ["Sprint risk", "Revenue forecast", "Incident prediction", "Resource allocation"],
    color: "#EF4444",
  },
  {
    id: "orchestrate",
    icon: Target,
    title: "Action Orchestration",
    desc: "Trigger coordinated actions across products",
    detail: "When NEXUS detects a multi-product issue, it orchestrates responses: creating ATLAS tickets, adjusting SIGNAL alert thresholds, flagging PHANTOM debt items, and notifying LOOP stakeholders — all automatically.",
    tags: ["Auto-tickets", "Alert tuning", "Debt flagging", "Stakeholder notify"],
    color: "#A855F7",
  },
  {
    id: "executive",
    icon: LineChart,
    title: "Executive Intelligence",
    desc: "Board-ready insights from engineering data",
    detail: "NEXUS distills cross-product data into executive dashboards: engineering ROI, innovation velocity, risk posture, debt trajectory, and customer impact — translating technical metrics into business language.",
    tags: ["Eng ROI", "Innovation score", "Risk posture", "Debt trajectory", "Board report"],
    color: "#06B6D4",
  },
];

function NexusAIWorkflow() {
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
      setActiveStage((prev) => (prev + 1) % NEXUS_PIPELINE.length);
    }, 3400);
    return () => clearInterval(timer);
  }, [playing, visible]);

  const stage = NEXUS_PIPELINE[activeStage];
  const StageIcon = stage.icon;

  return (
    <Section variant="dark" className="py-20 sm:py-28 overflow-hidden">
      <div ref={ref}>
        <div className="text-center mb-14">
          <Chip dotColor={NEXUS_GREEN} className="mb-4">AI Workflow</Chip>
          <h2 className="text-heading-1 text-theme max-w-[740px] mx-auto">
            Inside NEXUS&apos;s{" "}
            <span style={{ color: NEXUS_GREEN }}>unified intelligence engine</span>
          </h2>
          <p className="mt-4 text-body-lg text-theme-m max-w-2xl mx-auto">
            Follow a data point through six AI stages — from product connection
            to executive intelligence, bridging every Voatomy product.
          </p>
        </div>

        {/* Pipeline progress */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex items-center gap-1">
            {NEXUS_PIPELINE.map((s, i) => {
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
                          animation: `nexus-tag-pop 0.3s ease-out ${j * 60}ms both`,
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
                  {activeStage === 0 && <NexusConnectVisual />}
                  {activeStage === 1 && <NexusCorrelateVisual />}
                  {activeStage === 2 && <NexusReasonVisual />}
                  {activeStage === 3 && <NexusPredictVisual />}
                  {activeStage === 4 && <NexusOrchestrateVisual />}
                  {activeStage === 5 && <NexusExecutiveVisual />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes nexus-tag-pop {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </Section>
  );
}

/* Visual: Product Connection */
function NexusConnectVisual() {
  const products = [
    { name: "ATLAS", color: "#F97316", status: "connected", data: "Sprint velocity, tickets" },
    { name: "LOOP", color: "#6366F1", status: "connected", data: "Revenue signals, churn" },
    { name: "SIGNAL", color: "#EF4444", status: "connected", data: "Incidents, MTTR" },
    { name: "DRIFT", color: "#A855F7", status: "syncing", data: "Design tokens, health" },
    { name: "PHANTOM", color: "#06B6D4", status: "connected", data: "Debt score, modules" },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: NEXUS_GREEN }} />
        <span className="text-xs font-mono text-theme-m">Building unified knowledge graph… 5 products</span>
      </div>
      {products.map((p, i) => (
        <div
          key={p.name}
          className="flex items-center gap-3 rounded-lg border border-theme p-2.5"
          style={{ animation: `nexusFadeIn 0.3s ease-out ${i * 70}ms both` }}
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${p.color}15` }}>
            <span className="text-[10px] font-bold" style={{ color: p.color }}>{p.name[0]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-theme">{p.name}</div>
            <div className="text-[10px] text-theme-m truncate">{p.data}</div>
          </div>
          {p.status === "connected" ? (
            <span className="flex items-center gap-1 text-[10px] text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Live
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Syncing
            </span>
          )}
        </div>
      ))}
      <style jsx>{`@keyframes nexusFadeIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}

/* Visual: Cross-Product Correlation */
function NexusCorrelateVisual() {
  const correlations = [
    { from: "Sprint velocity ↓12%", to: "Tech debt ↑18%", confidence: 94, color: "#F97316" },
    { from: "Customer churn ↑8%", to: "Incident freq ↑22%", confidence: 87, color: "#EF4444" },
    { from: "Design drift ↑15 tokens", to: "Support tickets ↑11%", confidence: 78, color: "#A855F7" },
    { from: "Deploy frequency ↓", to: "Revenue growth stall", confidence: 91, color: "#6366F1" },
  ];
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">4 cross-product correlations detected</span>
      </div>
      {correlations.map((c, i) => (
        <div key={i} className="rounded-lg border border-theme p-3" style={{ animation: `nexusFadeIn 0.35s ease-out ${i * 80}ms both` }}>
          <div className="flex items-center gap-2 text-[11px] mb-2">
            <span className="text-theme-s font-medium">{c.from}</span>
            <ChevronRight className="h-3 w-3 text-theme-f" />
            <span className="font-medium" style={{ color: c.color }}>{c.to}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-theme-subtle overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${c.confidence}%`, backgroundColor: c.color }} />
            </div>
            <span className="text-[10px] font-mono font-bold" style={{ color: c.color }}>{c.confidence}%</span>
          </div>
        </div>
      ))}
      <style jsx>{`@keyframes nexusFadeIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}

/* Visual: Unified Reasoning */
function NexusReasonVisual() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">LLM reasoning over knowledge graph…</span>
      </div>
      {/* Natural language query mock */}
      <div className="rounded-lg border border-theme p-3">
        <div className="flex items-center gap-2 mb-2">
          <Search className="h-3.5 w-3.5" style={{ color: "#F97316" }} />
          <span className="text-xs text-theme-m italic">&quot;Why did velocity drop last sprint?&quot;</span>
        </div>
        <div className="border-l-2 pl-3 ml-1 space-y-2" style={{ borderColor: "#F97316" }}>
          <div className="text-[11px] text-theme-s leading-relaxed" style={{ animation: "nexusType 0.5s ease-out" }}>
            <strong className="text-theme">Root cause analysis:</strong> Sprint-14 velocity dropped 12% due to a convergence of three factors detected across products:
          </div>
          <div className="space-y-1.5">
            {[
              { src: "PHANTOM", text: "Auth-service debt score crossed critical threshold (+18%)", color: "#06B6D4" },
              { src: "SIGNAL", text: "3 P1 incidents consumed 22 dev-hours (avg 7.3hrs/incident)", color: "#EF4444" },
              { src: "DRIFT", text: "15 unresolved design drifts required 2 rework cycles", color: "#A855F7" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px]" style={{ animation: `nexusFadeIn 0.3s ease-out ${200 + i * 100}ms both` }}>
                <span className="font-bold px-1.5 py-0.5 rounded text-[9px]" style={{ color: item.color, backgroundColor: `${item.color}15` }}>{item.src}</span>
                <span className="text-theme-m">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes nexusType { from { opacity: 0; } to { opacity: 1; } }
        @keyframes nexusFadeIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }
      `}</style>
    </div>
  );
}

/* Visual: Predictive Intelligence */
function NexusPredictVisual() {
  const predictions = [
    { label: "Sprint-16 delivery risk", value: "High", pct: 78, color: "#EF4444" },
    { label: "Revenue impact of debt", value: "-$42K", pct: 65, color: "#F97316" },
    { label: "Next incident probability", value: "62%", pct: 62, color: "#EAB308" },
    { label: "Optimal team allocation", value: "Rebalance", pct: 45, color: NEXUS_GREEN },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
        <span className="text-xs font-mono text-theme-m">Forecasting cross-product risks…</span>
      </div>
      {predictions.map((p, i) => (
        <div key={p.label} className="rounded-lg border border-theme p-3" style={{ animation: `nexusFadeIn 0.4s ease-out ${i * 80}ms both` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-theme">{p.label}</span>
            <span className="text-xs font-bold" style={{ color: p.color }}>{p.value}</span>
          </div>
          <div className="h-1.5 rounded-full bg-theme-subtle overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.pct}%`, backgroundColor: p.color }} />
          </div>
        </div>
      ))}
      <style jsx>{`@keyframes nexusFadeIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}

/* Visual: Action Orchestration */
function NexusOrchestrateVisual() {
  const actions = [
    { product: "ATLAS", action: "Created ticket: Refactor auth-service coupling", status: "done", color: "#F97316" },
    { product: "SIGNAL", action: "Raised alert threshold for payment-svc", status: "done", color: "#EF4444" },
    { product: "PHANTOM", action: "Flagged auth-service for priority remediation", status: "done", color: "#06B6D4" },
    { product: "LOOP", action: "Notified VP Eng of velocity-revenue correlation", status: "sending", color: "#6366F1" },
    { product: "DRIFT", action: "Queued design token sync for checkout flow", status: "pending", color: "#A855F7" },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "#A855F7" }} />
        <span className="text-xs font-mono text-theme-m">Orchestrating 5 cross-product actions…</span>
      </div>
      {actions.map((a, i) => (
        <div key={i} className="flex items-center gap-2.5 rounded-lg border border-theme p-2.5" style={{ animation: `nexusFadeIn 0.3s ease-out ${i * 60}ms both` }}>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: a.color, backgroundColor: `${a.color}15` }}>{a.product}</span>
          <span className="text-[11px] text-theme-s flex-1 truncate">{a.action}</span>
          {a.status === "done" && <span className="h-4 w-4 rounded-full bg-green-500/10 flex items-center justify-center"><span className="h-1.5 w-1.5 rounded-full bg-green-400" /></span>}
          {a.status === "sending" && <span className="h-4 w-4 rounded-full bg-amber-500/10 flex items-center justify-center"><span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" /></span>}
          {a.status === "pending" && <span className="h-4 w-4 rounded-full bg-gray-500/10 flex items-center justify-center"><span className="h-1.5 w-1.5 rounded-full bg-gray-400" /></span>}
        </div>
      ))}
      <style jsx>{`@keyframes nexusFadeIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}

/* Visual: Executive Intelligence */
function NexusExecutiveVisual() {
  const metrics = [
    { label: "Engineering ROI", value: "3.2x", trend: "+0.4x", color: NEXUS_GREEN },
    { label: "Innovation Velocity", value: "78%", trend: "+5%", color: "#6366F1" },
    { label: "Risk Posture", value: "B+", trend: "↑ from B", color: "#F97316" },
    { label: "Debt Trajectory", value: "↓ 23%", trend: "On track", color: "#06B6D4" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "#06B6D4" }} />
        <span className="text-xs font-mono text-theme-m">Generating executive dashboard…</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className="rounded-lg border border-theme p-3 text-center"
            style={{ animation: `nexusFadeIn 0.4s ease-out ${i * 70}ms both` }}
          >
            <div className="text-lg font-bold" style={{ color: m.color }}>{m.value}</div>
            <div className="text-[10px] text-theme-m mb-1">{m.label}</div>
            <div className="text-[9px] font-medium" style={{ color: m.color }}>{m.trend}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg p-3 border text-center" style={{ borderColor: `${NEXUS_GREEN}30`, backgroundColor: `${NEXUS_GREEN}08` }}>
        <Sparkles className="h-4 w-4 mx-auto mb-1" style={{ color: NEXUS_GREEN }} />
        <div className="text-xs font-semibold" style={{ color: NEXUS_GREEN }}>Board Report Ready</div>
        <div className="text-[10px] text-theme-m">Distilled from 5 products · 2,847 data points</div>
      </div>
      <style jsx>{`@keyframes nexusFadeIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   NEXUS PRODUCT PAGE
   ════════════════════════════════════════════════════════ */

export default function NexusProductPage() {
  const hero = useScrollReveal();
  const universe = useScrollReveal();
  const unified = useScrollReveal();
  const stack = useScrollReveal();
  const dashboard = useScrollReveal();
  const roles = useScrollReveal();
  const security = useScrollReveal();
  const journey = useScrollReveal();
  const cta = useScrollReveal();

  const [queryFocused, setQueryFocused] = useState(false);

  return (
    <main className="relative overflow-hidden dark-section">
      {/* ─── 1. HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#060a08]">
        {/* Premium multi-gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/8 via-[#6366F1]/6 to-[#06B6D4]/8" />
          <div className="absolute inset-0 bg-gradient-to-tl from-[#EF4444]/6 via-transparent to-[#A855F7]/8" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#10B981]/10 to-transparent" />
          <NeuralCanvas />
          <div className="absolute inset-0 fine-grid" />
          <div className="absolute inset-0 noise-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060a08]" />
        </div>

        <div
          ref={hero.ref}
          className={cn(
            "relative z-10 mx-auto max-w-container px-4 text-center transition-all duration-1000",
            hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Chip dotColor="#10B981" className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 backdrop-blur-sm">
              Subscribe on-site
            </Chip>
            <span className="enterprise-badge text-emerald-300/60">
              <Shield className="h-3 w-3" />
              Business + NEXUS add-on
            </span>
          </div>

          <h1 className="text-display-2 md:text-display-1 text-white mb-6">
            <span className="block">The AI Organizational</span>
            <span
              className="bg-gradient-to-r from-[#F97316] via-[#6366F1] via-[#06B6D4] via-[#EF4444] via-[#A855F7] to-[#10B981] bg-clip-text text-transparent"
            >
              Nerve Center
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-body-lg text-white/50 mb-4">
            All five Voatomy products unified into one intelligent platform.
            NEXUS connects every team, every signal, and every decision into a
            single source of organizational truth.
          </p>

          <p className="mx-auto max-w-xl text-sm text-white/30 mb-10">
            Engineering &middot; Product &middot; Design &middot; Sales &middot; Marketing &middot; CS &middot; SRE &middot; Leadership
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold" asChild>
              <Link href={buildProductCheckoutUrl({ product: "nexus", plan: "business" })}>
                Start 14-day trial <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" className="text-white/60 hover:text-white hover:bg-white/5" asChild>
              <Link href="#universe">
                Explore the Platform <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="border border-white/20 bg-white/10 text-white hover:bg-white/15"
              asChild
            >
              <Link href="/contact?plan=enterprise">Enterprise quote</Link>
            </Button>
          </div>
          <p className="mx-auto max-w-md pt-2 text-center text-xs text-white/40">
            NEXUS is billed as an add-on. Trial starts on the Business plan with NEXUS pre-selected at checkout.
          </p>

          {/* Decorative gradient bar */}
          <div className="mx-auto mt-16 h-px w-full max-w-lg bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
        </div>
      </section>

      {/* ─── 2. PRODUCT UNIVERSE ─── */}
      <Section variant="dark" id="universe" className="py-24 sm:py-32 bg-[#080c0a]">
        <div
          ref={universe.ref}
          className={cn(
            "transition-all duration-700",
            universe.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <Chip dotColor="#10B981" className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Platform Architecture
            </Chip>
            <h2 className="text-heading-1 text-white mb-4">The Product Universe</h2>
            <p className="mx-auto max-w-xl text-body-base text-white/40">
              Five specialized intelligence engines, unified by NEXUS into one organizational nervous system.
            </p>
          </div>

          <ProductOrbit />

          <p className="mt-8 text-center text-sm text-white/30 max-w-md mx-auto">
            Every product feeds intelligence into NEXUS. Every insight flows back out to the teams that need it.
          </p>
        </div>
      </Section>

      {/* ─── 3. UNIFIED INTELLIGENCE ─── */}
      <Section variant="dark" className="py-24 sm:py-32 bg-[#0a0a0a]">
        <div
          ref={unified.ref}
          className={cn(
            "transition-all duration-700",
            unified.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <Chip dotColor="#10B981" className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Cross-Product Intelligence
            </Chip>
            <h2 className="text-heading-1 text-white mb-4">One Query. Every Answer.</h2>
            <p className="mx-auto max-w-xl text-body-base text-white/40">
              Search anything across your organization. NEXUS returns unified intelligence from every product simultaneously.
            </p>
          </div>

          {/* Search mock */}
          <div className="mx-auto max-w-3xl">
            <div
              className={cn(
                "relative rounded-2xl border transition-all duration-300",
                queryFocused
                  ? "border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                  : "border-white/10",
              )}
            >
              <div
                className="flex items-center gap-3 px-5 py-4 bg-white/[0.03] rounded-t-2xl border-b border-white/5 cursor-text"
                onClick={() => setQueryFocused(true)}
                onBlur={() => setQueryFocused(false)}
              >
                <Search className="h-5 w-5 text-emerald-400" />
                <span className="text-body-base text-white/80">Auth SSO</span>
                <span className="ml-auto text-xs text-white/20 hidden sm:block">NEXUS Universal Search</span>
              </div>

              <div className="divide-y divide-white/5">
                {UNIFIED_QUERY_RESULTS.map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
                    >
                      <div
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${r.color}18` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: r.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: r.color }}>
                            {r.product}
                          </span>
                          <span className="text-xs text-white/30">{r.label}</span>
                        </div>
                        <p className="text-sm text-white/70">{r.detail}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="text-sm font-semibold text-white/90">{r.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-5 py-3 bg-white/[0.02] rounded-b-2xl flex items-center justify-between">
                <span className="text-xs text-white/20">5 results across 5 products in 120ms</span>
                <span className="text-xs text-emerald-400/60 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> AI-correlated
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── AI WORKFLOW PIPELINE ─── */}
      <NexusAIWorkflow />

      {/* ─── 4. THE FULL STACK ─── */}
      <Section variant="dark" className="py-24 sm:py-32 bg-[#080c0a]">
        <div
          ref={stack.ref}
          className={cn(
            "transition-all duration-700",
            stack.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <Chip dotColor="#10B981" className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Complete Suite
            </Chip>
            <h2 className="text-heading-1 text-white mb-4">The Full Stack</h2>
            <p className="mx-auto max-w-xl text-body-base text-white/40">
              Five world-class products, one subscription. Every engine is purpose-built and deeply integrated.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p) => {
              const Icon = p.icon;
              return (
                <Card
                  key={p.name}
                  variant="dark"
                  className="group relative overflow-hidden border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
                >
                  {/* Subtle top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(to right, transparent, ${p.color}40, transparent)` }}
                  />

                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${p.color}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: p.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-heading-3 text-white">{p.name}</h3>
                        <span
                          className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${p.color}15`, color: p.color }}
                        >
                          Included
                        </span>
                      </div>
                      <p className="text-xs font-medium mb-2" style={{ color: `${p.color}90` }}>
                        {p.tagline}
                      </p>
                      <p className="text-sm text-white/40 leading-relaxed">{p.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}

            {/* NEXUS unifier card */}
            <Card
              variant="dark"
              className="relative overflow-hidden border-emerald-500/20 bg-emerald-500/5 sm:col-span-2 lg:col-span-1"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
                  <Network className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-heading-3 text-white">NEXUS</h3>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                      Unifier
                    </span>
                  </div>
                  <p className="text-xs font-medium text-emerald-400/70 mb-2">AI Organizational Nerve Center</p>
                  <p className="text-sm text-white/40 leading-relaxed">
                    The intelligence layer that connects all products, correlates signals across teams, and surfaces unified insights.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ─── 5. EXECUTIVE DASHBOARD MOCK ─── */}
      <Section variant="dark" className="py-24 sm:py-32 bg-[#0a0a0a]">
        <div
          ref={dashboard.ref}
          className={cn(
            "transition-all duration-700",
            dashboard.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <Chip dotColor="#10B981" className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Executive View
            </Chip>
            <h2 className="text-heading-1 text-white mb-4">Organization at a Glance</h2>
            <p className="mx-auto max-w-xl text-body-base text-white/40">
              Real-time cross-organizational health. Every metric connected. Every trend explained.
            </p>
          </div>

          {/* Dashboard mock */}
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
                <span className="text-sm font-semibold text-white/70">NEXUS Executive Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <PulsingDot color="#10B981" />
                <span className="text-xs text-white/30">Live</span>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
              {EXECUTIVE_METRICS.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div
                    key={i}
                    className="bg-[#0a0a0a] px-6 py-5 group hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-4 w-4" style={{ color: `${m.color}80` }} />
                      <span className="text-xs text-white/30 uppercase tracking-wide">{m.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white" style={{ color: m.color }}>
                        {m.value}
                      </span>
                      <span className="text-xs text-white/30">{m.suffix}</span>
                    </div>
                    {/* Mini sparkline mock */}
                    <div className="mt-3 flex items-end gap-0.5 h-6">
                      {Array.from({ length: 12 }, (_, j) => (
                        <div
                          key={j}
                          className="flex-1 rounded-sm"
                          style={{
                            height: `${20 + Math.sin(j * 0.8 + i) * 15 + Math.random() * 20}%`,
                            backgroundColor: `${m.color}25`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom status */}
            <div className="px-6 py-3 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
              <span className="text-xs text-white/20">
                Data from ATLAS + LOOP + PHANTOM + SIGNAL + DRIFT
              </span>
              <span className="text-xs text-white/20">Updated 2s ago</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 6. WHO USES NEXUS ─── */}
      <Section variant="dark" className="py-24 sm:py-32 bg-[#080c0a]">
        <div
          ref={roles.ref}
          className={cn(
            "transition-all duration-700",
            roles.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <Chip dotColor="#10B981" className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Built for Leaders
            </Chip>
            <h2 className="text-heading-1 text-white mb-4">Every Leader. One Platform.</h2>
            <p className="mx-auto max-w-xl text-body-base text-white/40">
              NEXUS delivers tailored intelligence to every executive, in the context that matters to them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROLES.map((role, i) => {
              const Icon = role.icon;
              return (
                <Card
                  key={i}
                  variant="dark"
                  className="relative overflow-hidden border-white/[0.06] bg-white/[0.02] hover:border-white/10 transition-all duration-300"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(to right, transparent, ${role.color}30, transparent)` }}
                  />
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${role.color}12` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: role.color }} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{role.title}</h3>
                      <p className="text-xs text-white/30">{role.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {role.insights.map((insight, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/50">
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: `${role.color}60` }} />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ─── 7. SCALE & SECURITY ─── */}
      <Section variant="dark" className="py-24 sm:py-32 bg-[#0a0a0a]">
        <div
          ref={security.ref}
          className={cn(
            "transition-all duration-700",
            security.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <Chip dotColor="#10B981" className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Enterprise Grade
            </Chip>
            <h2 className="text-heading-1 text-white mb-4">Built for Scale & Security</h2>
            <p className="mx-auto max-w-xl text-body-base text-white/40">
              Enterprise-hardened infrastructure with the compliance, governance, and support your organization requires.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ENTERPRISE_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Card
                  key={i}
                  variant="dark"
                  className="border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                      <Icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">{f.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/20">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> SOC 2 Type II
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> AES-256 Encryption
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> GDPR Compliant
            </div>
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4" /> 99.99% SLA
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 8. JOURNEY VISUAL ─── */}
      <Section variant="dark" className="py-24 sm:py-32 bg-[#080c0a]">
        <div
          ref={journey.ref}
          className={cn(
            "transition-all duration-700",
            journey.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <Chip dotColor="#10B981" className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Growth Path
            </Chip>
            <h2 className="text-heading-1 text-white mb-4">
              Start with ATLAS. Grow into NEXUS.
            </h2>
            <p className="mx-auto max-w-xl text-body-base text-white/40">
              Adopt at your pace. Each product integrates seamlessly, building toward the full organizational nerve center.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mx-auto max-w-4xl">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#F97316]/40 via-[#06B6D4]/40 to-[#10B981]/60 hidden md:block" />
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#F97316]/40 via-[#06B6D4]/40 to-[#10B981]/60 md:hidden" />

            <div className="space-y-6">
              {JOURNEY_STEPS.map((step, i) => {
                const isLast = i === JOURNEY_STEPS.length - 1;
                return (
                  <div key={i} className="relative flex items-start gap-6 pl-0">
                    {/* Node */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full border-2",
                          isLast ? "border-emerald-500/60" : "border-white/10",
                        )}
                        style={{
                          backgroundColor: `${step.color}15`,
                          borderColor: isLast ? undefined : `${step.color}30`,
                        }}
                      >
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: step.color }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={cn(
                        "flex-1 rounded-xl border px-5 py-4 transition-all",
                        isLast
                          ? "border-emerald-500/20 bg-emerald-500/5"
                          : "border-white/[0.06] bg-white/[0.02]",
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <span className="text-base font-bold text-white">{step.product}</span>
                        <span
                          className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${step.color}15`, color: step.color }}
                        >
                          {step.label}
                        </span>
                        <span className="text-xs text-white/20 ml-auto">{step.year}</span>
                      </div>
                      <p className="text-sm text-white/40">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 9. CONTACT SALES CTA ─── */}
      <Section variant="dark" id="contact" className="py-24 sm:py-32 bg-[#0a0a0a]">
        <div
          ref={cta.ref}
          className={cn(
            "transition-all duration-700",
            cta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="mx-auto max-w-2xl">
            {/* Gradient border wrapper */}
            <div className="relative rounded-3xl p-px bg-gradient-to-b from-emerald-500/30 via-white/5 to-transparent">
              <div className="rounded-3xl bg-[#0c0f0d] px-8 py-12 sm:px-12">
                <div className="text-center mb-10">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <Sparkles className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h2 className="text-heading-1 text-white mb-3">Ready for NEXUS?</h2>
                  <p className="text-body-base text-white/40 max-w-md mx-auto">
                    Start a 14-day trial on the Business plan with the NEXUS add-on pre-selected, or talk to us for
                    enterprise deployment and volume pricing.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold" asChild>
                    <Link href={buildProductCheckoutUrl({ product: "nexus", plan: "business" })}>
                      Start 14-day trial
                      <ArrowRight className="ml-2 h-4 w-4 inline" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="border border-white/15 bg-white/5 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link href="/contact?plan=enterprise">Enterprise &amp; VPC</Link>
                  </Button>
                </div>

                <p className="mt-8 text-center text-xs text-white/20">
                  Custom SLAs, SSO, and on-prem &mdash; use Enterprise quote. Base platform pricing at{" "}
                  <Link href="/pricing" className="text-emerald-400/90 underline-offset-2 hover:underline">
                    /pricing
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Footer gradient ─── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
    </main>
  );
}

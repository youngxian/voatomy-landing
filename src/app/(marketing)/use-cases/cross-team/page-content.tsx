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
  ChevronRight,
  Code2,
  Palette,
  BarChart3,
  Megaphone,
  Headphones,
  Package,
  Network,
  GitBranch,
  MessageSquare,
  Activity,
  AlertTriangle,
  TrendingUp,
  Users,
  Zap,
  Target,
  DollarSign,
  Shield,
  Layers,
  ArrowUpRight,
  Sparkles,
  CircleDot,
} from "lucide-react";

/* ─────────────────────── constants ─────────────────────── */

const EMERALD = "#10B981";

const PRODUCT_COLORS = {
  atlas: "#F97316",
  loop: "#6366F1",
  phantom: "#06B6D4",
  signal: "#EF4444",
  drift: "#A855F7",
  nexus: "#10B981",
};

const TEAMS = [
  { name: "Engineering", icon: Code2, color: "#F97316", x: 15, y: 25 },
  { name: "Design", icon: Palette, color: "#A855F7", x: 85, y: 25 },
  { name: "Product", icon: Package, color: "#6366F1", x: 15, y: 75 },
  { name: "Sales", icon: BarChart3, color: "#EF4444", x: 85, y: 75 },
  { name: "Marketing", icon: Megaphone, color: "#06B6D4", x: 50, y: 10 },
  { name: "CS", icon: Headphones, color: "#F59E0B", x: 50, y: 90 },
];

const SILOS = [
  {
    team: "Engineering",
    icon: Code2,
    color: "#F97316",
    emoji: "\u{1F614}",
    problem: "Ships features without knowing revenue impact",
    cost: "$420K/yr in low-impact work",
  },
  {
    team: "Sales",
    icon: BarChart3,
    color: "#EF4444",
    emoji: "\u{1F629}",
    problem: "Promises timelines without knowing engineering capacity",
    cost: "34% of deals miss delivery dates",
  },
  {
    team: "Design",
    icon: Palette,
    color: "#A855F7",
    emoji: "\u{1F615}",
    problem: "Creates components without adoption data",
    cost: "41% of new components never used",
  },
  {
    team: "Product",
    icon: Package,
    color: "#6366F1",
    emoji: "\u{1F9D0}",
    problem: "Prioritizes roadmap without demand signals",
    cost: "2.1x re-prioritization churn per quarter",
  },
];

const CONNECTIONS = [
  {
    product: "ATLAS",
    color: PRODUCT_COLORS.atlas,
    icon: GitBranch,
    from: "Engineering",
    to: "Product",
    bridge: "Sprint Alignment",
    description: "Sprint plans weighted by revenue priority. Product sees real complexity estimates. Engineering sees business context.",
  },
  {
    product: "LOOP",
    color: PRODUCT_COLORS.loop,
    icon: MessageSquare,
    from: "Sales",
    to: "Engineering",
    bridge: "Revenue Feedback",
    description: "Customer requests flow into sprint backlogs with deal value attached. Engineering sees the revenue behind every ticket.",
  },
  {
    product: "DRIFT",
    color: PRODUCT_COLORS.drift,
    icon: Palette,
    from: "Design",
    to: "Engineering",
    bridge: "System Sync",
    description: "Design tokens and component specs stay synchronized with code. Every drift is detected and surfaced automatically.",
  },
  {
    product: "SIGNAL",
    color: PRODUCT_COLORS.signal,
    icon: Activity,
    from: "SRE",
    to: "CS + Sales",
    bridge: "Incident Context",
    description: "Incidents carry customer impact data. CS knows before customers call. Sales gets talking points for affected accounts.",
  },
];

const DASHBOARD_TEAMS = [
  { name: "Platform", health: 92, color: "#F97316", sprints: 14, velocity: "+8%" },
  { name: "Frontend", health: 87, color: "#A855F7", sprints: 12, velocity: "+3%" },
  { name: "Backend", health: 94, color: "#6366F1", sprints: 13, velocity: "+12%" },
  { name: "Mobile", health: 78, color: "#06B6D4", sprints: 11, velocity: "-2%" },
  { name: "Data", health: 91, color: "#EF4444", sprints: 10, velocity: "+6%" },
];

const DEPENDENCIES = [
  { from: "Frontend", to: "Platform", status: "blocked", label: "Auth SDK v3" },
  { from: "Mobile", to: "Backend", status: "in-progress", label: "Push API" },
  { from: "Data", to: "Platform", status: "resolved", label: "Event Schema" },
];

const MULTIPLIER_STATS = [
  {
    value: "3.2x",
    label: "Faster cross-team feature delivery",
    icon: Zap,
    description: "Features requiring multiple teams ship 3.2x faster with shared context",
  },
  {
    value: "67%",
    label: "Fewer cross-team blockers",
    icon: Shield,
    description: "Dependency conflicts detected and resolved before they stall sprints",
  },
  {
    value: "92%",
    label: "Revenue-engineering alignment",
    icon: Target,
    description: "Engineering effort directly correlates with revenue-generating features",
  },
  {
    value: "$1.8M",
    label: "Recovered from cross-team friction",
    icon: DollarSign,
    description: "Eliminated redundant work, misaligned priorities, and blocked handoffs",
  },
];

const PRODUCT_STACK = [
  {
    name: "ATLAS",
    tagline: "Sprint Intelligence",
    color: PRODUCT_COLORS.atlas,
    icon: GitBranch,
    contribution: "Gives every team realistic sprint plans weighted by cross-org priorities",
  },
  {
    name: "LOOP",
    tagline: "Revenue Feedback",
    color: PRODUCT_COLORS.loop,
    icon: MessageSquare,
    contribution: "Routes customer signals to every team that needs to act on them",
  },
  {
    name: "PHANTOM",
    tagline: "Tech Debt Intel",
    color: PRODUCT_COLORS.phantom,
    icon: AlertTriangle,
    contribution: "Surfaces hidden debt that silently slows cross-team delivery",
  },
  {
    name: "SIGNAL",
    tagline: "Incident Intelligence",
    color: PRODUCT_COLORS.signal,
    icon: Activity,
    contribution: "Connects incidents to revenue impact across every customer-facing team",
  },
  {
    name: "DRIFT",
    tagline: "Design Sync",
    color: PRODUCT_COLORS.drift,
    icon: Palette,
    contribution: "Keeps design, engineering, and product specs in lockstep",
  },
];

/* ─────────────────── scroll reveal hook ─────────────────── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

/* ─────────────────── pulsing dot ─────────────────── */

function PulsingDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}

/* ─────────────────── team node canvas ─────────────────── */

function TeamNetworkCanvas() {
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
    const nodeCount = 45;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.8,
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
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const alpha = Math.round((1 - dist / 120) * 20);
            ctx.strokeStyle = `${nodes[i].color}${alpha.toString(16).padStart(2, "0")}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "80";
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
      style={{ opacity: 0.4 }}
    />
  );
}

/* ════════════════════════════════════════════════════════
   CROSS-TEAM ALIGNMENT USE-CASE PAGE
   ════════════════════════════════════════════════════════ */

export default function CrossTeamAlignmentPage() {
  const hero = useScrollReveal();
  const silos = useScrollReveal();
  const connected = useScrollReveal();
  const dashboard = useScrollReveal();
  const multiplier = useScrollReveal();
  const stack = useScrollReveal();
  const cta = useScrollReveal();

  const [connectedState, setConnectedState] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setConnectedState(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative overflow-hidden dark-section">

      {/* ─── 1. HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#060a08]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-indigo-500/5 to-orange-500/6" />
          <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 via-transparent to-cyan-500/5" />
          <TeamNetworkCanvas />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060a08]" />
        </div>

        <div
          ref={hero.ref}
          className={cn(
            "relative z-10 mx-auto max-w-container px-4 transition-all duration-1000",
            hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Chip dotColor={EMERALD} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                Cross-Team Alignment
              </Chip>
              <Chip className="bg-white/5 border border-white/10 text-white/50">
                Full Platform
              </Chip>
            </div>

            <h1 className="text-display-2 md:text-display-1 text-white mb-6 max-w-4xl mx-auto">
              <span className="block">Connect every team</span>
              <span className="block bg-gradient-to-r from-[#F97316] via-[#6366F1] via-[#A855F7] to-[#10B981] bg-clip-text text-transparent">
                into one organism
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-body-lg text-white/50 mb-4">
              Engineering, design, product, sales, marketing, and customer success
              -- all connected through one intelligent nervous system. No more silos.
              No more blind spots.
            </p>

            <p className="mx-auto max-w-lg text-sm text-white/25 mb-10">
              Powered by ATLAS + LOOP + DRIFT + SIGNAL + PHANTOM, unified by NEXUS
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold" asChild>
                <Link href="/products/nexus">
                  Explore NEXUS <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" className="text-white/60 hover:text-white hover:bg-white/5" asChild>
                <Link href="/pricing">
                  View Pricing <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Team Bubbles Visual: Disconnected -> Connected */}
          <div className="relative mx-auto max-w-xl aspect-[16/10]">
            {/* Center NEXUS hub */}
            <div
              className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-1000",
                connectedState ? "opacity-100 scale-100" : "opacity-0 scale-50",
              )}
            >
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-emerald-500/10 animate-pulse" />
                <div className="absolute -inset-3 rounded-full bg-emerald-500/20" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/80 shadow-lg shadow-emerald-500/30">
                  <Network className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* SVG connection lines */}
            <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 62.5">
              {TEAMS.map((team) => (
                <line
                  key={`line-${team.name}`}
                  x1="50"
                  y1="31.25"
                  x2={team.x}
                  y2={team.y * 0.625}
                  stroke={connectedState ? EMERALD : "transparent"}
                  strokeWidth="0.3"
                  strokeDasharray={connectedState ? "none" : "2 2"}
                  strokeOpacity={connectedState ? 0.5 : 0}
                  className="transition-all duration-1000"
                />
              ))}
            </svg>

            {/* Team bubbles */}
            {TEAMS.map((team, i) => {
              const Icon = team.icon;
              return (
                <div
                  key={team.name}
                  className={cn(
                    "absolute z-20 flex flex-col items-center transition-all duration-700",
                    connectedState ? "" : "opacity-60",
                  )}
                  style={{
                    left: `${team.x}%`,
                    top: `${team.y}%`,
                    transform: "translate(-50%, -50%)",
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 transition-all duration-700",
                      connectedState
                        ? "border-emerald-500/40 shadow-md"
                        : "border-white/10",
                    )}
                    style={{
                      backgroundColor: connectedState ? `${team.color}20` : `${team.color}10`,
                      boxShadow: connectedState ? `0 0 20px ${team.color}15` : "none",
                    }}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: team.color }} />
                  </div>
                  <span className="mt-1.5 text-[10px] sm:text-xs font-medium text-white/60">{team.name}</span>
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-12 h-px w-full max-w-lg bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        </div>
      </section>

      {/* ─── 2. THE SILOS PROBLEM ─── */}
      <Section variant="dark" className="py-24 sm:py-32 bg-[#0a0a0a]">
        <div
          ref={silos.ref}
          className={cn(
            "transition-all duration-700",
            silos.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <Chip dotColor="#EF4444" className="mb-4 bg-red-500/10 border border-red-500/20 text-red-300">
              The Problem
            </Chip>
            <h2 className="text-heading-1 text-white mb-4">
              Teams operating in isolation
            </h2>
            <p className="mx-auto max-w-xl text-body-base text-white/40">
              When teams cannot see each other, every decision is made with incomplete information.
              The cost compounds silently until it becomes a crisis.
            </p>
          </div>

          {/* Silo visualization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {SILOS.map((silo, i) => {
              const Icon = silo.icon;
              return (
                <Card
                  key={i}
                  variant="dark"
                  className="relative overflow-hidden border-white/[0.06] bg-white/[0.02] hover:border-red-500/15 transition-all duration-300"
                >
                  {/* Subtle red warning line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${silo.color}12` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: silo.color }} />
                      </div>
                      <span className="absolute -top-1 -right-1 text-sm">{silo.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-bold text-white">{silo.team}</h3>
                        <div className="h-px flex-1 bg-white/5" />
                      </div>
                      <p className="text-sm text-white/50 mb-3 leading-relaxed">
                        {silo.problem}
                      </p>
                      <div className="flex items-center gap-2 rounded-lg bg-red-500/8 border border-red-500/10 px-3 py-2">
                        <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                        <span className="text-xs font-medium text-red-300/80">{silo.cost}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Aggregate cost */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 rounded-xl border border-red-500/15 bg-red-500/5 px-6 py-3">
              <DollarSign className="h-5 w-5 text-red-400" />
              <div className="text-left">
                <p className="text-sm font-bold text-white">Avg. annual cost of misalignment</p>
                <p className="text-xs text-red-300/70">$2.4M for a 200-person engineering org</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 3. THE CONNECTED ORGANIZATION ─── */}
      <Section variant="dark" className="py-24 sm:py-32 bg-[#080c0a]">
        <div
          ref={connected.ref}
          className={cn(
            "transition-all duration-700",
            connected.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <Chip dotColor={EMERALD} className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              The Solution
            </Chip>
            <h2 className="text-heading-1 text-white mb-4">
              Every product bridges a gap
            </h2>
            <p className="mx-auto max-w-xl text-body-base text-white/40">
              Each Voatomy product creates a permanent connection between teams that used to
              operate in the dark. Together, they form one connected organization.
            </p>
          </div>

          {/* Connection cards with visual bridge */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {CONNECTIONS.map((conn, i) => {
              const Icon = conn.icon;
              return (
                <Card
                  key={i}
                  variant="dark"
                  className="relative overflow-hidden border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 group"
                >
                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(to right, transparent, ${conn.color}40, transparent)` }}
                  />

                  {/* Product badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${conn.color}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: conn.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{conn.product}</span>
                        <span
                          className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${conn.color}15`, color: conn.color }}
                        >
                          {conn.bridge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Visual bridge: Team A --> Product --> Team B */}
                  <div className="flex items-center justify-center gap-2 mb-4 py-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-xs font-semibold text-white/70 px-2 py-1 rounded bg-white/5">
                      {conn.from}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-px" style={{ backgroundColor: `${conn.color}40` }} />
                      <CircleDot className="h-3 w-3" style={{ color: conn.color }} />
                      <div className="w-6 h-px" style={{ backgroundColor: `${conn.color}40` }} />
                    </div>
                    <span className="text-xs font-semibold text-white/70 px-2 py-1 rounded bg-white/5">
                      {conn.to}
                    </span>
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed">
                    {conn.description}
                  </p>
                </Card>
              );
            })}
          </div>

          {/* Unifier note */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-3">
              <Network className="h-5 w-5 text-emerald-400" />
              <div className="text-left">
                <p className="text-sm font-bold text-white">NEXUS unifies all connections</p>
                <p className="text-xs text-emerald-300/60">Cross-product intelligence layer correlates signals across every bridge</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 4. CROSS-TEAM DASHBOARD ─── */}
      <Section variant="dark" className="py-24 sm:py-32 bg-[#0a0a0a]">
        <div
          ref={dashboard.ref}
          className={cn(
            "transition-all duration-700",
            dashboard.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <Chip dotColor={EMERALD} className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Live Dashboard
            </Chip>
            <h2 className="text-heading-1 text-white mb-4">
              Cross-team visibility in real time
            </h2>
            <p className="mx-auto max-w-xl text-body-base text-white/40">
              One dashboard for org-wide sprint health, cross-team dependencies,
              revenue alignment, and feature impact attribution.
            </p>
          </div>

          {/* Dashboard mock */}
          <div className="mx-auto max-w-5xl rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
                <span className="text-sm font-semibold text-white/70">Cross-Team Alignment Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <PulsingDot color={EMERALD} />
                <span className="text-xs text-white/30">Live</span>
              </div>
            </div>

            {/* Org-wide sprint health */}
            <div className="px-6 py-5 border-b border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-4 w-4 text-emerald-400/60" />
                <span className="text-xs text-white/30 uppercase tracking-wide font-medium">
                  Org-Wide Sprint Health
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {DASHBOARD_TEAMS.map((team, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-3 hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: team.color }} />
                      <span className="text-xs font-medium text-white/60">{team.name}</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-1.5">
                      <span className="text-xl font-bold" style={{ color: team.color }}>{team.health}%</span>
                    </div>
                    {/* Health bar */}
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${team.health}%`, backgroundColor: team.color }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="text-white/25">Sprint {team.sprints}</span>
                      <span style={{ color: team.velocity.startsWith("+") ? EMERALD : "#EF4444" }}>
                        {team.velocity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dependencies + Revenue Alignment row */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
              {/* Dependency Graph */}
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch className="h-4 w-4 text-orange-400/60" />
                  <span className="text-xs text-white/30 uppercase tracking-wide font-medium">
                    Cross-Team Dependencies
                  </span>
                </div>
                <div className="space-y-2.5">
                  {DEPENDENCIES.map((dep, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg bg-white/[0.02] border border-white/5 px-3 py-2.5"
                    >
                      <div className={cn(
                        "h-2 w-2 rounded-full shrink-0",
                        dep.status === "blocked" && "bg-red-400",
                        dep.status === "in-progress" && "bg-yellow-400",
                        dep.status === "resolved" && "bg-emerald-400",
                      )} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="font-medium text-white/70">{dep.from}</span>
                          <ArrowRight className="h-3 w-3 text-white/20" />
                          <span className="font-medium text-white/70">{dep.to}</span>
                        </div>
                        <span className="text-[10px] text-white/30">{dep.label}</span>
                      </div>
                      <span className={cn(
                        "text-[10px] font-medium px-2 py-0.5 rounded-full",
                        dep.status === "blocked" && "bg-red-500/10 text-red-300",
                        dep.status === "in-progress" && "bg-yellow-500/10 text-yellow-300",
                        dep.status === "resolved" && "bg-emerald-500/10 text-emerald-300",
                      )}>
                        {dep.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue alignment + Feature attribution */}
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-4 w-4 text-indigo-400/60" />
                  <span className="text-xs text-white/30 uppercase tracking-wide font-medium">
                    Revenue Alignment
                  </span>
                </div>

                {/* Score */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative h-20 w-20 shrink-0">
                    <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15" fill="none" stroke={EMERALD} strokeWidth="3"
                        strokeDasharray={`${87 * 0.9425} ${(100 - 87) * 0.9425}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-emerald-400">87%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Revenue-Engineering Score</p>
                    <p className="text-xs text-white/30 mt-0.5">87% of engineering effort maps to revenue-generating features</p>
                  </div>
                </div>

                {/* Feature ships with impact */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400/50" />
                    <span className="text-[10px] text-white/30 uppercase tracking-wide">Recent Ships</span>
                  </div>
                  {[
                    { feature: "Auth SSO v2", teams: ["Platform", "Frontend"], impact: "$1.2M ARR" },
                    { feature: "Real-time Sync", teams: ["Backend", "Mobile"], impact: "$840K ARR" },
                  ].map((ship, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-xs rounded-lg bg-white/[0.02] border border-white/5 px-3 py-2"
                    >
                      <span className="font-medium text-white/70">{ship.feature}</span>
                      <div className="flex gap-1 flex-1">
                        {ship.teams.map((t) => (
                          <span key={t} className="text-[10px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="font-semibold text-emerald-400">{ship.impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom status */}
            <div className="px-6 py-3 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
              <span className="text-xs text-white/20">
                Data from ATLAS + LOOP + SIGNAL + DRIFT + PHANTOM
              </span>
              <span className="text-xs text-white/20">Updated 4s ago</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 5. THE MULTIPLIER EFFECT ─── */}
      <Section variant="dark" className="py-24 sm:py-32 bg-[#080c0a]">
        <div
          ref={multiplier.ref}
          className={cn(
            "transition-all duration-700",
            multiplier.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <Chip dotColor={EMERALD} className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Measured Impact
            </Chip>
            <h2 className="text-heading-1 text-white mb-4">
              The multiplier effect
            </h2>
            <p className="mx-auto max-w-xl text-body-base text-white/40">
              When teams are connected, improvements compound. Every alignment gain
              multiplies across the entire organization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {MULTIPLIER_STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="relative group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all duration-300 text-center"
                >
                  {/* Glow accent on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                      <Icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <p className="text-3xl font-bold text-emerald-400 mb-2">{stat.value}</p>
                    <p className="text-sm font-semibold text-white mb-2">{stat.label}</p>
                    <p className="text-xs text-white/30 leading-relaxed">{stat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ─── 6. PRODUCT STACK ─── */}
      <Section variant="dark" className="py-24 sm:py-32 bg-[#0a0a0a]">
        <div
          ref={stack.ref}
          className={cn(
            "transition-all duration-700",
            stack.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-16">
            <Chip dotColor={EMERALD} className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              Platform Stack
            </Chip>
            <h2 className="text-heading-1 text-white mb-4">
              Five products. One connected org.
            </h2>
            <p className="mx-auto max-w-xl text-body-base text-white/40">
              Each product solves a specific cross-team gap. Together, unified by NEXUS,
              they create the nervous system of a well-run company.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Product rows */}
            <div className="space-y-3 mb-6">
              {PRODUCT_STACK.map((product, i) => {
                const Icon = product.icon;
                return (
                  <div
                    key={i}
                    className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${product.color}12` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: product.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-white">{product.name}</span>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: `${product.color}12`, color: product.color }}>
                          {product.tagline}
                        </span>
                      </div>
                      <p className="text-xs text-white/40">{product.contribution}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/15 group-hover:text-white/40 transition-colors shrink-0" />
                  </div>
                );
              })}
            </div>

            {/* NEXUS unifier row */}
            <div className="relative rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-5 py-5 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/20">
                  <Network className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold text-white">NEXUS</span>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                      Unifier
                    </span>
                  </div>
                  <p className="text-xs text-white/40">
                    The AI nerve center that correlates signals across all five products, creating
                    organizational intelligence no single tool can deliver alone.
                  </p>
                </div>

                {/* Visual: mini connection dots */}
                <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                  {Object.values(PRODUCT_COLORS).slice(0, 5).map((color, i) => (
                    <div key={i} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color, opacity: 0.6 }} />
                  ))}
                  <ChevronRight className="h-3 w-3 text-emerald-400/40" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 7. CTA ─── */}
      <Section variant="dark" className="py-24 sm:py-32 bg-[#080c0a]">
        <div
          ref={cta.ref}
          className={cn(
            "transition-all duration-700",
            cta.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="mx-auto max-w-2xl">
            <div className="relative rounded-3xl p-px bg-gradient-to-b from-emerald-500/30 via-white/5 to-transparent">
              <div className="rounded-3xl bg-[#0c0f0d] px-8 py-14 sm:px-12">
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <Users className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h2 className="text-heading-1 text-white mb-3">
                    Start connecting your teams
                  </h2>
                  <p className="text-body-base text-white/40 max-w-md mx-auto mb-8">
                    Break down the silos that are costing your org millions. See how
                    Voatomy creates the connected organization your teams deserve.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold w-full sm:w-auto" asChild>
                      <Link href="/products/nexus">
                        Explore NEXUS <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="secondary" size="lg" className="border-white/10 text-white/70 hover:text-white hover:border-white/20 w-full sm:w-auto" asChild>
                      <Link href="/pricing">
                        View Pricing <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <p className="mt-8 text-xs text-white/20">
                    Start with ATLAS for free &middot; Add products as you grow &middot; Full NEXUS for enterprise
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
    </main>
  );
}

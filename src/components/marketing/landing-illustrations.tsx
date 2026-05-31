"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { IntegrationLogo } from "@/components/icons/integration-logos";
import { VoatomyLogoMark } from "@/components/icons/voatomy-logo-mark";
import { integrationKeyFromName } from "@/lib/integration-name-map";

const INK = "#0f172a";
const MUTED = "#64748b";
const ORANGE = "#F05A28";
const BLUE = "#3B82F6";
const GREEN = "#22C55E";

export function FramerMeshBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute -left-[10%] top-[8%] h-[55%] w-[45%] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #FFE8DC 0%, transparent 70%)" }}
      />
      <div
        className="absolute -right-[8%] bottom-[5%] h-[50%] w-[42%] rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(circle, #DBEAFE 0%, transparent 70%)" }}
      />
      <div
        className="absolute left-[35%] top-[45%] h-[35%] w-[30%] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #EDE9FE 0%, transparent 70%)" }}
      />
    </div>
  );
}

export function FramerSceneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl", className)}>
      <FramerMeshBackdrop />
      <div className="relative rounded-3xl border border-white/80 bg-white/90 p-4 shadow-[0_24px_60px_-12px_rgba(15,23,42,0.15)] backdrop-blur-sm sm:p-5">
        {children}
      </div>
      <div
        aria-hidden
        className="absolute -bottom-2 -right-2 -z-10 h-full w-full rounded-3xl bg-gradient-to-br from-[#F05A28]/15 to-[#3B82F6]/10"
      />
    </div>
  );
}

function LogoNode({ name, x, y, size = 36 }: { name: string; x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2})`}>
      <rect width={size} height={size} rx={10} fill="#fff" stroke="#e2e8f0" strokeWidth="1.2" />
      <foreignObject x={6} y={6} width={size - 12} height={size - 12}>
        <div className="flex h-full w-full items-center justify-center">
          <IntegrationLogo
            integrationKey={integrationKeyFromName(name)}
            name={name}
            size="sm"
            className="h-5 w-5"
          />
        </div>
      </foreignObject>
    </g>
  );
}

function ConnectIllustration() {
  const tools = ["GitHub", "Jira", "Slack", "Linear", "Figma", "Notion"];
  const cx = 120;
  const cy = 90;
  const r = 58;

  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" aria-hidden>
      {tools.map((name, i) => {
        const a = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        return (
          <g key={name}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 3" />
            <LogoNode name={name} x={x} y={y} />
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={28} fill="url(#hub-grad)" stroke="#F05A28" strokeWidth="2" />
      <foreignObject x={cx - 14} y={cy - 14} width={28} height={28}>
        <div className="flex h-full w-full items-center justify-center">
          <VoatomyLogoMark className="h-6 w-6" />
        </div>
      </foreignObject>
      <text x={cx} y={cy + 42} textAnchor="middle" fill={INK} fontSize="9" fontWeight="700">
        Layer on your board
      </text>
      <defs>
        <linearGradient id="hub-grad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FFF4EF" />
          <stop offset="1" stopColor="#FFE8DC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AnalyzeIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" aria-hidden>
      <rect x="28" y="24" width="184" height="132" rx="14" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="28" y="24" width="184" height="28" rx="14" fill="#f8fafc" />
      <circle cx="44" cy="38" r="4" fill={ORANGE} />
      <text x="56" y="42" fill={INK} fontSize="9" fontWeight="700">
        ATLAS · Signal synthesis
      </text>
      {[
        { label: "Code", color: ORANGE, w: 118 },
        { label: "Capacity", color: GREEN, w: 92 },
        { label: "Demand", color: BLUE, w: 104 },
        { label: "Debt", color: "#EAB308", w: 76 },
      ].map((row, i) => {
        const y = 64 + i * 22;
        return (
          <g key={row.label}>
            <text x="42" y={y + 4} fill={MUTED} fontSize="8" fontWeight="600">
              {row.label}
            </text>
            <rect x="88" y={y - 5} width={100} height="8" rx="4" fill="#f1f5f9" />
            <rect x="88" y={y - 5} width={row.w * 0.85} height="8" rx="4" fill={row.color} opacity="0.85" />
          </g>
        );
      })}
      <g transform="translate(156 18) rotate(4)">
        <rect width="52" height="24" rx="12" fill={ORANGE} />
        <text x="26" y="16" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800">
          87%
        </text>
      </g>
    </svg>
  );
}

function ShipIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" aria-hidden>
      <rect x="36" y="32" width="168" height="116" rx="14" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
      {["Plan", "Build", "Review", "Ship"].map((step, i) => {
        const x = 52 + i * 40;
        const done = i < 4;
        return (
          <g key={step}>
            <circle cx={x} cy={68} r={10} fill={done ? GREEN : "#f1f5f9"} stroke={done ? GREEN : "#cbd5e1"} strokeWidth="1.5" />
            {done && (
              <path d={`M ${x - 4} 68 L ${x - 1} 71 L ${x + 5} 64`} stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
            )}
            <text x={x} y={92} textAnchor="middle" fill={MUTED} fontSize="7" fontWeight="600">
              {step}
            </text>
            {i < 3 && (
              <line x1={x + 12} y1={68} x2={x + 28} y2={68} stroke={done ? GREEN : "#e2e8f0"} strokeWidth="2" />
            )}
          </g>
        );
      })}
      <rect x="52" y="108" width="136" height="24" rx="12" fill="#ecfdf5" stroke="#86efac" strokeWidth="1" />
      <text x="120" y="124" textAnchor="middle" fill="#15803d" fontSize="9" fontWeight="700">
        Sprint 24 · On track
      </text>
    </svg>
  );
}

const WORKFLOW_SCENES = [ConnectIllustration, AnalyzeIllustration, ShipIllustration] as const;

export function WorkflowStepIllustration({ step }: { step: number }) {
  const Scene = WORKFLOW_SCENES[step] ?? ConnectIllustration;
  return (
    <FramerSceneFrame className="aspect-[4/3] w-full">
      <Scene />
    </FramerSceneFrame>
  );
}

function BenefitHubScene() {
  return (
    <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden>
      <rect x="20" y="28" width="240" height="108" rx="12" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" transform="rotate(-2 140 82)" />
      <rect x="32" y="40" width="48" height="48" rx="10" fill="#FFF4EF" stroke="#F05A28" strokeWidth="1" />
      <foreignObject x="44" y="52" width="24" height="24">
        <div className="flex h-full w-full items-center justify-center">
          <VoatomyLogoMark className="h-5 w-5" />
        </div>
      </foreignObject>
      {[90, 72, 110].map((w, i) => (
        <rect key={i} x={98} y={52 + i * 22} width={w} height="6" rx="3" fill={ORANGE} opacity={0.7 - i * 0.15} />
      ))}
    </svg>
  );
}

function BenefitSpeedScene() {
  return (
    <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden>
      <rect x="48" y="36" width="184" height="88" rx="12" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="68" y="68" width="144" height="8" rx="4" fill="#f1f5f9" />
      <rect x="68" y="68" width="120" height="8" rx="4" fill={BLUE} />
      <text x="140" y="98" textAnchor="middle" fill={INK} fontSize="18" fontWeight="800">
        20 min
      </text>
    </svg>
  );
}

function BenefitTeamsScene() {
  const colors = [BLUE, ORANGE, GREEN];
  return (
    <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden>
      {["E", "P", "S"].map((letter, i) => (
        <g key={letter} transform={`translate(${48 + i * 72} 48)`}>
          <circle cx="24" cy="20" r="18" fill={`${colors[i]}18`} stroke={colors[i]} strokeWidth="1.5" />
          <text x="24" y="25" textAnchor="middle" fill={colors[i]} fontSize="10" fontWeight="800">
            {letter}
          </text>
          <rect x="0" y="48" width="48" height="36" rx="8" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

function BenefitPricingScene() {
  return (
    <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden>
      <rect x="88" y="32" width="104" height="96" rx="14" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="140" y="72" textAnchor="middle" fill={INK} fontSize="26" fontWeight="800">
        $29
      </text>
      <rect x="108" y="98" width="64" height="18" rx="9" fill={ORANGE} />
    </svg>
  );
}

function BenefitSetupScene() {
  return (
    <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden>
      <LogoNode name="GitHub" x={70} y={80} size={40} />
      <LogoNode name="Jira" x={140} y={56} size={40} />
      <LogoNode name="Slack" x={210} y={80} size={40} />
      <rect x="100" y="108" width="80" height="24" rx="12" fill="#ecfdf5" stroke="#86efac" strokeWidth="1" />
      <text x="140" y="124" textAnchor="middle" fill="#15803d" fontSize="9" fontWeight="700">
        Live in 5 min
      </text>
    </svg>
  );
}

function BenefitSupportScene() {
  return (
    <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden>
      <rect x="48" y="40" width="120" height="44" rx="12" fill={BLUE} />
      <rect x="112" y="96" width="120" height="44" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <circle cx="72" cy="128" r="14" fill="#FFF4EF" stroke={ORANGE} strokeWidth="1.5" />
      <text x="72" y="132" textAnchor="middle" fill={ORANGE} fontSize="10" fontWeight="800">
        ✓
      </text>
    </svg>
  );
}

const BENEFIT_SCENES = [
  BenefitHubScene,
  BenefitSpeedScene,
  BenefitTeamsScene,
  BenefitPricingScene,
  BenefitSetupScene,
  BenefitSupportScene,
] as const;

export function BenefitIllustration({ index }: { index: number }) {
  const Scene = BENEFIT_SCENES[index % BENEFIT_SCENES.length];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#fafafa] sm:rounded-2xl">
      <FramerMeshBackdrop />
      <div className="relative flex h-full items-center justify-center p-3">
        <Scene />
      </div>
    </div>
  );
}

export function TeamSolutionIcon({ index, className }: { index: number; className?: string }) {
  const icons = [
    <svg key="eng" viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="#EFF6FF" />
      <path d="M11 12 L8 16 L11 20 M21 12 L24 16 L21 20 M18 11 L14 21" stroke={BLUE} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>,
    <svg key="pm" viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="#FFF4EF" />
      <rect x="10" y="18" width="4" height="8" rx="1" fill={ORANGE} />
      <rect x="16" y="14" width="4" height="12" rx="1" fill="#FB923C" />
      <rect x="22" y="10" width="4" height="16" rx="1" fill="#F97316" />
    </svg>,
    <svg key="lead" viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="#F5F3FF" />
      <circle cx="16" cy="13" r="4" fill="#8B5CF6" />
      <path d="M10 24 C10 20 12.5 18 16 18 C19.5 18 22 20 22 24" fill="#A78BFA" />
    </svg>,
    <svg key="sre" viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="#ECFDF5" />
      <path d="M16 9 L22 23 H10 Z" fill="#FEF9C3" stroke="#EAB308" strokeWidth="1.2" />
    </svg>,
    <svg key="design" viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="#FDF2F8" />
      <circle cx="13" cy="15" r="4" fill="#EC4899" />
      <rect x="18" y="11" width="7" height="7" rx="2" fill="#F43F5E" />
    </svg>,
    <svg key="rev" viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="#e6fff0" />
      <text x="16" y="20" textAnchor="middle" fill="#004838" fontSize="11" fontWeight="800">
        $
      </text>
    </svg>,
  ];
  return icons[index % icons.length];
}

export function IndustrySolutionIcon({ index, className }: { index: number; className?: string }) {
  const icons = [
    <svg key="saas" viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="#EFF6FF" />
      <rect x="10" y="12" width="12" height="8" rx="2" fill={BLUE} opacity="0.2" stroke={BLUE} strokeWidth="1.2" />
    </svg>,
    <svg key="fin" viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="#FFFBEB" />
      <rect x="11" y="10" width="10" height="14" rx="2" fill="#F59E0B" />
    </svg>,
    <svg key="health" viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="#FEF2F2" />
      <path d="M16 22 C16 22 10 18 10 14 C10 11.5 12 10 14 10 C15 10 16 10.5 16 11.5 C16 10.5 17 10 18 10 C20 10 22 11.5 22 14 C22 18 16 22 16 22 Z" fill="#EF4444" />
    </svg>,
    <svg key="ent" viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="#F1F5F9" />
      <rect x="10" y="11" width="5" height="12" rx="1" fill="#64748B" />
      <rect x="17" y="11" width="5" height="12" rx="1" fill="#475569" />
    </svg>,
    <svg key="ecom" viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="#FFF4EF" />
      <path d="M11 13 H21 L19 23 H13 Z" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>,
    <svg key="dev" viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="#ECFEFF" />
      <rect x="9" y="11" width="14" height="10" rx="2" fill="#06B6D4" opacity="0.25" stroke="#0891B2" strokeWidth="1.2" />
    </svg>,
  ];
  return icons[index % icons.length];
}

const PRODUCT_SCENE_COLORS: Record<string, string> = {
  atlas: ORANGE,
  loop: "#6366F1",
  signal: "#EF4444",
  drift: "#8B5CF6",
  phantom: "#22D3EE",
  nexus: "#004838",
};

function ProductSceneCard({
  productKey,
  label,
  rows,
}: {
  productKey: string;
  label: string;
  rows: { text: string; width: string; accent?: boolean }[];
}) {
  const accent = PRODUCT_SCENE_COLORS[productKey] ?? ORANGE;

  return (
    <div className="w-full max-w-[280px] rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.12)]">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
        <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
          {label}
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map((row) => (
          <div
            key={row.text}
            className="flex items-center gap-2 rounded-lg px-2.5 py-2"
            style={{
              backgroundColor: row.accent ? `${accent}12` : "#f8fafc",
              border: row.accent ? `1px solid ${accent}30` : "1px solid #e2e8f0",
            }}
          >
            <span
              className="h-1.5 shrink-0 rounded-full"
              style={{ width: row.width, backgroundColor: row.accent ? accent : MUTED }}
            />
            <span className="truncate text-[11px] font-medium text-[#334155]">{row.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PRODUCT_SCENES: Record<string, React.ReactNode> = {
  atlas: (
    <ProductSceneCard
      productKey="atlas"
      label="Sprint plan"
      rows={[
        { text: "Auth refactor — 5 pts (87% confidence)", width: "72%", accent: true },
        { text: "Checkout flow — 3 pts", width: "48%" },
        { text: "Debt paydown — 2 pts", width: "32%" },
      ]}
    />
  ),
  loop: (
    <ProductSceneCard
      productKey="loop"
      label="Revenue signal"
      rows={[
        { text: "Enterprise churn risk — $240K ARR", width: "80%", accent: true },
        { text: "Sales call: SSO blocker", width: "56%" },
        { text: "Support spike: billing API", width: "64%" },
      ]}
    />
  ),
  signal: (
    <ProductSceneCard
      productKey="signal"
      label="Incident impact"
      rows={[
        { text: "P1 — 12 customers, $89K ARR at risk", width: "88%", accent: true },
        { text: "CS brief auto-generated", width: "52%" },
        { text: "Sales deal-risk alert sent", width: "60%" },
      ]}
    />
  ),
  drift: (
    <ProductSceneCard
      productKey="drift"
      label="Design drift"
      rows={[
        { text: "Button token mismatch — 3 components", width: "70%", accent: true },
        { text: "Figma vs code: spacing delta", width: "55%" },
        { text: "Conversion impact: -2.1%", width: "45%" },
      ]}
    />
  ),
  phantom: (
    <ProductSceneCard
      productKey="phantom"
      label="Debt radar"
      rows={[
        { text: "payments/ — $48K remediation cost", width: "76%", accent: true },
        { text: "auth/ — complexity hotspot", width: "58%" },
        { text: "ROI: pay down before Q3", width: "42%" },
      ]}
    />
  ),
  nexus: (
    <div className="relative flex h-[180px] w-full max-w-[280px] items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e6fff0] via-white to-[#EDE9FE] opacity-80" />
      <div className="relative flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#F05A28]/30 bg-white shadow-lg">
          <VoatomyLogoMark className="h-10 w-10" />
        </div>
        <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#004838]">NEXUS</span>
        <span className="mt-1 text-[11px] font-medium text-[#64748b]">Org intelligence hub</span>
      </div>
      {["ATLAS", "LOOP", "SIGNAL"].map((name, i) => {
        const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 42;
        const y = 50 + Math.sin(angle) * 38;
        return (
          <span
            key={name}
            className="absolute rounded-full border border-[#e2e8f0] bg-white px-2 py-0.5 text-[9px] font-bold text-[#334155] shadow-sm"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
          >
            {name}
          </span>
        );
      })}
    </div>
  ),
};

export function ProductLandingIllustration({ productKey }: { productKey: string }) {
  return (
    <FramerSceneFrame className="mx-auto w-full max-w-md">
      <div className="flex min-h-[200px] items-center justify-center py-2">
        {PRODUCT_SCENES[productKey] ?? PRODUCT_SCENES.atlas}
      </div>
    </FramerSceneFrame>
  );
}

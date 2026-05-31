"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  Briefcase,
  Building,
  Building2,
  Cloud,
  Code2,
  Gamepad2,
  Globe2,
  GraduationCap,
  Heart,
  HeartPulse,
  Landmark,
  Link2,
  MapPin,
  Megaphone,
  Palette,
  Rocket,
  Server,
  Settings,
  ShoppingCart,
  Sparkles,
  Target,
  TestTube2,
  TrendingUp,
  Tv,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";
import type { ProductKey, Purpose } from "@/types";
import { ProductLogoMark } from "@/components/icons/product-logos";

// ── Per-role gradient + emoji ─────────────────────────────────────────────
const ROLE_CONFIG: Record<string, { from: string; to: string; emoji: string }> = {
  "founder":             { from: "#F05A28", to: "#e02d2d", emoji: "🚀" },
  "cto-vp":              { from: "#7C3AED", to: "#4F46E5", emoji: "🏛" },
  "engineering-manager": { from: "#2563EB", to: "#1D4ED8", emoji: "💼" },
  "tech-lead":           { from: "#0891B2", to: "#0E7490", emoji: "🛠" },
  "engineer":            { from: "#059669", to: "#047857", emoji: "💻" },
  "designer":            { from: "#DB2777", to: "#BE185D", emoji: "🎨" },
  "product-manager":     { from: "#3B82F6", to: "#6366F1", emoji: "📊" },
  "operations":          { from: "#64748B", to: "#475569", emoji: "⚙️" },
  "devops-sre":          { from: "#0EA5E9", to: "#0284C7", emoji: "🔧" },
  "qa-engineer":         { from: "#10B981", to: "#059669", emoji: "🧪" },
  "data-engineer":       { from: "#8B5CF6", to: "#7C3AED", emoji: "📈" },
  "sales-leader":        { from: "#F59E0B", to: "#D97706", emoji: "💰" },
  "cs-leader":           { from: "#EC4899", to: "#DB2777", emoji: "🤝" },
  "marketing":           { from: "#F97316", to: "#EA580C", emoji: "📣" },
  "other":               { from: "#A855F7", to: "#9333EA", emoji: "✨" },
};

// ── Per-industry gradient + emoji ─────────────────────────────────────────
const INDUSTRY_CONFIG: Record<string, { from: string; to: string; emoji: string }> = {
  "saas":        { from: "#3B82F6", to: "#6366F1", emoji: "☁️" },
  "fintech":     { from: "#10B981", to: "#059669", emoji: "🏦" },
  "healthtech":  { from: "#EF4444", to: "#DC2626", emoji: "🏥" },
  "ecommerce":   { from: "#F97316", to: "#EA580C", emoji: "🛒" },
  "devtools":    { from: "#059669", to: "#047857", emoji: "🔧" },
  "enterprise":  { from: "#475569", to: "#334155", emoji: "🏢" },
  "agency":      { from: "#7C3AED", to: "#6D28D9", emoji: "🎯" },
  "education":   { from: "#2563EB", to: "#1D4ED8", emoji: "🎓" },
  "gaming":      { from: "#9333EA", to: "#7C3AED", emoji: "🎮" },
  "media":       { from: "#DC2626", to: "#B91C1C", emoji: "📺" },
  "ai-ml":       { from: "#6366F1", to: "#4F46E5", emoji: "🤖" },
  "crypto-web3": { from: "#0EA5E9", to: "#0284C7", emoji: "⛓️" },
  "nonprofit":   { from: "#EF4444", to: "#DC2626", emoji: "💚" },
  "government":  { from: "#1E40AF", to: "#1E3A8A", emoji: "🏛" },
  "other":       { from: "#A855F7", to: "#9333EA", emoji: "✨" },
};

// ── Per-region color + emoji ──────────────────────────────────────────────
const REGION_CONFIG: Record<string, { from: string; to: string; emoji: string }> = {
  "north-america": { from: "#3B82F6", to: "#1D4ED8", emoji: "🌎" },
  "europe":        { from: "#2563EB", to: "#4F46E5", emoji: "🌍" },
  "asia-pacific":  { from: "#10B981", to: "#0EA5E9", emoji: "🌏" },
  "latin-america": { from: "#F59E0B", to: "#F97316", emoji: "🌎" },
  "africa":        { from: "#EF4444", to: "#F97316", emoji: "🌍" },
  "middle-east":   { from: "#A855F7", to: "#6366F1", emoji: "🌍" },
};

// ── Step accent colors ────────────────────────────────────────────────────
const STEP_COLORS: Record<string, string> = {
  welcome:           "#F05A28",
  workspace:         "#3B82F6",
  connect:           "#10B981",
  team:              "#8B5CF6",
  customize:         "#F59E0B",
  launch:            "#F05A28",
  "atlas-connect":   "#F05A28",
  "atlas-board":     "#F05A28",
  "atlas-sprint":    "#F05A28",
  "loop-connect":    "#10B981",
  "loop-signals":    "#10B981",
  "signal-connect":  "#EF4444",
  "signal-catalog":  "#EF4444",
  "signal-routing":  "#EF4444",
  "drift-connect":   "#DB2777",
  "drift-config":    "#DB2777",
  "phantom-connect": "#6366F1",
  "phantom-config":  "#6366F1",
  "nexus-connect":   "#7C3AED",
  "nexus-products":  "#7C3AED",
};

// ── Shared gradient box ───────────────────────────────────────────────────
function GradientIconBox({
  from,
  to,
  emoji,
  size = "md",
  className,
}: {
  from: string;
  to: string;
  emoji: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}) {
  const boxSize  = { xs: "h-6 w-6",  sm: "h-8 w-8",  md: "h-10 w-10", lg: "h-12 w-12" }[size];
  const fontSize = { xs: "text-[11px]", sm: "text-sm", md: "text-base", lg: "text-xl" }[size];
  const radius   = { xs: "rounded-lg",  sm: "rounded-xl", md: "rounded-xl", lg: "rounded-2xl" }[size];

  return (
    <span
      className={cn("flex shrink-0 items-center justify-center", boxSize, radius, className)}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        boxShadow: `0 2px 8px ${from}44`,
      }}
      aria-hidden
    >
      <span className={cn("select-none leading-none", fontSize)}>{emoji}</span>
    </span>
  );
}

// ── Public exports ────────────────────────────────────────────────────────

export function ColorRoleIcon({
  role,
  size = "md",
  className,
}: {
  role: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}) {
  const cfg = ROLE_CONFIG[role] ?? { from: "#A855F7", to: "#9333EA", emoji: "✨" };
  return <GradientIconBox {...cfg} size={size} className={className} />;
}

export function ColorIndustryIcon({
  industry,
  size = "md",
  className,
}: {
  industry: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}) {
  const cfg = INDUSTRY_CONFIG[industry] ?? { from: "#A855F7", to: "#9333EA", emoji: "✨" };
  return <GradientIconBox {...cfg} size={size} className={className} />;
}

export function ColorRegionIcon({
  region,
  size = "sm",
  className,
}: {
  region: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}) {
  const cfg = REGION_CONFIG[region] ?? { from: "#64748B", to: "#475569", emoji: "🌐" };
  return <GradientIconBox {...cfg} size={size} className={className} />;
}

// ── Lucide tile icons (workspace step) ────────────────────────────────────

const INDUSTRY_TILE: Record<string, { Icon: LucideIcon; color: string; bg: string }> = {
  saas:        { Icon: Cloud,         color: "#2563EB", bg: "#EFF6FF" },
  fintech:     { Icon: Landmark,      color: "#059669", bg: "#ECFDF5" },
  healthtech:  { Icon: HeartPulse,    color: "#DC2626", bg: "#FEF2F2" },
  ecommerce:   { Icon: ShoppingCart,  color: "#EA580C", bg: "#FFF7ED" },
  devtools:    { Icon: Wrench,        color: "#047857", bg: "#ECFDF5" },
  enterprise:  { Icon: Building,      color: "#475569", bg: "#F8FAFC" },
  agency:      { Icon: Target,        color: "#7C3AED", bg: "#F5F3FF" },
  education:   { Icon: GraduationCap, color: "#1D4ED8", bg: "#EFF6FF" },
  gaming:      { Icon: Gamepad2,      color: "#7C3AED", bg: "#F5F3FF" },
  media:       { Icon: Tv,            color: "#DC2626", bg: "#FEF2F2" },
  "ai-ml":     { Icon: Bot,           color: "#4F46E5", bg: "#EEF2FF" },
  "crypto-web3": { Icon: Link2,       color: "#0284C7", bg: "#F0F9FF" },
  nonprofit:   { Icon: Heart,         color: "#E11D48", bg: "#FFF1F2" },
  government:  { Icon: Landmark,      color: "#1E40AF", bg: "#EFF6FF" },
  other:       { Icon: Sparkles,      color: "#9333EA", bg: "#FAF5FF" },
};

const REGION_TILE: Record<string, { Icon: LucideIcon; color: string; bg: string }> = {
  "north-america": { Icon: Globe2, color: "#2563EB", bg: "#EFF6FF" },
  europe:          { Icon: MapPin,   color: "#4F46E5", bg: "#EEF2FF" },
  "asia-pacific":  { Icon: Globe2, color: "#059669", bg: "#ECFDF5" },
  "latin-america": { Icon: Globe2, color: "#D97706", bg: "#FFFBEB" },
  africa:          { Icon: Globe2, color: "#EA580C", bg: "#FFF7ED" },
  "middle-east":   { Icon: MapPin, color: "#7C3AED", bg: "#F5F3FF" },
};

const PURPOSE_PRODUCT: Record<string, ProductKey> = {
  "sprint-planning": "atlas",
  "revenue-intelligence": "loop",
  "incident-management": "signal",
  "design-governance": "drift",
  "tech-debt-tracking": "phantom",
  "cross-team-alignment": "nexus",
  "project-management": "atlas",
  "capacity-planning": "atlas",
};

export function IndustryTileIcon({
  industry,
  size = "sm",
  className,
}: {
  industry: string;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const cfg = INDUSTRY_TILE[industry] ?? { Icon: Sparkles, color: "#9333EA", bg: "#FAF5FF" };
  const { Icon } = cfg;
  const iconSize = { xs: "h-3.5 w-3.5", sm: "h-4 w-4", md: "h-5 w-5" }[size];
  const boxSize = { xs: "h-7 w-7", sm: "h-9 w-9", md: "h-11 w-11" }[size];

  return (
    <span
      className={cn("flex shrink-0 items-center justify-center rounded-xl", boxSize, className)}
      style={{ backgroundColor: cfg.bg, color: cfg.color }}
      aria-hidden
    >
      <Icon className={iconSize} strokeWidth={2.2} />
    </span>
  );
}

export function RegionTileIcon({
  region,
  size = "sm",
  className,
}: {
  region: string;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const cfg = REGION_TILE[region] ?? { Icon: Globe2, color: "#64748B", bg: "#F8FAFC" };
  const { Icon } = cfg;
  const iconSize = { xs: "h-3.5 w-3.5", sm: "h-4 w-4", md: "h-5 w-5" }[size];
  const boxSize = { xs: "h-7 w-7", sm: "h-9 w-9", md: "h-11 w-11" }[size];

  return (
    <span
      className={cn("flex shrink-0 items-center justify-center rounded-xl", boxSize, className)}
      style={{ backgroundColor: cfg.bg, color: cfg.color }}
      aria-hidden
    >
      <Icon className={iconSize} strokeWidth={2.2} />
    </span>
  );
}

export function PurposeTileIcon({
  purpose,
  className,
}: {
  purpose: Purpose | string;
  className?: string;
}) {
  const product = PURPOSE_PRODUCT[purpose] ?? "atlas";
  return (
    <span
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-white shadow-sm",
        className,
      )}
      aria-hidden
    >
      <ProductLogoMark product={product} className="h-5 w-5" />
    </span>
  );
}

export function WorkspaceHeaderIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-[#3B82F6]/15",
        className,
      )}
      style={{
        background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
        boxShadow: "0 2px 10px rgba(59,130,246,0.18)",
      }}
    >
      <Building2 className="h-5 w-5 text-[#2563EB]" strokeWidth={2.2} />
    </div>
  );
}

const ROLE_TILE: Record<string, { Icon: LucideIcon; color: string; bg: string }> = {
  founder:             { Icon: Rocket,      color: "#F05A28", bg: "#FFF4EF" },
  "cto-vp":            { Icon: Landmark,    color: "#7C3AED", bg: "#F5F3FF" },
  "engineering-manager": { Icon: Briefcase, color: "#2563EB", bg: "#EFF6FF" },
  "tech-lead":         { Icon: Wrench,      color: "#0891B2", bg: "#ECFEFF" },
  engineer:            { Icon: Code2,       color: "#059669", bg: "#ECFDF5" },
  designer:            { Icon: Palette,   color: "#DB2777", bg: "#FDF2F8" },
  "product-manager":   { Icon: BarChart3,   color: "#4F46E5", bg: "#EEF2FF" },
  operations:          { Icon: Settings,    color: "#64748B", bg: "#F8FAFC" },
  "devops-sre":        { Icon: Server,      color: "#0284C7", bg: "#F0F9FF" },
  "qa-engineer":       { Icon: TestTube2,   color: "#10B981", bg: "#ECFDF5" },
  "data-engineer":     { Icon: TrendingUp,  color: "#8B5CF6", bg: "#F5F3FF" },
  "sales-leader":      { Icon: Users,       color: "#D97706", bg: "#FFFBEB" },
  "cs-leader":         { Icon: Heart,       color: "#E11D48", bg: "#FFF1F2" },
  marketing:           { Icon: Megaphone,   color: "#EA580C", bg: "#FFF7ED" },
  other:               { Icon: Sparkles,    color: "#9333EA", bg: "#FAF5FF" },
};

export function RoleTileIcon({
  role,
  size = "sm",
  className,
}: {
  role: string;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const cfg = ROLE_TILE[role] ?? { Icon: Sparkles, color: "#9333EA", bg: "#FAF5FF" };
  const { Icon } = cfg;
  const iconSize = { xs: "h-3.5 w-3.5", sm: "h-4 w-4", md: "h-5 w-5" }[size];
  const boxSize = { xs: "h-7 w-7", sm: "h-9 w-9", md: "h-11 w-11" }[size];

  return (
    <span
      className={cn("flex shrink-0 items-center justify-center rounded-xl", boxSize, className)}
      style={{ backgroundColor: cfg.bg, color: cfg.color }}
      aria-hidden
    >
      <Icon className={iconSize} strokeWidth={2.2} />
    </span>
  );
}

export function WelcomeHeaderIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-[#F05A28]/15",
        className,
      )}
      style={{
        background: "linear-gradient(135deg, #FFF4EF 0%, #FFE8DC 100%)",
        boxShadow: "0 2px 10px rgba(240,90,40,0.18)",
      }}
    >
      <UserRound className="h-5 w-5 text-[#F05A28]" strokeWidth={2.2} />
    </div>
  );
}

/** Backwards compat — now wraps ColorRoleIcon */
export function OnboardingRoleIcon({
  role,
  className,
}: {
  role: string;
  className?: string;
}) {
  return <ColorRoleIcon role={role} size="sm" className={className} />;
}

/** Backwards compat — now wraps ColorIndustryIcon */
export function OnboardingIndustryIcon({
  industry,
  className,
}: {
  industry: string;
  className?: string;
}) {
  return <ColorIndustryIcon industry={industry} size="sm" className={className} />;
}

/** Backwards compat — now wraps ColorRegionIcon */
export function OnboardingRegionIcon({
  region,
  className,
}: {
  region: string;
  className?: string;
}) {
  return <ColorRegionIcon region={region} size="sm" className={className} />;
}

/** Step icon — small colored dot used in steppers */
export function OnboardingStepIcon({
  step,
  className,
}: {
  step: string;
  className?: string;
}) {
  const color = STEP_COLORS[step] ?? "#F05A28";
  return (
    <span
      className={cn("inline-block rounded-full", className ?? "h-3 w-3")}
      style={{ backgroundColor: color }}
      aria-hidden
    />
  );
}

/** Product icon */
export function OnboardingProductIcon({
  product,
  className,
}: {
  product: ProductKey;
  className?: string;
}) {
  return <ProductLogoMark product={product} className={cn("h-7 w-7", className)} />;
}

/** Step header icon — for the top of each step card */
export function OnboardingHeaderIcon({
  stepKey,
  productKey,
  color,
  size = "md",
}: {
  stepKey?: string;
  productKey?: ProductKey;
  color?: string;
  size?: "sm" | "md" | "lg";
}) {
  const resolvedColor = color ?? (stepKey ? (STEP_COLORS[stepKey] ?? "#F05A28") : "#F05A28");
  const sizes  = { sm: "h-9 w-9",  md: "h-11 w-11", lg: "h-14 w-14" };
  const iSizes = { sm: "h-4 w-4",  md: "h-5 w-5",   lg: "h-7 w-7" };
  const radii  = { sm: "rounded-xl", md: "rounded-2xl", lg: "rounded-2xl" };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center ring-1 ring-black/[0.04]",
        sizes[size],
        radii[size],
      )}
      style={{
        background: `linear-gradient(135deg, ${resolvedColor}22, ${resolvedColor}08)`,
        boxShadow: `0 2px 10px ${resolvedColor}28`,
      }}
    >
      {productKey ? (
        <ProductLogoMark product={productKey} className={iSizes[size]} />
      ) : (
        <span
          className="text-base leading-none"
          style={{ color: resolvedColor }}
          aria-hidden
        >
          ◆
        </span>
      )}
    </div>
  );
}

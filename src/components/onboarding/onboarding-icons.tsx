"use client";

import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Banknote,
  Bell,
  Bot,
  Briefcase,
  Building2,
  ClipboardList,
  Cloud,
  Code2,
  Coins,
  Cpu,
  FlaskConical,
  Gamepad2,
  Ghost,
  Globe2,
  GraduationCap,
  Hand,
  Heart,
  HeartHandshake,
  HeartPulse,
  Landmark,
  Layers,
  LineChart,
  Link2,
  Megaphone,
  Package,
  Palette,
  Radio,
  Rocket,
  Settings2,
  ShoppingCart,
  Siren,
  Sparkles,
  Target,
  Tv,
  UserCog,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductKey } from "@/types";
import { ProductLogoMark } from "@/components/icons/product-logos";

const STEP_ICONS: Record<string, LucideIcon> = {
  welcome: Hand,
  workspace: Building2,
  connect: Link2,
  team: Users,
  customize: Bell,
  launch: Rocket,
  products: Package,
  "atlas-connect": Link2,
  "atlas-board": ClipboardList,
  "atlas-sprint": Zap,
  "loop-connect": Link2,
  "loop-signals": BarChart3,
  "signal-connect": Link2,
  "signal-catalog": Radio,
  "signal-routing": Siren,
  "drift-connect": Link2,
  "drift-config": Palette,
  "phantom-connect": Link2,
  "phantom-config": Ghost,
  "nexus-connect": Link2,
  "nexus-products": Layers,
};

const ROLE_ICONS: Record<string, LucideIcon> = {
  "engineering-manager": Briefcase,
  "tech-lead": Wrench,
  "product-manager": BarChart3,
  "cto-vp": Landmark,
  engineer: Code2,
  designer: Palette,
  founder: Rocket,
  operations: Settings2,
  "devops-sre": Cpu,
  "qa-engineer": FlaskConical,
  "data-engineer": LineChart,
  "sales-leader": Coins,
  "cs-leader": HeartHandshake,
  marketing: Megaphone,
  other: Sparkles,
};

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  saas: Cloud,
  fintech: Banknote,
  healthtech: HeartPulse,
  ecommerce: ShoppingCart,
  devtools: Wrench,
  enterprise: Building2,
  agency: Target,
  education: GraduationCap,
  gaming: Gamepad2,
  media: Tv,
  "ai-ml": Bot,
  "crypto-web3": Link2,
  nonprofit: Heart,
  government: Landmark,
  other: Sparkles,
};

const REGION_ICONS: Record<string, LucideIcon> = {
  "north-america": Globe2,
  europe: Globe2,
  "asia-pacific": Globe2,
  "latin-america": Globe2,
  africa: Globe2,
  "middle-east": Globe2,
};

export function OnboardingIndustryIcon({
  industry,
  className,
}: {
  industry: string;
  className?: string;
}) {
  const Icon = INDUSTRY_ICONS[industry] ?? Sparkles;
  return <Icon className={cn("h-3.5 w-3.5", className)} strokeWidth={2.25} aria-hidden />;
}

export function OnboardingRegionIcon({
  region,
  className,
}: {
  region: string;
  className?: string;
}) {
  const Icon = REGION_ICONS[region] ?? Globe2;
  return <Icon className={cn("h-3.5 w-3.5", className)} strokeWidth={2.25} aria-hidden />;
}

export function OnboardingStepIcon({
  step,
  className,
}: {
  step: string;
  className?: string;
}) {
  const Icon = STEP_ICONS[step] ?? Sparkles;
  return <Icon className={cn("h-4 w-4", className)} strokeWidth={2.25} aria-hidden />;
}

export function OnboardingRoleIcon({
  role,
  className,
}: {
  role: string;
  className?: string;
}) {
  const Icon = ROLE_ICONS[role] ?? UserCog;
  return <Icon className={cn("h-4 w-4", className)} strokeWidth={2.25} aria-hidden />;
}

export function OnboardingProductIcon({
  product,
  className,
}: {
  product: ProductKey;
  className?: string;
}) {
  return <ProductLogoMark product={product} className={cn("h-7 w-7", className)} />;
}

export function OnboardingHeaderIcon({
  stepKey,
  productKey,
  color = "#F05A28",
  size = "md",
}: {
  stepKey?: string;
  productKey?: ProductKey;
  color?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "h-9 w-9", md: "h-11 w-11", lg: "h-14 w-14" };
  const iconSizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-7 w-7" };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-2xl shadow-sm ring-1 ring-black/[0.04]",
        sizes[size],
      )}
      style={{ backgroundColor: `${color}14` }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-60"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${color}22 0%, transparent 65%)`,
        }}
      />
      {productKey ? (
        <ProductLogoMark product={productKey} className={iconSizes[size]} />
      ) : (
        <span style={{ color }}>
          <OnboardingStepIcon
            step={stepKey ?? "welcome"}
            className={cn(iconSizes[size], "relative")}
          />
        </span>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, X, Check, Lock, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { STEP_META } from "@/lib/constants";
import { useOnboarding } from "./onboarding-context";
import { useSession } from "@/hooks/use-session";
import { useDictionary } from "@/i18n/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { VoatomyLogo } from "@/components/icons/voatomy-logo-mark";
import type { OnboardingStep } from "@/types";

// ── Step subtitle copy ────────────────────────────────────────────────────
const STEP_SUBTITLES: Record<string, string> = {
  welcome:           "Tell us who you are",
  workspace:         "Name your team & pick your industry",
  connect:           "Link GitHub, Jira, Slack and more",
  team:              "Bring your colleagues along",
  customize:         "Set up alerts & preferences",
  launch:            "You're ready to go!",
  "atlas-connect":   "GitHub / GitLab / Jira",
  "atlas-board":     "Import your existing board",
  "atlas-sprint":    "Generate your first AI sprint plan",
  "loop-connect":    "Revenue & CRM data sources",
  "loop-signals":    "Configure revenue signals",
  "signal-connect":  "Monitoring & observability tools",
  "signal-catalog":  "Define your service catalog",
  "signal-routing":  "Configure alert routing",
  "drift-connect":   "Figma, Sketch & design tools",
  "drift-config":    "Sync rules & thresholds",
  "phantom-connect": "Repo & codebase access",
  "phantom-config":  "Tech-debt thresholds",
  "nexus-connect":   "All team integrations",
  "nexus-products":  "Activate your products",
};

// ── 3D Isometric Cube ─────────────────────────────────────────────────────
function IsoCube({ size = 40, color = "#F05A28", className }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden>
      <polygon points="50,4 96,27 50,50 4,27"  fill={color} />
      <polygon points="4,27 50,50 50,96 4,72"  fill={color} fillOpacity={0.55} />
      <polygon points="96,27 50,50 50,96 96,72" fill={color} fillOpacity={0.28} />
    </svg>
  );
}

// ── Sidebar step row ──────────────────────────────────────────────────────
function SidebarStep({
  stepKey, index, currentStep, completedSteps, stepOrder, isLast,
}: {
  stepKey: OnboardingStep;
  index: number;
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  stepOrder: OnboardingStep[];
  isLast: boolean;
}) {
  const currentIndex = stepOrder.indexOf(currentStep);
  const stepIndex    = stepOrder.indexOf(stepKey);
  const isPast       = stepIndex < currentIndex;
  const isCurrent    = stepKey === currentStep;
  const done         = isPast || completedSteps.includes(stepKey);

  const meta     = STEP_META[stepKey] ?? { label: stepKey, icon: "◆" };
  const subtitle = STEP_SUBTITLES[stepKey] ?? "";

  return (
    <div className="relative flex gap-3">
      {/* Vertical connector */}
      {!isLast && (
        <div className="absolute bottom-0 left-[15px] top-8 w-px">
          <motion.div
            className="h-full w-full rounded-full"
            animate={{ backgroundColor: done ? "#F05A28" : "#E5E7EB" }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      {/* Step circle */}
      <div className="relative z-[1] shrink-0">
        <motion.div
          initial={false}
          animate={{
            backgroundColor: done ? "#F05A28" : isCurrent ? "#FFF3EE" : "#F3F4F6",
            borderColor:     done ? "#F05A28" : isCurrent ? "#F05A28" : "#E5E7EB",
          }}
          transition={{ duration: 0.3 }}
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm"
        >
          {done ? (
            <Check className="h-4 w-4 text-white" strokeWidth={3} />
          ) : (
            <span className={cn("text-[12px] font-bold", isCurrent ? "text-[#F05A28]" : "text-gray-400")}>
              {index + 1}
            </span>
          )}
        </motion.div>

        {isCurrent && (
          <motion.span
            className="absolute -inset-1.5 rounded-full border-2 border-[#F05A28]/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      {/* Label + subtitle */}
      <div className="min-w-0 pb-5 pt-0.5">
        <p className={cn(
          "text-[13px] font-semibold leading-tight transition-colors",
          isCurrent ? "text-[#121312]" : done ? "text-gray-500" : "text-gray-400",
        )}>
          {meta.label}
        </p>
        {subtitle && (
          <p className={cn(
            "mt-0.5 text-[11px] leading-snug transition-colors line-clamp-2",
            isCurrent ? "text-gray-500" : "text-gray-300",
          )}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Sidebar utility actions (language, help, exit) ────────────────────────
function SidebarActions() {
  return (
    <div className="flex items-center gap-0.5">
      <LanguageSwitcher compact />
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#121312]"
        aria-label="Help"
      >
        <HelpCircle className="h-4 w-4" strokeWidth={2} />
      </button>
      <Link
        href="/"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#121312]"
        aria-label="Exit onboarding"
      >
        <X className="h-4 w-4" strokeWidth={2} />
      </Link>
    </div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────
interface OnboardingShellProps { children: React.ReactNode }

export function OnboardingShell({ children }: OnboardingShellProps) {
  const { step, completedSteps, stepOrder, currentStepIndex, totalSteps, progressPercent } = useOnboarding();
  const { logout } = useSession();
  const dict       = useDictionary();
  const shell      = dict.onboarding.shell;

  return (
    <main className="light-surface-typography flex min-h-screen bg-[#f4f5f7] text-fynk-ink">

      {/* ── Left sidebar ───────────────────────────────────── */}
      <aside className="relative hidden w-[min(100%,360px)] shrink-0 flex-col overflow-hidden border-r border-gray-100 bg-white xl:w-[380px] lg:flex">

        {/* Subtle orange gradient wash */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{ background: "radial-gradient(ellipse 110% 50% at 10% 110%, rgba(240,90,40,0.06) 0%, transparent 60%)" }}
        />

        {/* Floating 3D cubes — subtle on white */}
        <div className="pointer-events-none absolute right-6 top-10 opacity-[0.12]" aria-hidden>
          <IsoCube size={40} color="#F05A28" />
        </div>
        <div className="pointer-events-none absolute right-14 top-20 opacity-[0.07]" aria-hidden>
          <IsoCube size={22} color="#3B82F6" />
        </div>

        {/* Logo + sidebar actions (moved from navbar) */}
        <div className="relative z-10 flex shrink-0 items-center justify-between gap-3 px-7 pb-5 pt-7">
          <VoatomyLogo href="/" />
          <SidebarActions />
        </div>

        {/* Hero copy for active step */}
        <div className="relative z-10 shrink-0 px-7 pb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#F05A28]">
            {shell.stepOf
              .replace("{current}", String(currentStepIndex + 1))
              .replace("{total}", String(totalSteps))}
          </p>
          <h2 className="mt-1.5 text-[clamp(18px,1.6vw,24px)] font-bold leading-tight tracking-tight text-[#121312]">
            {STEP_SUBTITLES[step] ?? STEP_META[step]?.label ?? ""}
          </h2>
          <p className="mt-1.5 text-[12px] leading-snug text-gray-400">
            Complete each step to unlock your workspace.
          </p>

          {/* Progress bar */}
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#F05A28] to-[#3B82F6]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <p className="mt-1 text-[10px] font-semibold text-gray-400">
            {Math.round(progressPercent)}% complete
          </p>
        </div>

        {/* Step list */}
        <div className="relative z-10 flex-1 overflow-y-auto px-7 pb-3">
          <div>
            {stepOrder.map((s, i) => (
              <SidebarStep
                key={s}
                stepKey={s}
                index={i}
                currentStep={step}
                completedSteps={completedSteps}
                stepOrder={stepOrder}
                isLast={i === stepOrder.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Trust + sign-out */}
        <div className="relative z-10 shrink-0 border-t border-gray-100 px-7 py-4">
          <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <Lock className="h-3 w-3 shrink-0" /> {shell.encrypted}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <Shield className="h-3 w-3 shrink-0" /> {shell.soc2}
            </span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="text-[11px] font-medium text-gray-400 transition-colors hover:text-[#121312]"
          >
            {shell.signOut}
          </button>
        </div>
      </aside>

      {/* ── Main content ───────────────────────────────────── */}
      <div className="flex min-h-screen flex-1 flex-col">

        {/* Mobile-only top bar (sidebar hidden on small screens) */}
        <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-black/[0.06] bg-white/90 px-4 py-3 backdrop-blur-sm lg:hidden">
          <VoatomyLogo href="/" />
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#F05A28]/10 px-2.5 py-1 text-[10px] font-bold text-[#F05A28]">
              {shell.stepOf
                .replace("{current}", String(currentStepIndex + 1))
                .replace("{total}", String(totalSteps))}
            </span>
            <SidebarActions />
          </div>
        </header>

        {/* Mobile progress bar */}
        <div className="relative h-1 w-full bg-gray-100 lg:hidden">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#F05A28] to-[#3B82F6]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Mobile step pills */}
        <div className="shrink-0 overflow-x-auto px-4 pt-3 lg:hidden">
          <div className="flex gap-1.5 pb-2">
            {stepOrder.map((s, i) => {
              const ci   = stepOrder.indexOf(step);
              const done = i < ci || completedSteps.includes(s);
              const cur  = s === step;
              const meta = STEP_META[s] ?? { label: s };
              return (
                <span
                  key={s}
                  className={cn(
                    "flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors",
                    cur  ? "bg-[#F05A28] text-white shadow-sm"
                         : done ? "bg-[#F05A28]/12 text-[#F05A28]"
                              : "bg-gray-100 text-gray-400",
                  )}
                >
                  {done && !cur && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                  {meta.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Step content — centered, wider form card */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6 md:px-10 lg:py-8">
          <div className="w-full max-w-[680px]">
            <div className="overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white shadow-[0_12px_48px_rgba(17,24,39,0.08),0_2px_12px_rgba(17,24,39,0.04)]">
              <div
                className="h-1 w-full"
                style={{ background: "linear-gradient(90deg, #F05A28 0%, #F05A28 55%, #3B82F6 100%)" }}
                aria-hidden
              />
              <div className="max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain px-6 py-7 sm:px-9 sm:py-9 lg:max-h-[calc(100vh-4rem)]">
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="shrink-0 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-4 py-3 text-[10px] text-gray-400 lg:py-4">
          <span>&copy; 2025-2026 Voatomy Labs</span>
          <span>·</span>
          <span>{shell.encrypted}</span>
          <span>·</span>
          <span>{shell.soc2}</span>
        </footer>
      </div>
    </main>
  );
}

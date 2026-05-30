"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { STEP_META } from "@/lib/constants";
import { useOnboarding } from "./onboarding-context";
import { useSession } from "@/hooks/use-session";
import { useDictionary } from "@/i18n/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { VoatomyLogo } from "@/components/icons/voatomy-logo-mark";
import { OnboardingStepIcon } from "./onboarding-icons";
import type { OnboardingStep } from "@/types";

function StepNode({
  stepKey,
  label,
  index,
  currentStep,
  completedSteps,
  stepOrder,
}: {
  stepKey: OnboardingStep;
  label: string;
  index: number;
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  stepOrder: OnboardingStep[];
}) {
  const isCurrent = stepKey === currentStep;
  const isCompleted = completedSteps.includes(stepKey);
  const currentIndex = stepOrder.indexOf(currentStep);
  const stepIndex = stepOrder.indexOf(stepKey);
  const isPast = stepIndex < currentIndex;
  const done = isCompleted || isPast;

  return (
    <div className="relative z-[1] flex flex-1 flex-col items-center gap-1">
      <div
        className={cn(
          "relative flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 sm:h-8 sm:w-8",
          done && "bg-brand text-white shadow-[0_2px_8px_rgba(240,90,40,0.35)]",
          isCurrent &&
            !done &&
            "bg-white text-brand shadow-[0_0_0_3px_rgba(240,90,40,0.2)] ring-2 ring-brand",
          !isCurrent && !done && "border border-fynk-border bg-white text-fynk-muted/50",
        )}
      >
        {done ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <OnboardingStepIcon step={stepKey} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        )}
        {isCurrent && (
          <motion.span
            className="absolute -inset-1 rounded-full border border-brand/40"
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
      <span
        className={cn(
          "hidden max-w-[4rem] truncate text-center text-[9px] font-medium leading-tight sm:block",
          isCurrent ? "font-semibold text-fynk-ink" : done ? "text-fynk-muted" : "text-fynk-muted/50",
        )}
      >
        {label}
      </span>
      <span className="sr-only">
        Step {index + 1}: {label}
      </span>
    </div>
  );
}

function OnboardingStepper() {
  const { step, completedSteps, stepOrder, progressPercent, currentStepIndex, totalSteps } = useOnboarding();
  const dict = useDictionary();

  return (
    <div className="mx-auto w-full max-w-xl px-4">
      <div className="mb-2 flex items-center justify-between text-[10px] font-medium uppercase tracking-wider text-fynk-muted sm:hidden">
        <span>
          Step {currentStepIndex + 1} of {totalSteps}
        </span>
        <span className="text-brand">{Math.round(progressPercent)}%</span>
      </div>

      <div className="relative rounded-2xl border border-fynk-border/80 bg-white/70 px-3 py-3 shadow-sm backdrop-blur-sm sm:px-4 sm:py-3.5">
        <div className="absolute left-10 right-10 top-[1.125rem] hidden h-0.5 rounded-full bg-fynk-border sm:block" />
        <motion.div
          className="absolute left-10 hidden h-0.5 rounded-full bg-gradient-to-r from-brand to-[#3B82F6] sm:block"
          style={{ top: "1.125rem", maxWidth: "calc(100% - 5rem)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="relative flex items-start justify-between gap-1">
          {stepOrder.map((s, i) => (
            <StepNode
              key={s}
              stepKey={s}
              index={i}
              label={dict.onboarding.steps[s] ?? STEP_META[s]?.label ?? s}
              currentStep={step}
              completedSteps={completedSteps}
              stepOrder={stepOrder}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface OnboardingShellProps {
  children: React.ReactNode;
}

export function OnboardingShell({ children }: OnboardingShellProps) {
  const { currentStepIndex, totalSteps } = useOnboarding();
  const { logout } = useSession();
  const dict = useDictionary();
  const shell = dict.onboarding.shell;

  return (
    <main className="onboarding-flow relative flex min-h-screen flex-col overflow-hidden bg-[#f4f5f7]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(240,90,40,0.07) 0%, transparent 50%), radial-gradient(ellipse 50% 35% at 100% 0%, rgba(59,130,246,0.05) 0%, transparent 45%)",
        }}
      />

      <header className="relative z-10 flex shrink-0 items-center justify-between px-4 pt-4 md:px-6">
        <VoatomyLogo href="/" />

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher compact />
          <span className="hidden rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-fynk-muted ring-1 ring-fynk-border sm:inline">
            {shell.stepOf
              .replace("{current}", String(currentStepIndex + 1))
              .replace("{total}", String(totalSteps))}
          </span>
          <button
            type="button"
            onClick={logout}
            className="hidden text-xs font-medium text-fynk-muted transition-colors hover:text-fynk-ink sm:inline"
          >
            {shell.signOut}
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full text-fynk-muted transition-colors hover:bg-white/80 hover:text-fynk-ink"
            aria-label="Help"
          >
            <HelpCircle className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <Link
            href="/"
            className="flex h-7 w-7 items-center justify-center rounded-full text-fynk-muted transition-colors hover:bg-white/80 hover:text-fynk-ink"
            aria-label="Exit onboarding"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>
      </header>

      <div className="relative z-10 mt-4 mb-4 shrink-0">
        <OnboardingStepper />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[640px] flex-1 flex-col px-4 pb-4">
        <div className="flex max-h-[calc(100vh-11rem)] min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/90 bg-white shadow-[0_4px_24px_rgba(17,24,39,0.06)] sm:max-h-[calc(100vh-10.5rem)]">
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">{children}</div>
        </div>
      </div>

      <footer className="relative z-10 shrink-0 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-4 py-3 text-[10px] text-fynk-muted/70">
        <span>&copy; 2025-2026 Voatomy Labs</span>
        <span className="hidden sm:inline">·</span>
        <span>{shell.encrypted}</span>
        <span>·</span>
        <span>{shell.soc2}</span>
      </footer>
    </main>
  );
}

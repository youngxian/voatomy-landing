"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ONBOARDING_STEPS } from "@/lib/constants";
import { useOnboarding } from "./onboarding-context";
import { useSession } from "@/hooks/use-session";
import type { OnboardingStep } from "@/types";

// ── Step Indicator ──

function StepDot({
  stepKey,
  label,
  icon,
  currentStep,
  completedSteps,
  stepOrder,
}: {
  stepKey: OnboardingStep;
  label: string;
  icon: string;
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  stepOrder: OnboardingStep[];
}) {
  const isCurrent = stepKey === currentStep;
  const isCompleted = completedSteps.includes(stepKey);
  const currentIndex = stepOrder.indexOf(currentStep);
  const stepIndex = stepOrder.indexOf(stepKey);
  const isPast = stepIndex < currentIndex;

  return (
    <div className="flex flex-col items-center gap-1.5 min-w-0">
      <div
        className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-300",
          isCompleted || isPast
            ? "bg-brand text-[#121312] shadow-sm shadow-brand/25"
            : isCurrent
              ? "bg-brand text-[#121312] shadow-md shadow-brand/30 ring-4 ring-brand/15"
              : "border-2 border-[#121312]/12 bg-white text-[#121312]/35",
        )}
      >
        {isCompleted || isPast ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <span className="text-xs">{icon}</span>
        )}
        {isCurrent && (
          <motion.span
            className="absolute inset-0 rounded-full bg-brand"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
      <span
        className={cn(
          "text-[10px] font-medium tracking-tight transition-colors text-center leading-tight",
          isCurrent
            ? "text-[#121312] font-semibold"
            : isCompleted || isPast
              ? "text-[#121312]/65"
              : "text-[#121312]/35",
        )}
      >
        {label}
      </span>
    </div>
  );
}

function ProgressBar() {
  const { step, completedSteps, stepOrder, progressPercent } = useOnboarding();

  return (
    <div className="mx-auto w-full max-w-[600px] px-4">
      <div className="relative flex items-start justify-between">
        {/* Background line */}
        <div className="absolute left-4 right-4 top-[15px] h-[2px] rounded-full bg-[#121312]/8" />
        {/* Progress line */}
        <motion.div
          className="absolute left-4 top-[15px] h-[2px] rounded-full bg-brand"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "calc(100% - 32px)" }}
        />

        {ONBOARDING_STEPS.map((s) => (
          <StepDot
            key={s.key}
            stepKey={s.key}
            label={s.label}
            icon={s.icon}
            currentStep={step}
            completedSteps={completedSteps}
            stepOrder={stepOrder}
          />
        ))}
      </div>
    </div>
  );
}

// ── Shell ──

interface OnboardingShellProps {
  children: React.ReactNode;
}

export function OnboardingShell({ children }: OnboardingShellProps) {
  const { currentStepIndex, totalSteps } = useOnboarding();
  const { logout } = useSession();

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f7f8]">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-5 md:px-8">
        <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Back to Voatomy">
          <span
            className="grid h-[18px] w-[18px] place-items-center rounded-md bg-brand shadow-sm shadow-brand/25"
            aria-hidden="true"
          >
            <span className="block h-2 w-2 rounded-[3px] bg-safe-black/20" />
          </span>
          <span className="text-[28px] font-bold tracking-tight text-[#121312]">Voatomy</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-[#121312]/40">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
          <button
            type="button"
            onClick={logout}
            className="text-xs font-medium text-[#121312]/40 transition-colors hover:text-[#121312]/70"
          >
            Sign out
          </button>
          <button
            className="text-[#121312]/40 transition-colors hover:text-[#121312]/70"
            aria-label="Help"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>
          <Link
            href="/"
            className="text-[#121312]/40 transition-colors hover:text-[#121312]/70"
            aria-label="Exit onboarding"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Progress */}
      <div className="mt-6 mb-6">
        <ProgressBar />
      </div>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-[680px] flex-1 flex-col px-5">
        {children}
      </div>

      {/* Footer */}
      <footer className="mt-auto flex items-center justify-center gap-3.5 px-5 py-4 text-xs text-[#121312]/40">
        <span>&copy; 2025-2026 Voatomy Labs</span>
        <span className="text-[#121312]/15">·</span>
        <span>Encrypted & secure</span>
        <span className="text-[#121312]/15">·</span>
        <span>SOC 2 ready</span>
      </footer>
    </main>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ProductKey } from "@/types";
import { OnboardingHeaderIcon, OnboardingStepIcon } from "../onboarding-icons";
import { ObHint, ObPrimaryButton, ObSecondaryButton } from "../onboarding-primitives";

/** Reusable back/continue nav row for all product steps. */
export function StepNav({
  onBack,
  onContinue,
  canContinue,
  continueLabel = "Continue",
  isSaving = false,
  skipLabel,
  onSkip,
}: {
  onBack: () => void;
  onContinue: () => void;
  canContinue: boolean;
  continueLabel?: string;
  isSaving?: boolean;
  skipLabel?: string;
  onSkip?: () => void;
}) {
  return (
    <div className="mt-5 space-y-1.5 border-t border-fynk-border/60 pt-4">
      <div className="flex gap-2.5">
        <ObSecondaryButton onClick={onBack}>Back</ObSecondaryButton>
        <ObPrimaryButton
          onClick={onContinue}
          disabled={!canContinue}
          loading={isSaving}
          className="w-full flex-[2]"
        >
          {continueLabel}
        </ObPrimaryButton>
      </div>
      {skipLabel && onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="w-full py-0.5 text-center text-xs text-fynk-muted transition-colors hover:text-fynk-ink"
        >
          {skipLabel}
        </button>
      )}
    </div>
  );
}

/** Compact step header — icon inline with title to save vertical space. */
export function StepHeader({
  icon,
  stepKey,
  productKey,
  title,
  subtitle,
  color = "#F05A28",
  compact = true,
}: {
  icon?: React.ReactNode;
  stepKey?: string;
  productKey?: ProductKey;
  title: string;
  subtitle: string;
  color?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="mb-4 flex items-start gap-3 text-left">
        <div className="shrink-0 pt-0.5">
          {icon ?? (
            <OnboardingHeaderIcon
              stepKey={stepKey}
              productKey={productKey}
              color={color}
              size="sm"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-xl font-bold tracking-tight text-fynk-ink sm:text-[1.35rem]">
            {title}
          </h1>
          <ObHint className="mt-0.5 line-clamp-2">{subtitle}</ObHint>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 text-center">
      <div className="mx-auto mb-3 flex justify-center">
        {icon ?? (
          <OnboardingHeaderIcon stepKey={stepKey} productKey={productKey} color={color} size="md" />
        )}
      </div>
      <h1 className="font-heading text-xl font-bold tracking-tight text-fynk-ink">{title}</h1>
      <ObHint className="mt-1">{subtitle}</ObHint>
    </div>
  );
}

/** Selectable card used across many steps. */
export function SelectCard({
  selected,
  onClick,
  icon,
  stepKey,
  title,
  description,
  badge,
  color = "#F05A28",
}: {
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  stepKey?: string;
  title: string;
  description?: string;
  badge?: string;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full rounded-xl border p-3 text-left transition-all duration-200",
        selected
          ? "border-brand bg-brand/[0.04] ring-1 ring-brand/25"
          : "border-fynk-border bg-white hover:border-fynk-border/80 hover:bg-fynk-surface-alt/40",
      )}
    >
      <div
        className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all"
        style={selected ? { backgroundColor: color, borderColor: color } : { borderColor: "rgba(17,24,39,0.12)" }}
      >
        {selected && (
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      {badge && (
        <span className="mb-1.5 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
          {badge}
        </span>
      )}
      <div className="flex items-start gap-2.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-fynk-surface-alt"
          style={{ color }}
        >
          {icon ?? (stepKey ? <OnboardingStepIcon step={stepKey} className="h-3.5 w-3.5" /> : null)}
        </span>
        <div className="min-w-0 pr-4">
          <p className="text-sm font-semibold text-fynk-ink">{title}</p>
          {description && <p className="mt-0.5 text-xs text-fynk-muted line-clamp-2">{description}</p>}
        </div>
      </div>
    </button>
  );
}

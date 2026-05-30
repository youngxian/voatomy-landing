"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../onboarding-context";
import { StepHeader, StepNav, SelectCard } from "./_shared";
import { PRODUCT_MODULES } from "@/lib/product-onboarding-config";
import type { OnboardingStep, ProductKey } from "@/types";

export type ConfigOption = {
  id: string;
  icon: string;
  title: string;
  description?: string;
  badge?: string;
};

export function ProductMultiSelectStep({
  product,
  stepId,
  title,
  subtitle,
  sectionLabel,
  options,
  minSelected = 1,
  saveKey,
  initialSelected,
}: {
  product: ProductKey;
  stepId: OnboardingStep;
  title: string;
  subtitle: string;
  sectionLabel: string;
  options: ConfigOption[];
  minSelected?: number;
  saveKey: string;
  initialSelected?: string[];
}) {
  const module = PRODUCT_MODULES[product];
  const { goNext, goBack, markStepComplete, saveStep } = useOnboarding();
  const [selected, setSelected] = React.useState<string[]>(initialSelected ?? []);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleContinue = async () => {
    try {
      await saveStep(stepId, { [saveKey]: selected });
    } catch {
      /* continue */
    }
    markStepComplete(stepId);
    goNext();
  };

  return (
    <div>
      <StepHeader productKey={module.key} title={title} subtitle={subtitle} color={module.color} />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">{sectionLabel}</p>
        <div className="space-y-2">
          {options.map((opt) => (
            <SelectCard
              key={opt.id}
              selected={selected.includes(opt.id)}
              onClick={() => toggle(opt.id)}
              icon={opt.icon}
              title={opt.title}
              description={opt.description}
              badge={opt.badge}
              color={module.color}
            />
          ))}
        </div>
      </motion.div>

      <StepNav onBack={goBack} onContinue={handleContinue} canContinue={selected.length >= minSelected} />
    </div>
  );
}

export function ProductSingleSelectStep({
  product,
  stepId,
  title,
  subtitle,
  sectionLabel,
  options,
  saveKey,
  initialSelected = "",
}: {
  product: ProductKey;
  stepId: OnboardingStep;
  title: string;
  subtitle: string;
  sectionLabel: string;
  options: ConfigOption[];
  saveKey: string;
  initialSelected?: string;
}) {
  const module = PRODUCT_MODULES[product];
  const { goNext, goBack, markStepComplete, saveStep } = useOnboarding();
  const [selected, setSelected] = React.useState(initialSelected);

  const handleContinue = async () => {
    try {
      await saveStep(stepId, { [saveKey]: selected });
    } catch {
      /* continue */
    }
    markStepComplete(stepId);
    goNext();
  };

  return (
    <div>
      <StepHeader productKey={module.key} title={title} subtitle={subtitle} color={module.color} />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">{sectionLabel}</p>
        <div className="space-y-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelected(opt.id)}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all",
                selected === opt.id
                  ? "border-brand bg-white ring-2 ring-brand/15 shadow-sm"
                  : "border-[#121312]/10 bg-white hover:border-[#121312]/20",
              )}
            >
              <span className="text-lg">{opt.icon}</span>
              <div>
                <p className="text-sm font-semibold text-[#121312]">{opt.title}</p>
                {opt.description && <p className="mt-0.5 text-xs text-[#121312]/50">{opt.description}</p>}
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      <StepNav onBack={goBack} onContinue={handleContinue} canContinue={selected !== ""} />
    </div>
  );
}

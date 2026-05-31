"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";

const SCAN_FREQUENCIES = [
  { value: "every-commit", label: "Every commit", description: "Instant drift detection on each push" },
  { value: "daily",        label: "Daily",        description: "Morning digest of accumulated drift" },
  { value: "weekly",       label: "Weekly",       description: "Weekly design health report" },
] as const;

const DRIFT_CATEGORIES = [
  { key: "color-tokens",    label: "Color tokens",     description: "Hex / HSL mismatches vs Figma styles" },
  { key: "typography",      label: "Typography",        description: "Font family, size, weight divergence" },
  { key: "spacing",         label: "Spacing & radius",  description: "Padding, margin, border-radius drift" },
  { key: "component-names", label: "Component names",   description: "Renamed or missing design components" },
  { key: "icon-usage",      label: "Icon usage",        description: "Icons not in the approved Figma set" },
] as const;

type ScanFrequency = (typeof SCAN_FREQUENCIES)[number]["value"];
type CategoryKey   = (typeof DRIFT_CATEGORIES)[number]["key"];

const SEVERITY_LABELS = ["All", "Medium+", "High only"] as const;
type SeverityFilter = (typeof SEVERITY_LABELS)[number];

export function DriftConfigStep() {
  const { goNext, goBack, updateFormData, markStepComplete, saveStep } = useOnboarding();
  const [scanFrequency, setScanFrequency] = React.useState<ScanFrequency>("every-commit");
  const [categories, setCategories] = React.useState<CategoryKey[]>(["color-tokens", "typography", "spacing"]);
  const [severityFilter, setSeverityFilter] = React.useState<SeverityFilter>("Medium+");

  const toggleCategory = (key: CategoryKey) => {
    setCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const handleContinue = async () => {
    try { await saveStep("drift-config", { scan_frequency: scanFrequency, categories, severity_filter: severityFilter }); } catch { /* continue */ }
    markStepComplete("drift-config");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="drift-config"
        title="Configure drift scanning"
        subtitle="Set how often Drift runs and which categories to monitor."
        color="#EC4899"
      />

      <div className="space-y-5">
        {/* Scan frequency */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">Scan frequency</p>
          <div className="grid grid-cols-3 gap-2">
            {SCAN_FREQUENCIES.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setScanFrequency(opt.value)}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all",
                  scanFrequency === opt.value
                    ? "border-[#EC4899]/40 bg-[#EC4899]/6 ring-1 ring-[#EC4899]/20"
                    : "border-fynk-border bg-white hover:border-[#EC4899]/20",
                )}
              >
                <p className="text-sm font-semibold text-fynk-ink">{opt.label}</p>
                <p className="mt-0.5 text-[11px] text-fynk-muted leading-snug">{opt.description}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Drift categories */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">Drift categories to monitor</p>
          <div className="space-y-1.5">
            {DRIFT_CATEGORIES.map((cat) => {
              const active = categories.includes(cat.key);
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => toggleCategory(cat.key)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border px-3 py-2 transition-all",
                    active
                      ? "border-[#EC4899]/30 bg-[#EC4899]/5"
                      : "border-fynk-border bg-white hover:border-[#EC4899]/15",
                  )}
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-fynk-ink">{cat.label}</p>
                    <p className="text-xs text-fynk-muted">{cat.description}</p>
                  </div>
                  <div
                    className="h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ml-3"
                    style={active ? { backgroundColor: "#EC4899", borderColor: "#EC4899" } : { borderColor: "rgba(17,24,39,0.15)" }}
                  >
                    {active && (
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Severity filter */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">Alert me on</p>
          <div className="flex gap-2">
            {SEVERITY_LABELS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setSeverityFilter(label)}
                className={cn(
                  "flex-1 rounded-lg border py-2 text-xs font-semibold transition-all",
                  severityFilter === label
                    ? "border-[#EC4899]/40 bg-[#EC4899]/8 text-[#EC4899]"
                    : "border-fynk-border bg-white text-fynk-muted hover:border-[#EC4899]/20",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={categories.length > 0}
        continueLabel="Save configuration"
      />
    </div>
  );
}

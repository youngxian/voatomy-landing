"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";

const DEBT_CATEGORIES = [
  { key: "complexity",     label: "Cyclomatic complexity",  description: "Functions that are too complex to maintain safely" },
  { key: "duplication",    label: "Code duplication",       description: "Repeated logic that should be extracted" },
  { key: "coverage-gaps",  label: "Test coverage gaps",     description: "Critical paths with no automated test protection" },
  { key: "outdated-deps",  label: "Outdated dependencies",  description: "Packages with known vulnerabilities or EOL status" },
  { key: "large-files",    label: "Large files / modules",  description: "Files over 500 lines that resist refactoring" },
  { key: "dead-code",      label: "Dead code",              description: "Unreachable functions and unused exports" },
] as const;

type DebtKey = (typeof DEBT_CATEGORIES)[number]["key"];

const SCORING_MODES = [
  { value: "effort",   label: "Effort",   description: "Sort by refactor time estimate" },
  { value: "risk",     label: "Risk",     description: "Sort by production failure probability" },
  { value: "roi",      label: "ROI",      description: "Sort by effort-to-impact ratio" },
] as const;

type ScoringMode = (typeof SCORING_MODES)[number]["value"];

export function PhantomConfigStep() {
  const { goNext, goBack, updateFormData, markStepComplete, saveStep } = useOnboarding();
  const [selectedCategories, setSelectedCategories] = React.useState<DebtKey[]>(["complexity", "coverage-gaps", "outdated-deps"]);
  const [scoringMode, setScoringMode] = React.useState<ScoringMode>("roi");
  const [riskThreshold, setRiskThreshold] = React.useState<number>(70);

  const toggleCategory = (key: DebtKey) => {
    setSelectedCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const handleContinue = async () => {
    try { await saveStep("phantom-config", { categories: selectedCategories, scoring_mode: scoringMode, risk_threshold: riskThreshold }); } catch { /* continue */ }
    markStepComplete("phantom-config");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="phantom-config"
        title="Configure debt scoring"
        subtitle="Choose which debt categories Phantom tracks and how hotspots are ranked."
        color="#6366F1"
      />

      <div className="space-y-5">
        {/* Categories */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">Debt categories</p>
          <div className="space-y-1.5">
            {DEBT_CATEGORIES.map((cat) => {
              const active = selectedCategories.includes(cat.key);
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => toggleCategory(cat.key)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border px-3 py-2 transition-all",
                    active
                      ? "border-[#6366F1]/30 bg-[#6366F1]/5"
                      : "border-fynk-border bg-white hover:border-[#6366F1]/15",
                  )}
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-fynk-ink">{cat.label}</p>
                    <p className="text-xs text-fynk-muted">{cat.description}</p>
                  </div>
                  <div
                    className="h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ml-3"
                    style={active ? { backgroundColor: "#6366F1", borderColor: "#6366F1" } : { borderColor: "rgba(17,24,39,0.15)" }}
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

        {/* Scoring mode */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">Rank hotspots by</p>
          <div className="grid grid-cols-3 gap-2">
            {SCORING_MODES.map((mode) => (
              <button
                key={mode.value}
                type="button"
                onClick={() => setScoringMode(mode.value)}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all",
                  scoringMode === mode.value
                    ? "border-[#6366F1]/40 bg-[#6366F1]/6 ring-1 ring-[#6366F1]/20"
                    : "border-fynk-border bg-white hover:border-[#6366F1]/20",
                )}
              >
                <p className="text-sm font-semibold text-fynk-ink">{mode.label}</p>
                <p className="mt-0.5 text-[11px] text-fynk-muted leading-snug">{mode.description}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Risk threshold */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#121312]/40">Alert risk threshold</p>
            <span className="text-sm font-bold text-[#6366F1]">{riskThreshold}%</span>
          </div>
          <input
            type="range"
            min={40}
            max={95}
            step={5}
            value={riskThreshold}
            onChange={(e) => setRiskThreshold(Number(e.target.value))}
            className="w-full accent-[#6366F1]"
          />
          <div className="mt-1 flex justify-between text-[10px] text-fynk-muted">
            <span>More alerts (40%)</span>
            <span>Fewer alerts (95%)</span>
          </div>
        </motion.div>
      </div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={selectedCategories.length > 0}
        continueLabel="Save configuration"
      />
    </div>
  );
}

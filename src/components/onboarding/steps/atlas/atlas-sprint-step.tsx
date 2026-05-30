"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Rocket, Scale, Shield } from "lucide-react";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { SPRINT_CADENCE_OPTIONS, AI_MODE_OPTIONS } from "@/lib/constants";
import type { SprintCadence, AIMode } from "@/types";

function Toggle({ label, description, checked, onChange }: { label: string; description?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 py-1 text-left"
    >
      <div>
        <p className="text-sm font-medium text-[#121312]/80">{label}</p>
        {description && <p className="text-xs text-[#121312]/40">{description}</p>}
      </div>
      <span className={cn("relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors", checked ? "bg-brand" : "bg-[#121312]/15")}>
        <span className="inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform" style={{ transform: checked ? "translateX(18px)" : "translateX(2px)" }} />
      </span>
    </button>
  );
}

export function AtlasSprintStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, saveStep } = useOnboarding();

  const [cadence, setCadence] = React.useState<SprintCadence | "">(formData.sprintCadence);
  const [aiMode, setAiMode] = React.useState<AIMode>(formData.aiPreferences.mode);
  const [autoSuggest, setAutoSuggest] = React.useState(formData.aiPreferences.autoSuggest);
  const [autoAssign, setAutoAssign]   = React.useState(formData.aiPreferences.autoAssign);
  const [autoLinkGit, setAutoLinkGit] = React.useState(formData.aiPreferences.autoLinkGitActivity ?? false);

  const handleContinue = async () => {
    const aiPreferences = { mode: aiMode, autoSuggest, autoAssign, autoLinkGitActivity: autoLinkGit };
    updateFormData({ sprintCadence: cadence, aiPreferences });
    try {
      await saveStep("atlas-sprint", { sprint_cadence: cadence, ai_preferences: aiPreferences });
    } catch { /* continue */ }
    markStepComplete("atlas-sprint");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="atlas-sprint"
        title="Sprint & AI settings"
        subtitle="Configure how Atlas runs sprints and how assertive its AI recommendations should be."
        color="#F05A28"
      />

      {/* Sprint cadence */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">Sprint cadence</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SPRINT_CADENCE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setCadence(opt.value as SprintCadence)}
              className={cn(
                "rounded-xl border py-3 text-center text-sm font-semibold transition-all",
                cadence === opt.value
                  ? "border-brand bg-brand/10 text-[#121312]"
                  : "border-[#121312]/10 text-[#121312]/55 hover:border-brand/30",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* AI Mode */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">AI mode</p>
        <div className="space-y-2">
          {AI_MODE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setAiMode(opt.value as AIMode)}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all",
                aiMode === opt.value
                  ? "border-brand bg-white ring-2 ring-brand/15 shadow-sm"
                  : "border-[#121312]/10 bg-white hover:border-[#121312]/20",
              )}
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#121312]/[0.04] text-brand">
                {opt.value === "conservative" ? (
                  <Shield className="h-4 w-4" strokeWidth={2.25} />
                ) : opt.value === "balanced" ? (
                  <Scale className="h-4 w-4" strokeWidth={2.25} />
                ) : (
                  <Rocket className="h-4 w-4" strokeWidth={2.25} />
                )}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#121312]">{opt.label}</p>
                {"description" in opt && <p className="mt-0.5 text-xs text-[#121312]/50">{(opt as { description: string }).description}</p>}
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* AI Toggles */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="space-y-4 rounded-2xl border border-[#121312]/8 bg-white p-4">
        <Toggle label="Auto-suggest ticket assignments" description="AI picks the best person based on past work and capacity" checked={autoSuggest} onChange={setAutoSuggest} />
        <div className="h-px bg-[#121312]/6" />
        <Toggle label="Auto-assign tickets" description="Assignments applied automatically, you review in Sprint view" checked={autoAssign} onChange={setAutoAssign} />
        <div className="h-px bg-[#121312]/6" />
        <Toggle label="Link Git activity to tickets" description="Commits, PRs and deployments appear inline on tickets" checked={autoLinkGit} onChange={setAutoLinkGit} />
      </motion.div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={cadence !== ""}
      />
    </div>
  );
}

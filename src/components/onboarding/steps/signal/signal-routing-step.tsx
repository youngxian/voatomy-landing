"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { DollarSign, Users, Clock, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";

const ESCALATION_RULES = [
  {
    key: "revenue-threshold",
    icon: DollarSign,
    title: "Revenue threshold",
    description: "Auto-escalate incidents affecting accounts over a set MRR value.",
  },
  {
    key: "account-tier",
    icon: Users,
    title: "Account tier",
    description: "Escalate immediately for enterprise or strategic accounts.",
  },
  {
    key: "duration",
    icon: Clock,
    title: "Incident duration",
    description: "Page leadership if an incident stays open past your SLA.",
  },
  {
    key: "blast-radius",
    icon: GitBranch,
    title: "Blast radius",
    description: "Escalate when more than N services are affected simultaneously.",
  },
] as const;

type RuleKey = (typeof ESCALATION_RULES)[number]["key"];

const SEVERITY_OPTIONS = [
  { value: "p1", label: "P1 — Critical (page now)" },
  { value: "p2", label: "P2 — High (15 min)" },
  { value: "p3", label: "P3 — Medium (1 hr)" },
] as const;

export function SignalRoutingStep() {
  const { goNext, goBack, updateFormData, markStepComplete, saveStep } = useOnboarding();
  const [enabledRules, setEnabledRules] = React.useState<RuleKey[]>(["revenue-threshold", "account-tier"]);
  const [defaultSeverity, setDefaultSeverity] = React.useState<"p1" | "p2" | "p3">("p2");

  const toggle = (key: RuleKey) => {
    setEnabledRules((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const handleContinue = async () => {
    try { await saveStep("signal-routing", { enabled_rules: enabledRules, default_severity: defaultSeverity }); } catch { /* continue */ }
    markStepComplete("signal-routing");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="signal-routing"
        title="Configure escalation routing"
        subtitle="Set the rules Signal uses to route incidents to the right people based on revenue impact."
        color="#EF4444"
      />

      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">Escalation triggers</p>
          <div className="space-y-2">
            {ESCALATION_RULES.map((rule, i) => {
              const Icon = rule.icon;
              const active = enabledRules.includes(rule.key);
              return (
                <motion.button
                  key={rule.key}
                  type="button"
                  onClick={() => toggle(rule.key)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                    active
                      ? "border-[#EF4444]/30 bg-[#EF4444]/5"
                      : "border-fynk-border bg-white hover:border-[#EF4444]/20",
                  )}
                >
                  <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors", active ? "bg-[#EF4444]/15 text-[#EF4444]" : "bg-fynk-surface-alt text-fynk-muted")}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-fynk-ink">{rule.title}</p>
                    <p className="text-xs text-fynk-muted">{rule.description}</p>
                  </div>
                  <div
                    className={cn("h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-all")}
                    style={active ? { backgroundColor: "#EF4444", borderColor: "#EF4444" } : { borderColor: "rgba(17,24,39,0.15)" }}
                  >
                    {active && (
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">Default incident severity</p>
          <div className="flex gap-2">
            {SEVERITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDefaultSeverity(opt.value)}
                className={cn(
                  "flex-1 rounded-lg border py-2 text-xs font-semibold transition-all",
                  defaultSeverity === opt.value
                    ? "border-[#EF4444]/40 bg-[#EF4444]/8 text-[#EF4444]"
                    : "border-fynk-border bg-white text-fynk-muted hover:border-[#EF4444]/20",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={enabledRules.length > 0}
        continueLabel="Save routing rules"
      />
    </div>
  );
}

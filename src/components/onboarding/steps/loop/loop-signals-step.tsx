"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TrendingUp, MessageSquare, AlertCircle, Users, DollarSign, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";

const SIGNAL_OPTIONS = [
  { key: "churn-risk",       icon: AlertCircle,   title: "Churn risk alerts",       description: "Surface accounts showing disengagement so you can prioritise retention features." },
  { key: "feature-requests", icon: MessageSquare, title: "Feature request volume",   description: "Rank requested features by support ticket frequency and MRR weight." },
  { key: "pipeline-shift",   icon: TrendingUp,    title: "Pipeline deal blockers",   description: "Flag missing capabilities that are stalling deals in your CRM pipeline." },
  { key: "expansion-signals",icon: DollarSign,    title: "Expansion opportunities",  description: "Identify upsell candidates based on usage patterns and account health." },
  { key: "power-users",      icon: Users,         title: "Power-user behaviour",     description: "Track which features drive the most engagement among top accounts." },
  { key: "revenue-impact",   icon: BarChart2,     title: "Revenue impact scoring",   description: "Score each backlog item by estimated ARR impact before planning." },
] as const;

type SignalKey = (typeof SIGNAL_OPTIONS)[number]["key"];

export function LoopSignalsStep() {
  const { goNext, goBack, markStepComplete, saveStep } = useOnboarding();
  const [selected, setSelected] = React.useState<SignalKey[]>(["churn-risk", "feature-requests"]);

  const toggle = (key: SignalKey) =>
    setSelected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);

  const handleContinue = async () => {
    try { await saveStep("loop-signals", { signals: selected }); } catch { /* continue */ }
    markStepComplete("loop-signals");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="loop-signals"
        title="Choose your revenue signals"
        subtitle="Select the signals Loop should track. You can add or remove signals at any time."
        color="#8B5CF6"
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {SIGNAL_OPTIONS.map((signal, i) => {
          const Icon = signal.icon;
          const isSelected = selected.includes(signal.key);
          return (
            <motion.button
              key={signal.key}
              type="button"
              onClick={() => toggle(signal.key)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "group relative w-full rounded-xl border p-3 text-left transition-all duration-200",
                isSelected
                  ? "border-[#8B5CF6]/40 bg-[#8B5CF6]/5 ring-1 ring-[#8B5CF6]/20"
                  : "border-fynk-border bg-white hover:border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/[0.02]",
              )}
            >
              <div
                className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all"
                style={isSelected ? { backgroundColor: "#8B5CF6", borderColor: "#8B5CF6" } : { borderColor: "rgba(17,24,39,0.12)" }}
              >
                {isSelected && (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div className="flex items-start gap-2.5 pr-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6]">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fynk-ink">{signal.title}</p>
                  <p className="mt-0.5 text-xs text-fynk-muted line-clamp-2">{signal.description}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center text-xs text-fynk-muted">
          {selected.length} signal{selected.length !== 1 ? "s" : ""} selected — Loop will start mapping these to your backlog immediately.
        </motion.p>
      )}

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={selected.length > 0}
        continueLabel="Set up signals"
      />
    </div>
  );
}

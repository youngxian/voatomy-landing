"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";

interface ServiceEntry {
  id: string;
  name: string;
  tier: "critical" | "high" | "medium" | "low";
  owner: string;
}

const TIER_OPTIONS = [
  { value: "critical", label: "Critical", color: "#EF4444", description: "Revenue-blocking — page immediately" },
  { value: "high",     label: "High",     color: "#F97316", description: "Customer-facing — 15 min SLA" },
  { value: "medium",   label: "Medium",   color: "#EAB308", description: "Internal — 1 hr SLA" },
  { value: "low",      label: "Low",      color: "#6B7280", description: "Non-critical — best effort" },
] as const;

function newEntry(): ServiceEntry {
  return { id: crypto.randomUUID(), name: "", tier: "high", owner: "" };
}

export function SignalCatalogStep() {
  const { goNext, goBack, updateFormData, markStepComplete, saveStep } = useOnboarding();
  const [services, setServices] = React.useState<ServiceEntry[]>([newEntry()]);

  const add = () => setServices((prev) => [...prev, newEntry()]);
  const remove = (id: string) => setServices((prev) => prev.filter((s) => s.id !== id));
  const update = (id: string, patch: Partial<ServiceEntry>) =>
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const validServices = services.filter((s) => s.name.trim().length > 0);
  const canContinue = validServices.length > 0;

  const handleContinue = async () => {

    try { await saveStep("signal-catalog", { services: validServices }); } catch { /* continue */ }
    markStepComplete("signal-catalog");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="signal-catalog"
        title="Define your service catalog"
        subtitle="Add the services Signal should monitor. You'll set SLA tiers and on-call owners here."
        color="#EF4444"
      />

      <div className="space-y-2.5">
        <AnimatePresence initial={false}>
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-fynk-border bg-white p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-fynk-muted">
                    Service {idx + 1}
                  </span>
                  {services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(service.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-md text-fynk-muted transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Service name (e.g. Payment API)"
                    value={service.name}
                    onChange={(e) => update(service.id, { name: e.target.value })}
                    className="w-full rounded-lg border border-fynk-border px-3 py-2 text-sm text-fynk-ink placeholder:text-fynk-muted/50 focus:border-[#EF4444]/40 focus:outline-none focus:ring-1 focus:ring-[#EF4444]/20"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={service.tier}
                      onChange={(e) => update(service.id, { tier: e.target.value as ServiceEntry["tier"] })}
                      className="rounded-lg border border-fynk-border px-3 py-2 text-sm text-fynk-ink focus:border-[#EF4444]/40 focus:outline-none focus:ring-1 focus:ring-[#EF4444]/20"
                    >
                      {TIER_OPTIONS.map((t) => (
                        <option key={t.value} value={t.value}>{t.label} — {t.description}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Owner (team or email)"
                      value={service.owner}
                      onChange={(e) => update(service.id, { owner: e.target.value })}
                      className="rounded-lg border border-fynk-border px-3 py-2 text-sm text-fynk-ink placeholder:text-fynk-muted/50 focus:border-[#EF4444]/40 focus:outline-none focus:ring-1 focus:ring-[#EF4444]/20"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          type="button"
          onClick={add}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-fynk-border py-2.5 text-sm font-medium text-fynk-muted transition-colors hover:border-[#EF4444]/30 hover:text-[#EF4444]"
        >
          <Plus className="h-4 w-4" />
          Add another service
        </button>
      </div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={canContinue}
        continueLabel="Save catalog"
      />
    </div>
  );
}

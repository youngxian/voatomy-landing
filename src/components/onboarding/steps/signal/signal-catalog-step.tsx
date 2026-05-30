"use client";

import { ProductMultiSelectStep } from "../_product-config-step";

const SERVICE_TIERS = [
  { id: "tier-1", icon: "🔴", title: "Tier 1 — Business critical", description: "Core revenue paths; strict SLA and exec escalation", badge: "Revenue" },
  { id: "tier-2", icon: "🟠", title: "Tier 2 — Customer facing", description: "User-facing services with standard SLA targets" },
  { id: "tier-3", icon: "🟡", title: "Tier 3 — Internal platforms", description: "Shared infra and internal tooling" },
  { id: "tier-4", icon: "🟢", title: "Tier 4 — Best effort", description: "Non-critical batch jobs and background workers" },
] as const;

export function SignalCatalogStep() {
  return (
    <ProductMultiSelectStep
      product="signal"
      stepId="signal-catalog"
      title="Define your service catalog"
      subtitle="Tell Signal which services matter most so incidents route with the right urgency."
      sectionLabel="SLA tiers to enable"
      options={[...SERVICE_TIERS]}
      saveKey="signal_service_tiers"
      minSelected={1}
    />
  );
}

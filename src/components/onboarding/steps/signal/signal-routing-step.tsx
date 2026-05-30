"use client";

import { ProductSingleSelectStep } from "../_product-config-step";

const ROUTING_MODES = [
  {
    id: "revenue-weighted",
    icon: "💰",
    title: "Revenue-weighted routing",
    description: "Escalate incidents by customer ARR and contract tier",
  },
  {
    id: "sla-first",
    icon: "⏱️",
    title: "SLA-first routing",
    description: "Route by service tier and breach risk, then revenue",
  },
  {
    id: "noise-reduction",
    icon: "🔇",
    title: "Smart noise reduction",
    description: "Group related alerts and suppress duplicates automatically",
  },
] as const;

export function SignalRoutingStep() {
  return (
    <ProductSingleSelectStep
      product="signal"
      stepId="signal-routing"
      title="Configure incident routing"
      subtitle="Choose how Signal prioritizes and escalates alerts across your team."
      sectionLabel="Routing strategy"
      options={[...ROUTING_MODES]}
      saveKey="signal_routing_mode"
      initialSelected="revenue-weighted"
    />
  );
}

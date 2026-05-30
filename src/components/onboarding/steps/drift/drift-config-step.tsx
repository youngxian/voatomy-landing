"use client";

import { ProductSingleSelectStep } from "../_product-config-step";

const SCAN_FREQUENCIES = [
  { id: "every-commit", icon: "⚡", title: "Every commit", description: "Scan on each push — best for active design systems" },
  { id: "daily", icon: "📅", title: "Daily digest", description: "Batch scan once per day with a summary report" },
  { id: "weekly", icon: "🗓️", title: "Weekly review", description: "Lightweight governance for smaller teams" },
] as const;

export function DriftConfigStep() {
  return (
    <ProductSingleSelectStep
      product="drift"
      stepId="drift-config"
      title="Set drift scan preferences"
      subtitle="Choose how often Drift compares Figma components against production code."
      sectionLabel="Scan frequency"
      options={[...SCAN_FREQUENCIES]}
      saveKey="drift_scan_frequency"
      initialSelected="every-commit"
    />
  );
}

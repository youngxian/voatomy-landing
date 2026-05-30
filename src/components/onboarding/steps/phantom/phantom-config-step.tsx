"use client";

import { ProductMultiSelectStep } from "../_product-config-step";

const DEBT_CATEGORIES = [
  { id: "complexity", icon: "🌀", title: "Cyclomatic complexity", description: "Flag deeply nested or hard-to-test modules" },
  { id: "duplication", icon: "📋", title: "Code duplication", description: "Detect copy-paste debt across services" },
  { id: "dependencies", icon: "📦", title: "Stale dependencies", description: "Outdated packages with known CVEs" },
  { id: "coverage", icon: "🧪", title: "Test coverage gaps", description: "Untested paths in high-change areas" },
  { id: "architecture", icon: "🏗️", title: "Architecture smells", description: "Circular deps, god classes, leaky boundaries" },
] as const;

export function PhantomConfigStep() {
  return (
    <ProductMultiSelectStep
      product="phantom"
      stepId="phantom-config"
      title="Choose debt categories"
      subtitle="Select what Phantom should score — you can adjust weights later in the app."
      sectionLabel="Debt categories"
      options={[...DEBT_CATEGORIES]}
      saveKey="phantom_debt_categories"
      minSelected={1}
    />
  );
}

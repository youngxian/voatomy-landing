"use client";

import { ProductMultiSelectStep } from "../_product-config-step";

const LOOP_SIGNALS = [
  { id: "pipeline-deals", icon: "💼", title: "Open pipeline deals", description: "Weight backlog by active opportunities and deal stage" },
  { id: "sales-calls", icon: "📞", title: "Sales call transcripts", description: "Surface feature requests mentioned on Gong calls" },
  { id: "support-tickets", icon: "🎫", title: "Support ticket volume", description: "Escalate issues customers report most often" },
  { id: "churn-risk", icon: "📉", title: "Churn & expansion signals", description: "Prioritize work tied to retention and upsell" },
  { id: "nps-feedback", icon: "⭐", title: "NPS & product feedback", description: "Connect survey themes to sprint priorities" },
] as const;

export function LoopSignalsStep() {
  return (
    <ProductMultiSelectStep
      product="loop"
      stepId="loop-signals"
      title="Choose revenue signals"
      subtitle="Pick the demand signals Loop should track and route into your backlog."
      sectionLabel="Revenue signals"
      options={[...LOOP_SIGNALS]}
      saveKey="loop_signals"
      minSelected={1}
    />
  );
}

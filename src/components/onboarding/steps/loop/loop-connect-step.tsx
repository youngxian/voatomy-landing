"use client";

import { ProductConnectStep } from "../_product-connect-step";

export function LoopConnectStep() {
  return (
    <ProductConnectStep
      product="loop"
      stepId="loop-connect"
      title="Connect revenue & support tools"
      subtitle="Link CRM and customer channels so Loop can map demand signals to your backlog."
      groups={[
        { label: "CRM", badge: "Required", categoryFilter: ["CRM"] },
        { label: "Customer support", badge: "Recommended", categoryFilter: ["Support"] },
        { label: "Revenue intelligence", categoryFilter: ["Revenue"] },
        { label: "Notifications", categoryFilter: ["Communication"] },
      ]}
    />
  );
}

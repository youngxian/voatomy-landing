"use client";

import { ProductConnectStep } from "../_product-connect-step";

export function DriftConnectStep() {
  return (
    <ProductConnectStep
      product="drift"
      stepId="drift-connect"
      title="Connect design & code"
      subtitle="Link Figma and your repo so Drift can detect design-code drift on every commit."
      groups={[
        { label: "Design system", badge: "Required", categoryFilter: ["Design"] },
        { label: "Code repository", badge: "Required", categoryFilter: ["Code"] },
      ]}
    />
  );
}

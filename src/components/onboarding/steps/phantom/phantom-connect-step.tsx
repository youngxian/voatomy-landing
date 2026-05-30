"use client";

import { ProductConnectStep } from "../_product-connect-step";

export function PhantomConnectStep() {
  return (
    <ProductConnectStep
      product="phantom"
      stepId="phantom-connect"
      title="Connect your code repository"
      subtitle="Phantom scans your repos to surface tech debt hotspots with cost and risk scores."
      groups={[{ label: "Code repository", badge: "Required", categoryFilter: ["Code"] }]}
    />
  );
}

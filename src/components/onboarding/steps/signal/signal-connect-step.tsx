"use client";

import { ProductConnectStep } from "../_product-connect-step";

export function SignalConnectStep() {
  return (
    <ProductConnectStep
      product="signal"
      stepId="signal-connect"
      title="Connect observability tools"
      subtitle="Link alerting and monitoring so Signal can assess revenue impact on every incident."
      groups={[
        { label: "Monitoring & alerting", badge: "Required", categoryFilter: ["Monitoring"] },
        { label: "Customer support", badge: "Recommended", categoryFilter: ["Support"] },
        { label: "Notifications", categoryFilter: ["Communication"] },
      ]}
    />
  );
}

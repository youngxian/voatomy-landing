"use client";

import { ProductConnectStep } from "../_product-connect-step";

export function NexusConnectStep() {
  return (
    <ProductConnectStep
      product="nexus"
      stepId="nexus-connect"
      useAllIntegrations
      title="Connect your org stack"
      subtitle="Nexus needs broad tool coverage to build your cross-team intelligence graph."
      requireConnected={false}
      groups={[
        { label: "Code", badge: "Recommended", categoryFilter: ["Code"] },
        { label: "Project management", categoryFilter: ["Project"] },
        { label: "CRM & revenue", categoryFilter: ["CRM", "Revenue"] },
        { label: "Monitoring", categoryFilter: ["Monitoring"] },
        { label: "Communication", categoryFilter: ["Communication"] },
      ]}
      skipLabel="Skip — add integrations from Nexus settings"
    />
  );
}

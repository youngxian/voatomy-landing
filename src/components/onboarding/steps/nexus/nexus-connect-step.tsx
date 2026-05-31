"use client";

import * as React from "react";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { IntegrationGroup, useConnectState } from "@/components/onboarding/integration-card";
import { INTEGRATION_CATALOG } from "@/lib/constants";
import type { IntegrationKey } from "@/types";

// Nexus shows ALL integrations grouped by category
const ALL_CATS = Array.from(new Set(INTEGRATION_CATALOG.map((i) => i.category)));

const COLOR = "#0EA5E9";

export function NexusConnectStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, markStepSkipped, saveStep, skipStepOnServer } =
    useOnboarding();

  const { connected, isConnected, onConnected, onDisconnected } = useConnectState(
    formData.connectedIntegrations,
  );

  const connectedCount = INTEGRATION_CATALOG.filter((i) => isConnected(i.key as IntegrationKey)).length;

  const handleContinue = async () => {
    updateFormData({ connectedIntegrations: connected });
    try {
      await saveStep("nexus-connect", { connected_integrations: connected.map((c) => c.key) });
    } catch { /* continue */ }
    markStepComplete("nexus-connect");
    goNext();
  };

  const handleSkip = async () => {
    try { await skipStepOnServer("nexus-connect"); } catch { /* continue */ }
    markStepSkipped("nexus-connect");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="nexus-connect"
        title="Connect your entire stack"
        subtitle="Nexus builds a live org intelligence graph from all your connected tools — the more you add, the richer the graph."
        color={COLOR}
      />

      {connectedCount > 0 && (
        <div className="mb-4 rounded-xl border border-[#0EA5E9]/20 bg-[#0EA5E9]/8 px-4 py-2.5 text-sm font-medium text-[#0EA5E9]">
          {connectedCount} tool{connectedCount !== 1 ? "s" : ""} connected
        </div>
      )}

      <div className="space-y-5">
        {ALL_CATS.map((cat, i) => {
          const items = INTEGRATION_CATALOG.filter((x) => x.category === cat);
          return (
            <IntegrationGroup
              key={cat}
              label={cat}
              integrations={items}
              connected={isConnected}
              accentColor={COLOR}
              onConnected={onConnected}
              onDisconnected={onDisconnected}
              delay={i * 0.06}
            />
          );
        })}
      </div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={connectedCount >= 1}
        skipLabel="Skip for now — connect later in Nexus"
        onSkip={handleSkip}
      />
    </div>
  );
}

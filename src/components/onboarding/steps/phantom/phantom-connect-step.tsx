"use client";

import * as React from "react";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { IntegrationGroup, useConnectState } from "@/components/onboarding/integration-card";
import { INTEGRATION_CATALOG } from "@/lib/constants";
import type { IntegrationKey } from "@/types";

const PHANTOM    = INTEGRATION_CATALOG.filter((i) => (i.products as readonly string[]).includes("phantom"));
const CODE       = PHANTOM.filter((i) => i.category === "Code");
const MONITORING = PHANTOM.filter((i) => i.category === "Monitoring");

const COLOR = "#6366F1";

export function PhantomConnectStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, markStepSkipped, saveStep, skipStepOnServer } =
    useOnboarding();

  const { connected, isConnected, onConnected, onDisconnected } = useConnectState(
    formData.connectedIntegrations,
  );

  const hasCode = CODE.some((i) => isConnected(i.key as IntegrationKey));

  const handleContinue = async () => {
    updateFormData({ connectedIntegrations: connected });
    try {
      await saveStep("phantom-connect", { connected_integrations: connected.map((c) => c.key) });
    } catch { /* continue */ }
    markStepComplete("phantom-connect");
    goNext();
  };

  const handleSkip = async () => {
    try { await skipStepOnServer("phantom-connect"); } catch { /* continue */ }
    markStepSkipped("phantom-connect");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="phantom-connect"
        title="Connect your repository"
        subtitle="Phantom analyses your codebase to surface debt hotspots with cost and risk estimates."
        color={COLOR}
      />

      <div className="space-y-5">
        <IntegrationGroup label="Code repository" badge="Required"
          integrations={CODE} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.1} />
        <IntegrationGroup label="Monitoring" badge="Recommended"
          hint="Correlate debt hotspots with runtime failures to prioritise the highest-risk refactors."
          integrations={MONITORING} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.18} />
      </div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={hasCode}
        skipLabel="Skip for now — connect later in Phantom"
        onSkip={handleSkip}
      />
    </div>
  );
}

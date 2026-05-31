"use client";

import * as React from "react";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { IntegrationGroup, useConnectState } from "@/components/onboarding/integration-card";
import { INTEGRATION_CATALOG } from "@/lib/constants";
import type { IntegrationKey } from "@/types";

const DRIFT  = INTEGRATION_CATALOG.filter((i) => (i.products as readonly string[]).includes("drift"));
const DESIGN = DRIFT.filter((i) => i.category === "Design");
const CODE   = DRIFT.filter((i) => i.category === "Code");

const COLOR = "#EC4899";

export function DriftConnectStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, markStepSkipped, saveStep, skipStepOnServer } =
    useOnboarding();

  const { connected, isConnected, onConnected, onDisconnected } = useConnectState(
    formData.connectedIntegrations,
  );

  const hasDesign = DESIGN.some((i) => isConnected(i.key as IntegrationKey));
  const hasCode   = CODE.some((i) => isConnected(i.key as IntegrationKey));

  const handleContinue = async () => {
    updateFormData({ connectedIntegrations: connected });
    try {
      await saveStep("drift-connect", { connected_integrations: connected.map((c) => c.key) });
    } catch { /* continue */ }
    markStepComplete("drift-connect");
    goNext();
  };

  const handleSkip = async () => {
    try { await skipStepOnServer("drift-connect"); } catch { /* continue */ }
    markStepSkipped("drift-connect");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="drift-connect"
        title="Connect Figma & your repo"
        subtitle="Drift compares your design system tokens against live code on every commit — catching drift before it ships."
        color={COLOR}
      />

      <div className="space-y-5">
        <IntegrationGroup label="Design tool" badge="Required"
          hint="Connect Figma (OAuth) or Sketch (API token) to pull design tokens and component specs."
          integrations={DESIGN} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.1} />
        <IntegrationGroup label="Code repository" badge="Required"
          hint="Drift will scan your repo on every commit to detect token and style divergence."
          integrations={CODE} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.18} />
      </div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={hasDesign && hasCode}
        skipLabel="Skip for now — connect later in Drift"
        onSkip={handleSkip}
      />
    </div>
  );
}

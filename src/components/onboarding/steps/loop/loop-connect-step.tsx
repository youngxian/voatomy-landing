"use client";

import * as React from "react";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { IntegrationGroup, useConnectState } from "@/components/onboarding/integration-card";
import { INTEGRATION_CATALOG } from "@/lib/constants";
import type { IntegrationKey } from "@/types";

const LOOP    = INTEGRATION_CATALOG.filter((i) => (i.products as readonly string[]).includes("loop"));
const CRM     = LOOP.filter((i) => i.category === "CRM");
const REVENUE = LOOP.filter((i) => i.category === "Revenue");
const SUPPORT = LOOP.filter((i) => i.category === "Support");
const COMM    = LOOP.filter((i) => i.category === "Communication");
const DOCS    = LOOP.filter((i) => i.category === "Documents");

const COLOR = "#8B5CF6";

export function LoopConnectStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, markStepSkipped, saveStep, skipStepOnServer } =
    useOnboarding();

  const { connected, isConnected, onConnected, onDisconnected } = useConnectState(
    formData.connectedIntegrations,
  );

  const hasCRM = CRM.some((i) => isConnected(i.key as IntegrationKey));

  const handleContinue = async () => {
    updateFormData({ connectedIntegrations: connected });
    try {
      await saveStep("loop-connect", { connected_integrations: connected.map((c) => c.key) });
    } catch { /* continue */ }
    markStepComplete("loop-connect");
    goNext();
  };

  const handleSkip = async () => {
    try { await skipStepOnServer("loop-connect"); } catch { /* continue */ }
    markStepSkipped("loop-connect");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="loop-connect"
        title="Connect revenue signals"
        subtitle="Link your CRM and support tools so Loop can map customer demand directly to your backlog."
        color={COLOR}
      />

      <div className="space-y-5">
        <IntegrationGroup label="CRM" badge="Required"
          integrations={CRM} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.1} />
        <IntegrationGroup label="Revenue intelligence" badge="Recommended"
          integrations={REVENUE} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected}
          hint="Connect call recording tools to surface feature requests from sales conversations."
          delay={0.18} />
        <IntegrationGroup label="Customer support" badge="Recommended"
          integrations={SUPPORT} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.26} />
        <IntegrationGroup label="Notifications"
          integrations={COMM} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.34} />
        <IntegrationGroup label="Documents"
          integrations={DOCS} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.42} />
      </div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={hasCRM}
        skipLabel="Skip for now — connect later in Loop"
        onSkip={handleSkip}
      />
    </div>
  );
}

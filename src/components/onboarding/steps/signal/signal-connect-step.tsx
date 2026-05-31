"use client";

import * as React from "react";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { IntegrationGroup, useConnectState } from "@/components/onboarding/integration-card";
import { INTEGRATION_CATALOG } from "@/lib/constants";
import type { IntegrationKey } from "@/types";

const SIGNAL = INTEGRATION_CATALOG.filter((i) => (i.products as readonly string[]).includes("signal"));
const OBS    = SIGNAL.filter((i) => i.category === "Monitoring");
const SUPPORT = SIGNAL.filter((i) => i.category === "Support");
const COMM   = SIGNAL.filter((i) => i.category === "Communication");

const COLOR = "#EF4444";

export function SignalConnectStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, markStepSkipped, saveStep, skipStepOnServer } =
    useOnboarding();

  const { connected, isConnected, onConnected, onDisconnected } = useConnectState(
    formData.connectedIntegrations,
  );

  const hasObs = OBS.some((i) => isConnected(i.key as IntegrationKey));

  const handleContinue = async () => {
    updateFormData({ connectedIntegrations: connected });
    try {
      await saveStep("signal-connect", { connected_integrations: connected.map((c) => c.key) });
    } catch { /* continue */ }
    markStepComplete("signal-connect");
    goNext();
  };

  const handleSkip = async () => {
    try { await skipStepOnServer("signal-connect"); } catch { /* continue */ }
    markStepSkipped("signal-connect");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="signal-connect"
        title="Connect your observability stack"
        subtitle="Link your monitoring and alerting tools so Signal can route incidents with full revenue context."
        color={COLOR}
      />

      <div className="space-y-5">
        <IntegrationGroup label="Observability & alerting" badge="Required"
          hint="Connect at least one monitoring tool — Datadog, PagerDuty, Sentry, OpsGenie, or Grafana."
          integrations={OBS} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.1} />
        <IntegrationGroup label="Customer support" badge="Recommended"
          hint="Correlate support ticket volume with incidents to quantify customer impact."
          integrations={SUPPORT} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.18} />
        <IntegrationGroup label="Incident notifications"
          integrations={COMM} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.26} />
      </div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={hasObs}
        skipLabel="Skip for now — connect later in Signal"
        onSkip={handleSkip}
      />
    </div>
  );
}

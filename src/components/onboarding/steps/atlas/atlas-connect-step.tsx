"use client";

import * as React from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { ConnectToolsIconCluster } from "@/components/icons/integration-logos";
import { IntegrationGroup, useConnectState } from "@/components/onboarding/integration-card";
import { INTEGRATION_CATALOG } from "@/lib/constants";
import type { IntegrationKey } from "@/types";

const ATLAS = INTEGRATION_CATALOG.filter((i) => (i.products as readonly string[]).includes("atlas"));
const CODE  = ATLAS.filter((i) => i.category === "Code");
const BOARD = ATLAS.filter((i) => i.category === "Project");
const COMM  = ATLAS.filter((i) => i.category === "Communication");
const DOCS  = ATLAS.filter((i) => i.category === "Documents");

const COLOR = "#F05A28";

export function AtlasConnectStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, markStepSkipped, saveStep, skipStepOnServer } =
    useOnboarding();

  const { connected, isConnected, onConnected, onDisconnected } = useConnectState(
    formData.connectedIntegrations,
  );

  const hasCode = CODE.some((i) => isConnected(i.key as IntegrationKey));

  const handleContinue = async () => {
    updateFormData({ connectedIntegrations: connected });
    try {
      await saveStep("atlas-connect", { connected_integrations: connected.map((c) => c.key) });
    } catch { /* continue */ }
    markStepComplete("atlas-connect");
    goNext();
  };

  const handleSkip = async () => {
    try { await skipStepOnServer("atlas-connect"); } catch { /* continue */ }
    markStepSkipped("atlas-connect");
    goNext();
  };

  return (
    <div>
      <StepHeader
        icon={
          <ConnectToolsIconCluster
            keys={[...CODE, ...BOARD].slice(0, 3).map((i) => i.key)}
            names={[...CODE, ...BOARD].slice(0, 3).map((i) => i.name)}
          />
        }
        stepKey="atlas-connect"
        title="Connect your tools"
        subtitle="Link your code repo and project board so Atlas can analyse complexity and plan your sprint."
        color={COLOR}
      />

      <div className="mb-5 flex flex-wrap items-center justify-center gap-4 text-[10px] text-[#121312]/40">
        <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Read-only access</span>
        <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> No source code stored</span>
        <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Encrypted in transit</span>
      </div>

      <div className="space-y-5">
        <IntegrationGroup label="Code repository" badge="Required"
          integrations={CODE} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.1} />
        <IntegrationGroup label="Project board" badge="Recommended"
          integrations={BOARD} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.18} />
        <IntegrationGroup label="Notifications"
          integrations={COMM} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.26} />
        <IntegrationGroup label="Documents"
          integrations={DOCS} connected={isConnected} accentColor={COLOR}
          onConnected={onConnected} onDisconnected={onDisconnected} delay={0.34} />
      </div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={hasCode}
        skipLabel="Skip for now — connect later in Atlas"
        onSkip={handleSkip}
      />
    </div>
  );
}

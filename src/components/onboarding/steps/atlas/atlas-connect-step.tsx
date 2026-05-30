"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { INTEGRATION_CATALOG } from "@/lib/constants";
import { initiateOAuthConnect, connectWithAPIKey, disconnectIntegration, openOAuthPopup } from "@/lib/api";
import type { IntegrationKey, ConnectedIntegration, AuthMethod } from "@/types";

const ATLAS_INTEGRATIONS = INTEGRATION_CATALOG.filter((i) =>
  (i.products as readonly string[]).includes("atlas"),
);

const CODE_INTEGRATIONS = ATLAS_INTEGRATIONS.filter((i) => i.category === "Code");
const BOARD_INTEGRATIONS = ATLAS_INTEGRATIONS.filter((i) => i.category === "Project");
const COMM_INTEGRATIONS  = ATLAS_INTEGRATIONS.filter((i) => i.category === "Communication");

function IntegrationButton({
  integration,
  connected,
  onConnect,
  onDisconnect,
  loading,
}: {
  integration: (typeof ATLAS_INTEGRATIONS)[number];
  connected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  loading: boolean;
}) {
  return (
    <button
      type="button"
      onClick={connected ? onDisconnect : onConnect}
      disabled={loading}
      className={cn(
        "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all",
        connected
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-[#121312]/10 bg-white hover:border-brand/30 hover:bg-brand/5",
        loading && "opacity-50",
      )}
    >
      <span className="flex items-center gap-2.5 font-medium">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#121312]/6 text-[11px] font-bold">
          {integration.icon}
        </span>
        {integration.name}
      </span>
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
      ) : connected ? (
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          Connected
        </span>
      ) : (
        <span className="text-xs font-medium text-[#121312]/40">Connect</span>
      )}
    </button>
  );
}

export function AtlasConnectStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, markStepSkipped, saveStep, skipStepOnServer } = useOnboarding();
  const [connected, setConnected] = React.useState<ConnectedIntegration[]>(formData.connectedIntegrations);
  const [loadingKey, setLoadingKey] = React.useState<IntegrationKey | null>(null);

  const isConnected = (key: IntegrationKey) => connected.some((c) => c.key === key);

  const hasCode  = CODE_INTEGRATIONS.some((i) => isConnected(i.key as IntegrationKey));
  const hasBoard = BOARD_INTEGRATIONS.some((i) => isConnected(i.key as IntegrationKey));

  const handleConnect = async (key: IntegrationKey, authMethod: AuthMethod, displayName: string) => {
    setLoadingKey(key);
    try {
      if (authMethod === "oauth2" || authMethod === "oauth2_pkce") {
        const callbackUrl = `${window.location.origin}/onboarding/callback/${key}`;
        const { auth_url } = await initiateOAuthConnect(key, callbackUrl);
        await openOAuthPopup(auth_url);
        setConnected((prev) => [
          ...prev.filter((c) => c.key !== key),
          { key, displayName, connectedAt: new Date().toISOString(), authMethod },
        ]);
      }
    } catch {
      // silent
    } finally {
      setLoadingKey(null);
    }
  };

  const handleDisconnect = async (key: IntegrationKey) => {
    setLoadingKey(key);
    try {
      await disconnectIntegration(key);
      setConnected((prev) => prev.filter((c) => c.key !== key));
    } catch {
      // silent
    } finally {
      setLoadingKey(null);
    }
  };

  const handleContinue = async () => {
    updateFormData({ connectedIntegrations: connected });
    try { await saveStep("atlas-connect", { connected_integrations: connected.map((c) => c.key) }); } catch { /* continue */ }
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
        stepKey="atlas-connect"
        title="Connect your tools"
        subtitle="Link your code repo and project board so Atlas can analyse complexity and plan your sprint."
        color="#F05A28"
      />

      <div className="space-y-5">
        {/* Code */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">
            <span>Code repository</span>
            <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[9px] font-bold text-red-500">Required</span>
          </p>
          <div className="space-y-2">
            {CODE_INTEGRATIONS.map((i) => (
              <IntegrationButton
                key={i.key}
                integration={i}
                connected={isConnected(i.key as IntegrationKey)}
                onConnect={() => handleConnect(i.key as IntegrationKey, i.authMethod as AuthMethod, i.name)}
                onDisconnect={() => handleDisconnect(i.key as IntegrationKey)}
                loading={loadingKey === i.key}
              />
            ))}
          </div>
        </motion.div>

        {/* Board */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">
            <span>Project board</span>
            <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-600">Recommended</span>
          </p>
          <div className="space-y-2">
            {BOARD_INTEGRATIONS.map((i) => (
              <IntegrationButton
                key={i.key}
                integration={i}
                connected={isConnected(i.key as IntegrationKey)}
                onConnect={() => handleConnect(i.key as IntegrationKey, i.authMethod as AuthMethod, i.name)}
                onDisconnect={() => handleDisconnect(i.key as IntegrationKey)}
                loading={loadingKey === i.key}
              />
            ))}
          </div>
        </motion.div>

        {/* Communication */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">Notifications</p>
          <div className="space-y-2">
            {COMM_INTEGRATIONS.map((i) => (
              <IntegrationButton
                key={i.key}
                integration={i}
                connected={isConnected(i.key as IntegrationKey)}
                onConnect={() => handleConnect(i.key as IntegrationKey, i.authMethod as AuthMethod, i.name)}
                onDisconnect={() => handleDisconnect(i.key as IntegrationKey)}
                loading={loadingKey === i.key}
              />
            ))}
          </div>
        </motion.div>
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

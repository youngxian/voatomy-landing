"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { INTEGRATION_CATALOG } from "@/lib/constants";
import { initiateOAuthConnect, disconnectIntegration, openOAuthPopup } from "@/lib/api";
import type { IntegrationKey, ConnectedIntegration, AuthMethod } from "@/types";

const NEXUS_INTEGRATIONS = INTEGRATION_CATALOG.filter((i) =>
  (i.products as readonly string[]).includes("nexus"),
);

// Group by category
const grouped = NEXUS_INTEGRATIONS.reduce<Record<string, typeof NEXUS_INTEGRATIONS>>((acc, i) => {
  const cat = i.category ?? "Other";
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(i);
  return acc;
}, {});

function IntegrationButton({
  integration,
  connected,
  onConnect,
  onDisconnect,
  loading,
}: {
  integration: (typeof NEXUS_INTEGRATIONS)[number];
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
          : "border-[#121312]/10 bg-white hover:border-[#0EA5E9]/30 hover:bg-[#0EA5E9]/5",
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
        <svg className="animate-spin h-4 w-4 text-[#0EA5E9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

export function NexusConnectStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, markStepSkipped, saveStep, skipStepOnServer } = useOnboarding();
  const [connected, setConnected] = React.useState<ConnectedIntegration[]>(formData.connectedIntegrations);
  const [loadingKey, setLoadingKey] = React.useState<IntegrationKey | null>(null);

  const isConnected = (key: IntegrationKey) => connected.some((c) => c.key === key);
  const connectedCount = NEXUS_INTEGRATIONS.filter((i) => isConnected(i.key as IntegrationKey)).length;

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
    try { await saveStep("nexus-connect", { connected_integrations: connected.map((c) => c.key) }); } catch { /* continue */ }
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
        subtitle="Nexus builds a live org intelligence graph from all your connected tools."
        color="#0EA5E9"
      />

      {connectedCount > 0 && (
        <div className="mb-4 rounded-lg bg-[#0EA5E9]/8 border border-[#0EA5E9]/20 px-3 py-2 text-sm text-[#0EA5E9] font-medium">
          {connectedCount} tool{connectedCount !== 1 ? "s" : ""} connected — the more you add, the richer your Nexus graph.
        </div>
      )}

      <div className="space-y-5">
        {Object.entries(grouped).map(([category, integrations], gi) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.07 }}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">{category}</p>
            <div className="space-y-2">
              {integrations.map((i) => (
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
        ))}
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

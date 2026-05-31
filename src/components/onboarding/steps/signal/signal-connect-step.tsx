"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { IntegrationLogo } from "@/components/icons/integration-logos";
import { INTEGRATION_CATALOG } from "@/lib/constants";
import { initiateOAuthConnect, disconnectIntegration, openOAuthPopup } from "@/lib/api";
import type { IntegrationKey, ConnectedIntegration, AuthMethod } from "@/types";

const SIGNAL_INTEGRATIONS = INTEGRATION_CATALOG.filter((i) =>
  (i.products as readonly string[]).includes("signal"),
);

const OBS_INTEGRATIONS  = SIGNAL_INTEGRATIONS.filter((i) => i.category === "Monitoring");
const CRM_INTEGRATIONS  = SIGNAL_INTEGRATIONS.filter((i) => i.category === "CRM");
const COMM_INTEGRATIONS = SIGNAL_INTEGRATIONS.filter((i) => i.category === "Communication");

function IntegrationButton({
  integration,
  connected,
  onConnect,
  onDisconnect,
  loading,
}: {
  integration: (typeof SIGNAL_INTEGRATIONS)[number];
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
          : "border-[#121312]/10 bg-white hover:border-[#EF4444]/30 hover:bg-[#EF4444]/5",
        loading && "opacity-50",
      )}
    >
      <span className="flex items-center gap-2.5 font-medium">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-white shadow-sm">
          <IntegrationLogo integrationKey={integration.key} name={integration.name} size="md" />
        </span>
        {integration.name}
      </span>
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

export function SignalConnectStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, markStepSkipped, saveStep, skipStepOnServer } = useOnboarding();
  const [connected, setConnected] = React.useState<ConnectedIntegration[]>(formData.connectedIntegrations);
  const [loadingKey, setLoadingKey] = React.useState<IntegrationKey | null>(null);

  const isConnected = (key: IntegrationKey) => connected.some((c) => c.key === key);
  const hasObs = OBS_INTEGRATIONS.some((i) => isConnected(i.key as IntegrationKey));

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
    try { await saveStep("signal-connect", { connected_integrations: connected.map((c) => c.key) }); } catch { /* continue */ }
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
        color="#EF4444"
      />

      <div className="space-y-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">
            <span>Observability & alerting</span>
            <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[9px] font-bold text-red-500">Required</span>
          </p>
          <div className="space-y-2">
            {OBS_INTEGRATIONS.map((i) => (
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

        {CRM_INTEGRATIONS.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">
              <span>CRM (revenue context)</span>
              <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-600">Recommended</span>
            </p>
            <div className="space-y-2">
              {CRM_INTEGRATIONS.map((i) => (
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
        )}

        {COMM_INTEGRATIONS.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">Incident notifications</p>
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
        )}
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

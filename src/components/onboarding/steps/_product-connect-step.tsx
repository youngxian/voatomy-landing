"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../onboarding-context";
import { StepHeader, StepNav } from "./_shared";
import { INTEGRATION_CATALOG } from "@/lib/constants";
import { PRODUCT_MODULES } from "@/lib/product-onboarding-config";
import {
  initiateOAuthConnect,
  connectWithAPIKey,
  disconnectIntegration,
  openOAuthPopup,
} from "@/lib/api";
import type { IntegrationKey, ConnectedIntegration, AuthMethod, OnboardingStep, ProductKey } from "@/types";

type IntegrationGroup = {
  label: string;
  badge?: "Required" | "Recommended";
  categoryFilter?: string[];
  keys?: IntegrationKey[];
};

function IntegrationButton({
  integration,
  connected,
  onConnect,
  onDisconnect,
  loading,
}: {
  integration: (typeof INTEGRATION_CATALOG)[number];
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
        <svg className="h-4 w-4 animate-spin text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
      ) : connected ? (
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Connected
        </span>
      ) : (
        <span className="text-xs font-medium text-[#121312]/40">Connect</span>
      )}
    </button>
  );
}

export function ProductConnectStep({
  product,
  stepId,
  title,
  subtitle,
  groups,
  requireConnected = true,
  skipLabel,
  useAllIntegrations = false,
}: {
  product: ProductKey;
  stepId: OnboardingStep;
  title?: string;
  subtitle?: string;
  groups: IntegrationGroup[];
  requireConnected?: boolean;
  skipLabel?: string;
  /** When true, show the full integration catalog (used for Nexus). */
  useAllIntegrations?: boolean;
}) {
  const module = PRODUCT_MODULES[product];
  const { goNext, goBack, updateFormData, formData, markStepComplete, markStepSkipped, saveStep, skipStepOnServer } =
    useOnboarding();
  const [connected, setConnected] = React.useState<ConnectedIntegration[]>(formData.connectedIntegrations);
  const [loadingKey, setLoadingKey] = React.useState<IntegrationKey | null>(null);

  const productIntegrations = useAllIntegrations
    ? INTEGRATION_CATALOG
    : INTEGRATION_CATALOG.filter((i) => (i.products as readonly string[]).includes(product));

  const resolveGroupIntegrations = (group: IntegrationGroup) => {
    if (group.keys?.length) {
      return productIntegrations.filter((i) => group.keys!.includes(i.key as IntegrationKey));
    }
    if (group.categoryFilter?.length) {
      return productIntegrations.filter((i) => group.categoryFilter!.includes(i.category));
    }
    return productIntegrations;
  };

  const isConnected = (key: IntegrationKey) => connected.some((c) => c.key === key);

  const hasRequired = groups.some((g) => g.badge === "Required")
    ? groups
        .filter((g) => g.badge === "Required")
        .every((g) => resolveGroupIntegrations(g).some((i) => isConnected(i.key as IntegrationKey)))
    : connected.length > 0;

  const handleConnect = async (integ: (typeof INTEGRATION_CATALOG)[number]) => {
    const key = integ.key as IntegrationKey;
    setLoadingKey(key);
    try {
      if (integ.authMethod === "oauth2" || integ.authMethod === "oauth2_pkce") {
        const callbackUrl = `${window.location.origin}/onboarding/callback/${key}`;
        const { auth_url } = await initiateOAuthConnect(key, callbackUrl);
        await openOAuthPopup(auth_url);
        setConnected((prev) => [
          ...prev.filter((c) => c.key !== key),
          {
            key,
            displayName: integ.name,
            connectedAt: new Date().toISOString(),
            authMethod: integ.authMethod as AuthMethod,
          },
        ]);
      } else if (integ.authMethod === "api_key") {
        const result = await connectWithAPIKey(key, {});
        setConnected((prev) => [...prev.filter((c) => c.key !== key), result]);
      }
    } catch {
      // silent — user can retry
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
    try {
      await saveStep(stepId, { connected_integrations: connected.map((c) => c.key) });
    } catch {
      /* continue */
    }
    markStepComplete(stepId);
    goNext();
  };

  const handleSkip = async () => {
    try {
      await skipStepOnServer(stepId);
    } catch {
      /* continue */
    }
    markStepSkipped(stepId);
    goNext();
  };

  return (
    <div>
      <StepHeader
        productKey={module.key}
        title={title ?? "Connect your tools"}
        subtitle={subtitle ?? module.connectBlurb}
        color={module.color}
      />

      <div className="space-y-5">
        {groups.map((group, gi) => {
          const items = resolveGroupIntegrations(group);
          if (items.length === 0) return null;
          return (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + gi * 0.1 }}
            >
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">
                <span>{group.label}</span>
                {group.badge === "Required" && (
                  <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[9px] font-bold text-red-500">Required</span>
                )}
                {group.badge === "Recommended" && (
                  <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-600">Recommended</span>
                )}
              </p>
              <div className="space-y-2">
                {items.map((i) => (
                  <IntegrationButton
                    key={i.key}
                    integration={i}
                    connected={isConnected(i.key as IntegrationKey)}
                    onConnect={() => handleConnect(i)}
                    onDisconnect={() => handleDisconnect(i.key as IntegrationKey)}
                    loading={loadingKey === i.key}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={requireConnected ? hasRequired : true}
        skipLabel={skipLabel ?? `Skip for now — connect later in ${module.label}`}
        onSkip={handleSkip}
      />
    </div>
  );
}

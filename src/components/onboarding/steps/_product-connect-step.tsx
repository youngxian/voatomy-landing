"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useOnboarding } from "../onboarding-context";
import { StepHeader, StepNav } from "./_shared";
import { INTEGRATION_CATALOG } from "@/lib/constants";
import { IntegrationCard, useConnectState } from "@/components/onboarding/integration-card";
import { PRODUCT_MODULES } from "@/lib/product-onboarding-config";
import type { IntegrationKey, OnboardingStep, ProductKey } from "@/types";

type IntegrationGroup = {
  label: string;
  badge?: "Required" | "Recommended";
  categoryFilter?: string[];
  keys?: IntegrationKey[];
  hint?: string;
};

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
  useAllIntegrations?: boolean;
}) {
  const module = PRODUCT_MODULES[product];
  const { goNext, goBack, updateFormData, formData, markStepComplete, markStepSkipped, saveStep, skipStepOnServer } =
    useOnboarding();

  const { connected, isConnected, onConnected, onDisconnected } = useConnectState(
    formData.connectedIntegrations,
  );

  const productIntegrations = useAllIntegrations
    ? INTEGRATION_CATALOG
    : INTEGRATION_CATALOG.filter((i) => (i.products as readonly string[]).includes(product));

  const resolveGroup = (group: IntegrationGroup) => {
    if (group.keys?.length) {
      return productIntegrations.filter((i) => group.keys!.includes(i.key as IntegrationKey));
    }
    if (group.categoryFilter?.length) {
      return productIntegrations.filter((i) => group.categoryFilter!.includes(i.category));
    }
    return productIntegrations;
  };

  const hasRequired = groups.some((g) => g.badge === "Required")
    ? groups
        .filter((g) => g.badge === "Required")
        .every((g) => resolveGroup(g).some((i) => isConnected(i.key as IntegrationKey)))
    : connected.length > 0;

  const handleContinue = async () => {
    updateFormData({ connectedIntegrations: connected });
    try {
      await saveStep(stepId, { connected_integrations: connected.map((c) => c.key) });
    } catch { /* continue */ }
    markStepComplete(stepId);
    goNext();
  };

  const handleSkip = async () => {
    try { await skipStepOnServer(stepId); } catch { /* continue */ }
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
          const items = resolveGroup(group);
          if (items.length === 0) return null;
          return (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + gi * 0.1 }}
            >
              <div className="mb-2 flex items-center gap-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#121312]/40">{group.label}</p>
                {group.badge === "Required" && (
                  <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[9px] font-bold text-red-500">Required</span>
                )}
                {group.badge === "Recommended" && (
                  <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-600">Recommended</span>
                )}
              </div>
              {group.hint && (
                <p className="mb-2 text-xs text-[#121312]/45">{group.hint}</p>
              )}
              <div className="space-y-2">
                {items.map((i) => (
                  <IntegrationCard
                    key={i.key}
                    integration={i}
                    connected={isConnected(i.key as IntegrationKey)}
                    accentColor={module.color}
                    onConnected={onConnected}
                    onDisconnected={onDisconnected}
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

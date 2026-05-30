"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  OnboardingProductIcon,
  OnboardingRoleIcon,
} from "../onboarding-icons";
import { StepHeader } from "./_shared";
import { ob, ObField, ObHint, ObPrimaryButton } from "../onboarding-primitives";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../onboarding-context";
import { ROLE_OPTIONS } from "@/lib/constants";
import { useProductOnboarding } from "@/hooks/use-product-onboarding";
import { getProductLabel } from "@/lib/product-onboarding-config";
import type { StartupIdeaTemplate, UserRole } from "@/types";
import { fetchCurrentUser } from "@/lib/api";
import { trackConversion, trackFormEvent } from "@/lib/analytics";
import { useDictionary } from "@/i18n/locale-provider";

export function WelcomeStep() {
  const dict = useDictionary();
  const t = dict.onboarding.welcome;
  const { goNext, updateFormData, formData, markStepComplete, startSession, saveStep, sessionId, version } = useOnboarding();
  const {
    availableTemplates,
    singleProductMode,
    primaryProduct,
    licensedProducts,
    subscriptionLoading,
    primaryModule,
  } = useProductOnboarding();

  const [selectedRole, setSelectedRole] = React.useState<UserRole | "">(formData.userRole);
  const [selectedTemplate, setSelectedTemplate] = React.useState<StartupIdeaTemplate | "">(
    formData.startupIdeaTemplate || (singleProductMode ? primaryProduct : ""),
  );
  const [error, setError] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (singleProductMode && primaryProduct) {
      setSelectedTemplate(primaryProduct);
    }
  }, [singleProductMode, primaryProduct]);

  const effectiveTemplate = singleProductMode ? primaryProduct : selectedTemplate;
  const canContinue = selectedRole !== "" && effectiveTemplate !== "" && !isSaving && !subscriptionLoading;
  const firstName = formData.fullName?.split(" ")[0];

  const handleContinue = async () => {
    if (!selectedRole) {
      setError(t.errors.roleRequired);
      trackFormEvent("welcome-form", "error", undefined, { errors: ["role"] });
      return;
    }
    if (!effectiveTemplate) {
      setError(t.errors.productRequired);
      trackFormEvent("welcome-form", "error", undefined, { errors: ["template"] });
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      let stepVersion = version;
      let fullName = formData.fullName.trim();
      let email = formData.email.trim();

      if (!fullName || !email) {
        const me = await fetchCurrentUser();
        fullName = fullName || me.full_name.trim();
        email = email || me.email.trim();
        if (fullName || email) {
          updateFormData({ fullName, email });
        }
      }

      if (!sessionId || stepVersion <= 0) {
        if (!fullName || !email) {
          setError(t.errors.profileLoadFailed);
          return;
        }
        const session = await startSession({
          full_name: fullName,
          email,
          role: selectedRole,
        });
        stepVersion = session.version;
      }

      updateFormData({
        userRole: selectedRole,
        startupIdeaTemplate: effectiveTemplate,
        primaryProduct: effectiveTemplate,
        selectedProducts: licensedProducts,
      });
      await saveStep(
        "welcome",
        {
          userRole: selectedRole,
          startupIdeaTemplate: effectiveTemplate,
          primaryProduct: effectiveTemplate,
          selectedProducts: licensedProducts,
        },
        stepVersion,
      );
      trackFormEvent("welcome-form", "submit", undefined, {
        role: selectedRole,
        template: effectiveTemplate,
        licensedProducts,
      });
      trackConversion("email_captured", {
        source: "onboarding-welcome",
        role: selectedRole,
        template: effectiveTemplate,
      });
      markStepComplete("welcome");
      goNext();
    } catch (err) {
      const msg = err instanceof Error ? err.message : t.errors.sessionFailed;
      setError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <StepHeader
        stepKey="welcome"
        title={firstName ? t.titleWithName.replace("{name}", firstName) : t.title}
        subtitle={
          singleProductMode
            ? `${t.subtitleSinglePrefix} ${getProductLabel(primaryProduct)} ${t.subtitleSingleSuffix}`
            : t.subtitleMulti
        }
      />

      {subscriptionLoading && (
        <div className="mb-3 flex justify-center">
          <span className="block h-4 w-4 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={ob.section}
      >
        <ObField label={t.roleLabel} hint={t.roleHint}>
          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5">
            {ROLE_OPTIONS.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => {
                  setSelectedRole(role.value);
                  setError("");
                }}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border px-1 py-2 text-center transition-all duration-200",
                  selectedRole === role.value
                    ? "border-brand bg-brand/8 ring-1 ring-brand/20"
                    : "border-fynk-border bg-white hover:bg-fynk-surface-alt/50",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-lg",
                    selectedRole === role.value ? "bg-brand/15 text-brand" : "bg-fynk-surface-alt text-fynk-muted",
                  )}
                >
                  <OnboardingRoleIcon role={role.value} className="h-3.5 w-3.5" />
                </span>
                <span
                  className={cn(
                    "text-[10px] font-medium leading-tight",
                    selectedRole === role.value ? "text-fynk-ink" : "text-fynk-muted",
                  )}
                >
                  {dict.onboarding.roles[role.value] ?? role.label}
                </span>
              </button>
            ))}
          </div>
        </ObField>

        {singleProductMode ? (
          <div className={cn(ob.card, "border-brand/20 bg-brand/[0.04]")}>
            <p className="text-[10px] font-bold uppercase tracking-wide text-brand">{t.yourProduct}</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-fynk-ink">
              <OnboardingProductIcon product={primaryProduct} className="h-5 w-5" />
              {getProductLabel(primaryProduct)} — {primaryModule.tagline}
            </p>
            <ObHint className="mt-0.5">{primaryModule.welcomeSummary}</ObHint>
          </div>
        ) : (
          <ObField label={t.productPickerLabel} hint={t.productPickerHint}>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {availableTemplates.map((template) => (
                <button
                  key={template.key}
                  type="button"
                  onClick={() => {
                    setSelectedTemplate(template.key);
                    setError("");
                  }}
                  className={cn(
                    "flex items-start gap-2.5 rounded-xl border p-2.5 text-left transition-all duration-200",
                    selectedTemplate === template.key
                      ? "border-brand bg-brand/8 ring-1 ring-brand/20"
                      : "border-fynk-border bg-white hover:bg-fynk-surface-alt/50",
                  )}
                >
                  <OnboardingProductIcon product={template.key} className="h-6 w-6 shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-brand">
                      {template.key}
                    </span>
                    <span className="block text-xs font-semibold text-fynk-ink">{template.title}</span>
                    <span className="mt-0.5 block text-[10px] leading-snug text-fynk-muted line-clamp-2">
                      {template.summary}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </ObField>
        )}

        {error && <p className={ob.error}>{error}</p>}

        <ObPrimaryButton onClick={handleContinue} disabled={!canContinue} loading={isSaving}>
          {isSaving ? t.saving : t.getStarted}
        </ObPrimaryButton>
      </motion.div>

      <ObHint className="mt-3 text-center text-[10px]">{t.securityNote}</ObHint>
    </div>
  );
}

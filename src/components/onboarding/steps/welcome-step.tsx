"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  OnboardingProductIcon,
  RoleTileIcon,
  WelcomeHeaderIcon,
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
import { getGreetingFirstName } from "@/lib/display-name";
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
  const [profileName, setProfileName] = React.useState(formData.fullName);

  React.useEffect(() => {
    if (singleProductMode && primaryProduct) {
      setSelectedTemplate(primaryProduct);
    }
  }, [singleProductMode, primaryProduct]);

  React.useEffect(() => {
    if (formData.fullName.trim()) {
      setProfileName(formData.fullName);
    }
  }, [formData.fullName]);

  React.useEffect(() => {
    let cancelled = false;
    fetchCurrentUser()
      .then((me) => {
        if (cancelled || !me.full_name?.trim()) return;
        setProfileName(me.full_name.trim());
        updateFormData({ fullName: me.full_name.trim(), email: me.email });
      })
      .catch(() => {
        /* profile optional on welcome */
      });
    return () => {
      cancelled = true;
    };
  }, [updateFormData]);

  const effectiveTemplate = singleProductMode ? primaryProduct : selectedTemplate;
  const canContinue = selectedRole !== "" && effectiveTemplate !== "" && !isSaving && !subscriptionLoading;
  const greetingName = getGreetingFirstName(profileName, formData.email);

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
      let fullName = formData.fullName.trim() || profileName.trim();
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
        icon={<WelcomeHeaderIcon />}
        stepKey="welcome"
        title={greetingName ? t.titleWithName.replace("{name}", greetingName) : t.title}
        subtitle={
          singleProductMode
            ? `${t.subtitleSinglePrefix} ${getProductLabel(primaryProduct)} ${t.subtitleSingleSuffix}`
            : t.subtitleMulti
        }
        color="#F05A28"
      />

      {subscriptionLoading && (
        <div className="mb-3 flex justify-center">
          <span className="block h-4 w-4 animate-spin rounded-full border-2 border-[#F05A28]/30 border-t-[#F05A28]" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <section className={ob.sectionCard}>
          <ObField label={t.roleLabel} hint={t.roleHint}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ROLE_OPTIONS.map((role) => {
                const selected = selectedRole === role.value;
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role.value);
                      setError("");
                    }}
                    className={ob.selectTile(selected)}
                  >
                    <RoleTileIcon role={role.value} />
                    <span
                      className={cn(
                        "text-[10px] font-semibold leading-tight",
                        selected ? "text-fynk-ink" : "text-fynk-muted",
                      )}
                    >
                      {dict.onboarding.roles[role.value] ?? role.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </ObField>
        </section>

        {singleProductMode ? (
          <div className={cn(ob.card, "border-[#F05A28]/20 bg-[#FFF8F5]")}>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#F05A28]">{t.yourProduct}</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-fynk-ink">
              <OnboardingProductIcon product={primaryProduct} className="h-5 w-5" />
              {getProductLabel(primaryProduct)} — {primaryModule.tagline}
            </p>
            <ObHint className="mt-0.5">{primaryModule.welcomeSummary}</ObHint>
          </div>
        ) : (
          <section className={ob.sectionCard}>
            <ObField label={t.productPickerLabel} hint={t.productPickerHint}>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {availableTemplates.map((template) => {
                  const selected = selectedTemplate === template.key;
                  return (
                    <button
                      key={template.key}
                      type="button"
                      onClick={() => {
                        setSelectedTemplate(template.key);
                        setError("");
                      }}
                      className={ob.selectRow(selected)}
                    >
                      <OnboardingProductIcon product={template.key} className="h-9 w-9 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] font-bold uppercase tracking-wide text-[#F05A28]">
                          {template.key}
                        </span>
                        <span className="block text-sm font-semibold text-fynk-ink">{template.title}</span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-fynk-muted line-clamp-2">
                          {template.summary}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ObField>
          </section>
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

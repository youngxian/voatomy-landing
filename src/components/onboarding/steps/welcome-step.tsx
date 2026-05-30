"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../onboarding-context";
import { ROLE_OPTIONS } from "@/lib/constants";
import { useProductOnboarding } from "@/hooks/use-product-onboarding";
import { getProductLabel } from "@/lib/product-onboarding-config";
import type { StartupIdeaTemplate, UserRole } from "@/types";
import { trackConversion, trackFormEvent } from "@/lib/analytics";

export function WelcomeStep() {
  const { goNext, updateFormData, formData, markStepComplete, startSession, saveStep } = useOnboarding();
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

  const handleContinue = async () => {
    if (!selectedRole) {
      setError("Please select your role");
      trackFormEvent("welcome-form", "error", undefined, { errors: ["role"] });
      return;
    }
    if (!effectiveTemplate) {
      setError("Please select your primary product focus");
      trackFormEvent("welcome-form", "error", undefined, { errors: ["template"] });
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      await startSession({
        full_name: formData.fullName,
        email: formData.email,
        role: selectedRole,
      });
      updateFormData({
        userRole: selectedRole,
        startupIdeaTemplate: effectiveTemplate,
        primaryProduct: effectiveTemplate,
        selectedProducts: licensedProducts,
      });
      await saveStep("welcome", {
        userRole: selectedRole,
        startupIdeaTemplate: effectiveTemplate,
        primaryProduct: effectiveTemplate,
        selectedProducts: licensedProducts,
      });
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
      const msg = err instanceof Error ? err.message : "Failed to start session";
      setError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const firstName = formData.fullName?.split(" ")[0];

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand/15"
      >
        <motion.span
          className="text-4xl"
          animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
          transition={{ duration: 2.5, delay: 0.6, ease: "easeInOut" }}
        >
          👋
        </motion.span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-2 text-[32px] font-bold leading-tight tracking-tight text-[#121312]"
      >
        {firstName ? `Hey ${firstName}!` : "Welcome to Voatomy"}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mb-10 max-w-[420px] text-[15px] leading-relaxed text-[#121312]/55"
      >
        {singleProductMode ? (
          <>
            Let&apos;s set up your workspace for{" "}
            <strong className="text-[#121312]/75">{getProductLabel(primaryProduct)}</strong> in under 2 minutes.
          </>
        ) : (
          <>Let&apos;s set up your workspace in under 2 minutes. We&apos;ll personalize for your licensed products.</>
        )}
      </motion.p>

      {subscriptionLoading && (
        <div className="mb-6 flex justify-center">
          <span className="block h-5 w-5 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-5 text-left"
      >
        <div>
          <label className="mb-1 block text-sm font-semibold text-[#121312]/80">
            What best describes your role?
          </label>
          <p className="mb-3 text-xs text-[#121312]/45">This helps us tailor your experience</p>

          <div className="grid grid-cols-3 gap-2">
            {ROLE_OPTIONS.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => {
                  setSelectedRole(role.value);
                  setError("");
                }}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all duration-200",
                  selectedRole === role.value
                    ? "border-brand bg-brand/8 shadow-sm ring-1 ring-brand/20"
                    : "border-[#121312]/8 bg-white hover:border-[#121312]/15 hover:bg-[#121312]/[0.02]",
                )}
              >
                <span className="text-lg">{role.icon}</span>
                <span
                  className={cn(
                    "text-[11px] font-medium leading-tight",
                    selectedRole === role.value ? "text-[#121312]" : "text-[#121312]/65",
                  )}
                >
                  {role.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {singleProductMode ? (
          <div className="rounded-xl border border-brand/20 bg-brand/5 p-4 text-left">
            <p className="text-[11px] font-bold uppercase tracking-wide text-brand-dark/70">Your product</p>
            <p className="mt-1 text-sm font-semibold text-[#121312]">
              {primaryModule.icon} {getProductLabel(primaryProduct)} — {primaryModule.tagline}
            </p>
            <p className="mt-1 text-xs text-[#121312]/50">{primaryModule.welcomeSummary}</p>
            <p className="mt-2 text-[10px] text-[#121312]/40">
              Product-specific setup continues after org onboarding, when you first open {getProductLabel(primaryProduct)}.
            </p>
          </div>
        ) : (
          <div>
            <label className="mb-1 block text-sm font-semibold text-[#121312]/80">
              Which product are you setting up first?
            </label>
            <p className="mb-3 text-xs text-[#121312]/45">
              Based on your subscription — only showing products you have access to
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableTemplates.map((template) => (
                <button
                  key={template.key}
                  type="button"
                  onClick={() => {
                    setSelectedTemplate(template.key);
                    setError("");
                  }}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-3 text-left transition-all duration-200",
                    selectedTemplate === template.key
                      ? "border-brand bg-brand/8 shadow-sm ring-1 ring-brand/20"
                      : "border-[#121312]/8 bg-white hover:border-[#121312]/15 hover:bg-[#121312]/[0.02]",
                  )}
                >
                  <span className="text-xl shrink-0">{template.icon}</span>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-wide text-brand-dark/70">
                      {template.key}
                    </span>
                    <span className="block text-xs font-semibold text-[#121312]">{template.title}</span>
                    <span className="block text-[10px] text-[#121312]/50 leading-snug mt-0.5">{template.summary}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <p className="text-xs text-red-500 text-center">{error}</p>}

        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
          className={cn(
            "mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-base font-semibold transition-all duration-200",
            canContinue
              ? "bg-brand text-[#121312] shadow-sm hover:bg-brand/90 hover:shadow-md active:scale-[0.98]"
              : "bg-[#121312]/8 text-[#121312]/35 cursor-not-allowed",
          )}
        >
          {isSaving ? (
            <>
              <span className="block h-4 w-4 animate-spin rounded-full border-2 border-[#121312]/20 border-t-[#121312]" />
              Setting up…
            </>
          ) : (
            <>
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </>
          )}
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-[11px] text-[#121312]/35"
      >
        🔒 Your data is encrypted end-to-end. We never store source code.
      </motion.p>
    </div>
  );
}

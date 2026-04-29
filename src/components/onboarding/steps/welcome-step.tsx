"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../onboarding-context";
import { ROLE_OPTIONS } from "@/lib/constants";
import type { UserRole } from "@/types";
import { trackConversion, trackFormEvent } from "@/lib/analytics";

export function WelcomeStep() {
  const { goNext, updateFormData, formData, markStepComplete, startSession } = useOnboarding();
  const [selectedRole, setSelectedRole] = React.useState<UserRole | "">(formData.userRole);
  const [error, setError] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  const canContinue = selectedRole !== "" && !isSaving;

  const handleContinue = async () => {
    if (!selectedRole) {
      setError("Please select your role");
      trackFormEvent("welcome-form", "error", undefined, { errors: ["role"] });
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
      trackFormEvent("welcome-form", "submit", undefined, { role: selectedRole });
      trackConversion("email_captured", { source: "onboarding-welcome", role: selectedRole });
      updateFormData({ userRole: selectedRole });
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
      {/* Animated wave */}
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
        Let&apos;s set up your workspace in under 2 minutes. We&apos;ll personalize everything for your team.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-5 text-left"
      >
        {/* Role — visual grid */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-[#121312]/80">
            What best describes your role?
          </label>
          <p className="mb-3 text-xs text-[#121312]/45">This helps us tailor your experience</p>
          {error && <p className="mb-2 text-xs text-red-500">{error}</p>}

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

        {/* Continue */}
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

      {/* Trust note */}
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

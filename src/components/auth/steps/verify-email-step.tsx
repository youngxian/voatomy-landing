"use client";

import * as React from "react";
import { useAuth } from "../auth-page";
import { resendMagicLink, APIError } from "@/lib/api";

export function VerifyEmailStep() {
  const { setStep, formData } = useAuth();
  const [resendTimer, setResendTimer] = React.useState(60);
  const [resendDisabled, setResendDisabled] = React.useState(true);
  const [resendMessage, setResendMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (resendTimer <= 0) {
      setResendDisabled(false);
      return;
    }
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResend = async () => {
    setResendDisabled(true);
    setResendTimer(60);
    setResendMessage(null);
    try {
      await resendMagicLink(formData.email);
      setResendMessage("New link sent!");
    } catch (err) {
      const msg = err instanceof APIError ? err.message : "Failed to resend";
      setResendMessage(msg);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={() => setStep("signup")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#121312]/55 hover:text-[#121312] transition-colors cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>

      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </div>

      <h1 className="mb-3 text-[46px] font-semibold leading-[1.04] tracking-tight text-[#121312]">
        Check your inbox
      </h1>
      <p className="mx-auto mb-2 max-w-[330px] text-[15px] leading-relaxed text-[#121312]/55">
        We sent a sign-in link to
      </p>
      <p className="mb-2 text-[15px] font-semibold text-[#121312]">
        {formData.email || "your email"}
      </p>
      <p className="mb-8 text-sm text-[#121312]/40">
        The link expires in 15 minutes.
      </p>

      <div className="mx-auto max-w-[320px] rounded-xl border border-[#121312]/8 bg-[#121312]/[0.02] p-4 text-left">
        <p className="text-sm text-[#121312]/60">
          Click the link in your email to sign in and start setting up your workspace. No password needed.
        </p>
      </div>

      {resendMessage && (
        <p className="mt-4 text-sm text-emerald-600">{resendMessage}</p>
      )}

      <div className="mt-6">
        <p className="text-sm text-[#121312]/50">
          Didn&apos;t receive it?{" "}
          <button
            onClick={handleResend}
            disabled={resendDisabled}
            className="font-semibold text-[#121312]/70 hover:text-[#121312] transition-colors disabled:text-[#121312]/30 disabled:cursor-not-allowed cursor-pointer"
          >
            {resendDisabled ? `Resend in ${resendTimer}s` : "Resend link"}
          </button>
        </p>
      </div>

      <button
        onClick={() => setStep("signup")}
        className="mt-3 text-sm font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer"
      >
        Use a different email
      </button>
    </div>
  );
}

"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../auth-page";
// import { isWorkEmail } from "@/lib/utils";
import { forgotPassword, APIError } from "@/lib/api";

const forgotSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),
    // .refine(isWorkEmail, "Please use your work email"),
});

type ForgotValues = z.infer<typeof forgotSchema>;

export function ForgotPasswordStep() {
  const { setStep } = useAuth();
  const [submitted, setSubmitted] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState("");
  const [apiError, setApiError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotValues) => {
    setApiError(null);
    try {
      await forgotPassword(data.email);
      setSubmittedEmail(data.email);
      setSubmitted(true);
    } catch (err) {
      if (err instanceof APIError) {
        setApiError(err.message);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        {/* Success icon */}
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
          We sent a password reset link to
        </p>
        <p className="mb-2 text-[15px] font-semibold text-[#121312]">
          {submittedEmail}
        </p>
        <p className="mb-8 text-sm text-[#121312]/40">
          The link expires in 1 hour.
        </p>

        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer"
        >
          Didn&apos;t get it? Resend
        </button>

        <div className="mt-6">
          <button
            onClick={() => setStep("login")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#121312]/55 hover:text-[#121312] transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Back */}
      <button
        onClick={() => setStep("login")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#121312]/55 hover:text-[#121312] transition-colors cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to sign in
      </button>

      <h1 className="mb-3 text-[46px] font-semibold leading-[1.04] tracking-tight text-[#121312]">
        Reset your password
      </h1>
      <p className="mx-auto mb-8 max-w-[330px] text-[15px] leading-relaxed text-[#121312]/55">
        Enter the email address linked to your account and we&apos;ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 text-left">
        <div>
          <label htmlFor="forgot_email" className="mb-2 block text-sm font-semibold text-[#121312]/70">
            Work email
          </label>
          <input
            id="forgot_email"
            type="email"
            placeholder="jane@yourcompany.com"
            autoComplete="email"
            className="flex h-12 w-full rounded-md border border-[#121312]/15 bg-white px-3.5 text-base font-medium text-[#121312] transition-colors placeholder:text-[#121312]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {apiError && (
          <div className="rounded-lg bg-red-50 px-3.5 py-3 text-sm text-red-600">
            {apiError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#121312]/90 active:scale-[0.98] disabled:opacity-50"
        >
          {isSubmitting ? "Sending…" : "Send reset link"}
        </button>
      </form>
    </div>
  );
}

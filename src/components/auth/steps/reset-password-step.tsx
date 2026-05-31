"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetPassword, APIError } from "@/lib/api";
import { useDictionary } from "@/i18n/locale-provider";

type ResetValues = {
  password: string;
  confirmPassword: string;
};

interface ResetPasswordStepProps {
  token: string;
  onSuccess?: () => void;
}

export function ResetPasswordStep({ token, onSuccess }: ResetPasswordStepProps) {
  const dict = useDictionary();
  const t = dict.auth.resetPassword;
  const common = dict.auth.common;
  const rules = t.rules;

  const resetSchema = React.useMemo(
    () =>
      z
        .object({
          password: z
            .string()
            .min(8, rules.minLength)
            .regex(/[A-Z]/, rules.uppercase)
            .regex(/[0-9]/, rules.number)
            .regex(/[!@#$%^&*(),.?":{}|<>]/, rules.special),
          confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: rules.mismatch,
          path: ["confirmPassword"],
        }),
    [rules],
  );

  const passwordRules = React.useMemo(
    () => [
      { label: rules.minLength, test: (v: string) => v.length >= 8 },
      { label: rules.uppercase, test: (v: string) => /[A-Z]/.test(v) },
      { label: rules.number, test: (v: string) => /[0-9]/.test(v) },
      { label: rules.special, test: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v) },
    ],
    [rules],
  );

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (data: ResetValues) => {
    setApiError(null);
    try {
      await resetPassword(token, data.password, data.confirmPassword);
      setSuccess(true);
      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (err) {
      if (err instanceof APIError) {
        if (err.code === "reset_token_expired") {
          setApiError(t.errors.expired);
        } else if (err.code === "reset_token_used") {
          setApiError(t.errors.used);
        } else if (err.code === "not_found") {
          setApiError(t.errors.invalid);
        } else {
          setApiError(err.message);
        }
      } else {
        setApiError(common.somethingWrong);
      }
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="mb-2 text-[clamp(26px,7.5vw,46px)] font-semibold leading-[1.08] tracking-tight text-[#121312] sm:mb-3">
          {t.successTitle}
        </h1>
        <p className="mx-auto mb-5 max-w-[330px] text-[14px] sm:mb-8 sm:text-[15px] leading-relaxed text-[#121312]/55">
          {t.successRedirect}
        </p>
        <a
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#121312]/55 hover:text-[#121312] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {t.goToSignIn}
        </a>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="mb-2 text-[clamp(26px,7.5vw,46px)] font-semibold leading-[1.08] tracking-tight text-[#121312] sm:mb-3">
        {t.title}
      </h1>
      <p className="mx-auto mb-5 max-w-[330px] text-[14px] sm:mb-8 sm:text-[15px] leading-relaxed text-[#121312]/55">
        {t.subtitle}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 text-left">
        <div>
          <label htmlFor="reset_password" className="mb-2 block text-sm font-semibold text-[#121312]/70">
            {t.newPassword}
          </label>
          <div className="relative">
            <input
              id="reset_password"
              type={showPassword ? "text" : "password"}
              placeholder={common.passwordPlaceholder}
              autoComplete="new-password"
              className="flex h-12 w-full rounded-md border border-[#121312]/15 bg-white px-3.5 pr-11 text-base font-medium text-[#121312] transition-colors placeholder:text-[#121312]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#121312]/40 hover:text-[#121312]/60 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2 rounded-lg bg-[#121312]/[0.03] px-3.5 py-3">
          <p className="text-xs font-semibold text-[#121312]/50">{t.passwordMustHave}</p>
          {passwordRules.map((rule) => {
            const passed = rule.test(passwordValue);
            return (
              <div key={rule.label} className="flex items-center gap-2 text-sm">
                <span
                  className={`grid h-4 w-4 place-items-center rounded-full transition-all duration-200 ${
                    passed ? "bg-emerald-500 text-white" : "border border-[#121312]/20 text-transparent"
                  }`}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className={`transition-colors duration-200 ${passed ? "text-emerald-600" : "text-[#121312]/50"}`}>
                  {rule.label}
                </span>
              </div>
            );
          })}
        </div>

        <div>
          <label htmlFor="reset_confirm" className="mb-2 block text-sm font-semibold text-[#121312]/70">
            {t.confirmPassword}
          </label>
          <div className="relative">
            <input
              id="reset_confirm"
              type={showConfirm ? "text" : "password"}
              placeholder={t.confirmPassword}
              autoComplete="new-password"
              className="flex h-12 w-full rounded-md border border-[#121312]/15 bg-white px-3.5 pr-11 text-base font-medium text-[#121312] transition-colors placeholder:text-[#121312]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#121312]/40 hover:text-[#121312]/60 transition-colors"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {apiError && (
          <div className="rounded-lg bg-red-50 px-3.5 py-3 text-sm text-red-600">{apiError}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#121312]/90 active:scale-[0.98] disabled:opacity-50"
        >
          {isSubmitting ? t.submitting : t.submit}
        </button>
      </form>
    </div>
  );
}

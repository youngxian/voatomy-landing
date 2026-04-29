"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../auth-page";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "At least 1 uppercase letter")
      .regex(/[0-9]/, "At least 1 number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "At least 1 special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordValues = z.infer<typeof passwordSchema>;

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "At least 1 uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "At least 1 number", test: (v: string) => /[0-9]/.test(v) },
  { label: "At least 1 special character", test: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v) },
];

export function PasswordStep() {
  const { setStep, updateFormData, formData } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
  });

  const passwordValue = watch("password", "");

  const onSubmit = (data: PasswordValues) => {
    updateFormData({ password: data.password });
    setStep("verify-email");
  };

  return (
    <div className="text-center">
      {/* Back button */}
      <button
        onClick={() => setStep("signup")}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#121312]/55 hover:text-[#121312] transition-colors cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>

      <h1 className="mb-3 text-[46px] font-semibold leading-[1.04] tracking-tight text-[#121312]">
        Create a password
      </h1>
      <p className="mx-auto mb-8 max-w-[330px] text-[15px] leading-relaxed text-[#121312]/55">
        Choose a strong password for{" "}
        <span className="font-medium text-[#121312]/70">{formData.email || "your account"}</span>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 text-left">
        {/* Password */}
        <div>
          <label htmlFor="pw_password" className="mb-2 block text-sm font-semibold text-[#121312]/70">
            Password
          </label>
          <div className="relative">
            <input
              id="pw_password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
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

        {/* Password strength indicators */}
        <div className="space-y-2 rounded-lg bg-[#121312]/[0.03] px-3.5 py-3">
          <p className="text-xs font-semibold text-[#121312]/50">Password must have:</p>
          {PASSWORD_RULES.map((rule) => {
            const passed = rule.test(passwordValue);
            return (
              <div key={rule.label} className="flex items-center gap-2 text-sm">
                <span
                  className={`grid h-4 w-4 place-items-center rounded-full transition-all duration-200 ${
                    passed
                      ? "bg-emerald-500 text-white"
                      : "border border-[#121312]/20 text-transparent"
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

        {/* Confirm password */}
        <div>
          <label htmlFor="pw_confirm" className="mb-2 block text-sm font-semibold text-[#121312]/70">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="pw_confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#121312]/90 active:scale-[0.98] disabled:opacity-50"
        >
          Continue
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </form>
    </div>
  );
}

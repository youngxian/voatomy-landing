"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { setPassword, APIError } from "@/lib/api";

interface SetPasswordPopupProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "At least 1 uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "At least 1 number", test: (v: string) => /[0-9]/.test(v) },
];

export function SetPasswordPopup({ open, onClose, onSuccess }: SetPasswordPopupProps) {
  const [password, setPasswordVal] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [showCloseHint, setShowCloseHint] = React.useState(false);

  const allRulesPassed = PASSWORD_RULES.every((r) => r.test(password));
  const passwordsMatch = password === confirm && confirm.length > 0;
  const canSubmit = allRulesPassed && passwordsMatch && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);

    try {
      await setPassword({
        password,
        confirm_password: confirm,
        remember_me: rememberMe,
      });
      onSuccess();
    } catch (err) {
      const msg = err instanceof APIError ? err.message : "Failed to set password";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (password.length > 0 && !showCloseHint) {
      setShowCloseHint(true);
      return;
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            className="mx-4 w-full max-w-md rounded-2xl border border-[#121312]/10 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#121312]/8 px-6 py-4">
              <h2 className="text-base font-bold text-[#121312]">Set your password</h2>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#121312]/40 transition-colors hover:bg-[#121312]/5 hover:text-[#121312]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Close hint */}
              <AnimatePresence>
                {showCloseHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-xs text-blue-700"
                  >
                    You can always set a password later in your profile settings.
                    <button
                      type="button"
                      onClick={onClose}
                      className="ml-2 font-semibold underline"
                    >
                      Close anyway
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password */}
              <div>
                <label htmlFor="set_pw" className="mb-1.5 block text-sm font-semibold text-[#121312]/70">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="set_pw"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPasswordVal(e.target.value); setShowCloseHint(false); }}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="flex h-12 w-full rounded-xl border border-[#121312]/12 bg-white px-4 pr-11 text-base font-medium text-[#121312] placeholder:text-[#121312]/35 outline-none transition-all focus:border-brand/40 focus:ring-2 focus:ring-brand/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#121312]/40 hover:text-[#121312]/60"
                    aria-label={showPassword ? "Hide" : "Show"}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Strength indicators */}
              <div className="space-y-1.5 rounded-lg bg-[#121312]/[0.03] px-3.5 py-3">
                <p className="text-[11px] font-semibold text-[#121312]/50">Password must have:</p>
                {PASSWORD_RULES.map((rule) => {
                  const passed = rule.test(password);
                  return (
                    <div key={rule.label} className="flex items-center gap-2 text-xs">
                      <span className={cn(
                        "grid h-3.5 w-3.5 place-items-center rounded-full transition-all",
                        passed ? "bg-emerald-500 text-white" : "border border-[#121312]/20",
                      )}>
                        {passed && (
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        )}
                      </span>
                      <span className={passed ? "text-emerald-600" : "text-[#121312]/50"}>
                        {rule.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Confirm */}
              <div>
                <label htmlFor="set_pw_confirm" className="mb-1.5 block text-sm font-semibold text-[#121312]/70">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="set_pw_confirm"
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className={cn(
                      "flex h-12 w-full rounded-xl border bg-white px-4 pr-11 text-base font-medium text-[#121312] placeholder:text-[#121312]/35 outline-none transition-all focus:ring-2 focus:ring-brand/10",
                      confirm.length > 0 && !passwordsMatch
                        ? "border-red-300 focus:border-red-400"
                        : "border-[#121312]/12 focus:border-brand/40",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#121312]/40 hover:text-[#121312]/60"
                  >
                    {showConfirm ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
                {confirm.length > 0 && !passwordsMatch && (
                  <p className="mt-1 text-xs text-red-500">Passwords don&apos;t match</p>
                )}
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#121312]/20 text-brand focus:ring-brand/30"
                />
                <span className="text-sm text-[#121312]/60">Remember me on this device</span>
              </label>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={cn(
                  "flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all",
                  canSubmit
                    ? "bg-[#121312] text-white hover:bg-[#121312]/90 active:scale-[0.98]"
                    : "bg-[#121312]/8 text-[#121312]/35 cursor-not-allowed",
                )}
              >
                {submitting ? "Setting password…" : "Set password"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

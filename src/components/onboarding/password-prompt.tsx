"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dismissPasswordPrompt } from "@/lib/api";

interface PasswordPromptProps {
  open: boolean;
  onSetPassword: () => void;
  onDismiss: () => void;
}

export function PasswordPrompt({ open, onSetPassword, onDismiss }: PasswordPromptProps) {
  const [dontRemind, setDontRemind] = React.useState(false);

  const handleKeepUsingLink = async () => {
    if (dontRemind) {
      try {
        await dismissPasswordPrompt();
      } catch {
        // best-effort
      }
    }
    onDismiss();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            className="mx-4 w-full max-w-md rounded-2xl border border-[#121312]/10 bg-white p-7 shadow-2xl"
          >
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#121312" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#121312]">Want to set a password?</h2>
              <p className="mt-2 text-sm text-[#121312]/50">
                You can set a password for quick sign-in, or keep using magic links — both are secure.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={onSetPassword}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all hover:bg-[#121312]/90 active:scale-[0.98]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Set a password
              </button>

              <button
                type="button"
                onClick={handleKeepUsingLink}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#121312]/12 text-sm font-medium text-[#121312]/60 transition-all hover:bg-[#121312]/5"
              >
                Keep using magic links
              </button>
            </div>

            <label className="mt-5 flex cursor-pointer items-center justify-center gap-2.5">
              <input
                type="checkbox"
                checked={dontRemind}
                onChange={(e) => setDontRemind(e.target.checked)}
                className="h-4 w-4 rounded border-[#121312]/20 text-brand focus:ring-brand/30"
              />
              <span className="text-xs text-[#121312]/45">Don&apos;t remind me again</span>
            </label>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

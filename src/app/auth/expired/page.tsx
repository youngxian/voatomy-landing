"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resendMagicLink, APIError } from "@/lib/api";

export default function ExpiredLinkPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialEmail = searchParams.get("email") ?? "";
  const [email, setEmail] = React.useState(initialEmail);
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleResend = async () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setSending(true);
    setError(null);
    try {
      await resendMagicLink(email);
      setSent(true);
    } catch (err) {
      const msg = err instanceof APIError ? err.message : "Failed to send link";
      setError(msg);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="mx-4 max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#121312]">New link sent!</h1>
          <p className="mt-2 text-sm text-[#121312]/50">
            Check <span className="font-medium text-[#121312]/70">{email}</span> for a new sign-in link. It expires in 15 minutes.
          </p>
          <button
            onClick={() => router.push("/auth/login")}
            className="mt-6 text-sm font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer"
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="mx-4 w-full max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#121312]">Link expired</h1>
        <p className="mt-2 mb-6 text-sm text-[#121312]/50">
          Your sign-in link has expired. Enter your email below to get a new one.
        </p>

        <div className="space-y-3 text-left">
          <div>
            <label htmlFor="expired_email" className="mb-2 block text-sm font-semibold text-[#121312]/70">
              Work email
            </label>
            <input
              id="expired_email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@yourcompany.com"
              className="flex h-12 w-full rounded-md border border-[#121312]/15 bg-white px-3.5 text-base font-medium text-[#121312] placeholder:text-[#121312]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand transition-colors"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            onClick={handleResend}
            disabled={sending}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all hover:bg-[#121312]/90 active:scale-[0.98] disabled:opacity-50"
          >
            {sending ? "Sending…" : "Send new link"}
          </button>
        </div>

        <button
          onClick={() => router.push("/auth/login")}
          className="mt-4 text-sm font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer"
        >
          Back to sign in
        </button>
      </div>
    </div>
  );
}

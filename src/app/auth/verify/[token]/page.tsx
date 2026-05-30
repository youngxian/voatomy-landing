"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { APIError } from "@/lib/api";
import { resolvePostAuthDestinationAsync } from "@/lib/auth-redirect";
import { verifyMagicLinkOnce } from "@/lib/verify-magic-link-once";
import { AUTH_REDIRECT_KEY } from "@/components/auth/auth-page";
import { useDictionary } from "@/i18n/locale-provider";

const API_BASE =
  process.env.NEXT_PUBLIC_ONBOARDING_API_URL ?? "http://localhost:8081/v1";

async function startTrialIfPending(): Promise<void> {
  try {
    const raw = localStorage.getItem("voatomy_trial_intent");
    if (!raw) return;
    const { plan } = JSON.parse(raw) as { plan: string };
    localStorage.removeItem("voatomy_trial_intent");
    if (plan !== "pro" && plan !== "business") return;

    await fetch(`${API_BASE}/billing/start-trial`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan_tier: plan }),
    });
  } catch {
    // Non-blocking -- user proceeds to onboarding on Starter if trial start fails
  }
}

type Status = "loading" | "success" | "expired" | "error";

export default function VerifyMagicLinkPage() {
  const dict = useDictionary();
  const common = dict.auth.common;
  const p = dict.auth.pages;

  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [status, setStatus] = React.useState<Status>("loading");
  const [email, setEmail] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const completeLogin = React.useCallback(async (sessionToken?: string) => {
    await startTrialIfPending();
    setStatus("success");
    const storedRedirect = localStorage.getItem(AUTH_REDIRECT_KEY);
    if (storedRedirect) localStorage.removeItem(AUTH_REDIRECT_KEY);
    const destination = await resolvePostAuthDestinationAsync(sessionToken, storedRedirect);
    setTimeout(() => {
      window.location.href = destination;
    }, 1500);
  }, []);

  React.useEffect(() => {
    if (!token) return;

    let cancelled = false;

    verifyMagicLinkOnce(token)
      .then(async (result) => {
        if (cancelled) return;
        if (result.valid) {
          await completeLogin(result.session_token);
        } else if (result.expired) {
          setEmail(result.email ?? "");
          setStatus("expired");
        } else {
          setStatus("error");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof APIError) {
          if (err.code === "magic_link_expired") {
            setStatus("expired");
          } else if (err.code === "token_used") {
            setErrorMsg(p.tokenAlreadyUsed);
            setStatus("error");
          } else if (err.code === "not_found") {
            setErrorMsg(p.signInLinkInvalid);
            setStatus("error");
          } else {
            setErrorMsg(err.message);
            setStatus("error");
          }
        } else {
          setErrorMsg(common.serverUnreachable);
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token, completeLogin, p.tokenAlreadyUsed, p.signInLinkInvalid, common.serverUnreachable]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#121312]/10 border-t-brand" />
          <p className="text-sm text-[#121312]/50">{p.verifyingLink}</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#121312]">{p.youreIn}</h1>
          <p className="mt-2 text-sm text-[#121312]/50">{p.redirectingDashboard}</p>
        </div>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="mx-4 max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#121312]">{p.linkExpired}</h1>
          <p className="mt-2 text-sm text-[#121312]/50">{p.linkExpiredVerify}</p>
          <button
            onClick={() => router.push(`/auth/expired${email ? `?email=${encodeURIComponent(email)}` : ""}`)}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all hover:bg-[#121312]/90 active:scale-[0.98]"
          >
            {p.requestNewLink}
          </button>
          <button
            onClick={() => router.push("/auth/login")}
            className="mt-3 text-sm font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer"
          >
            {common.backToSignIn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="mx-4 max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#121312]">{p.invalidLink}</h1>
        <p className="mt-2 text-sm text-[#121312]/50">
          {errorMsg || p.linkNoLongerValid}
        </p>
        <button
          onClick={() => router.push("/auth/login")}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all hover:bg-[#121312]/90 active:scale-[0.98]"
        >
          {common.backToSignIn}
        </button>
      </div>
    </div>
  );
}

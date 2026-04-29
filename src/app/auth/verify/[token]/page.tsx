"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { verifyMagicLink, APIError } from "@/lib/api";
import { AUTH_REDIRECT_KEY } from "@/components/auth/auth-page";

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
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [status, setStatus] = React.useState<Status>("loading");
  const [email, setEmail] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const verifiedRef = React.useRef(false);

  React.useEffect(() => {
    if (!token || verifiedRef.current) return;
    verifiedRef.current = true;

    verifyMagicLink(token)
      .then(async (result) => {
        if (result.valid) {
          if (result.session_token) {
            document.cookie = `session=${result.session_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
          }
          await startTrialIfPending();
          setStatus("success");
          const storedRedirect = localStorage.getItem(AUTH_REDIRECT_KEY);
          const destination = storedRedirect || "http://localhost:3000/dashboard";
          if (storedRedirect) localStorage.removeItem(AUTH_REDIRECT_KEY);
          setTimeout(() => {
            window.location.href = destination;
          }, 1500);
        } else if (result.expired) {
          setEmail(result.email ?? "");
          setStatus("expired");
        } else {
          setStatus("error");
        }
      })
      .catch((err) => {
        if (err instanceof APIError) {
          if (err.code === "magic_link_expired") {
            setStatus("expired");
          } else if (err.code === "token_used") {
            setErrorMsg("This link has already been used. Please request a new one.");
            setStatus("error");
          } else {
            setErrorMsg(err.message);
            setStatus("error");
          }
        } else {
          setErrorMsg("Something went wrong.");
          setStatus("error");
        }
      });
  }, [token, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#121312]/10 border-t-brand" />
          <p className="text-sm text-[#121312]/50">Verifying your link…</p>
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
          <h1 className="text-2xl font-bold text-[#121312]">You&apos;re in!</h1>
          <p className="mt-2 text-sm text-[#121312]/50">Redirecting to your dashboard…</p>
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
          <h1 className="text-2xl font-bold text-[#121312]">Link expired</h1>
          <p className="mt-2 text-sm text-[#121312]/50">
            This sign-in link has expired. Links are valid for 15 minutes.
          </p>
          <button
            onClick={() => router.push(`/auth/expired${email ? `?email=${encodeURIComponent(email)}` : ""}`)}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all hover:bg-[#121312]/90 active:scale-[0.98]"
          >
            Request a new link
          </button>
          <button
            onClick={() => router.push("/auth/login")}
            className="mt-3 text-sm font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer"
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  // Error state
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
        <h1 className="text-2xl font-bold text-[#121312]">Invalid link</h1>
        <p className="mt-2 text-sm text-[#121312]/50">
          {errorMsg || "This link is no longer valid."}
        </p>
        <button
          onClick={() => router.push("/auth/login")}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all hover:bg-[#121312]/90 active:scale-[0.98]"
        >
          Back to sign in
        </button>
      </div>
    </div>
  );
}

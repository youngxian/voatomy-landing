"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AUTH_REDIRECT_KEY } from "@/components/auth/auth-page";

type Status = "loading" | "success" | "error";

export default function SSOCompletePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = React.useState<Status>("loading");
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    if (!token) {
      setErrorMsg("No authentication token was provided.");
      setStatus("error");
      return;
    }

    document.cookie = `session=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    setStatus("success");

    const storedRedirect = localStorage.getItem(AUTH_REDIRECT_KEY);
    if (storedRedirect) localStorage.removeItem(AUTH_REDIRECT_KEY);
    const destination = storedRedirect || "http://localhost:3000/dashboard";
    setTimeout(() => {
      window.location.href = destination;
    }, 1500);
  }, [token]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#121312]/10 border-t-brand" />
          <p className="text-sm text-[#121312]/50">Signing you in…</p>
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
        <h1 className="text-2xl font-bold text-[#121312]">Sign-in failed</h1>
        <p className="mt-2 text-sm text-[#121312]/50">
          {errorMsg || "Something went wrong during SSO authentication."}
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

"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function AuthSessionInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    const token = searchParams.get("token")?.trim();
    const next = searchParams.get("next")?.trim() || "/onboard";

    if (!token) {
      setErrorMsg("No sign-in token was provided.");
      return;
    }

    const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/onboard";
    document.cookie = `session=${encodeURIComponent(token)}; path=/; max-age=${SESSION_MAX_AGE}; SameSite=Lax`;
    router.replace(safeNext);
  }, [searchParams, router]);

  if (errorMsg) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="max-w-sm text-center">
          <h1 className="text-xl font-bold text-[#121312]">Sign-in failed</h1>
          <p className="mt-2 text-sm text-[#121312]/50">{errorMsg}</p>
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#121312] text-sm font-semibold text-white"
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <p className="text-sm text-[#121312]/50">Signing you in…</p>
    </div>
  );
}

export default function AuthSessionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <p className="text-sm text-[#121312]/50">Signing you in…</p>
        </div>
      }
    >
      <AuthSessionInner />
    </Suspense>
  );
}

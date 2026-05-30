"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDictionary } from "@/i18n/locale-provider";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function AuthSessionInner() {
  const dict = useDictionary();
  const common = dict.auth.common;
  const p = dict.auth.pages;

  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    const token = searchParams.get("token")?.trim();
    const next = searchParams.get("next")?.trim() || "/onboard";

    if (!token) {
      setErrorMsg(p.noSignInToken);
      return;
    }

    const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/onboard";
    document.cookie = `session=${encodeURIComponent(token)}; path=/; max-age=${SESSION_MAX_AGE}; SameSite=Lax`;
    router.replace(safeNext);
  }, [searchParams, router, p.noSignInToken]);

  if (errorMsg) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="max-w-sm text-center">
          <h1 className="text-xl font-bold text-[#121312]">{p.signInFailed}</h1>
          <p className="mt-2 text-sm text-[#121312]/50">{errorMsg}</p>
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#121312] text-sm font-semibold text-white"
          >
            {common.backToSignIn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <p className="text-sm text-[#121312]/50">{p.signingIn}</p>
    </div>
  );
}

function SessionFallback() {
  const dict = useDictionary();
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <p className="text-sm text-[#121312]/50">{dict.auth.pages.signingIn}</p>
    </div>
  );
}

export default function AuthSessionPage() {
  return (
    <Suspense fallback={<SessionFallback />}>
      <AuthSessionInner />
    </Suspense>
  );
}

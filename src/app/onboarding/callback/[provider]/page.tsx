"use client";

import * as React from "react";
import { useSearchParams, useParams } from "next/navigation";

/**
 * OAuth callback landing page.
 *
 * When the provider redirects back (e.g. /onboarding/callback/github?code=xxx&state=yyy),
 * this page just sits in the popup window long enough for the parent window's polling
 * loop (in openOAuthPopup) to read the code and state from the URL, then closes itself.
 *
 * If the popup was somehow opened directly (not from the onboarding flow), we show a
 * friendly message and auto-close after a short delay.
 */
export default function OAuthCallbackPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const provider = params.provider as string;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  React.useEffect(() => {
    if (code && window.opener) {
      // The parent window's interval will pick up the code from our URL.
      // Give it a moment, then self-close as a fallback.
      const timer = setTimeout(() => window.close(), 2000);
      return () => clearTimeout(timer);
    }
  }, [code]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-lg font-bold text-[#121312]">Connection failed</h1>
          <p className="mt-2 text-sm text-[#121312]/50">
            {provider} returned an error: {error}
          </p>
          <p className="mt-4 text-xs text-[#121312]/30">You can close this window and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12">
          <span className="text-2xl">🔗</span>
        </div>
        <h1 className="text-lg font-bold text-[#121312]">
          {code ? "Connected!" : "Connecting…"}
        </h1>
        <p className="mt-2 text-sm text-[#121312]/50">
          {code
            ? "This window will close automatically."
            : `Waiting for ${provider} to authorize…`}
        </p>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getInvitationDetails,
  acceptInvitation,
  APIError,
  type InvitationDetails,
} from "@/lib/api";

type Status = "loading" | "ready" | "accepting" | "success" | "expired" | "already_accepted" | "error";

export default function InviteAcceptPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [status, setStatus] = React.useState<Status>("loading");
  const [details, setDetails] = React.useState<InvitationDetails | null>(null);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    if (!token) return;

    getInvitationDetails(token)
      .then((data) => {
        setDetails(data);
        if (data.status === "accepted") {
          setStatus("already_accepted");
        } else if (data.status === "expired" || new Date(data.expires_at) < new Date()) {
          setStatus("expired");
        } else {
          setStatus("ready");
        }
      })
      .catch((err) => {
        if (err instanceof APIError) {
          if (err.code === "token_expired") {
            setStatus("expired");
          } else {
            setErrorMsg(err.message);
            setStatus("error");
          }
        } else {
          setErrorMsg("Something went wrong.");
          setStatus("error");
        }
      });
  }, [token]);

  const handleAccept = async () => {
    setStatus("accepting");
    try {
      const result = await acceptInvitation(token);
      if (result.session_token) {
        document.cookie = `session=${result.session_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      }
      setStatus("success");
      const ATLAS_APP_URL = process.env.NEXT_PUBLIC_ATLAS_APP_URL || "http://localhost:3000";
      setTimeout(() => {
        const dest = result.redirect_url || (result.is_new_user ? "/onboard" : "/dashboard");
        if (dest.startsWith("http")) {
          window.location.href = dest;
        } else if (dest === "/onboard") {
          router.push(dest);
        } else {
          window.location.href = `${ATLAS_APP_URL}${dest}`;
        }
      }, 1500);
    } catch (err) {
      if (err instanceof APIError) {
        if (err.code === "token_expired") {
          setStatus("expired");
        } else {
          setErrorMsg(err.message);
          setStatus("error");
        }
      } else {
        setErrorMsg("Something went wrong. Please try again.");
        setStatus("error");
      }
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#121312]/10 border-t-brand" />
          <p className="text-sm text-[#121312]/50">Loading invitation…</p>
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
          <p className="mt-2 text-sm text-[#121312]/50">
            Welcome to {details?.org_name ?? "the team"}. Redirecting…
          </p>
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
          <h1 className="text-2xl font-bold text-[#121312]">Invitation expired</h1>
          <p className="mt-2 text-sm text-[#121312]/50">
            This invitation has expired. Ask your team admin to resend the invite.
          </p>
          <button
            onClick={() => router.push("/auth/login")}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all hover:bg-[#121312]/90 active:scale-[0.98]"
          >
            Go to sign in
          </button>
        </div>
      </div>
    );
  }

  if (status === "already_accepted") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="mx-4 max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#121312]">Already accepted</h1>
          <p className="mt-2 text-sm text-[#121312]/50">
            You&apos;ve already accepted this invitation to {details?.org_name ?? "the team"}.
          </p>
          <button
            onClick={() => router.push("/auth/login")}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all hover:bg-[#121312]/90 active:scale-[0.98]"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  if (status === "error") {
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
          <h1 className="text-2xl font-bold text-[#121312]">Invalid invitation</h1>
          <p className="mt-2 text-sm text-[#121312]/50">
            {errorMsg || "This invitation link is invalid."}
          </p>
          <button
            onClick={() => router.push("/auth/login")}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all hover:bg-[#121312]/90 active:scale-[0.98]"
          >
            Go to sign in
          </button>
        </div>
      </div>
    );
  }

  const expiresAt = details ? new Date(details.expires_at) : null;
  const hoursLeft = expiresAt ? Math.max(0, Math.round((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60))) : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="mx-4 w-full max-w-md">
        <div className="rounded-2xl border border-[#121312]/8 bg-white p-8 shadow-sm">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/12">
              <span className="text-2xl">✉️</span>
            </div>
            <h1 className="text-2xl font-bold text-[#121312]">
              Join {details?.org_name}
            </h1>
            <p className="mt-2 text-sm text-[#121312]/50">
              {details?.inviter_name} invited you to join as{" "}
              <span className="font-medium text-[#121312]/70 capitalize">
                {details?.role}
              </span>
            </p>
          </div>

          <div className="mt-6 space-y-3 rounded-xl bg-[#f9fafb] p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#121312]/50">Organization</span>
              <span className="font-medium text-[#121312]">{details?.org_name}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#121312]/50">Your role</span>
              <span className="font-medium capitalize text-[#121312]">{details?.role}</span>
            </div>
            {details?.team_name && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#121312]/50">Team</span>
                <span className="font-medium text-[#121312]">{details.team_name}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#121312]/50">Invited by</span>
              <span className="font-medium text-[#121312]">{details?.inviter_name}</span>
            </div>
            {hoursLeft !== null && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#121312]/50">Expires in</span>
                <span className="font-medium text-[#121312]">
                  {hoursLeft > 0 ? `${hoursLeft}h` : "< 1h"}
                </span>
              </div>
            )}
          </div>

          <div className="mt-2 text-center text-xs text-[#121312]/35">
            Accepting as <span className="font-medium">{details?.email}</span>
          </div>

          <button
            type="button"
            onClick={handleAccept}
            disabled={status === "accepting"}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-[#121312] shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-60"
          >
            {status === "accepting" ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#121312]/20 border-t-[#121312]" />
                Joining…
              </>
            ) : (
              "Accept & Join"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

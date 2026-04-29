"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Status = "verifying" | "success" | "error";

const API_BASE = process.env.NEXT_PUBLIC_ONBOARDING_API_URL?.replace("/v1", "") ?? "http://localhost:8081";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = React.useState<Status>("verifying");
  const [errorMsg, setErrorMsg] = React.useState("");
  const verified = React.useRef(false);

  React.useEffect(() => {
    if (!sessionId || verified.current) return;
    verified.current = true;

    fetch(`${API_BASE}/v1/billing/verify-session`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then(async (res) => {
        if (res.ok) {
          setStatus("success");
          setTimeout(() => router.push("/onboard"), 2000);
        } else {
          const body = await res.json().catch(() => ({}));
          setErrorMsg(body.message ?? "Could not verify payment.");
          setStatus("error");
        }
      })
      .catch(() => {
        setErrorMsg("Something went wrong. Please try again.");
        setStatus("error");
      });
  }, [sessionId, router]);

  if (status === "verifying") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#121312]/10 border-t-brand" />
          <h1 className="text-lg font-bold text-[#121312]">Confirming payment...</h1>
          <p className="mt-2 text-sm text-[#121312]/50">This will only take a moment.</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="max-w-sm text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50"
          >
            <motion.svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <polyline points="20 6 9 17 4 12" />
            </motion.svg>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-[#121312]"
          >
            Payment successful!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-2 text-sm text-[#121312]/50"
          >
            Your subscription is now active. Redirecting to setup...
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6"
          >
            <div className="mx-auto h-1 w-32 rounded-full bg-[#121312]/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-emerald-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="mx-4 max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#121312]">Payment issue</h1>
        <p className="mt-2 text-sm text-[#121312]/50">
          {errorMsg}
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all hover:bg-[#121312]/90 active:scale-[0.98]"
        >
          Back to dashboard
        </button>
      </div>
    </div>
  );
}

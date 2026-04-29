"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AuthPage } from "@/components/auth/auth-page";

export default function SignupPage() {
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const plan = searchParams.get("plan");
    const trial = searchParams.get("trial");
    if (trial === "true" && (plan === "pro" || plan === "business")) {
      localStorage.setItem("voatomy_trial_intent", JSON.stringify({ plan }));
    }
  }, [searchParams]);

  return <AuthPage initialStep="signup" />;
}

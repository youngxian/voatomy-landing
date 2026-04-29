"use client";

import { useParams, useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordStep } from "@/components/auth/steps/reset-password-step";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  return (
    <AuthShell>
      <div className="mx-auto w-full max-w-[390px]">
        <ResetPasswordStep
          token={token}
          onSuccess={() => router.push("/auth/login")}
        />
      </div>
    </AuthShell>
  );
}

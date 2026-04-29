"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { AuthShell } from "./auth-shell";
import { SignupStep } from "./steps/signup-step";
import { VerifyEmailStep } from "./steps/verify-email-step";
import { LoginStep } from "./steps/login-step";
import { ForgotPasswordStep } from "./steps/forgot-password-step";
import { ResetPasswordStep } from "./steps/reset-password-step";
import { trackEvent, trackConversion } from "@/lib/analytics";

export type AuthStep =
  | "signup"
  | "verify-email"
  | "login"
  | "forgot-password"
  | "reset-password";

interface AuthContextType {
  step: AuthStep;
  setStep: (step: AuthStep) => void;
  direction: number;
  formData: AuthFormData;
  updateFormData: (data: Partial<AuthFormData>) => void;
}

interface AuthFormData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  resetToken?: string;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthPage");
  return context;
}

const STEP_ORDER: AuthStep[] = [
  "signup",
  "verify-email",
  "login",
  "forgot-password",
  "reset-password",
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
  }),
};

interface AuthPageProps {
  initialStep?: AuthStep;
}

export const AUTH_REDIRECT_KEY = "voatomy_auth_redirect";

export function AuthPage({ initialStep = "signup" }: AuthPageProps) {
  const searchParams = useSearchParams();
  const [step, setStepRaw] = React.useState<AuthStep>(initialStep);
  const [direction, setDirection] = React.useState(0);
  const [formData, setFormData] = React.useState<AuthFormData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  React.useEffect(() => {
    const redirect = searchParams.get("redirect");
    if (redirect) {
      localStorage.setItem(AUTH_REDIRECT_KEY, redirect);
    }
  }, [searchParams]);

  const setStep = React.useCallback(
    (newStep: AuthStep) => {
      const currentIndex = STEP_ORDER.indexOf(step);
      const newIndex = STEP_ORDER.indexOf(newStep);
      setDirection(newIndex >= currentIndex ? 1 : -1);
      setStepRaw(newStep);
      trackEvent("navigation", "auth_step_changed", newStep, newIndex, {
        from: step,
        to: newStep,
      });
      if (newStep === "verify-email") {
        trackConversion("signup_complete", { source: "auth" });
      }
    },
    [step]
  );

  const updateFormData = React.useCallback(
    (data: Partial<AuthFormData>) => {
      setFormData((prev) => ({ ...prev, ...data }));
    },
    []
  );

  const contextValue = React.useMemo(
    () => ({ step, setStep, direction, formData, updateFormData }),
    [step, setStep, direction, formData, updateFormData]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthShell>
        <div className="mx-auto w-full max-w-[390px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 400, damping: 35 },
                opacity: { duration: 0.25 },
                scale: { duration: 0.25 },
              }}
            >
              {step === "signup" && <SignupStep />}
              {step === "verify-email" && <VerifyEmailStep />}
              {step === "login" && <LoginStep />}
              {step === "forgot-password" && <ForgotPasswordStep />}
              {step === "reset-password" && (
                <ResetPasswordStep
                  token={formData.resetToken ?? ""}
                  onSuccess={() => setStep("login")}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </AuthShell>
    </AuthContext.Provider>
  );
}

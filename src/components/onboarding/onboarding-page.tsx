"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  OnboardingProvider,
  useOnboarding,
  slideVariants,
  slideTransition,
} from "./onboarding-context";
import { OnboardingShell } from "./onboarding-shell";
import { WelcomeStep } from "./steps/welcome-step";
import { WorkspaceStep } from "./steps/workspace-step";
import { ConnectStep } from "./steps/connect-step";
import { TeamStep } from "./steps/team-step";
import { ProductsStep } from "./steps/products-step";
import { CustomizeStep } from "./steps/customize-step";
import { LaunchStep } from "./steps/launch-step";
import { PasswordPrompt } from "./password-prompt";
import { SetPasswordPopup } from "./set-password-popup";
import { getPasswordStatus } from "@/lib/api";
import type { OnboardingStep } from "@/types";

function OnboardingStepRenderer() {
  const { step, direction } = useOnboarding();

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={step}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={slideTransition}
        className="pb-8"
      >
        {step === "welcome" && <WelcomeStep />}
        {step === "workspace" && <WorkspaceStep />}
        {step === "connect" && <ConnectStep />}
        {step === "team" && <TeamStep />}
        {step === "products" && <ProductsStep />}
        {step === "customize" && <CustomizeStep />}
        {step === "launch" && <LaunchStep />}
      </motion.div>
    </AnimatePresence>
  );
}

function PasswordPromptGate({ children }: { children: React.ReactNode }) {
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [showSetPassword, setShowSetPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    getPasswordStatus()
      .then((status) => {
        if (status.show_prompt) {
          setShowPrompt(true);
        }
      })
      .catch(() => {
        // If the API is unavailable (dev mode), skip the prompt
      })
      .finally(() => setChecked(true));
  }, []);

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#121312]/10 border-t-brand" />
      </div>
    );
  }

  return (
    <>
      {children}

      <PasswordPrompt
        open={showPrompt && !showSetPassword}
        onSetPassword={() => {
          setShowPrompt(false);
          setShowSetPassword(true);
        }}
        onDismiss={() => setShowPrompt(false)}
      />

      <SetPasswordPopup
        open={showSetPassword}
        onClose={() => setShowSetPassword(false)}
        onSuccess={() => setShowSetPassword(false)}
      />
    </>
  );
}

interface OnboardingPageProps {
  initialStep?: OnboardingStep;
  userData?: { fullName?: string; email?: string };
}

export function OnboardingPage({ initialStep = "welcome", userData }: OnboardingPageProps) {
  return (
    <OnboardingProvider initialStep={initialStep} userData={userData}>
      <PasswordPromptGate>
        <OnboardingShell>
          <OnboardingStepRenderer />
        </OnboardingShell>
      </PasswordPromptGate>
    </OnboardingProvider>
  );
}

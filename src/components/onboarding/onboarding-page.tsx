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
import { CustomizeStep } from "./steps/customize-step";
import { LaunchStep } from "./steps/launch-step";
// Atlas
import { AtlasConnectStep } from "./steps/atlas/atlas-connect-step";
import { AtlasBoardStep } from "./steps/atlas/atlas-board-step";
import { AtlasSprintStep } from "./steps/atlas/atlas-sprint-step";
// Loop
import { LoopConnectStep } from "./steps/loop/loop-connect-step";
import { LoopSignalsStep } from "./steps/loop/loop-signals-step";
// Signal
import { SignalConnectStep } from "./steps/signal/signal-connect-step";
import { SignalCatalogStep } from "./steps/signal/signal-catalog-step";
import { SignalRoutingStep } from "./steps/signal/signal-routing-step";
// Drift
import { DriftConnectStep } from "./steps/drift/drift-connect-step";
import { DriftConfigStep } from "./steps/drift/drift-config-step";
// Phantom
import { PhantomConnectStep } from "./steps/phantom/phantom-connect-step";
import { PhantomConfigStep } from "./steps/phantom/phantom-config-step";
// Nexus
import { NexusConnectStep } from "./steps/nexus/nexus-connect-step";
import { NexusProductsStep } from "./steps/nexus/nexus-products-step";
import { PasswordPrompt } from "./password-prompt";
import { SetPasswordPopup } from "./set-password-popup";
import { getPasswordStatus } from "@/lib/api";
import type { OnboardingStep } from "@/types";

const STEP_COMPONENTS: Partial<Record<OnboardingStep, React.ComponentType>> = {
  welcome:          WelcomeStep,
  workspace:        WorkspaceStep,
  connect:          ConnectStep,
  team:             TeamStep,
  customize:        CustomizeStep,
  launch:           LaunchStep,
  // Atlas
  "atlas-connect":  AtlasConnectStep,
  "atlas-board":    AtlasBoardStep,
  "atlas-sprint":   AtlasSprintStep,
  // Loop
  "loop-connect":   LoopConnectStep,
  "loop-signals":   LoopSignalsStep,
  // Signal
  "signal-connect": SignalConnectStep,
  "signal-catalog": SignalCatalogStep,
  "signal-routing": SignalRoutingStep,
  // Drift
  "drift-connect":  DriftConnectStep,
  "drift-config":   DriftConfigStep,
  // Phantom
  "phantom-connect":PhantomConnectStep,
  "phantom-config": PhantomConfigStep,
  // Nexus
  "nexus-connect":  NexusConnectStep,
  "nexus-products": NexusProductsStep,
};

function OnboardingStepRenderer() {
  const { step, direction } = useOnboarding();
  const StepComponent = STEP_COMPONENTS[step];

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
        {StepComponent ? <StepComponent /> : null}
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

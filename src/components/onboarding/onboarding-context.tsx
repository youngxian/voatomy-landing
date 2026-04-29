"use client";

import * as React from "react";
import type { OnboardingStep, OnboardingFormData, Region } from "@/types";
import { trackOnboardingStep, trackConversion, trackEvent } from "@/lib/analytics";
import {
  fetchGeoLocation,
  startOnboarding,
  getOnboardingStatus,
  saveOnboardingStep,
  skipOnboardingStep,
  completeOnboarding,
  APIError,
} from "@/lib/api";

// ── Step Order ──

const STEP_ORDER: OnboardingStep[] = [
  "welcome",
  "workspace",
  "connect",
  "team",
  "products",
  "customize",
  "launch",
];

// ── Default Form Data ──

const DEFAULT_FORM_DATA: OnboardingFormData = {
  // Welcome
  fullName: "",
  email: "",
  userRole: "",

  // Workspace
  workspaceName: "",
  workspaceSlug: "",
  industry: "",
  companySize: "",
  region: "",
  country: "",
  countryCode: "",
  timezone: "",
  purposes: [],

  // Products
  selectedProducts: [],
  primaryProduct: "",

  // Connect
  connectedIntegrations: [],
  selectedBoardProject: null,

  // Team & Org Structure
  orgStructureType: "functional",
  departments: [],
  teams: [],
  teamName: "",
  userTeamId: null,
  invitees: [],

  // Customize
  dashboardLayout: "standard",
  notificationPrefs: {
    email: true,
    slack: false,
    teams: false,
    inApp: true,
    frequency: "daily",
    slackChannel: "",
    teamsWebhook: "",
  },
  sprintCadence: "",
  aiPreferences: {
    mode: "balanced",
    autoSuggest: true,
    autoAssign: false,
    autoLinkGitActivity: true,
  },
  themePreference: "light",

  // Launch
  setupComplete: false,
  crossProductIds: {
    atlasWorkspaceId: "",
    loopOrgId: "",
    signalTenantId: "",
    driftTeamId: "",
    phantomScanId: "",
    nexusGraphId: "",
  },
};

// ── Context Type ──

interface OnboardingContextType {
  step: OnboardingStep;
  setStep: (step: OnboardingStep) => void;
  goNext: () => void;
  goBack: () => void;
  direction: number;
  formData: OnboardingFormData;
  updateFormData: (data: Partial<OnboardingFormData>) => void;
  completedSteps: OnboardingStep[];
  markStepComplete: (step: OnboardingStep) => void;
  skippedSteps: OnboardingStep[];
  markStepSkipped: (step: OnboardingStep) => void;
  stepOrder: OnboardingStep[];
  currentStepIndex: number;
  totalSteps: number;
  progressPercent: number;
  sessionId: string | null;
  userId: string | null;
  orgId: string | null;
  version: number;
  isLoading: boolean;
  startSession: (data: { full_name: string; email: string; role: string }) => Promise<void>;
  saveStep: (step: OnboardingStep, data: Record<string, unknown>) => Promise<void>;
  skipStepOnServer: (step: OnboardingStep) => Promise<void>;
  finishOnboarding: () => Promise<void>;
}

// ── Context ──

const OnboardingContext = React.createContext<OnboardingContextType | null>(null);

// ── Hook ──

export function useOnboarding() {
  const context = React.useContext(OnboardingContext);
  if (!context) throw new Error("useOnboarding must be used within OnboardingProvider");
  return context;
}

// ── Slide Variants (Framer Motion) ──

export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.98,
  }),
};

export const slideTransition = {
  x: { type: "spring" as const, stiffness: 400, damping: 35 },
  opacity: { duration: 0.2 },
  scale: { duration: 0.2 },
};

// ── Provider ──

interface OnboardingProviderProps {
  children: React.ReactNode;
  initialStep?: OnboardingStep;
  userData?: { fullName?: string; email?: string };
}

export function OnboardingProvider({ children, initialStep = "welcome", userData }: OnboardingProviderProps) {
  const [step, setStepRaw] = React.useState<OnboardingStep>(initialStep);
  const [direction, setDirection] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<OnboardingStep[]>([]);
  const [skippedSteps, setSkippedSteps] = React.useState<OnboardingStep[]>([]);
  const [formData, setFormData] = React.useState<OnboardingFormData>({
    ...DEFAULT_FORM_DATA,
    fullName: userData?.fullName ?? "",
    email: userData?.email ?? "",
  });

  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [orgId, setOrgId] = React.useState<string | null>(null);
  const [version, setVersion] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const stepOrder = STEP_ORDER;
  const currentStepIndex = stepOrder.indexOf(step);
  const totalSteps = stepOrder.length;
  const progressPercent = (currentStepIndex / (totalSteps - 1)) * 100;

  const stepEnteredAt = React.useRef<number>(Date.now());

  // Track initial onboarding start
  React.useEffect(() => {
    trackEvent("onboarding", "onboarding_started", "Onboarding flow initiated", 0, {
      initialStep,
      totalSteps: STEP_ORDER.length,
    });
    trackOnboardingStep("step_entered", initialStep, STEP_ORDER.indexOf(initialStep));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resume existing session on mount
  React.useEffect(() => {
    let cancelled = false;
    getOnboardingStatus()
      .then((status) => {
        if (cancelled) return;
        const { session } = status;
        setSessionId(session.id);
        setUserId(session.user_id);
        setOrgId(session.org_id);
        setVersion(session.version);
        setCompletedSteps(session.completed_steps ?? []);
        setSkippedSteps(session.skipped_steps ?? []);
        if (session.current_step) {
          setStepRaw(session.current_step);
        }
        if (session.form_data && typeof session.form_data === "object") {
          setFormData((prev) => ({ ...prev, ...(session.form_data as Partial<OnboardingFormData>) }));
        }
      })
      .catch(() => {
        // 404 = no existing session, stay on welcome
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  // Auto-detect country/region from IP
  React.useEffect(() => {
    fetchGeoLocation().then((geo) => {
      if (geo) {
        setFormData((prev) => ({
          ...prev,
          country: prev.country || geo.country,
          countryCode: prev.countryCode || geo.country_code,
          region: prev.region || (geo.region as Region),
          timezone: prev.timezone || geo.timezone,
        }));
      }
    });
  }, []);

  const setStep = React.useCallback(
    (newStep: OnboardingStep) => {
      const ci = STEP_ORDER.indexOf(step);
      const ni = STEP_ORDER.indexOf(newStep);
      const timeOnStep = Date.now() - stepEnteredAt.current;
      trackOnboardingStep("step_entered", newStep, ni, {
        previousStep: step,
        previousStepIndex: ci,
        timeOnPreviousStepMs: timeOnStep,
        direction: ni >= ci ? "forward" : "backward",
      });
      stepEnteredAt.current = Date.now();
      setDirection(ni >= ci ? 1 : -1);
      setStepRaw(newStep);
    },
    [step],
  );

  const goNext = React.useCallback(() => {
    const ci = STEP_ORDER.indexOf(step);
    if (ci < STEP_ORDER.length - 1) {
      const nextStep = STEP_ORDER[ci + 1];
      const timeOnStep = Date.now() - stepEnteredAt.current;
      trackOnboardingStep("step_completed", step, ci, {
        timeOnStepMs: timeOnStep,
        nextStep,
      });
      stepEnteredAt.current = Date.now();
      trackOnboardingStep("step_entered", nextStep, ci + 1, {
        previousStep: step,
        direction: "forward",
      });
      setDirection(1);
      setStepRaw(nextStep);
    }
  }, [step]);

  const goBack = React.useCallback(() => {
    const ci = STEP_ORDER.indexOf(step);
    if (ci > 0) {
      const prevStep = STEP_ORDER[ci - 1];
      const timeOnStep = Date.now() - stepEnteredAt.current;
      trackOnboardingStep("step_abandoned", step, ci, {
        timeOnStepMs: timeOnStep,
        reason: "went_back",
        goingTo: prevStep,
      });
      stepEnteredAt.current = Date.now();
      trackOnboardingStep("step_entered", prevStep, ci - 1, {
        previousStep: step,
        direction: "backward",
      });
      setDirection(-1);
      setStepRaw(prevStep);
    }
  }, [step]);

  const updateFormData = React.useCallback((data: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    // Log which fields changed (keys only, no PII)
    trackOnboardingStep("field_changed", step, STEP_ORDER.indexOf(step), {
      fieldsUpdated: Object.keys(data),
    });
  }, [step]);

  const markStepComplete = React.useCallback((s: OnboardingStep) => {
    setCompletedSteps((prev) => {
      if (prev.includes(s)) return prev;
      const updated = [...prev, s];
      trackOnboardingStep("step_completed", s, STEP_ORDER.indexOf(s), {
        totalCompleted: updated.length,
        totalSteps: STEP_ORDER.length,
        progressPercent: Math.round((updated.length / STEP_ORDER.length) * 100),
      });
      // Track onboarding completion
      if (s === "launch") {
        trackConversion("onboarding_complete", {
          totalSteps: STEP_ORDER.length,
          completedSteps: updated.length,
        });
      }
      return updated;
    });
  }, []);

  const markStepSkipped = React.useCallback((s: OnboardingStep) => {
    setSkippedSteps((prev) => {
      if (prev.includes(s)) return prev;
      trackOnboardingStep("step_skipped", s, STEP_ORDER.indexOf(s));
      return [...prev, s];
    });
  }, []);

  const startSession = React.useCallback(async (data: { full_name: string; email: string; role: string }) => {
    const session = await startOnboarding(data);
    setSessionId(session.id);
    setUserId(session.user_id);
    setOrgId(session.org_id);
    setVersion(session.version);
  }, []);

  const saveStep = React.useCallback(async (s: OnboardingStep, data: Record<string, unknown>) => {
    const session = await saveOnboardingStep(s, data, version);
    setVersion(session.version);
  }, [version]);

  const skipStepOnServer = React.useCallback(async (s: OnboardingStep) => {
    const session = await skipOnboardingStep(s);
    setVersion(session.version);
  }, []);

  const finishOnboarding = React.useCallback(async () => {
    const session = await completeOnboarding();
    setVersion(session.version);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      step,
      setStep,
      goNext,
      goBack,
      direction,
      formData,
      updateFormData,
      completedSteps,
      markStepComplete,
      skippedSteps,
      markStepSkipped,
      stepOrder,
      currentStepIndex,
      totalSteps,
      progressPercent,
      sessionId,
      userId,
      orgId,
      version,
      isLoading,
      startSession,
      saveStep,
      skipStepOnServer,
      finishOnboarding,
    }),
    [step, setStep, goNext, goBack, direction, formData, updateFormData, completedSteps, markStepComplete, skippedSteps, markStepSkipped, stepOrder, currentStepIndex, totalSteps, progressPercent, sessionId, userId, orgId, version, isLoading, startSession, saveStep, skipStepOnServer, finishOnboarding],
  );

  return <OnboardingContext.Provider value={contextValue}>{children}</OnboardingContext.Provider>;
}

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../onboarding-context";
import { PRODUCT_CARDS, LOADING_TIPS } from "@/lib/constants";
import { trackConversion, trackEvent } from "@/lib/analytics";
import { useSubscriptionProducts } from "@/hooks/use-subscription-products";
import { provisionProducts, getProducts, getSprintStatus } from "@/lib/api";
import type { CrossProductIds, SprintStatusResponse } from "@/types";

type Phase = "analyzing" | "ready";

const ANALYSIS_STEPS = [
  { label: "Initializing workspace…", duration: 1200 },
  { label: "Provisioning team structure…", duration: 1400 },
  { label: "Configuring products…", duration: 1500 },
  { label: "Connecting integrations…", duration: 1800 },
  { label: "Setting up AI engine…", duration: 2000 },
  { label: "Generating dashboard…", duration: 1500 },
  { label: "Finalizing setup…", duration: 800 },
];

export function LaunchStep() {
  const { goBack, updateFormData, formData, markStepComplete, finishOnboarding } = useOnboarding();
  const { products: subscribedProducts, primaryProduct: derivedPrimaryProduct } = useSubscriptionProducts();
  const [phase, setPhase] = React.useState<Phase>("analyzing");
  const [currentAnalysisStep, setCurrentAnalysisStep] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [tipIndex, setTipIndex] = React.useState(0);
  const [provisionError, setProvisionError] = React.useState<string | null>(null);
  const [sprintStatus, setSprintStatus] = React.useState<SprintStatusResponse | null>(null);
  const provisionStarted = React.useRef(false);

  React.useEffect(() => {
    if (phase !== "analyzing" || provisionStarted.current) return;
    provisionStarted.current = true;

    let stepIdx = 0;
    let elapsed = 0;
    const totalDuration = ANALYSIS_STEPS.reduce((s, a) => s + a.duration, 0);

    const animationInterval = setInterval(() => {
      elapsed += 100;
      setProgress((prev) => Math.min(prev, 90, (elapsed / totalDuration) * 90));

      let cumulative = 0;
      for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
        cumulative += ANALYSIS_STEPS[i].duration;
        if (elapsed < cumulative) {
          stepIdx = i;
          break;
        }
        if (i === ANALYSIS_STEPS.length - 1) stepIdx = i;
      }
      setCurrentAnalysisStep(stepIdx);
    }, 100);

    (async () => {
      try {
        await finishOnboarding();
        setProgress(40);
        setCurrentAnalysisStep(2);

        await provisionProducts();
        setProgress(60);
        setCurrentAnalysisStep(4);

        let result = await getProducts();
        let polls = 0;
        while (result.status !== "completed" && result.status !== "failed" && polls < 30) {
          await new Promise((r) => setTimeout(r, 1000));
          result = await getProducts();
          polls++;
          setProgress(Math.min(60 + polls * 2, 95));
        }

        clearInterval(animationInterval);

        if (result.status === "failed") {
          setProvisionError(result.errors?.join(", ") ?? "Provisioning failed");
          return;
        }

        const crossProductIds: CrossProductIds = result.cross_product_ids ?? {
          atlasWorkspaceId: "",
          loopOrgId: "",
          signalTenantId: "",
          driftTeamId: "",
          phantomScanId: "",
          nexusGraphId: "",
        };

        setProgress(100);
        setCurrentAnalysisStep(ANALYSIS_STEPS.length - 1);

        updateFormData({
          setupComplete: true,
          crossProductIds,
        });
        markStepComplete("launch");
        trackConversion("onboarding_complete", {
          workspace: formData.workspaceName,
          industry: formData.industry,
          companySize: formData.companySize,
          region: formData.region,
          productsCount: subscribedProducts.length,
          integrationsCount: formData.connectedIntegrations.length,
          teamsCount: formData.teams.length,
          inviteesCount: formData.invitees.length,
          orgStructure: formData.orgStructureType,
        });
        setTimeout(() => setPhase("ready"), 400);
      } catch (err) {
        clearInterval(animationInterval);
        const msg = err instanceof Error ? err.message : "Setup failed";
        setProvisionError(msg);
      }
    })();

    return () => clearInterval(animationInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Tip rotation
  React.useEffect(() => {
    if (phase !== "analyzing") return;
    const interval = setInterval(() => setTipIndex((i) => (i + 1) % LOADING_TIPS.length), 4000);
    return () => clearInterval(interval);
  }, [phase]);

  // Poll sprint status from atlas-service once provisioning is done
  React.useEffect(() => {
    if (phase !== "ready" || !formData.selectedBoardProject || !formData.crossProductIds.atlasWorkspaceId) return;
    let cancelled = false;
    const orgId = formData.crossProductIds.atlasWorkspaceId;
    const poll = async () => {
      while (!cancelled) {
        try {
          const result = await getSprintStatus(orgId);
          if (!cancelled) setSprintStatus(result);
          if (result.status === "ready" || result.status === "error") break;
        } catch {
          break;
        }
        await new Promise((r) => setTimeout(r, 2000));
      }
    };
    poll();
    return () => { cancelled = true; };
  }, [phase, formData.selectedBoardProject, formData.crossProductIds.atlasWorkspaceId]);

  const selectedProductCards = subscribedProducts
    .map((key) => PRODUCT_CARDS.find((p) => p.key === key))
    .filter(Boolean);

  const getDashboardUrl = () => {
    const base = (() => {
      switch (derivedPrimaryProduct) {
        case "atlas": return "http://localhost:3000/dashboard";
        case "loop": return "http://localhost:3001/dashboard";
        case "signal": return "http://localhost:3002/dashboard";
        default: return "http://localhost:3000/dashboard";
      }
    })();
    if (derivedPrimaryProduct === "atlas") {
      return `${base}?from=onboarding`;
    }
    return base;
  };

  // ── Analyzing Phase ──
  if (phase === "analyzing") {
    return (
      <div className="text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
          {/* Spinning logo */}
          <div className="mx-auto mb-6 relative h-20 w-20">
            <motion.div
              className="absolute inset-0 rounded-3xl bg-brand/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-2 rounded-2xl bg-brand/10 flex items-center justify-center">
              <motion.span
                className="text-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀
              </motion.span>
            </div>
          </div>

          <h1 className="mb-2 text-[28px] font-bold tracking-tight text-[#121312]">Setting up your workspace</h1>
          <p className="mx-auto max-w-[380px] text-sm text-[#121312]/50">
            We&apos;re configuring everything for <strong className="text-[#121312]/70">{formData.workspaceName || "your team"}</strong>. This only takes a moment.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mx-auto max-w-[400px] mb-6">
          <div className="h-2 rounded-full bg-[#121312]/8 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-brand"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-[#121312]/40">
            <span>{Math.round(progress)}%</span>
            <span>{ANALYSIS_STEPS[currentAnalysisStep]?.label}</span>
          </div>
        </div>

        {/* Analysis checklist */}
        <div className="mx-auto max-w-[380px] mb-6 space-y-2">
          {ANALYSIS_STEPS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-2.5 text-left"
            >
              <span className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]",
                i < currentAnalysisStep
                  ? "bg-brand/15 text-brand-dark"
                  : i === currentAnalysisStep
                    ? "bg-brand/10 text-brand-dark"
                    : "bg-[#121312]/5 text-[#121312]/30",
              )}>
                {i < currentAnalysisStep ? "✓" : i === currentAnalysisStep ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>⟳</motion.span>
                ) : "○"}
              </span>
              <span className={cn(
                "text-xs",
                i < currentAnalysisStep ? "text-[#121312]/50 line-through" : i === currentAnalysisStep ? "text-[#121312]/70 font-medium" : "text-[#121312]/30",
              )}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Rotating tip */}
        {!provisionError && (
          <AnimatePresence mode="wait">
            <motion.div
              key={tipIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto max-w-[380px] rounded-xl bg-brand/5 border border-brand/10 p-3"
            >
              <p className="text-[11px] text-[#121312]/50">
                💡 {LOADING_TIPS[tipIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        {provisionError && (
          <div className="mx-auto max-w-[400px] mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-center">
            <p className="text-sm font-medium text-red-700">Setup encountered an issue</p>
            <p className="mt-1 text-xs text-red-600/80">{provisionError}</p>
            <button
              type="button"
              onClick={() => {
                setProvisionError(null);
                provisionStarted.current = false;
                setProgress(0);
                setCurrentAnalysisStep(0);
                setPhase("analyzing");
              }}
              className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-200 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Ready Phase ──
  return (
    <div className="text-center">
      {/* Celebration */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-brand/15"
      >
        <motion.span
          className="text-5xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          🎉
        </motion.span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-2 text-[32px] font-bold tracking-tight text-[#121312]"
      >
        You&apos;re all set!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mb-8 max-w-[400px] text-sm text-[#121312]/50"
      >
        Your <strong className="text-[#121312]/70">{formData.workspaceName}</strong> workspace is ready.
        {formData.invitees.length > 0 && ` We've sent invitations to ${formData.invitees.length} teammate${formData.invitees.length !== 1 ? "s" : ""}.`}
      </motion.p>

      {/* Summary cards */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mx-auto max-w-[480px] space-y-3 mb-8 text-left"
      >
        {/* Products */}
        <div className="rounded-2xl border border-[#121312]/8 bg-white p-4">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#121312]/40">Active Products</p>
          <div className="flex flex-wrap gap-2">
            {selectedProductCards.map((p) => (
              <span key={p!.key} className="inline-flex items-center gap-1.5 rounded-full border border-[#121312]/8 bg-[#121312]/[0.02] px-3 py-1.5 text-xs font-semibold text-[#121312]/70">
                <span>{p!.icon}</span>
                {p!.name}
              </span>
            ))}
          </div>
        </div>

        {/* Configuration summary */}
        <div className="rounded-2xl border border-[#121312]/8 bg-white p-4">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#121312]/40">Configuration</p>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
            <div>
              <span className="text-[#121312]/40">Industry</span>
              <p className="font-medium text-[#121312]/70 capitalize">{formData.industry || "—"}</p>
            </div>
            <div>
              <span className="text-[#121312]/40">Team size</span>
              <p className="font-medium text-[#121312]/70">{formData.companySize || "—"}</p>
            </div>
            <div>
              <span className="text-[#121312]/40">Region</span>
              <p className="font-medium text-[#121312]/70 capitalize">{formData.region?.replace("-", " ") || "—"}</p>
            </div>
            <div>
              <span className="text-[#121312]/40">Dashboard</span>
              <p className="font-medium text-[#121312]/70 capitalize">{formData.dashboardLayout}</p>
            </div>
            <div>
              <span className="text-[#121312]/40">Sprint cadence</span>
              <p className="font-medium text-[#121312]/70">{formData.sprintCadence || "Not set"}</p>
            </div>
            <div>
              <span className="text-[#121312]/40">AI mode</span>
              <p className="font-medium text-[#121312]/70 capitalize">{formData.aiPreferences.mode}</p>
            </div>
          </div>
        </div>

        {/* Team Structure */}
        {formData.departments.length > 0 && (
          <div className="rounded-2xl border border-[#121312]/8 bg-white p-4">
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#121312]/40">
              Team Structure ({formData.orgStructureType})
            </p>
            <div className="space-y-2">
              {formData.departments.map((dept) => {
                const deptTeams = formData.teams.filter((t) => t.parentDepartmentId === dept.id);
                return (
                  <div key={dept.id} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: dept.color }} />
                    <span className="text-xs font-medium text-[#121312]/70">{dept.name}</span>
                    <span className="text-[10px] text-[#121312]/35">
                      — {deptTeams.map((t) => t.name).join(", ")}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex gap-3 text-[10px] text-[#121312]/40">
              <span>{formData.departments.length} department{formData.departments.length !== 1 ? "s" : ""}</span>
              <span>·</span>
              <span>{formData.teams.length} team{formData.teams.length !== 1 ? "s" : ""}</span>
              {formData.invitees.length > 0 && (
                <>
                  <span>·</span>
                  <span>{formData.invitees.length} invited</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Integrations */}
        {formData.connectedIntegrations.length > 0 && (
          <div className="rounded-2xl border border-[#121312]/8 bg-white p-4">
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#121312]/40">
              {formData.connectedIntegrations.length} Connected Integration{formData.connectedIntegrations.length !== 1 ? "s" : ""}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {formData.connectedIntegrations.map((c) => (
                <span key={c.key} className="rounded-lg bg-brand/8 px-2 py-1 text-[10px] font-semibold text-[#121312]/60">
                  ✓ {c.displayName}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Sprint Status Card */}
      {formData.selectedBoardProject && sprintStatus && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mx-auto max-w-[480px] mb-8"
        >
          {(sprintStatus.status === "syncing" || sprintStatus.status === "detecting" || sprintStatus.status === "planning") && (
            <div className="rounded-2xl border border-brand/15 bg-brand/5 p-4">
              <div className="flex items-center gap-3 mb-3">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="block h-5 w-5 rounded-full border-2 border-brand/30 border-t-brand"
                />
                <div>
                  <p className="text-xs font-semibold text-[#121312]/70">Analyzing your board…</p>
                  <p className="text-[10px] text-[#121312]/40">
                    {sprintStatus.project?.name ?? formData.selectedBoardProject.name}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                {(["syncing", "detecting", "planning"] as const).map((s) => {
                  const order = { syncing: 0, detecting: 1, planning: 2 };
                  const current = order[sprintStatus.status as keyof typeof order] ?? 0;
                  const stepOrder = order[s];
                  return (
                    <div key={s} className="flex-1">
                      <div className={cn(
                        "h-1 rounded-full transition-colors",
                        stepOrder <= current ? "bg-brand" : "bg-[#121312]/10",
                      )} />
                      <p className={cn(
                        "mt-1 text-[9px] capitalize",
                        stepOrder <= current ? "text-[#121312]/60 font-medium" : "text-[#121312]/30",
                      )}>
                        {s}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {sprintStatus.status === "ready" && sprintStatus.hasActiveSprint && sprintStatus.activeSprint && (
            <div className="rounded-2xl border border-green-100 bg-green-50/50 p-4">
              <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-green-700/60">Active Sprint Detected</p>
              <div className="mb-3">
                <p className="text-sm font-semibold text-[#121312]/80">{sprintStatus.activeSprint.name}</p>
                <p className="text-[10px] text-[#121312]/40">
                  {sprintStatus.activeSprint.startDate} — {sprintStatus.activeSprint.endDate}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-white/80 p-2 text-center">
                  <p className="text-lg font-bold text-[#121312]/70">{sprintStatus.activeSprint.ticketCount}</p>
                  <p className="text-[9px] text-[#121312]/40">Tickets</p>
                </div>
                <div className="rounded-lg bg-white/80 p-2 text-center">
                  <p className="text-lg font-bold text-[#121312]/70">{sprintStatus.activeSprint.completedCount}</p>
                  <p className="text-[9px] text-[#121312]/40">Completed</p>
                </div>
                <div className="rounded-lg bg-white/80 p-2 text-center">
                  <p className="text-lg font-bold text-[#121312]/70">{sprintStatus.activeSprint.totalPoints}</p>
                  <p className="text-[9px] text-[#121312]/40">Points</p>
                </div>
              </div>
              <p className="mt-3 text-[10px] text-green-700/60">
                Atlas is now tracking this sprint. View progress in your dashboard.
              </p>
            </div>
          )}

          {sprintStatus.status === "ready" && !sprintStatus.hasActiveSprint && sprintStatus.sprintPlan && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700/60">Sprint Plan Ready</p>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[9px] font-semibold",
                  sprintStatus.sprintPlan.confidence === "high"
                    ? "bg-green-100 text-green-700"
                    : sprintStatus.sprintPlan.confidence === "medium"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700",
                )}>
                  {sprintStatus.sprintPlan.confidence} confidence
                </span>
              </div>
              <div className="mb-3">
                <p className="text-sm font-semibold text-[#121312]/80">{sprintStatus.sprintPlan.name}</p>
                <p className="text-[10px] text-[#121312]/40">
                  {sprintStatus.sprintPlan.startDate} — {sprintStatus.sprintPlan.endDate}
                  {" · "}{sprintStatus.sprintPlan.ticketCount} tickets · {sprintStatus.sprintPlan.totalPoints} pts
                </p>
              </div>
              {sprintStatus.sprintPlan.topTickets.length > 0 && (
                <div className="space-y-1.5">
                  {sprintStatus.sprintPlan.topTickets.slice(0, 5).map((ticket) => (
                    <div key={ticket.externalId} className="flex items-center gap-2 rounded-lg bg-white/80 px-2.5 py-1.5">
                      <span className="shrink-0 rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-mono font-medium text-blue-700">
                        {ticket.externalId}
                      </span>
                      <span className="flex-1 truncate text-[11px] text-[#121312]/65">{ticket.title}</span>
                      <span className="shrink-0 text-[10px] font-semibold text-[#121312]/40">{ticket.points} pts</span>
                    </div>
                  ))}
                </div>
              )}
              <a
                href="http://localhost:3000/dashboard?from=onboarding"
                className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 hover:text-blue-700"
              >
                Review full plan in Atlas
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          )}

          {sprintStatus.status === "error" && sprintStatus.error && (
            <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-3">
              <p className="text-[11px] text-amber-700/70">
                Sprint detection encountered an issue: {sprintStatus.error}
              </p>
              <p className="mt-1 text-[10px] text-amber-600/50">You can set up sprint planning from your dashboard.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <a
          href={getDashboardUrl()}
          className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand text-base font-bold text-[#121312] shadow-md shadow-brand/20 transition-all hover:shadow-lg hover:shadow-brand/30 active:scale-[0.98]"
          style={{ height: 52 }}
          onClick={() => {
            trackEvent("navigation", "dashboard_launch", "Go to Dashboard", undefined, {
              destination: getDashboardUrl(),
              primaryProduct: derivedPrimaryProduct,
            });
          }}
        >
          Go to Dashboard
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>

        {/* Quick links per product */}
        {selectedProductCards.length > 1 && (
          <div className="flex justify-center gap-2 flex-wrap">
            {selectedProductCards.map((p) => {
              const href = p!.key === "atlas"
                ? "http://localhost:3000/dashboard"
                : p!.key === "loop"
                  ? "http://localhost:3001/dashboard"
                  : p!.key === "signal"
                    ? "http://localhost:3002/dashboard"
                    : "#";
              return (
                <a
                  key={p!.key}
                  href={href}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#121312]/10 px-3 py-1.5 text-[11px] font-semibold text-[#121312]/55 transition-all hover:border-[#121312]/20 hover:text-[#121312]/70"
                >
                  {p!.icon} Open {p!.name}
                </a>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Trust footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 text-[10px] text-[#121312]/30"
      >
        You can change any of these settings anytime from your workspace settings.
      </motion.p>
    </div>
  );
}

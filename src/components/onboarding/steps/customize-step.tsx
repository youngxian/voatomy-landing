"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../onboarding-context";
import {
  DASHBOARD_LAYOUT_OPTIONS,
  AI_MODE_OPTIONS,
  SPRINT_CADENCE_OPTIONS,
} from "@/lib/constants";
import type {
  DashboardLayout,
  ThemePreference,
  NotificationFrequency,
  AIMode,
  SprintCadence,
  NotificationPrefs,
  AIPreferences,
} from "@/types";

function ToggleSwitch({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        "flex items-center justify-between gap-3 py-1 w-full text-left",
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <span className="text-sm text-[#121312]/70">{label}</span>
      <span
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200",
          checked ? "bg-brand" : "bg-[#121312]/15",
        )}
      >
        <span
          className={cn(
            "inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-4.5" : "translate-x-0.5",
          )}
          style={{ transform: checked ? "translateX(18px)" : "translateX(2px)" }}
        />
      </span>
    </button>
  );
}

export function CustomizeStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, saveStep } = useOnboarding();
  const [isSaving, setIsSaving] = React.useState(false);

  const [dashboardLayout, setDashboardLayout] = React.useState<DashboardLayout>(formData.dashboardLayout);
  const [themePreference, setThemePreference] = React.useState<ThemePreference>(formData.themePreference);
  const [notifPrefs, setNotifPrefs] = React.useState<NotificationPrefs>({
    email: formData.notificationPrefs.email ?? true,
    slack: formData.notificationPrefs.slack ?? false,
    teams: formData.notificationPrefs.teams ?? false,
    inApp: formData.notificationPrefs.inApp ?? true,
    frequency: formData.notificationPrefs.frequency ?? "daily",
    slackChannel: formData.notificationPrefs.slackChannel ?? "",
    teamsWebhook: formData.notificationPrefs.teamsWebhook ?? "",
  });
  const [sprintCadence, setSprintCadence] = React.useState<SprintCadence | "">(formData.sprintCadence);
  const [aiPrefs, setAiPrefs] = React.useState<AIPreferences>(formData.aiPreferences);

  const hasSlack = formData.connectedIntegrations?.some((c) => c.key === "slack") ?? false;
  const hasTeams = formData.connectedIntegrations?.some((c) => c.key === "teams") ?? false;

  const handleContinue = async () => {
    const prefs = {
      ...notifPrefs,
      teams: notifPrefs.teams ?? false,
      slackChannel: notifPrefs.slackChannel ?? "",
      teamsWebhook: notifPrefs.teamsWebhook ?? "",
    };
    updateFormData({
      dashboardLayout,
      themePreference,
      notificationPrefs: prefs,
      sprintCadence,
      aiPreferences: aiPrefs,
    });
    setIsSaving(true);
    try {
      await saveStep("customize", {
        dashboardLayout,
        themePreference,
        notificationPrefs: prefs,
        sprintCadence,
        aiPreferences: aiPrefs,
      });
      markStepComplete("customize");
      goNext();
    } finally {
      setIsSaving(false);
    }
  };

  const themeOptions: { value: ThemePreference; label: string; icon: string }[] = [
    { value: "light", label: "Light", icon: "☀️" },
    { value: "dark", label: "Dark", icon: "🌙" },
    { value: "auto", label: "System", icon: "💻" },
  ];

  const frequencyOptions: { value: NotificationFrequency; label: string }[] = [
    { value: "realtime", label: "Real-time" },
    { value: "hourly", label: "Hourly" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12">
          <span className="text-2xl">🔔</span>
        </div>
        <h1 className="text-[28px] font-bold tracking-tight text-[#121312]">Notifications & alerts</h1>
        <p className="mt-1.5 text-sm text-[#121312]/50">
          Choose where to receive sprint updates, AI insights, and team alerts
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-6 text-left">

        {/* Notifications — Slack, Teams, Email (primary focus for this step) */}
        <div className="rounded-xl border border-[#121312]/8 bg-white p-4">
          <label className="mb-3 block text-sm font-semibold text-[#121312]/80">Where should we notify you?</label>
          <p className="mb-4 text-[11px] text-[#121312]/40">
            Connect your team apps in the previous step, then choose where to receive sprint alerts, AI insights, and standup reminders.
          </p>
          <div className="space-y-2 mb-4">
            <ToggleSwitch
              label="Email — Send to my inbox"
              checked={notifPrefs.email}
              onChange={(v) => setNotifPrefs((p) => ({ ...p, email: v }))}
            />
            <ToggleSwitch
              label="Slack — Post to channel"
              checked={notifPrefs.slack}
              onChange={(v) => setNotifPrefs((p) => ({ ...p, slack: v }))}
              disabled={!hasSlack}
            />
            {hasSlack && notifPrefs.slack && (
              <div className="ml-2 pl-4 border-l-2 border-brand/20">
                <label className="mb-1 block text-[11px] font-medium text-[#121312]/60">Slack channel</label>
                <input
                  type="text"
                  placeholder="#eng-sprint"
                  value={notifPrefs.slackChannel ?? ""}
                  onChange={(e) => setNotifPrefs((p) => ({ ...p, slackChannel: e.target.value }))}
                  className="w-full rounded-lg border border-[#121312]/12 bg-[#121312]/[0.02] px-3 py-2 text-sm text-[#121312] placeholder:text-[#121312]/30 outline-none focus:border-brand/40"
                />
              </div>
            )}
            <ToggleSwitch
              label="Microsoft Teams — Post to channel"
              checked={notifPrefs.teams}
              onChange={(v) => setNotifPrefs((p) => ({ ...p, teams: v }))}
              disabled={!hasTeams}
            />
            {hasTeams && notifPrefs.teams && (
              <div className="ml-2 pl-4 border-l-2 border-brand/20">
                <label className="mb-1 block text-[11px] font-medium text-[#121312]/60">Teams webhook URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={notifPrefs.teamsWebhook ?? ""}
                  onChange={(e) => setNotifPrefs((p) => ({ ...p, teamsWebhook: e.target.value }))}
                  className="w-full rounded-lg border border-[#121312]/12 bg-[#121312]/[0.02] px-3 py-2 text-sm text-[#121312] placeholder:text-[#121312]/30 outline-none focus:border-brand/40"
                />
              </div>
            )}
            <ToggleSwitch
              label="In-app notifications"
              checked={notifPrefs.inApp}
              onChange={(v) => setNotifPrefs((p) => ({ ...p, inApp: v }))}
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-[#121312]/50">Digest frequency</p>
            <div className="flex gap-1.5">
              {frequencyOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setNotifPrefs((p) => ({ ...p, frequency: opt.value }))}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-[11px] font-semibold transition-all",
                    notifPrefs.frequency === opt.value
                      ? "bg-brand/10 text-[#121312]"
                      : "bg-[#121312]/[0.03] text-[#121312]/40 hover:bg-[#121312]/[0.06]",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          {(!hasSlack || !hasTeams) && (
            <p className="mt-3 text-[10px] text-[#121312]/40">
              Tip: Connect Slack and Teams in the Connect step to enable channel notifications.
            </p>
          )}
        </div>

        {/* Dashboard Layout */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-[#121312]/80">Dashboard layout</label>
          <p className="mb-3 text-xs text-[#121312]/40">Choose how dense you want your dashboard to be</p>
          <div className="grid grid-cols-3 gap-2">
            {DASHBOARD_LAYOUT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDashboardLayout(opt.value)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border p-4 text-center transition-all duration-200",
                  dashboardLayout === opt.value
                    ? "border-brand bg-brand/8 shadow-sm"
                    : "border-[#121312]/8 bg-white hover:border-[#121312]/15",
                )}
              >
                <span className="text-xl">{opt.icon}</span>
                <span className={cn("text-sm font-semibold", dashboardLayout === opt.value ? "text-[#121312]" : "text-[#121312]/65")}>
                  {opt.label}
                </span>
                <span className="text-[10px] text-[#121312]/40 leading-tight">{opt.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#121312]/80">Theme</label>
          <div className="flex gap-2">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setThemePreference(opt.value)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 transition-all duration-200",
                  themePreference === opt.value
                    ? "border-brand bg-brand/8 shadow-sm"
                    : "border-[#121312]/8 bg-white hover:border-[#121312]/15",
                )}
              >
                <span>{opt.icon}</span>
                <span className={cn("text-sm font-medium", themePreference === opt.value ? "text-[#121312]" : "text-[#121312]/60")}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sprint cadence */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#121312]/80">Sprint cadence</label>
          <div className="flex gap-2 flex-wrap">
            {SPRINT_CADENCE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSprintCadence(opt.value)}
                className={cn(
                  "rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  sprintCadence === opt.value
                    ? "border-brand bg-brand/8 text-[#121312] shadow-sm"
                    : "border-[#121312]/8 bg-white text-[#121312]/60 hover:border-[#121312]/15",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Preferences */}
        <div className="rounded-xl border border-[#121312]/8 bg-white p-4">
          <label className="mb-1 block text-sm font-semibold text-[#121312]/80">AI assistant mode</label>
          <p className="mb-3 text-xs text-[#121312]/40">How active should AI be in your workflow?</p>
          <div className="space-y-2 mb-4">
            {AI_MODE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAiPrefs((p) => ({ ...p, mode: opt.value }))}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200",
                  aiPrefs.mode === opt.value
                    ? "border-brand bg-brand/6 shadow-sm"
                    : "border-[#121312]/8 hover:border-[#121312]/15",
                )}
              >
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    aiPrefs.mode === opt.value ? "border-brand bg-brand" : "border-[#121312]/20",
                  )}
                >
                  {aiPrefs.mode === opt.value && <span className="block h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <div>
                  <p className={cn("text-sm font-medium", aiPrefs.mode === opt.value ? "text-[#121312]" : "text-[#121312]/65")}>
                    {opt.label}
                  </p>
                  <p className="text-[11px] text-[#121312]/40">{opt.description}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="space-y-2 border-t border-[#121312]/8 pt-3">
            <ToggleSwitch
              label="Auto-suggest sprint improvements"
              checked={aiPrefs.autoSuggest}
              onChange={(v) => setAiPrefs((p) => ({ ...p, autoSuggest: v }))}
            />
            <ToggleSwitch
              label="Auto-assign tasks based on capacity"
              checked={aiPrefs.autoAssign}
              onChange={(v) => setAiPrefs((p) => ({ ...p, autoAssign: v }))}
            />
            <ToggleSwitch
              label="Link commits & PRs to tickets"
              checked={aiPrefs.autoLinkGitActivity ?? true}
              onChange={(v) => setAiPrefs((p) => ({ ...p, autoLinkGitActivity: v }))}
            />
            <p className="text-[10px] text-[#121312]/40 pl-1">
              Automatically detect commits and pull requests related to your tickets and post a comment on the ticket. Uses ticket IDs in branch/message when present.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={goBack}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[#121312]/12 text-sm font-medium text-[#121312]/60 transition-all hover:bg-[#121312]/5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={isSaving}
            className="flex h-12 flex-[2] items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-[#121312] shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <span className="block h-4 w-4 animate-spin rounded-full border-2 border-[#121312]/20 border-t-[#121312]" />
                Saving…
              </>
            ) : (
              <>
                Almost done!
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

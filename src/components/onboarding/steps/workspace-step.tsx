"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../onboarding-context";
import {
  INDUSTRY_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  PURPOSE_OPTIONS,
  ROLE_PURPOSE_MAP,
  REGIONS,
} from "@/lib/constants";
import type { Industry, CompanySize, Region, Purpose } from "@/types";
import { checkSlugAvailability } from "@/lib/api";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
}

export function WorkspaceStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, saveStep } = useOnboarding();
  const [workspaceName, setWorkspaceName] = React.useState(formData.workspaceName);
  const [workspaceSlug, setWorkspaceSlug] = React.useState(formData.workspaceSlug);
  const [industry, setIndustry] = React.useState<Industry | "">(formData.industry);
  const [companySize, setCompanySize] = React.useState<CompanySize | "">(formData.companySize);
  const [region, setRegion] = React.useState<Region | "">(formData.region);
  const [purposes, setPurposes] = React.useState<Purpose[]>(formData.purposes);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState<string | null>(null);

  const [slugAvailable, setSlugAvailable] = React.useState<boolean | null>(null);
  const [slugChecking, setSlugChecking] = React.useState(false);
  const slugCheckTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (workspaceName) {
      setWorkspaceSlug(generateSlug(workspaceName));
    }
  }, [workspaceName]);

  // Debounced slug availability check
  React.useEffect(() => {
    if (!workspaceSlug || workspaceSlug.length < 2) {
      setSlugAvailable(null);
      return;
    }
    setSlugChecking(true);
    setSlugAvailable(null);
    if (slugCheckTimer.current) clearTimeout(slugCheckTimer.current);
    slugCheckTimer.current = setTimeout(() => {
      checkSlugAvailability(workspaceSlug)
        .then((result) => {
          setSlugAvailable(result.available);
        })
        .catch(() => {
          setSlugAvailable(null);
        })
        .finally(() => setSlugChecking(false));
    }, 400);
    return () => {
      if (slugCheckTimer.current) clearTimeout(slugCheckTimer.current);
    };
  }, [workspaceSlug]);

  const relevantPurposes = ROLE_PURPOSE_MAP[formData.userRole] ?? PURPOSE_OPTIONS.map((o) => o.value);
  const filteredPurposes = PURPOSE_OPTIONS.filter((opt) => relevantPurposes.includes(opt.value));

  // Sync region from geo detection if user hasn't picked one yet
  React.useEffect(() => {
    if (!region && formData.region) {
      setRegion(formData.region);
    }
  }, [formData.region, region]);

  // Clear any selected purposes that are no longer relevant for the current role
  React.useEffect(() => {
    setPurposes((prev) => {
      const valid = prev.filter((p) => relevantPurposes.includes(p));
      return valid.length !== prev.length ? valid : prev;
    });
  }, [formData.userRole]); // eslint-disable-line react-hooks/exhaustive-deps

  const togglePurpose = (p: Purpose) => {
    setPurposes((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const canContinue =
    workspaceName.trim().length >= 2 &&
    industry !== "" &&
    companySize !== "" &&
    region !== "" &&
    purposes.length > 0 &&
    slugAvailable !== false &&
    !isSaving;

  const handleContinue = async () => {
    const regionData = REGIONS.find((r) => r.value === region);
    const stepData = {
      workspaceName: workspaceName.trim(),
      workspaceSlug,
      industry,
      companySize,
      region,
      timezone: regionData?.timezone || formData.timezone,
      purposes,
    };

    setIsSaving(true);
    setSaveError(null);
    try {
      await saveStep("workspace", stepData as unknown as Record<string, unknown>);
      updateFormData(stepData);
      markStepComplete("workspace");
      goNext();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save workspace";
      setSaveError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12">
          <span className="text-2xl">🏢</span>
        </div>
        <h1 className="text-[28px] font-bold tracking-tight text-[#121312]">Set up your workspace</h1>
        <p className="mt-1.5 text-sm text-[#121312]/50">Tell us about your team so we can personalize everything</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-6 text-left">
        {/* Workspace name + slug */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#121312]/80">Company or team name</label>
          <input
            type="text"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            placeholder="Acme Corp"
            autoFocus
            className="h-12 w-full rounded-xl border border-[#121312]/12 bg-white px-4 text-base font-medium text-[#121312] outline-none transition-all placeholder:text-[#121312]/35 focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <div className="mt-1.5 flex items-center gap-1 text-xs text-[#121312]/40">
            <span>voatomy.com/</span>
            <span className="font-mono font-medium text-[#121312]/60">{workspaceSlug || "your-team"}</span>
            {slugChecking && <span className="ml-1 text-[#121312]/30">checking…</span>}
            {!slugChecking && slugAvailable === true && <span className="ml-1 text-emerald-600">✓ available</span>}
            {!slugChecking && slugAvailable === false && <span className="ml-1 text-red-500">✗ taken</span>}
          </div>
        </div>

        {/* Industry */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-[#121312]/80">Industry</label>
          <p className="mb-3 text-xs text-[#121312]/40">We&apos;ll recommend products and integrations for your industry</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {INDUSTRY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setIndustry(opt.value)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border py-2.5 px-1 text-center transition-all duration-200",
                  industry === opt.value
                    ? "border-brand bg-brand/8 shadow-sm"
                    : "border-[#121312]/8 bg-white hover:border-[#121312]/15",
                )}
              >
                <span className="text-base">{opt.icon}</span>
                <span className={cn("text-[10px] font-medium leading-tight", industry === opt.value ? "text-[#121312]" : "text-[#121312]/55")}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Company size */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#121312]/80">Team size</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {COMPANY_SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCompanySize(opt.value)}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-xl border py-2.5 transition-all duration-200",
                  companySize === opt.value
                    ? "border-brand bg-brand/8 shadow-sm"
                    : "border-[#121312]/8 bg-white hover:border-[#121312]/15",
                )}
              >
                <span className={cn("text-sm font-bold", companySize === opt.value ? "text-[#121312]" : "text-[#121312]/70")}>
                  {opt.label}
                </span>
                <span className="text-[9px] text-[#121312]/40">{opt.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#121312]/80">Region</label>
          <div className="grid grid-cols-3 gap-2">
            {REGIONS.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRegion(r.value)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border py-3 transition-all duration-200",
                  region === r.value
                    ? "border-brand bg-brand/8 shadow-sm"
                    : "border-[#121312]/8 bg-white hover:border-[#121312]/15",
                )}
              >
                <span className="text-lg">{r.icon}</span>
                <span className={cn("text-[10px] font-medium leading-tight", region === r.value ? "text-[#121312]" : "text-[#121312]/55")}>
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Purposes */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-[#121312]/80">What do you want to accomplish?</label>
          <p className="mb-3 text-xs text-[#121312]/40">Select all that apply — we&apos;ll recommend the right products</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredPurposes.map((opt) => {
              const selected = purposes.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => togglePurpose(opt.value)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200",
                    selected
                      ? "border-brand bg-brand/6 shadow-sm"
                      : "border-[#121312]/8 bg-white hover:border-[#121312]/15",
                  )}
                >
                  <span className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    selected ? "border-brand bg-brand text-white" : "border-[#121312]/20",
                  )}>
                    {selected && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className={cn("text-[13px] font-medium", selected ? "text-[#121312]" : "text-[#121312]/70")}>
                      <span className="mr-1.5">{opt.icon}</span>
                      {opt.label}
                    </p>
                    <p className="text-[11px] text-[#121312]/40 truncate">{opt.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {saveError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {saveError}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
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
            disabled={!canContinue}
            className={cn(
              "flex h-12 flex-[2] items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200",
              canContinue
                ? "bg-brand text-[#121312] shadow-sm hover:shadow-md active:scale-[0.98]"
                : "bg-[#121312]/8 text-[#121312]/35 cursor-not-allowed",
            )}
          >
            {isSaving ? (
              <>
                <span className="block h-4 w-4 animate-spin rounded-full border-2 border-[#121312]/20 border-t-[#121312]" />
                Saving…
              </>
            ) : (
              <>
                Continue
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

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Building2, Globe2, Loader2, Users, X } from "lucide-react";
import { StepHeader, StepNav } from "./_shared";
import { ob, ObField, ObHint, ObInput } from "../onboarding-primitives";
import {
  IndustryTileIcon,
  PurposeTileIcon,
  RegionTileIcon,
  WorkspaceHeaderIcon,
} from "../onboarding-icons";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../onboarding-context";
import {
  INDUSTRY_OPTIONS,
  PURPOSE_OPTIONS,
  ROLE_PURPOSE_MAP,
  REGIONS,
} from "@/lib/constants";
import type { Industry, CompanySize, Region, Purpose, ProductKey } from "@/types";
import { checkSlugAvailability } from "@/lib/api";
import { useProductOnboarding } from "@/hooks/use-product-onboarding";
import { purposesForLicensedProducts } from "@/lib/product-onboarding-config";
import { TeamSizeSlider } from "../team-size-slider";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
}

function SectionBlock({
  icon,
  title,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={ob.sectionCard}>
      <div className={ob.sectionLabel}>
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </section>
  );
}

export function WorkspaceStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, saveStep } = useOnboarding();
  const { licensedProducts, primaryModule } = useProductOnboarding();
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
        .then((result) => setSlugAvailable(result.available))
        .catch(() => setSlugAvailable(null))
        .finally(() => setSlugChecking(false));
    }, 400);
    return () => {
      if (slugCheckTimer.current) clearTimeout(slugCheckTimer.current);
    };
  }, [workspaceSlug]);

  const licensedPurposes = React.useMemo(
    () => purposesForLicensedProducts(licensedProducts),
    [licensedProducts],
  );

  const relevantPurposes = React.useMemo(() => {
    const byRole = ROLE_PURPOSE_MAP[formData.userRole] ?? PURPOSE_OPTIONS.map((o) => o.value);
    return byRole.filter((p) => licensedPurposes.includes(p));
  }, [formData.userRole, licensedPurposes]);

  const filteredPurposes = PURPOSE_OPTIONS.filter(
    (opt) =>
      relevantPurposes.includes(opt.value) &&
      opt.products.some((p) => licensedProducts.includes(p as ProductKey)),
  );

  React.useEffect(() => {
    if (!region && formData.region) {
      setRegion(formData.region);
    }
  }, [formData.region, region]);

  React.useEffect(() => {
    setPurposes((prev) => {
      const valid = prev.filter((p) => relevantPurposes.includes(p));
      return valid.length !== prev.length ? valid : prev;
    });
  }, [formData.userRole]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (filteredPurposes.length === 1 && !purposes.includes(filteredPurposes[0].value)) {
      setPurposes([filteredPurposes[0].value]);
    }
  }, [filteredPurposes]); // eslint-disable-line react-hooks/exhaustive-deps

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
      setSaveError(err instanceof Error ? err.message : "Failed to save workspace");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <StepHeader
          icon={<WorkspaceHeaderIcon />}
          stepKey="workspace"
          title="Set up your workspace"
          subtitle={`Org-wide settings for ${primaryModule.label} and your team — product-specific setup comes later`}
          color="#3B82F6"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4 text-left"
      >
        {/* Identity */}
        <SectionBlock icon={<Building2 className="h-3.5 w-3.5" strokeWidth={2.2} />} title="Workspace identity">
          <ObField label="Company or team name">
            <ObInput
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="Acme Corp"
              autoFocus
            />
          </ObField>
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-[#121312]/8 bg-white px-3.5 py-2.5">
            <Globe2 className="h-4 w-4 shrink-0 text-[#121312]/35" />
            <span className="text-xs text-[#121312]/45">voatomy.com/</span>
            <span className="font-mono text-sm font-semibold text-[#121312]">
              {workspaceSlug || "your-team"}
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-[11px] font-medium">
              {slugChecking && (
                <>
                  <Loader2 className="h-3 w-3 animate-spin text-[#121312]/40" />
                  <span className="text-[#121312]/40">Checking…</span>
                </>
              )}
              {!slugChecking && slugAvailable === true && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">
                  <Check className="h-3 w-3" strokeWidth={3} />
                  Available
                </span>
              )}
              {!slugChecking && slugAvailable === false && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-red-600">
                  <X className="h-3 w-3" strokeWidth={3} />
                  Taken
                </span>
              )}
            </span>
          </div>
        </SectionBlock>

        {/* Industry */}
        <SectionBlock title="Industry">
          <ObHint className="mb-3">We&apos;ll recommend products and integrations for your industry</ObHint>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {INDUSTRY_OPTIONS.map((opt) => {
              const selected = industry === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setIndustry(opt.value)}
                  className={ob.selectTile(selected)}
                >
                  <IndustryTileIcon industry={opt.value} />
                  <span className={cn("text-[10px] font-semibold leading-tight", selected ? "text-fynk-ink" : "text-fynk-muted")}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </SectionBlock>

        {/* Team size */}
        <SectionBlock icon={<Users className="h-3.5 w-3.5" strokeWidth={2.2} />} title="Team size">
          <TeamSizeSlider value={companySize} onChange={setCompanySize} />
        </SectionBlock>

        {/* Region */}
        <SectionBlock icon={<Globe2 className="h-3.5 w-3.5" strokeWidth={2.2} />} title="Region">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {REGIONS.map((r) => {
              const selected = region === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRegion(r.value)}
                  className={ob.selectTile(selected)}
                >
                  <RegionTileIcon region={r.value} size="xs" />
                  <span className={cn("text-[10px] font-semibold leading-tight", selected ? "text-fynk-ink" : "text-fynk-muted")}>
                    {r.label}
                  </span>
                </button>
              );
            })}
          </div>
        </SectionBlock>

        {/* Goals */}
        <SectionBlock title="What do you want to accomplish?">
          <ObHint className="mb-3">Select all that apply — we&apos;ll recommend the right products</ObHint>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {filteredPurposes.map((opt) => {
              const selected = purposes.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => togglePurpose(opt.value)}
                  className={ob.selectRow(selected)}
                >
                  <PurposeTileIcon purpose={opt.value} />
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm font-semibold", selected ? "text-fynk-ink" : "text-fynk-muted")}>
                      {opt.label}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-fynk-muted/85 line-clamp-2">
                      {opt.description}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                      selected ? "border-[#F05A28] bg-[#F05A28] text-white" : "border-[#121312]/12 bg-white",
                    )}
                  >
                    {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
        </SectionBlock>

        {saveError && <p className={ob.error}>{saveError}</p>}

        <StepNav
          onBack={goBack}
          onContinue={handleContinue}
          canContinue={canContinue}
          isSaving={isSaving}
        />
      </motion.div>
    </div>
  );
}

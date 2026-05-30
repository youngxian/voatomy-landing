"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { fetchBoardProjects } from "@/lib/api";
import type { BoardProject, IntegrationKey } from "@/types";
import { INTEGRATION_CATALOG } from "@/lib/constants";

const BOARD_KEYS = INTEGRATION_CATALOG
  .filter((i) => i.category === "Project" && (i.products as readonly string[]).includes("atlas"))
  .map((i) => i.key as IntegrationKey);

export function AtlasBoardStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, saveStep } = useOnboarding();
  const [projects, setProjects] = React.useState<BoardProject[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<BoardProject | null>(formData.selectedBoardProject);
  const [sprintStartDay, setSprintStartDay] = React.useState<string>("monday");

  // Fetch projects from whichever board was connected
  React.useEffect(() => {
    const connectedBoard = formData.connectedIntegrations.find((c) =>
      BOARD_KEYS.includes(c.key as IntegrationKey),
    );
    if (!connectedBoard) { setLoading(false); return; }
    fetchBoardProjects(connectedBoard.key as IntegrationKey)
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [formData.connectedIntegrations]);

  const handleContinue = async () => {
    updateFormData({ selectedBoardProject: selected });
    try {
      await saveStep("atlas-board", {
        board_project_id: selected?.key,
        board_project_name: selected?.name,
        sprint_start_day: sprintStartDay,
      });
    } catch { /* continue */ }
    markStepComplete("atlas-board");
    goNext();
  };

  const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  return (
    <div>
      <StepHeader
        stepKey="atlas-board"
        title="Pick your active project"
        subtitle="Atlas will plan sprints and track progress inside this project."
        color="#F05A28"
      />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <svg className="animate-spin h-6 w-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
        </div>
      ) : projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-[#121312]/8 bg-[#121312]/3 p-6 text-center"
        >
          <p className="text-sm font-medium text-[#121312]/60">No projects found</p>
          <p className="mt-1 text-xs text-[#121312]/40">
            Connect a project board in the previous step to import projects automatically.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          {projects.map((project) => (
            <button
              key={project.key}
              type="button"
              onClick={() => setSelected(project)}
              className={cn(
                "w-full rounded-xl border px-4 py-3 text-left transition-all",
                selected?.key === project.key
                  ? "border-brand bg-white ring-2 ring-brand/15 shadow-sm"
                  : "border-[#121312]/10 bg-white hover:border-[#121312]/20",
              )}
            >
              <p className="text-sm font-semibold text-[#121312]">{project.name}</p>
              {project.provider && (
                <p className="mt-0.5 text-xs text-[#121312]/40 capitalize">{project.provider}</p>
              )}
            </button>
          ))}
        </motion.div>
      )}

      {/* Sprint start day */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#121312]/40">
          Sprint starts on
        </p>
        <div className="flex gap-2">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSprintStartDay(day)}
              className={cn(
                "flex-1 rounded-lg border py-2 text-xs font-semibold capitalize transition-all",
                sprintStartDay === day
                  ? "border-brand bg-brand/10 text-[#121312]"
                  : "border-[#121312]/10 text-[#121312]/50 hover:border-[#121312]/20",
              )}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </motion.div>

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={selected !== null || projects.length === 0}
        skipLabel="Skip — I'll pick a project inside Atlas"
        onSkip={() => { markStepComplete("atlas-board"); goNext(); }}
      />
    </div>
  );
}

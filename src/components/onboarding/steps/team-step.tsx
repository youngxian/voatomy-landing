"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../onboarding-context";
import {
  INVITEE_ROLE_OPTIONS,
  ORG_STRUCTURE_OPTIONS,
  TEAM_TYPE_OPTIONS,
  DEPARTMENT_TEMPLATES,
  PROJECT_COLOR_OPTIONS,
  ROLE_TEAM_TYPE_MAP,
} from "@/lib/constants";
import {
  sendInvitations,
  createDepartment,
  createTeam,
} from "@/lib/api";
import type {
  OnboardingInvitee,
  OnboardingTeam,
  OnboardingDepartment,
  OrgStructureType,
  TeamType,
  InviteeRole,
} from "@/types";

// ── Helpers ──

function getInitials(email: string): string {
  const parts = email.split("@")[0].split(/[._-]/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return email.slice(0, 2).toUpperCase();
}

function generateId(): string {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const AVATAR_COLORS = [
  "#f16e2c",
  "#6366F1",
  "#EF4444",
  "#8B5CF6",
  "#22D3EE",
  "#10B981",
  "#EC4899",
  "#F59E0B",
];

// ── Sub-Steps ──

type SubStep = "structure" | "departments" | "invite";

// ══════════════════════════════════════════════════════════════════
//  Step 1 — Org Structure Type Selection
// ══════════════════════════════════════════════════════════════════

function OrgStructureSelector({
  value,
  companySize,
  onChange,
}: {
  value: OrgStructureType;
  companySize: string;
  onChange: (v: OrgStructureType) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-[#121312]/80">
        How is your organization structured?
      </label>
      <p className="mb-4 text-xs text-[#121312]/45">
        Pick the structure closest to yours — you can customize it next.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {ORG_STRUCTURE_OPTIONS.map((opt) => {
          const isRecommended = (opt.recommended as readonly string[]).includes(
            companySize
          );
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "relative flex flex-col items-start gap-1.5 rounded-2xl border p-4 text-left transition-all duration-200",
                isSelected
                  ? "border-brand bg-brand/8 shadow-sm"
                  : "border-[#121312]/8 bg-white hover:border-[#121312]/15"
              )}
            >
              {isRecommended && (
                <span className="absolute -top-2 right-3 rounded-full bg-brand/90 px-2 py-0.5 text-[9px] font-bold text-[#121312]">
                  Recommended
                </span>
              )}
              <span className="text-xl">{opt.icon}</span>
              <p
                className={cn(
                  "text-sm font-bold",
                  isSelected ? "text-[#121312]" : "text-[#121312]/70"
                )}
              >
                {opt.label}
              </p>
              <p className="text-[11px] leading-snug text-[#121312]/45">
                {opt.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  Step 2 — Department & Team Builder
// ══════════════════════════════════════════════════════════════════

function DepartmentCard({
  department,
  teams,
  orgStructure,
  onUpdateDepartment,
  onDeleteDepartment,
  onAddTeam,
  onUpdateTeam,
  onDeleteTeam,
}: {
  department: OnboardingDepartment;
  teams: OnboardingTeam[];
  orgStructure: OrgStructureType;
  onUpdateDepartment: (id: string, data: Partial<OnboardingDepartment>) => void;
  onDeleteDepartment: (id: string) => void;
  onAddTeam: (departmentId: string) => void;
  onUpdateTeam: (id: string, data: Partial<OnboardingTeam>) => void;
  onDeleteTeam: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const deptTeams = teams.filter((t) => t.parentDepartmentId === department.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="rounded-2xl border border-[#121312]/10 bg-white overflow-hidden"
    >
      {/* Department header */}
      <div className="flex items-center gap-3 p-3.5">
        <div
          className="h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: department.color }}
        />

        {isEditingName ? (
          <input
            autoFocus
            className="flex-1 rounded-lg border border-brand/40 bg-brand/5 px-2.5 py-1 text-sm font-semibold text-[#121312] outline-none"
            value={department.name}
            onChange={(e) =>
              onUpdateDepartment(department.id, { name: e.target.value })
            }
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsEditingName(false);
            }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsEditingName(true)}
            className="flex-1 text-left text-sm font-bold text-[#121312] hover:text-brand transition-colors"
          >
            {department.name}
          </button>
        )}

        <span className="text-[10px] font-medium text-[#121312]/40">
          {deptTeams.length} team{deptTeams.length !== 1 ? "s" : ""}
        </span>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#121312]/30 hover:text-[#121312]/60 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "transition-transform duration-200",
              isExpanded ? "rotate-180" : ""
            )}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => onDeleteDepartment(department.id)}
          className="text-[#121312]/20 hover:text-red-500 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Teams inside department */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#121312]/6 px-3.5 pb-3.5 pt-2.5">
              {/* Description */}
              <input
                type="text"
                value={department.description}
                onChange={(e) =>
                  onUpdateDepartment(department.id, {
                    description: e.target.value,
                  })
                }
                placeholder="Department description…"
                className="mb-3 h-8 w-full rounded-lg border-0 bg-[#121312]/[0.03] px-2.5 text-xs text-[#121312]/60 outline-none placeholder:text-[#121312]/30 focus:bg-brand/5"
              />

              {/* Team list */}
              <div className="space-y-2">
                <AnimatePresence>
                  {deptTeams.map((team) => (
                    <TeamRow
                      key={team.id}
                      team={team}
                      onUpdate={onUpdateTeam}
                      onDelete={onDeleteTeam}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Add team button */}
              <button
                type="button"
                onClick={() => onAddTeam(department.id)}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#121312]/12 py-2 text-[11px] font-medium text-[#121312]/40 transition-all hover:border-brand/40 hover:bg-brand/5 hover:text-[#121312]/70"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add team
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TeamRow({
  team,
  onUpdate,
  onDelete,
}: {
  team: OnboardingTeam;
  onUpdate: (id: string, data: Partial<OnboardingTeam>) => void;
  onDelete: (id: string) => void;
}) {
  const typeOption = TEAM_TYPE_OPTIONS.find((t) => t.value === team.type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      className="flex items-center gap-2 rounded-xl border border-[#121312]/6 bg-[#121312]/[0.015] p-2.5"
    >
      {/* Team type icon */}
      <span className="text-sm">{typeOption?.icon || "✨"}</span>

      {/* Team name */}
      <input
        type="text"
        value={team.name}
        onChange={(e) => onUpdate(team.id, { name: e.target.value })}
        placeholder="Team name"
        className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-[#121312] outline-none placeholder:text-[#121312]/30"
      />

      {/* Team type selector */}
      <select
        value={team.type}
        onChange={(e) => onUpdate(team.id, { type: e.target.value as TeamType })}
        className="appearance-none rounded-lg border border-[#121312]/8 bg-white px-2 py-1 text-[10px] font-medium text-[#121312]/55 outline-none focus:border-brand"
      >
        {TEAM_TYPE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.icon} {opt.label}
          </option>
        ))}
      </select>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onDelete(team.id)}
        className="text-[#121312]/20 hover:text-red-500 transition-colors"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </motion.div>
  );
}

function UserTeamSelector({
  teams,
  departments,
  userRole,
  userTeamId,
  onUserTeamChange,
}: {
  teams: OnboardingTeam[];
  departments: OnboardingDepartment[];
  userRole: string;
  userTeamId: string | null;
  onUserTeamChange: (teamId: string | null) => void;
}) {
  const compatibleTypes = (userRole ? ROLE_TEAM_TYPE_MAP[userRole] : null) ?? [];
  const sortedTeams = React.useMemo(() => {
    if (!compatibleTypes.length) return teams;
    return [...teams].sort((a, b) => {
      const aIdx = compatibleTypes.indexOf(a.type);
      const bIdx = compatibleTypes.indexOf(b.type);
      if (aIdx >= 0 && bIdx < 0) return -1;
      if (aIdx < 0 && bIdx >= 0) return 1;
      if (aIdx >= 0 && bIdx >= 0) return aIdx - bIdx;
      return 0;
    });
  }, [teams, compatibleTypes]);

  const singleMatch = sortedTeams.length === 1 && compatibleTypes.length > 0 && compatibleTypes.includes(sortedTeams[0].type);

  return (
    <div className="mb-4 rounded-xl border border-brand/15 bg-brand/5 p-4">
      <label className="mb-2 block text-xs font-semibold text-[#121312]/80">
        Which team do you work with?
      </label>
      <p className="mb-3 text-[11px] text-[#121312]/45">
        This helps us show you the right boards and context when you land in the app.
      </p>
      <select
        value={userTeamId ?? ""}
        onChange={(e) => onUserTeamChange(e.target.value || null)}
        className="w-full rounded-lg border border-[#121312]/10 bg-white px-3 py-2.5 text-sm text-[#121312] outline-none focus:border-brand/40"
      >
        <option value="">Not sure / All teams</option>
        {sortedTeams.map((team) => {
          const dept = departments.find((d) => d.id === team.parentDepartmentId);
          const typeOpt = TEAM_TYPE_OPTIONS.find((t) => t.value === team.type);
          const isRecommended = compatibleTypes.includes(team.type);
          return (
            <option key={team.id} value={team.id}>
              {team.name} {dept ? `(${dept.name})` : ""}
              {isRecommended ? " — Recommended" : ""}
              {typeOpt ? ` ${typeOpt.icon}` : ""}
            </option>
          );
        })}
      </select>
      {singleMatch && !userTeamId && (
        <p className="mt-2 text-[10px] text-[#121312]/40">
          Auto-selected based on your role.
        </p>
      )}
    </div>
  );
}

function DepartmentTeamBuilder({
  orgStructure,
  departments,
  teams,
  industry,
  userRole,
  userTeamId,
  onSetDepartments,
  onSetTeams,
  onUserTeamChange,
}: {
  orgStructure: OrgStructureType;
  departments: OnboardingDepartment[];
  teams: OnboardingTeam[];
  industry: string;
  userRole: string;
  userTeamId: string | null;
  onSetDepartments: (deps: OnboardingDepartment[]) => void;
  onSetTeams: (teams: OnboardingTeam[]) => void;
  onUserTeamChange: (teamId: string | null) => void;
}) {
  const hasSeeded = React.useRef(false);

  // Auto-seed departments from templates if empty (once)
  React.useEffect(() => {
    if (hasSeeded.current || departments.length > 0) return;
    hasSeeded.current = true;

    const templateKey =
      industry && DEPARTMENT_TEMPLATES[industry]
        ? industry
        : "default";
    const template = DEPARTMENT_TEMPLATES[templateKey];

    if (orgStructure === "flat") {
      // Flat: one implicit department, one team
      const deptId = generateId();
      const teamId = generateId();
      onSetDepartments([
        {
          id: deptId,
          name: "Company",
          description: "Your entire team",
          headEmail: "",
          teamIds: [teamId],
          color: "#0d9488",
        },
      ]);
      onSetTeams([
        {
          id: teamId,
          name: "Team",
          type: "engineering",
          description: "Everyone",
          leadEmail: "",
          memberEmails: [],
          parentDepartmentId: deptId,
          projectIds: [],
          color: "#6366F1",
        },
      ]);
    } else {
      // Functional / Matrix / Divisional: seed from template
      const newDepts: OnboardingDepartment[] = [];
      const newTeams: OnboardingTeam[] = [];

      template.forEach((tpl) => {
        const deptId = generateId();
        const tIds: string[] = [];

        tpl.defaultTeams.forEach((dt) => {
          const teamId = generateId();
          tIds.push(teamId);
          newTeams.push({
            id: teamId,
            name: dt.name,
            type: dt.type,
            description: dt.description,
            leadEmail: "",
            memberEmails: [],
            parentDepartmentId: deptId,
            projectIds: [],
            color:
              TEAM_TYPE_OPTIONS.find((o) => o.value === dt.type)?.color ||
              "#6366F1",
          });
        });

        newDepts.push({
          id: deptId,
          name: tpl.name,
          description: tpl.description,
          headEmail: "",
          teamIds: tIds,
          color: tpl.color,
        });
      });

      onSetDepartments(newDepts);
      onSetTeams(newTeams);
    }
  }, [orgStructure, industry, departments.length, onSetDepartments, onSetTeams]);

  const addDepartment = () => {
    const deptId = generateId();
    onSetDepartments([
      ...departments,
      {
        id: deptId,
        name: "New Department",
        description: "",
        headEmail: "",
        teamIds: [],
        color:
          PROJECT_COLOR_OPTIONS[departments.length % PROJECT_COLOR_OPTIONS.length],
      },
    ]);
  };

  const updateDepartment = (id: string, data: Partial<OnboardingDepartment>) => {
    onSetDepartments(
      departments.map((d) => (d.id === id ? { ...d, ...data } : d))
    );
  };

  const deleteDepartment = (id: string) => {
    onSetDepartments(departments.filter((d) => d.id !== id));
    onSetTeams(teams.filter((t) => t.parentDepartmentId !== id));
  };

  const addTeam = (departmentId: string) => {
    const teamId = generateId();
    const dept = departments.find((d) => d.id === departmentId);
    onSetTeams([
      ...teams,
      {
        id: teamId,
        name: "New Team",
        type: "engineering",
        description: "",
        leadEmail: "",
        memberEmails: [],
        parentDepartmentId: departmentId,
        projectIds: [],
        color: "#6366F1",
      },
    ]);
    if (dept) {
      updateDepartment(departmentId, {
        teamIds: [...dept.teamIds, teamId],
      });
    }
  };

  const updateTeam = (id: string, data: Partial<OnboardingTeam>) => {
    onSetTeams(teams.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const deleteTeam = (id: string) => {
    const team = teams.find((t) => t.id === id);
    onSetTeams(teams.filter((t) => t.id !== id));
    if (team) {
      const dept = departments.find(
        (d) => d.id === team.parentDepartmentId
      );
      if (dept) {
        updateDepartment(team.parentDepartmentId, {
          teamIds: dept.teamIds.filter((tid) => tid !== id),
        });
      }
    }
  };

  const totalTeams = teams.length;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-sm font-semibold text-[#121312]/80">
          {orgStructure === "flat"
            ? "Your team"
            : "Departments & teams"}
        </label>
        <span className="text-[10px] font-medium text-[#121312]/40">
          {departments.length} dept{departments.length !== 1 ? "s" : ""} ·{" "}
          {totalTeams} team{totalTeams !== 1 ? "s" : ""}
        </span>
      </div>
      <p className="mb-4 text-xs text-[#121312]/40">
        {orgStructure === "flat"
          ? "Set up your team. You can always add more later."
          : "Customize departments and teams. Click names to edit. Use templates as a starting point."}
      </p>

      {/* Org tree visualization (mini) */}
      <div className="mb-4 flex items-center gap-1.5 overflow-x-auto pb-1">
        {departments.map((dept, i) => (
          <React.Fragment key={dept.id}>
            {i > 0 && (
              <span className="text-[#121312]/15 text-xs">→</span>
            )}
            <span
              className="inline-flex items-center gap-1 rounded-full border border-[#121312]/8 bg-white px-2.5 py-1 text-[10px] font-medium text-[#121312]/60 whitespace-nowrap"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: dept.color }}
              />
              {dept.name}
              <span className="text-[#121312]/25">
                ({teams.filter((t) => t.parentDepartmentId === dept.id).length})
              </span>
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Department cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              teams={teams}
              orgStructure={orgStructure}
              onUpdateDepartment={updateDepartment}
              onDeleteDepartment={deleteDepartment}
              onAddTeam={addTeam}
              onUpdateTeam={updateTeam}
              onDeleteTeam={deleteTeam}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* User team selector - which team does the onboarding user belong to? */}
      {totalTeams > 0 && (
        <UserTeamSelector
          teams={teams}
          departments={departments}
          userRole={userRole}
          userTeamId={userTeamId}
          onUserTeamChange={onUserTeamChange}
        />
      )}

      {/* Add department button */}
      {orgStructure !== "flat" && (
        <button
          type="button"
          onClick={addDepartment}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#121312]/10 py-3 text-xs font-medium text-[#121312]/40 transition-all hover:border-brand/30 hover:bg-brand/5 hover:text-[#121312]/70"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add department
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  Step 3 — Invite Members
// ══════════════════════════════════════════════════════════════════

function InviteMembers({
  invitees,
  teams,
  departments,
  onSetInvitees,
}: {
  invitees: OnboardingInvitee[];
  teams: OnboardingTeam[];
  departments: OnboardingDepartment[];
  onSetInvitees: (invitees: OnboardingInvitee[]) => void;
}) {
  const [emailInput, setEmailInput] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState<InviteeRole>("member");
  const [selectedTeamId, setSelectedTeamId] = React.useState<string>("");
  const [error, setError] = React.useState("");

  const addInvitee = () => {
    const email = emailInput.trim().toLowerCase();
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (invitees.some((i) => i.email === email)) {
      setError("Already invited");
      return;
    }
    onSetInvitees([...invitees, { email, role: selectedRole, teamId: selectedTeamId || undefined }]);
    setEmailInput("");
    setError("");
  };

  const removeInvitee = (email: string) => {
    onSetInvitees(invitees.filter((i) => i.email !== email));
  };

  const changeRole = (email: string, role: InviteeRole) => {
    onSetInvitees(
      invitees.map((i) => (i.email === email ? { ...i, role } : i))
    );
  };

  const changeTeam = (email: string, teamId: string) => {
    onSetInvitees(
      invitees.map((i) => (i.email === email ? { ...i, teamId: teamId || undefined } : i))
    );
  };

  // Group invitees by team
  const groupedByTeam = React.useMemo(() => {
    const groups: Record<string, OnboardingInvitee[]> = {};
    invitees.forEach((inv) => {
      const key = inv.teamId || "__unassigned__";
      if (!groups[key]) groups[key] = [];
      groups[key].push(inv);
    });
    return groups;
  }, [invitees]);

  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-[#121312]/80">
        Invite teammates
      </label>
      <p className="mb-4 text-xs text-[#121312]/45">
        Add members and assign them to teams. You can always invite more later.
      </p>

      {/* Invite form */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addInvitee();
              }
            }}
            placeholder="teammate@company.com"
            className="h-10 flex-1 rounded-xl border border-[#121312]/12 bg-white px-3.5 text-sm text-[#121312] outline-none transition-all placeholder:text-[#121312]/35 focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="button"
            onClick={addInvitee}
            className="h-10 rounded-xl bg-brand px-4 text-xs font-bold text-[#121312] transition-colors hover:bg-brand/80"
          >
            Add
          </button>
        </div>

        {/* Role and team selectors */}
        <div className="flex gap-2">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as InviteeRole)}
            className="h-9 flex-1 rounded-xl border border-[#121312]/12 bg-white px-3 text-xs font-medium text-[#121312]/65 outline-none focus:border-brand"
          >
            {INVITEE_ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} — {opt.description}
              </option>
            ))}
          </select>

          {teams.length > 0 && (
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="h-9 flex-1 rounded-xl border border-[#121312]/12 bg-white px-3 text-xs font-medium text-[#121312]/65 outline-none focus:border-brand"
            >
              <option value="">No team (assign later)</option>
              {departments.map((dept) => (
                <optgroup key={dept.id} label={dept.name}>
                  {teams
                    .filter((t) => t.parentDepartmentId === dept.id)
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          )}
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>

      {/* Invited list grouped by team */}
      <AnimatePresence>
        {invitees.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 overflow-hidden"
          >
            <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-[#121312]/35">
              {invitees.length} teammate{invitees.length !== 1 ? "s" : ""}{" "}
              invited
            </p>

            <div className="space-y-4">
              {/* Grouped by team */}
              {Object.entries(groupedByTeam).map(([teamId, members]) => {
                const team = teams.find((t) => t.id === teamId);
                const dept = team
                  ? departments.find(
                      (d) => d.id === team.parentDepartmentId
                    )
                  : null;

                return (
                  <div key={teamId}>
                    <p className="mb-1.5 text-[10px] font-bold text-[#121312]/40">
                      {team
                        ? `${dept ? dept.name + " → " : ""}${team.name}`
                        : "Unassigned"}
                    </p>
                    <div className="space-y-1.5">
                      {members.map((invitee, index) => (
                        <motion.div
                          key={invitee.email}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 12 }}
                          className="flex items-center gap-2.5 rounded-xl border border-[#121312]/6 bg-white p-2"
                        >
                          <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                            style={{
                              backgroundColor:
                                AVATAR_COLORS[index % AVATAR_COLORS.length],
                            }}
                          >
                            {getInitials(invitee.email)}
                          </div>
                          <span className="flex-1 truncate text-[12px] text-[#121312]/65">
                            {invitee.email}
                          </span>

                          {/* Change team */}
                          {teams.length > 0 && (
                            <select
                              value={invitee.teamId || ""}
                              onChange={(e) =>
                                changeTeam(invitee.email, e.target.value)
                              }
                              className="max-w-[100px] rounded-lg border border-[#121312]/8 bg-transparent px-1.5 py-0.5 text-[9px] font-medium text-[#121312]/50 outline-none"
                            >
                              <option value="">Unassigned</option>
                              {teams.map((t) => (
                                <option key={t.id} value={t.id}>
                                  {t.name}
                                </option>
                              ))}
                            </select>
                          )}

                          {/* Change role */}
                          <select
                            value={invitee.role}
                            onChange={(e) =>
                              changeRole(
                                invitee.email,
                                e.target.value as InviteeRole
                              )
                            }
                            className="rounded-lg border border-[#121312]/8 bg-transparent px-1.5 py-0.5 text-[9px] font-medium text-[#121312]/50 outline-none"
                          >
                            {INVITEE_ROLE_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={() => removeInvitee(invitee.email)}
                            className="text-[#121312]/20 hover:text-red-500 transition-colors"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  Main Component
// ══════════════════════════════════════════════════════════════════

export function TeamStep() {
  const {
    goNext,
    goBack,
    updateFormData,
    formData,
    markStepComplete,
    markStepSkipped,
    saveStep,
    skipStepOnServer,
  } = useOnboarding();

  const [subStep, setSubStep] = React.useState<SubStep>("structure");
  const [orgStructure, setOrgStructure] = React.useState<OrgStructureType>(
    formData.orgStructureType
  );
  const [departments, setDepartments] = React.useState<OnboardingDepartment[]>(
    formData.departments
  );
  const [teams, setTeams] = React.useState<OnboardingTeam[]>(formData.teams);
  const [userTeamId, setUserTeamId] = React.useState<string | null>(
    formData.userTeamId ?? null
  );
  const [invitees, setInvitees] = React.useState<OnboardingInvitee[]>(
    formData.invitees
  );

  // Reset departments/teams when structure type changes
  const prevStructure = React.useRef(orgStructure);
  React.useEffect(() => {
    if (prevStructure.current !== orgStructure) {
      prevStructure.current = orgStructure;
      setDepartments([]);
      setTeams([]);
      setUserTeamId(null);
    }
  }, [orgStructure]);

  // Auto-select user team when exactly one team matches role
  const compatibleTypes = formData.userRole ? (ROLE_TEAM_TYPE_MAP[formData.userRole] ?? []) : [];
  React.useEffect(() => {
    if (teams.length === 1 && !userTeamId) {
      setUserTeamId(teams[0].id);
    } else if (teams.length === 1 && userTeamId && !teams.find((t) => t.id === userTeamId)) {
      setUserTeamId(teams[0].id);
    } else if (teams.length > 1 && compatibleTypes.length > 0) {
      const singleMatch = teams.filter((t) => compatibleTypes.includes(t.type));
      if (singleMatch.length === 1 && !userTeamId) {
        setUserTeamId(singleMatch[0].id);
      }
    }
  }, [teams, compatibleTypes]); // eslint-disable-line react-hooks/exhaustive-deps

  const [isSending, setIsSending] = React.useState(false);
  const [sendError, setSendError] = React.useState<string | null>(null);

  const handleContinue = async () => {
    setIsSending(true);
    setSendError(null);

    try {
      // 1. Create departments on backend, mapping frontend IDs to backend IDs
      const deptIdMap = new Map<string, string>();
      for (const dept of departments) {
        const created = await createDepartment({
          name: dept.name,
          description: dept.description,
          head_email: dept.headEmail,
          color: dept.color,
        });
        deptIdMap.set(dept.id, created.id);
      }

      // 2. Create teams on backend with backend department IDs
      for (const team of teams) {
        const backendDeptId = deptIdMap.get(team.parentDepartmentId) ?? team.parentDepartmentId;
        await createTeam({
          department_id: backendDeptId,
          name: team.name,
          type: team.type,
          description: team.description,
          lead_email: team.leadEmail,
          color: team.color,
        });
      }

      // 3. Send invitations
      if (invitees.length > 0) {
        await sendInvitations(
          invitees.map((inv) => ({
            email: inv.email,
            role: inv.role,
            team_id: inv.teamId || undefined,
          })),
        );
      }

      // 4. Persist step on backend
      await saveStep("team", {
        orgStructureType: orgStructure,
        departments: departments.map((d) => ({ ...d })),
        teams: teams.map((t) => ({ ...t })),
        userTeamId,
        invitees: invitees.map((i) => ({ ...i })),
      });

      updateFormData({
        orgStructureType: orgStructure,
        departments,
        teams,
        teamName: departments[0]?.name || formData.workspaceName,
        userTeamId,
        invitees,
      });
      markStepComplete("team");
      goNext();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save team structure";
      setSendError(msg);
    } finally {
      setIsSending(false);
    }
  };

  const handleSkip = async () => {
    try {
      await skipStepOnServer("team");
    } catch {
      // best-effort
    }
    updateFormData({
      orgStructureType: orgStructure,
      departments: [],
      teams: [],
      userTeamId: null,
    });
    markStepSkipped("team");
    goNext();
  };

  const subSteps: { key: SubStep; label: string; icon: string }[] = [
    { key: "structure", label: "Structure", icon: "🏗️" },
    { key: "departments", label: "Departments", icon: "🏢" },
    { key: "invite", label: "Invite", icon: "👤" },
  ];

  const currentSubIndex = subSteps.findIndex((s) => s.key === subStep);

  const canProceedFromStructure = orgStructure !== undefined;
  const canProceedFromDepartments = departments.length > 0 && teams.length > 0;

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12">
          <span className="text-2xl">🏗️</span>
        </div>
        <h1 className="text-[28px] font-bold tracking-tight text-[#121312]">
          Define your team structure
        </h1>
        <p className="mt-1.5 text-sm text-[#121312]/50">
          Set up your organization so Voatomy maps everything correctly
        </p>
      </motion.div>

      {/* Sub-step indicator */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {subSteps.map((s, i) => (
          <React.Fragment key={s.key}>
            {i > 0 && (
              <div
                className={cn(
                  "h-[2px] w-6 rounded-full transition-colors",
                  i <= currentSubIndex ? "bg-brand" : "bg-[#121312]/10"
                )}
              />
            )}
            <button
              type="button"
              onClick={() => {
                // Only allow going back, not forward
                if (i <= currentSubIndex) setSubStep(s.key);
              }}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-all",
                subStep === s.key
                  ? "bg-brand/12 text-[#121312] font-semibold"
                  : i < currentSubIndex
                    ? "text-[#121312]/60 hover:bg-[#121312]/5"
                    : "text-[#121312]/30 cursor-default"
              )}
            >
              <span className="text-xs">{s.icon}</span>
              {s.label}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Sub-step content */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-5 text-left"
      >
        <AnimatePresence mode="wait">
          {subStep === "structure" && (
            <motion.div
              key="structure"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <OrgStructureSelector
                value={orgStructure}
                companySize={formData.companySize as string}
                onChange={setOrgStructure}
              />
            </motion.div>
          )}

          {subStep === "departments" && (
            <motion.div
              key="departments"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DepartmentTeamBuilder
                orgStructure={orgStructure}
                departments={departments}
                teams={teams}
                industry={formData.industry as string}
                userRole={formData.userRole as string}
                userTeamId={userTeamId}
                onSetDepartments={setDepartments}
                onSetTeams={setTeams}
                onUserTeamChange={setUserTeamId}
              />
            </motion.div>
          )}

          {subStep === "invite" && (
            <motion.div
              key="invite"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <InviteMembers
                invitees={invitees}
                teams={teams}
                departments={departments}
                onSetInvitees={setInvitees}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tip */}
        <div className="rounded-xl bg-[#121312]/[0.03] p-3 text-center">
          <p className="text-[11px] text-[#121312]/40">
            {subStep === "structure" &&
              "💡 Your org structure helps Voatomy route sprint plans, signals, and reports to the right teams."}
            {subStep === "departments" &&
              "💡 Click any name to edit. Drag to reorder. These map to workspaces across all Voatomy products."}
            {subStep === "invite" &&
              "💡 Invitees get an email to join. Assigning them to a team gives them the right dashboards from day one."}
          </p>
        </div>

        {sendError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <p className="font-medium">Failed to send invitations</p>
            <p className="mt-1 text-red-600/80">{sendError}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              if (subStep === "structure") {
                goBack();
              } else if (subStep === "departments") {
                setSubStep("structure");
              } else {
                setSubStep("departments");
              }
            }}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[#121312]/12 text-sm font-medium text-[#121312]/60 transition-all hover:bg-[#121312]/5"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>

          {subStep === "invite" && invitees.length === 0 ? (
            <button
              type="button"
              onClick={handleSkip}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[#121312]/12 text-sm font-medium text-[#121312]/55 transition-all hover:bg-[#121312]/5"
            >
              Skip invites
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => {
              if (subStep === "structure" && canProceedFromStructure) {
                setSubStep("departments");
              } else if (
                subStep === "departments" &&
                canProceedFromDepartments
              ) {
                setSubStep("invite");
              } else if (subStep === "invite") {
                handleContinue();
              }
            }}
            disabled={
              isSending ||
              (subStep === "structure" && !canProceedFromStructure) ||
              (subStep === "departments" && !canProceedFromDepartments)
            }
            className={cn(
              "flex h-12 flex-[2] items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200",
              (subStep === "structure" && canProceedFromStructure) ||
              (subStep === "departments" && canProceedFromDepartments) ||
              subStep === "invite"
                ? "bg-brand text-[#121312] shadow-sm hover:shadow-md active:scale-[0.98]"
                : "bg-[#121312]/8 text-[#121312]/35 cursor-not-allowed"
            )}
          >
            {isSending ? "Sending invites…" : subStep === "invite" ? "Continue" : "Next"}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

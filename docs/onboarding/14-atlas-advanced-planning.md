# ATLAS: Advanced Planning and Sprint Operations

This document defines ATLAS behavior for complex real-world teams: multi-role organizations, multiple projects, variable sprint durations, mid-sprint integrations, and ongoing sprint operations (comments, reminders, close detection, and reporting).

Goals:
- Make planning useful for every role without forcing everyone into the same workflow.
- Support multiple teams and multiple projects without “one sprint fits all” assumptions.
- Respect existing boards and active sprints. Never break a team’s workflow mid-sprint.
- Improve over time by learning board structure, velocity, and outcomes.

Non-goals:
- Replacing Jira/ClickUp. ATLAS can work with them, not against them.
- Enforcing a single process. ATLAS adapts to how teams already operate.

---

## Role-Aware Planning

ATLAS tailors recommendations and UI defaults based on the user’s role.

Role behaviors:
- Engineer: surfaces dependency/risk details, code hotspots, and “why complexity” evidence.
- Tech Lead: emphasizes critical path, architectural risk, and PR/merge readiness.
- Engineering Manager: focuses on capacity, staffing, and sprint predictability metrics.
- Product Manager: focuses on scope tradeoffs, goal clarity, and roadmap alignment.
- Designer: emphasizes UX scope, design dependencies, and validation tasks.
- QA: emphasizes test coverage, regression risk, acceptance criteria, and release gates.
- DevOps/SRE: emphasizes on-call load, incident impact, and operational capacity buffers.

Outputs vary by role:
- Engineers see “why complexity” first.
- PMs see “goal + scope + risks” first.
- EMs see “capacity + confidence + variance” first.

---

## Sprint Duration and Cadence

Supported sprint durations:
- 1 week
- 2 weeks
- 3 weeks
- 4 weeks
- Continuous delivery (rolling window)

Capacity model factors:
- Sprint length (business days)
- Team member availability (PTO, on-call rotations, part-time)
- Multi-project allocation (percent split per project)
- Operational overhead (meetings, support, incident buffers)

Planning windows:
- Standard sprint: plan to the sprint end date.
- Continuous: plan to a rolling 7–14 day window with weekly re-plan checkpoints.

---

## Multiple Projects and Multi-Project Contributors

Problems to solve:
- One person contributes to multiple projects in the same sprint.
- A sprint board may exist per project, or as a shared board across projects.

ATLAS approach:
- Maintain a “project allocation” per member (default inferred, editable).
- Assign tasks to a project even if the board is shared.
- Provide planning views:
  - Per project plan
  - Per team plan
  - Per person workload view (across projects)

Rules:
- No task is unowned. Each task has an owner or a clear “unassigned” label.
- Planning must show cross-project contention (same engineer on two critical tasks).

---

## Multiple Teams and Multi-Team Roles

When a role implies multi-team scope:
- CTO/VP or EM: defaults to multi-team overview and per-team capacity controls.
- PM: defaults to project view with team mappings.

ATLAS supports:
- Different sprint durations per team.
- Different board structures per team.
- A shared “company sprint goal” plus team-level goals.

---

## Mid-Sprint Integration (Do Not Disrupt)

When ATLAS is connected in the middle of an active sprint:
- Detect active sprint and its state (start date, end date, remaining days).
- Detect WIP and in-progress tickets.

Offer a clear choice:
- Observe current sprint (recommended): do not re-plan; enhance tickets with insight and risks.
- Plan next sprint: import backlog and produce a next-sprint recommendation.
- Validate current plan: compare the existing sprint’s estimates vs ATLAS complexity.
- Start fresh anyway: build a manual plan without importing board state.

Hard rule:
- ATLAS never auto-moves tickets, changes statuses, or edits points without explicit user confirmation and the required integration permissions.

---

## Learn Board Structure Before Planning

Before generating a plan from a board:
- Learn statuses and workflow stages (Backlog, Ready, In Progress, Done).
- Detect custom fields used for planning (points, priority, component, sprint, assignee).
- Learn issue types and “work class” (feature, bug, chore, incident, debt).
- Learn naming conventions and ticket key formats.

Normalization:
- Create a board profile mapping source fields to ATLAS canonical fields.
- Detect missing or inconsistent data and suggest fixes:
  - “Points field missing”
  - “Three ‘done’ statuses; which is final?”
  - “Sprints are named inconsistently”

Planning uses the learned profile:
- Estimate confidence increases when the profile is stable over time.

---

## Ticket Commenting and Collaboration

If Jira/ClickUp is connected with permission to comment:
- Add an optional “ATLAS plan comment” to each planned ticket.
- Comment includes:
  - planned sprint identifier
  - confidence score
  - key risks/dependencies summary
  - “why complexity” short rationale

Commenting rules:
- Default off for first plan. Ask for consent.
- Allow per-project toggles (some teams don’t want automation noise).
- Rate-limit and batch comments to avoid spam.

---

## Sprint Close Detection

Detect sprint close via:
- Jira/ClickUp sprint closed event, or cycle end time, or a team-defined “done cutoff”.

On sprint close:
- Generate a sprint report automatically.
- Ask for lightweight outcomes:
  - delivered items
  - carried-over work
  - blockers
  - learnings

ATLAS learning loop:
- Update velocity and calibration based on actual completion.
- Adjust confidence scoring and capacity buffers for next sprint.

---

## Reminders and Notifications

After a sprint is planned:
- Notify the team (Slack/Teams/email) with:
  - sprint goal
  - scope summary
  - risk highlights
  - top dependencies

During sprint:
- WIP drift alert when too many “in progress” tasks appear.
- Mid-sprint “checkpoint” reminder to re-sync if scope changed.

Before sprint close:
- “Close-ready” reminder with a checklist:
  - ensure ticket statuses reflect reality
  - mark carry-overs
  - capture blockers

---

## Reports and Breakdowns

ATLAS can generate:
- Sprint summary report (scope, confidence, risks, delivered vs planned).
- Capacity report (planned points vs available capacity by person and team).
- Variance report (where estimates deviated and why).
- Project breakdown (multi-project contributors, cross-project bottlenecks).
- Board hygiene report (missing fields, inconsistent statuses, unowned tickets).

Export options:
- PDF
- CSV
- Linkable “Sprint Report” page inside Voatomy

---

## Related Docs

- `/Users/oluwafemibabalola/Documents/IDEAS/voatomy-landing/docs/onboarding/06-first-sprint.md`
- `/Users/oluwafemibabalola/Documents/IDEAS/voatomy-landing/docs/onboarding/10-existing-sprint-import.md`
- `/Users/oluwafemibabalola/Documents/IDEAS/voatomy-landing/docs/onboarding/15-jira-clickup-board-setup.md`


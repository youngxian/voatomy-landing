# Onboarding: Start Fresh Flow

This document defines the "Start fresh" onboarding path: a blank-slate setup that does not require connecting a repo or importing Jira/Linear data.

Goals:
- Reduce anxiety for teams without clean data.
- Get users to a first usable plan in minutes.
- Keep the door open for integrations later without punishing the "fresh start" choice.

Non-goals:
- Perfect estimates. This path optimizes for momentum and clarity.
- Mandatory integrations. Users can connect sources later.

---

## Where It Lives

- Step 1 (Welcome): Users can choose `Starting fresh`.
- Step 2 (Connect): If the onboarding path is `scratch`, users see a dedicated "Start fresh" screen (not the generic import list).
- Step 5 (Plan): If `planMode=manual`, users see a manual plan builder (not the repo analysis simulation).

---

## UX Flow (Happy Path)

### Step 1: Welcome
User selects:
- Workspace name + slug
- Role + team size
- Sprint methods: select `Starting fresh`
- Startup idea template (NEXUS/SIGNAL/LOOP/DRIFT/ATLAS/PHANTOM)

Behavior:
- `Starting fresh` is exclusive. Selecting it clears other sprint-method selections.
- On submit, onboarding path is set to `scratch` (blank slate wins even if the user is a developer).

### Step 2: Start Fresh (Connect)
Screen title: `Start fresh`
Supporting text:
- "No repo or Jira required. Add a few tasks and Voatomy will build your first sprint plan. You can connect tools later."

Components:
- Starter tasks card:
  - Default 3-5 suggested tasks based on the selected startup idea template
  - Each task includes a title input and a lightweight points selector (1,2,3,5,8)
  - "Use suggested" resets the list to template defaults
  - "Add task" appends a blank row
  - Remove action per row
  - Total points indicator
- Primary CTA: `Continue` (disabled until at least one task title exists)
- Secondary link: `Prefer to import data instead?` (returns user to the generic import screen)

State updates on `Continue`:
- `onboardingPath="scratch"`
- `dataSources=["scratch"]`
- `planMode="manual"`
- `providerConnected=false`
- `manualSprintTasks=[...]` (non-empty titles only)
- Mark Step 2 complete; proceed to Team step

### Step 4: Team
User can invite teammates or skip.
Proceed to Plan step.

### Step 5: Manual Plan Builder
Screen title: `Build your first sprint plan`
Supporting text:
- "You’re starting from a blank slate. Add tasks and rough story points, then Voatomy will turn it into a structured plan."

Components:
- Task list editor (same interaction model as Step 2):
  - Edit tasks + points
  - Add/remove rows
  - Total points indicator
- Primary CTA: `Finalize plan` (disabled until at least one task title exists)

State updates on `Finalize plan`:
- `manualSprintTasks=[...]` (non-empty titles only)
- `firstPlanGenerated=true`
- Mark Step 5 complete

---

## UX Flow (Alternate Paths)

### Switch to Import From Start Fresh
User clicks: `Prefer to import data instead?`

Behavior:
- Reset to import screen while keeping the user’s Step 1 information.
- Clear `dataSources` and set `onboardingPath="non-dev"` and `planMode="sample"` (until a real source is connected).

### Developer Still Wants Fresh Start
Even if user is a developer, selecting `Starting fresh` in Step 1 routes them to the fresh-start setup. They can connect repos later.

---

## Content Guidelines

Voice:
- Calm, directive, non-judgmental.
- Avoid implying "no repo" is a deficiency.

Microcopy:
- Emphasize reversibility: "You can connect tools later."
- Emphasize speed to value: "first plan" and "in minutes".

---

## Data Model Additions

`OnboardingFormData`:
- `manualSprintTasks: { id: string; title: string; points: number }[]`

Defaults:
- Empty list by default; prefilled with template suggestions when entering the Start Fresh screen.

---

## Accessibility

- Task remove buttons must have `aria-label`.
- Inputs must be keyboard navigable.
- Disabled CTA must have a clear hint ("Add at least one task to continue.").


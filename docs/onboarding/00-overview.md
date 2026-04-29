# Onboarding System — Overview

> **CANONICAL SOURCE** — This is the single source of truth for all Voatomy onboarding.
> LOOP, ATLAS, and all other product onboarding flows are handled here at `/onboard` on the main landing site (`voatomy-landing`).
> There is **no separate onboarding** in `loop-app` or `atlas-app` — those apps redirect to `/dashboard` post-onboarding.

> The complete onboarding experience from post-auth to first AI sprint plan.
> Read this first to understand the full journey, then dive into individual step docs.

---

## What Is Onboarding?

Onboarding is the **unified bridge** between **signing up** and **seeing value** across all Voatomy products. It starts the moment a user finishes authentication and ends when they generate their first AI sprint plan, signal analysis, or product-specific first-value moment. Every step is designed to reduce time-to-value while building trust.

The user's **Startup Idea Template** (from `MEGA_STARTUP_IDEAS.md`) is captured in Step 1 so the workspace, integrations, and first-plan recommendations are tailored to the product they are building with (NEXUS, SIGNAL, LOOP, DRIFT, ATLAS, or PHANTOM). This single flow replaces the previously separate onboarding experiences that existed in `loop-app` and `atlas-app`.

### Cross-Product Onboarding Architecture

```
 voatomy-landing/onboard        loop-app                atlas-app
 ════════════════════════        ════════                ═════════
 UNIFIED ONBOARDING FLOW        /onboarding → redirect  /onboarding/* → redirect
                                to /dashboard           to /dashboard
 Step 1: Welcome + Template
   → LOOP → signal sources      All LOOP-specific       All ATLAS-specific
   → ATLAS → boards + repos     onboarding logic        onboarding logic
   → PHANTOM → repo analysis    handled here via         handled here via
   → SIGNAL → incident setup    template selection       template selection
   → DRIFT → design systems
   → NEXUS → full platform

 Step 2-5: Adapts per template
```

---

## The Golden Rule

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │   "The user should generate their first AI sprint plan within   │
 │    5 minutes of completing signup — or less."                   │
 │                                                                  │
 │   That's the North Star metric for onboarding success.          │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

---

## The Full Journey: Source to Destination

### Developer Path (Has Code Repos)

```
 AUTH (Source)                      ONBOARDING (Bridge)                         DASHBOARD (Destination)
 ═══════════                       ═══════════════════                         ════════════════════════

 ┌──────────┐    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
 │          │    │              │  │              │  │              │  │              │  │              │
│  Sign Up │    │  STEP 1      │  │  STEP 2A     │  │  STEP 3      │  │  STEP 4      │  │  STEP 5      │
│    or    │───>│  Welcome &   │─>│  Connect     │─>│  Select      │─>│  Invite      │─>│  First       │
│  Log In  │    │  Workspace   │  │  Repository  │  │  Repos       │  │  Team        │  │  Sprint Plan │
│          │    │  + Product   │  │              │  │              │  │              │  │  (AI code    │
│          │    │  Flow Intro  │  │              │  │              │  │              │  │  analysis)   │
│          │    │  + Idea      │  │              │  │              │  │              │  │              │
│          │    │  Template    │  │              │  │              │  │              │  │              │
 └──────────┘    └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
                       │                 │                 │                 │                 │
                   REQUIRED          RECOMMENDED       REQUIRED          OPTIONAL         AUTO-GENERATED
                                    (can skip)        (if connected)    (can skip)
                       │                 │                 │                 │                 │
                   ~30 sec           ~45 sec            ~30 sec          ~30 sec           ~60 sec
                       │                 │                 │                 │                 │
                       └─────────────────┴─────────────────┴─────────────────┴─────────────────┘
                                                Total: ~3 minutes
```

### Non-Developer Path (No Repos — PM, Designer, Founder, Ops)

```
 AUTH (Source)                      ONBOARDING (Bridge)                         DASHBOARD (Destination)
 ═══════════                       ═══════════════════                         ════════════════════════

 ┌──────────┐    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
 │          │    │              │  │              │  │              │  │              │
│  Sign Up │    │  STEP 1      │  │  STEP 2B     │  │  STEP 4      │  │  STEP 5      │
│    or    │───>│  Welcome &   │─>│  Connect     │─>│  Invite      │─>│  Sprint Plan │
│  Log In  │    │  Workspace   │  │  Your Data   │  │  Team        │  │  (import or  │
│          │    │  + Product   │  │  (Jira/CSV/  │  │              │  │  manual      │
│          │    │  Flow Intro  │  │  Notion/     │  │              │  │  builder)    │
│          │    │  + Idea      │  │  scratch)    │  │              │  │              │
│          │    │  Template    │  │              │  │              │  │              │
 │          │    │              │  │  scratch)    │  │              │  │              │
 └──────────┘    └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
                       │                 │                 │                 │
                   REQUIRED          RECOMMENDED          OPTIONAL         VARIES
                                    (can skip/scratch)    (can skip)
                       │                 │                 │                 │
                   ~30 sec           ~60 sec            ~30 sec           ~60 sec
                       │                 │                 │                 │
                       └─────────────────┴─────────────────┴─────────────────┘
                                            Total: ~3 minutes
```

### Existing Sprint User Path (Active Sprint in Jira/Linear)

```
 AUTH (Source)                      ONBOARDING (Bridge)                         DASHBOARD (Destination)
 ═══════════                       ═══════════════════                         ════════════════════════

 ┌──────────┐    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
 │          │    │              │  │              │  │              │  │              │  │              │
│  Sign Up │    │  STEP 1      │  │  STEP 2B     │  │  Import      │  │  STEP 4      │  │  STEP 5      │
│    or    │───>│  Welcome &   │─>│  Connect     │─>│  Wizard      │─>│  Invite      │─>│  Enhanced    │
│  Log In  │    │  Workspace   │  │  Your Data   │  │  (active     │  │  Team        │  │  Sprint      │
│          │    │  + Product   │  │  (Jira/      │  │  sprint /    │  │              │  │  Review      │
│          │    │  Flow Intro  │  │  Linear)     │  │  backlog /   │  │              │  │              │
│          │    │  + Idea      │  │              │  │  review)     │  │              │  │              │
│          │    │  Template    │  │              │  │              │  │              │  │              │
 │          │    │              │  │              │  │  review)     │  │              │  │              │
 └──────────┘    └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
                       │                 │                 │                 │                 │
                   REQUIRED          REQUIRED           CONTEXTUAL        OPTIONAL         AI-ENHANCED
                                                       (smart wizard)    (can skip)
```

---

## Route Map

```
 ROUTE                         WHAT IT DOES                           STEP
 ───────────────────────────  ────────────────────────────────────   ──────
 /onboard                     Welcome + workspace + idea template    Step 1
 /onboard/connect              Connect code repository               Step 2
 /onboard/repos                Select repositories to analyze        Step 3
 /onboard/team                 Invite team members                   Step 4
 /onboard/first-plan           Generate first AI sprint plan         Step 5
 /dashboard                    Main product dashboard                Destination
```

---

## Startup Idea Templates (Step 1)

Users select one startup idea template in the Welcome step to personalize onboarding recommendations:

- `NEXUS` — AI Organizational Nerve Center
- `SIGNAL` — Revenue-Aware Incident Intelligence
- `LOOP` — Product-Revenue Feedback Engine
- `DRIFT` — AI Design System Guardian + Revenue Optimizer
- `ATLAS` — AI Sprint Planner
- `PHANTOM` — AI Technical Debt Radar

See: `docs/onboarding/12-startup-idea-templates.md`

---

## Who Arrives at Onboarding?

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                          │
 │  USER TYPE               HOW THEY ARRIVED          WHAT THEY SKIP                       │
 │  ──────────────────────  ────────────────────────  ──────────────────────────────────── │
 │  New signup (social)     Google/GitHub OAuth        Step 2 may pre-link repo             │
 │  New signup (email)      Email + OTP                Nothing (full journey)               │
 │  Non-dev signup          Google OAuth               Step 2 → "Connect your data" path   │
 │  Existing sprint user    Any method                 Step 2 → Import wizard path          │
 │  Invited member          Invitation link            Steps 1, 2, 3 (join existing)       │
 │  Returning (incomplete)  Session restored           Resume from last step                │
 │  Demo explorer           "View demo workspace"      All (demo data shown)               │
 │                                                                                          │
 └──────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Onboarding by Persona

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                                  │
 │  PERSONA                STEPS THEY TAKE                TIME       WHAT THEY CARE ABOUT          │
 │  ──────────────────────  ──────────────────────────── ──────────  ──────────────────────────── │
 │  Sarah K. (EM)           1 → 2A(repo) → 3 → 4 → 5    ~3 min      Sprint accuracy, team        │
 │  Marcus T. (VP Product)  1 → 2B(Jira) → 4 → 5         ~2 min      Revenue metrics, speed       │
 │  Priya S. (Tech Lead)    Invited → 2A → 3 → 5          ~90 sec     Code complexity, trust       │
 │  James L. (CTO)          1 → 2A → 3 → 4 → 5           ~4 min      Enterprise, security         │
 │  Adam J. (Invited)       Invited → 5                    ~30 sec     Just see the plan            │
 │  Lisa M. (PM)            1 → 2B(Jira) → 4 → 5          ~2 min      Backlog import, estimates    │
 │  David R. (Founder)      1 → 2B(scratch) → 4 → 5       ~2 min      Quick start, manual tasks    │
 │  Nina S. (Project Mgr)   1 → 2B(CSV) → 4 → 5           ~3 min      Spreadsheet import, mapping  │
 │                                                                                                  │
 └──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Design Principles

```
 PRINCIPLE                  WHY                                 HOW
 ────────────────────────  ────────────────────────────────    ──────────────────────────────────
 1. Show value early        Users need a reason to continue    Preview AI insights during setup
 2. Never dead-end          Every step has a clear next CTA    Always show progress + exit path
 3. Skip-friendly           Not everyone needs every step      "Skip for now" is always visible
 4. Trust through           Users grant repo access here       Security badges on every step
    transparency
 5. Contextual help         Don't assume knowledge             Tooltips, microcopy, inline FAQs
 6. Resume-safe             Users might close the tab          Save progress, restore on return
 7. Celebrate wins          Dopamine hits drive completion     Confetti, success messages, stats
```

---

## Progress Indicator

Every onboarding step shows a persistent progress bar at the top:

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  Step 2 of 5 — Connect Repository                               │
 │                                                                  │
 │  [●━━━━━━━●━━━━━━━○━━━━━━━○━━━━━━━○]                            │
 │   Welcome  Connect   Repos    Team    Plan                       │
 │                                                                  │
 │  ┌──────────────────────────────────────────────────────────┐    │
 │  │  Step content goes here                                  │    │
 │  │                                                          │    │
 │  │  ...                                                     │    │
 │  │                                                          │    │
 │  │  ┌──────────────────┐  ┌──────────────────────────────┐  │    │
 │  │  │    Skip for now  │  │      Continue                │  │    │
 │  │  └──────────────────┘  └──────────────────────────────┘  │    │
 │  └──────────────────────────────────────────────────────────┘    │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

### Progress States

```
 STATE         VISUAL                  MEANING
 ───────────  ────────────────────    ────────────────────────
 Completed     ● (green filled)       User finished this step
 Current       ● (green pulsing)      User is on this step
 Upcoming      ○ (gray outline)       Not yet reached
 Skipped       ◐ (half-filled gray)   Skipped, can return
```

---

## Layout: Onboarding Shell

The onboarding uses a **full-viewport, centered layout** different from the auth split-screen:

```
 ┌────────────────────────────────────────────────────────────────┐
 │                                                                │
 │  ┌──┐                                                          │
 │  │//│ Voatomy                              [?] Help   [X] Exit │
 │  └──┘                                                          │
 │                                                                │
 │  ──────────────────── Progress Bar ────────────────────────── │
 │                                                                │
 │  ┌──────────────────────────────────────────────────────────┐  │
 │  │                                                          │  │
 │  │                                                          │  │
 │  │                    STEP CONTENT                          │  │
 │  │                    (max-w-640px)                         │  │
 │  │                    centered                              │  │
 │  │                                                          │  │
 │  │                                                          │  │
 │  └──────────────────────────────────────────────────────────┘  │
 │                                                                │
 │  ┌──────────────────────────────────────────────────────────┐  │
 │  │                                                          │  │
 │  │   CONTEXTUAL SIDEBAR (optional, slides in on desktop)   │  │
 │  │   Shows: security info, tips, or live preview           │  │
 │  │                                                          │  │
 │  └──────────────────────────────────────────────────────────┘  │
 │                                                                │
 └────────────────────────────────────────────────────────────────┘
```

### Responsive Behavior

```
 BREAKPOINT       LAYOUT
 ──────────────  ──────────────────────────────────────────
 Desktop (1024+)  Center card (640px) + optional sidebar
 Tablet (768)     Full-width card, no sidebar
 Mobile (<768)    Full-width, compact spacing, stacked CTAs
```

---

## Key Metrics to Track

```
 METRIC                            TARGET          WHY
 ────────────────────────────────  ──────────────  ────────────────────────────────────
 Time to first sprint plan         < 5 minutes     Core activation metric
 Onboarding completion rate        > 70%           Full flow (all 5 steps)
 Repo connection rate              > 60%           Critical for product value
 Team invitation rate              > 40%           Viral growth driver
 Skip rate per step                < 30%           High skips = confusing/scary step
 Return completion rate            > 50%           Users who left and came back
 Drop-off by step                  Track per step  Identifies problem areas
```

---

## State Management

Onboarding progress is persisted to the database:

```
 FIELD                   TYPE        PURPOSE
 ────────────────────   ──────────  ────────────────────────────────────
 onboarding_completed    boolean     true when user finishes all steps
 onboarding_step         integer     Last completed step (1-5)
 onboarding_path         string      "developer" | "non-dev" | "import" | "scratch"
 workspace_created       boolean     Workspace name set
 user_role               string      Selected role (EM, PM, Engineer, etc.)
 sprint_method           string[]    How they plan sprints (Jira, repos, scratch, etc.)
 data_source             string      "github" | "jira" | "csv" | "notion" | "scratch"
 repo_connected          boolean     At least one provider connected
 repos_selected          string[]    List of selected repo IDs
 import_source           string      Jira project, Linear workspace, or CSV file
 active_sprint_imported  boolean     User has an active sprint from import
 backlog_imported        boolean     User imported a backlog
 team_invited            boolean     At least one invitation sent
 first_plan_generated    boolean     First AI sprint plan created
 plan_mode               string      "ai_code" | "ai_import" | "manual" | "sample"
 products_active         string[]    Active products (starts with ["atlas"])
 products_teased         string[]    Products user has seen teasers for
 onboarding_skipped_at   integer     Step where user chose "Skip all"
```

---

## Exit & Re-entry

```
 SCENARIO                           BEHAVIOR
 ─────────────────────────────────  ──────────────────────────────────────────────
 User closes tab mid-onboarding     Progress saved. On next login, resume from
                                    last incomplete step.

 User clicks "Exit" / "X"           Modal: "You can complete setup later from
                                    Settings. Skip to dashboard?"
                                    [Continue setup] [Go to dashboard]

 User clicks "Skip all"             Modal: "You'll get more value with a
                                    connected repo. Skip anyway?"
                                    [Connect repo] [Skip to dashboard]
                                    Lands on dashboard with setup prompts.

 User returns after completing      No onboarding shown. Dashboard directly.

 User returns with incomplete       Banner on dashboard: "Finish setting up
 onboarding                        your workspace. [Resume setup]"
```

---

## File Index

```
 docs/onboarding/
 ├── 00-overview.md                You are here
 ├── 01-welcome-step.md            Welcome screen + workspace creation + product flow
 ├── 02-connect-repo.md            Connect data source (repo or import or scratch)
 ├── 03-select-repos.md            Choose which repos/boards to analyze
 ├── 04-team-setup.md              Invite team members + set roles
 ├── 05-integration-connect.md     Connect tools (Jira, Slack, Figma, etc.)
 ├── 06-first-sprint.md            Generate first AI sprint plan + product teasers
 ├── 07-persona-journeys.md        Per-persona onboarding paths (all scenarios)
 ├── 08-empty-states.md            Empty states, tooltips, progressive disclosure
 ├── 09-no-repo-scenarios.md       Non-developer & no-repository user paths
 ├── 10-existing-sprint-import.md  Active sprint, backlog, and history import flows
 └── 11-product-ecosystem.md       ATLAS, LOOP, SIGNAL, DRIFT, PHANTOM, NEXUS integration
```

---

## Next Steps

| If you want to...                           | Read this doc |
|---------------------------------------------|---------------|
| See the welcome screen + product flow       | `01-welcome-step.md` |
| Understand data connection flow             | `02-connect-repo.md` |
| See how repo/board selection works          | `03-select-repos.md` |
| Understand team invitation UX              | `04-team-setup.md` |
| See tool integration setup                 | `05-integration-connect.md` |
| See how the first plan is generated         | `06-first-sprint.md` |
| See per-persona onboarding journeys         | `07-persona-journeys.md` |
| Understand empty states & tooltips          | `08-empty-states.md` |
| See non-developer / no-repo paths           | `09-no-repo-scenarios.md` |
| See existing sprint & backlog import flows  | `10-existing-sprint-import.md` |
| See the full product ecosystem integration  | `11-product-ecosystem.md` |

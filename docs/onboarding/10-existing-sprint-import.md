# Existing Sprint & Backlog Import Scenarios

> Users who already have active sprints, backlogs, and sprint history in another tool. This doc covers how Voatomy handles importing existing workflows without disrupting them.

---

## The Core Challenge

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  Users with existing sprint planning face a unique dilemma:             │
 │                                                                          │
 │  1. They already have an active sprint in progress                      │
 │  2. They have a backlog with prioritized items                          │
 │  3. They have sprint history and velocity data                          │
 │  4. They have team assignments and workload distribution                │
 │                                                                          │
 │  Voatomy must NOT:                                                      │
 │  • Force them to start over                                             │
 │  • Ignore their existing data                                           │
 │  • Create confusion with duplicate data                                 │
 │  • Break their current workflow mid-sprint                              │
 │                                                                          │
 │  Voatomy MUST:                                                          │
 │  • Respect what they've already built                                   │
 │  • Enhance their existing data with AI insights                         │
 │  • Let them keep using their current tool (if desired)                  │
 │  • Offer a smooth migration path at their own pace                      │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## Who Has Existing Sprint Data?

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                          │
 │  SCENARIO               TOOL         WHAT THEY HAVE          WHAT THEY WANT             │
 │  ──────────────────────  ──────────  ──────────────────────  ──────────────────────────  │
 │  Active sprint in Jira   Jira        Sprint 14 running,      Better estimates, keep     │
 │                                      8 tasks in progress      current sprint going       │
 │                                                                                          │
 │  Backlog in Linear       Linear      200+ issues, cycles,    AI-enhanced prioritization │
 │                                      custom workflows                                    │
 │                                                                                          │
 │  Spreadsheet tracker     Excel/      History of 10 sprints,  Move to a real tool,       │
 │                          Sheets      velocity calculated      keep history                │
 │                                                                                          │
 │  Notion board            Notion      Kanban board with        Import without losing      │
 │                                      50+ items, statuses      board structure             │
 │                                                                                          │
 │  Multiple tools          Jira +      Scattered data across    Consolidate into one       │
 │                          Sheets      tools, no single view    source of truth             │
 │                                                                                          │
 │  Post-estimation phase   Any         Sprint already planned,  Add AI complexity scores   │
 │                                      just want validation     as a second opinion         │
 │                                                                                          │
 └──────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Decision Point: What to Import

After connecting a data source (Jira, Linear, etc.), the user sees a smart import wizard:

### Import Wizard — Step 1: What's Your Situation?

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                                                                        │
 │              What describes your situation best?                       │
 │                                                                        │
 │  ┌──────────────────────────────────────────────────────────────┐      │
 │  │                                                              │      │
 │  │  ┌────────────────────────────────────────────────────────┐  │      │
 │  │  │                                                        │  │      │
 │  │  │  🏃 I have an active sprint running                    │  │      │
 │  │  │                                                        │  │      │
 │  │  │  Don't touch my current sprint — just import           │  │      │
 │  │  │  it for tracking and enhance future sprints.          │  │      │
 │  │  │                                                        │  │      │
 │  │  └────────────────────────────────────────────────────────┘  │      │
 │  │                                                              │      │
 │  │  ┌────────────────────────────────────────────────────────┐  │      │
 │  │  │                                                        │  │      │
 │  │  │  📋 I have a backlog ready for next sprint             │  │      │
 │  │  │                                                        │  │      │
 │  │  │  Import my backlog and let ATLAS plan the              │  │      │
 │  │  │  next sprint with AI-powered estimates.               │  │      │
 │  │  │                                                        │  │      │
 │  │  └────────────────────────────────────────────────────────┘  │      │
 │  │                                                              │      │
 │  │  ┌────────────────────────────────────────────────────────┐  │      │
 │  │  │                                                        │  │      │
 │  │  │  📊 I want ATLAS to review my current estimates        │  │      │
 │  │  │                                                        │  │      │
 │  │  │  Keep my plan, but show me where ATLAS thinks          │  │      │
 │  │  │  I've over or under-estimated tasks.                  │  │      │
 │  │  │                                                        │  │      │
 │  │  └────────────────────────────────────────────────────────┘  │      │
 │  │                                                              │      │
 │  │  ┌────────────────────────────────────────────────────────┐  │      │
 │  │  │                                                        │  │      │
 │  │  │  🔄 I want to start fresh with ATLAS                   │  │      │
 │  │  │                                                        │  │      │
 │  │  │  Ignore my current data and let ATLAS build a          │  │      │
 │  │  │  new sprint plan from scratch.                        │  │      │
 │  │  │                                                        │  │      │
 │  │  └────────────────────────────────────────────────────────┘  │      │
 │  │                                                              │      │
 │  └──────────────────────────────────────────────────────────────┘      │
 │                                                                        │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## Scenario 1: Active Sprint in Progress

### What Happens

```
 User selects "I have an active sprint running"
       │
       ├──> ATLAS imports the active sprint AS-IS
       │    (no changes to tasks, estimates, or assignments)
       │
       ├──> Dashboard shows:
       │
       │    ┌──────────────────────────────────────────────────────────────┐
       │    │                                                              │
       │    │  CURRENT SPRINT — Sprint 14 (imported from Jira)            │
       │    │  Status: In Progress · 5 of 8 tasks completed              │
       │    │  ──────────────────────────────────────────────────────     │
       │    │                                                              │
       │    │  ┌──────────────────────────────────────────────────┐       │
       │    │  │  PROJ-42  Refactor auth module         [Done] ✓ │       │
       │    │  │  PROJ-18  Add payment integration      [In Prog] │       │
       │    │  │  PROJ-7   Update dashboard cards       [To Do]   │       │
       │    │  │  ...                                              │       │
       │    │  └──────────────────────────────────────────────────┘       │
       │    │                                                              │
       │    │  ┌──────────────────────────────────────────────────┐       │
       │    │  │  💡 ATLAS INSIGHT:                                │       │
       │    │  │  "Based on current velocity, Sprint 14 is on     │       │
       │    │  │   track. 2 tasks may slip — PROJ-18 has high     │       │
       │    │  │   dependency complexity."                         │       │
       │    │  └──────────────────────────────────────────────────┘       │
       │    │                                                              │
       │    │  ┌────────────────────────────────────────────┐             │
       │    │  │  Plan next sprint with ATLAS ──>           │             │
       │    │  └────────────────────────────────────────────┘             │
       │    │                                                              │
       │    └──────────────────────────────────────────────────────────────┘
       │
       ├──> ATLAS runs analysis in background:
       │    • Code complexity (if repo connected)
       │    • Historical velocity (from past sprints)
       │    • Team capacity (from assignments)
       │    • Risk flags (dependencies, blockers)
       │
       └──> When current sprint ends:
            ATLAS offers to plan the NEXT sprint
            using all learned context
```

### Sync Behavior

```
 SYNC MODE                  DESCRIPTION
 ────────────────────────  ──────────────────────────────────────────
 Real-time sync (default)   Voatomy mirrors Jira/Linear changes live.
                            Status updates in Jira → reflected in Voatomy.
                            No duplicate data entry.

 One-way sync               Voatomy reads from source tool.
                            User edits in Voatomy don't push back.
                            Best for "review only" mode.

 Two-way sync               Changes in either tool update the other.
                            Requires higher integration permissions.
                            Available on Business+ plans.
```

---

## Mid-Sprint Integration (Respect the Active Sprint)

If the user connects Jira/Linear/ClickUp in the middle of an active sprint, ATLAS must avoid “replanning the past”.

ATLAS should detect:
- Active sprint name, start date, end date
- Remaining working days
- In-progress WIP count
- Tickets missing points or ownership

Then offer clear choices:
- Observe current sprint (recommended): keep sprint intact; add insight overlays and risks.
- Plan next sprint: build Sprint N+1 using backlog and capacity.
- Validate current plan: compare existing estimates vs ATLAS complexity and flag risk.
- Start fresh anyway: ignore imported sprint state and use a manual plan builder.

Hard rule:
- No automatic ticket moves, status changes, or point edits without explicit confirmation.

See: `docs/onboarding/14-atlas-advanced-planning.md`

---

## Commenting on Tickets (Optional, Consent-Based)

If the integration supports commenting and the user opts in:
- ATLAS can add a short “plan comment” to planned tickets:
  - planned sprint identifier
  - confidence score
  - 1–2 key risks or dependencies
  - short “why complexity” rationale

Defaults:
- First run asks for consent (off by default).
- Allow per-project toggles to prevent noise.

---

## Scenario 2: Backlog Ready for Next Sprint

### What Happens

```
 User selects "I have a backlog ready for next sprint"
       │
       ├──> ATLAS imports the full backlog
       │
       ├──> AI Enhancement Screen:
       │
       │    ┌──────────────────────────────────────────────────────────────┐
       │    │                                                              │
       │    │  ATLAS is analyzing your backlog...                         │
       │    │                                                              │
       │    │  ┌──────────────────────────────────────────────────┐       │
       │    │  │  [✓] Importing 47 backlog items                  │       │
       │    │  │  [✓] Reading priority and label data              │       │
       │    │  │  [◎] Estimating complexity for each task ███░ 75% │       │
       │    │  │  [○] Checking team capacity                       │       │
       │    │  │  [○] Building recommended sprint plan             │       │
       │    │  └──────────────────────────────────────────────────┘       │
       │    │                                                              │
       │    └──────────────────────────────────────────────────────────────┘
       │
       ├──> Sprint Recommendation Screen:
       │
       │    ┌──────────────────────────────────────────────────────────────┐
       │    │                                                              │
       │    │  ATLAS recommends this sprint plan:                         │
       │    │                                                              │
       │    │  Sprint 15 · Feb 10 - Feb 21, 2026                         │
       │    │  ──────────────────────────────────                         │
       │    │                                                              │
       │    │  Recommended (12 tasks, 38 pts):                            │
       │    │  ┌──────────────────────────────────────────────────┐       │
       │    │  │  PROJ-51  User notifications        M   5 pts   │       │
       │    │  │  PROJ-53  API rate limiting          L   8 pts   │       │
       │    │  │  PROJ-48  Mobile responsive fix      S   2 pts   │       │
       │    │  │  ... + 9 more                                    │       │
       │    │  └──────────────────────────────────────────────────┘       │
       │    │                                                              │
       │    │  Deferred to next sprint (35 tasks):                        │
       │    │  ┌──────────────────────────────────────────────────┐       │
       │    │  │  PROJ-55  Full redesign             XL  13 pts  │       │
       │    │  │  PROJ-60  Database migration         L   8 pts  │       │
       │    │  │  ... + 33 more                                   │       │
       │    │  └──────────────────────────────────────────────────┘       │
       │    │                                                              │
       │    │  WHY THIS SPLIT:                                            │
       │    │  "ATLAS selected tasks that fit your team's capacity       │
       │    │   (4 engineers × 6 pts each = 24 pts base, +14 pts        │
       │    │   buffer). High-priority items were weighted first."       │
       │    │                                                              │
       │    │  ┌───────────────┐  ┌────────────────────────────┐         │
       │    │  │ Accept plan   │  │ Customize before accepting │         │
       │    │  └───────────────┘  └────────────────────────────┘         │
       │    │                                                              │
       │    └──────────────────────────────────────────────────────────────┘
       │
       └──> User adjusts or accepts → Go to Dashboard
```

---

## Scenario 3: Review My Current Estimates

For teams that already have a planned sprint but want a "second opinion" from ATLAS:

### Estimate Comparison View

```
 ┌────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                │
 │  ATLAS Estimate Review — Sprint 14                                            │
 │                                                                                │
 │  ┌──────────────────────────────────────────────────────────────────────┐      │
 │  │                                                                      │      │
 │  │  TASK              YOUR EST.   ATLAS EST.   DIFF    CONFIDENCE      │      │
 │  │  ────────────────  ──────────  ──────────  ──────  ────────────     │      │
 │  │  Refactor auth      5 pts       7.2 pts     +44%   87%  ⚠️         │      │
 │  │  Payment integ.     8 pts       8.5 pts     +6%    72%  ✅         │      │
 │  │  Dashboard cards    2 pts       3.1 pts     +55%   91%  ⚠️         │      │
 │  │  API docs           3 pts       2.0 pts     -33%   85%  ✅         │      │
 │  │  User settings      3 pts       3.2 pts     +7%    89%  ✅         │      │
 │  │  Search feature     5 pts       8.8 pts     +76%   78%  🔴         │      │
 │  │  Bug fix #127       1 pt        1.0 pts     +0%    95%  ✅         │      │
 │  │  CI pipeline        2 pts       1.5 pts     -25%   92%  ✅         │      │
 │  │                                                                      │      │
 │  │  ──────────────────────────────────────────────────────────────     │      │
 │  │  TOTAL              29 pts      35.3 pts    +22%                   │      │
 │  │                                                                      │      │
 │  └──────────────────────────────────────────────────────────────────────┘      │
 │                                                                                │
 │  ┌──────────────────────────────────────────────────────────────────────┐      │
 │  │                                                                      │      │
 │  │  📊 ATLAS SUMMARY                                                    │      │
 │  │                                                                      │      │
 │  │  🔴 2 tasks significantly under-estimated (>40% diff)               │      │
 │  │     → "Refactor auth" and "Search feature" may take longer          │      │
 │  │     → Consider splitting or re-scoping these                        │      │
 │  │                                                                      │      │
 │  │  ✅ 5 tasks closely aligned with your estimates                     │      │
 │  │                                                                      │      │
 │  │  ⚠️ Sprint may be over-committed by ~22%                            │      │
 │  │     → Consider deferring 1-2 lower-priority tasks                   │      │
 │  │                                                                      │      │
 │  └──────────────────────────────────────────────────────────────────────┘      │
 │                                                                                │
 │  ┌────────────────────┐  ┌──────────────────────────────┐                     │
 │  │ Keep my estimates  │  │ Apply ATLAS estimates         │                     │
 │  └────────────────────┘  └──────────────────────────────┘                     │
 │                                                                                │
 │  [Merge: Use higher of the two →]                                             │
 │                                                                                │
 └────────────────────────────────────────────────────────────────────────────────┘
```

### Diff Legend

```
 ICON     MEANING                    COLOR
 ──────  ────────────────────────   ──────────
 ✅      Your estimate is close      Green
 ⚠️      Notable difference (>30%)   Yellow
 🔴      Major gap (>50%)            Red
```

---

## Scenario 4: Start Fresh (Ignore Existing Data)

```
 User selects "Start fresh with ATLAS"
       │
       ├──> Confirmation modal:
       │
       │    ┌────────────────────────────────────────────────────┐
       │    │                                                    │
       │    │  Are you sure?                                    │
       │    │                                                    │
       │    │  We found existing data in Jira:                  │
       │    │  • Sprint 14 (in progress, 8 tasks)               │
       │    │  • Backlog (47 items)                              │
       │    │  • Sprint history (10 past sprints)               │
       │    │                                                    │
       │    │  Starting fresh means ATLAS won't use any of      │
       │    │  this data. You can always import later from       │
       │    │  Settings.                                         │
       │    │                                                    │
       │    │  ┌──────────────┐  ┌──────────────────────────┐   │
       │    │  │ Import data  │  │   Start fresh anyway      │   │
       │    │  └──────────────┘  └──────────────────────────┘   │
       │    │                                                    │
       │    └────────────────────────────────────────────────────┘
       │
       └──> Proceeds to blank sprint builder (see doc 09)
```

---

## Integration Discovery at Import Step

When a user imports from Jira/Linear, we detect what other tools they might benefit from:

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  Based on your Jira setup, you might also want to connect:             │
 │                                                                          │
 │  ┌────────────────────────────────────────────────────────────────┐     │
 │  │                                                                │     │
 │  │  ┌───────────────────────────────────────────────┐            │     │
 │  │  │  [Slack icon]  Slack                          │            │     │
 │  │  │  Get sprint updates in your Slack channels    │            │     │
 │  │  │                          [Connect]            │            │     │
 │  │  └───────────────────────────────────────────────┘            │     │
 │  │                                                                │     │
 │  │  ┌───────────────────────────────────────────────┐            │     │
 │  │  │  [Figma icon]  Figma                          │            │     │
 │  │  │  Link designs to sprint tasks automatically   │            │     │
 │  │  │                          [Connect]            │            │     │
 │  │  └───────────────────────────────────────────────┘            │     │
 │  │                                                                │     │
 │  │  ┌───────────────────────────────────────────────┐            │     │
 │  │  │  [GitHub icon]  GitHub                        │            │     │
 │  │  │  Add code complexity analysis for even        │            │     │
 │  │  │  smarter estimates                             │            │     │
 │  │  │                          [Connect]            │            │     │
 │  │  └───────────────────────────────────────────────┘            │     │
 │  │                                                                │     │
 │  └────────────────────────────────────────────────────────────────┘     │
 │                                                                          │
 │  [Skip — I'll set these up later]                                      │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## Two-Tool Users: Repo + Project Management

Some power users want BOTH a repo connection AND a Jira/Linear import. Here's how this works:

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  Combined Data Sources                                                  │
 │                                                                          │
 │  ┌──────────────────────────────────────────────────────────────┐       │
 │  │                                                              │       │
 │  │  [✓] GitHub — acmecorp/frontend         Connected ✓         │       │
 │  │  [✓] Jira   — Product Sprint Board      Connected ✓         │       │
 │  │                                                              │       │
 │  │  How ATLAS combines these:                                   │       │
 │  │                                                              │       │
 │  │  ┌──────────┐          ┌──────────┐          ┌──────────┐  │       │
 │  │  │  Jira    │          │  ATLAS   │          │  Sprint  │  │       │
 │  │  │  tickets │ ────────>│  merges  │ ────────>│  plan    │  │       │
 │  │  │  + story │          │  & maps  │          │  with    │  │       │
 │  │  │  points  │          │  tickets │          │  code +  │  │       │
 │  │  └──────────┘          │  to code │          │  backlog │  │       │
 │  │                         │          │          │  context │  │       │
 │  │  ┌──────────┐          │          │          │          │  │       │
 │  │  │  GitHub  │ ────────>│          │          │          │  │       │
 │  │  │  code    │          └──────────┘          └──────────┘  │       │
 │  │  │  struct  │                                               │       │
 │  │  │  + deps  │                                               │       │
 │  │  └──────────┘                                               │       │
 │  │                                                              │       │
 │  │  ATLAS automatically matches Jira tickets to code files     │       │
 │  │  using: branch names, commit messages, and PR references.   │       │
 │  │                                                              │       │
 │  └──────────────────────────────────────────────────────────────┘       │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## Sprint History Import

When importing from a tool with sprint history, ATLAS learns from past performance:

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  Sprint History Detected!                                               │
 │                                                                          │
 │  ATLAS found 10 past sprints in your Jira account.                     │
 │                                                                          │
 │  ┌──────────────────────────────────────────────────────────────┐       │
 │  │                                                              │       │
 │  │  WHAT ATLAS LEARNED:                                         │       │
 │  │                                                              │       │
 │  │  📈 Avg velocity:     28 pts / sprint                        │       │
 │  │  📊 Completion rate:  73% of planned tasks                   │       │
 │  │  ⏱️  Sprint duration:  2 weeks (consistent)                  │       │
 │  │  👥 Team size:        4 engineers (avg)                      │       │
 │  │                                                              │       │
 │  │  🔍 PATTERNS FOUND:                                          │       │
 │  │  • Tasks estimated at 8+ pts are completed only 45% of      │       │
 │  │    the time → ATLAS will suggest splitting these             │       │
 │  │  • Last 3 sprints show improving accuracy (61% → 73% → 80%) │       │
 │  │  • Infrastructure tasks are consistently under-estimated     │       │
 │  │                                                              │       │
 │  └──────────────────────────────────────────────────────────────┘       │
 │                                                                          │
 │  Use this data to improve future estimates?                             │
 │  ┌──────────────┐  ┌────────────────────────┐                          │
 │  │ Yes, use it  │  │ No, start fresh data   │                          │
 │  └──────────────┘  └────────────────────────┘                          │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## Ongoing Sync Preferences

After import, users configure how Voatomy stays in sync:

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  Sync Preferences                                                       │
 │                                                                          │
 │  How should Voatomy stay in sync with Jira?                            │
 │                                                                          │
 │  ┌──────────────────────────────────────────────────────────────┐       │
 │  │                                                              │       │
 │  │  (●) Live mirror — Jira is the source of truth              │       │
 │  │      Changes in Jira automatically update Voatomy.          │       │
 │  │      ATLAS adds insights on top, never modifies Jira.      │       │
 │  │                                                              │       │
 │  │  ( ) Two-way sync — Both tools stay in sync  [Business+]    │       │
 │  │      Edit in either Jira or Voatomy; both update.           │       │
 │  │                                                              │       │
 │  │  ( ) Snapshot import — One-time import only                  │       │
 │  │      Import once, then Voatomy works independently.          │       │
 │  │      No ongoing connection to Jira.                          │       │
 │  │                                                              │       │
 │  └──────────────────────────────────────────────────────────────┘       │
 │                                                                          │
 │  ┌────────────────────────────────────────────┐                         │
 │  │          Save & continue                    │                         │
 │  └────────────────────────────────────────────┘                         │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## Edge Cases & Error Handling

```
 EDGE CASE                          HOW VOATOMY HANDLES IT
 ──────────────────────────────── ──────────────────────────────────────────
 Active sprint has 0 tasks          "Your current sprint is empty. Would you
                                    like to plan one with ATLAS? [Plan sprint]"

 Backlog has 500+ items             "That's a big backlog! ATLAS will analyze
                                    the top 50 by priority first. [Import all]
                                    [Import top 50]"

 Sprint history has                 "We found incomplete data in Sprints 3-5.
 inconsistent data                  ATLAS will use Sprints 6-14 for velocity
                                    calculations. [View details]"

 User's Jira permissions are        "You have read-only access to 'Infra'
 mixed (some boards read-only)      board. ATLAS can view but not sync.
                                    [Import as snapshot] [Skip this board]"

 Multiple active sprints             "You have 2 active sprints. Which should
 across boards                      be your primary? [Sprint 14 - Product]
                                    [Sprint 7 - Infra] [Both]"

 Sprint ends during onboarding      "Sprint 14 just ended in Jira! ATLAS
                                    detected this and can plan Sprint 15.
                                    [Plan next sprint]"

 Duplicate tasks across tools       "3 tasks appear in both Jira and your
                                    CSV import. ATLAS merged them by title.
                                    [Review duplicates]"
```

---

## Accessibility

| Element | Requirement |
|---------|-------------|
| Situation cards | `role="radio"` in `role="radiogroup"` with descriptive `aria-label` |
| Import progress | `role="progressbar"` + `aria-valuenow` + `aria-live="polite"` |
| Estimate comparison table | Proper `<table>` with `<th>` headers + `aria-label` on diff indicators |
| Sync radio buttons | `role="radiogroup"` with `aria-describedby` for descriptions |
| Sprint history stats | `aria-label` on each stat for screen readers |
| Merge confirmation | `role="alertdialog"` with focus trap + clear action buttons |
| Board selection checkboxes | `role="checkbox"` + `aria-checked` + `aria-label` |

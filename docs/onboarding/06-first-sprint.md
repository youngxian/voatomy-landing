# Step 5: First Sprint Plan — The "Aha!" Moment

> This is where Voatomy proves its value. ATLAS generates the user's first AI sprint plan, and the user sees the product in action for the first time.

---

## Route: `/onboard/first-plan`

---

## Source & Destination

```
 /onboard/team                  /onboard/first-plan             /dashboard
 ═════════════                  ═══════════════════             ══════════

 ┌──────────────┐    ┌──────────────────────────────┐    ┌──────────────┐
 │ User invited │    │                              │    │              │
 │ team members │───>│  ATLAS generates first AI    │───>│  DASHBOARD   │
 │ (or skipped) │    │  sprint plan in real-time    │    │  (Home)      │
 │              │    │                              │    │              │
 └──────────────┘    └──────────────────────────────┘    └──────────────┘

                                                         THE DESTINATION
                                                         User is fully
                                                         onboarded.
```

---

## Why This Step Is Critical

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  This is the ACTIVATION MOMENT.                                 │
 │                                                                  │
 │  If the user doesn't feel value here, they won't come back.    │
 │  Everything before this was setup. This is the payoff.          │
 │                                                                  │
 │  The goal: "Wow, this actually understands my codebase."        │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

---

## Two Modes

```
 MODE                    WHEN                              DATA SOURCE
 ─────────────────────  ──────────────────────────────    ──────────────────
 Real plan               User connected repos in Step 2    Real code analysis
 Sample plan              User skipped repo connection      Demo data (realistic)
```

---

## Advanced ATLAS Behavior (Real Teams)

This step must work for more than the “single team, single repo, 2-week sprint” case.

ATLAS supports:
- Different sprint durations (1–4 weeks) and continuous planning windows.
- Multiple projects and contributors split across projects.
- Multiple teams with different cadences and different boards.
- Mid-sprint connection without disrupting the current sprint.
- Learning a board’s structure before planning (statuses, fields, issue types).
- Optional ticket commenting (with consent) after a plan is accepted.
- Sprint close detection and automatic reports.
- Reminders and notifications after the plan is created.

See: `docs/onboarding/14-atlas-advanced-planning.md`

---

## Wireframe — Generating State

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                                                                        │
 │  ┌──┐                                                                  │
 │  │//│ Voatomy                                                          │
 │  └──┘                                                                  │
 │                                                                        │
 │  [●━━━━━━━●━━━━━━━●━━━━━━━●━━━━━━━●]                                  │
 │   Welcome  Connect   Repos    Team    Plan                             │
 │                                                                        │
 │  ┌────────────────────────────────────────────────────────────────┐    │
 │  │                                                                │    │
 │  │                                                                │    │
 │  │                    ┌─────────────┐                             │    │
 │  │                    │   ◎ ── ◎    │                             │    │
 │  │                    │  /    \ \   │   AI brain animation       │    │
 │  │                    │ ◎──◎───◎   │   (pulsing neural network) │    │
 │  │                    └─────────────┘                             │    │
 │  │                                                                │    │
 │  │              ATLAS is analyzing your code...                  │    │
 │  │                                                                │    │
 │  │                                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  [✓] Reading repository structure                    │     │    │
 │  │  │                                                      │     │    │
 │  │  │  [✓] Mapping code complexity                         │     │    │
 │  │  │                                                      │     │    │
 │  │  │  [◎] Identifying dependencies             ████░ 80%  │     │    │
 │  │  │                                                      │     │    │
 │  │  │  [○] Analyzing tech debt hotspots                    │     │    │
 │  │  │                                                      │     │    │
 │  │  │  [○] Generating sprint plan                          │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │              Usually takes 30-90 seconds                      │    │
 │  │                                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  💡 Did you know?                                    │     │    │
 │  │  │  ATLAS considers 6 signals when planning:           │     │    │
 │  │  │  code complexity, team capacity, customer demand,   │     │    │
 │  │  │  tech debt, design scope, and business priority.    │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  └────────────────────────────────────────────────────────────────┘    │
 │                                                                        │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## Analysis Steps (Progressive Checklist)

```
 STEP                              DURATION     ICON WHEN DONE
 ────────────────────────────────  ───────────  ──────────────
 1. Reading repository structure    ~5 sec       ✓ green
 2. Mapping code complexity         ~10 sec      ✓ green
 3. Identifying dependencies        ~15 sec      ✓ green
 4. Analyzing tech debt hotspots    ~10 sec      ✓ green
 5. Generating sprint plan          ~20 sec      ✓ green + confetti

 Total: ~60 seconds
 Each step reveals with a slide-down animation.
 Current step shows a progress bar.
```

---

## Wireframe — Plan Ready State

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                                                                        │
 │  ┌──┐                                                                  │
 │  │//│ Voatomy                                                          │
 │  └──┘                                                                  │
 │                                                                        │
 │  [●━━━━━━━●━━━━━━━●━━━━━━━●━━━━━━━●]  ← all filled, green            │
 │   Welcome  Connect   Repos    Team    Plan                             │
 │                                                                        │
 │  ┌────────────────────────────────────────────────────────────────┐    │
 │  │                                                                │    │
 │  │                    🎉 confetti burst                           │    │
 │  │                                                                │    │
 │  │              Your first sprint plan is ready!                 │    │
 │  │                                                                │    │
 │  │     ATLAS analyzed acmecorp/frontend and generated            │    │
 │  │     a 2-week sprint plan with 12 tasks.                       │    │
 │  │                                                                │    │
 │  │                                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  Sprint 1 · Feb 24 - Mar 7, 2026                    │     │    │
 │  │  │  ─────────────────────────────────                   │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌──────────────────────────────────────────────┐   │     │    │
 │  │  │  │  FE-42  Refactor auth module                 │   │     │    │
 │  │  │  │  ■■■■■■■░░░  Complexity: 7.2  ·  3 pts      │   │     │    │
 │  │  │  │  Confidence: 87%                              │   │     │    │
 │  │  │  └──────────────────────────────────────────────┘   │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌──────────────────────────────────────────────┐   │     │    │
 │  │  │  │  FE-18  Add payment integration              │   │     │    │
 │  │  │  │  ■■■■■■■■■░  Complexity: 8.5  ·  8 pts      │   │     │    │
 │  │  │  │  Confidence: 72%                              │   │     │    │
 │  │  │  └──────────────────────────────────────────────┘   │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌──────────────────────────────────────────────┐   │     │    │
 │  │  │  │  FE-7   Update dashboard cards               │   │     │    │
 │  │  │  │  ■■■░░░░░░░  Complexity: 3.1  ·  2 pts      │   │     │    │
 │  │  │  │  Confidence: 91%                              │   │     │    │
 │  │  │  └──────────────────────────────────────────────┘   │     │    │
 │  │  │                                                      │     │    │
 │  │  │  + 9 more tasks                                     │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  📊  SPRINT STATS                                    │     │    │
 │  │  │                                                      │     │    │
 │  │  │  Total points:  42 pts                               │     │    │
 │  │  │  Avg confidence: 83%                                 │     │    │
 │  │  │  Tech debt flags: 3 items                            │     │    │
 │  │  │  Estimated accuracy: 87%                             │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  ┌────────────────────────────────────────────────────────┐   │    │
 │  │  │            Go to Dashboard                             │   │    │
 │  │  └────────────────────────────────────────────────────────┘   │    │
 │  │                                                                │    │
 │  │  ┌────────────────────────────────────────────────────────┐   │    │
 │  │  │        Customize this sprint plan                      │   │    │
 │  │  └────────────────────────────────────────────────────────┘   │    │
 │  │                                                                │    │
 │  └────────────────────────────────────────────────────────────────┘    │
 │                                                                        │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## Sprint Plan Task Card — Anatomy

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  TASK-ID    TASK TITLE                                      │
 │  ■■■■■░░░  Complexity: X.X  ·  N pts                       │
 │  Confidence: XX%                                            │
 │                                                              │
 │  WHY THIS COMPLEXITY:                                       │
 │  "3 external API calls, 2 database migrations,              │
 │   touches 4 shared components"                              │
 │   (shown on hover / expand)                                 │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘

 COMPLEXITY BAR COLORS:
 ─────────────────────────────────
 Low (1-3):    ■■■░░░░░░░  Green
 Medium (4-6): ■■■■■■░░░░  Yellow
 High (7-8):   ■■■■■■■■░░  Orange
 Critical (9+):■■■■■■■■■░  Red
```

---

## Sample Plan (When No Repo Connected)

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  [i] This is a sample sprint plan using demo data.          │
 │      Connect a real repo to see your actual code analysis.  │
 │      [Connect repository]                                   │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

The sample plan uses realistic-looking data from a fictional "Acme Corp" project:
- 12 tasks with varied complexity
- Mix of feature work, bug fixes, and tech debt
- Realistic confidence scores (72-95%)
- Shows the product's capabilities without real data

---

## "Did You Know" Rotating Tips

During the loading animation, show rotating educational tips. Tips now include product ecosystem awareness:

```
 TIP 1: "ATLAS considers 6 signals: code complexity, team capacity,
         customer demand, tech debt, design scope, and business priority."

 TIP 2: "Teams using ATLAS improved sprint accuracy from 42% to 87%
         in just 3 sprints."

 TIP 3: "ATLAS never stores your source code. It only retains
         structural metadata like complexity scores."

 TIP 4: "Planning meetings went from 2+ hours to 20 minutes with
         ATLAS-generated sprint plans."

 TIP 5: "PHANTOM turns tech debt into dollar amounts — so you can
         justify refactoring to leadership. Coming after your first plan."

 TIP 6: "LOOP connects sales call feedback to your sprint priorities.
         Know which features are blocking real revenue."

 TIP 7: "SIGNAL translates production incidents into customer revenue
         impact — so SREs and business teams speak the same language."

 TIP 8: "DRIFT keeps your Figma designs and production code in sync,
         then optimizes UX decisions with real user data."

 Rotation: Every 5 seconds, slide-up transition
```

---

## Product Teasers in Sprint Results

After the plan loads, ATLAS results include contextual teasers for the full Voatomy ecosystem. These are NOT upsells — they're value previews that surface naturally from the analysis.

See `11-product-ecosystem.md` for the complete teaser system including:
- PHANTOM teaser when tech debt hotspots are flagged
- LOOP teaser when revenue signals appear on task cards
- DRIFT teaser when Figma design-code drift is detected
- SIGNAL teaser when on-call capacity affects the sprint
- ATLAS 6-signal indicator panel showing which data sources are active

---

## After "Go to Dashboard"

```
 User clicks "Go to Dashboard"
       │
       ├───> Set onboarding_completed = true
       │
       ├───> Redirect to /dashboard
       │
       └───> Dashboard shows:
             1. Welcome toast: "You're all set! Here's your sprint plan."
             2. Sprint plan from Step 5 is live
             3. Sidebar shows connected repos and active products
             4. If team invited: member list in sidebar
             5. Product sidebar: Shows active products (ATLAS ✓) +
                unlockable products (PHANTOM, LOOP, DRIFT, SIGNAL)
             6. Nudge bar (if steps were skipped):
                "Finish setup: Connect repo · Invite team"
             7. NEXUS teaser (if 3+ products active):
                "Unlock your organizational nerve center"
```

---

## Accessibility

| Element | Requirement |
|---------|-------------|
| Loading animation | `aria-live="polite"` announces each step |
| Progress checklist | `role="list"` with status per item |
| Confetti | `prefers-reduced-motion: reduce` disables |
| Sprint tasks | `role="list"` with expandable cards |
| Complexity bar | `role="meter"` + `aria-valuenow` + `aria-label` |
| "Go to Dashboard" | Primary focus after plan loads |
| Tips rotation | `aria-live="polite"` for screen readers |

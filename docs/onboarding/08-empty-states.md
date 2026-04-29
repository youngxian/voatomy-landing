# Empty States, Tooltips & Progressive Disclosure

> What users see when there's no data yet, how we guide them through the product, and how we reveal complexity gradually.

---

## Philosophy

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  An empty state is not a dead end.                              │
 │  It's an opportunity to teach, motivate, and guide.             │
 │                                                                  │
 │  Every empty state should answer three questions:                │
 │  1. Why is this empty?                                          │
 │  2. What goes here when it's not empty?                         │
 │  3. What should I do to fill it?                                │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

---

## Dashboard Empty States

### No Sprint Plan Yet

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │                    ┌─────────────┐                               │
 │                    │  ═══ ═══    │                               │
 │                    │  ═══        │   Placeholder illustration   │
 │                    │  ═══ ═══    │   (sprint board outline)     │
 │                    └─────────────┘                               │
 │                                                                  │
 │              No sprint plans yet                                │
 │                                                                  │
 │     Generate your first AI sprint plan to see                   │
 │     code-aware task estimates right here.                       │
 │                                                                  │
 │     ┌──────────────────────────────────┐                        │
 │     │     Generate your first plan     │                        │
 │     └──────────────────────────────────┘                        │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

### No Repository Connected

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │                    ┌─────────────┐                               │
 │                    │   < / >     │                               │
 │                    │  ─ ─ ─ ─   │   Code icon with dashes      │
 │                    └─────────────┘                               │
 │                                                                  │
 │              Connect a repository                               │
 │                                                                  │
 │     ATLAS analyzes your code structure to generate              │
 │     accurate sprint estimates. Connect GitHub, GitLab,          │
 │     or Bitbucket to get started.                                │
 │                                                                  │
 │     ┌──────────────────────────────────┐                        │
 │     │       Connect repository         │                        │
 │     └──────────────────────────────────┘                        │
 │                                                                  │
 │     [Shield] Never stores source code                           │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

### No Team Members

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │                    ┌─────────────┐                               │
 │                    │  ◎   ◎   ◎  │                               │
 │                    │    ◎   ◎    │   People outline             │
 │                    └─────────────┘                               │
 │                                                                  │
 │              You're the only one here                           │
 │                                                                  │
 │     ATLAS works best with your whole team.                      │
 │     Invite engineers, tech leads, and PMs to                    │
 │     collaborate on sprint planning.                             │
 │                                                                  │
 │     ┌──────────────────────────────────┐                        │
 │     │        Invite team members       │                        │
 │     └──────────────────────────────────┘                        │
 │                                                                  │
 │     Or share this link: voatomy.com/invite/acme-corp/x7k9      │
 │                                               [Copy]            │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

### No Integrations Connected

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │                    ┌─────────────┐                               │
 │                    │  ⬡ ── ⬡    │                               │
 │                    │  │    │    │   Disconnected nodes          │
 │                    │  ⬡ ── ⬡    │                               │
 │                    └─────────────┘                               │
 │                                                                  │
 │              Supercharge your plans                             │
 │                                                                  │
 │     Connect Jira, Slack, or Figma to give ATLAS                 │
 │     richer context for sprint estimation.                       │
 │                                                                  │
 │     ┌──────────────────────────────────┐                        │
 │     │       Browse integrations        │                        │
 │     └──────────────────────────────────┘                        │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

---

## Incomplete Onboarding Banner

When a user skipped steps during onboarding, show a persistent (dismissable) banner on the dashboard:

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  [✨] Finish setting up your workspace for the best experience.        │
 │                                                                          │
 │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐        │
 │  │ [○] Connect repo │  │ [○] Invite team  │  │ [○] Add Jira    │  [X]  │
 │  └─────────────────┘  └─────────────────┘  └─────────────────┘        │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘

 Each uncompleted item is clickable and opens the relevant setup flow.
 [X] dismisses the banner for this session. Re-appears next login.
 After 3 dismissals, banner becomes a subtle sidebar link instead.
```

---

## Tooltips & Guided Tour

### First-Time Dashboard Tour

When a user lands on the dashboard for the first time, show a guided tour:

```
 STEP    TARGET ELEMENT             TOOLTIP CONTENT
 ─────  ────────────────────────  ──────────────────────────────────────────
 1       Sprint plan card          "This is your AI-generated sprint plan.
                                    Each task has a complexity score based
                                    on your actual code."

 2       Complexity bar            "This bar shows code complexity.
                                    Green = simple, Red = complex.
                                    ATLAS reads your code structure
                                    to calculate this."

 3       Confidence score          "Confidence shows how accurate ATLAS
                                    thinks this estimate is. Higher is
                                    better. Improves over time."

 4       Team sidebar              "Your team members appear here.
                                    They can view and contribute to
                                    sprint plans."

 5       Settings gear             "Manage repos, team, and integrations
                                    in Settings. You can always add more
                                    later."
```

### Tooltip Wireframe

```
 ┌──────────────────────────────┐
 │ ┌──────────────────────────┐ │
 │ │  Sprint Plan (1 of 5)    │ │
 │ │                          │ │
 │ │  This is your AI-        │ │
 │ │  generated sprint plan.  │ │
 │ │  Each task has a         │ │
 │ │  complexity score based  │ │
 │ │  on your actual code.    │ │
 │ │                          │ │
 │ │  [Back] [Next]  [Skip]  │ │
 │ └──────────────────────────┘ │
 │         ▼ (pointer)          │
 └──────────────────────────────┘
```

### Tour Behavior

```
 INTERACTION              BEHAVIOR
 ────────────────────    ──────────────────────────────────────────
 "Next"                   Advance to next tooltip
 "Back"                   Return to previous tooltip
 "Skip tour"              Dismiss tour permanently
 Click outside             Dismiss current tooltip, advance to next
 Complete tour             Toast: "You're all set! Explore freely."
 Return visit              Tour is NOT shown again (stored in DB)
```

---

## Progressive Disclosure Pattern

### What We Show vs. When

```
 ONBOARDING                          WEEK 1                          WEEK 2+
 ─────────────────────────────────  ────────────────────────────── ─────────────────────
 Workspace setup                    Sprint customization            Advanced settings
 Repo connection                    Task editing                    RBAC / permissions
 Basic sprint plan                  Complexity deep-dive            Custom integrations
 Team invitation                    Comment threads                 Webhook configuration
                                    Notification preferences        API access
                                    Report generation               SSO configuration
                                                                    Audit logs
```

### Feature Discovery Pattern

New features are revealed through contextual nudges, not all-at-once:

```
 TRIGGER                            NUDGE
 ─────────────────────────────────  ────────────────────────────────────────
 User views 3rd sprint plan         "Did you know? You can customize task
                                     priorities. [Learn how]"

 User has 5+ team members           "Pro tip: Set up team capacity to
                                     factor in PTO and on-call schedules."

 User connects Jira                 "ATLAS can now pull existing tickets.
                                     [Import from Jira]"

 User generates 5th plan            "Ready for more? Business plan adds
                                     cross-team dependency mapping."

 Tech debt items appear             "3 tech debt items flagged. PHANTOM
                                     (coming Q3) will track these with
                                     dollar impact."
```

---

## Contextual Help System

### Help Button (Always Visible)

```
 ┌──────────────┐
 │              │
 │  [?] Help    │  Bottom-right corner, always visible
 │              │
 └──────────────┘

 Click opens:
 ┌──────────────────────────────────────────────────────┐
 │                                                      │
 │  Help & Support                              [X]    │
 │                                                      │
 │  ┌──────────────────────────────────────────────┐   │
 │  │  [Q] Search help articles...                 │   │
 │  └──────────────────────────────────────────────┘   │
 │                                                      │
 │  Quick links:                                       │
 │  [?] How does ATLAS estimate complexity?            │
 │  [?] How do I invite team members?                  │
 │  [?] What data does ATLAS access from my repo?      │
 │  [?] How do I connect Jira or Linear?               │
 │                                                      │
 │  ──────────────────────────────────────────────     │
 │                                                      │
 │  [Chat] Talk to support                             │
 │  [Book] Documentation                               │
 │  [Video] Watch tutorials                            │
 │                                                      │
 └──────────────────────────────────────────────────────┘
```

---

## Loading States

Every data-loading moment should feel alive, not frozen:

```
 LOADING SPRINT PLAN:
 ┌──────────────────────────────────────────────┐
 │  ┌──────────────────────────────────────┐   │
 │  │  ████████░░░░░░░░░░░░ shimmer       │   │   Skeleton cards
 │  │  ████████████░░░░░░░░ shimmer       │   │   with shimmer
 │  │  █████░░░░░░░░░░░░░░░ shimmer       │   │   animation
 │  └──────────────────────────────────────┘   │
 └──────────────────────────────────────────────┘

 LOADING REPO LIST:
 ┌──────────────────────────────────────────────┐
 │  [ ] ████████████████  shimmer   ★ ██       │
 │  [ ] ████████████      shimmer   ★ ██       │
 │  [ ] ██████████████    shimmer   ★ ██       │
 └──────────────────────────────────────────────┘

 ANALYZING CODE:
 ┌──────────────────────────────────────────────┐
 │  [✓] Reading structure     ← completed      │
 │  [◎] Mapping complexity    ████░ 75%         │   progress bar
 │  [○] Identifying deps      ← queued         │
 │  [○] Analyzing debt        ← queued         │
 │  [○] Generating plan       ← queued         │
 └──────────────────────────────────────────────┘
```

---

## Error Recovery

When things go wrong, don't dead-end. Always provide a next step:

```
 REPO ANALYSIS FAILED:
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  [!] Analysis failed for acmecorp/frontend                  │
 │                                                              │
 │  This might be because:                                     │
 │  - The repository is very large (>500MB)                    │
 │  - Permissions were revoked                                 │
 │  - Our analysis service is temporarily down                 │
 │                                                              │
 │  ┌─────────────────┐  ┌────────────────────────┐           │
 │  │    Retry         │  │  Try a different repo  │           │
 │  └─────────────────┘  └────────────────────────┘           │
 │                                                              │
 │  Still stuck? [Contact support]                             │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

---

## Celebration Moments

Key moments where we reward the user for completing actions:

```
 MOMENT                            CELEBRATION
 ────────────────────────────────  ──────────────────────────────────────────
 Workspace created (Step 1)        Confetti burst (subtle, 40 particles)
 Repo connected (Step 2)           Green check + "Connected!" toast
 First plan generated (Step 5)     Confetti burst (full) + stats summary
 First team member joins           Toast: "Priya just joined your workspace!"
 5th sprint plan generated         Badge: "Sprint Planning Pro" in profile
 Sprint accuracy > 80%             Banner: "Your accuracy hit 80%! Keep going."
```

---

## Accessibility for All Empty States

| Element | Requirement |
|---------|-------------|
| Empty state illustrations | `aria-hidden="true"` (decorative) |
| Empty state headings | Descriptive, not just "Empty" |
| CTA buttons | Clear labels, not just icons |
| Tooltip tour | Keyboard navigable with Esc to dismiss |
| Loading skeletons | `aria-label="Loading..."` on container |
| Error states | `role="alert"` + clear recovery actions |
| Celebration animations | `prefers-reduced-motion: reduce` disables |
| Help panel | `role="dialog"` + focus trap |

# Step 3: Select Repositories

> After connecting a provider, the user picks which repositories ATLAS should analyze. This is where the product starts feeling real.

---

## Route: `/onboard/repos`

---

## Source & Destination

```
 /onboard/connect               /onboard/repos                  /onboard/team
 ═══════════════                ══════════════                  ═════════════

 ┌──────────────┐    ┌──────────────────────────────┐    ┌──────────────┐
 │ User just    │    │                              │    │ User invites │
 │ connected    │───>│  Browse & select repos       │───>│ team members │
 │ GitHub /     │    │  to analyze with ATLAS       │    │              │
 │ GitLab / BB  │    │                              │    │              │
 └──────────────┘    └──────────────────────────────┘    └──────────────┘
```

---

## Wireframe

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                                                                        │
 │  ┌──┐                                                                  │
 │  │//│ Voatomy                                              [X] Exit   │
 │  └──┘                                                                  │
 │                                                                        │
 │  [●━━━━━━━●━━━━━━━●━━━━━━━○━━━━━━━○]                                  │
 │   Welcome  Connect   Repos    Team    Plan                             │
 │                                                                        │
 │  ┌────────────────────────────────────────────────────────────────┐    │
 │  │                                                                │    │
 │  │              Select repositories to analyze                   │    │
 │  │                                                                │    │
 │  │     Choose the repos you want ATLAS to include in             │    │
 │  │     sprint planning. You can add more later.                  │    │
 │  │                                                                │    │
 │  │  Connected to GitHub as @sarahk                  [Change]    │    │
 │  │                                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │  [Q] Search repositories...                         │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  [x] acmecorp / frontend                    ★ 24    │     │    │
 │  │  │      TypeScript · Updated 2 days ago                │     │    │
 │  │  │      ──────────────────────────────────────────     │     │    │
 │  │  │                                                      │     │    │
 │  │  │  [x] acmecorp / backend-api                 ★ 18    │     │    │
 │  │  │      Python · Updated 1 day ago                     │     │    │
 │  │  │      ──────────────────────────────────────────     │     │    │
 │  │  │                                                      │     │    │
 │  │  │  [ ] acmecorp / mobile-app                  ★ 12    │     │    │
 │  │  │      Swift · Updated 1 week ago                     │     │    │
 │  │  │      ──────────────────────────────────────────     │     │    │
 │  │  │                                                      │     │    │
 │  │  │  [ ] acmecorp / infrastructure              ★ 8     │     │    │
 │  │  │      HCL · Updated 3 days ago                       │     │    │
 │  │  │      ──────────────────────────────────────────     │     │    │
 │  │  │                                                      │     │    │
 │  │  │  [ ] acmecorp / design-system               ★ 5     │     │    │
 │  │  │      TypeScript · Updated 2 weeks ago               │     │    │
 │  │  │      ──────────────────────────────────────────     │     │    │
 │  │  │                                                      │     │    │
 │  │  │  Showing 5 of 24 repositories      [Show all]      │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  2 repositories selected                                      │    │
 │  │                                                                │    │
 │  │  ┌────────────────────────────────────────────────────────┐   │    │
 │  │  │              Continue with 2 repos                     │   │    │
 │  │  └────────────────────────────────────────────────────────┘   │    │
 │  │                                                                │    │
 │  │  ┌────────────────────────────────────────────────────────┐   │    │
 │  │  │  [i]  ATLAS will analyze code structure and           │   │    │
 │  │  │       complexity — never stores source code.          │   │    │
 │  │  │       Analysis takes ~2 minutes per repo.             │   │    │
 │  │  └────────────────────────────────────────────────────────┘   │    │
 │  │                                                                │    │
 │  └────────────────────────────────────────────────────────────────┘    │
 │                                                                        │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## Repository List Item — Detailed Anatomy

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  [CHECKBOX]   OWNER / REPO-NAME                      ★ STARS   │
 │               LANGUAGE · "Updated X ago"                        │
 │                                                                  │
 │               ┌─── COMPLEXITY PREVIEW (shown after analysis) ─┐ │
 │               │  ■■■■■■░░░░  Complexity: Medium (6.2)        │ │
 │               └──────────────────────────────────────────────┘ │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘

 STATES:
 ┌──────────────────────────────────────────────────┐
 │  [ ] Unselected — normal border, muted text     │
 │  [x] Selected   — brand green border, bold name │
 │  [~] Analyzing  — shimmer effect, spinner icon  │
 │  [!] Error      — red border, "Failed" badge    │
 └──────────────────────────────────────────────────┘
```

---

## Content Specs

| Element | Content | Style |
|---------|---------|-------|
| Heading | "Select repositories to analyze" | 36px, semibold, tight |
| Subtitle | "Choose the repos you want ATLAS to include in sprint planning. You can add more later." | 16px, muted, max-w-460px |
| Connected as | "Connected to GitHub as @sarahk" | 13px, muted, with GitHub icon |
| Change link | "[Change]" | 13px, underline, link |
| Search | "Search repositories..." | Full-width, magnifying glass icon |
| Repo row | Org/name, language, updated time, stars | 14px name (bold), 12px meta (muted) |
| "Show all" | "Showing X of Y repositories [Show all]" | 13px, link |
| Selection count | "2 repositories selected" | 14px, semibold |
| CTA | "Continue with 2 repos" | Full-width, brand, h-12 |
| Info banner | Security reminder | 13px, muted, info icon |

---

## Sorting & Filtering

```
 DEFAULT SORT ORDER:
 ─────────────────────────────────────────────────
 1. Most recently updated (active repos first)
 2. Star count (tiebreaker)
 3. Alphabetical (final tiebreaker)

 SEARCH:
 ─────────────────────────────────────────────────
 Searches by: repo name, owner/org name
 Debounced: 200ms
 Min chars: 1

 FILTERS (optional, shown after "Show all"):
 ─────────────────────────────────────────────────
 [All] [TypeScript] [Python] [Go] [Java] [Other]
 Language pills filter the repo list
```

---

## Plan Limits

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  PLAN             MAX REPOS           WHAT HAPPENS AT LIMIT             │
 │  ───────────────  ─────────────────  ──────────────────────────────── │
 │  Free             1 repository        "Upgrade to Pro for unlimited    │
 │                                        repos" — soft prompt, not block │
 │  Pro              Unlimited            No limit                         │
 │  Business         Unlimited            No limit                         │
 │  Enterprise       Unlimited            No limit                         │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

### Free Plan Limit UI

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  [i]  Free plan includes 1 repository.                      │
 │       Select your most active repo to start.                │
 │                                                              │
 │       Need more? Upgrade to Pro for unlimited repos.        │
 │       [See plans]                                           │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

---

## What Happens After Selection

```
 User clicks
 "Continue with N repos"
       │
       ├───> Analysis job queued (async)
       │
       │     ┌──────────────────────────────────────────┐
       │     │                                          │
       │     │  Analyzing your repositories...          │
       │     │                                          │
       │     │  ┌──────────────────────────────────┐   │
       │     │  │ acmecorp/frontend   ████░░ 65%   │   │
       │     │  │ acmecorp/backend    ██░░░░ 30%   │   │
       │     │  └──────────────────────────────────┘   │
       │     │                                          │
       │     │  This usually takes 1-2 minutes.        │
       │     │  We'll notify you when it's done.       │
       │     │                                          │
       │     │  [Continue to team setup]               │
       │     │                                          │
       │     └──────────────────────────────────────────┘
       │
       ├───> User proceeds to Step 4 (Team)
       │     Analysis continues in background
       │
       └───> When analysis completes:
             Dashboard shows real complexity data
```

---

## Error States

```
 ERROR                          TRIGGER                         UI
 ────────────────────────────  ────────────────────────────    ──────────────────────────
 No repos found                 Empty GitHub account           "No repositories found.
                                                               Create a repo on GitHub
                                                               first, then come back."

 Repo too large                 >500MB or >10K files           Badge: "Too large to
                                                               analyze. Coming soon."

 Private repo blocked           Permissions insufficient       Badge: "Private — needs
                                                               org admin approval"

 Analysis failed                Server error during scan       Badge: "Analysis failed.
                                                               [Retry]"

 No repos selected              User clicks Continue           Toast: "Select at least
                                with 0 selected                1 repository to continue"
```

---

## Accessibility

| Element | Requirement |
|---------|-------------|
| Repo checkboxes | `role="checkbox"` + `aria-checked` + `aria-label="Select {repo-name}"` |
| Search field | `aria-label="Search repositories"` |
| Language pills | `role="radiogroup"` for filter |
| Selection count | `aria-live="polite"` updates on change |
| Analysis progress | `role="progressbar"` + `aria-valuenow` |
| "Show all" toggle | `aria-expanded` attribute |
| Error badges | `aria-label` describes the error |

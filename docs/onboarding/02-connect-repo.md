# Step 2: Connect Data Source

> Where users connect their project data to Voatomy. For developers, this means a code repository. For everyone else, it means importing from Jira, spreadsheets, Notion, or starting fresh. The most trust-sensitive step in the entire onboarding flow.

---

## Route: `/onboard/connect`

---

## Two Versions of This Step

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  VERSION A: "Connect your repository" (this doc, below)                │
 │  ───────────────────────────────────                                    │
 │  Shown when: User's role is Engineer, Tech Lead, EM, or CTO            │
 │              AND they answered "We have repos" in Step 1                │
 │  Content: GitHub / GitLab / Bitbucket OAuth buttons                    │
 │  Goal: Get code complexity analysis for ATLAS                          │
 │                                                                          │
 │  VERSION B: "Connect your data" (see 09-no-repo-scenarios.md)          │
 │  ─────────────────────────────                                          │
 │  Shown when: User is a PM, Designer, Founder, or Operations role       │
 │              OR they answered "Jira", "Spreadsheets", "Notion",        │
 │              "Meetings only", or "Starting fresh" in Step 1            │
 │  Content: Jira, Linear, CSV, Notion, Repo, Start from scratch         │
 │  Goal: Import existing project data or create from scratch             │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## Source & Destination

```
 /onboard (Welcome)                /onboard/connect                /onboard/repos (Select)
 ════════════════                  ════════════════                ════════════════════════

 ┌──────────────┐    ┌─────────────────────────────────┐    ┌──────────────┐
 │ User created │    │  VERSION A: Connect repository  │    │ User browses │
 │ workspace    │───>│  VERSION B: Connect your data   │───>│ their repos  │
 │ name + URL   │    │                                 │    │ / boards     │
 └──────────────┘    │  OR                             │    │ and selects  │
                     │  Skip for now ──────────────────│───>│ /onboard/team│
                     │  Start from scratch ────────────│───>│ /onboard/team│
                     └─────────────────────────────────┘    └──────────────┘
```

---

## Why This Step Matters

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  ATLAS analyzes project data to generate sprint plans.          │
 │  This data can come from code repos, project tools, or         │
 │  manual input — the product works for EVERYONE.                │
 │                                                                  │
 │  For repo connections: This is where trust is built or broken.  │
 │  Users are giving access to their codebase.                     │
 │  Every word, every badge, every UI element must                 │
 │  communicate SAFETY and MINIMAL ACCESS.                         │
 │                                                                  │
 │  For non-repo users: This is where we show that Voatomy is     │
 │  not just for developers. Multiple import paths ensure          │
 │  everyone feels welcome.                                        │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

---

## Version A: Connect Repository (Developer Path)

> The section below is the developer repo connection path. For the non-developer path, see `09-no-repo-scenarios.md`.

---

## Wireframe

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                                                                        │
 │  ┌──┐                                                                  │
 │  │//│ Voatomy                                              [X] Exit   │
 │  └──┘                                                                  │
 │                                                                        │
 │  [●━━━━━━━●━━━━━━━○━━━━━━━○━━━━━━━○]                                  │
 │   Welcome  Connect   Repos    Team    Plan                             │
 │                                                                        │
 │  ┌────────────────────────────────────────────────────────────────┐    │
 │  │                                                                │    │
 │  │            ┌──────────┐                                       │    │
 │  │            │  ◇ ─ ◇   │   connection icon                    │    │
 │  │            │    ◇     │   (nodes connecting)                 │    │
 │  │            └──────────┘                                       │    │
 │  │                                                                │    │
 │  │              Connect your repository                          │    │
 │  │                                                                │    │
 │  │        ATLAS needs read-only access to analyze code           │    │
 │  │        complexity and generate accurate sprint plans.          │    │
 │  │                                                                │    │
 │  │                                                                │    │
 │  │  ┌────────────────────────────────────────────────────────┐   │    │
 │  │  │                                                        │   │    │
 │  │  │  ┌──────────────────────────────────────────────────┐ │   │    │
 │  │  │  │                                                  │ │   │    │
 │  │  │  │  [GH]  Connect GitHub                           │ │   │    │
 │  │  │  │                                    RECOMMENDED   │ │   │    │
 │  │  │  │                                                  │ │   │    │
 │  │  │  └──────────────────────────────────────────────────┘ │   │    │
 │  │  │                                                        │   │    │
 │  │  │  ┌──────────────────────────────────────────────────┐ │   │    │
 │  │  │  │                                                  │ │   │    │
 │  │  │  │  [GL]  Connect GitLab                           │ │   │    │
 │  │  │  │                                                  │ │   │    │
 │  │  │  └──────────────────────────────────────────────────┘ │   │    │
 │  │  │                                                        │   │    │
 │  │  │  ┌──────────────────────────────────────────────────┐ │   │    │
 │  │  │  │                                                  │ │   │    │
 │  │  │  │  [BB]  Connect Bitbucket                        │ │   │    │
 │  │  │  │                                                  │ │   │    │
 │  │  │  └──────────────────────────────────────────────────┘ │   │    │
 │  │  │                                                        │   │    │
 │  │  └────────────────────────────────────────────────────────┘   │    │
 │  │                                                                │    │
 │  │       Skip for now -->                                        │    │
 │  │                                                                │    │
 │  │  ┌────────────────────────────────────────────────────────┐   │    │
 │  │  │                                                        │   │    │
 │  │  │   [Shield]  Never stores source code                  │   │    │
 │  │  │   [Lock]    Read-only API access                      │   │    │
 │  │  │   [Eye]     Retains only structural metadata          │   │    │
 │  │  │                                                        │   │    │
 │  │  │   What does ATLAS actually access? [Learn more]       │   │    │
 │  │  │                                                        │   │    │
 │  │  └────────────────────────────────────────────────────────┘   │    │
 │  │                                                                │    │
 │  └────────────────────────────────────────────────────────────────┘    │
 │                                                                        │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## Content Specs

| Element | Content | Style |
|---------|---------|-------|
| Icon | Connected nodes animation | 48x48, animated on mount |
| Heading | "Connect your repository" | 36px, semibold, tight |
| Subtitle | "ATLAS needs read-only access to analyze code complexity and generate accurate sprint plans." | 16px, muted, max-w-460px |
| GitHub btn | "Connect GitHub" + "RECOMMENDED" badge | Full-width, h-14, border, GitHub icon |
| GitLab btn | "Connect GitLab" | Full-width, h-14, border, GitLab icon |
| Bitbucket btn | "Connect Bitbucket" | Full-width, h-14, border, Bitbucket icon |
| Skip link | "Skip for now" with arrow | 14px, muted, right-aligned |
| Trust badge 1 | "Never stores source code" with shield icon | 13px, muted, green icon |
| Trust badge 2 | "Read-only API access" with lock icon | 13px, muted, green icon |
| Trust badge 3 | "Retains only structural metadata" with eye icon | 13px, muted, green icon |
| Learn more | "What does ATLAS actually access?" | 13px, underline, link |

---

## Provider Connection Flows

### GitHub OAuth Flow

```
 USER                    VOATOMY                        GITHUB
 ───────                ──────────                     ──────

 Clicks "Connect
 GitHub"
      │
      ├───────────────> Generate state +
                        PKCE verifier
                             │
                             ├────────────────────> GitHub OAuth
                                                    consent screen
                                                    ┌──────────────────┐
                                                    │                  │
                                                    │ Voatomy wants to │
                                                    │ access your      │
                                                    │ account          │
                                                    │                  │
                                                    │ [x] Read repos   │
                                                    │ [x] Read metadata│
                                                    │                  │
                                                    │ [Authorize]      │
                                                    │ [Cancel]         │
                                                    │                  │
                                                    └──────────────────┘
                                                         │
                        User approves <──────────────────┘
                             │
                             ├────────────────────> Exchange code
                                                    for access token
                                                         │
                        Receive token <──────────────────┘
                             │
                        Fetch repo list
                             │
      <─────────────── Redirect to /onboard/repos
                        (with provider connected)
```

### Scopes Requested (Per Provider)

```
 PROVIDER       SCOPE                    WHY
 ───────────   ────────────────────    ──────────────────────────────────────
 GitHub         repo (read-only)       List repos, read file structure
                read:user              Get display name, org membership
                read:org               List org repos (if applicable)

 GitLab         read_repository        List and read repo structure
                read_user              Get profile info
                read_api               Access project metadata

 Bitbucket      repository:read        List and read repo structure
                account:read           Get workspace info
```

---

## "RECOMMENDED" Badge Logic

```
 HOW USER SIGNED UP              RECOMMENDED PROVIDER
 ──────────────────────────────  ────────────────────────────────────
 Google OAuth                    GitHub (most common for code)
 GitHub OAuth                    GitHub (already authenticated!)
 Email + password                GitHub (most common for devs)
 SSO via Okta/Azure AD           Depends on org — show all equally
```

If user signed up with GitHub OAuth, show special state:

```
 ┌──────────────────────────────────────────────────┐
 │                                                  │
 │  [GH]  Connect GitHub                           │
 │                                                  │
 │  ┌──────────────────────────────────────────┐   │
 │  │ You're already signed in with GitHub.    │   │
 │  │ We just need repo read access.           │   │
 │  │                                          │   │
 │  │ [Authorize repo access]                  │   │
 │  └──────────────────────────────────────────┘   │
 │                                                  │
 └──────────────────────────────────────────────────┘
```

---

## "What Does ATLAS Access?" — Expanded Panel

When user clicks "Learn more", an expandable panel opens:

```
 ┌────────────────────────────────────────────────────────────────────┐
 │                                                                    │
 │  What ATLAS reads:                                                │
 │  ─────────────────                                                │
 │  [x] File names and directory structure                           │
 │  [x] Function signatures and class definitions                    │
 │  [x] Cyclomatic complexity scores                                 │
 │  [x] Import/dependency graphs                                     │
 │  [x] Git commit history and authorship                            │
 │  [x] Pull request metadata (title, labels, reviewers)             │
 │                                                                    │
 │  What ATLAS NEVER reads:                                          │
 │  ───────────────────────                                          │
 │  [x] Source code contents (function bodies, logic)                │
 │  [x] Environment variables or secrets                             │
 │  [x] API keys, tokens, or credentials                             │
 │  [x] Database contents or user data                               │
 │  [x] Private messages or comments                                 │
 │                                                                    │
 │  Data is encrypted at rest (AES-256) and in transit (TLS 1.3).   │
 │  Read our Security page for full details.                         │
 │                                                                    │
 └────────────────────────────────────────────────────────────────────┘
```

---

## Connection States

```
 STATE               VISUAL                             BEHAVIOR
 ──────────────────  ────────────────────────────────  ──────────────────────────
 Default              Provider buttons visible           User picks one
 Connecting           Button shows spinner               OAuth redirect happening
 OAuth in progress    Overlay: "Connecting to GitHub..." Full-page overlay
 Connected            Green check + "Connected to        Auto-redirect to Step 3
                      GitHub as @sarahk"                 after 1.5s
 Error                Red banner + "Could not connect.   Retry button shown
                      Please try again."
 Already connected    "Already connected" badge           Skip to repo selection
```

### Connected State Wireframe

```
 ┌────────────────────────────────────────────────────────────┐
 │                                                            │
 │  ┌───────────────────────────────────────────────────┐    │
 │  │                                                   │    │
 │  │   ┌────┐                                         │    │
 │  │   │ ✓  │   Connected to GitHub                   │    │
 │  │   └────┘                                         │    │
 │  │                                                   │    │
 │  │   Signed in as @sarahk                           │    │
 │  │   12 repositories found                          │    │
 │  │                                                   │    │
 │  │   ┌──────────────────────────────────────────┐   │    │
 │  │   │          Select repositories             │   │    │
 │  │   └──────────────────────────────────────────┘   │    │
 │  │                                                   │    │
 │  │   Want to connect a different account?           │    │
 │  │   [Disconnect and reconnect]                     │    │
 │  │                                                   │    │
 │  └───────────────────────────────────────────────────┘    │
 │                                                            │
 └────────────────────────────────────────────────────────────┘
```

---

## Skip Flow

```
 User clicks
 "Skip for now"
      │
      ├───> Modal appears:
      │
      │  ┌──────────────────────────────────────────────────────┐
      │  │                                                      │
      │  │   Are you sure?                                     │
      │  │                                                      │
      │  │   Without a connected repository, ATLAS will use    │
      │  │   sample data for your first sprint plan. You can   │
      │  │   connect a real repo anytime from Settings.        │
      │  │                                                      │
      │  │   ┌──────────────┐  ┌──────────────────────────┐   │
      │  │   │ Connect repo │  │   Skip, use sample data  │   │
      │  │   └──────────────┘  └──────────────────────────┘   │
      │  │                                                      │
      │  └──────────────────────────────────────────────────────┘
      │
      ├── "Connect repo"     → Close modal, user stays on Step 2
      └── "Skip, use sample" → Jump to Step 4 (Team) with flag: demo_mode=true
```

---

## Error States

```
 ERROR                          TRIGGER                         UI
 ────────────────────────────  ────────────────────────────    ──────────────────────────
 OAuth window closed            User closed popup              Toast: "Connection cancelled.
                                                               Try again?"
 OAuth denied                   User clicked "Cancel"          Toast: "Access denied. ATLAS
                                on provider consent            needs read access to work."
 Network error                  Connection failed              Banner: "Connection failed.
                                                               Check your internet."
 Rate limited                   Too many attempts              Banner: "Too many attempts.
                                                               Try again in 5 minutes."
 Org access denied              GitHub org blocks app          Banner: "Your organization
                                                               admin needs to approve
                                                               Voatomy. [Send request]"
 Already connected              Different account              Modal: "You're already
                                                               connected as @otheruser.
                                                               [Disconnect] [Keep current]"
```

---

## Org Admin Approval Request

When a GitHub organization blocks third-party apps:

```
 ┌────────────────────────────────────────────────────────────┐
 │                                                            │
 │  [!] Organization approval needed                         │
 │                                                            │
 │  Your GitHub org "acmecorp" requires admin approval       │
 │  before Voatomy can access repositories.                  │
 │                                                            │
 │  ┌──────────────────────────────────────────────────┐     │
 │  │       Send approval request to admin             │     │
 │  └──────────────────────────────────────────────────┘     │
 │                                                            │
 │  Or connect a personal GitHub account instead.            │
 │                                                            │
 └────────────────────────────────────────────────────────────┘
```

---

## Accessibility

| Element | Requirement |
|---------|-------------|
| Provider buttons | `aria-label="Connect GitHub repository"` etc. |
| "RECOMMENDED" badge | `aria-label="Recommended: Connect GitHub"` |
| Connection spinner | `aria-live="polite"` + `aria-label="Connecting..."` |
| Trust badges | Decorative icons have `aria-hidden="true"` |
| Skip link | Focusable, keyboard accessible |
| Learn more panel | `aria-expanded` attribute toggles |
| Error banners | `role="alert"` + `aria-live="assertive"` |

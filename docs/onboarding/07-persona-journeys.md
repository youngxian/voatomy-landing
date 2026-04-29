# Persona-Specific Onboarding Journeys

> Each persona takes a different path through onboarding. This doc maps every journey end-to-end, from the moment they leave auth to the moment they see the dashboard.

---

## Journey Map: All Personas

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                              │
 │                    Auth ──> Welcome ──> Connect ──> Repos ──> Team ──> Plan ──> Dashboard    │
 │                                                                                              │
 │  Sarah (EM)        GitHub    ●          ● (GitHub)   ●        ●       ●        ●  ~3 min    │
 │  Marcus (VP Prod)  Google    ●          ○ skip       ○ skip   ●       ● sample ●  ~2 min    │
 │  Priya (Tech Lead) Invite    ○ skip     ● (GitHub)   ●        ○ skip  ●        ●  ~90 sec   │
 │  James (CTO)       Google    ●          ●            ●        ●       ●        ●  ~4 min    │
 │  Adam (Invited)    Invite    ○ skip     ○ skip       ○ skip   ○ skip  ○ skip   ●  ~30 sec   │
 │                                                                                              │
 │  ● = completes step    ○ = skips step    ● sample = uses demo data                         │
 │                                                                                              │
 └──────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Persona 1: Sarah K. (Engineering Manager)

### Profile

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  NAME:    Sarah K.                                          │
 │  TITLE:   Engineering Manager                               │
 │  COMPANY: Series B SaaS (50-200 employees)                  │
 │  AUTH:    GitHub OAuth                                       │
 │  GOAL:    Get accurate sprint plans for her team             │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

### Her Journey

```
 ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
 │ GitHub   │     │ Welcome  │     │ Connect  │     │ Select   │     │ Invite   │     │ First    │
 │ OAuth    │────>│          │────>│ Repo     │────>│ Repos    │────>│ Team     │────>│ Plan     │
 │ 1-click  │     │ "Acme    │     │ Already  │     │ Picks    │     │ Invites  │     │ Sees AI  │
 │          │     │  Corp"   │     │ has GH   │     │ frontend │     │ 3 team   │     │ sprint   │
 │          │     │ EM role  │     │ token!   │     │ + backend│     │ members  │     │ plan     │
 │          │     │ 50-200   │     │ 1-click  │     │          │     │          │     │ 87% conf │
 └──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
     10 sec           30 sec           15 sec           30 sec           45 sec           60 sec

 Total: ~3 minutes
```

### What She Sees at Each Step

```
 STEP 1 (Welcome):
 ─────────────────────────────────────────────────────
 - Name pre-filled from GitHub profile
 - Workspace name auto-filled: "Acme Corp" (from email domain)
 - URL auto-generated: voatomy.com/acme-corp
 - Selects: Team size "51-200", Role "Engineering Manager"

 STEP 2 (Connect):
 ─────────────────────────────────────────────────────
 - Since she signed up with GitHub, sees special message:
   "You're already signed in with GitHub. We just need
    repo read access."
 - One-click authorize (no new OAuth flow needed)

 STEP 3 (Select Repos):
 ─────────────────────────────────────────────────────
 - Sees 12 repos from her org
 - Selects "acmecorp/frontend" (★24) and "acmecorp/backend-api" (★18)
 - Clicks "Continue with 2 repos"

 STEP 4 (Invite Team):
 ─────────────────────────────────────────────────────
 - Adds priya@acmecorp.com (Tech Lead)
 - Adds marcus@acmecorp.com (PM → Viewer role)
 - Adds adam@acmecorp.com (Engineer → Member role)
 - Clicks "Send invitations & continue"

 STEP 5 (First Plan):
 ─────────────────────────────────────────────────────
 - Watches analysis: "Reading repo structure... Mapping complexity..."
 - Sees first sprint plan: 12 tasks, 42 points, 87% estimated accuracy
 - Thinks: "Wow, it actually understands our codebase complexity."
 - Clicks "Go to Dashboard"
```

---

## Persona 2: Marcus T. (VP Product)

### Profile

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  NAME:    Marcus T.                                         │
 │  TITLE:   VP Product                                        │
 │  COMPANY: Growth-Stage SaaS                                 │
 │  AUTH:    Google OAuth                                       │
 │  GOAL:    Align engineering sprints with revenue outcomes    │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

### His Journey

```
 ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
 │ Google   │     │ Welcome  │     │ Connect  │     │ Invite   │     │ First    │
 │ OAuth    │────>│          │────>│ Repo     │────>│ Team     │────>│ Plan     │
 │ 1-click  │     │ "Acme    │     │          │     │ Invites  │     │ Sample   │
 │          │     │  Corp"   │     │ SKIPS    │     │ his EM   │     │ plan     │
 │          │     │ VP Prod  │     │ (not his │     │ Sarah K. │     │ shows    │
 │          │     │ 51-200   │     │  domain) │     │          │     │ revenue  │
 │          │     │          │     │          │     │          │     │ weights  │
 └──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
     10 sec           30 sec           5 sec            30 sec           60 sec

 Total: ~2 minutes
```

### What He Sees Differently

```
 STEP 2 (Connect Repo):
 ─────────────────────────────────────────────────────
 - Sees repo connection buttons but immediately clicks "Skip for now"
 - Modal: "Without a repo, ATLAS will use sample data."
 - Clicks "Skip, use sample data"
 - He'll ask Sarah (his EM) to connect the repo later

 STEP 5 (First Plan — Sample Mode):
 ─────────────────────────────────────────────────────
 - Sees sample sprint plan with realistic demo data
 - Banner: "This is a sample plan. Connect a repo for real analysis."
 - Notices: Revenue-weighted priorities column
 - Thinks: "I need Sarah to connect the repo so I can see real data."
```

---

## Persona 3: Priya S. (Tech Lead — Invited)

### Profile

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  NAME:    Priya S.                                          │
 │  TITLE:   Tech Lead                                         │
 │  COMPANY: Same as Sarah's (Acme Corp)                       │
 │  AUTH:    Invitation link → GitHub OAuth                     │
 │  GOAL:    Verify code complexity scores match her intuition  │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

### Her Journey

```
 ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
 │ Invite   │     │ GitHub   │     │ Repos    │     │ Dashboard│
 │ Email    │────>│ OAuth    │────>│ Already  │────>│ Sees     │
 │ from     │     │ Join     │     │ connected│     │ Sarah's  │
 │ Sarah K. │     │ Acme     │     │ by Sarah │     │ sprint   │
 │          │     │ Corp     │     │ Add hers │     │ plan     │
 └──────────┘     └──────────┘     └──────────┘     └──────────┘
     5 sec            15 sec           30 sec           40 sec

 Total: ~90 seconds
```

### What She Sees Differently

```
 NO STEP 1 (Welcome):
 ─────────────────────────────────────────────────────
 - Workspace already exists (Sarah created it)
 - She joins "Acme Corp" directly
 - Her role is pre-set: Tech Lead (assigned by Sarah)

 NO STEP 4 (Invite Team):
 ─────────────────────────────────────────────────────
 - She's not the workspace admin — no invitation step
 - She joins the existing team

 STEP 3 (Select Repos — Modified):
 ─────────────────────────────────────────────────────
 - Sees repos already connected by Sarah
 - Can add her own repos if she has others
 - Checks security info: "Never stores source code" ← She looks for this
```

---

## Persona 4: James L. (CTO)

### Profile & Journey

```
 James takes the FULL journey (all 5 steps) but moves slower.
 He reads every security badge, checks every permission scope,
 and evaluates whether this is enterprise-ready.

 KEY DIFFERENCES:
 - Selects "200+" team size → sees Enterprise recommendation
 - Looks for SSO configuration option (shown post-onboarding)
 - Invites 2 department leads (EM + VP Product)
 - Spends extra time on Step 2 reading "What does ATLAS access?"
 - Total: ~4 minutes (reads more)
```

---

## Persona 5: Adam J. (Invited Engineer)

### Profile & Journey

```
 Adam's journey is the SHORTEST. He's a team member who was
 invited by Sarah and just needs to join and see the plan.

 ┌──────────┐     ┌──────────┐     ┌──────────┐
 │ Invite   │     │ GitHub   │     │ Dashboard│
 │ Email    │────>│ OAuth    │────>│ Sees     │
 │ from     │     │ 1-click  │     │ existing │
 │ Sarah K. │     │ join     │     │ sprint   │
 └──────────┘     └──────────┘     └──────────┘
     5 sec            10 sec          15 sec

 Total: ~30 seconds
 He skips ALL onboarding steps — the workspace is already set up.
```

---

---

## Persona 6: Lisa M. (Product Manager — No Repo)

### Profile & Journey

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  NAME:    Lisa M.                                           │
 │  TITLE:   Product Manager                                   │
 │  COMPANY: Series B SaaS (50 employees)                      │
 │  AUTH:    Google OAuth                                       │
 │  GOAL:    Import Jira backlog and get AI-powered estimates  │
 │  PATH:    Non-developer → Jira import                       │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘

 ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
 │ Google   │     │ Welcome  │     │ Connect  │     │ Invite   │     │ Enhanced │
 │ OAuth    │────>│ + Flow   │────>│ Jira     │────>│ Team     │────>│ Sprint   │
 │ 1-click  │     │ Selects: │     │ Import   │     │ Invites  │     │ Plan     │
 │          │     │ PM role, │     │ Board +  │     │ her EM   │     │ from     │
 │          │     │ "Jira"   │     │ Backlog  │     │ Sarah K. │     │ Jira     │
 │          │     │ planning │     │          │     │          │     │ + ATLAS  │
 └──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
     10 sec           30 sec           60 sec           30 sec           45 sec

 Total: ~3 minutes
 She sees: LOOP teaser (revenue-weighted backlog) in Sprint Plan
```

### What She Sees Differently

```
 STEP 1 (Welcome):
 ─────────────────────────────────────────────────────
 - Selects "Product Manager" role
 - Selects "Jira / Linear" for sprint planning method
 - This triggers Version B of Step 2 ("Connect your data")

 STEP 2 (Connect Your Data — not "Connect Repository"):
 ─────────────────────────────────────────────────────
 - Sees "Import from Jira" as the RECOMMENDED option
 - Never sees GitHub/GitLab/Bitbucket buttons
 - Connects Jira, sees 3 boards, selects Product Sprint Board
 - Imports active sprint + backlog (30 tasks)

 STEP 5 (Enhanced Sprint Plan):
 ─────────────────────────────────────────────────────
 - Sees Jira tasks enhanced with ATLAS AI estimates
 - Comparison view: "Jira: 5 pts → ATLAS: 7.2 (may be under-estimated)"
 - LOOP teaser: "Revenue-weight these priorities? LOOP connects deals."
```

---

## Persona 7: David R. (Startup Founder — Starting Fresh)

### Profile & Journey

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  NAME:    David R.                                          │
 │  TITLE:   Founder / CEO                                     │
 │  COMPANY: Pre-seed startup (5 people)                       │
 │  AUTH:    Google OAuth                                       │
 │  GOAL:    Create a sprint plan from scratch quickly         │
 │  PATH:    Non-developer → Start from scratch                │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘

 ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
 │ Google   │     │ Welcome  │     │ Invite   │     │ Manual   │
 │ OAuth    │────>│ + Flow   │────>│ Team     │────>│ Sprint   │
 │ 1-click  │     │ Selects: │     │ Invites  │     │ Builder  │
 │          │     │ Founder, │     │ his CTO  │     │ Adds 5   │
 │          │     │ "Starting │     │ + lead   │     │ tasks    │
 │          │     │  fresh"  │     │ engineer │     │ manually │
 └──────────┘     └──────────┘     └──────────┘     └──────────┘
     10 sec           30 sec           30 sec           60 sec

 Total: ~2 minutes
 Skips: Step 2 (Connect Data) and Step 3 (Select Repos)
 He sees: Manual sprint builder, AI task suggestions
```

---

## Persona 8: Tom W. (SRE/DevOps — Incident-Focused)

### Profile & Journey

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  NAME:    Tom W.                                            │
 │  TITLE:   Site Reliability Engineer                         │
 │  COMPANY: Series C SaaS (200 employees)                     │
 │  AUTH:    SSO (Okta)                                         │
 │  GOAL:    Better sprint estimates that factor in on-call    │
 │  PATH:    Developer → Repo + Integrations (Datadog)         │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘

 ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
 │ SSO      │     │ Welcome  │     │ Connect  │     │ Select   │     │ Invite   │     │ Sprint   │
 │ Okta     │────>│ + Flow   │────>│ GitHub   │────>│ Repos    │────>│ Team     │────>│ Plan     │
 │ auto     │     │ SRE role │     │ + add    │     │ infra    │     │ SRE team │     │ + SIGNAL │
 │          │     │ "repos"  │     │ Datadog  │     │ repos    │     │          │     │ teaser   │
 └──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
     5 sec            30 sec           60 sec           30 sec           30 sec           60 sec

 Total: ~3.5 minutes
 He sees: SIGNAL teaser (incident intelligence) in Sprint Plan
          PHANTOM teaser (infra tech debt) in Sprint Plan
```

---

## Decision Tree: Which Steps to Show (Updated)

```
 User finishes auth
       │
       ├── Was this an invitation?
       │     │
       │     ├── YES: Does workspace exist?
       │     │     │
       │     │     ├── YES: Skip Step 1
       │     │     │     │
       │     │     │     ├── Are repos/data already connected?
       │     │     │     │     │
       │     │     │     │     ├── YES: Skip Steps 2 & 3
       │     │     │     │     │   └── Go to Dashboard (or Step 5 if first visit)
       │     │     │     │     │
       │     │     │     │     └── NO: Show Step 2 (Connect Data)
       │     │     │     │
       │     │     │     └── Is user Admin/Manager?
       │     │     │           │
       │     │     │           ├── YES: Show Step 4 (Invite Team)
       │     │     │           └── NO: Skip Step 4
       │     │     │
       │     │     └── NO: This shouldn't happen (invitation requires workspace)
       │     │
       │     └── NO: New signup
       │           │
       │           ├── What role did they select in Step 1?
       │           │     │
       │           │     ├── Developer/EM/TechLead/CTO + "We have repos"
       │           │     │   └── Show Step 2A (Connect Repository)
       │           │     │
       │           │     ├── PM/Designer/Founder/Ops + "Jira/Linear"
       │           │     │   └── Show Step 2B (Connect Data → Jira import)
       │           │     │
       │           │     ├── Any role + "Spreadsheets"
       │           │     │   └── Show Step 2B (Connect Data → CSV import)
       │           │     │
       │           │     ├── Any role + "Notion / Docs"
       │           │     │   └── Show Step 2B (Connect Data → Notion import)
       │           │     │
       │           │     ├── Any role + "Starting fresh"
       │           │     │   └── Show Step 2B → "Start from scratch" confirmation
       │           │     │       → Skip to Step 4 (Team) → Manual builder (Step 5)
       │           │     │
       │           │     └── Any role + "Meetings only"
       │           │         └── Same as "Starting fresh" path
       │           │
       │           └── Does import reveal active sprint?
       │                 │
       │                 ├── YES: Show import wizard (doc 10)
       │                 │   └── "I have an active sprint" / "Backlog only" / "Review estimates"
       │                 │
       │                 └── NO: Continue standard flow
       │
       └── Returning user with incomplete onboarding?
             │
             ├── YES: Resume from last incomplete step
             └── NO: Show dashboard (already onboarded)
```

---

## Time Budget Summary (Updated)

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  PERSONA                TOTAL TIME    STEPS TAKEN    PRODUCTS TEASED    │
 │  ──────────────────── ────────────  ──────────────  ──────────────────  │
 │  Sarah K. (EM)          ~3 minutes    All 5           PHANTOM, LOOP     │
 │  Marcus T. (VP Prod)    ~2 minutes    3 of 5          LOOP, NEXUS       │
 │  Priya S. (invited TL)  ~90 seconds   2 of 5          PHANTOM, DRIFT    │
 │  James L. (CTO)         ~4 minutes    All 5           All products      │
 │  Adam J. (invited eng)  ~30 seconds   0 of 5          None (sees later) │
 │  Lisa M. (PM, Jira)     ~3 minutes    4 of 5 (2B)     LOOP              │
 │  David R. (Founder)     ~2 minutes    3 of 5          LOOP, NEXUS       │
 │  Tom W. (SRE)           ~3.5 minutes  All 5 + integ.  SIGNAL, PHANTOM   │
 │                                                                          │
 │  Average:               ~2.4 minutes                                    │
 │  Target:                < 5 minutes                                     │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

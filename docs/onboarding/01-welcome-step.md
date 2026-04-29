# Step 1: Welcome & Workspace Creation

> The user's first moment inside Voatomy. Set the tone, illustrate how the product works, collect workspace info, capture the startup idea template, and make them feel at home.

---

## Route: `/onboard`

---

## Where the User Comes From

```
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                                                                             │
 │  SOURCE                           WHAT JUST HAPPENED                       │
 │  ─────────────────────────────    ──────────────────────────────────────── │
 │  Google/GitHub OAuth               1-click signup. User is now logged in.  │
 │  Email signup + OTP                3-step signup. Email verified.           │
 │  SSO (enterprise)                  SAML/OIDC auth. Org already configured. │
 │                                                                             │
 │  ALL PATHS LAND HERE ──────────>  /onboard (Step 1: Welcome)               │
 │                                                                             │
 └─────────────────────────────────────────────────────────────────────────────┘
```

---

## Where the User Goes Next

```
 /onboard ──────────────> /onboard/connect (Step 2: Connect Repository / Data)
     │
     └── (invited user) ──> /dashboard (skip to team's existing workspace)
```

---

## Product Flow Illustration (Hero Section)

Before asking for any workspace details, the welcome step opens with an animated product flow illustration that shows the user exactly how Voatomy works — end to end — in a visual, digestible way. This sets expectations, reduces anxiety, and answers "What am I signing up for?"

### Product Flow Wireframe

```
 ┌────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                │
 │                      How Voatomy works                                        │
 │                                                                                │
 │  ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐        │
 │  │            │    │            │    │            │    │            │        │
 │  │  ┌──────┐  │    │  ┌──────┐  │    │  ┌──────┐  │    │  ┌──────┐  │        │
 │  │  │</>   │  │    │  │ ◎◎◎  │  │    │  │ ⚡AI  │  │    │  │ ═══  │  │        │
 │  │  │      │  │ ──>│  │      │  │ ──>│  │      │  │ ──>│  │ ═══  │  │        │
 │  │  └──────┘  │    │  └──────┘  │    │  └──────┘  │    │  └──────┘  │        │
 │  │            │    │            │    │            │    │            │        │
 │  │  Connect   │    │  Add your  │    │   ATLAS    │    │  Sprint    │        │
 │  │  your data │    │  team      │    │  analyzes  │    │  plan      │        │
 │  │            │    │            │    │            │    │  ready!    │        │
 │  └────────────┘    └────────────┘    └────────────┘    └────────────┘        │
 │                                                                                │
 │   Connect a repo,      Invite your       AI analyzes        Get accurate      │
 │   import from Jira,     engineers,        complexity,        sprint estimates  │
 │   or start fresh        leads, & PMs      dependencies       your team trusts  │
 │                                            & team capacity                     │
 │                                                                                │
 └────────────────────────────────────────────────────────────────────────────────┘
```

### Product Flow Animation Sequence

```
 TIMING                   ANIMATION
 ──────────────────────  ──────────────────────────────────────────────
 0.0s                     Step 1 card fades in + scales up
 0.3s                     Arrow 1 draws from left to right
 0.6s                     Step 2 card fades in + scales up
 0.9s                     Arrow 2 draws from left to right
 1.2s                     Step 3 card fades in + scales up (AI glow pulse)
 1.5s                     Arrow 3 draws from left to right
 1.8s                     Step 4 card fades in + scales up (confetti burst)
 2.2s                     All cards settle, subtitle text fades in below
 3.5s                     Flow illustration gently scrolls up / collapses
                          to make room for the workspace form
```

### Product Flow — What Each Card Shows

```
 CARD                 ICON               TITLE              SUBTITLE
 ──────────────────  ────────────────   ────────────────   ──────────────────────────────
 Step 1               Code bracket       Connect your       Connect a repo, import from
                      </> icon           data               Jira, or start fresh with
                                                            manual tasks

 Step 2               People circles     Add your team      Invite engineers, tech leads,
                      ◎ ◎ ◎                                 and product managers

 Step 3               Lightning bolt     ATLAS analyzes     AI maps complexity,
                      + brain ⚡AI                           dependencies, debt & capacity

 Step 4               Checklist icon     Sprint plan        Get accurate sprint estimates
                      ═══ ═══            ready!             your team actually trusts
```

### Why the Product Flow Illustration Matters

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  Without it:                                                    │
 │  • User wonders "What is this product going to do?"             │
 │  • Non-technical users panic at "Connect repository"            │
 │  • Users don't understand the AI value proposition              │
 │                                                                  │
 │  With it:                                                       │
 │  • User sees the full journey before committing                 │
 │  • Step 1 card says "or start fresh" — reduces anxiety          │
 │  • The AI card makes the value prop crystal clear               │
 │  • User feels guided, not lost                                  │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

### Responsive Behavior for Product Flow

```
 BREAKPOINT          LAYOUT
 ─────────────────  ──────────────────────────────────────────────
 Desktop (1024+)     4 cards in a horizontal row with arrows
 Tablet (768)        2x2 grid, numbered 1-4, no arrows
 Mobile (<768)       Vertical stack with numbered steps,
                     compact cards (icon left, text right)
```

---

## Full Page Wireframe (With Product Flow + Form)

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                                                                        │
 │  ┌──┐                                                                  │
 │  │//│ Voatomy                                              [X] Exit   │
 │  └──┘                                                                  │
 │                                                                        │
 │  [●━━━━━━━○━━━━━━━○━━━━━━━○━━━━━━━○]                                  │
 │   Welcome  Connect   Repos    Team    Plan                             │
 │                                                                        │
 │  ┌────────────────────────────────────────────────────────────────┐    │
 │  │                                                                │    │
 │  │                     [Celebration icon]                         │    │
 │  │                        ╭─────╮                                 │    │
 │  │                        │ ✓ ★ │    confetti animation          │    │
 │  │                        ╰─────╯                                 │    │
 │  │                                                                │    │
 │  │              Welcome to Voatomy, Sarah!                       │    │
 │  │                                                                │    │
 │  │        Let's set up your workspace in under 3 minutes.        │    │
 │  │        You'll be generating AI sprint plans in no time.       │    │
 │  │                                                                │    │
 │  │                                                                │    │
 │  │  ┌────────────── HOW VOATOMY WORKS ──────────────────────┐    │    │
 │  │  │                                                        │    │    │
 │  │  │  ┌────────┐  ──>  ┌────────┐  ──>  ┌────────┐  ──>   │    │    │
 │  │  │  │ </> ◇  │       │ ◎◎◎    │       │ ⚡AI   │       │    │    │
 │  │  │  │Connect │       │ Team   │       │Analyze │       │    │    │
 │  │  │  │ data   │       │        │       │        │       │    │    │
 │  │  │  └────────┘       └────────┘       └────────┘       │    │    │
 │  │  │                                                 ──>   │    │    │
 │  │  │  ┌──────────────────────────────────────────────┐     │    │    │
 │  │  │  │  ═══ ═══  Sprint plan ready!                 │     │    │    │
 │  │  │  └──────────────────────────────────────────────┘     │    │    │
 │  │  │                                                        │    │    │
 │  │  └────────────────────────────────────────────────────────┘    │    │
 │  │                                                                │    │
 │  │                                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  What's your team or company called?                 │     │    │
 │  │  │                                                      │     │    │
 │  │  │  Workspace name                                      │     │    │
 │  │  │  ┌──────────────────────────────────────────────┐    │     │    │
 │  │  │  │  Acme Corp                                   │    │     │    │
 │  │  │  └──────────────────────────────────────────────┘    │     │    │
 │  │  │  This is how your team will find you on Voatomy.    │     │    │
 │  │  │                                                      │     │    │
 │  │  │  Your workspace URL                                  │     │    │
 │  │  │  ┌──────────────────────────────────────────────┐    │     │    │
 │  │  │  │  voatomy.com/  acme-corp         [auto]     │    │     │    │
 │  │  │  └──────────────────────────────────────────────┘    │     │    │
 │  │  │  You can change this later in settings.             │     │    │
 │  │  │                                                      │     │    │
 │  │  │  Team size                                           │     │    │
 │  │  │  ┌───────┐ ┌────────┐ ┌──────────┐ ┌──────────┐    │     │    │
 │  │  │  │ 1-10  │ │ 11-50  │ │  51-200  │ │  200+    │    │     │    │
 │  │  │  └───────┘ └────────┘ └──────────┘ └──────────┘    │     │    │
 │  │  │                                                      │     │    │
 │  │  │  Your role                                           │     │    │
 │  │  │  ┌──────────────────────────────────────────────┐    │     │    │
 │  │  │  │  Engineering Manager                    [▼]  │    │     │    │
 │  │  │  └──────────────────────────────────────────────┘    │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  ┌────────────────────────────────────────────────────────┐   │    │
 │  │  │                   Continue                             │   │    │
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
| Celebration icon | Animated checkmark with confetti burst | 64x64, 1.2s animation on mount |
| Heading | "Welcome to Voatomy, {firstName}!" | 36px, semibold, tracking-tight |
| Subtitle | "Let's set up your workspace in under 3 minutes. You'll be generating AI sprint plans in no time." | 16px, leading-relaxed, muted |
| Workspace name label | "What's your team or company called?" | 14px semibold |
| Workspace name placeholder | "Acme Corp" | Pre-filled from email domain if corporate |
| Workspace URL label | "Your workspace URL" | 14px semibold |
| URL prefix | "voatomy.com/" | Non-editable prefix, 14px, muted |
| URL slug | Auto-generated from workspace name | Editable, lowercase, hyphens |
| URL helper | "You can change this later in settings." | 12px, muted |
| Team size | Pill selector: "1-10", "11-50", "51-200", "200+" | Active pill: brand green bg + white text |
| Role dropdown | Select: EM, Tech Lead, Product Manager, CTO/VP, Engineer, Designer, Founder, Operations, Other | 14px, full-width select |
| Startup idea template | 6-card selector (NEXUS, SIGNAL, LOOP, DRIFT, ATLAS, PHANTOM) | Required, personalized onboarding seed |
| Sprint planning question | "How do you plan sprints today?" | Pill selector, multi-select allowed |
| CTA | "Continue" | Full-width, brand green, h-12, rounded-xl |

---

## Form Fields

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  FIELD               TYPE         REQUIRED    VALIDATION                │
 │  ──────────────────  ───────────  ──────────  ──────────────────────── │
 │  Workspace name      text         Yes         Min 2 chars, max 50      │
 │  Workspace URL slug  text (auto)  Yes         Lowercase, hyphens only  │
 │                                               No special chars         │
 │                                               Unique (server check)    │
│  Team size           pill select  Yes         Must select one          │
│  Role                dropdown     Yes         Must select one          │
│  Startup idea        card select  Yes         Must select one template │
│  template            (6 cards)                (NEXUS/SIGNAL/etc.)      │
│  Sprint planning     pill select  Yes         Must select at least one │
│  method              (multi)                  (used to personalize)    │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## Startup Idea Template (New in Step 1)

The Welcome step includes a required **Startup Idea Template** selector powered by the six ideas in `MEGA_STARTUP_IDEAS.md`.

### Templates shown

- `NEXUS` — AI Organizational Nerve Center
- `SIGNAL` — Revenue-Aware Incident Intelligence
- `LOOP` — Product-Revenue Feedback Engine
- `DRIFT` — AI Design System Guardian + Revenue Optimizer
- `ATLAS` — AI Sprint Planner
- `PHANTOM` — AI Technical Debt Radar

### Why this is part of onboarding

- Personalizes integration nudges (e.g., Datadog/PagerDuty for SIGNAL, Figma for DRIFT)
- Tunes first-plan examples and sample data
- Prioritizes cross-team setup for NEXUS
- Improves time-to-value by matching onboarding to the user's actual business goal

### UX behavior

- Required selection before continuing
- Displayed as a responsive card grid (2 columns desktop, 1 column mobile)
- Each card includes:
  - product code (e.g., `ATLAS`)
  - short one-line title
  - concise summary
  - onboarding recommendation hint

See also: `docs/onboarding/12-startup-idea-templates.md`

---

## "How do you plan sprints today?" — Personalization Question

This question appears after role selection and determines the user's onboarding path:

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  How do you plan sprints today?                                         │
 │  (Select all that apply)                                                │
 │                                                                          │
 │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐      │
 │  │ 📋 Jira / Linear │  │ 📊 Spreadsheets  │  │ 📝 Notion / Docs │      │
 │  └──────────────────┘  └──────────────────┘  └──────────────────┘      │
 │                                                                          │
 │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐      │
 │  │ 🗣️ Meetings only │  │ 💻 We have repos │  │ 🆕 Starting fresh│      │
 │  └──────────────────┘  └──────────────────┘  └──────────────────┘      │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

### How Answers Affect Onboarding Path

```
 SELECTION                 ONBOARDING PATH ADJUSTMENT
 ──────────────────────── ──────────────────────────────────────────────
 "Jira / Linear"           → Show Step 2 with "Import from Jira" option
                            → Integration step (05) is promoted, not optional
                            → First plan uses imported backlog data

 "Spreadsheets"            → Show Step 2 with "Import CSV" option
                            → Offer template download for data import

 "Notion / Docs"           → Show Step 2 with "Import from Notion" option
                            → Parse existing docs for task data

 "Meetings only"           → Skip repo connection (no code context)
                            → Show manual task entry flow in Step 5
                            → Emphasize team capacity features

 "We have repos"           → Standard repo connection flow (Step 2)
                            → Highlight code complexity analysis value

 "Starting fresh"          → Skip all import flows
                            → Go directly to team setup + manual plan creation
                            → Show blank sprint canvas with AI suggestions
```

---

## Auto-Fill Intelligence

```
 SCENARIO                              AUTO-FILL BEHAVIOR
 ────────────────────────────────────  ──────────────────────────────────────────
 User signed up with sarah@acmecorp.com  Workspace name: "Acme Corp"
                                        URL slug: "acme-corp"

 User signed up with sarah@gmail.com     Workspace name: empty (user fills in)
                                        URL slug: auto-generates on type

 User was invited to a team              Skip Step 1 entirely — workspace exists

 User signed up via SSO (Okta)           Workspace name: org name from SAML
                                        URL slug: auto from org domain
```

---

## URL Slug Generation

```
 USER TYPES                          SLUG GENERATES
 ────────────────────────────────   ────────────────────
 "Acme Corp"                        acme-corp
 "My Awesome Team!!!"               my-awesome-team
 "Über Technologies"                uber-technologies
 "123 Startup Inc."                 123-startup-inc

 CONFLICT RESOLUTION:
 "acme-corp" already taken?  →  Suggest "acme-corp-1" or "acme-corp-2"
```

---

## Team Size → Plan Recommendation

```
 TEAM SIZE        RECOMMENDED PLAN       SHOWN AS
 ──────────────  ────────────────────   ──────────────────────────────────
 1-10             Free                   "Perfect for small teams — Free tier"
 11-50            Pro                    "Most teams your size choose Pro"
 51-200           Business               "Business tier unlocks cross-team features"
 200+             Enterprise             "Let's get you on Enterprise. Talk to sales?"
```

This information is stored but NOT shown as a paywall during onboarding. It's used later for in-app upgrade prompts.

---

## Validation & Error States

```
 FIELD                ERROR                          UI TREATMENT
 ──────────────────  ──────────────────────────────  ──────────────────────────
 Workspace name       "Workspace name is required"    Red border + inline text
 Workspace name       "Must be at least 2 characters" Red border + inline text
 URL slug             "This URL is already taken.     Red border + suggestion:
                       Try acme-corp-2?"              "Try [acme-corp-2]"
 URL slug             "Only lowercase letters,        Red border + inline text
                       numbers, and hyphens"
 Team size            "Please select your team size"  Highlight pill group red
 Role                 "Please select your role"       Red border on dropdown
```

---

## Animation & Microinteractions

```
 MOMENT                     ANIMATION
 ────────────────────────  ──────────────────────────────────────────────
 Page loads                 Confetti burst (subtle, 40 particles, 1.2s)
                           Checkmark scales in from 0 to 1
 Workspace name typed       URL slug generates live (debounced 300ms)
 URL slug available         Green checkmark appears next to field
 URL slug taken             Red X + suggestion appears
 Team size pill clicked     Pill scales up 1.05x, color transitions 200ms
 "Continue" clicked         Button shows loading spinner (400ms min)
 Transition to Step 2       Content slides left, new step slides in right
```

---

## What We Collect (and Why)

```
 DATA                 WHY WE NEED IT
 ──────────────────  ──────────────────────────────────────────────
 Workspace name       Display in sidebar, team invitations, URL
 URL slug             Unique workspace URL for bookmarking/sharing
 Team size            Plan recommendation, capacity defaults
 Role                 Personalize dashboard (EM sees sprint view,
                     PM sees revenue view, CTO sees org view)
```

---

## Accessibility

| Element | Requirement |
|---------|-------------|
| Confetti animation | `prefers-reduced-motion: reduce` disables it |
| Team size pills | Radio group with `role="radiogroup"` + `aria-label` |
| Role dropdown | Native `<select>` for screen reader compat |
| URL slug status | `aria-live="polite"` for availability check result |
| Focus order | Celebration → Heading → Workspace name → URL → Team size → Role → Continue |
| Keyboard nav | Tab through all fields, Enter on pills to select, Enter on Continue to submit |

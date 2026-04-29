# User Personas — Auth Context

> Who signs up for Voatomy, what they expect, and how their journey maps to the auth experience.

---

## Persona Overview

```
 ┌──────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                  │
 │  PERSONA               TITLE                    AUTH METHOD      PRIORITY        │
 │  ───────────────────   ──────────────────────   ──────────────  ──────────────── │
 │  Sarah K.               Engineering Manager     GitHub           Speed + trust   │
 │  Marcus T.              VP Product               Google           No jargon      │
 │  Priya S.               Tech Lead                GitHub / Email   Security first │
 │  James L.               CTO                      Google / SSO     Enterprise     │
 │  Adam J.                Senior Engineer           Invitation       Just join     │
 │                                                                                  │
 └──────────────────────────────────────────────────────────────────────────────────┘
```

---

## Persona 1: The Engineering Manager

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  NAME:   Sarah K.                                           │
 │  TITLE:  Engineering Manager                                │
 │  COMPANY: Series B SaaS (50–200 employees)                  │
 │  AUTH:   GitHub OAuth (primary)                              │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

### Why She Signs Up
- Sprint accuracy is stuck at 42% — her team consistently overcommits
- Planning meetings drag on for 2+ hours with story-point debates
- A tech lead on her team saw ATLAS on Twitter and shared it in Slack

### What She Expects from the Auth Page
- **Fast** — no 10-field mega-form; GitHub login is one click
- **Professional** — this is enterprise software, not a consumer app
- **Transparent** — she needs to know it won't request full repo access upfront
- **Secure** — "Never stores source code" visible somewhere

### Her Auth Journey

```
 Landing page              Signup                   Onboarding              Dashboard
 ────────────              ──────                   ──────────              ─────────

 ┌──────────┐    ┌──────────────────┐    ┌────────────────────┐    ┌──────────────┐
 │ Reads    │    │ Clicks           │    │ Connects GitHub    │    │ Generates    │
 │ landing  │───>│ "Continue with   │───>│ repo (read-only)   │───>│ first AI     │
 │ page     │    │  GitHub"         │    │                    │    │ sprint plan  │
 │          │    │                  │    │ Selects repo       │    │              │
 │ Clicks   │    │ Redirected to    │    │                    │    │ Invites      │
 │ "Get     │    │ GitHub OAuth     │    │ Invites tech leads │    │ done!        │
 │ Early    │    │                  │    │                    │    │              │
 │ Access"  │    │ 1-click approve  │    │                    │    │              │
 └──────────┘    └──────────────────┘    └────────────────────┘    └──────────────┘

 Total time: ~3 minutes
```

### What She Sees

```
 ┌───────────────────────────────────────────┐
 │                                           │
 │  [Logo] Voatomy                           │
 │                                           │
 │         Create your account               │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │  [G]  Continue with Google          │  │
 │  └─────────────────────────────────────┘  │
 │  ┌─────────────────────────────────────┐  │
 │  │  [GH] Continue with GitHub    <═══ │  │  Sarah clicks THIS
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  ──── OR ────                             │
 │  (she ignores the email form)             │
 │                                           │
 └───────────────────────────────────────────┘
```

---

## Persona 2: The Product Leader

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  NAME:   Marcus T.                                          │
 │  TITLE:  VP Product                                         │
 │  COMPANY: Growth-Stage SaaS                                 │
 │  AUTH:   Google OAuth (primary)                              │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

### Why He Signs Up
- Wants to align engineering sprints with business outcomes and revenue
- Frustrated that the backlog is disconnected from what customers actually need
- Saw the stat: "$1 TRILLION+ lost annually to cross-functional misalignment"

### What He Expects from the Auth Page
- **Google SSO** — he lives in Google Workspace (Docs, Sheets, Gmail)
- **No code jargon** — words like "repo" or "cyclomatic complexity" would alienate him
- **Product messaging** — this is a product delivery tool, not just an engineering tool
- **Quick path to value** — wants to see the dashboard within 2 minutes

### His Auth Journey

```
 Landing page              Signup                   Onboarding              Dashboard
 ────────────              ──────                   ──────────              ─────────

 ┌──────────┐    ┌──────────────────┐    ┌────────────────────┐    ┌──────────────┐
 │ Reads    │    │ Clicks           │    │ Skips repo connect │    │ Explores     │
 │ pricing  │───>│ "Continue with   │───>│ (not his domain)   │───>│ revenue      │
 │ section  │    │  Google"         │    │                    │    │ weighted     │
 │          │    │                  │    │ Invites his EM     │    │ backlog      │
 │ Clicks   │    │ Google consent   │    │ (Sarah K.)         │    │              │
 │ "Get     │    │ 1-click approve  │    │                    │    │ Connects     │
 │ Pro"     │    │                  │    │                    │    │ Salesforce   │
 └──────────┘    └──────────────────┘    └────────────────────┘    └──────────────┘

 Total time: ~2 minutes
```

---

## Persona 3: The Tech Lead

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  NAME:   Priya S.                                           │
 │  TITLE:  Tech Lead                                          │
 │  COMPANY: Mid-Size SaaS                                     │
 │  AUTH:   GitHub (or email if security-conscious)             │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

### Why She Signs Up
- Invited by her EM (Sarah K.) to join the team's Voatomy workspace
- Curious about the code complexity analysis and how AI estimates compare to hers
- Wants to verify what permissions the tool needs before connecting anything

### What She Expects from the Auth Page
- **Invitation flow** — pre-filled email, team name visible, one-click join
- **Security transparency** — she'll look for "never stores source code" before signing up
- **Technical credibility** — security badges, SOC 2 ready, encryption mentions
- **No-nonsense** — fast, clean, no marketing fluff

### Her Auth Journey (Invitation)

```
 Invitation email            Auth page                     Dashboard
 ────────────────            ─────────                     ─────────

 ┌──────────────┐    ┌──────────────────────────┐    ┌──────────────┐
 │ "Sarah       │    │                          │    │ Sees the     │
 │  invited you │    │  You've been invited to  │    │ sprint plan  │
 │  to join     │───>│  join Acme Corp          │───>│ Sarah made   │
 │  Acme Corp   │    │                          │    │              │
 │  on Voatomy" │    │  ┌────────────────────┐  │    │ Checks code  │
 │              │    │  │ Continue w GitHub   │  │    │ complexity   │
 │ [Join Now]   │    │  └────────────────────┘  │    │ scores       │
 │              │    │                          │    │              │
 └──────────────┘    └──────────────────────────┘    └──────────────┘

 Total time: ~90 seconds
```

### What She Sees (Invitation Variant)

```
 ┌───────────────────────────────────────────┐
 │                                           │
 │  [Logo] Voatomy                           │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │  You've been invited to join        │  │
 │  │  Acme Corp on Voatomy             │  │  <-- green banner
 │  │  Invited by: Sarah K.             │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │         Join Acme Corp                    │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │  [GH] Continue with GitHub    <═══ │  │  Priya clicks THIS
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  Email (pre-filled)                       │
 │  ┌─────────────────────────────────────┐  │
 │  │ priya@acmecorp.com        [lock]   │  │  <-- read-only
 │  └─────────────────────────────────────┘  │
 │                                           │
 └───────────────────────────────────────────┘
```

---

## Persona 4: The CTO / VP Engineering

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  NAME:   James L.                                           │
 │  TITLE:  CTO                                                │
 │  COMPANY: Series A startup (20–50 employees)                │
 │  AUTH:   Google or SSO (enterprise)                          │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

### Why He Signs Up
- Board is asking for engineering efficiency metrics — needs data
- Tech debt is invisible and eating into velocity but there's no dollar number
- Wants a platform that connects engineering, product, and revenue teams

### What He Expects from the Auth Page
- **Enterprise-grade feel** — SSO option visible, security links in footer
- **No "toy" vibes** — this is a strategic platform purchase, not a side-project tool
- **Clear path to enterprise** — he wants RBAC, audit logs, SSO/SAML
- **Contact Sales** visible if needed

### His Auth Journey

```
 Landing page              Signup                   Evaluation             Purchase
 ────────────              ──────                   ──────────             ────────

 ┌──────────┐    ┌──────────────────┐    ┌────────────────────┐    ┌──────────────┐
 │ Reads    │    │ Clicks           │    │ Evaluates ATLAS    │    │ Upgrades to  │
 │ security │───>│ "Continue with   │───>│ with 1 team        │───>│ Enterprise   │
 │ section  │    │  Google"         │    │                    │    │              │
 │          │    │                  │    │ Tests sprint plan  │    │ Configures   │
 │ Checks   │    │ OR clicks       │    │ accuracy           │    │ SSO via Okta │
 │ pricing  │    │ "Sign in with   │    │                    │    │              │
 │ (enter-  │    │  SSO"            │    │ Invites dept leads │    │ Onboards     │
 │  prise)  │    │                  │    │                    │    │ full org     │
 └──────────┘    └──────────────────┘    └────────────────────┘    └──────────────┘
```

### What He Looks For

```
 ┌───────────────────────────────────────────┐
 │                                           │
 │  James checks for:                        │
 │                                           │
 │  [x] SSO option visible (even collapsed)  │  Trust signal
 │  [x] "Terms" and "Privacy" in footer      │  Legal review
 │  [x] Professional, minimal design         │  Enterprise feel
 │  [x] Security page linked                 │  Due diligence
 │  [x] No flashy/playful UI                 │  Serious tool
 │                                           │
 └───────────────────────────────────────────┘
```

---

## Persona 5: The Invited Team Member

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  NAME:   Adam J.                                            │
 │  TITLE:  Senior Engineer                                    │
 │  COMPANY: Same as Sarah's (Acme Corp)                       │
 │  AUTH:   Invitation link (pre-filled email)                  │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

### Why He Signs Up
- His EM (Sarah) added him to the team's Voatomy workspace
- He received an email: "Sarah invited you to join Acme Corp on Voatomy"
- He didn't seek out the tool — he was told to join

### What He Expects
- **Pre-filled everything** — his email is already in the field, read-only
- **One-click join** — Google or GitHub, done in 10 seconds
- **No workspace setup** — he joins the existing team, doesn't create a new one
- **Clear context** — knows which team and who invited him

### His Auth Journey

```
 Email invite              Auth page              Team dashboard
 ────────────              ─────────              ──────────────

 ┌──────────────┐    ┌──────────────────┐    ┌──────────────────┐
 │ Clicks       │    │ Sees invitation  │    │ Sees Sarah's     │
 │ "Join Now"   │───>│ banner with      │───>│ sprint plan      │
 │ in email     │    │ team name        │    │ immediately      │
 │              │    │                  │    │                  │
 │              │    │ Clicks GitHub    │    │ No onboarding    │
 │              │    │ 1-click done     │    │ wizard needed    │
 └──────────────┘    └──────────────────┘    └──────────────────┘

 Total time: ~30 seconds
```

---

## Auth UX Priorities by Persona

```
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │                                                                              │
 │  PRIORITY           EM       Product    Tech Lead   CTO      Invited        │
 │  ─────────────────  ──────   ────────   ─────────   ──────   ─────────      │
 │  Speed (< 30s)      High     High       Medium      Medium   Very High      │
 │  GitHub auth         Primary  No         Primary     Maybe    Maybe          │
 │  Google auth         Fallback Primary    Fallback    Primary  Maybe          │
 │  SSO                 No       No         No          Yes      No             │
 │  Security signals    Medium   Low        High        V.High   Low            │
 │  Invitation flow     No       No         Sometimes   No       Always         │
 │  Enterprise feel     Medium   Low        Medium      V.High   Low            │
 │  Code jargon OK      Yes      No         Yes         Some     Yes            │
 │                                                                              │
 └──────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Takeaways for Auth Design

```
 INSIGHT                                    DESIGN IMPLICATION
 ─────────────────────────────────────────  ───────────────────────────────────────

 1. GitHub + Google must be equally          Both buttons are full-width, same
    prominent                                 height, same visual weight

 2. Right panel shows product value          Reinforces the decision to sign up
                                              at the moment of commitment

 3. Security messaging matters               "Never stores source code" visible
                                              on auth page (footer or right panel)

 4. Invitation flow is first-class           Pre-filled email, team banner,
                                              "Accept invitation" CTA

 5. Enterprise signals build trust           SSO option visible, security links,
                                              professional design, legal footer

 6. No code jargon on forms                  "Your email" not "your GitHub email"
                                              Keep forms universal

 7. Speed is critical                         Social auth = 1 click, email = 3 fields
                                              No unnecessary steps

 8. Demo workspace lowers barrier            Users not ready to commit can
                                              explore without signing up
```

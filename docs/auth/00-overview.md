# Voatomy Auth System — Overview

> A comprehensive guide to the authentication experience across all Voatomy products.
> Read this first, then dive into individual docs for specifics.

---

## What Is Voatomy?

Voatomy is an **AI Product Operating System** for software teams. The flagship product,
**ATLAS**, replaces gut-feel sprint estimation with AI that reads code complexity, team
capacity, tech debt, and business priority. The auth system is the front door to the
entire platform.

---

## The Big Picture

```
                            VOATOMY AUTH SYSTEM
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │   ENTRY POINTS                 AUTH PAGES              DESTINATION│
 │   ─────────────                ──────────              ───────────│
 │                                                                  │
 │   Landing page CTA ──────┐                                       │
 │   Header "Sign in" ──────┤    ┌────────────────┐                 │
 │   Direct /auth URL ──────┼───>│  Sign Up       │───> Onboarding  │
 │   Team invitation ───────┤    │  Sign In       │───> Dashboard   │
 │   Session expired ───────┤    │  Verify Email  │───> Team join   │
 │   Password reset ────────┘    │  Reset Pass    │                 │
 │                               └────────────────┘                 │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

---

## All Auth Routes at a Glance

```
 ROUTE                          WHAT IT DOES                      WHO SEES IT
 ─────────────────────────────  ────────────────────────────────  ──────────────────
 /auth/signup                   New account registration          New users
 /auth/login                    Returning user sign-in            Returning users
 /auth/verify                   6-digit email OTP entry           After email signup
 /auth/forgot-password          Request a password reset link     Forgot pass users
 /auth/reset-password?token=    Set a new password via token      From email link
 /auth/invite?token=            Accept a team invitation          Invited members
```

---

## Design DNA

The auth pages draw from two proven patterns:

```
 ┌─────────────────────────────────────────────────────────────────┐
 │                                                                 │
 │  LAYOUT from Safe.global              FUNCTIONALITY from Cursor │
 │  ─────────────────────                ─────────────────────────│
 │                                                                 │
 │  - 50/50 split-screen                 - Google + GitHub OAuth   │
 │  - Light left (form)                  - Email + password        │
 │  - Dark right (promo)                 - Multi-step signup       │
 │  - Product mockups                    - 6-digit email verify    │
 │  - Footer legal links                 - SSO for enterprise      │
 │  - Professional tone                  - "Last used" badge       │
 │                                                                 │
 └─────────────────────────────────────────────────────────────────┘
```

### What We Borrow from Safe.global (Layout + Style)
- Full-viewport split screen with a calm form panel and a visually rich promo panel
- Logo + branding at the top left, legal footer at the bottom left
- Right panel shows product screenshots and audience labels
- Clean, minimal, enterprise-grade aesthetic

### What We Borrow from Cursor (Auth Logic)
- Social auth buttons at the top (Google, GitHub)
- "OR" divider before the email form
- Multi-step: info first, then password, then email verification
- SSO as a collapsible option for enterprise users

### What We Do Differently
- No wallet connect (we're SaaS, not Web3)
- Right panel showcases ATLAS dashboard mockups + audience pills
- Invitation flow is a first-class path (team invites are common)
- "View demo workspace" as a low-commitment alternative to signing up

---

## Design Principles

| Principle | Why It Matters | How We Apply It |
|-----------|---------------|-----------------|
| **Speed** | Engineers hate slow signup | Social auth = 1 click, email form = 3 fields |
| **Trust** | Teams hand over repo access | Security badges visible, "never stores code" |
| **Clarity** | No ambiguity about what happens next | Clear headings, progressive disclosure |
| **Professional** | CTOs evaluate this as enterprise software | Split-screen layout, legal footer, SSO |
| **Accessible** | All skill levels sign up | No jargon on forms, clear error messages |

---

## Key Design Decisions

```
 DECISION                          RATIONALE
 ────────────────────────────────  ──────────────────────────────────────────
 1. Social-first auth               GitHub + Google = 80%+ of dev tool users
 2. Split-screen layout             Form feels light; promo reinforces value
 3. Multi-step signup                Reduces cognitive load vs. mega-form
 4. Email verification (OTP)        Prevents spam; OTP is harder to phish
 5. SSO collapsed by default        Only enterprise needs it; don't clutter
 6. "View demo" on login            Lowers barrier for evaluation mode
 7. Invitation as first-class       Many users arrive via team invite
 8. Always-light form panel         Readability > theme consistency for forms
```

---

## File Index

```
 docs/auth/
 ├── 00-overview.md               You are here
 ├── 01-signup-flow.md            Step-by-step signup with wireframes
 ├── 02-login-flow.md             Login, forgot/reset password, SSO
 ├── 03-layout-structure.md       Visual anatomy of the auth shell
 ├── 04-auth-providers.md         Google, GitHub, email, SSO deep-dive
 ├── 05-user-personas.md          Who signs up and their journeys
 └── 06-security-notes.md         Encryption, compliance, incident response
```

---

## Quick Reference: The Signup Page at a Glance

```
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │                                                                              │
 │  LEFT PANEL (Light)                    RIGHT PANEL (Dark)                    │
 │  ┌─────────────────────────────┐       ┌──────────────────────────────────┐  │
 │  │                             │       │                                  │  │
 │  │  [Logo] Voatomy             │       │  FOR ENGINEERING TEAMS & LEADERS │  │
 │  │   by Voatomy Labs           │       │                                  │  │
 │  │                             │       │  Sprint planning that actually   │  │
 │  │                             │       │  understands your code.          │  │
 │  │     Create your account     │       │                                  │  │
 │  │     Sign up to start        │       │  ┌──────────┐  ┌──────────────┐ │  │
 │  │     orchestrating product   │       │  │ EMs      │  │ Tech Leads   │ │  │
 │  │     delivery.               │       │  └──────────┘  └──────────────┘ │  │
 │  │                             │       │     ┌───────────────┐           │  │
 │  │  ┌─────────────────────┐    │       │     │Product Leaders│           │  │
 │  │  │ G  Continue w Google│    │       │     └───────────────┘           │  │
 │  │  └─────────────────────┘    │       │  ┌──────────┐                   │  │
 │  │  ┌─────────────────────┐    │       │  │CTOs & VPs│                   │  │
 │  │  │ GH Continue w GitHub│    │       │  └──────────┘                   │  │
 │  │  └─────────────────────┘    │       │                                  │  │
 │  │                             │       │  ┌──────────────────────────┐    │  │
 │  │  ──────── OR ────────       │       │  │ ┌─ ATLAS Dashboard ───┐ │    │  │
 │  │                             │       │  │ │ ● Sprint 24 · Plan  │ │    │  │
 │  │  First name   Last name     │       │  │ │ FE-42  3pts   87%   │ │    │  │
 │  │  ┌──────┐     ┌──────┐     │       │  │ │ BE-18  8pts   72%   │ │    │  │
 │  │  └──────┘     └──────┘     │       │  │ │ DE-7   5pts   91%   │ │    │  │
 │  │  Email                      │       │  │ └────────────────────┘ │    │  │
 │  │  ┌─────────────────────┐    │       │  └──────────────────────────┘    │  │
 │  │  └─────────────────────┘    │       │                                  │  │
 │  │  ┌─────────────────────┐    │       │  ┌─────────────────┐             │  │
 │  │  │      Continue       │    │       │  │  Phone mockup   │             │  │
 │  │  └─────────────────────┘    │       │  │  ┌───────────┐  │             │  │
 │  │                             │       │  │  │ ──────    │  │             │  │
 │  │  Already have an account?   │       │  │  │ ──────    │  │             │  │
 │  │  Sign in                    │       │  │  └───────────┘  │             │  │
 │  │                             │       │  └─────────────────┘             │  │
 │  │  ─────────────────────────  │       │                                  │  │
 │  │  (c) 2025-2026 Voatomy Labs │       │                                  │  │
 │  │  Terms  Privacy  Licenses   │       │                                  │  │
 │  └─────────────────────────────┘       └──────────────────────────────────┘  │
 │                                                                              │
 └──────────────────────────────────────────────────────────────────────────────┘
```

---

## Next Steps

| If you want to...                    | Read this doc |
|--------------------------------------|---------------|
| Understand the signup step-by-step   | `01-signup-flow.md` |
| Understand the login + reset flows   | `02-login-flow.md` |
| See the full layout anatomy          | `03-layout-structure.md` |
| Deep-dive into auth providers        | `04-auth-providers.md` |
| Know who the users are               | `05-user-personas.md` |
| Review security & compliance         | `06-security-notes.md` |

# Sign-Up Flow — Voatomy

> The complete signup journey from landing to dashboard, with wireframes for every step.

---

## Route: `/auth/signup`

---

## Who Signs Up?

Engineers, engineering managers, product leaders, and CTOs at software companies
(typically 20-500 employees) who want data-driven sprint planning.

**How they arrive:**

```
 TRAFFIC SOURCE                    % OF SIGNUPS     TYPICAL PERSONA
 ────────────────────────────────  ──────────────   ─────────────────────
 Landing page "Get Early Access"   ~45%             EM or Product Leader
 Team invitation email             ~25%             Engineer / Tech Lead
 Organic search                    ~15%             EM or CTO
 Product Hunt / community          ~10%             Tech Lead / Engineer
 Direct URL                        ~5%              Returning evaluator
```

---

## The Full Signup Journey

```
 ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
 │          │     │          │     │          │     │          │     │          │
 │  STEP 1  │────>│  STEP 2  │────>│  STEP 3  │────>│  STEP 4  │────>│  STEP 5  │
 │  Info    │     │ Password │     │  Verify  │     │ Onboard  │     │Dashboard │
 │          │     │  Setup   │     │  Email   │     │  Wizard  │     │          │
 └──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
       │                                                   ^
       │           (Social auth skips steps 2 + 3)         │
       └───────────────────────────────────────────────────┘
```

---

## Step 1: Registration — `/auth/signup`

This is the main signup page. Social buttons first, email form second.

### Wireframe

```
 ┌───────────────────────────────────────────┐
 │                                           │
 │  [Logo] Voatomy                           │
 │    by Voatomy Labs                        │
 │                                           │
 │                                           │
 │                                           │
 │           Create your account             │
 │                                           │
 │     Sign up to start orchestrating        │
 │     product delivery from planning        │
 │     to launch.                            │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │  [G]  Continue with Google          │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │  [GH] Continue with GitHub          │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  ────────────── OR ──────────────         │
 │                                           │
 │  First name            Last name          │
 │  ┌────────────────┐   ┌────────────────┐  │
 │  │ Your first name│   │ Your last name │  │
 │  └────────────────┘   └────────────────┘  │
 │                                           │
 │  Email                                    │
 │  ┌─────────────────────────────────────┐  │
 │  │ Your email address                  │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │           Continue                  │  │ <-- brand green btn
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  By creating an account, you agree to     │
 │  our Terms of Service and Privacy Policy. │
 │                                           │
 │  Already have an account? Sign in         │
 │                                           │
 │                                           │
 │  ─────────────────────────────────────    │
 │  (c) 2025-2026  Terms  Privacy  v1.0     │
 │                                           │
 └───────────────────────────────────────────┘
```

### Content Specs

| Element | Content | Style |
|---------|---------|-------|
| Heading | "Create your account" | `46px`, semibold, tight tracking |
| Subtitle | "Sign up to start orchestrating product delivery from planning to launch." | `15px`, relaxed leading, muted color |
| Google btn | "Continue with Google" | Full-width, secondary variant, Google icon left |
| GitHub btn | "Continue with GitHub" | Full-width, secondary variant, GitHub icon left |
| Divider | "OR" between two lines | `12px` bold, muted color |
| First name | Placeholder: "Your first name" | Half-width, left |
| Last name | Placeholder: "Your last name" | Half-width, right |
| Email | Placeholder: "Your email address" | Full-width |
| CTA | "Continue" | Full-width, primary/brand variant |
| Terms text | "By creating an account, you agree to our Terms of Service and Privacy Policy." | `12px`, muted, links underlined |
| Footer link | "Already have an account? **Sign in**" | `14px`, "Sign in" is bold + linked |

### Form Validation

```
 FIELD         RULE                      ERROR MESSAGE
 ───────────  ────────────────────────  ──────────────────────────────────
 First name   Required, min 1 char      "First name is required"
 Last name    Required, min 1 char      "Last name is required"
 Email        Required, valid format    "Please enter a valid email"
 Email        Already registered        "This email already has an account.
                                         Sign in instead?"
```

### What Happens When User Clicks...

| Action | Result |
|--------|--------|
| "Continue with Google" | Redirect to Google OAuth consent screen -> skip to Step 4 |
| "Continue with GitHub" | Redirect to GitHub OAuth consent screen -> skip to Step 4 |
| "Continue" (email form) | Validate fields -> proceed to Step 2 |
| "Sign in" | Navigate to `/auth/login` |
| "Terms of Service" | Open `/terms` in new tab |
| "Privacy Policy" | Open `/privacy` in new tab |

---

## Step 2: Password Setup — `/auth/signup/password`

Only shown for email-based signups. Social auth users skip this entirely.

### Wireframe

```
 ┌───────────────────────────────────────────┐
 │                                           │
 │  [Logo] Voatomy                           │
 │    by Voatomy Labs                        │
 │                                           │
 │                                           │
 │                                           │
 │           Set your password               │
 │                                           │
 │     Choose a strong password for          │
 │     your account.                         │
 │                                           │
 │  Password                                 │
 │  ┌─────────────────────────────────┐ [EYE]│
 │  │ Create a password               │      │
 │  └─────────────────────────────────┘      │
 │                                           │
 │     Password must have:                   │
 │     [x] At least 8 characters             │
 │     [x] At least 1 uppercase letter       │
 │     [ ] At least 1 number                 │
 │     [ ] At least 1 special character      │
 │                                           │
 │  Confirm password                         │
 │  ┌─────────────────────────────────┐ [EYE]│
 │  │ Confirm your password           │      │
 │  └─────────────────────────────────┘      │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │         Create account              │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  <-- Back                                 │
 │                                           │
 └───────────────────────────────────────────┘
```

### Password Requirements (Live Validation)

The checklist updates in real-time as the user types:

```
 STATE          ICON    COLOR
 ───────────   ──────  ──────────────────
 Not met        [ ]    Muted gray
 Met            [x]    Brand green (#12FF80)
 Error          [!]    Red (#EF4444)
```

### Password Rules

| Rule | Regex | Error |
|------|-------|-------|
| Min 8 characters | `.{8,}` | "Must be at least 8 characters" |
| 1 uppercase | `[A-Z]` | "Must contain an uppercase letter" |
| 1 number | `[0-9]` | "Must contain a number" |
| 1 special char | `[!@#$%^&*(),.?":{}]` | "Must contain a special character" |
| Passwords match | confirm === password | "Passwords don't match" |

---

## Step 3: Email Verification — `/auth/verify`

After account creation, user must verify their email with a 6-digit code.

### Wireframe

```
 ┌───────────────────────────────────────────┐
 │                                           │
 │  [Logo] Voatomy                           │
 │    by Voatomy Labs                        │
 │                                           │
 │                                           │
 │                                           │
 │            Check your email               │
 │                                           │
 │     We sent a 6-digit code to             │
 │     sarah@acmecorp.com                    │
 │                                           │
 │                                           │
 │         ┌─┐ ┌─┐ ┌─┐  ┌─┐ ┌─┐ ┌─┐        │
 │         │ │ │ │ │ │  │ │ │ │ │ │        │
 │         └─┘ └─┘ └─┘  └─┘ └─┘ └─┘        │
 │          1   2   3    4   5   6           │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │           Verify                    │  │ <-- disabled until
 │  └─────────────────────────────────────┘  │     all 6 filled
 │                                           │
 │  Didn't receive a code?                   │
 │  Resend (available in 58s)                │
 │                                           │
 │  Wrong email? Change email                │
 │                                           │
 └───────────────────────────────────────────┘
```

### OTP Input Behavior

```
 INTERACTION              BEHAVIOR
 ────────────────────    ──────────────────────────────────────────
 Type a digit             Fills current box, auto-focuses next box
 Backspace                Clears current box, focuses previous box
 Paste 6 digits           Auto-fills all 6 boxes from clipboard
 Invalid char             Ignored (only 0-9 accepted)
 All 6 filled             "Verify" button becomes active (green)
 Submit wrong code        Shake animation, red border, "Invalid code"
 3 wrong attempts         "Too many attempts. We sent a new code."
```

### Resend Logic

```
 ┌──────────────────────────────────────────────────────┐
 │                                                      │
 │  TIMER: "Resend (available in 58s)"                  │
 │         ↓ counts down to 0                           │
 │  ACTIVE: "Resend" (clickable, green text)            │
 │         ↓ after click                                │
 │  SENT:  "Code sent!" (green flash, 2s)               │
 │         ↓ immediately restarts                       │
 │  TIMER: "Resend (available in 60s)"                  │
 │                                                      │
 │  MAX: 5 resends per hour, then:                      │
 │  "Too many requests. Try again in X minutes."        │
 │                                                      │
 └──────────────────────────────────────────────────────┘
```

---

## Step 4: Onboarding Wizard — `/onboard`

After verification (or social auth), user lands on a guided setup flow.
This is outside the auth system but included here for journey completeness.

### Wireframe

```
 ┌───────────────────────────────────────────────────────────┐
 │                                                           │
 │  Step 1 of 3                    [●] [○] [○]               │
 │                                                           │
 │           Connect your repository                         │
 │                                                           │
 │     ATLAS needs read-only access to analyze               │
 │     code complexity. We never store source code.          │
 │                                                           │
 │  ┌─────────────────────────────────────┐                  │
 │  │  [GH] Connect GitHub               │                  │
 │  └─────────────────────────────────────┘                  │
 │  ┌─────────────────────────────────────┐                  │
 │  │  [GL] Connect GitLab               │                  │
 │  └─────────────────────────────────────┘                  │
 │  ┌─────────────────────────────────────┐                  │
 │  │  [BB] Connect Bitbucket            │                  │
 │  └─────────────────────────────────────┘                  │
 │                                                           │
 │  Skip for now -->                                         │
 │                                                           │
 │  ┌───────────────────────────────────────────────────┐    │
 │  │  "Never stores source code. Read-only API         │    │
 │  │   access. Retains only structural metadata."      │    │
 │  │                                                   │    │
 │  │   [Lock] SOC 2 Ready  [Lock] Encrypted  [Lock]   │    │
 │  └───────────────────────────────────────────────────┘    │
 │                                                           │
 └───────────────────────────────────────────────────────────┘
```

```
 ┌───────────────────────────────────────────────────────────┐
 │                                                           │
 │  Step 2 of 3                    [●] [●] [○]               │
 │                                                           │
 │           Select a repository                             │
 │                                                           │
 │  ┌─────────────────────────────────────────┐              │
 │  │  Search repositories...                 │              │
 │  └─────────────────────────────────────────┘              │
 │                                                           │
 │  ┌─────────────────────────────────────────┐              │
 │  │  [x] acmecorp/frontend        ★ 24     │              │
 │  │  [ ] acmecorp/backend          ★ 18    │              │
 │  │  [ ] acmecorp/mobile-app       ★ 12    │              │
 │  │  [ ] acmecorp/infra            ★ 8     │              │
 │  └─────────────────────────────────────────┘              │
 │                                                           │
 │  ┌───────────────────┐                                    │
 │  │   Continue         │                                   │
 │  └───────────────────┘                                    │
 │                                                           │
 └───────────────────────────────────────────────────────────┘
```

```
 ┌───────────────────────────────────────────────────────────┐
 │                                                           │
 │  Step 3 of 3                    [●] [●] [●]               │
 │                                                           │
 │           Invite your team                                │
 │                                                           │
 │  ┌─────────────────────────────────────────┐              │
 │  │  Email address                          │   [+ Add]    │
 │  └─────────────────────────────────────────┘              │
 │                                                           │
 │  ┌─────────────────────────────────────────┐              │
 │  │  priya@acmecorp.com           [Remove]  │              │
 │  │  marcus@acmecorp.com          [Remove]  │              │
 │  └─────────────────────────────────────────┘              │
 │                                                           │
 │  Or share this invite link:                               │
 │  ┌─────────────────────────────────────────┐              │
 │  │  voatomy.com/invite/abc123...    [Copy] │              │
 │  └─────────────────────────────────────────┘              │
 │                                                           │
 │  ┌───────────────────┐                                    │
 │  │  Launch ATLAS      │                                   │
 │  └───────────────────┘                                    │
 │                                                           │
 │  Skip for now -->                                         │
 │                                                           │
 └───────────────────────────────────────────────────────────┘
```

---

## Error States — Full Reference

### Inline Field Errors

```
 ┌─────────────────────────────────────┐
 │ Your email address                  │  <-- red border
 └─────────────────────────────────────┘
   ! Please enter a valid email           <-- red text below field
```

### Toast / Banner Errors

```
 ┌─────────────────────────────────────────────────────────┐
 │  [!] This email is already associated with an account.  │
 │      Sign in instead?                                   │
 └─────────────────────────────────────────────────────────┘
```

### Complete Error Catalog

| Error | When | Message | UI Treatment |
|-------|------|---------|--------------|
| Empty first name | Submit with empty field | "First name is required" | Red border + inline text |
| Empty last name | Submit with empty field | "Last name is required" | Red border + inline text |
| Invalid email | Submit with bad format | "Please enter a valid email" | Red border + inline text |
| Email taken | Submit with existing email | "This email already has an account. Sign in instead?" | Warning banner with link |
| Weak password | Typing in password field | Checklist items stay unchecked | Live validation checklist |
| Passwords don't match | Submit with mismatch | "Passwords don't match" | Red border on confirm field |
| Invalid OTP | Enter wrong code | "Invalid code. Please try again." | Shake + red border on boxes |
| OTP expired | Enter expired code | "This code has expired. We've sent a new one." | Info banner |
| Too many OTP attempts | 3+ wrong attempts | "Too many attempts. We sent a new code." | Warning banner |
| Rate limited | Too many requests | "Too many attempts. Please try again in X minutes." | Error banner |
| Social auth failed | OAuth error | "Could not connect to {provider}. Please try again." | Error banner |
| Network error | Connection lost | "Connection lost. Please check your internet." | Error banner |

---

## Invitation Signup Variant — `/auth/invite?token=...`

When a user arrives via a team invitation link, the signup page changes slightly:

### Wireframe

```
 ┌───────────────────────────────────────────┐
 │                                           │
 │  [Logo] Voatomy                           │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │  You've been invited to join        │  │
 │  │  Acme Corp on Voatomy              │  │ <-- blue/green banner
 │  │  Invited by: Sarah K.              │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │           Join Acme Corp                  │
 │                                           │
 │     Accept the invitation to start        │
 │     collaborating with your team.         │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │  [G]  Continue with Google          │  │
 │  └─────────────────────────────────────┘  │
 │  ┌─────────────────────────────────────┐  │
 │  │  [GH] Continue with GitHub          │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  ──────────── OR ────────────             │
 │                                           │
 │  Email (pre-filled, read-only)            │
 │  ┌─────────────────────────────────────┐  │
 │  │ priya@acmecorp.com          [lock]  │  │ <-- pre-filled
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │        Accept invitation            │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  Decline invitation                       │
 │                                           │
 └───────────────────────────────────────────┘
```

### Differences from Standard Signup

```
 ELEMENT                 STANDARD SIGNUP              INVITATION SIGNUP
 ─────────────────────  ─────────────────────────    ─────────────────────────
 Heading                "Create your account"        "Join {Team Name}"
 Subtitle               Generic onboarding text      "Accept the invitation..."
 Email field             Editable, empty              Pre-filled, read-only
 Name fields             Shown                        Shown (if new user)
 Invitation banner       Hidden                       Shown with team + inviter
 CTA button              "Continue"                   "Accept invitation"
 Decline option           None                        "Decline invitation" link
 Post-signup redirect    Onboarding wizard            Team dashboard directly
```

---

## Conversion Optimization Notes

```
 TECHNIQUE                        WHY IT WORKS
 ──────────────────────────────  ──────────────────────────────────────────────
 Social buttons FIRST             1-click signup = highest conversion rate
 Only 3 email form fields         Minimal friction; password deferred to step 2
 Progressive disclosure           Don't overwhelm with all fields at once
 Right panel shows product        Reinforces value at the moment of commitment
 Security signals visible         "Never stores code" reduces hesitation
 Terms are passive (not checkbox) Removes a click; standard SaaS practice
 "View demo" on login page        Catches users not ready to commit yet
```

---

## Accessibility Requirements

| Element | Requirement |
|---------|-------------|
| Social buttons | `aria-label="Sign up with Google"` |
| Form fields | `<label>` associated via `htmlFor` |
| Error messages | `aria-live="polite"` for screen readers |
| OTP inputs | `aria-label="Digit 1 of 6"` etc. |
| Password toggle | `aria-label="Show password"` / `"Hide password"` |
| Focus order | Top to bottom, logical tab order |
| Color contrast | All text passes WCAG AA (4.5:1 ratio) |
| Keyboard nav | All interactive elements reachable via Tab |

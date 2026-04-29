# Sign-In Flow — Voatomy

> Login, forgot password, reset password, SSO, and session management — with wireframes for every state.

---

## Route: `/auth/login`

---

## Who Signs In?

Returning Voatomy users who already have accounts. They arrive from:

```
 ENTRY POINT                       WHAT HAPPENS
 ────────────────────────────────  ──────────────────────────────────────
 Bookmark / direct URL             Normal login page
 Header "Sign in" link             Normal login page
 Session expired redirect          Login page + "Session expired" toast
 Password reset completion         Login page + "Password reset" toast
 Locked account retry              Login page + unlock timer shown
```

---

## Login Page — Wireframe

```
 ┌───────────────────────────────────────────┐
 │                                           │
 │  [Logo] Voatomy                           │
 │    by Voatomy Labs                        │
 │                                           │
 │                                           │
 │                                           │
 │              Get started                  │
 │                                           │
 │     Connect your workspace to access      │
 │     your Voatomy account or explore       │
 │     as a viewer.                          │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │  [G]  Continue with Google          │  │
 │  │                         LAST USED   │  │ <-- badge if applicable
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │  [GH] Continue with GitHub          │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  ──────────── OR ────────────             │
 │                                           │
 │  Email                                    │
 │  ┌─────────────────────────────────────┐  │
 │  │ Your email address                  │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  Password                                 │
 │  ┌─────────────────────────────────┐ [EYE]│
 │  │ Your password                   │      │
 │  └─────────────────────────────────┘      │
 │                                           │
 │  [ ] Remember me       Forgot password?   │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │           Sign in                   │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  ──────────── OR ────────────             │
 │                                           │
 │  View a demo workspace                    │
 │                                           │
 │  ▶ Sign in with SSO                       │ <-- collapsed
 │                                           │
 │  Don't have an account? Sign up           │
 │                                           │
 │  ─────────────────────────────────────    │
 │  (c) 2025-2026  Terms  Privacy  v1.0     │
 │                                           │
 └───────────────────────────────────────────┘
```

### Content Specs

| Element | Content | Notes |
|---------|---------|-------|
| Heading | "Get started" | Matches Safe.global wording |
| Subtitle | "Connect your workspace to access your Voatomy account or explore as a viewer." | Welcoming, not gate-keeping |
| Google btn | "Continue with Google" | + "LAST USED" badge if applicable |
| GitHub btn | "Continue with GitHub" | + "LAST USED" badge if applicable |
| Email field | "Your email address" | Full-width |
| Password field | "Your password" | + eye icon toggle |
| Remember me | Checkbox, unchecked by default | Extends session to 90 days |
| Forgot link | "Forgot password?" | Right-aligned, text link |
| Sign in btn | "Sign in" | Full-width, primary brand |
| Demo link | "View a demo workspace" | Navigates to `/demo` (no auth) |
| SSO | "Sign in with SSO" | Expandable, reveals domain input |
| Footer link | "Don't have an account? **Sign up**" | Links to `/auth/signup` |

---

## "Last Used" Badge

When a user has previously signed in, the browser stores their last auth method
in `localStorage`. On return visits, a small badge appears:

```
 ┌─────────────────────────────────────┐
 │  [G]  Continue with Google          │
 │                        ┌──────────┐ │
 │                        │LAST USED │ │
 │                        └──────────┘ │
 └─────────────────────────────────────┘

 Badge styling:
 - Background: brand/10 (subtle green)
 - Text: brand green, 10px, bold, uppercase
 - Rounded-full, pill shape
 - Position: right side of button
```

---

## SSO Expanded State

When user clicks "Sign in with SSO", it expands to show:

```
 ┌───────────────────────────────────────────┐
 │                                           │
 │  ▼ Sign in with SSO                       │
 │                                           │
 │  Enter your work email or SSO domain      │
 │  ┌─────────────────────────────────────┐  │
 │  │ name@company.com                    │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │       Continue with SSO             │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  Supports: Okta, Azure AD, Google         │
 │  Workspace, and any SAML 2.0 provider     │
 │                                           │
 └───────────────────────────────────────────┘
```

### SSO Flow

```
 User enters            System checks        Redirect
 email/domain           for SSO config       to IdP
 ──────────────────>  ──────────────────>  ──────────────────>

 ┌──────────┐         ┌──────────┐         ┌──────────────┐
 │ Enter    │         │ Lookup   │         │ Okta /       │
 │ email    │────────>│ domain   │────────>│ Azure AD /   │
 │ domain   │         │ config   │         │ Google IdP   │
 └──────────┘         └──────────┘         └──────────────┘
                           │                      │
                           │ Not found             │ Auth success
                           ▼                       ▼
                      ┌──────────┐         ┌──────────────┐
                      │ Error:   │         │ Redirect to  │
                      │ "SSO not │         │ Voatomy      │
                      │  config" │         │ dashboard    │
                      └──────────┘         └──────────────┘
```

---

## Error States

### Inline Errors

```
 ┌─────────────────────────────────────┐
 │ Your password                       │  <-- red border
 └─────────────────────────────────────┘
   ! Invalid email or password.           <-- red text
     Please try again.
```

### Banner Errors

```
 SESSION EXPIRED:
 ┌──────────────────────────────────────────────────┐
 │  [i] Your session has expired. Please sign in    │
 │      again.                                      │
 └──────────────────────────────────────────────────┘

 ACCOUNT LOCKED:
 ┌──────────────────────────────────────────────────┐
 │  [!] Account temporarily locked due to too many  │
 │      failed attempts. Try again in 12 minutes.   │
 └──────────────────────────────────────────────────┘

 UNVERIFIED EMAIL:
 ┌──────────────────────────────────────────────────┐
 │  [!] Please verify your email first. We've sent  │
 │      a new verification code to your inbox.      │
 └──────────────────────────────────────────────────┘

 PROVIDER MISMATCH:
 ┌──────────────────────────────────────────────────┐
 │  [i] This email was registered with GitHub.      │
 │      Sign in with GitHub instead.                │
 └──────────────────────────────────────────────────┘
```

### Complete Error Catalog

| Error | Trigger | Message | UI |
|-------|---------|---------|-----|
| Wrong password | Bad credentials | "Invalid email or password" | Red inline text |
| Account not found | Unknown email | "No account found. Sign up instead?" | Warning banner + link |
| Account locked | 5+ failures | "Locked. Try again in X min." | Error banner + timer |
| Unverified email | Email not verified | "Verify your email first." | Banner + resend link |
| SSO not found | Unknown domain | "SSO not configured for this domain." | Red inline under SSO field |
| Provider mismatch | Wrong auth method | "Registered with {provider}." | Info banner + link |
| Network error | No connection | "Connection lost." | Error banner |
| Rate limited | Too many requests | "Too many attempts. Wait X min." | Error banner |

---

## Forgot Password — `/auth/forgot-password`

### Wireframe

```
 ┌───────────────────────────────────────────┐
 │                                           │
 │  [Logo] Voatomy                           │
 │    by Voatomy Labs                        │
 │                                           │
 │                                           │
 │                                           │
 │         Reset your password               │
 │                                           │
 │     Enter the email address linked to     │
 │     your account and we'll send you       │
 │     a reset link.                         │
 │                                           │
 │  Email                                    │
 │  ┌─────────────────────────────────────┐  │
 │  │ Your email address                  │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │        Send reset link              │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 │  <-- Back to sign in                      │
 │                                           │
 └───────────────────────────────────────────┘
```

### Success State

```
 ┌───────────────────────────────────────────┐
 │                                           │
 │  [Logo] Voatomy                           │
 │    by Voatomy Labs                        │
 │                                           │
 │                                           │
 │                                           │
 │         Check your inbox                  │
 │                                           │
 │     We sent a password reset link to      │
 │     sarah@acmecorp.com                    │
 │                                           │
 │     The link expires in 1 hour.           │
 │                                           │
 │                                           │
 │       ┌────────────────────┐              │
 │       │ [Envelope icon]    │              │
 │       │                    │              │
 │       │  Check your email  │              │
 │       └────────────────────┘              │
 │                                           │
 │                                           │
 │  Didn't get it? Resend                    │
 │                                           │
 │  <-- Back to sign in                      │
 │                                           │
 └───────────────────────────────────────────┘
```

**Security note**: The success screen always shows "If an account exists, we've sent a link."
This prevents email enumeration — an attacker can't tell if an email is registered.

---

## Reset Password — `/auth/reset-password?token=...`

### Wireframe

```
 ┌───────────────────────────────────────────┐
 │                                           │
 │  [Logo] Voatomy                           │
 │    by Voatomy Labs                        │
 │                                           │
 │                                           │
 │                                           │
 │         Set a new password                │
 │                                           │
 │     Choose a new password for your        │
 │     Voatomy account.                      │
 │                                           │
 │  New password                             │
 │  ┌─────────────────────────────────┐ [EYE]│
 │  │ Enter new password              │      │
 │  └─────────────────────────────────┘      │
 │                                           │
 │     Password must have:                   │
 │     [x] At least 8 characters             │
 │     [x] At least 1 uppercase letter       │
 │     [x] At least 1 number                 │
 │     [x] At least 1 special character      │
 │                                           │
 │  Confirm new password                     │
 │  ┌─────────────────────────────────┐ [EYE]│
 │  │ Confirm new password            │      │
 │  └─────────────────────────────────┘      │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │        Reset password               │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 └───────────────────────────────────────────┘
```

### Token Error States

```
 EXPIRED TOKEN:
 ┌───────────────────────────────────────────┐
 │                                           │
 │         Link expired                      │
 │                                           │
 │     This password reset link has          │
 │     expired. Request a new one.           │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │      Request new link               │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 └───────────────────────────────────────────┘

 INVALID TOKEN:
 ┌───────────────────────────────────────────┐
 │                                           │
 │         Invalid link                      │
 │                                           │
 │     This password reset link is invalid   │
 │     or has already been used.             │
 │                                           │
 │  ┌─────────────────────────────────────┐  │
 │  │      Request new link               │  │
 │  └─────────────────────────────────────┘  │
 │                                           │
 └───────────────────────────────────────────┘
```

### After Successful Reset

```
 Redirect to: /auth/login

 Toast notification (top of login page):
 ┌──────────────────────────────────────────────────┐
 │  [check] Password reset successfully. Sign in    │
 │          with your new password.                 │
 └──────────────────────────────────────────────────┘
```

---

## Session Management

```
 SESSION TYPE         DURATION     TRIGGER
 ──────────────────  ───────────  ────────────────────────────────
 Default session      30 days      Normal login (no "remember me")
 Extended session      90 days      Login with "remember me" checked
 Access token          15 min       API calls (silent refresh)
 Refresh token         30 days      Rotated on each use
```

### Session Lifecycle

```
 ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
 │          │    │          │    │          │    │          │
 │  Login   │───>│  Active  │───>│  Idle    │───>│  Expired │
 │          │    │  Session │    │  Warning │    │  Logout  │
 │          │    │          │    │  (5 min) │    │          │
 └──────────┘    └──────────┘    └──────────┘    └──────────┘
                      │                               │
                      │  Activity detected             │
                      └───────────────────────────────┘
                            (resets timer)
```

### Multi-Device Behavior

- Users can be logged in on multiple devices simultaneously
- Password change on any device invalidates all other sessions
- "Sign out everywhere" option available in account settings
- New device login triggers a security email notification

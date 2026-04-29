# Auth Providers — Voatomy

> Deep dive into every authentication method: Google, GitHub, Email+Password, and SSO.
> Includes OAuth flows, scopes, button specs, and account linking behavior.

---

## Provider Overview

```
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │                                                                              │
 │  PROVIDER          WHO USES IT              PLAN        SIGNUP STEPS         │
 │  ───────────────  ──────────────────────   ─────────   ──────────────────── │
 │  Google OAuth      PMs, Designers, Biz     All plans    1 step (1-click)    │
 │  GitHub OAuth      Engineers, Tech Leads   All plans    1 step (1-click)    │
 │  Email+Password    Security-conscious      All plans    3 steps (info→pw→OTP)│
 │  SSO (SAML/OIDC)  Enterprise orgs          Enterprise   2 steps (domain→IdP)│
 │                                                                              │
 └──────────────────────────────────────────────────────────────────────────────┘
```

---

## Provider 1: Google OAuth 2.0

### Why Google?

Product managers, designers, and business stakeholders live in Google Workspace.
Google SSO is the lowest-friction option for non-engineering users.

### OAuth Flow

```
 USER                    VOATOMY                   GOOGLE
 ───────                ──────────                ────────

 Click "Continue
 with Google"
      │
      ├───────────────> Generate state +
                        PKCE code_verifier
                             │
                             ├──────────────────> Google consent
                                                  screen
                                                       │
                        User approves <────────────────┘
                             │
                             ├──────────────────> Exchange code
                                                  for tokens
                                                       │
                        Receive tokens <───────────────┘
                        (id_token + access_token)
                             │
                        Extract profile:
                        - Email
                        - Full name
                        - Avatar URL
                        - Google ID
                             │
                        Create/match account
                             │
      <─────────────── Redirect to dashboard
                        (or onboarding if new)
```

### Scopes Requested

```
 SCOPE                    WHY
 ────────────────────    ────────────────────────────────────
 openid                  Standard OIDC authentication
 email                   Get the user's email address
 profile                 Get display name and avatar
```

### Button Spec

```
 ┌──────────────────────────────────────────────┐
 │                                              │
 │  ┌──┐                                       │
 │  │G │  Continue with Google                  │
 │  └──┘                                       │
 │                                              │
 └──────────────────────────────────────────────┘

 Style:
 - Full-width within form container (max-w-390px)
 - Height: 48px (h-12)
 - Border: 1px solid border-theme
 - Background: bg-theme-subtle (white in light, dark in dark mode)
 - Icon: Google "G" multicolor logo, 20x20
 - Text: 14px semibold
 - Hover: bg-theme-card, shadow-sm
 - Border-radius: 12px (rounded-xl)
```

---

## Provider 2: GitHub OAuth

### Why GitHub?

Engineers and tech leads already live in GitHub. It's the most natural auth
provider for a tool that integrates with code repositories.

### OAuth Flow

```
 USER                    VOATOMY                   GITHUB
 ───────                ──────────                ────────

 Click "Continue
 with GitHub"
      │
      ├───────────────> Generate state +
                        PKCE code_verifier
                             │
                             ├──────────────────> GitHub authorize
                                                  page
                                                       │
                        User approves <────────────────┘
                             │
                             ├──────────────────> POST /access_token
                                                       │
                        Receive access_token <─────────┘
                             │
                             ├──────────────────> GET /user
                             ├──────────────────> GET /user/emails
                                                       │
                        Receive profile <──────────────┘
                        - Email (primary)
                        - Username
                        - Display name
                        - Avatar URL
                        - GitHub ID
                             │
                        Create/match account
                             │
      <─────────────── Redirect to dashboard
```

### Scopes Requested

```
 SCOPE                    WHY
 ────────────────────    ────────────────────────────────────
 user:email               Access user's email addresses
 read:user                Basic profile info (name, avatar)

 NOTE: We do NOT request `repo` scope during auth.
       Repo access is requested separately during
       onboarding when the user connects a repository.
       This separation builds trust.
```

### Button Spec

```
 ┌──────────────────────────────────────────────┐
 │                                              │
 │  ┌──┐                                       │
 │  │GH│  Continue with GitHub                  │
 │  └──┘                                       │
 │                                              │
 └──────────────────────────────────────────────┘

 Style:
 - Identical to Google button dimensions
 - Icon: GitHub mark (Octocat silhouette), 20x20
 - In dark mode: icon is white
 - In light mode: icon is black (#121312)
```

---

## Provider 3: Email + Password

### Why Email?

Fallback for users who prefer traditional auth, have corporate email
restrictions, or don't want to link social accounts to a work tool.

### Registration Flow

```
 ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
 │          │      │          │      │          │      │          │
 │ Step 1   │─────>│ Step 2   │─────>│ Step 3   │─────>│ Done     │
 │ Info     │      │ Password │      │ Verify   │      │ Onboard  │
 │          │      │          │      │ Email    │      │          │
 └──────────┘      └──────────┘      └──────────┘      └──────────┘

 Step 1 fields:          Step 2 fields:        Step 3:
 - First name            - Password            - 6-digit OTP
 - Last name             - Confirm password    - Resend option
 - Email                                       - Change email
```

### Login Flow

```
 ┌──────────────────┐      ┌──────────┐
 │                  │      │          │
 │ Email + Password │─────>│ Dashboard│
 │                  │      │          │
 └──────────────────┘      └──────────┘
         │
         │ Wrong password (5x)
         ▼
 ┌──────────────────┐
 │ Account locked   │
 │ 15-min cooldown  │
 └──────────────────┘
```

### Password Requirements

```
 REQUIREMENT                  REGEX              VISUAL INDICATOR
 ─────────────────────────   ─────────────────  ────────────────────
 At least 8 characters        .{8,}             [x] green or [ ] gray
 At least 1 uppercase         [A-Z]             [x] green or [ ] gray
 At least 1 number            [0-9]             [x] green or [ ] gray
 At least 1 special char      [!@#$%^&*(),.?]   [x] green or [ ] gray
 Passwords match              a === b            Inline error if not
 Not in last 5 passwords      server check       "Cannot reuse recent password"
```

### Form Fields (Email Signup)

```
 ┌───────────────────────────────────────────────────────────────────────────┐
 │                                                                           │
 │  FIELD            TYPE      REQUIRED   VALIDATION           PLACEHOLDER   │
 │  ───────────────  ────────  ────────   ──────────────────  ───────────── │
 │  First name       text      Yes        Min 1 char          Your first    │
 │  Last name        text      Yes        Min 1 char          Your last     │
 │  Email            email     Yes        RFC 5322 format     your@email    │
 │  Password         password  Yes        See rules above     Create a pw   │
 │  Confirm pass     password  Yes        Must match above    Confirm pw    │
 │                                                                           │
 └───────────────────────────────────────────────────────────────────────────┘
```

---

## Provider 4: SSO (SAML 2.0 / OIDC)

### Who Uses It?

Enterprise-tier customers who require centralized identity management.

### Supported Identity Providers

```
 PROVIDER                      PROTOCOL        NOTES
 ────────────────────────────  ────────────    ──────────────────────────
 Okta                          SAML 2.0        Most common enterprise IdP
 Azure AD (Microsoft Entra)    OIDC / SAML     Microsoft ecosystem
 Google Workspace              OIDC            Google-first orgs
 OneLogin                      SAML 2.0        Mid-market popular
 JumpCloud                     SAML 2.0        Cloud-first orgs
 Any SAML 2.0 compliant        SAML 2.0        Custom IdP support
 Any OIDC compliant            OIDC            Custom IdP support
```

### SSO Login Flow

```
 USER                    VOATOMY                   IDENTITY PROVIDER
 ───────                ──────────                ──────────────────

 Click "Sign in
 with SSO"
      │
 Enter email or
 domain
      │
      ├───────────────> Lookup domain
                        in SSO config
                             │
                        Found? ──── No ──> Error: "SSO not configured"
                             │
                           Yes
                             │
                             ├──────────────────> SAML AuthnRequest
                                                  OR
                                                  OIDC /authorize
                                                       │
                        User authenticates <────────────┘
                        at their company IdP
                        (Okta, Azure AD, etc.)
                                                       │
                             <─────────────────── SAML Response
                                                  OR
                                                  OIDC tokens
                             │
                        Validate assertion
                        Extract: email, name, role
                             │
                        Auto-provision or
                        match existing account
                             │
      <─────────────── Redirect to dashboard
```

### SSO UI States

```
 COLLAPSED (default):
 ┌───────────────────────────────────────┐
 │  ▶ Sign in with SSO                  │
 └───────────────────────────────────────┘

 EXPANDED (after click):
 ┌───────────────────────────────────────┐
 │  ▼ Sign in with SSO                  │
 │                                       │
 │  Enter your work email or SSO domain  │
 │  ┌─────────────────────────────────┐  │
 │  │ name@company.com                │  │
 │  └─────────────────────────────────┘  │
 │                                       │
 │  ┌─────────────────────────────────┐  │
 │  │     Continue with SSO           │  │
 │  └─────────────────────────────────┘  │
 │                                       │
 │  Supports Okta, Azure AD, Google      │
 │  Workspace, and SAML 2.0 providers    │
 │                                       │
 └───────────────────────────────────────┘

 ERROR:
 ┌───────────────────────────────────────┐
 │  ┌─────────────────────────────────┐  │
 │  │ acme-startup.com                │  │  <-- red border
 │  └─────────────────────────────────┘  │
 │  ! SSO is not configured for this     │
 │    domain. Contact your admin.        │
 └───────────────────────────────────────┘
```

### Admin SSO Configuration

Enterprise admins configure SSO in **Organization Settings > Security > SSO**:

```
 ┌───────────────────────────────────────────────────────────────┐
 │                                                               │
 │  SETTING                         VALUE                        │
 │  ──────────────────────────────  ────────────────────────────│
 │  Identity Provider              [Okta ▼]                     │
 │  IdP Metadata URL               https://acme.okta.com/...    │
 │  Entity ID                      https://voatomy.com/sso/acme │
 │  ACS Callback URL (read-only)   https://voatomy.com/api/...  │
 │                                                               │
 │  Attribute Mapping:                                           │
 │  - Email         →  user.email                                │
 │  - First name    →  user.firstName                            │
 │  - Last name     →  user.lastName                             │
 │  - Role          →  user.role                                 │
 │                                                               │
 │  [ ] Enforce SSO (disable password login for this org)        │
 │  [ ] Enable SCIM auto-provisioning                            │
 │                                                               │
 └───────────────────────────────────────────────────────────────┘
```

---

## Provider Display Order

On both signup and login pages:

```
 ┌──────────────────────────────────────────────┐
 │                                              │
 │  1. ┌──────────────────────────────────────┐ │   SOCIAL AUTH
 │     │  [G]  Continue with Google           │ │   (highest conversion)
 │     └──────────────────────────────────────┘ │
 │                                              │
 │  2. ┌──────────────────────────────────────┐ │
 │     │  [GH] Continue with GitHub           │ │
 │     └──────────────────────────────────────┘ │
 │                                              │
 │  3. ──────────────── OR ──────────────────── │   DIVIDER
 │                                              │
 │  4. [Email + Password form fields]           │   EMAIL FORM
 │                                              │   (traditional fallback)
 │  5. ──────────────── OR ──────────────────── │   DIVIDER (login only)
 │                                              │
 │  6. View a demo workspace                    │   DEMO (login only)
 │                                              │
 │  7. ▶ Sign in with SSO                       │   SSO
 │                                              │   (enterprise, collapsed)
 └──────────────────────────────────────────────┘

 WHY THIS ORDER:
 - Social buttons first = fastest path to conversion
 - Email below divider = clear fallback, not the default
 - SSO collapsed = only ~5% of users need it
 - Demo link on login = catches evaluators who aren't ready
```

---

## Account Linking

When users sign up with one method and later try another:

```
 SCENARIO                                      WHAT HAPPENS
 ────────────────────────────────────────────  ──────────────────────────────────

 Signed up with email,                         Banner: "This email is linked to
 tries Google login                            an email account. Sign in with
                                               email or link your accounts."

 Signed up with Google,                        Banner: "This email is linked to
 tries GitHub login                            a Google account. Sign in with
                                               Google or link your accounts."

 User confirms linking                         Both methods now work for the
                                               same Voatomy account.

 Signed up with SSO,                           SSO accounts cannot be linked
 tries email login                             to other methods (security policy).
```

### Account Linking Wireframe

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  [i] This email is already associated with a Google account. │
 │                                                              │
 │  ┌──────────────────────┐  ┌───────────────────────────┐    │
 │  │ Sign in with Google  │  │ Link accounts instead     │    │
 │  └──────────────────────┘  └───────────────────────────┘    │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

---

## Token & Session Strategy

```
 TOKEN TYPE         PURPOSE                  LIFETIME       STORAGE
 ────────────────  ────────────────────────  ─────────────  ──────────────────
 Access token       API authentication       15 minutes     HTTP-only cookie
 Refresh token      Silent token renewal     30 days        HTTP-only cookie
 Session cookie     Browser session          30 / 90 days   HTTP-only cookie
 CSRF token         Prevent cross-site       Per session    Double-submit
 OAuth state        Prevent OAuth CSRF       5 minutes      Server-side
 PKCE verifier      Secure code exchange     5 minutes      Server-side

 Security properties:
 - All cookies: HTTP-only, Secure, SameSite=Strict
 - Refresh tokens: one-time use (rotated on each refresh)
 - Suspicious activity (new device/country): forces re-auth
```

# Security & Compliance — Auth System

> Encryption, hashing, rate limiting, compliance standards, and incident response.
> This doc covers everything a security reviewer or CTO needs to evaluate the auth system.

---

## Security Architecture Overview

```
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │                                                                              │
 │                          VOATOMY AUTH SECURITY LAYERS                        │
 │                                                                              │
 │  ┌────────────────────────────────────────────────────────────────────────┐  │
 │  │  LAYER 1: NETWORK                                                      │  │
 │  │  TLS 1.3 · HTTPS everywhere · HSTS · Rate limiting · DDoS protection  │  │
 │  └────────────────────────────────────────────────────────────────────────┘  │
 │                                                                              │
 │  ┌────────────────────────────────────────────────────────────────────────┐  │
 │  │  LAYER 2: APPLICATION                                                  │  │
 │  │  CSRF tokens · PKCE · Input sanitization · CSP headers · XSS defense  │  │
 │  └────────────────────────────────────────────────────────────────────────┘  │
 │                                                                              │
 │  ┌────────────────────────────────────────────────────────────────────────┐  │
 │  │  LAYER 3: AUTHENTICATION                                               │  │
 │  │  bcrypt/Argon2id · OAuth state · Token rotation · Session management  │  │
 │  └────────────────────────────────────────────────────────────────────────┘  │
 │                                                                              │
 │  ┌────────────────────────────────────────────────────────────────────────┐  │
 │  │  LAYER 4: DATA                                                         │  │
 │  │  AES-256 at rest · RLS per tenant · Hashed OTPs · Encrypted backups   │  │
 │  └────────────────────────────────────────────────────────────────────────┘  │
 │                                                                              │
 │  ┌────────────────────────────────────────────────────────────────────────┐  │
 │  │  LAYER 5: MONITORING                                                   │  │
 │  │  Audit logs · Anomaly detection · Alert pipeline · Incident response  │  │
 │  └────────────────────────────────────────────────────────────────────────┘  │
 │                                                                              │
 └──────────────────────────────────────────────────────────────────────────────┘
```

---

## Authentication Security

### Password Hashing

```
 ALGORITHM     COST FACTOR   WHY
 ────────────  ───────────   ──────────────────────────────────────────
 bcrypt        12 rounds     Industry standard, battle-tested, slow by design
 Argon2id      (alt)         Memory-hard, resistant to GPU/ASIC attacks

 Both produce a one-way hash. Passwords are NEVER stored in plaintext.
 Even database breach cannot reveal original passwords.
```

### Brute Force Protection

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  ATTEMPT    WHAT HAPPENS                                         │
 │  ─────────  ──────────────────────────────────────────────────── │
 │  1-4        Normal login attempts, errors shown inline           │
 │  5          Account LOCKED for 15 minutes                        │
 │             User sees: "Account temporarily locked.              │
 │             Try again in 15 minutes."                            │
 │             Email sent: "Someone tried to access your account"   │
 │  5+ (diff   IP-level rate limit kicks in                         │
 │   accounts) Entire IP blocked for 30 minutes                     │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

### Session Token Security

```
 PROPERTY           SETTING              WHY
 ─────────────────  ──────────────────  ────────────────────────────────
 HTTP-only          true                 JS cannot read cookies (XSS safe)
 Secure             true                 Only sent over HTTPS
 SameSite           Strict               Prevents CSRF via cross-origin
 Domain             .voatomy.com         Scoped to our domain
 Path               /                    Available on all routes
 Max-Age            30d (or 90d)         Matches session duration
```

---

## OAuth Security

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  MEASURE              HOW IT WORKS                     ATTACK PREVENTED  │
 │  ──────────────────  ──────────────────────────────   ─────────────────  │
 │  State parameter     Random nonce in OAuth state      CSRF attacks       │
 │  PKCE                Code verifier + challenge        Auth code theft    │
 │  Redirect allowlist  Only voatomy.com/api/auth/cb     Open redirect      │
 │  Server-side tokens  Tokens never sent to browser     Token exposure     │
 │  Scope minimization  Only email + profile             Data overcollect   │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

### OAuth State Flow

```
 ┌──────────┐         ┌──────────┐         ┌──────────┐
 │          │         │          │         │          │
 │ Generate │────────>│ Store in │────────>│ Include  │
 │ random   │         │ server   │         │ in OAuth │
 │ state    │         │ session  │         │ redirect │
 │          │         │          │         │          │
 └──────────┘         └──────────┘         └──────────┘
                                                 │
                                                 │ OAuth callback
                                                 ▼
                      ┌──────────┐         ┌──────────┐
                      │          │         │          │
                      │ Compare  │<────────│ Extract  │
                      │ state    │         │ state    │
                      │ values   │         │ from URL │
                      │          │         │          │
                      └──────────┘         └──────────┘
                           │
                      Match? ──── No ──> Reject request
                           │
                         Yes
                           │
                      Continue auth
```

---

## Email Verification Security

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  PROPERTY              VALUE              WHY                    │
 │  ──────────────────    ──────────────    ───────────────────────│
 │  Format                6-digit numeric   Simple to type/read    │
 │  Delivery              Email only        Not SMS (SIM swap risk)│
 │  Expiry                10 minutes        Short window           │
 │  Max attempts/code     3                 Prevent guessing       │
 │  Max resends/hour      5                 Prevent abuse          │
 │  Storage               Hashed (bcrypt)   Not stored in plain    │
 │  One-time use          Yes               Can't reuse old codes  │
 │                                                                  │
 │  WHY OTP (not clickable link)?                                   │
 │  - Links can be intercepted by email previews                    │
 │  - Links can be auto-clicked by email security scanners          │
 │  - OTP requires user intent (they must type it)                  │
 │  - Harder to phish (attacker needs the code, not just a click)  │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

---

## Password Reset Security

```
 PROPERTY              VALUE                  WHY
 ──────────────────   ──────────────────────  ───────────────────────────
 Token length          32 bytes (256 bits)    Cryptographically secure
 Token format          URL-safe base64        Safe in email links
 Expiry                1 hour                 Reasonable window
 One-time use          Yes                    Invalidated after use
 Rate limit            3 requests/hour        Prevent abuse
 Response              Always generic          Prevent email enumeration
 Password history      Last 5 blocked         Prevent reuse
 Side effects          Invalidate sessions    Force re-auth everywhere

 GENERIC RESPONSE (prevents email enumeration):
 ┌──────────────────────────────────────────────────────────────┐
 │  "If an account exists for this email, we've sent a         │
 │   password reset link."                                     │
 │                                                              │
 │  (Same message whether email exists or not)                  │
 └──────────────────────────────────────────────────────────────┘
```

---

## Data Privacy

### What We Collect

```
 DATA                  PURPOSE                       RETENTION          ENCRYPTED
 ──────────────────   ────────────────────────────  ─────────────────  ─────────
 Email address         Account identity, comms       Duration of acct   Yes (rest)
 Full name             Display in app                Duration of acct   Yes (rest)
 Hashed password       Authentication                Duration of acct   N/A (hash)
 OAuth provider ID     Account linking               Duration of acct   Yes (rest)
 IP address            Security logging, abuse        90 days            Yes (rest)
 User agent            Session management             90 days            Yes (rest)
 Login timestamps      Audit trail                   1 year             Yes (rest)
 Last auth method      "Last used" badge             Duration of acct   No (localStorage)
```

### What We NEVER Collect

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  [x] Source code          NEVER, at any point                    │
 │  [x] Browser fingerprint  Beyond user agent string               │
 │  [x] Location data        Beyond IP-derived country              │
 │  [x] Contacts             Address book or social graph           │
 │  [x] Payment info         Handled by Stripe, not us              │
 │  [x] Browsing history     What you do outside Voatomy            │
 │  [x] Keystrokes           No keystroke logging                   │
 │  [x] Screen recordings    No session replay tools                │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

---

## Compliance Matrix

```
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │                                                                              │
 │  STANDARD        STATUS          AUTH RELEVANCE                              │
 │  ──────────────  ──────────────  ──────────────────────────────────────────  │
 │  SOC 2 Type II   In progress     Audit logs, access controls, encryption    │
 │  GDPR             Compliant       Data minimization, right to delete         │
 │  CCPA             Compliant       Privacy policy, data access requests       │
 │  HIPAA            N/A             Voatomy doesn't handle health data         │
 │  PCI DSS          N/A             Payment handled entirely by Stripe         │
 │                                                                              │
 └──────────────────────────────────────────────────────────────────────────────┘
```

### SOC 2 Auth Requirements

```
 CONTROL                     HOW WE IMPLEMENT IT
 ─────────────────────────  ───────────────────────────────────────────
 Access controls              RBAC with roles: owner, admin, member, viewer
 Least privilege               Each role has minimal required permissions
 Audit logging                 Every auth event logged with timestamp + IP
 Encryption in transit         TLS 1.3 for all connections
 Encryption at rest            AES-256 for all stored data
 Multi-factor auth             OAuth acts as 2FA (Google/GitHub have their own MFA)
 Session management            Automatic expiry, rotation, invalidation
 Incident response             Automated alerts, runbooks, escalation paths
```

### GDPR Auth Requirements

```
 RIGHT                        HOW WE IMPLEMENT IT
 ─────────────────────────   ────────────────────────────────────────────
 Right to access              Users export auth data from account settings
 Right to rectification       Users can update name, email in settings
 Right to deletion            Account deletion removes all data within 30 days
 Right to portability         Data export in JSON format
 Data minimization            Only collect what's necessary for auth
 Consent                      Clear terms shown during signup (not pre-checked)
 Breach notification          Users notified within 72 hours of any breach
```

---

## Visible Security Signals

These signals are shown on the auth pages to build trust with CTOs and security-conscious users:

### On the Sign-Up Page

```
 RIGHT PANEL (bottom area):
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
 │  │ [Lock]   │  │ [Shield] │  │ [Key]    │  │ [Check]  │   │
 │  │ Never    │  │ Encrypted│  │ Tenant   │  │ SOC 2    │   │
 │  │ stores   │  │ at every │  │ isolated │  │ ready    │   │
 │  │ code     │  │ layer    │  │          │  │          │   │
 │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

### On the Sign-In Page

```
 ELEMENTS THAT SIGNAL SECURITY:
 ┌──────────────────────────────────────────┐
 │                                          │
 │  [x] Lock icon near password field       │  Visual safety
 │  [x] "Forgot password?" link             │  Responsible handling
 │  [x] "Sign in with SSO" option           │  Enterprise readiness
 │  [x] "Terms" and "Privacy" in footer     │  Legal compliance
 │  [x] "Security" link in footer           │  Transparency
 │                                          │
 └──────────────────────────────────────────┘
```

---

## Incident Response

### Auth Event Monitoring

```
 EVENT                               ACTION                    SEVERITY
 ──────────────────────────────────  ────────────────────────  ────────
 5 failed logins (same account)      Lock account 15 min       Medium
 5 failed logins (same IP, diff      Block IP 30 min           High
   accounts)
 Login from new device/country       Send notification email   Low
 Password changed                    Email confirmation +      Medium
                                     invalidate other sessions
 OAuth token used from unexpected    Revoke token, force       High
   location                          re-auth
 Mass failed logins (>100/min)       Trigger DDoS protection   Critical
 Data breach detected                Force password reset      Critical
                                     for all affected accounts
```

### Incident Response Flow

```
 ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
 │          │    │          │    │          │    │          │    │          │
 │ DETECT   │───>│ CONTAIN  │───>│ ANALYZE  │───>│ REMEDIATE│───>│ REVIEW   │
 │          │    │          │    │          │    │          │    │          │
 │ Automated│    │ Lock     │    │ Root     │    │ Fix +    │    │ Post-    │
 │ alerts   │    │ affected │    │ cause    │    │ deploy   │    │ mortem   │
 │ + manual │    │ accounts │    │ analysis │    │ patch    │    │ report   │
 │ review   │    │          │    │          │    │          │    │          │
 └──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
     1 min           5 min          1 hour         24 hours        48 hours
     (SLA)          (SLA)           (SLA)          (SLA)           (SLA)
```

---

## Security Email Templates

### New Device Login

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  Subject: New sign-in to your Voatomy account                │
 │                                                              │
 │  Hi Sarah,                                                   │
 │                                                              │
 │  We noticed a new sign-in to your account:                   │
 │                                                              │
 │  Device:    Chrome on macOS                                  │
 │  Location:  San Francisco, CA, US                            │
 │  Time:      Feb 21, 2026 at 3:42 PM PST                     │
 │                                                              │
 │  If this was you, no action is needed.                       │
 │                                                              │
 │  If this wasn't you:                                         │
 │  [Change your password]  [Sign out everywhere]               │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

### Failed Login Attempts

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  Subject: Unusual activity on your Voatomy account           │
 │                                                              │
 │  Hi Sarah,                                                   │
 │                                                              │
 │  We detected 5 failed login attempts on your account.        │
 │  Your account has been temporarily locked for 15 minutes.    │
 │                                                              │
 │  If this was you, wait 15 minutes and try again.             │
 │                                                              │
 │  If this wasn't you:                                         │
 │  [Reset your password]                                       │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

---

## Terms & Conditions (Auth Context)

```
 DURING SIGNUP:

 Small text below the "Continue" / "Create account" button:

 "By creating an account, you agree to our
  Terms of Service and Privacy Policy."

 - Both are links opening in new tabs
 - NOT a pre-checked checkbox (removes friction)
 - NOT an unchecked checkbox (standard SaaS practice)
 - The act of clicking "Continue" constitutes acceptance
 - Compliant with GDPR (consent is explicit and informed)
```

### Legal Links in Footer

```
 LINK              URL               CONTENT
 ────────────────  ─────────────    ────────────────────────────────
 Terms             /terms            Service agreement, usage rules
 Privacy           /privacy          Data collection, processing, sharing
 Licenses          /licenses         Open-source license attributions
 Imprint           /imprint          Legal entity info (required in EU)
 Cookie policy     /cookies          Cookie usage and consent
 Security          /security         Security practices, SOC 2 status
```

---

## Quick Security Checklist

For developers implementing the auth system:

```
 BEFORE LAUNCH:

 [ ] Passwords hashed with bcrypt (cost 12) or Argon2id
 [ ] All cookies: HTTP-only, Secure, SameSite=Strict
 [ ] CSRF protection on all state-changing endpoints
 [ ] PKCE enabled for all OAuth flows
 [ ] OAuth redirect URIs whitelisted (no wildcards)
 [ ] Rate limiting on login (5 attempts → lockout)
 [ ] Rate limiting on OTP resend (5/hour)
 [ ] OTP codes hashed, not stored in plaintext
 [ ] Password reset tokens: one-time use, 1hr expiry
 [ ] Generic error messages (no email enumeration)
 [ ] CSP headers set (no inline scripts)
 [ ] TLS 1.3 enforced, HSTS enabled
 [ ] Audit logging for all auth events
 [ ] Security email notifications implemented
 [ ] Input sanitization on all form fields
 [ ] CAPTCHA/Turnstile on registration (anti-bot)
 [ ] Account deletion flow removes all auth data
```

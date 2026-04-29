# Step 4: Team Setup & Invitations

> Invite team members to the workspace. This step drives viral growth and ensures the product is used collaboratively.

---

## Route: `/onboard/team`

---

## Source & Destination

```
 /onboard/repos                 /onboard/team                   /onboard/first-plan
 ══════════════                 ═════════════                   ═══════════════════

 ┌──────────────┐    ┌──────────────────────────────┐    ┌──────────────┐
 │ User selected│    │                              │    │ User's first │
 │ repos for    │───>│  Invite team members         │───>│ AI sprint    │
 │ analysis     │    │  + set roles + share link    │    │ plan is      │
 │              │    │                              │    │ generated    │
 └──────────────┘    │  OR                         │    │              │
                     │  Skip for now ───────────────│───>│              │
                     └──────────────────────────────┘    └──────────────┘
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
 │  [●━━━━━━━●━━━━━━━●━━━━━━━●━━━━━━━○]                                  │
 │   Welcome  Connect   Repos    Team    Plan                             │
 │                                                                        │
 │  ┌────────────────────────────────────────────────────────────────┐    │
 │  │                                                                │    │
 │  │            ┌──────────┐                                       │    │
 │  │            │  ◎ ◎ ◎   │  team icon                           │    │
 │  │            │  ◎   ◎   │                                       │    │
 │  │            └──────────┘                                       │    │
 │  │                                                                │    │
 │  │              Invite your team                                 │    │
 │  │                                                                │    │
 │  │     ATLAS works best with your whole team. Invite             │    │
 │  │     engineers, tech leads, and product managers.              │    │
 │  │                                                                │    │
 │  │                                                                │    │
 │  │  Add by email                                                 │    │
 │  │  ┌──────────────────────────────────────────┐  ┌────────┐    │    │
 │  │  │  colleague@acmecorp.com                  │  │ + Add  │    │    │
 │  │  └──────────────────────────────────────────┘  └────────┘    │    │
 │  │                                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌─────┐  priya@acmecorp.com                        │     │    │
 │  │  │  │ PS  │  Role: ┌──────────────┐         [Remove]  │     │    │
 │  │  │  └─────┘        │ Tech Lead [▼]│                    │     │    │
 │  │  │                 └──────────────┘                    │     │    │
 │  │  │  ──────────────────────────────────────────────     │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌─────┐  marcus@acmecorp.com                       │     │    │
 │  │  │  │ MT  │  Role: ┌──────────────┐         [Remove]  │     │    │
 │  │  │  └─────┘        │ PM       [▼] │                    │     │    │
 │  │  │                 └──────────────┘                    │     │    │
 │  │  │  ──────────────────────────────────────────────     │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌─────┐  adam@acmecorp.com                         │     │    │
 │  │  │  │ AJ  │  Role: ┌──────────────┐         [Remove]  │     │    │
 │  │  │  └─────┘        │ Engineer [▼] │                    │     │    │
 │  │  │                 └──────────────┘                    │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  ──────────────── OR ────────────────                         │    │
 │  │                                                                │    │
 │  │  Share invite link                                            │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │  https://voatomy.com/invite/acme-corp/x7k9...       │     │    │
 │  │  │                                           [Copy]    │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │  Anyone with this link can join as a Member.                  │    │
 │  │  [Manage link settings]                                      │    │
 │  │                                                                │    │
 │  │  ┌────────────────────────────────────────────────────────┐   │    │
 │  │  │         Send invitations & continue                    │   │    │
 │  │  └────────────────────────────────────────────────────────┘   │    │
 │  │                                                                │    │
 │  │       Skip for now -->                                        │    │
 │  │                                                                │    │
 │  └────────────────────────────────────────────────────────────────┘    │
 │                                                                        │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## Role Definitions

```
 ROLE                PERMISSIONS                                  DEFAULT FOR
 ──────────────────  ──────────────────────────────────────────  ───────────────
 Admin               Full access: billing, settings, members     Workspace creator
 Manager             Create plans, manage repos, invite members  EM, Tech Lead
 Member              View plans, comment, update tasks           Engineer, Designer
 Viewer              Read-only access to plans and reports       PM, Stakeholder
```

### Role Dropdown Options

```
 ┌──────────────────────────┐
 │  Admin                   │  Full workspace control
 │  Manager                 │  Create plans, manage repos
 │  Member (default)        │  View & contribute to plans
 │  Viewer                  │  Read-only access
 └──────────────────────────┘
```

---

## Invite Methods

### Method 1: Email Invitations

```
 STEP               BEHAVIOR
 ─────────────────  ──────────────────────────────────────────────
 1. Type email       Auto-complete from same domain (if org has
                    existing members)
 2. Click "+ Add"    Email added to invitation list with avatar
                    (initials if no Gravatar)
 3. Assign role      Default: "Member". Dropdown to change.
 4. Click "Send"     Bulk send all invitations at once
```

### Method 2: Share Link

```
 STEP               BEHAVIOR
 ─────────────────  ──────────────────────────────────────────────
 1. Link is pre-     Generated on workspace creation
    generated
 2. Click "Copy"     Copies to clipboard, toast: "Link copied!"
 3. Share in Slack    User shares manually in their Slack/Teams
 4. Anyone clicks    They land on /auth/invite?token=...
```

### Link Settings (expandable)

```
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │  Invite link settings                                       │
 │                                                              │
 │  Default role for link joiners:                             │
 │  ┌──────────────────────────┐                               │
 │  │  Member              [▼] │                               │
 │  └──────────────────────────┘                               │
 │                                                              │
 │  Link expiration:                                           │
 │  ┌──────────────────────────┐                               │
 │  │  7 days              [▼] │                               │
 │  └──────────────────────────┘                               │
 │                                                              │
 │  Max uses:                                                  │
 │  ┌──────────────────────────┐                               │
 │  │  Unlimited            [▼] │                               │
 │  └──────────────────────────┘                               │
 │                                                              │
 │  [Regenerate link]  (invalidates current link)              │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

---

## Invitation Email Preview

```
 ┌──────────────────────────────────────────────────────────────────┐
 │                                                                  │
 │  From: Voatomy <noreply@voatomy.com>                            │
 │  Subject: Sarah invited you to join Acme Corp on Voatomy        │
 │                                                                  │
 │  ──────────────────────────────────────────────────────────     │
 │                                                                  │
 │  ┌──┐                                                            │
 │  │//│ Voatomy                                                    │
 │  └──┘                                                            │
 │                                                                  │
 │  Hi there,                                                      │
 │                                                                  │
 │  Sarah K. invited you to join Acme Corp's workspace             │
 │  on Voatomy — the AI sprint planner that understands            │
 │  your code.                                                      │
 │                                                                  │
 │  ┌────────────────────────────────────────┐                     │
 │  │          Join Acme Corp                │                     │
 │  └────────────────────────────────────────┘                     │
 │                                                                  │
 │  Your role: Tech Lead                                           │
 │  This invitation expires in 7 days.                             │
 │                                                                  │
 │  ────────────────────────────────────────                       │
 │  Voatomy · Sprint planning that actually                        │
 │  understands your code.                                         │
 │                                                                  │
 └──────────────────────────────────────────────────────────────────┘
```

---

## Plan Limits for Team Size

```
 PLAN             MAX MEMBERS           UI AT LIMIT
 ───────────────  ─────────────────    ──────────────────────────────────
 Free             8 members             "Free plan supports up to 8
                                        members. Upgrade to Pro for
                                        unlimited." [See plans]
 Pro              Unlimited             No limit
 Business         Unlimited             No limit
 Enterprise       Unlimited             No limit
```

---

## Validation & Error States

```
 ERROR                          TRIGGER                         UI
 ────────────────────────────  ────────────────────────────    ──────────────────────────
 Invalid email                  Bad format typed               Red border + "Please enter
                                                               a valid email address"
 Self-invite                    User's own email               Toast: "That's you! Invite
                                                               someone else."
 Duplicate email                Already in invite list         Toast: "Already added."
 Already a member               Email already in workspace     Toast: "Already a member
                                                               of this workspace."
 Plan limit reached             8+ on Free plan                Info banner + upgrade link
 Send failed                    Network error                  Toast: "Could not send
                                                               invitation. Try again."
```

---

## What Happens After Invitations

```
 "Send invitations & continue" clicked
       │
       ├───> Invitation emails sent (async)
       │     Toast: "3 invitations sent!"
       │
       └───> Redirect to /onboard/first-plan (Step 5)


 "Skip for now" clicked
       │
       └───> Redirect to /onboard/first-plan (Step 5)
             flag: team_invited = false
```

---

## Accessibility

| Element | Requirement |
|---------|-------------|
| Email input | `aria-label="Invite email address"` |
| Add button | `aria-label="Add email to invitation list"` |
| Role dropdowns | `aria-label="Set role for {email}"` |
| Remove buttons | `aria-label="Remove {email} from invitation list"` |
| Copy link button | `aria-label="Copy invite link"` + toast confirmation |
| Invitation list | `role="list"` with `role="listitem"` children |
| Empty state | Descriptive text, not just visual |

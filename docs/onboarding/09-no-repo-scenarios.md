# Non-Developer & No-Repository Scenarios

> Not every user has a codebase. Not every user is technical. This doc covers every scenario where the traditional "connect your repo" path doesn't apply — and how Voatomy gracefully adapts.

---

## The Core Problem

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  The default onboarding assumes:                                        │
 │  1. The user is a developer or engineering leader                       │
 │  2. They have a code repository to connect                              │
 │  3. ATLAS will analyze code complexity                                  │
 │                                                                          │
 │  But many real users DON'T fit this mold:                               │
 │  • Product managers who don't touch code                                │
 │  • Founders who want sprint planning for their team                     │
 │  • Designers, ops leads, and project managers                           │
 │  • Teams that haven't started coding yet                                │
 │  • Teams whose code lives in private/inaccessible repos                 │
 │                                                                          │
 │  These users should NEVER feel like second-class citizens.              │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## Who Falls Into This Category?

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                          │
 │  PERSONA              ROLE               SITUATION                  WHAT THEY NEED       │
 │  ──────────────────  ────────────────   ──────────────────────────  ──────────────────── │
 │  Lisa M.              Product Manager    No repo access, uses Jira  Import from Jira     │
 │  David R.             Startup Founder    Pre-code MVP stage         Manual task creation  │
 │  Rachel K.            Design Lead        Figma-first workflow       Design-to-sprint      │
 │  Tom W.               Ops Manager        Infrastructure, no repo    Manual + integrations │
 │  Nina S.              Project Manager    External client projects   Spreadsheet import    │
 │  Sam P.               Freelancer         Client's code, no access  Manual estimates      │
 │                                                                                          │
 └──────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Decision Tree: Detecting No-Repo Users

```
 User completes Step 1 (Welcome)
       │
       ├── What role did they select?
       │     │
       │     ├── Product Manager, Designer, Founder, Operations, Other
       │     │     │
       │     │     └── LIKELY no-repo user → Show ALTERNATIVE Step 2
       │     │
       │     └── Engineer, Tech Lead, EM, CTO/VP
       │           │
       │           └── LIKELY has repos → Show standard Step 2
       │
       ├── What did they answer for "How do you plan sprints?"
       │     │
       │     ├── "Jira / Linear"           → Import path
       │     ├── "Spreadsheets"             → CSV import path
       │     ├── "Notion / Docs"            → Notion import path
       │     ├── "Meetings only"            → Manual entry path
       │     ├── "We have repos"            → Standard repo path
       │     └── "Starting fresh"           → Blank slate path
       │
       └── COMBINE role + sprint method to determine path
```

---

## Alternative Step 2: "Connect Your Data" (Replaces "Connect Repository")

For non-developer users, Step 2 transforms from "Connect your repository" to "Connect your data" — a broader, friendlier step that offers multiple ways to bring in project data.

---

## If the Team Has No Board (Jira/ClickUp) Yet

Some teams want planning and reports but do not have a sprint board.

ATLAS should offer two friendly paths:
- Start fresh: create a first plan manually and connect tools later.
- Create a board: guide the user to set up a minimal Jira or ClickUp board, then return to import.

Board setup guide:
- `docs/onboarding/15-jira-clickup-board-setup.md`

### Wireframe — Connect Your Data

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                                                                        │
 │  ┌──┐                                                                  │
 │  │//│ Voatomy                                              [X] Exit   │
 │  └──┘                                                                  │
 │                                                                        │
 │  [●━━━━━━━●━━━━━━━○━━━━━━━○━━━━━━━○]                                  │
 │   Welcome  Data      Team    Plan    Review                            │
 │                                                                        │
 │  ┌────────────────────────────────────────────────────────────────┐    │
 │  │                                                                │    │
 │  │            ┌──────────┐                                       │    │
 │  │            │  ◇ ─ ◇   │   data connections icon              │    │
 │  │            │    ◇     │                                       │    │
 │  │            └──────────┘                                       │    │
 │  │                                                                │    │
 │  │              Where does your project data live?               │    │
 │  │                                                                │    │
 │  │        ATLAS works best with context. Connect a data          │    │
 │  │        source so we can build smarter sprint plans.           │    │
 │  │                                                                │    │
 │  │                                                                │    │
 │  │  RECOMMENDED FOR YOU                                          │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌────────────────────────────────────────────────┐  │     │    │
 │  │  │  │  [Jira icon]  Import from Jira         ★ BEST │  │     │    │
 │  │  │  │  Pull existing tickets, sprints, and backlog   │  │     │    │
 │  │  │  └────────────────────────────────────────────────┘  │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  OTHER OPTIONS                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌────────────────────────────────────────────────┐  │     │    │
 │  │  │  │  [Linear icon]   Import from Linear            │  │     │    │
 │  │  │  │  Sync issues, cycles, and projects             │  │     │    │
 │  │  │  └────────────────────────────────────────────────┘  │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌────────────────────────────────────────────────┐  │     │    │
 │  │  │  │  [CSV icon]      Import from spreadsheet       │  │     │    │
 │  │  │  │  Upload a CSV or Excel file with your tasks    │  │     │    │
 │  │  │  └────────────────────────────────────────────────┘  │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌────────────────────────────────────────────────┐  │     │    │
 │  │  │  │  [Notion icon]   Import from Notion            │  │     │    │
 │  │  │  │  Connect a Notion database or board            │  │     │    │
 │  │  │  └────────────────────────────────────────────────┘  │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌────────────────────────────────────────────────┐  │     │    │
 │  │  │  │  [Code icon]     Connect a code repository     │  │     │    │
 │  │  │  │  GitHub, GitLab, or Bitbucket                  │  │     │    │
 │  │  │  └────────────────────────────────────────────────┘  │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌────────────────────────────────────────────────┐  │     │    │
 │  │  │  │  [Pencil icon]   Start from scratch            │  │     │    │
 │  │  │  │  Create tasks manually — no import needed      │  │     │    │
 │  │  │  └────────────────────────────────────────────────┘  │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  └────────────────────────────────────────────────────────────────┘    │
 │                                                                        │
 └────────────────────────────────────────────────────────────────────────┘
```

### "RECOMMENDED" Badge Logic (Updated)

```
 USER ROLE + SPRINT METHOD              RECOMMENDED OPTION
 ──────────────────────────────────── ──────────────────────────────────────
 PM + "Jira / Linear"                   Import from Jira (★ BEST)
 PM + "Spreadsheets"                    Import from spreadsheet (★ BEST)
 Engineer + "We have repos"             Connect repository (★ BEST)
 Designer + "Notion / Docs"             Import from Notion (★ BEST)
 Founder + "Starting fresh"             Start from scratch (★ BEST)
 Any role + "Meetings only"             Start from scratch (★ BEST)
 EM + "Jira / Linear" + "We have repos" Import from Jira + Connect repo (both starred)
```

---

## Import from Jira Flow

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  User clicks "Import from Jira"                                        │
 │       │                                                                  │
 │       ├──> Jira OAuth consent screen                                    │
 │       │    (read-only: issues, sprints, boards)                         │
 │       │                                                                  │
 │       ├──> User approves → Voatomy fetches:                             │
 │       │    • Active board(s) and their columns                          │
 │       │    • Current sprint (if any)                                     │
 │       │    • Backlog items with story points                            │
 │       │    • Labels, assignees, priorities                              │
 │       │                                                                  │
 │       ├──> Import Preview Screen:                                       │
 │       │                                                                  │
 │       │    ┌────────────────────────────────────────────────────┐       │
 │       │    │                                                    │       │
 │       │    │  Found 3 boards and 47 issues in Jira              │       │
 │       │    │                                                    │       │
 │       │    │  ┌──────────────────────────────────────────┐     │       │
 │       │    │  │ [x] Board: "Product Sprint Board"        │     │       │
 │       │    │  │     Active sprint: Sprint 14 (8 tasks)   │     │       │
 │       │    │  │     Backlog: 22 items                    │     │       │
 │       │    │  │                                          │     │       │
 │       │    │  │ [x] Board: "Design Tasks"                │     │       │
 │       │    │  │     No active sprint                      │     │       │
 │       │    │  │     Backlog: 12 items                    │     │       │
 │       │    │  │                                          │     │       │
 │       │    │  │ [ ] Board: "Infrastructure"              │     │       │
 │       │    │  │     Active sprint: Sprint 7 (5 tasks)    │     │       │
 │       │    │  │     Backlog: 8 items                     │     │       │
 │       │    │  └──────────────────────────────────────────┘     │       │
 │       │    │                                                    │       │
 │       │    │  ┌──────────────────────────────────────────┐     │       │
 │       │    │  │      Import 2 boards (30 tasks)          │     │       │
 │       │    │  └──────────────────────────────────────────┘     │       │
 │       │    │                                                    │       │
 │       │    │  ATLAS will use your existing story points         │       │
 │       │    │  as a baseline and add code-aware complexity      │       │
 │       │    │  scores on top.                                    │       │
 │       │    │                                                    │       │
 │       │    └────────────────────────────────────────────────────┘       │
 │       │                                                                  │
 │       └──> Continue to Team Setup                                       │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## Import from Spreadsheet Flow

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  User clicks "Import from spreadsheet"                                 │
 │       │                                                                  │
 │       ├──> Upload screen:                                               │
 │       │                                                                  │
 │       │    ┌────────────────────────────────────────────────────┐       │
 │       │    │                                                    │       │
 │       │    │  Import tasks from a spreadsheet                   │       │
 │       │    │                                                    │       │
 │       │    │  ┌──────────────────────────────────────────┐     │       │
 │       │    │  │                                          │     │       │
 │       │    │  │      Drag & drop your file here          │     │       │
 │       │    │  │      or [Browse files]                   │     │       │
 │       │    │  │                                          │     │       │
 │       │    │  │      Accepts: .csv, .xlsx, .xls          │     │       │
 │       │    │  │      Max size: 10MB                      │     │       │
 │       │    │  │                                          │     │       │
 │       │    │  └──────────────────────────────────────────┘     │       │
 │       │    │                                                    │       │
 │       │    │  Don't have a file ready?                          │       │
 │       │    │  [Download our template]  (pre-formatted CSV)     │       │
 │       │    │                                                    │       │
 │       │    └────────────────────────────────────────────────────┘       │
 │       │                                                                  │
 │       ├──> Column Mapping Screen (after upload):                        │
 │       │                                                                  │
 │       │    ┌────────────────────────────────────────────────────┐       │
 │       │    │                                                    │       │
 │       │    │  Map your columns                                  │       │
 │       │    │                                                    │       │
 │       │    │  We found 24 rows and 6 columns.                   │       │
 │       │    │                                                    │       │
 │       │    │  Task title:    ┌────────────────────┐             │       │
 │       │    │                 │ "Title"         [▼] │             │       │
 │       │    │                 └────────────────────┘             │       │
 │       │    │                                                    │       │
 │       │    │  Description:   ┌────────────────────┐             │       │
 │       │    │                 │ "Details"       [▼] │             │       │
 │       │    │                 └────────────────────┘             │       │
 │       │    │                                                    │       │
 │       │    │  Priority:      ┌────────────────────┐             │       │
 │       │    │                 │ "Priority"     [▼] │             │       │
 │       │    │                 └────────────────────┘             │       │
 │       │    │                                                    │       │
 │       │    │  Story points:  ┌────────────────────┐             │       │
 │       │    │   (optional)    │ "Points"       [▼] │             │       │
 │       │    │                 └────────────────────┘             │       │
 │       │    │                                                    │       │
 │       │    │  Assignee:      ┌────────────────────┐             │       │
 │       │    │   (optional)    │ "Assigned To"  [▼] │             │       │
 │       │    │                 └────────────────────┘             │       │
 │       │    │                                                    │       │
 │       │    │  ┌──────────────────────────────────────────┐     │       │
 │       │    │  │       Import 24 tasks                    │     │       │
 │       │    │  └──────────────────────────────────────────┘     │       │
 │       │    │                                                    │       │
 │       │    └────────────────────────────────────────────────────┘       │
 │       │                                                                  │
 │       └──> Continue to Team Setup                                       │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

### CSV Template

```
 COLUMN                REQUIRED     EXAMPLE
 ──────────────────── ──────────   ──────────────────────────────
 Title                 Yes          "Implement user authentication"
 Description           No           "Add OAuth with Google and GitHub"
 Priority              No           "High" / "Medium" / "Low"
 Story Points          No           5
 Assigned To           No           "sarah@acmecorp.com"
 Status                No           "To Do" / "In Progress" / "Done"
 Sprint                No           "Sprint 14"
 Labels/Tags           No           "frontend, auth"
```

---

## Import from Notion Flow

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  User clicks "Import from Notion"                                      │
 │       │                                                                  │
 │       ├──> Notion OAuth (read access to selected pages)                 │
 │       │                                                                  │
 │       ├──> Page/Database Selector:                                      │
 │       │                                                                  │
 │       │    ┌────────────────────────────────────────────────────┐       │
 │       │    │                                                    │       │
 │       │    │  Select a Notion database or board                 │       │
 │       │    │                                                    │       │
 │       │    │  ┌──────────────────────────────────────────┐     │       │
 │       │    │  │ [x] 📋 Sprint Backlog (database)         │     │       │
 │       │    │  │     32 items · Last edited 2 days ago    │     │       │
 │       │    │  │                                          │     │       │
 │       │    │  │ [ ] 📋 Product Roadmap (database)        │     │       │
 │       │    │  │     18 items · Last edited 1 week ago    │     │       │
 │       │    │  │                                          │     │       │
 │       │    │  │ [ ] 📄 Engineering Specs (page)          │     │       │
 │       │    │  │     Can't import — not a database        │     │       │
 │       │    │  └──────────────────────────────────────────┘     │       │
 │       │    │                                                    │       │
 │       │    │  ┌──────────────────────────────────────────┐     │       │
 │       │    │  │       Import selected database           │     │       │
 │       │    │  └──────────────────────────────────────────┘     │       │
 │       │    │                                                    │       │
 │       │    └────────────────────────────────────────────────────┘       │
 │       │                                                                  │
 │       └──> Map Notion properties to Voatomy fields                      │
 │            (same column mapping as CSV, auto-detected)                  │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## "Start from Scratch" Flow

For users who have no existing data and want to create tasks manually:

```
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                                                                          │
 │  User clicks "Start from scratch"                                      │
 │       │                                                                  │
 │       ├──> Confirmation:                                                │
 │       │                                                                  │
 │       │    ┌────────────────────────────────────────────────────┐       │
 │       │    │                                                    │       │
 │       │    │  Starting fresh!                                   │       │
 │       │    │                                                    │       │
 │       │    │  No worries — you can create tasks manually        │       │
 │       │    │  or connect a data source anytime from Settings.  │       │
 │       │    │                                                    │       │
 │       │    │  ATLAS will use your team's input and any          │       │
 │       │    │  integrations you add to generate smart            │       │
 │       │    │  sprint plans.                                     │       │
 │       │    │                                                    │       │
 │       │    │  ┌──────────────────────────────────────────┐     │       │
 │       │    │  │         Continue to team setup            │     │       │
 │       │    │  └──────────────────────────────────────────┘     │       │
 │       │    │                                                    │       │
 │       │    └────────────────────────────────────────────────────┘       │
 │       │                                                                  │
 │       ├──> Skips Step 3 (Select Repos) entirely                         │
 │       │                                                                  │
 │       └──> Step 5 (First Plan) shows manual task creation               │
 │            instead of AI analysis                                       │
 │                                                                          │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

## Modified Step 5 for No-Repo Users: Manual Sprint Builder

When a user has no repo and no imported backlog, Step 5 transforms into an interactive sprint builder:

### Wireframe — Manual Sprint Builder

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                                                                        │
 │  ┌──┐                                                                  │
 │  │//│ Voatomy                                              [X] Exit   │
 │  └──┘                                                                  │
 │                                                                        │
 │  [●━━━━━━━●━━━━━━━●━━━━━━━●━━━━━━━●]                                  │
 │   Welcome  Data      Team    Plan    Review                            │
 │                                                                        │
 │  ┌────────────────────────────────────────────────────────────────┐    │
 │  │                                                                │    │
 │  │              Build your first sprint plan                     │    │
 │  │                                                                │    │
 │  │     Add the tasks your team is working on this sprint.        │    │
 │  │     ATLAS will help estimate effort and find risks.           │    │
 │  │                                                                │    │
 │  │                                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  Sprint 1 · 2-week sprint                           │     │    │
 │  │  │  ─────────────────────────                          │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌──────────────────────────────────────────────┐   │     │    │
 │  │  │  │ + Add a task                                  │   │     │    │
 │  │  │  │                                              │   │     │    │
 │  │  │  │ Task title: ┌──────────────────────────────┐ │   │     │    │
 │  │  │  │             │ e.g. "Build login page"      │ │   │     │    │
 │  │  │  │             └──────────────────────────────┘ │   │     │    │
 │  │  │  │                                              │   │     │    │
 │  │  │  │ Estimate:  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │   │     │    │
 │  │  │  │ (optional) │  S  │ │  M  │ │  L  │ │ XL  │ │   │     │    │
 │  │  │  │            └─────┘ └─────┘ └─────┘ └─────┘ │   │     │    │
 │  │  │  │                                              │   │     │    │
 │  │  │  │ Priority:  ┌─────┐ ┌─────┐ ┌─────┐         │   │     │    │
 │  │  │  │ (optional) │ Low │ │ Med │ │ High│         │   │     │    │
 │  │  │  │            └─────┘ └─────┘ └─────┘         │   │     │    │
 │  │  │  │                                              │   │     │    │
 │  │  │  │  [Add task]                                  │   │     │    │
 │  │  │  └──────────────────────────────────────────────┘   │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ── Added Tasks ──────────────────────────────────  │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌──────────────────────────────────────────────┐   │     │    │
 │  │  │  │  1. Build login page        M  High  [Edit]  │   │     │    │
 │  │  │  │  2. Design settings UI      L  Med   [Edit]  │   │     │    │
 │  │  │  │  3. Set up CI/CD pipeline   S  Low   [Edit]  │   │     │    │
 │  │  │  └──────────────────────────────────────────────┘   │     │    │
 │  │  │                                                      │     │    │
 │  │  │  3 tasks added                                      │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │  💡 Tip: Add at least 3-5 tasks for ATLAS to give   │     │    │
 │  │  │     meaningful sprint estimates and identify risks.   │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  ┌────────────────────────────────────────────────────────┐   │    │
 │  │  │          Generate sprint plan with ATLAS               │   │    │
 │  │  └────────────────────────────────────────────────────────┘   │    │
 │  │                                                                │    │
 │  │  Or [Add tasks later from dashboard →]                        │    │
 │  │                                                                │    │
 │  └────────────────────────────────────────────────────────────────┘    │
 │                                                                        │
 └────────────────────────────────────────────────────────────────────────┘
```

### AI Suggestions for Manual Tasks

When a user adds a task title, ATLAS can suggest improvements:

```
 USER TYPES                        ATLAS SUGGESTS
 ──────────────────────────────── ──────────────────────────────────────────
 "Build login page"                 "Consider splitting into:
                                     - Design login UI components
                                     - Implement auth flow
                                     - Add form validation
                                     Would you like to add these?"

 "Fix the bug"                      "Can you add more detail? This helps
                                     ATLAS estimate accurately. Try:
                                     'Fix payment calculation rounding error'"

 "Research competitors"             "This sounds like a research task.
                                     ATLAS can track these separately.
                                     Mark as: [Research] [Spike] [Task]"
```

---

## Modified Step 5 for Imported Backlog Users

When a user imported from Jira/Linear/CSV, Step 5 shows the imported data enhanced by ATLAS:

### Wireframe — Imported Sprint Review

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                                                                        │
 │  ┌──┐                                                                  │
 │  │//│ Voatomy                                              [X] Exit   │
 │  └──┘                                                                  │
 │                                                                        │
 │  [●━━━━━━━●━━━━━━━●━━━━━━━●━━━━━━━●]                                  │
 │   Welcome  Data      Team    Plan    Review                            │
 │                                                                        │
 │  ┌────────────────────────────────────────────────────────────────┐    │
 │  │                                                                │    │
 │  │              Your sprint plan is enhanced!                    │    │
 │  │                                                                │    │
 │  │     ATLAS imported 22 tasks from Jira and added              │    │
 │  │     AI-powered estimates and risk analysis.                  │    │
 │  │                                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │                                                      │     │    │
 │  │  │  Sprint 14 · Jan 27 - Feb 7, 2026                   │     │    │
 │  │  │  ─────────────────────────────────                  │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌──────────────────────────────────────────────┐   │     │    │
 │  │  │  │  PROJ-42  Refactor auth module                │   │     │    │
 │  │  │  │  Jira: 5 pts → ATLAS: 7.2 (complexity: high) │   │     │    │
 │  │  │  │  ⚠️ "ATLAS found this task has 3 external     │   │     │    │
 │  │  │  │     API dependencies — may take longer"       │   │     │    │
 │  │  │  └──────────────────────────────────────────────┘   │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ┌──────────────────────────────────────────────┐   │     │    │
 │  │  │  │  PROJ-18  Add payment integration             │   │     │    │
 │  │  │  │  Jira: 8 pts → ATLAS: 8.5 (confidence: 72%)  │   │     │    │
 │  │  │  └──────────────────────────────────────────────┘   │     │    │
 │  │  │                                                      │     │    │
 │  │  │  + 6 more tasks                                     │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  ┌──────────────────────────────────────────────────────┐     │    │
 │  │  │  📊  ATLAS INSIGHTS                                   │     │    │
 │  │  │                                                      │     │    │
 │  │  │  ⚠️ 3 tasks may be under-estimated                   │     │    │
 │  │  │  ✅ 5 tasks match your Jira estimates                │     │    │
 │  │  │  🔄 2 tasks suggested to split into smaller items    │     │    │
 │  │  │  📈 Sprint load: 87% capacity (healthy)              │     │    │
 │  │  │                                                      │     │    │
 │  │  └──────────────────────────────────────────────────────┘     │    │
 │  │                                                                │    │
 │  │  ┌────────────────────────────────────────────────────────┐   │    │
 │  │  │            Go to Dashboard                             │   │    │
 │  │  └────────────────────────────────────────────────────────┘   │    │
 │  │                                                                │    │
 │  └────────────────────────────────────────────────────────────────┘    │
 │                                                                        │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## Flow Summary: All Data Source Paths

```
 ┌──────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                  │
 │  DATA SOURCE           STEP 2 (Data)        STEP 3          STEP 5 (Plan)       │
 │  ──────────────────── ──────────────────── ──────────────  ──────────────────── │
 │                                                                                  │
 │  Code Repository        Connect GitHub/GL    Select repos    AI code analysis    │
 │  (standard path)        /Bitbucket                           + sprint plan       │
 │                                                                                  │
 │  Jira / Linear          OAuth connect         Select boards  Import enhanced     │
 │                                               /projects      sprint plan         │
 │                                                                                  │
 │  Spreadsheet / CSV      Upload file            Map columns   Imported tasks      │
 │                                                              + AI estimates      │
 │                                                                                  │
 │  Notion                 OAuth connect         Select DB      Imported tasks      │
 │                                                              + AI estimates      │
 │                                                                                  │
 │  Repo + Jira            Both connections      Select both    Full hybrid plan    │
 │  (power users)                                               (code + backlog)    │
 │                                                                                  │
 │  Start from scratch     Skip (confirmation)   Skipped        Manual sprint      │
 │                                                              builder             │
 │                                                                                  │
 │  Demo mode              Skip all              Skipped        Sample data plan    │
 │                                                                                  │
 └──────────────────────────────────────────────────────────────────────────────────┘
```

---

## "Can I add a repo later?" — Persistent Nudge

For users who skipped repo connection, show gentle post-onboarding nudges:

```
 TIMING                            NUDGE
 ────────────────────────────────  ──────────────────────────────────────────
 Dashboard (first visit)           Banner: "Connect a repo for code-aware
                                   estimates. [Connect now]"

 After 1st manual sprint            Toast: "Nice sprint! ATLAS can analyze
                                    your code for even better estimates.
                                    [Connect repository]"

 After 3 sprints without repo      Sidebar badge: "Unlock code analysis"
                                   + tooltip with benefits

 Never                             NEVER block features. Users can always
                                   plan manually without a repo.
```

---

## Accessibility

| Element | Requirement |
|---------|-------------|
| Data source buttons | `role="radio"` in `role="radiogroup"` with `aria-label` |
| CSV drag-drop zone | `aria-label="Upload area for CSV or Excel file"` + keyboard trigger |
| Column mapping dropdowns | `aria-label="Map {column} to Voatomy field"` |
| Jira board checkboxes | `role="checkbox"` + `aria-checked` + `aria-label` |
| Manual task form | Standard form with `aria-required` on title |
| AI suggestions | `aria-live="polite"` for dynamic suggestions |
| Import progress | `role="progressbar"` + `aria-valuenow` |
| Start from scratch confirmation | `role="alertdialog"` + focus trap |

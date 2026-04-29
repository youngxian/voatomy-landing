# Voatomy — Claude Code Project Guide

## Project Identity

**Voatomy** is a Visual AI Product Operating System. It is an end-to-end AI platform that orchestrates the entire product delivery lifecycle — from planning and design through build, quality, security, launch, and growth. It connects engineering, design, product, marketing, sales, SRE/DevOps, and customer success into one intelligent loop.

**Brand accent color:** `#f16e2c` (warm orange). **Font:** Plus Jakarta Sans.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Framework** | Next.js 15 (App Router) | TypeScript strict mode, SSR/SSG/ISR |
| **Language** | TypeScript (strict) | Shared types across app |
| **UI Primitives** | Radix UI | Accessibility-first, unstyled primitives |
| **Styling** | Tailwind CSS | Utility-first, custom theme in `tailwind.config.ts` |
| **Components** | Custom design system in `src/components/ui/` | Button, Input, Card, Section, Chip — all CVA-based |
| **State (server)** | TanStack Query (React Query) | Caching, retries, optimistic updates |
| **State (client)** | Zustand | Minimal client-side state |
| **Forms** | React Hook Form + Zod | Schema-validated forms |
| **Animation** | Framer Motion + Tailwind keyframes | Scroll reveals, hover states |
| **Icons** | Lucide React | Consistent icon set |
| **Backend (future)** | Python FastAPI | AI/ML native, async, Pydantic v2 |
| **Database (future)** | PostgreSQL 16 + pgvector | Multi-tenant with RLS, vector embeddings |
| **Auth (future)** | Clerk | SSO/SAML, org management, RBAC |
| **AI (future)** | Anthropic Claude API (primary), OpenAI (fallback) | Code analysis, estimation, planning |
| **Deployment** | Vercel (frontend), Railway → AWS (backend) | CI/CD via GitHub Actions |

---

## Project Structure

```
voatomy/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (font, metadata)
│   │   ├── globals.css               # Tailwind imports + base styles
│   │   ├── (marketing)/              # Marketing route group
│   │   │   ├── layout.tsx            # Header + Footer + Announcement
│   │   │   └── page.tsx              # Homepage (landing page)
│   │   └── auth/                     # Authentication pages
│   │       ├── layout.tsx            # Auth layout (no header/footer)
│   │       ├── login/page.tsx        # Login page
│   │       └── signup/page.tsx       # Signup page with form validation
│   ├── components/
│   │   ├── ui/                       # Design system primitives
│   │   │   ├── button.tsx            # CVA button with variants
│   │   │   ├── input.tsx             # Form input with label/error
│   │   │   ├── card.tsx              # Light/dark card variants
│   │   │   ├── chip.tsx              # Status chip with dot
│   │   │   └── section.tsx           # Page section wrapper
│   │   ├── layout/                   # Layout components
│   │   │   ├── header.tsx            # Sticky nav + mega menu
│   │   │   ├── footer.tsx            # Site footer
│   │   │   └── announcement-bar.tsx  # Dismissible announcement
│   │   ├── landing/                  # Landing page sections
│   │   │   ├── hero-section.tsx      # Hero with grid bg + mockup
│   │   │   ├── trust-section.tsx     # Team labels + flow orchestrator
│   │   │   ├── workflows-section.tsx # Tabbed workflow panel
│   │   │   ├── security-section.tsx  # Security features grid
│   │   │   ├── shield-section.tsx    # Mission Control highlight
│   │   │   ├── comparison-section.tsx # Competitive comparison table
│   │   │   ├── quote-stats-section.tsx # Quote + stats
│   │   │   ├── audience-section.tsx  # Founders / Product Teams
│   │   │   ├── testimonials-section.tsx # Review cards
│   │   │   └── cta-section.tsx       # Final CTA
│   │   └── auth/                     # Auth components
│   │       └── auth-shell.tsx        # Split-screen auth layout
│   ├── lib/                          # Utilities and config
│   │   ├── utils.ts                  # cn() helper (clsx + twMerge)
│   │   └── constants.ts             # Site config, nav, content data
│   ├── hooks/                        # Custom React hooks (empty, ready)
│   ├── styles/                       # Additional styles (empty, ready)
│   └── types/                        # TypeScript type definitions
│       └── index.ts                  # Shared types
├── public/                           # Static assets
│   └── images/                       # Images folder
├── package.json                      # Dependencies + scripts
├── tsconfig.json                     # TypeScript config (strict)
├── tailwind.config.ts                # Tailwind theme (brand colors, fonts, animations)
├── postcss.config.mjs                # PostCSS config
├── next.config.ts                    # Next.js config
├── .prettierrc                       # Prettier config
├── .gitignore                        # Git ignore rules
└── claude.md                         # This file
```

---

## Design System

### Colors (Tailwind classes)
- **Brand:** `brand`, `brand-light`, `brand-dark`, `brand-50` through `brand-900`
- **Surface:** `surface` (gray bg), `surface-white`, `surface-dark`, `surface-darker`, `surface-muted`
- **Border:** `border` (default), `border-light`, `border-dark`

### Typography (Tailwind classes)
- `text-display-1` — 86px hero heading
- `text-display-2` — 58px mobile hero heading
- `text-heading-1` — 40px section heading
- `text-heading-2` — 24px card heading
- `text-body-lg` — 18px body large
- `text-body-base` — 16px body

### Button Variants
```tsx
<Button variant="primary" />   // Orange brand CTA
<Button variant="secondary" /> // White outlined
<Button variant="ghost" />     // Subtle background
<Button variant="dark" />      // Dark filled
<Button variant="link" />      // Text link style
```

### Animations
- `animate-fade-in-up` — Scroll reveal entrance
- `animate-float` / `animate-float-slow` — Floating mockups
- `animate-chip-float` — Wireflow stage chips
- `animate-menu-in` — Mega menu entrance
- `animate-trust-dot` — Trust section dots

---

## Coding Conventions

1. **All components are "use client"** unless they are purely server-rendered (pages without interactivity).
2. **Use `cn()` from `@/lib/utils`** for all conditional class merging.
3. **Use CVA (class-variance-authority)** for component variants (see `button.tsx`).
4. **Props extend native HTML attributes** — always use `React.forwardRef` for form elements.
5. **Content data lives in `@/lib/constants.ts`** — never hardcode content strings in components.
6. **Use Radix UI primitives** for complex interactive components (dialog, dropdown, tabs, accordion, tooltip).
7. **Forms use React Hook Form + Zod** — schemas define validation, types are inferred.
8. **Server state uses TanStack Query** — `useQuery`, `useMutation`, `queryClient`.
9. **Client state uses Zustand** — only for truly client-side state (UI toggles, local preferences).
10. **Path aliases:** Always use `@/` prefix (maps to `src/`).

---

## Naming Conventions

- **Files:** kebab-case (`hero-section.tsx`, `auth-shell.tsx`)
- **Components:** PascalCase (`HeroSection`, `AuthShell`)
- **Hooks:** camelCase with `use` prefix (`useAuth`, `useLocalStorage`)
- **Types/Interfaces:** PascalCase (`NavItem`, `SecurityFeature`)
- **Constants:** SCREAMING_SNAKE_CASE for config objects (`SITE_CONFIG`, `NAV_LINKS`)
- **CSS:** Tailwind utility classes only. No custom CSS files except `globals.css`.

---

## Routes

| Route | Component | Description |
|-------|----------|-------------|
| `/` | `(marketing)/page.tsx` | Landing page (homepage) |
| `/auth/login` | `auth/login/page.tsx` | Login page |
| `/auth/signup` | `auth/signup/page.tsx` | Signup page |

### Future Routes (from VOATOMY_PAGES.md)
- `/projects` — Project list
- `/projects/:projectId/blueprint` — Blueprint hub
- `/projects/:projectId/execution/graph` — Execution graph
- `/projects/:projectId/security` — Security hub
- `/projects/:projectId/quality` — Quality hub
- `/projects/:projectId/launch` — Launch cockpit
- `/projects/:projectId/growth` — Growth hub
- `/settings` — User settings
- `/settings/billing` — Billing

---

## Key Business Context

### Product Vision
Voatomy is the system of record and control plane for product execution. It maintains one living operational model of what to build, why it matters, how it should be implemented, how quality and security are enforced, and how success is measured.

### Core Modules (12)
1. **Blueprint** — Visual product maps, user journeys, data models, API contracts
2. **Multi-Agent Team** — PM, Architect, Designer, Security, QA, Growth agents
3. **Execution Graph** — Task dependencies, milestones, owners, gates
4. **Code-Aware Planner** — Repo ingestion, tech debt mapping, diff-aware planning
5. **Security-by-Default** — Threat modeling, auth policy generation, abuse simulation
6. **Test Intelligence** — Layered test generation from requirements
7. **Prompt Compiler** — Requirement-to-prompt for Cursor/Claude/Copilot
8. **MCP Mission Control** — Agent context connectors with governance
9. **Live Spec Sync** — Code-to-spec drift detection
10. **Launch Cockpit** — Release checklists, rollback plans, monitoring
11. **Growth Loops** — Experiment design, funnel analytics, retention
12. **Investor Mode** — Pitch narrative, KPI stories, execution credibility

### Target Users
- **Founders** — Idea to execution-ready roadmap
- **Product Teams** — Standardized multi-team delivery
- **Engineering Orgs** — Code-aware planning + quality gates
- **Enterprise** — SSO, audit logs, compliance, VPC deployment

### Monetization
- **Free:** Limited monthly generations, 1 active project
- **Pro:** Unlimited projects, advanced orchestration, integrations
- **Team:** Multi-user workflows, permissions, shared dashboards
- **Enterprise:** SSO, audit logs, policy controls, VPC/on-prem

---

## Entry Wedge Strategy: ATLAS (AI Sprint Planner)

ATLAS is the initial product that enters the market. It's an AI sprint planner that understands:
1. **Code complexity** — Analyzes the actual codebase via GitHub/GitLab
2. **Design scope** — Cross-references Figma designs for UI effort
3. **Business priority** — Pulls revenue weighting from CRM data
4. **Customer demand** — Ingests support tickets, sales objections
5. **Tech debt** — Identifies debt hotspots that slow implementation
6. **Team capacity** — Learns from historical velocity, PTO, on-call

### ATLAS Pricing
- **Free:** 1 team (8 members), 1 repo, 2 AI plans/month
- **Pro ($14/user/mo):** Unlimited teams/repos, Figma + customer signals
- **Business ($28/user/mo):** Cross-team dependencies, CRM integration
- **Enterprise (custom):** Full NEXUS nerve center, SSO, RBAC, SLA

### Growth Path
ATLAS → LOOP (Product-Revenue Feedback Engine) → SIGNAL (Revenue-Aware Incidents) → Full NEXUS (Organizational Nerve Center)

---

## Development Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm type-check       # TypeScript check (no emit)
pnpm format           # Prettier format all files
pnpm format:check     # Check formatting
```

---

## Important Files to Know

| File | Purpose |
|------|---------|
| `src/lib/constants.ts` | ALL content data (nav, features, testimonials, comparison) |
| `src/lib/utils.ts` | `cn()` utility for class merging |
| `src/components/ui/button.tsx` | Primary button component with CVA variants |
| `tailwind.config.ts` | Full theme config (colors, fonts, animations, spacing) |
| `src/app/(marketing)/page.tsx` | Landing page composition |
| `src/components/auth/auth-shell.tsx` | Split-screen auth layout |

---

## Research Documents (in parent `/IDEAS/` folder)

| File | Contents |
|------|----------|
| `MEGA_STARTUP_IDEAS.md` | 6 merged AI startup ideas with validation |
| `RESEARCH_UNMET_NEEDS_AND_MARKET_GAPS_2025_2026.md` | Market gap analysis |
| `VOATOMY.md` | Full product vision + 12 core modules |
| `VOATOMY_PAGES.md` | Complete page/route inventory |

---

## When Modifying This Project

1. **Adding a new landing section:** Create in `src/components/landing/`, add to `(marketing)/page.tsx`
2. **Adding a new UI component:** Create in `src/components/ui/`, use CVA for variants, export from component
3. **Adding a new page:** Create route folder in `src/app/`, add layout if needed
4. **Adding content:** Update `src/lib/constants.ts`, never hardcode in components
5. **Changing theme:** Update `tailwind.config.ts` — colors, fonts, animations are all defined there
6. **Adding state management:** Server state → TanStack Query. Client state → Zustand store in `src/lib/stores/`
7. **Adding forms:** React Hook Form + Zod schema. See `signup/page.tsx` for pattern.
8. **Adding API routes:** Create in `src/app/api/` using Next.js Route Handlers

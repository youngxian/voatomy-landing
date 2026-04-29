# Onboarding — Tasks, Features & Core Implementation Checklist

This document lists all **core features**, **tasks**, and **minimal subtasks** required to implement the Voatomy Unified Onboarding System. Each task is broken into the smallest actionable units. When every item in the **Definition of Done** is complete, the onboarding experience is production-ready across all six products.

---

## 1. Product Summary

- **System:** Voatomy Unified Onboarding — Cross-Product Activation Bridge
- **Tagline:** From signup to first AI-generated value in under 5 minutes
- **Principle:** Single onboarding flow across ATLAS, LOOP, SIGNAL, DRIFT, PHANTOM, and NEXUS. Captures user intent, provisions workspace, connects integrations, structures the org, and delivers first-value — all before the user reaches their product dashboard.
- **Stack:** Next.js 16 (App Router) frontend, **Go (Golang)** backend (Chi), PostgreSQL 16, Redis 7, Clerk auth, Zustand (client state), React Hook Form + Zod (validation).
- **Canonical Location:** `voatomy-landing/src/app/onboard/` (frontend), `backend/onboarding-service/` (backend)

---

## 2. Onboarding Flow (7 Steps)

| Step | Name | Route | Required | Target Time |
|------|------|-------|----------|-------------|
| 1 | **Welcome** | `/onboard` | Yes | ~20s |
| 2 | **Workspace** | `/onboard` (step 2) | Yes | ~30s |
| 3 | **Products** | `/onboard` (step 3) | Yes | ~15s |
| 4 | **Connect** | `/onboard` (step 4) | Recommended | ~45s |
| 5 | **Team** | `/onboard` (step 5) | Optional | ~30s |
| 6 | **Customize** | `/onboard` (step 6) | Optional | ~20s |
| 7 | **Launch** | `/onboard` (step 7) | Auto | ~60s |
| | | | **Total** | **~3.5 min** |

---

## 3. Core Features (Must Have)

| # | Core Feature | Description |
|---|--------------|-------------|
| CF-1 | **Welcome & identity capture** | Collect full name, email, role (15 persona types). Pre-fill from Clerk/OAuth where available. Validate email uniqueness. |
| CF-2 | **Workspace creation** | Workspace name, auto-slug, industry (15 options), company size, region/country/timezone. Slug uniqueness check. |
| CF-3 | **Purpose & product selection** | Capture business purposes (8 options) → recommend products. Multi-select from 6 products, designate primary product. |
| CF-4 | **Integration connection (OAuth)** | Connect boards (Jira, Linear, ClickUp, GitHub Issues, etc.), repos (GitHub, GitLab, Bitbucket), CRM (Salesforce, HubSpot), monitoring (Datadog, PagerDuty), comms (Slack, Teams), design (Figma). OAuth + API key flows. |
| CF-5 | **Org structure & team setup** | Org structure type (flat/functional/matrix/divisional). Departments and teams CRUD. Team member invitation with roles (admin/manager/member/viewer). |
| CF-6 | **Dashboard customization** | Layout preference (compact/standard/detailed), theme (light/dark/auto), sprint cadence, notification prefs (channels + frequency), AI mode (proactive/balanced/conservative). |
| CF-7 | **Launch & provisioning** | Provision cross-product workspace IDs. Trigger initial data sync for connected integrations. Generate first AI sprint plan or product-specific first-value artifact. Animated setup sequence with progress feedback. |
| CF-8 | **State persistence & resume** | Save onboarding state to DB on every step transition. Resume from last incomplete step on return. Handle tab-close, session expiry, multi-device. |
| CF-9 | **Analytics & tracking** | Track step entry/exit/skip/complete events with timing. Drop-off funnel, time-per-step, completion rate. Field-level change tracking (keys only, no PII). |
| CF-10 | **Multi-persona journey routing** | Adapt step content based on user role (EM vs PM vs Engineer vs Founder vs Designer). Skip irrelevant steps. Pre-configure defaults per persona. |
| CF-11 | **Cross-product provisioning** | On launch, create workspace entities in all selected products (ATLAS workspace, LOOP org, SIGNAL tenant, DRIFT team, PHANTOM scan, NEXUS graph). Return cross-product IDs. |
| CF-12 | **Invitation & viral loop** | Email invitations with role assignment. Invitation link → join existing workspace (skip workspace creation). Track invitation acceptance rate. |
| CF-13 | **Backend API for onboarding state machine** | REST API: start session, save step data, get status, complete onboarding. Idempotent writes, optimistic locking, audit trail. |
| CF-14 | **Integration backfill orchestration** | After connect, queue background jobs to backfill: boards/sprints from PM tools, repo metadata from VCS, contacts/deals from CRM, alert history from monitoring. |
| CF-15 | **Error handling & recovery** | Graceful OAuth failure recovery. Integration timeout handling. Partial-save on network failure. Clear error messaging per step. Retry logic for transient failures. |

**Difficulty key:** **E** = Easy (config, simple CRUD, single API, UI wiring) · **M** = Medium (OAuth, multi-step flows, background jobs, moderate logic) · **D** = Difficult (pipelines, multi-provider, transactions, streaming, state machines)

---

## 4. Implementation Tasks — Minimal Subtask Breakdown

### 4.1 Backend — Foundation & Service Scaffold

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-FND-1.1 | Create `backend/onboarding-service/` directory with Go module (`go mod init voatomy/onboarding-service`) | P0 | E | — |
| T-FND-1.2 | Create `cmd/onboarding-api/main.go` entry point (config load, logger, graceful shutdown) | P0 | E | T-FND-1.1 |
| T-FND-1.3 | Create `internal/config/config.go` (env-based: HTTP addr, DB URL, Redis URL, auth issuer/audience, Clerk secret) | P0 | E | T-FND-1.1 |
| T-FND-1.4 | Create `internal/app/app.go` (wire DB, Redis, router, HTTP server) | P0 | E | T-FND-1.2, T-FND-1.3 |
| T-FND-1.5 | Create `internal/db/db.go` (pgx connection pool, ping, close) | P0 | M | T-FND-1.3 |
| T-FND-1.6 | Create `internal/db/redis.go` (Redis connection for session cache) | P1 | M | T-FND-1.3 |
| T-FND-1.7 | Create `internal/httpapi/router.go` (Chi router, middleware: request ID, real IP, CORS, recovery, timeout) | P0 | E | T-FND-1.4 |
| T-FND-1.8 | Add `/healthz` and `/readyz` endpoints | P0 | E | T-FND-1.7 |
| T-FND-1.9 | Create `Makefile` with targets: `run`, `build`, `test`, `lint`, `migrate-up`, `migrate-down`, `docker-build` | P0 | E | T-FND-1.1 |
| T-FND-1.10 | Create `Dockerfile` (multi-stage: build + scratch/distroless) | P1 | E | T-FND-1.2 |
| T-FND-1.11 | Create `deployments/docker-compose.yml` (service + postgres + redis) | P1 | E | T-FND-1.10 |
| T-FND-1.12 | Create `.env.example` with all required env vars documented | P0 | E | T-FND-1.3 |

### 4.2 Backend — Database Schema & Migrations

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-DB-1.1 | Create migration framework setup (golang-migrate or custom runner) | P0 | M | T-FND-1.5 |
| T-DB-1.2 | Migration `0001_organizations`: `organizations` table (id UUID PK, name, slug UNIQUE, industry, company_size, region, country, country_code, timezone, clerk_org_id, created_at, updated_at) | P0 | E | T-DB-1.1 |
| T-DB-1.3 | Migration `0001_organizations`: `org_purposes` table (org_id FK, purpose TEXT, PRIMARY KEY (org_id, purpose)) | P0 | E | T-DB-1.2 |
| T-DB-1.4 | Migration `0002_users`: `users` table (id UUID PK, org_id FK, clerk_user_id UNIQUE, email, full_name, role, created_at) | P0 | E | T-DB-1.2 |
| T-DB-1.5 | Migration `0003_onboarding_sessions`: `onboarding_sessions` table (id UUID PK, user_id FK, org_id FK, current_step TEXT, completed_steps TEXT[], skipped_steps TEXT[], form_data JSONB, started_at, updated_at, completed_at NULLABLE, version INT for optimistic locking) | P0 | M | T-DB-1.4 |
| T-DB-1.6 | Migration `0004_products`: `org_products` table (org_id FK, product_key TEXT, is_primary BOOL, provisioned_id TEXT, provisioned_at NULLABLE, PRIMARY KEY (org_id, product_key)) | P0 | E | T-DB-1.2 |
| T-DB-1.7 | Migration `0005_integrations`: `integrations` table (id UUID PK, org_id FK, provider TEXT, display_name, access_token_enc, refresh_token_enc, account_id, scopes TEXT[], status TEXT, connected_at, last_sync_at, error_message NULLABLE) | P0 | M | T-DB-1.2 |
| T-DB-1.8 | Migration `0006_departments`: `departments` table (id UUID PK, org_id FK, name, description, head_email, color, created_at) | P0 | E | T-DB-1.2 |
| T-DB-1.9 | Migration `0006_departments`: `teams` table (id UUID PK, org_id FK, department_id FK NULLABLE, name, type TEXT, description, lead_email, color, created_at) | P0 | E | T-DB-1.8 |
| T-DB-1.10 | Migration `0007_invitations`: `invitations` table (id UUID PK, org_id FK, team_id FK NULLABLE, email, role TEXT, invited_by FK users, status TEXT DEFAULT 'pending', token TEXT UNIQUE, created_at, accepted_at NULLABLE, expires_at) | P0 | E | T-DB-1.4 |
| T-DB-1.11 | Migration `0008_onboarding_events`: `onboarding_events` table (id UUID PK, session_id FK, event_type TEXT, step TEXT, metadata JSONB, created_at) — for analytics | P1 | E | T-DB-1.5 |
| T-DB-1.12 | Migration `0009_preferences`: `user_preferences` table (user_id FK PK, dashboard_layout TEXT, theme TEXT, sprint_cadence TEXT, notification_prefs JSONB, ai_preferences JSONB, updated_at) | P0 | E | T-DB-1.4 |
| T-DB-1.13 | Migration `0010_backfill_jobs`: `backfill_jobs` table (id UUID PK, org_id FK, integration_id FK, job_type TEXT, status TEXT, progress_pct INT, error TEXT, started_at, completed_at NULLABLE) | P1 | M | T-DB-1.7 |
| T-DB-1.14 | Add indexes: `organizations(slug)`, `users(clerk_user_id)`, `users(email, org_id)`, `onboarding_sessions(user_id)`, `integrations(org_id, provider)`, `invitations(token)`, `invitations(email, org_id)` | P0 | E | T-DB-1.13 |

### 4.3 Backend — Domain Models & Interfaces

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-DOM-1.1 | Create `internal/domain/organization.go` — Organization struct, CreateOrganizationInput, UpdateOrganizationInput | P0 | E | T-DB-1.2 |
| T-DOM-1.2 | Create `internal/domain/user.go` — User struct, CreateUserInput, role enum constants | P0 | E | T-DB-1.4 |
| T-DOM-1.3 | Create `internal/domain/onboarding.go` — OnboardingSession struct, step enum, event types, OnboardingFormData (mirrors frontend) | P0 | M | T-DB-1.5 |
| T-DOM-1.4 | Create `internal/domain/integration.go` — Integration struct, ProviderKey, ConnectInput, status enum | P0 | E | T-DB-1.7 |
| T-DOM-1.5 | Create `internal/domain/team.go` — Department, Team, Invitation structs, role enums | P0 | E | T-DB-1.9 |
| T-DOM-1.6 | Create `internal/domain/preferences.go` — UserPreferences struct with all customization fields | P0 | E | T-DB-1.12 |
| T-DOM-1.7 | Create `internal/domain/product.go` — OrgProduct struct, ProductKey enum, provisioning status | P0 | E | T-DB-1.6 |
| T-DOM-1.8 | Create `internal/domain/errors.go` — domain error types (ErrNotFound, ErrConflict, ErrValidation, ErrForbidden, ErrIntegrationFailed) | P0 | E | — |

### 4.4 Backend — Repository Layer (DB Access)

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-REPO-1.1 | Create `internal/repository/organization_repo.go` — interface + pgx implementation: Create, GetByID, GetBySlug, Update, CheckSlugAvailable | P0 | M | T-DOM-1.1 |
| T-REPO-1.2 | Create `internal/repository/user_repo.go` — interface + impl: Create, GetByID, GetByClerkID, GetByEmailAndOrg, Update | P0 | M | T-DOM-1.2 |
| T-REPO-1.3 | Create `internal/repository/onboarding_repo.go` — interface + impl: CreateSession, GetByUserID, UpdateStep, SaveFormData (with optimistic lock), Complete, GetEvents, InsertEvent | P0 | D | T-DOM-1.3 |
| T-REPO-1.4 | Create `internal/repository/integration_repo.go` — interface + impl: Create, GetByOrgAndProvider, ListByOrg, UpdateStatus, UpdateTokens, Delete | P0 | M | T-DOM-1.4 |
| T-REPO-1.5 | Create `internal/repository/team_repo.go` — interface + impl: CreateDepartment, CreateTeam, ListDepartmentsByOrg, ListTeamsByOrg, CreateInvitation, GetInvitationByToken, AcceptInvitation, ListPendingInvitations | P0 | M | T-DOM-1.5 |
| T-REPO-1.6 | Create `internal/repository/preferences_repo.go` — interface + impl: Upsert, GetByUserID | P0 | E | T-DOM-1.6 |
| T-REPO-1.7 | Create `internal/repository/product_repo.go` — interface + impl: SetProducts, GetByOrg, UpdateProvisionedID | P0 | E | T-DOM-1.7 |
| T-REPO-1.8 | Create `internal/repository/backfill_repo.go` — interface + impl: CreateJob, GetByID, UpdateProgress, ListByOrg | P1 | M | T-DB-1.13 |

### 4.5 Backend — Service Layer (Business Logic)

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-SVC-1.1 | Create `internal/service/onboarding_service.go` — orchestrates entire onboarding flow: StartOnboarding, SaveStepData, SkipStep, GetStatus, CompleteOnboarding | P0 | D | T-REPO-1.1 through T-REPO-1.7 |
| T-SVC-1.2 | Implement step validation: each step's required fields must be present before marking complete | P0 | M | T-SVC-1.1 |
| T-SVC-1.3 | Implement slug generation: auto-generate from workspace name, check uniqueness, append suffix on conflict | P0 | E | T-REPO-1.1 |
| T-SVC-1.4 | Create `internal/service/integration_service.go` — Connect (initiate OAuth), Callback (exchange code), Disconnect, ListConnected, RefreshToken | P0 | D | T-REPO-1.4 |
| T-SVC-1.5 | Create `internal/service/team_service.go` — CreateDepartment, CreateTeam, InviteMembers, AcceptInvitation, ListOrgStructure | P0 | M | T-REPO-1.5 |
| T-SVC-1.6 | Create `internal/service/provisioning_service.go` — ProvisionProducts: create workspace/org/tenant in each selected product's system, return cross-product IDs | P0 | D | T-REPO-1.7 |
| T-SVC-1.7 | Create `internal/service/backfill_service.go` — QueueBackfill, ProcessBackfill (per integration type), UpdateProgress | P1 | D | T-REPO-1.8, T-SVC-1.4 |
| T-SVC-1.8 | Create `internal/service/analytics_service.go` — RecordEvent, GetFunnel, GetStepMetrics, GetDropOff | P1 | M | T-REPO-1.3 |
| T-SVC-1.9 | Implement preferences service: SavePreferences, GetPreferences, ApplyDefaults per persona | P0 | E | T-REPO-1.6 |

### 4.6 Backend — HTTP API (Handlers & Routes)

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-API-1.1 | Create `internal/httpapi/middleware/auth.go` — Clerk JWT verification, extract user_id + org_id into context | P0 | M | T-FND-1.7 |
| T-API-1.2 | Create `internal/httpapi/middleware/ratelimit.go` — per-IP and per-user rate limiting (Redis-backed) | P1 | M | T-FND-1.6 |
| T-API-1.3 | Create `internal/httpapi/middleware/logging.go` — structured request logging (method, path, status, duration, user_id) | P0 | E | T-FND-1.7 |
| T-API-1.4 | Create `internal/httpapi/response.go` — JSON response helpers (Success, Error, Paginated) with consistent envelope | P0 | E | — |
| T-API-1.5 | Create `internal/httpapi/v1/onboarding.go` — handlers: `POST /v1/onboarding/start`, `GET /v1/onboarding/status`, `PUT /v1/onboarding/steps/{step}`, `POST /v1/onboarding/steps/{step}/skip`, `POST /v1/onboarding/complete` | P0 | M | T-SVC-1.1 |
| T-API-1.6 | Create `internal/httpapi/v1/workspace.go` — handlers: `POST /v1/workspaces`, `GET /v1/workspaces/{slug}`, `PATCH /v1/workspaces/{id}`, `GET /v1/workspaces/check-slug?slug=...` | P0 | E | T-SVC-1.1 |
| T-API-1.7 | Create `internal/httpapi/v1/integrations.go` — handlers: `GET /v1/integrations`, `POST /v1/integrations/{provider}/connect`, `GET /v1/integrations/{provider}/callback`, `DELETE /v1/integrations/{provider}`, `POST /v1/integrations/{provider}/sync` | P0 | M | T-SVC-1.4 |
| T-API-1.8 | Create `internal/httpapi/v1/teams.go` — handlers: `POST /v1/departments`, `GET /v1/departments`, `POST /v1/teams`, `GET /v1/teams`, `POST /v1/invitations`, `GET /v1/invitations`, `POST /v1/invitations/{token}/accept` | P0 | E | T-SVC-1.5 |
| T-API-1.9 | Create `internal/httpapi/v1/products.go` — handlers: `PUT /v1/products`, `GET /v1/products` | P0 | E | T-SVC-1.6 |
| T-API-1.10 | Create `internal/httpapi/v1/preferences.go` — handlers: `PUT /v1/preferences`, `GET /v1/preferences` | P0 | E | T-SVC-1.9 |
| T-API-1.11 | Create `internal/httpapi/v1/analytics.go` — handlers: `POST /v1/onboarding/events`, `GET /v1/onboarding/analytics/funnel`, `GET /v1/onboarding/analytics/drop-off` | P1 | M | T-SVC-1.8 |
| T-API-1.12 | Register all v1 routes in `internal/httpapi/v1.go` with auth middleware applied | P0 | E | T-API-1.1 through T-API-1.11 |
| T-API-1.13 | Add request validation middleware using struct tags or manual Zod-style validation | P0 | M | T-API-1.4 |

### 4.7 Backend — OAuth & Integration Providers

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-OAUTH-1.1 | Create `internal/integrations/provider.go` — Provider interface: AuthURL, ExchangeCode, RefreshToken, RevokeToken, FetchProfile | P0 | M | — |
| T-OAUTH-1.2 | Implement GitHub provider (OAuth App / GitHub App: repos, PRs, metadata) | P0 | M | T-OAUTH-1.1 |
| T-OAUTH-1.3 | Implement GitLab provider (OAuth: repos, MRs, metadata) | P1 | M | T-OAUTH-1.1 |
| T-OAUTH-1.4 | Implement Jira provider (OAuth 2.0 3LO: boards, sprints, issues) | P0 | M | T-OAUTH-1.1 |
| T-OAUTH-1.5 | Implement Linear provider (OAuth: teams, issues, cycles) | P1 | M | T-OAUTH-1.1 |
| T-OAUTH-1.6 | Implement Slack provider (OAuth: workspace info, channel list for notifications) | P0 | M | T-OAUTH-1.1 |
| T-OAUTH-1.7 | Implement Salesforce provider (OAuth: accounts, deals) | P1 | M | T-OAUTH-1.1 |
| T-OAUTH-1.8 | Implement HubSpot provider (OAuth: contacts, companies, deals) | P1 | M | T-OAUTH-1.1 |
| T-OAUTH-1.9 | Implement PagerDuty provider (OAuth/API key: services, incidents, schedules) | P1 | M | T-OAUTH-1.1 |
| T-OAUTH-1.10 | Implement Figma provider (OAuth: files, teams) | P2 | M | T-OAUTH-1.1 |
| T-OAUTH-1.11 | Implement Datadog provider (API key: monitors, services) | P2 | M | T-OAUTH-1.1 |
| T-OAUTH-1.12 | Create `internal/integrations/registry.go` — provider registry: register, lookup by key | P0 | E | T-OAUTH-1.1 |
| T-OAUTH-1.13 | Implement token encryption/decryption (AES-256-GCM) for stored access/refresh tokens | P0 | M | — |

### 4.8 Backend — Background Jobs & Backfill

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-BG-1.1 | Create `internal/worker/worker.go` — background job runner (goroutine pool or Redis queue) | P1 | M | T-FND-1.6 |
| T-BG-1.2 | Create `internal/worker/backfill_boards.go` — backfill sprints, issues, backlog from PM tools | P1 | D | T-BG-1.1, T-OAUTH-1.4 |
| T-BG-1.3 | Create `internal/worker/backfill_repos.go` — backfill repo metadata, PR history (read-only) | P1 | D | T-BG-1.1, T-OAUTH-1.2 |
| T-BG-1.4 | Create `internal/worker/backfill_crm.go` — backfill contacts, deals, accounts from CRM | P2 | D | T-BG-1.1, T-OAUTH-1.7 |
| T-BG-1.5 | Create `internal/worker/backfill_monitoring.go` — backfill alert history from monitoring tools | P2 | D | T-BG-1.1, T-OAUTH-1.9 |
| T-BG-1.6 | Create `internal/worker/provision_products.go` — async product provisioning across services | P1 | D | T-BG-1.1, T-SVC-1.6 |
| T-BG-1.7 | Create `internal/worker/send_invitations.go` — async email delivery for team invitations | P1 | M | T-BG-1.1 |
| T-BG-1.8 | Implement job retry logic with exponential backoff and dead-letter handling | P1 | M | T-BG-1.1 |

### 4.9 Frontend — Step Components (Existing, Enhancements)

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-FE-1.1 | Wire `welcome-step.tsx` to `POST /v1/onboarding/start` on "Continue" | P0 | E | T-API-1.5 |
| T-FE-1.2 | Wire `workspace-step.tsx` to `PUT /v1/onboarding/steps/workspace` with slug check via `GET /v1/workspaces/check-slug` | P0 | E | T-API-1.5, T-API-1.6 |
| T-FE-1.3 | Wire `products-step.tsx` to `PUT /v1/onboarding/steps/products` and `PUT /v1/products` | P0 | E | T-API-1.5, T-API-1.9 |
| T-FE-1.4 | Wire `connect-step.tsx` to OAuth flow: open provider auth URL, handle callback redirect, update integration list | P0 | M | T-API-1.7 |
| T-FE-1.5 | Wire `team-step.tsx` to department/team CRUD endpoints and invitation endpoint | P0 | M | T-API-1.8 |
| T-FE-1.6 | Wire `customize-step.tsx` to `PUT /v1/preferences` | P0 | E | T-API-1.10 |
| T-FE-1.7 | Wire `launch-step.tsx` to `POST /v1/onboarding/complete` → poll provisioning status → redirect to dashboard | P0 | M | T-API-1.5 |
| T-FE-1.8 | Add resume logic: on mount, call `GET /v1/onboarding/status` → jump to last incomplete step | P0 | M | T-API-1.5 |
| T-FE-1.9 | Add error boundaries per step with retry and "contact support" fallback | P1 | M | — |
| T-FE-1.10 | Add loading skeletons for each step while data loads | P1 | E | — |
| T-FE-1.11 | Add real-time integration status updates (polling or SSE) during connect step | P1 | M | T-API-1.7 |

### 4.10 Frontend — Invitation Accept Flow

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-INV-1.1 | Create `/onboard/invite/{token}` page — accept invitation, join workspace | P0 | M | T-API-1.8 |
| T-INV-1.2 | On accept: skip workspace creation (steps 2-3), go to team step with pre-filled org | P0 | M | T-INV-1.1 |
| T-INV-1.3 | Handle expired invitation (show message + "Request new invitation" CTA) | P0 | E | T-INV-1.1 |
| T-INV-1.4 | Handle already-accepted invitation (redirect to dashboard) | P0 | E | T-INV-1.1 |

### 4.11 Backend — Email & Notifications

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-EMAIL-1.1 | Create `internal/email/email.go` — EmailSender interface, SendGrid/SMTP implementation | P1 | M | — |
| T-EMAIL-1.2 | Create invitation email template (HTML + text) with workspace name, inviter, accept link | P1 | E | T-EMAIL-1.1 |
| T-EMAIL-1.3 | Create onboarding complete email template (welcome to workspace, quick-start links) | P2 | E | T-EMAIL-1.1 |
| T-EMAIL-1.4 | Create onboarding reminder email (for users who abandoned mid-flow, 24h + 72h) | P2 | M | T-EMAIL-1.1 |

### 4.12 Security & Compliance

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-SEC-1.1 | Encrypt integration tokens at rest (AES-256-GCM, key from env) | P0 | M | T-OAUTH-1.13 |
| T-SEC-1.2 | Implement CSRF protection on OAuth callback endpoints | P0 | M | T-API-1.7 |
| T-SEC-1.3 | Validate OAuth `state` parameter to prevent CSRF attacks | P0 | M | T-API-1.7 |
| T-SEC-1.4 | Add request body size limits (1MB default, 10MB for CSV import) | P0 | E | T-FND-1.7 |
| T-SEC-1.5 | Sanitize all user inputs (workspace name, team names, etc.) against XSS | P0 | E | T-API-1.13 |
| T-SEC-1.6 | Implement invitation token expiry (72h) and single-use enforcement | P0 | E | T-DB-1.10 |
| T-SEC-1.7 | Add audit logging for: org creation, integration connect/disconnect, invitation sent/accepted, onboarding complete | P1 | M | — |
| T-SEC-1.8 | Ensure PII fields (email, name) are not logged in structured logs | P0 | E | T-API-1.3 |

### 4.13 Testing

| Subtask ID | Subtask | Priority | Diff | Deps |
|------------|---------|----------|------|------|
| T-TEST-1.1 | Unit tests for OnboardingService (start, save, skip, complete flows) | P0 | M | T-SVC-1.1 |
| T-TEST-1.2 | Unit tests for each repository (mock pgx, test SQL correctness) | P0 | M | T-REPO-1.1 through T-REPO-1.8 |
| T-TEST-1.3 | Integration tests: full onboarding flow against test DB | P1 | D | T-API-1.12 |
| T-TEST-1.4 | Unit tests for OAuth provider implementations (mock HTTP) | P1 | M | T-OAUTH-1.2 through T-OAUTH-1.11 |
| T-TEST-1.5 | Unit tests for token encryption/decryption | P0 | E | T-SEC-1.1 |
| T-TEST-1.6 | Load test: 100 concurrent onboarding sessions | P2 | D | T-TEST-1.3 |
| T-TEST-1.7 | E2E test: full onboarding flow (Playwright) — happy path | P1 | D | T-FE-1.7 |
| T-TEST-1.8 | E2E test: invitation accept flow | P1 | M | T-INV-1.1 |

---

## 5. API Contract Summary

### Onboarding Session

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/onboarding/start` | Start new onboarding session (creates org + user if needed) |
| `GET` | `/v1/onboarding/status` | Get current onboarding state (step, form data, completion) |
| `PUT` | `/v1/onboarding/steps/{step}` | Save step data (welcome, workspace, products, connect, team, customize) |
| `POST` | `/v1/onboarding/steps/{step}/skip` | Mark step as skipped |
| `POST` | `/v1/onboarding/complete` | Finalize onboarding, trigger provisioning |

### Workspace

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/workspaces` | Create workspace (org) |
| `GET` | `/v1/workspaces/{slug}` | Get workspace by slug |
| `PATCH` | `/v1/workspaces/{id}` | Update workspace |
| `GET` | `/v1/workspaces/check-slug` | Check slug availability |

### Integrations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/integrations` | List connected integrations |
| `POST` | `/v1/integrations/{provider}/connect` | Initiate OAuth flow (returns auth URL) |
| `GET` | `/v1/integrations/{provider}/callback` | OAuth callback handler |
| `DELETE` | `/v1/integrations/{provider}` | Disconnect integration |
| `POST` | `/v1/integrations/{provider}/sync` | Trigger manual resync |

### Teams & Org Structure

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/departments` | Create department |
| `GET` | `/v1/departments` | List departments |
| `POST` | `/v1/teams` | Create team |
| `GET` | `/v1/teams` | List teams |
| `POST` | `/v1/invitations` | Send invitation(s) |
| `GET` | `/v1/invitations` | List pending invitations |
| `POST` | `/v1/invitations/{token}/accept` | Accept invitation |

### Products & Preferences

| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `/v1/products` | Set selected products |
| `GET` | `/v1/products` | Get product selections |
| `PUT` | `/v1/preferences` | Save user preferences |
| `GET` | `/v1/preferences` | Get user preferences |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/onboarding/events` | Record analytics event |
| `GET` | `/v1/onboarding/analytics/funnel` | Get completion funnel |
| `GET` | `/v1/onboarding/analytics/drop-off` | Get drop-off analysis |

---

## 6. Data Flow Diagram

```
 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │                           ONBOARDING DATA FLOW                                  │
 ├─────────────────────────────────────────────────────────────────────────────────┤
 │                                                                                 │
 │  FRONTEND (voatomy-landing)           BACKEND (onboarding-service)              │
 │  ══════════════════════════           ═══════════════════════════               │
 │                                                                                 │
 │  ┌──────────────┐                     ┌──────────────────────────┐              │
 │  │ Welcome Step │──POST /start──────>│  OnboardingService       │              │
 │  └──────┬───────┘                     │  ├─ Create User          │              │
 │         │                             │  ├─ Create Org           │              │
 │  ┌──────▼───────┐                     │  └─ Create Session       │              │
 │  │Workspace Step│──PUT /steps/ws────>│                          │              │
 │  └──────┬───────┘                     ├──────────────────────────┤              │
 │         │                             │  IntegrationService      │              │
 │  ┌──────▼───────┐                     │  ├─ OAuth Flows          │──────┐       │
 │  │Products Step │──PUT /steps/prod──>│  ├─ Token Management     │      │       │
 │  └──────┬───────┘                     │  └─ Status Tracking      │      │       │
 │         │                             ├──────────────────────────┤      │       │
 │  ┌──────▼───────┐                     │  TeamService             │      │       │
 │  │ Connect Step │──POST /connect────>│  ├─ Dept/Team CRUD       │      ▼       │
 │  └──────┬───────┘                     │  └─ Invitations          │  ┌───────┐   │
 │         │                             ├──────────────────────────┤  │ OAuth  │   │
 │  ┌──────▼───────┐                     │  ProvisioningService     │  │Providers│  │
 │  │  Team Step   │──POST /invite─────>│  ├─ ATLAS workspace      │  │(GitHub, │  │
 │  └──────┬───────┘                     │  ├─ LOOP org             │  │ Jira,   │  │
 │         │                             │  ├─ SIGNAL tenant        │  │ Slack…) │  │
 │  ┌──────▼───────┐                     │  ├─ DRIFT team           │  └───────┘   │
 │  │Customize Step│──PUT /prefs──────>│  ├─ PHANTOM scan          │              │
 │  └──────┬───────┘                     │  └─ NEXUS graph          │              │
 │         │                             ├──────────────────────────┤              │
 │  ┌──────▼───────┐                     │  BackfillWorker          │              │
 │  │ Launch Step  │──POST /complete───>│  ├─ Board sync            │              │
 │  └──────────────┘                     │  ├─ Repo metadata        │──> PostgreSQL│
 │                                       │  ├─ CRM contacts         │──> Redis     │
 │                                       │  └─ Alert history        │              │
 │                                       └──────────────────────────┘              │
 └─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Definition of Done

When **all** of the following are true, the Onboarding system is complete:

- [ ] A new user can complete the full 7-step onboarding flow end-to-end
- [ ] Workspace is created with unique slug, org details persisted
- [ ] At least one integration (GitHub or Jira) can be connected via OAuth
- [ ] Org structure (departments + teams) can be created during onboarding
- [ ] Team invitations are sent and can be accepted via token link
- [ ] User preferences (layout, theme, cadence, notifications, AI mode) are saved
- [ ] Cross-product workspace IDs are provisioned for all selected products
- [ ] Onboarding state persists across sessions (close tab, return, resume)
- [ ] Invited users join existing workspace without re-creating it
- [ ] Onboarding analytics events are recorded (step timings, drop-off, completion)
- [ ] Integration tokens are encrypted at rest
- [ ] All API endpoints return consistent JSON envelope responses
- [ ] Unit tests pass for all services and repositories
- [ ] Integration tests pass for full onboarding flow
- [ ] E2E test passes for happy-path onboarding
- [ ] API responds within 200ms for step save operations (p95)
- [ ] Onboarding can handle 100 concurrent sessions without degradation

---

## 8. Dependency Graph (Build Order)

```
Phase 1 — Foundation (Week 1)
├── T-FND-1.* (service scaffold, config, DB, router)
├── T-DB-1.* (all migrations)
└── T-DOM-1.* (domain models)

Phase 2 — Core Backend (Week 2-3)
├── T-REPO-1.* (repository layer)
├── T-SVC-1.1 through T-SVC-1.3 (onboarding service)
├── T-API-1.1 through T-API-1.6 (auth middleware + onboarding + workspace handlers)
└── T-SEC-1.* (security)

Phase 3 — Integrations (Week 3-4)
├── T-OAUTH-1.* (provider implementations)
├── T-SVC-1.4 (integration service)
├── T-API-1.7 (integration handlers)
└── T-SEC-1.1 through T-SEC-1.3 (token encryption, CSRF)

Phase 4 — Teams & Preferences (Week 4)
├── T-SVC-1.5 (team service)
├── T-API-1.8 through T-API-1.10 (team + product + preference handlers)
├── T-EMAIL-1.* (invitation emails)
└── T-INV-1.* (invitation accept flow)

Phase 5 — Frontend Wiring (Week 4-5)
├── T-FE-1.* (wire all steps to backend)
└── T-FE-1.8 through T-FE-1.11 (resume, errors, loading, real-time)

Phase 6 — Background Jobs & Launch (Week 5-6)
├── T-BG-1.* (backfill workers)
├── T-SVC-1.6 (provisioning)
├── T-SVC-1.7 (backfill orchestration)
└── T-API-1.11 (analytics)

Phase 7 — Testing & Hardening (Week 6)
└── T-TEST-1.* (all tests)
```

---

## 9. References

| Document | Location |
|----------|----------|
| Onboarding Overview | `voatomy-landing/docs/onboarding/00-overview.md` |
| Welcome Step Spec | `voatomy-landing/docs/onboarding/01-welcome-step.md` |
| Integration Tools | `atlas/INTEGRATION-TOOLS.md` |
| Frontend Types | `voatomy-landing/src/types/index.ts` |
| Onboarding Context | `voatomy-landing/src/components/onboarding/onboarding-context.tsx` |
| ATLAS Tasks | `atlas/TASKS-AND-FEATURES.md` |
| SIGNAL Backend Reqs | `backend/signal-app/docs/signal-backend-requirements.md` |
| Enterprise Scaffold | `enterprise/` |

*Last updated: February 2026*

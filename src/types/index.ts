export interface NavItem {
  label: string;
  href: string;
}

export interface MegaMenuItem {
  icon: string;
  color: string;
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  items: readonly MegaMenuItem[];
}

export interface Testimonial {
  text: string;
  author: string;
}

export interface SecurityFeature {
  title: string;
  description: string;
}

export interface TeamLabel {
  abbr: string;
  label: string;
}

// ══════════════════════════════════════════════════════════════════
//  Onboarding — Core Step Flow
// ══════════════════════════════════════════════════════════════════

export type OnboardingStep =
  | "welcome"
  | "workspace"
  | "connect"
  | "team"
  | "products"
  | "customize"
  | "launch";

// ══════════════════════════════════════════════════════════════════
//  Onboarding — Enums & Scalars
// ══════════════════════════════════════════════════════════════════

export type UserRole =
  | "engineering-manager"
  | "tech-lead"
  | "product-manager"
  | "cto-vp"
  | "engineer"
  | "designer"
  | "founder"
  | "operations"
  | "devops-sre"
  | "qa-engineer"
  | "data-engineer"
  | "sales-leader"
  | "cs-leader"
  | "marketing"
  | "other";

export type Industry =
  | "saas"
  | "fintech"
  | "healthtech"
  | "ecommerce"
  | "devtools"
  | "enterprise"
  | "agency"
  | "education"
  | "gaming"
  | "media"
  | "ai-ml"
  | "crypto-web3"
  | "nonprofit"
  | "government"
  | "other";

export type CompanySize = "solo" | "2-10" | "11-50" | "51-200" | "201-1000" | "1000+";

export type ProductKey = "atlas" | "loop" | "signal" | "drift" | "phantom" | "nexus";

export type Purpose =
  | "sprint-planning"
  | "revenue-intelligence"
  | "incident-management"
  | "design-governance"
  | "tech-debt-tracking"
  | "cross-team-alignment"
  | "project-management"
  | "capacity-planning";

export type IntegrationKey =
  // Code
  | "github" | "gitlab" | "bitbucket" | "azure-devops"
  // Project management
  | "jira" | "linear" | "asana" | "monday" | "clickup" | "trello"
  // CRM
  | "salesforce" | "hubspot" | "pipedrive"
  // Revenue intelligence
  | "gong"
  // Support
  | "zendesk" | "intercom" | "freshdesk"
  // Communication
  | "slack" | "teams" | "discord"
  // Design
  | "figma" | "sketch"
  // Monitoring
  | "datadog" | "pagerduty" | "opsgenie" | "sentry" | "grafana"
  // Documents
  | "google-drive" | "notion" | "confluence"
  // Import
  | "csv";

// ══════════════════════════════════════════════════════════════════
//  Onboarding — Integration Auth
// ══════════════════════════════════════════════════════════════════

export type AuthMethod = "oauth2" | "oauth2_pkce" | "api_key";

export interface CredentialField {
  key: string;
  label: string;
  placeholder: string;
  secret: boolean;
}

export interface ProviderInfo {
  key: IntegrationKey;
  display_name: string;
  category: string;
  auth_method: AuthMethod;
  required_fields?: CredentialField[];
}

export type DashboardLayout = "compact" | "standard" | "detailed";
export type ThemePreference = "light" | "dark" | "auto";
export type NotificationFrequency = "realtime" | "hourly" | "daily" | "weekly";
export type AIMode = "proactive" | "balanced" | "conservative";
export type SprintCadence = "1-week" | "2-week" | "3-week" | "4-week" | "continuous";
export type InviteeRole = "admin" | "manager" | "member" | "viewer";

// ══════════════════════════════════════════════════════════════════
//  Onboarding — Org & Team Structure
// ══════════════════════════════════════════════════════════════════

export type OrgStructureType = "flat" | "functional" | "matrix" | "divisional";

export type TeamType =
  | "engineering"
  | "product"
  | "design"
  | "qa"
  | "devops-sre"
  | "data"
  | "marketing"
  | "sales"
  | "customer-success"
  | "operations"
  | "leadership"
  | "other";

export interface OnboardingTeam {
  id: string;
  name: string;
  type: TeamType;
  description: string;
  leadEmail: string;
  memberEmails: string[];
  parentDepartmentId: string;
  projectIds: string[];
  color: string;
}

export interface OnboardingDepartment {
  id: string;
  name: string;
  description: string;
  headEmail: string;
  teamIds: string[];
  color: string;
}

// ══════════════════════════════════════════════════════════════════
//  Onboarding — Geographical
// ══════════════════════════════════════════════════════════════════

export type Region =
  | "north-america"
  | "europe"
  | "asia-pacific"
  | "latin-america"
  | "africa"
  | "middle-east";

export interface GeoLocation {
  region: Region;
  country: string;
  countryCode: string;
  timezone: string;
}

// ══════════════════════════════════════════════════════════════════
//  Onboarding — Compound Types
// ══════════════════════════════════════════════════════════════════

export interface NotificationPrefs {
  email: boolean;
  slack: boolean;
  teams: boolean;
  inApp: boolean;
  frequency: NotificationFrequency;
  slackChannel?: string;
  teamsWebhook?: string;
}

export interface AIPreferences {
  mode: AIMode;
  autoSuggest: boolean;
  autoAssign: boolean;
  autoLinkGitActivity?: boolean;
}

export interface ConnectedIntegration {
  key: IntegrationKey;
  displayName: string;
  connectedAt: string;
  accountId?: string;
  authMethod?: AuthMethod;
}

export interface OnboardingInvitee {
  email: string;
  role: InviteeRole;
  teamId?: string;
}

export interface CrossProductIds {
  atlasWorkspaceId: string;
  loopOrgId: string;
  signalTenantId: string;
  driftTeamId: string;
  phantomScanId: string;
  nexusGraphId: string;
}

// ══════════════════════════════════════════════════════════════════
//  Onboarding — Form Data (master shape)
// ══════════════════════════════════════════════════════════════════

export interface OnboardingFormData {
  // Step 1 — Welcome
  fullName: string;
  email: string;
  userRole: UserRole | "";

  // Step 2 — Workspace
  workspaceName: string;
  workspaceSlug: string;
  industry: Industry | "";
  companySize: CompanySize | "";
  region: Region | "";
  country: string;
  countryCode: string;
  timezone: string;
  purposes: Purpose[];

  // Products (derived from subscription, not user-selected)
  selectedProducts: ProductKey[];
  primaryProduct: ProductKey | "";

  // Step 3 — Connect
  connectedIntegrations: ConnectedIntegration[];
  selectedBoardProject: BoardProject | null;

  // Step 4 — Team & Org Structure
  orgStructureType: OrgStructureType;
  departments: OnboardingDepartment[];
  teams: OnboardingTeam[];
  teamName: string;
  userTeamId: string | null;
  invitees: OnboardingInvitee[];

  // Step 5 — Customize
  dashboardLayout: DashboardLayout;
  notificationPrefs: NotificationPrefs;
  sprintCadence: SprintCadence | "";
  aiPreferences: AIPreferences;
  themePreference: ThemePreference;

  // Step 6 — Launch (generated)
  setupComplete: boolean;
  crossProductIds: CrossProductIds;
}

// ══════════════════════════════════════════════════════════════════
//  Atlas — Board Projects & Sprint Status
// ══════════════════════════════════════════════════════════════════

export interface BoardProject {
  key: string;
  name: string;
  provider: string;
  ticketCount: number;
  hasActiveSprint: boolean;
  avatarUrl?: string;
}

export interface SprintPlanTicket {
  externalId: string;
  title: string;
  points: number;
  priority: string;
}

export interface SprintPlanPreview {
  name: string;
  startDate: string;
  endDate: string;
  ticketCount: number;
  totalPoints: number;
  confidence: "low" | "medium" | "high";
  topTickets: SprintPlanTicket[];
}

export interface ActiveSprintInfo {
  name: string;
  startDate: string;
  endDate: string;
  ticketCount: number;
  completedCount: number;
  totalPoints: number;
}

export interface SprintStatusResponse {
  status: "syncing" | "detecting" | "planning" | "ready" | "error";
  project: { key: string; name: string; provider: string } | null;
  hasActiveSprint: boolean;
  activeSprint?: ActiveSprintInfo;
  sprintPlan?: SprintPlanPreview;
  error?: string;
}

// ══════════════════════════════════════════════════════════════════
//  Misc / Landing Page
// ══════════════════════════════════════════════════════════════════

export interface ProductFlowCard {
  icon: string;
  title: string;
  subtitle: string;
}

export interface AnalysisStep {
  label: string;
  duration: number;
}

// ══════════════════════════════════════════════════════════════════
//  Backend Response Types — Onboarding Session
// ══════════════════════════════════════════════════════════════════

export interface OnboardingSession {
  id: string;
  user_id: string;
  org_id: string;
  current_step: OnboardingStep;
  completed_steps: OnboardingStep[];
  skipped_steps: OnboardingStep[];
  form_data: Record<string, unknown>;
  version: number;
  started_at: string;
  updated_at: string;
}

export interface OnboardingStatusResponse {
  session: OnboardingSession;
  progress_percent: number;
  step_order: OnboardingStep[];
  total_steps: number;
}

export interface SlugCheckResult {
  slug: string;
  available: boolean;
}

// ══════════════════════════════════════════════════════════════════
//  Backend Response Types — Departments & Teams
// ══════════════════════════════════════════════════════════════════

export interface BackendDepartment {
  id: string;
  org_id: string;
  name: string;
  description: string;
  head_email: string;
  color: string;
  created_at: string;
}

export interface BackendTeam {
  id: string;
  org_id: string;
  department_id: string;
  name: string;
  type: TeamType;
  description: string;
  lead_email: string;
  color: string;
  created_at: string;
}

// ══════════════════════════════════════════════════════════════════
//  Backend Response Types — Products & Provisioning
// ══════════════════════════════════════════════════════════════════

export interface ProductSelection {
  selected_products: ProductKey[];
  primary_product: ProductKey;
}

export interface ProvisionResult {
  status: "pending" | "provisioning" | "completed" | "failed";
  cross_product_ids: CrossProductIds;
  provisioned_products: ProductKey[];
  errors?: string[];
}

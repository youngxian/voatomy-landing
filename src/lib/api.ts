import type {
  IntegrationKey,
  ProviderInfo,
  ConnectedIntegration,
  OnboardingStep,
  OnboardingStatusResponse,
  OnboardingSession,
  SlugCheckResult,
  BackendDepartment,
  BackendTeam,
  ProductSelection,
  ProvisionResult,
  BoardProject,
  SprintStatusResponse,
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_ONBOARDING_API_URL ?? "http://localhost:8081/v1";
const PUBLIC_API = process.env.NEXT_PUBLIC_ONBOARDING_API_URL?.replace("/v1", "/public") ?? "http://localhost:8081/public";
const ATLAS_API_BASE = process.env.NEXT_PUBLIC_ATLAS_API_URL ?? "http://localhost:3010/v1";

async function request<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...opts?.headers,
    },
    ...opts,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = body.error ?? body;
    throw new APIError(res.status, err.code ?? "unknown", err.message ?? res.statusText);
  }

  const json = await res.json();
  return (json.data ?? json) as T;
}

export class APIError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = "APIError";
  }
}

// ── Geolocation (public — no auth required) ──

export interface GeoLocationResult {
  country: string;
  country_code: string;
  region: string;
  timezone: string;
}

export async function fetchGeoLocation(): Promise<GeoLocationResult | null> {
  try {
    const res = await fetch(`${PUBLIC_API}/geolocate`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as GeoLocationResult;
  } catch {
    return null;
  }
}

// ── Pricing Catalog (public — no auth required) ──

export interface APIPricingTier {
  name: string;
  slug: string;
  monthly_price: number;
  annual_price: number;
  period: string;
  description: string;
  best_for: string;
  features: string[];
  popular: boolean;
  badge?: string;
}

export interface APIProductAddOn {
  key: string;
  name: string;
  tagline: string;
  monthly_price: number;
  annual_price: number;
  included: boolean;
}

export interface APIVolumeDiscount {
  min_users: number;
  max_users: number;
  discount: number;
}

export interface APIPricingCatalog {
  tiers: APIPricingTier[];
  add_ons: APIProductAddOn[];
  volume_discounts: APIVolumeDiscount[];
  trial_days: number;
}

export async function fetchPricingCatalog(): Promise<APIPricingCatalog | null> {
  try {
    const res = await fetch(`${PUBLIC_API}/pricing`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const catalog = (json.data ?? json) as APIPricingCatalog;
    if (!catalog?.tiers) return null;
    return catalog;
  } catch {
    return null;
  }
}

// ── Auth (public — no JWT required) ──

export async function signupWithMagicLink(input: {
  first_name: string;
  last_name: string;
  email: string;
}): Promise<{ message: string }> {
  const res = await fetch(`${PUBLIC_API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new APIError(res.status, body.error?.code ?? "unknown", body.error?.message ?? res.statusText);
  }
  return (await res.json()).data;
}

export interface VerifyMagicLinkResult {
  valid: boolean;
  expired?: boolean;
  email?: string;
  session_token?: string;
  user_id?: string;
}

export async function verifyMagicLink(token: string): Promise<VerifyMagicLinkResult> {
  const res = await fetch(`${PUBLIC_API}/auth/verify/${token}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new APIError(res.status, body.error?.code ?? "unknown", body.error?.message ?? "Verification failed");
  }
  return (await res.json()).data;
}

export async function resendMagicLink(email: string): Promise<{ message: string }> {
  const res = await fetch(`${PUBLIC_API}/auth/resend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new APIError(res.status, body.error?.code ?? "unknown", body.error?.message ?? res.statusText);
  }
  return (await res.json()).data;
}

// ── Password Reset (public — no JWT required) ──

export async function forgotPassword(email: string): Promise<{ message: string }> {
  const res = await fetch(`${PUBLIC_API}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new APIError(res.status, body.error?.code ?? "unknown", body.error?.message ?? res.statusText);
  }
  return (await res.json()).data;
}

export async function resetPassword(
  token: string,
  password: string,
  confirm_password: string,
): Promise<{ message: string }> {
  const res = await fetch(`${PUBLIC_API}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password, confirm_password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new APIError(res.status, body.error?.code ?? "unknown", body.error?.message ?? res.statusText);
  }
  return (await res.json()).data;
}

// ── Login with password + OTP (public — no JWT required) ──

export interface LoginWithPasswordResult {
  otp_required: boolean;
  login_token: string;
  email: string;
}

export async function loginWithPassword(
  email: string,
  password: string,
): Promise<LoginWithPasswordResult> {
  const res = await fetch(`${PUBLIC_API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = body.error ?? body;
    throw new APIError(res.status, err.code ?? "unknown", err.message ?? res.statusText);
  }
  return (await res.json()).data;
}

export interface VerifyLoginOTPResult {
  session_token: string;
  user_id: string;
  email: string;
}

export async function verifyLoginOTP(
  login_token: string,
  code: string,
): Promise<VerifyLoginOTPResult> {
  const res = await fetch(`${PUBLIC_API}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login_token, code }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = body.error ?? body;
    throw new APIError(res.status, err.code ?? "unknown", err.message ?? res.statusText);
  }
  return (await res.json()).data;
}

// ── Logout (public — no JWT required) ──

export async function logout(): Promise<void> {
  await fetch(`${PUBLIC_API}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  document.cookie = "session=; path=/; max-age=0";
  window.location.href = "/auth/login";
}

// ── SSO (public — no JWT required) ──

export async function initSSO(email: string): Promise<{ redirect_url: string }> {
  const res = await fetch(`${PUBLIC_API}/auth/sso/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new APIError(res.status, body.error?.code ?? "unknown", body.error?.message ?? res.statusText);
  }
  return (await res.json()).data;
}

// ── Auth (protected — JWT required) ──

export async function setPassword(input: {
  password: string;
  confirm_password: string;
  remember_me: boolean;
}): Promise<{ message: string }> {
  return request<{ message: string }>("/auth/set-password", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function dismissPasswordPrompt(): Promise<void> {
  await request("/auth/dismiss-password-prompt", { method: "POST" });
}

export interface PasswordStatus {
  has_password: boolean;
  password_preference: "not_set" | "set" | "dismissed";
  show_prompt: boolean;
}

export async function getPasswordStatus(): Promise<PasswordStatus> {
  return request<PasswordStatus>("/auth/password-status");
}

// ── SSO Config (protected — JWT required) ──

export interface SSOConfig {
  id: string;
  org_id: string;
  enabled: boolean;
  protocol: "saml" | "oidc";
  domain: string;
  idp_entity_id?: string;
  idp_sso_url?: string;
  idp_certificate?: string;
  idp_metadata_url?: string;
  oidc_issuer?: string;
  oidc_client_id?: string;
  enforce_sso: boolean;
  created_at: string;
  updated_at: string;
}

export interface SSOConfigInput {
  protocol: "saml" | "oidc";
  domain: string;
  enabled: boolean;
  enforce_sso: boolean;
  idp_entity_id?: string;
  idp_sso_url?: string;
  idp_certificate?: string;
  idp_metadata_url?: string;
  oidc_issuer?: string;
  oidc_client_id?: string;
  oidc_client_secret?: string;
}

export async function getSSOConfig(): Promise<SSOConfig> {
  return request<SSOConfig>("/sso/config");
}

export async function upsertSSOConfig(input: SSOConfigInput): Promise<SSOConfig> {
  return request<SSOConfig>("/sso/config", {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteSSOConfig(): Promise<void> {
  await request("/sso/config", { method: "DELETE" });
}

export async function testSSOConnection(): Promise<{ success: boolean; message: string }> {
  return request<{ success: boolean; message: string }>("/sso/test", {
    method: "POST",
  });
}

// ── Subscription ──

export interface Subscription {
  id: string;
  org_id: string;
  plan: "starter" | "pro" | "business" | "enterprise";
  status: "active" | "trialing" | "past_due" | "canceled";
  licensed_products: string[];
  current_period_start: string;
  current_period_end: string;
}

export async function getSubscription(): Promise<Subscription> {
  return request<Subscription>("/subscription");
}

// ── Invitations (authenticated) ──

export interface InvitationPayload {
  email: string;
  role: string;
  team_id?: string;
}

export interface Invitation {
  id: string;
  org_id: string;
  team_id?: string;
  email: string;
  role: string;
  invited_by: string;
  status: "pending" | "accepted" | "expired" | "revoked";
  token: string;
  created_at: string;
  accepted_at?: string;
  expires_at: string;
}

export async function sendInvitations(
  invitations: InvitationPayload[],
): Promise<Invitation[]> {
  return request<Invitation[]>("/invitations", {
    method: "POST",
    body: JSON.stringify({ invitations }),
  });
}

export async function listInvitations(): Promise<Invitation[]> {
  return request<Invitation[]>("/invitations");
}

// ── Invitations (public — no auth required) ──

export interface InvitationDetails {
  email: string;
  role: string;
  org_name: string;
  team_name?: string;
  inviter_name: string;
  status: "pending" | "accepted" | "expired" | "revoked";
  expires_at: string;
  project_ids?: string[];
}

export async function getInvitationDetails(
  token: string,
): Promise<InvitationDetails> {
  const res = await fetch(`${PUBLIC_API}/invitations/${token}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = body.error ?? body;
    throw new APIError(
      res.status,
      err.code ?? "unknown",
      err.message ?? res.statusText,
    );
  }
  const json = await res.json();
  return (json.data ?? json) as InvitationDetails;
}

export interface AcceptInvitationResult {
  invitation: Invitation;
  session_token: string;
  redirect_url: string;
  is_new_user: boolean;
}

export async function acceptInvitation(
  token: string,
): Promise<AcceptInvitationResult> {
  const res = await fetch(`${PUBLIC_API}/invitations/${token}/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = body.error ?? body;
    throw new APIError(
      res.status,
      err.code ?? "unknown",
      err.message ?? res.statusText,
    );
  }
  const json = await res.json();
  return (json.data ?? json) as AcceptInvitationResult;
}

// ── Onboarding Session ──

export async function startOnboarding(data: {
  full_name: string;
  email: string;
  role: string;
}): Promise<OnboardingSession> {
  return request<OnboardingSession>("/onboarding/start", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getOnboardingStatus(): Promise<OnboardingStatusResponse> {
  return request<OnboardingStatusResponse>("/onboarding/status");
}

export async function saveOnboardingStep(
  step: OnboardingStep,
  data: Record<string, unknown>,
  version: number,
): Promise<OnboardingSession> {
  return request<OnboardingSession>(`/onboarding/steps/${step}`, {
    method: "PUT",
    body: JSON.stringify({ data, version }),
  });
}

export async function skipOnboardingStep(
  step: OnboardingStep,
): Promise<OnboardingSession> {
  return request<OnboardingSession>(`/onboarding/steps/${step}/skip`, {
    method: "POST",
  });
}

export async function completeOnboarding(): Promise<OnboardingSession> {
  return request<OnboardingSession>("/onboarding/complete", {
    method: "POST",
  });
}

// ── Workspace ──

export async function checkSlugAvailability(slug: string): Promise<SlugCheckResult> {
  return request<SlugCheckResult>(`/workspaces/check-slug?slug=${encodeURIComponent(slug)}`);
}

// ── Departments & Teams ──

export async function createDepartment(data: {
  name: string;
  description: string;
  head_email: string;
  color: string;
}): Promise<BackendDepartment> {
  return request<BackendDepartment>("/departments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function listDepartments(): Promise<BackendDepartment[]> {
  return request<BackendDepartment[]>("/departments");
}

export async function createTeam(data: {
  department_id: string;
  name: string;
  type: string;
  description: string;
  lead_email: string;
  color: string;
}): Promise<BackendTeam> {
  return request<BackendTeam>("/teams", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function listTeams(): Promise<BackendTeam[]> {
  return request<BackendTeam[]>("/teams");
}

// ── Products & Billing ──

export async function setProducts(data: ProductSelection): Promise<ProductSelection> {
  return request<ProductSelection>("/products", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function getProducts(): Promise<ProvisionResult> {
  return request<ProvisionResult>("/products");
}

export async function provisionProducts(): Promise<ProvisionResult> {
  return request<ProvisionResult>("/products/provision", {
    method: "POST",
  });
}

export async function startTrial(): Promise<{ message: string; trial_ends_at: string }> {
  return request<{ message: string; trial_ends_at: string }>("/billing/start-trial", {
    method: "POST",
  });
}

// ── Providers ──

export async function fetchProviders(): Promise<ProviderInfo[]> {
  return request<ProviderInfo[]>("/integrations/providers");
}

// ── OAuth connect (Tier 1 + 2) ──

interface OAuthConnectResult {
  auth_url: string;
  state: string;
  auth_method: string;
}

export async function initiateOAuthConnect(
  provider: IntegrationKey,
  redirectUrl: string,
): Promise<OAuthConnectResult> {
  return request<OAuthConnectResult>(`/integrations/${provider}/connect`, {
    method: "POST",
    body: JSON.stringify({ redirect_url: redirectUrl }),
  });
}

// ── API Key connect (Tier 3) ──

export async function connectWithAPIKey(
  provider: IntegrationKey,
  credentials: Record<string, string>,
): Promise<ConnectedIntegration> {
  return request<ConnectedIntegration>(`/integrations/${provider}/connect`, {
    method: "POST",
    body: JSON.stringify({ credentials }),
  });
}

// ── List connected ──

export async function listConnected(): Promise<ConnectedIntegration[]> {
  return request<ConnectedIntegration[]>("/integrations");
}

// ── Disconnect ──

export async function disconnectIntegration(provider: IntegrationKey): Promise<void> {
  await request(`/integrations/${provider}`, { method: "DELETE" });
}

// ── Atlas Service — Board Projects & Sprint Status ──

async function atlasRequest<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${ATLAS_API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...opts?.headers,
    },
    ...opts,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = body.error ?? body;
    throw new APIError(res.status, err.code ?? "unknown", err.message ?? res.statusText);
  }

  const json = await res.json();
  return (json.data ?? json) as T;
}

export async function fetchBoardProjects(provider: IntegrationKey): Promise<BoardProject[]> {
  return atlasRequest<BoardProject[]>(`/integrations/${provider}/projects`);
}

export async function getSprintStatus(orgId: string): Promise<SprintStatusResponse> {
  return atlasRequest<SprintStatusResponse>(`/orgs/${orgId}/sprint-status`);
}

// ── OAuth popup helper ──

const OAUTH_POPUP_WIDTH = 600;
const OAUTH_POPUP_HEIGHT = 700;

export function openOAuthPopup(authUrl: string): Promise<{ code: string; state: string }> {
  return new Promise((resolve, reject) => {
    const left = Math.round(window.screenX + (window.outerWidth - OAUTH_POPUP_WIDTH) / 2);
    const top = Math.round(window.screenY + (window.outerHeight - OAUTH_POPUP_HEIGHT) / 2);

    const popup = window.open(
      authUrl,
      "voatomy_oauth",
      `width=${OAUTH_POPUP_WIDTH},height=${OAUTH_POPUP_HEIGHT},left=${left},top=${top},popup=yes`,
    );

    if (!popup) {
      reject(new Error("Popup blocked — please allow popups for this site."));
      return;
    }

    const interval = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(interval);
          reject(new Error("OAuth window was closed before completing."));
          return;
        }

        const url = popup.location.href;
        if (!url || !url.includes("code=")) return;

        const params = new URL(url).searchParams;
        const code = params.get("code");
        const state = params.get("state");

        if (code && state) {
          clearInterval(interval);
          popup.close();
          resolve({ code, state });
        }
      } catch {
        // Cross-origin — expected until the redirect back to our domain
      }
    }, 300);

    // Timeout after 5 minutes
    setTimeout(() => {
      clearInterval(interval);
      if (!popup.closed) popup.close();
      reject(new Error("OAuth flow timed out."));
    }, 5 * 60 * 1000);
  });
}

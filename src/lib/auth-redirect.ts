const DASHBOARD_ORIGIN =
  process.env.NEXT_PUBLIC_DASHBOARD_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

const LANDING_ORIGIN =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3001";

const ONBOARDING_API_ORIGIN = (process.env.NEXT_PUBLIC_ONBOARDING_API_URL ?? "http://localhost:8081/v1")
  .trim()
  .replace(/\/v1(\/public)?\/?$/i, "")
  .replace(/\/public\/?$/i, "")
  .replace(/\/$/, "");

const LANDING_ONBOARDING_PREFIXES = ["/onboard", "/onboarding"];

/** Hand off session JWT to a product app dashboard (separate origin in dev). */
export function productSessionHandoffUrl(
  sessionToken: string,
  product: "atlas" | "loop" | "signal" | "drift" | "phantom" | "nexus",
  nextPath = "/dashboard",
): string {
  const origins: Record<string, string> = {
    atlas: process.env.NEXT_PUBLIC_DASHBOARD_URL?.replace(/\/$/, "") ?? "http://localhost:3000",
    loop: process.env.NEXT_PUBLIC_LOOP_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3001",
    signal: process.env.NEXT_PUBLIC_SIGNAL_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3002",
    drift: process.env.NEXT_PUBLIC_DRIFT_APP_URL?.replace(/\/$/, "") ?? "#",
    phantom: process.env.NEXT_PUBLIC_PHANTOM_APP_URL?.replace(/\/$/, "") ?? "#",
    nexus: process.env.NEXT_PUBLIC_NEXUS_APP_URL?.replace(/\/$/, "") ?? "#",
  };
  const origin = origins[product] ?? origins.atlas;
  if (origin === "#") {
    return dashboardSessionHandoffUrl(sessionToken, nextPath);
  }
  const next = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  return `${origin}/auth/session?token=${encodeURIComponent(sessionToken)}&next=${encodeURIComponent(next)}`;
}

/** Hand off session JWT to the dashboard app (separate origin in dev). */
export function dashboardSessionHandoffUrl(sessionToken: string, nextPath = "/dashboard"): string {
  const next = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  return `${DASHBOARD_ORIGIN}/auth/session?token=${encodeURIComponent(sessionToken)}&next=${encodeURIComponent(next)}`;
}

/** Same-origin session cookie (marketing site routes like /onboard). */
export function landingSessionHandoffUrl(sessionToken: string, nextPath = "/onboard"): string {
  const next = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  return `${LANDING_ORIGIN}/auth/session?token=${encodeURIComponent(sessionToken)}&next=${encodeURIComponent(next)}`;
}

export function isLandingOnboardingPath(path: string): boolean {
  return LANDING_ONBOARDING_PREFIXES.some((prefix) => path.startsWith(prefix));
}

export async function fetchOnboardingCompleted(sessionToken: string): Promise<boolean> {
  try {
    const res = await fetch(`${ONBOARDING_API_ORIGIN}/v1/me`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return false;
    const json = await res.json();
    const data = json.data ?? json;
    return data.onboarding_completed === true;
  } catch {
    return false;
  }
}

export function resolvePostAuthDestination(
  sessionToken: string | undefined,
  storedRedirect: string | null,
): string {
  if (!sessionToken) {
    return storedRedirect || `${DASHBOARD_ORIGIN}/dashboard`;
  }

  const redirect = storedRedirect?.trim();
  if (!redirect) {
    return dashboardSessionHandoffUrl(sessionToken, "/dashboard");
  }

  if (redirect.startsWith("http://") || redirect.startsWith("https://")) {
    try {
      const url = new URL(redirect);
      const dashboardOrigin = new URL(DASHBOARD_ORIGIN).origin;
      if (url.origin === dashboardOrigin) {
        return dashboardSessionHandoffUrl(sessionToken, `${url.pathname}${url.search}`);
      }
      if (typeof window !== "undefined" && url.origin === window.location.origin) {
        return landingSessionHandoffUrl(sessionToken, `${url.pathname}${url.search}`);
      }
    } catch {
      /* fall through */
    }
    return redirect;
  }

  if (redirect.startsWith("/")) {
    if (isLandingOnboardingPath(redirect) || redirect.startsWith("/settings")) {
      return landingSessionHandoffUrl(sessionToken, redirect);
    }
    return dashboardSessionHandoffUrl(sessionToken, redirect);
  }

  return dashboardSessionHandoffUrl(sessionToken, "/dashboard");
}

/** Resolves post-login destination, sending new users to /onboard before any dashboard. */
export async function resolvePostAuthDestinationAsync(
  sessionToken: string | undefined,
  storedRedirect: string | null,
): Promise<string> {
  if (!sessionToken) {
    return storedRedirect || `${DASHBOARD_ORIGIN}/dashboard`;
  }

  const redirect = storedRedirect?.trim();

  if (redirect && isLandingOnboardingPath(redirect)) {
    return landingSessionHandoffUrl(sessionToken, redirect);
  }

  const onboardingCompleted = await fetchOnboardingCompleted(sessionToken);
  if (!onboardingCompleted) {
    const onboardPath = redirect && isLandingOnboardingPath(redirect) ? redirect : "/onboard";
    return landingSessionHandoffUrl(sessionToken, onboardPath);
  }

  return resolvePostAuthDestination(sessionToken, storedRedirect);
}

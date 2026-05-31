export type CookieConsentState = {
  /** User has made a choice (banner dismissed) */
  decided: boolean;
  analytics: boolean;
  preferences: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "voatomy_cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

type ConsentListener = (state: CookieConsentState) => void;
const listeners = new Set<ConsentListener>();

function readCookie(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsentState;
  } catch {
    return null;
  }
}

function persist(state: CookieConsentState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  document.cookie = `${STORAGE_KEY}=${encodeURIComponent(JSON.stringify(state))}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax`;
  listeners.forEach((fn) => fn(state));
}

export function getCookieConsent(): CookieConsentState | null {
  return readCookie();
}

export function hasConsentDecision(): boolean {
  return readCookie()?.decided === true;
}

export function hasAnalyticsConsent(): boolean {
  const state = readCookie();
  return state?.decided === true && state.analytics === true;
}

export function hasPreferencesConsent(): boolean {
  const state = readCookie();
  return state?.decided === true && state.preferences === true;
}

export function saveCookieConsent(partial: Pick<CookieConsentState, "analytics" | "preferences">): CookieConsentState {
  const state: CookieConsentState = {
    decided: true,
    analytics: partial.analytics,
    preferences: partial.preferences,
    updatedAt: new Date().toISOString(),
  };
  persist(state);
  return state;
}

export function acceptAllCookies(): CookieConsentState {
  return saveCookieConsent({ analytics: true, preferences: true });
}

export function acceptEssentialOnly(): CookieConsentState {
  return saveCookieConsent({ analytics: false, preferences: false });
}

export function subscribeCookieConsent(listener: ConsentListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

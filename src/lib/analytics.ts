/**
 * ══════════════════════════════════════════════════════════════════
 *  Voatomy Analytics Engine
 *  Comprehensive user interaction logging for monitoring
 * ══════════════════════════════════════════════════════════════════
 *
 * Tracks: page views, clicks, scroll depth, form interactions,
 * navigation, section visibility, time on page, onboarding flow,
 * errors, performance, feature engagement, and more.
 *
 * Events are buffered locally and can be flushed to any backend
 * endpoint. In development, all events are logged to the console.
 */

// ── Event Types ──

export type EventCategory =
  | "page_view"
  | "navigation"
  | "click"
  | "scroll"
  | "form"
  | "section_view"
  | "cta"
  | "onboarding"
  | "engagement"
  | "error"
  | "performance"
  | "session"
  | "conversion"
  | "feature"
  | "search"
  | "media"
  | "exit";

export interface AnalyticsEvent {
  /** Unique event ID */
  id: string;
  /** ISO timestamp */
  timestamp: string;
  /** Event category */
  category: EventCategory;
  /** Specific action name */
  action: string;
  /** Human-readable label */
  label?: string;
  /** Numeric value (e.g., scroll depth %, time in ms) */
  value?: number;
  /** Current page path */
  page: string;
  /** Session ID */
  sessionId: string;
  /** Additional structured data */
  metadata?: Record<string, unknown>;
}

export interface SessionInfo {
  sessionId: string;
  startedAt: string;
  referrer: string;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
  language: string;
  timezone: string;
  platform: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface ScrollMilestone {
  depth: number;
  reachedAt: string;
}

// ── Singleton State ──

let _sessionId = "";
let _sessionInfo: SessionInfo | null = null;
let _eventBuffer: AnalyticsEvent[] = [];
let _flushTimer: ReturnType<typeof setInterval> | null = null;
let _scrollMilestones: Set<number> = new Set();
let _sectionVisibility: Map<string, { enteredAt: number; totalTime: number; visible: boolean }> = new Map();
let _pageEnteredAt = 0;
let _isInitialized = false;
let _eventListeners: Array<(event: AnalyticsEvent) => void> = [];

// ── Configuration ──

const CONFIG = {
  /** Flush buffer every N milliseconds */
  flushInterval: 10_000,
  /** Max events to buffer before force-flushing */
  maxBufferSize: 100,
  /** Backend endpoint (null = console-only) */
  endpoint: null as string | null,
  /** Whether to log to console in development */
  debugLog: process.env.NODE_ENV === "development",
  /** Scroll depth milestones to track (percentages) */
  scrollMilestones: [10, 25, 50, 75, 90, 100],
  /** Minimum time (ms) in a section before logging a view */
  sectionViewThreshold: 1000,
  /** Whether to track mouse movements (heat-map style) */
  trackMouseHeatmap: false,
  /** Storage key for persisting session data */
  storageKey: "voatomy_analytics",
};

// ── Utilities ──

function generateId(): string {
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function generateSessionId(): string {
  return `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function getUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const val = params.get(key);
    if (val) utm[key.replace("utm_", "utmSource").replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = val;
  }
  // Fix: do it properly
  const map: Record<string, string> = {
    utm_source: "utmSource",
    utm_medium: "utmMedium",
    utm_campaign: "utmCampaign",
    utm_term: "utmTerm",
    utm_content: "utmContent",
  };
  const result: Record<string, string> = {};
  for (const [paramKey, propKey] of Object.entries(map)) {
    const val = params.get(paramKey);
    if (val) result[propKey] = val;
  }
  return result;
}

function getDeviceType(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getScrollDepth(): number {
  if (typeof window === "undefined" || typeof document === "undefined") return 0;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (docHeight === 0) return 0;
  return Math.round((scrollTop / docHeight) * 100);
}

// ── Core API ──

/**
 * Initialize the analytics engine. Call once on app mount.
 */
export function initAnalytics(): void {
  if (_isInitialized || typeof window === "undefined") return;
  _isInitialized = true;

  // Restore or create session
  const stored = tryGetStoredSession();
  if (stored && Date.now() - new Date(stored.startedAt).getTime() < 30 * 60 * 1000) {
    _sessionId = stored.sessionId;
    _sessionInfo = stored;
  } else {
    _sessionId = generateSessionId();
    _sessionInfo = {
      sessionId: _sessionId,
      startedAt: new Date().toISOString(),
      referrer: document.referrer || "(direct)",
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      devicePixelRatio: window.devicePixelRatio || 1,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      platform: getDeviceType(),
      ...getUTMParams(),
    };
    tryPersistSession(_sessionInfo);

    // Log session start
    trackEvent("session", "session_start", "New session started", undefined, {
      referrer: _sessionInfo.referrer,
      platform: _sessionInfo.platform,
      screenWidth: _sessionInfo.screenWidth,
      screenHeight: _sessionInfo.screenHeight,
      language: _sessionInfo.language,
      timezone: _sessionInfo.timezone,
      ...(Object.fromEntries(
        Object.entries(getUTMParams()).filter(([, v]) => v)
      )),
    });
  }

  _pageEnteredAt = Date.now();

  // Start flush timer
  _flushTimer = setInterval(flushEvents, CONFIG.flushInterval);

  // Scroll tracking
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Visibility change (tab switch / minimize)
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Before unload — flush + track exit
  window.addEventListener("beforeunload", handleBeforeUnload);

  // Error tracking
  window.addEventListener("error", handleGlobalError);
  window.addEventListener("unhandledrejection", handleUnhandledRejection);

  // Performance tracking (after load)
  if (document.readyState === "complete") {
    trackPerformance();
  } else {
    window.addEventListener("load", trackPerformance, { once: true });
  }
}

/**
 * Destroy the analytics engine (cleanup).
 */
export function destroyAnalytics(): void {
  if (!_isInitialized || typeof window === "undefined") return;

  if (_flushTimer) clearInterval(_flushTimer);
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  window.removeEventListener("beforeunload", handleBeforeUnload);
  window.removeEventListener("error", handleGlobalError);
  window.removeEventListener("unhandledrejection", handleUnhandledRejection);

  flushEvents();
  _isInitialized = false;
}

/**
 * Track a custom event.
 */
export function trackEvent(
  category: EventCategory,
  action: string,
  label?: string,
  value?: number,
  metadata?: Record<string, unknown>,
): void {
  const event: AnalyticsEvent = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    category,
    action,
    label,
    value,
    page: typeof window !== "undefined" ? window.location.pathname : "/",
    sessionId: _sessionId,
    metadata,
  };

  _eventBuffer.push(event);

  // Notify listeners
  _eventListeners.forEach((fn) => fn(event));

  // Debug log
  if (CONFIG.debugLog) {
    const color = EVENT_COLORS[category] || "#888";
    console.log(
      `%c[Analytics] %c${category}%c ${action}`,
      "color: #0d9488; font-weight: bold",
      `color: ${color}; font-weight: bold; background: ${color}15; padding: 1px 4px; border-radius: 3px`,
      "color: inherit",
      label ? `— ${label}` : "",
      value !== undefined ? `(${value})` : "",
      metadata ? metadata : "",
    );
  }

  // Force-flush if buffer is full
  if (_eventBuffer.length >= CONFIG.maxBufferSize) {
    flushEvents();
  }
}

// ── Specialized Tracking Functions ──

/** Track a page view */
export function trackPageView(path: string, title?: string): void {
  _pageEnteredAt = Date.now();
  _scrollMilestones.clear();
  trackEvent("page_view", "page_view", title || path, undefined, {
    path,
    title: title || (typeof document !== "undefined" ? document.title : ""),
    referrer: typeof document !== "undefined" ? document.referrer : "",
  });
}

/** Track navigation (internal link click) */
export function trackNavigation(from: string, to: string, method: string = "link"): void {
  const timeOnPage = Date.now() - _pageEnteredAt;
  trackEvent("navigation", "navigate", `${from} → ${to}`, timeOnPage, {
    from,
    to,
    method,
    timeOnPreviousPage: timeOnPage,
  });
}

/** Track a CTA click */
export function trackCTA(ctaId: string, ctaText: string, location: string): void {
  trackEvent("cta", "cta_click", ctaText, undefined, {
    ctaId,
    ctaText,
    location,
    page: typeof window !== "undefined" ? window.location.pathname : "/",
  });
}

/** Track a button/link click */
export function trackClick(elementId: string, elementText: string, context?: string): void {
  trackEvent("click", "element_click", elementText, undefined, {
    elementId,
    elementText,
    context,
  });
}

/** Track form interaction */
export function trackFormEvent(
  formId: string,
  action: "focus" | "blur" | "change" | "submit" | "error" | "abandon",
  fieldName?: string,
  details?: Record<string, unknown>,
): void {
  trackEvent("form", `form_${action}`, formId, undefined, {
    formId,
    fieldName,
    ...details,
  });
}

/** Track section visibility (for scroll-into-view sections) */
export function trackSectionView(sectionId: string, sectionName: string): void {
  trackEvent("section_view", "section_entered", sectionName, undefined, {
    sectionId,
    scrollDepth: getScrollDepth(),
  });
}

/** Track section exit (with time spent) */
export function trackSectionExit(sectionId: string, sectionName: string, timeSpent: number): void {
  trackEvent("section_view", "section_exited", sectionName, timeSpent, {
    sectionId,
    timeSpentMs: timeSpent,
  });
}

/** Track onboarding step */
export function trackOnboardingStep(
  action: "step_entered" | "step_completed" | "step_skipped" | "step_abandoned" | "field_changed",
  stepName: string,
  stepIndex: number,
  details?: Record<string, unknown>,
): void {
  trackEvent("onboarding", action, stepName, stepIndex, {
    stepName,
    stepIndex,
    ...details,
  });
}

/** Track conversion event */
export function trackConversion(
  conversionType: "signup_start" | "signup_complete" | "email_captured" | "onboarding_complete" | "waitlist_join" | "demo_request",
  details?: Record<string, unknown>,
): void {
  trackEvent("conversion", conversionType, conversionType, undefined, details);
}

/** Track feature engagement */
export function trackFeature(featureName: string, action: string, details?: Record<string, unknown>): void {
  trackEvent("feature", action, featureName, undefined, {
    featureName,
    ...details,
  });
}

/** Track search queries */
export function trackSearch(query: string, resultsCount?: number): void {
  trackEvent("search", "search_query", query, resultsCount, {
    query,
    resultsCount,
  });
}

/** Track media events (video play, etc.) */
export function trackMedia(
  mediaId: string,
  action: "play" | "pause" | "complete" | "progress",
  progress?: number,
): void {
  trackEvent("media", `media_${action}`, mediaId, progress, {
    mediaId,
    progress,
  });
}

// ── Event Handlers (auto-tracking) ──

function handleScroll(): void {
  const depth = getScrollDepth();
  for (const milestone of CONFIG.scrollMilestones) {
    if (depth >= milestone && !_scrollMilestones.has(milestone)) {
      _scrollMilestones.add(milestone);
      trackEvent("scroll", "scroll_depth", `Reached ${milestone}%`, milestone, {
        milestone,
        page: typeof window !== "undefined" ? window.location.pathname : "/",
      });
    }
  }
}

function handleVisibilityChange(): void {
  if (document.hidden) {
    const timeOnPage = Date.now() - _pageEnteredAt;
    trackEvent("session", "tab_hidden", "User switched away", timeOnPage, {
      timeOnPageMs: timeOnPage,
    });
  } else {
    trackEvent("session", "tab_visible", "User returned");
    _pageEnteredAt = Date.now(); // Reset for accurate time tracking
  }
}

function handleBeforeUnload(): void {
  const timeOnPage = Date.now() - _pageEnteredAt;
  const maxScroll = Math.max(...Array.from(_scrollMilestones), 0);
  trackEvent("exit", "page_exit", "User leaving", timeOnPage, {
    timeOnPageMs: timeOnPage,
    maxScrollDepth: maxScroll,
    page: typeof window !== "undefined" ? window.location.pathname : "/",
  });
  flushEvents(true); // Synchronous flush
}

function handleGlobalError(event: ErrorEvent): void {
  trackEvent("error", "js_error", event.message, undefined, {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack?.slice(0, 500),
  });
}

function handleUnhandledRejection(event: PromiseRejectionEvent): void {
  const reason = event.reason;
  trackEvent("error", "unhandled_rejection", String(reason), undefined, {
    reason: String(reason),
    stack: reason?.stack?.slice(0, 500),
  });
}

function trackPerformance(): void {
  if (typeof window === "undefined" || !window.performance) return;

  // Use setTimeout to ensure metrics are populated
  setTimeout(() => {
    const entries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (entries.length === 0) return;

    const nav = entries[0];
    trackEvent("performance", "page_load", "Page load metrics", Math.round(nav.loadEventEnd - nav.startTime), {
      dns: Math.round(nav.domainLookupEnd - nav.domainLookupStart),
      tcp: Math.round(nav.connectEnd - nav.connectStart),
      ttfb: Math.round(nav.responseStart - nav.requestStart),
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
      loadComplete: Math.round(nav.loadEventEnd - nav.startTime),
      domInteractive: Math.round(nav.domInteractive - nav.startTime),
      transferSize: nav.transferSize,
      encodedBodySize: nav.encodedBodySize,
    });

    // Core Web Vitals via PerformanceObserver
    try {
      // LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        if (last) {
          trackEvent("performance", "lcp", "Largest Contentful Paint", Math.round(last.startTime));
        }
        lcpObserver.disconnect();
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

      // FID
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as Array<PerformanceEntry & { processingStart: number; startTime: number }>;
        for (const entry of entries) {
          trackEvent("performance", "fid", "First Input Delay", Math.round(entry.processingStart - entry.startTime));
        }
        fidObserver.disconnect();
      });
      fidObserver.observe({ type: "first-input", buffered: true });

      // CLS
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as Array<PerformanceEntry & { hadRecentInput: boolean; value: number }>;
        for (const entry of entries) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });

      // Report CLS after 5 seconds
      setTimeout(() => {
        trackEvent("performance", "cls", "Cumulative Layout Shift", Math.round(clsValue * 1000));
        clsObserver.disconnect();
      }, 5000);
    } catch {
      // PerformanceObserver not supported — skip Web Vitals
    }
  }, 1000);
}

// ── Event Buffer & Flushing ──

/**
 * Flush the event buffer to the configured endpoint.
 * Falls back to console in development.
 */
export function flushEvents(sync: boolean = false): void {
  if (_eventBuffer.length === 0) return;

  const events = [..._eventBuffer];
  _eventBuffer = [];

  if (CONFIG.endpoint) {
    const payload = JSON.stringify({
      sessionInfo: _sessionInfo,
      events,
      flushedAt: new Date().toISOString(),
    });

    if (sync && typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(CONFIG.endpoint, payload);
    } else if (typeof fetch !== "undefined") {
      fetch(CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Re-buffer on failure
        _eventBuffer.push(...events);
      });
    }
  }

  if (CONFIG.debugLog) {
    console.groupCollapsed(
      `%c[Analytics] Flushed ${events.length} events`,
      "color: #0d9488; font-weight: bold"
    );
    console.table(
      events.map((e) => ({
        category: e.category,
        action: e.action,
        label: e.label,
        value: e.value,
        page: e.page,
        time: new Date(e.timestamp).toLocaleTimeString(),
      }))
    );
    console.groupEnd();
  }
}

/**
 * Get all buffered events (for debugging / export).
 */
export function getBufferedEvents(): AnalyticsEvent[] {
  return [..._eventBuffer];
}

/**
 * Get session info.
 */
export function getSessionInfo(): SessionInfo | null {
  return _sessionInfo;
}

/**
 * Subscribe to all tracked events in real time.
 */
export function onEvent(callback: (event: AnalyticsEvent) => void): () => void {
  _eventListeners.push(callback);
  return () => {
    _eventListeners = _eventListeners.filter((fn) => fn !== callback);
  };
}

/**
 * Configure the analytics endpoint.
 */
export function setAnalyticsEndpoint(url: string): void {
  CONFIG.endpoint = url;
}

/**
 * Enable/disable debug logging.
 */
export function setDebugMode(enabled: boolean): void {
  CONFIG.debugLog = enabled;
}

// ── Session Persistence ──

function tryGetStoredSession(): SessionInfo | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(CONFIG.storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function tryPersistSession(info: SessionInfo): void {
  try {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(CONFIG.storageKey, JSON.stringify(info));
  } catch {
    // Storage quota exceeded or blocked — silently ignore
  }
}

// ── Section Visibility Tracking (IntersectionObserver helper) ──

/**
 * Observe a DOM element and track when it enters/exits the viewport.
 * Returns a cleanup function.
 */
export function observeSection(
  element: HTMLElement,
  sectionId: string,
  sectionName: string,
  threshold: number = 0.3,
): () => void {
  if (typeof IntersectionObserver === "undefined") return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const state = _sectionVisibility.get(sectionId);

        if (entry.isIntersecting) {
          if (!state || !state.visible) {
            _sectionVisibility.set(sectionId, {
              enteredAt: Date.now(),
              totalTime: state?.totalTime || 0,
              visible: true,
            });
            trackSectionView(sectionId, sectionName);
          }
        } else {
          if (state?.visible) {
            const timeSpent = Date.now() - state.enteredAt;
            _sectionVisibility.set(sectionId, {
              enteredAt: 0,
              totalTime: state.totalTime + timeSpent,
              visible: false,
            });
            if (timeSpent >= CONFIG.sectionViewThreshold) {
              trackSectionExit(sectionId, sectionName, timeSpent);
            }
          }
        }
      }
    },
    { threshold },
  );

  observer.observe(element);
  return () => observer.disconnect();
}

// ── Console Colors by Category ──

const EVENT_COLORS: Record<EventCategory, string> = {
  page_view: "#0d9488",
  navigation: "#6366F1",
  click: "#F59E0B",
  scroll: "#8B5CF6",
  form: "#EC4899",
  section_view: "#22D3EE",
  cta: "#EF4444",
  onboarding: "#F97316",
  engagement: "#14B8A6",
  error: "#DC2626",
  performance: "#10B981",
  session: "#64748B",
  conversion: "#22C55E",
  feature: "#A855F7",
  search: "#0EA5E9",
  media: "#F472B6",
  exit: "#94A3B8",
};

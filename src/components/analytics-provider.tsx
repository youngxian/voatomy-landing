"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  initAnalytics,
  destroyAnalytics,
  trackPageView,
  trackNavigation,
  trackEvent,
  trackClick,
  trackCTA,
} from "@/lib/analytics";

// ══════════════════════════════════════════════════════════════════
//  AnalyticsProvider
//
//  Mount at the root layout. Automatically handles:
//  - Analytics engine initialization
//  - Route-change page view tracking
//  - Global click delegation for data-track-* attributes
//  - Rage click detection
//  - Copy/paste tracking
//  - Print tracking
// ══════════════════════════════════════════════════════════════════

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathRef = React.useRef<string>("");
  const clickTimestamps = React.useRef<Array<{ x: number; y: number; t: number }>>([]);

  // ── Initialize engine ──
  React.useEffect(() => {
    initAnalytics();
    return () => destroyAnalytics();
  }, []);

  // ── Track page views on route change ──
  React.useEffect(() => {
    const fullPath = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    if (prevPathRef.current && prevPathRef.current !== pathname) {
      trackNavigation(prevPathRef.current, pathname, "client_navigation");
    }

    trackPageView(fullPath);
    prevPathRef.current = pathname;
  }, [pathname, searchParams]);

  // ── Global click delegation ──
  React.useEffect(() => {
    function handleGlobalClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Walk up the DOM tree to find the closest trackable element
      let el: HTMLElement | null = target;
      let depth = 0;
      const MAX_DEPTH = 8;

      while (el && depth < MAX_DEPTH) {
        // data-track-click="id" data-track-label="text" data-track-context="context"
        const trackId = el.getAttribute("data-track-click");
        if (trackId) {
          const label = el.getAttribute("data-track-label") || el.textContent?.trim().slice(0, 80) || trackId;
          const context = el.getAttribute("data-track-context") || "";
          trackClick(trackId, label, context);
          break;
        }

        // data-track-cta="id" data-track-cta-text="text" data-track-cta-location="loc"
        const ctaId = el.getAttribute("data-track-cta");
        if (ctaId) {
          const ctaText = el.getAttribute("data-track-cta-text") || el.textContent?.trim().slice(0, 80) || ctaId;
          const ctaLocation = el.getAttribute("data-track-cta-location") || pathname;
          trackCTA(ctaId, ctaText, ctaLocation);
          break;
        }

        el = el.parentElement;
        depth++;
      }

      // ── Rage Click Detection ──
      const now = Date.now();
      const threshold = 800; // 800ms window
      const distanceThreshold = 50; // px radius

      clickTimestamps.current.push({ x: e.clientX, y: e.clientY, t: now });

      // Keep only recent clicks
      clickTimestamps.current = clickTimestamps.current.filter(
        (c) => now - c.t < threshold
      );

      // Check for 3+ clicks in close proximity
      if (clickTimestamps.current.length >= 3) {
        const first = clickTimestamps.current[0];
        const allClose = clickTimestamps.current.every(
          (c) =>
            Math.abs(c.x - first.x) < distanceThreshold &&
            Math.abs(c.y - first.y) < distanceThreshold
        );
        if (allClose) {
          const tagName = target.tagName?.toLowerCase() || "unknown";
          const text = target.textContent?.trim().slice(0, 50) || "";
          trackEvent("engagement", "rage_click", `${tagName}: ${text}`, clickTimestamps.current.length, {
            element: tagName,
            text,
            x: e.clientX,
            y: e.clientY,
            clickCount: clickTimestamps.current.length,
          });
          clickTimestamps.current = []; // Reset after detection
        }
      }
    }

    // ── Copy event tracking ──
    function handleCopy() {
      const selection = window.getSelection()?.toString().slice(0, 100) || "";
      trackEvent("engagement", "text_copy", selection, selection.length, {
        page: window.location.pathname,
      });
    }

    // ── Print tracking ──
    function handleBeforePrint() {
      trackEvent("engagement", "print", "User printing page", undefined, {
        page: window.location.pathname,
      });
    }

    // ── External link tracking ──
    function handleLinkClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Track external links
      if (href.startsWith("http") && !href.includes(window.location.hostname)) {
        trackEvent("navigation", "external_link", href, undefined, {
          href,
          text: anchor.textContent?.trim().slice(0, 80) || "",
          page: window.location.pathname,
        });
      }

      // Track mailto/tel links
      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        trackEvent("engagement", href.startsWith("mailto:") ? "email_click" : "phone_click", href, undefined, {
          href,
          page: window.location.pathname,
        });
      }
    }

    document.addEventListener("click", handleGlobalClick, { capture: true });
    document.addEventListener("copy", handleCopy);
    document.addEventListener("click", handleLinkClick);
    window.addEventListener("beforeprint", handleBeforePrint);

    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("click", handleLinkClick);
      window.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, [pathname]);

  return <>{children}</>;
}

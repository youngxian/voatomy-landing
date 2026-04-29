"use client";

import * as React from "react";
import {
  trackEvent,
  trackClick,
  trackCTA,
  trackFormEvent,
  trackSectionView,
  trackFeature,
  observeSection,
  type EventCategory,
} from "@/lib/analytics";

// ══════════════════════════════════════════════════════════════════
//  useTrackClick — Track a click with context
// ══════════════════════════════════════════════════════════════════

export function useTrackClick(elementId: string, label: string, context?: string) {
  return React.useCallback(() => {
    trackClick(elementId, label, context);
  }, [elementId, label, context]);
}

// ══════════════════════════════════════════════════════════════════
//  useTrackCTA — Track a CTA click with location context
// ══════════════════════════════════════════════════════════════════

export function useTrackCTA(ctaId: string, ctaText: string, location: string) {
  return React.useCallback(() => {
    trackCTA(ctaId, ctaText, location);
  }, [ctaId, ctaText, location]);
}

// ══════════════════════════════════════════════════════════════════
//  useSectionTracker — IntersectionObserver for section visibility
// ══════════════════════════════════════════════════════════════════

export function useSectionTracker(sectionId: string, sectionName: string, threshold: number = 0.3) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeSection(el, sectionId, sectionName, threshold);
  }, [sectionId, sectionName, threshold]);

  return ref;
}

// ══════════════════════════════════════════════════════════════════
//  useFormTracker — Track form interactions (focus, blur, submit)
// ══════════════════════════════════════════════════════════════════

export function useFormTracker(formId: string) {
  const startTimeRef = React.useRef<number>(0);
  const fieldsInteracted = React.useRef<Set<string>>(new Set());

  const trackFocus = React.useCallback(
    (fieldName: string) => {
      if (!startTimeRef.current) startTimeRef.current = Date.now();
      fieldsInteracted.current.add(fieldName);
      trackFormEvent(formId, "focus", fieldName);
    },
    [formId],
  );

  const trackBlur = React.useCallback(
    (fieldName: string, hasValue: boolean) => {
      trackFormEvent(formId, "blur", fieldName, { hasValue });
    },
    [formId],
  );

  const trackChange = React.useCallback(
    (fieldName: string, valueLength?: number) => {
      fieldsInteracted.current.add(fieldName);
      trackFormEvent(formId, "change", fieldName, { valueLength });
    },
    [formId],
  );

  const trackSubmit = React.useCallback(
    (success: boolean, details?: Record<string, unknown>) => {
      const timeSpent = startTimeRef.current
        ? Date.now() - startTimeRef.current
        : 0;
      trackFormEvent(formId, "submit", undefined, {
        success,
        timeSpentMs: timeSpent,
        fieldsInteracted: fieldsInteracted.current.size,
        ...details,
      });
    },
    [formId],
  );

  const trackError = React.useCallback(
    (fieldName: string, errorMessage: string) => {
      trackFormEvent(formId, "error", fieldName, { errorMessage });
    },
    [formId],
  );

  const trackAbandon = React.useCallback(() => {
    const timeSpent = startTimeRef.current
      ? Date.now() - startTimeRef.current
      : 0;
    trackFormEvent(formId, "abandon", undefined, {
      timeSpentMs: timeSpent,
      fieldsInteracted: fieldsInteracted.current.size,
      fieldsInteractedList: Array.from(fieldsInteracted.current),
    });
  }, [formId]);

  // Track form abandon on unmount if form was interacted with
  React.useEffect(() => {
    return () => {
      if (fieldsInteracted.current.size > 0 && startTimeRef.current > 0) {
        trackAbandon();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    trackFocus,
    trackBlur,
    trackChange,
    trackSubmit,
    trackError,
    trackAbandon,
  };
}

// ══════════════════════════════════════════════════════════════════
//  useFeatureTracker — Track feature engagement
// ══════════════════════════════════════════════════════════════════

export function useFeatureTracker(featureName: string) {
  const trackInteraction = React.useCallback(
    (action: string, details?: Record<string, unknown>) => {
      trackFeature(featureName, action, details);
    },
    [featureName],
  );

  return trackInteraction;
}

// ══════════════════════════════════════════════════════════════════
//  useTimeOnSection — Track time spent on a section
// ══════════════════════════════════════════════════════════════════

export function useTimeOnSection(sectionId: string) {
  const enteredAt = React.useRef<number>(0);

  React.useEffect(() => {
    enteredAt.current = Date.now();
    return () => {
      if (enteredAt.current) {
        const timeSpent = Date.now() - enteredAt.current;
        trackEvent("engagement", "time_on_section", sectionId, timeSpent, {
          sectionId,
          timeSpentMs: timeSpent,
        });
      }
    };
  }, [sectionId]);
}

// ══════════════════════════════════════════════════════════════════
//  useHoverTracker — Track hover on elements (e.g., pricing cards)
// ══════════════════════════════════════════════════════════════════

export function useHoverTracker(elementId: string, label: string) {
  const hoverStart = React.useRef<number>(0);

  const onMouseEnter = React.useCallback(() => {
    hoverStart.current = Date.now();
  }, []);

  const onMouseLeave = React.useCallback(() => {
    if (hoverStart.current) {
      const duration = Date.now() - hoverStart.current;
      if (duration > 500) {
        // Only track hovers longer than 500ms to filter accidental passes
        trackEvent("engagement", "hover", label, duration, {
          elementId,
          durationMs: duration,
        });
      }
      hoverStart.current = 0;
    }
  }, [elementId, label]);

  return { onMouseEnter, onMouseLeave };
}

// ══════════════════════════════════════════════════════════════════
//  useComponentMounted — Track when a component is visible
// ══════════════════════════════════════════════════════════════════

export function useComponentMounted(componentName: string, details?: Record<string, unknown>) {
  React.useEffect(() => {
    trackEvent("engagement", "component_mounted", componentName, undefined, details);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentName]);
}

"use client";

import { useState, useEffect } from "react";
import { getSubscription, type Subscription } from "@/lib/api";

export type { Subscription };

export type SubscriptionState =
  | { status: "loading" }
  | { status: "none" }       // not logged in, or no subscription
  | { status: "loaded"; subscription: Subscription };

export function useSubscription(isLoggedIn: boolean) {
  const [state, setState] = useState<SubscriptionState>({ status: "loading" });

  useEffect(() => {
    if (!isLoggedIn) {
      setState({ status: "none" });
      return;
    }

    let cancelled = false;
    getSubscription()
      .then((sub) => {
        if (!cancelled) setState({ status: "loaded", subscription: sub });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "none" });
      });

    return () => { cancelled = true; };
  }, [isLoggedIn]);

  return state;
}

// Plan hierarchy: higher index = higher tier
export const PLAN_ORDER = ["starter", "pro", "business", "enterprise"] as const;
export type PlanSlug = (typeof PLAN_ORDER)[number];

export function planRank(plan: string): number {
  return PLAN_ORDER.indexOf(plan as PlanSlug);
}

"use client";

import * as React from "react";
import { getSubscription } from "@/lib/api";
import type { ProductKey } from "@/types";

const DEFAULT_PRODUCTS: ProductKey[] = ["atlas"];

export function useSubscriptionProducts() {
  const [products, setProducts] = React.useState<ProductKey[]>(DEFAULT_PRODUCTS);
  const [primaryProduct, setPrimaryProduct] = React.useState<ProductKey>("atlas");
  const [loading, setLoading] = React.useState(true);
  const [plan, setPlan] = React.useState<string>("starter");

  React.useEffect(() => {
    let cancelled = false;

    getSubscription()
      .then((sub) => {
        if (cancelled) return;
        setPlan(sub.plan);

        if (sub.licensed_products && sub.licensed_products.length > 0) {
          const licensed = sub.licensed_products as ProductKey[];
          setProducts(licensed);
          setPrimaryProduct(licensed[0]);
        }
      })
      .catch(() => {
        // Starter / free tier or API unavailable — keep defaults
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, primaryProduct, loading, plan };
}

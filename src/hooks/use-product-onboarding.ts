"use client";

import * as React from "react";
import { useOnboarding } from "@/components/onboarding/onboarding-context";
import { useSubscriptionProducts } from "@/hooks/use-subscription-products";
import {
  resolveProductOnboarding,
  resolvePrimaryProduct,
  type ResolvedProductOnboarding,
} from "@/lib/product-onboarding-config";
import type { ProductKey, StartupIdeaTemplate } from "@/types";

export function useProductOnboarding(): ResolvedProductOnboarding & {
  subscriptionLoading: boolean;
  plan: string;
} {
  const { formData, updateFormData } = useOnboarding();
  const { products: licensedProducts, loading: subscriptionLoading, plan } = useSubscriptionProducts();

  const resolved = React.useMemo(
    () =>
      resolveProductOnboarding(
        licensedProducts,
        formData.startupIdeaTemplate,
        formData.primaryProduct,
      ),
    [licensedProducts, formData.startupIdeaTemplate, formData.primaryProduct],
  );

  // Keep form entitlements in sync with subscription (source of truth for billing)
  React.useEffect(() => {
    if (subscriptionLoading) return;
    const primary = resolvePrimaryProduct(
      licensedProducts,
      formData.startupIdeaTemplate,
      formData.primaryProduct,
    );
    const needsSync =
      formData.selectedProducts.join(",") !== licensedProducts.join(",") ||
      formData.primaryProduct !== primary;
    if (needsSync) {
      updateFormData({ selectedProducts: licensedProducts, primaryProduct: primary });
    }
  }, [
    subscriptionLoading,
    licensedProducts,
    formData.startupIdeaTemplate,
    formData.primaryProduct,
    formData.selectedProducts,
    updateFormData,
  ]);

  // Auto-select template when only one licensed product (skip picker friction)
  React.useEffect(() => {
    if (subscriptionLoading) return;
    const templates = resolved.availableTemplates;
    if (templates.length === 1 && formData.startupIdeaTemplate !== templates[0].key) {
      updateFormData({ startupIdeaTemplate: templates[0].key as StartupIdeaTemplate });
    }
  }, [subscriptionLoading, resolved.availableTemplates, formData.startupIdeaTemplate, updateFormData]);

  return {
    ...resolved,
    subscriptionLoading,
    plan,
  };
}

export function usePrimaryProduct(): ProductKey {
  return useProductOnboarding().primaryProduct;
}

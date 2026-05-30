"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { PRODUCT_MODULES } from "@/lib/product-onboarding-config";
import type { ProductKey } from "@/types";

const NEXUS_PRODUCTS = (["atlas", "loop", "signal", "drift", "phantom"] as const).map((productKey) => ({
  ...PRODUCT_MODULES[productKey],
  productKey,
}));

export function NexusProductsStep() {
  const { goNext, goBack, formData, markStepComplete, saveStep } = useOnboarding();
  const licensed = formData.selectedProducts.filter((p) => p !== "nexus");
  const [selected, setSelected] = React.useState<ProductKey[]>(
    licensed.length > 0 ? licensed : (["atlas"] as ProductKey[]),
  );

  const toggle = (key: ProductKey) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const handleContinue = async () => {
    try {
      await saveStep("nexus-products", { nexus_products: selected });
    } catch {
      /* continue */
    }
    markStepComplete("nexus-products");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="nexus-products"
        title="Choose products for Nexus"
        subtitle="Select which Voatomy products feed the org intelligence graph."
        color="#0EA5E9"
      />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        {NEXUS_PRODUCTS.map((product) => {
          const isSelected = selected.includes(product.productKey);
          const isLicensed = licensed.length === 0 || licensed.includes(product.productKey);
          return (
            <button
              key={product.productKey}
              type="button"
              onClick={() => isLicensed && toggle(product.productKey)}
              disabled={!isLicensed}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all",
                isSelected
                  ? "border-brand bg-white ring-2 ring-brand/15 shadow-sm"
                  : "border-[#121312]/10 bg-white hover:border-[#121312]/20",
                !isLicensed && "cursor-not-allowed opacity-50",
              )}
            >
              <span className="text-xl">{product.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#121312]">{product.label}</p>
                <p className="mt-0.5 text-xs text-[#121312]/50">{product.tagline}</p>
              </div>
              {isSelected && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#004838" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          );
        })}
      </motion.div>

      <StepNav onBack={goBack} onContinue={handleContinue} canContinue={selected.length > 0} />
    </div>
  );
}

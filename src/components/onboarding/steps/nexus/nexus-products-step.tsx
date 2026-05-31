"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../../onboarding-context";
import { StepHeader, StepNav } from "../_shared";
import { PRODUCT_MODULES } from "@/lib/product-onboarding-config";
import type { ProductKey } from "@/types";

const NEXUS_PRODUCTS = (Object.keys(PRODUCT_MODULES) as ProductKey[]).filter((k) => k !== "nexus");

export function NexusProductsStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete, saveStep } = useOnboarding();
  const [selectedProducts, setSelectedProducts] = React.useState<ProductKey[]>(
    formData.selectedProducts.length > 0 ? formData.selectedProducts as ProductKey[] : NEXUS_PRODUCTS,
  );

  const toggle = (key: ProductKey) => {
    setSelectedProducts((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const handleContinue = async () => {
    updateFormData({ selectedProducts });
    try { await saveStep("nexus-products", { selected_products: selectedProducts }); } catch { /* continue */ }
    markStepComplete("nexus-products");
    goNext();
  };

  return (
    <div>
      <StepHeader
        stepKey="nexus-products"
        title="Choose products for Nexus"
        subtitle="Select which Voatomy products feed data into the Nexus org intelligence graph."
        color="#0EA5E9"
      />

      <div className="space-y-2">
        {NEXUS_PRODUCTS.map((key, i) => {
          const mod = PRODUCT_MODULES[key];
          const selected = selectedProducts.includes(key);
          return (
            <motion.button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "group relative w-full rounded-xl border p-3 text-left transition-all duration-200",
                selected
                  ? "border-[#0EA5E9]/40 bg-[#0EA5E9]/5 ring-1 ring-[#0EA5E9]/20"
                  : "border-fynk-border bg-white hover:border-[#0EA5E9]/20 hover:bg-[#0EA5E9]/[0.02]",
              )}
            >
              <div
                className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all"
                style={selected ? { backgroundColor: "#0EA5E9", borderColor: "#0EA5E9" } : { borderColor: "rgba(17,24,39,0.12)" }}
              >
                {selected && (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-3 pr-6">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg"
                  style={{ backgroundColor: `${mod.color}18` }}
                >
                  {mod.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-fynk-ink">{mod.label}</p>
                  <p className="text-xs text-fynk-muted">{mod.tagline} · {mod.welcomeSummary}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {selectedProducts.length === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center text-xs text-red-400">
          Select at least one product to feed the Nexus graph.
        </motion.p>
      )}

      {selectedProducts.length > 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center text-xs text-fynk-muted">
          {selectedProducts.length} product{selectedProducts.length !== 1 ? "s" : ""} will feed the Nexus intelligence graph.
        </motion.p>
      )}

      <StepNav
        onBack={goBack}
        onContinue={handleContinue}
        canContinue={selectedProducts.length > 0}
        continueLabel="Confirm products"
      />
    </div>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnboarding } from "../onboarding-context";
import { PRODUCT_CARDS, PURPOSE_OPTIONS } from "@/lib/constants";
import type { ProductKey } from "@/types";

export function ProductsStep() {
  const { goNext, goBack, updateFormData, formData, markStepComplete } = useOnboarding();
  const [selected, setSelected] = React.useState<ProductKey[]>(formData.selectedProducts);
  const [primary, setPrimary] = React.useState<ProductKey | "">(formData.primaryProduct);

  // Smart recommendations based on purposes
  const recommendedProducts = React.useMemo(() => {
    const rec = new Set<ProductKey>();
    formData.purposes.forEach((purpose) => {
      const match = PURPOSE_OPTIONS.find((p) => p.value === purpose);
      if (match) match.products.forEach((pk) => rec.add(pk as ProductKey));
    });
    // Always recommend atlas as baseline
    if (rec.size === 0) rec.add("atlas");
    return rec;
  }, [formData.purposes]);

  const toggle = (key: ProductKey) => {
    setSelected((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
      // If nexus is selected, select all available
      if (key === "nexus" && !prev.includes("nexus")) {
        return ["atlas", "loop", "signal", "drift", "phantom", "nexus"];
      }
      // If nexus is deselected, remove all
      if (key === "nexus" && prev.includes("nexus")) {
        return [];
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelected(["atlas", "loop", "signal", "drift", "phantom", "nexus"]);
    setPrimary("nexus");
  };

  const canContinue = selected.length > 0;

  const handleContinue = () => {
    const effectivePrimary = primary || selected[0] || "";
    updateFormData({ selectedProducts: selected, primaryProduct: effectivePrimary });
    markStepComplete("products");
    goNext();
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12">
          <span className="text-2xl">📦</span>
        </div>
        <h1 className="text-[28px] font-bold tracking-tight text-[#121312]">Choose your products</h1>
        <p className="mt-1.5 text-sm text-[#121312]/50">
          Start with one or activate the full platform. You can add more anytime.
        </p>
      </motion.div>

      {/* Smart recommendation banner */}
      {recommendedProducts.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-5 rounded-xl border border-brand/15 bg-brand/5 p-3 text-center"
        >
          <p className="text-xs font-medium text-[#121312]/60">
            ✨ Based on your goals, we recommend:{" "}
            <span className="font-bold text-[#121312]/80">
              {Array.from(recommendedProducts)
                .map((k) => PRODUCT_CARDS.find((p) => p.key === k)?.name)
                .filter(Boolean)
                .join(", ")}
            </span>
          </p>
        </motion.div>
      )}

      {/* Product grid */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5"
      >
        {PRODUCT_CARDS.map((product, index) => {
          const isSelected = selected.includes(product.key);
          const isRecommended = recommendedProducts.has(product.key);

          return (
            <motion.button
              key={product.key}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              onClick={() => toggle(product.key)}
              className={cn(
                "group relative w-full rounded-2xl border p-4 text-left transition-all duration-250",
                isSelected
                  ? "border-brand bg-white shadow-md ring-2 ring-brand/15"
                  : "border-[#121312]/8 bg-white hover:border-[#121312]/15 hover:shadow-sm",
              )}
            >
              {/* Selection check */}
              <div
                className={cn(
                  "absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                  isSelected
                    ? "border-brand bg-brand text-white"
                    : "border-[#121312]/15 bg-transparent",
                )}
              >
                {isSelected && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              {/* Recommended badge */}
              {isRecommended && !isSelected && (
                <span className="absolute top-3 left-3 rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-dark">
                  Recommended
                </span>
              )}

              {/* Content */}
              <div className="flex items-start gap-3 mt-1">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                  style={{ backgroundColor: `${product.color}15` }}
                >
                  {product.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-bold text-[#121312]">{product.name}</h3>
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: typeof product.color === "string" && !product.color.startsWith("url") ? product.color : "#10B981" }}
                    />
                  </div>
                  <p className="text-[11px] font-semibold text-[#121312]/45 mb-1">{product.tagline}</p>
                  <p className="text-xs text-[#121312]/50 leading-relaxed">{product.description}</p>

                  {/* Features */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-md bg-[#121312]/[0.04] px-1.5 py-0.5 text-[9px] font-medium text-[#121312]/45"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Best for */}
                  <p className="mt-2 text-[10px] text-[#121312]/35">
                    Best for: {product.bestFor.join(", ")}
                  </p>

                  {/* Availability */}
                  {!product.available && (
                    <span className="mt-1.5 inline-block rounded-full bg-[#121312]/5 px-2 py-0.5 text-[9px] font-medium text-[#121312]/40">
                      Coming soon — join early access
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Select all shortcut */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-6 text-center"
      >
        <button
          type="button"
          onClick={selectAll}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all",
            selected.length === 6
              ? "border-brand bg-brand/10 text-[#121312]"
              : "border-[#121312]/10 text-[#121312]/55 hover:border-brand/30 hover:text-[#121312]/70",
          )}
        >
          🧠 Activate all products (NEXUS)
        </button>
      </motion.div>

      {/* Selected summary */}
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-5 overflow-hidden"
        >
          <div className="flex flex-wrap gap-1.5 justify-center">
            {selected.map((key) => {
              const product = PRODUCT_CARDS.find((p) => p.key === key);
              if (!product) return null;
              return (
                <span key={key} className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-bold text-[#121312]/70">
                  {product.icon} {product.name}
                </span>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={goBack}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[#121312]/12 text-sm font-medium text-[#121312]/60 transition-all hover:bg-[#121312]/5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
          className={cn(
            "flex h-12 flex-[2] items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200",
            canContinue
              ? "bg-brand text-[#121312] shadow-sm hover:shadow-md active:scale-[0.98]"
              : "bg-[#121312]/8 text-[#121312]/35 cursor-not-allowed",
          )}
        >
          Continue
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

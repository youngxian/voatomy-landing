"use client";

import { useState, useEffect } from "react";
import { fetchPricingCatalog, type APIPricingCatalog } from "@/lib/api";
import {
  PRICING_TIERS,
  PRODUCT_ADD_ONS,
  VOLUME_DISCOUNTS,
} from "@/lib/constants";

export interface PricingTier {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  period: string;
  description: string;
  bestFor: string;
  features: { text: string; included: boolean }[];
  cta: string;
  ctaVariant: "primary" | "secondary";
  popular: boolean;
  badge: string;
}

export interface ProductAddOn {
  key: string;
  name: string;
  tagline: string;
  icon: string;
  monthlyPrice: number;
  annualPrice: number;
  note: string;
  color: string;
  included: boolean;
}

export interface VolumeDiscount {
  minUsers: number;
  maxUsers: number;
  discount: number;
  label: string;
}

function buildDefaults() {
  const tiers: PricingTier[] = PRICING_TIERS.map((t) => ({
    name: t.name,
    monthlyPrice: t.monthlyPrice,
    annualPrice: t.annualPrice,
    period: t.period,
    description: t.description,
    bestFor: t.bestFor,
    features: t.features.map((f) => ({ ...f })),
    cta: t.cta,
    ctaVariant: t.ctaVariant,
    popular: t.popular,
    badge: t.badge,
  }));

  const addOns: ProductAddOn[] = PRODUCT_ADD_ONS.map((a) => ({
    key: a.key,
    name: a.name,
    tagline: a.tagline,
    icon: a.icon,
    monthlyPrice: a.monthlyPrice,
    annualPrice: a.annualPrice,
    note: a.note,
    color: a.color,
    included: a.included,
  }));

  const volumeDiscounts: VolumeDiscount[] = VOLUME_DISCOUNTS.map((v) => ({
    minUsers: v.minUsers,
    maxUsers: v.maxUsers,
    discount: v.discount,
    label: v.label,
  }));

  return { tiers, addOns, volumeDiscounts };
}

function applyCatalog(catalog: APIPricingCatalog) {
  const defaults = buildDefaults();

  for (const apiTier of catalog.tiers) {
    const match = defaults.tiers.find(
      (t) =>
        t.name.toLowerCase() === apiTier.name.toLowerCase() ||
        t.name.toLowerCase() === apiTier.slug,
    );
    if (match) {
      match.monthlyPrice = apiTier.monthly_price;
      match.annualPrice = apiTier.annual_price;
      if (apiTier.description) match.description = apiTier.description;
      if (apiTier.best_for) match.bestFor = apiTier.best_for;
      if (apiTier.features.length > 0) {
        match.features = apiTier.features.map((f) => ({ text: f, included: true }));
      }
    }
  }

  for (const apiAddon of catalog.add_ons) {
    const match = defaults.addOns.find((a) => a.key === apiAddon.key);
    if (match) {
      match.monthlyPrice = apiAddon.monthly_price;
      match.annualPrice = apiAddon.annual_price;
    }
  }

  if (catalog.volume_discounts.length > 0) {
    defaults.volumeDiscounts = catalog.volume_discounts.map((vd) => {
      const existing = VOLUME_DISCOUNTS.find((v) => v.minUsers === vd.min_users);
      return {
        minUsers: vd.min_users,
        maxUsers: vd.max_users,
        discount: vd.discount,
        label: existing?.label ?? (vd.discount > 0 ? `${vd.discount}% volume discount` : ""),
      };
    });
  }

  return defaults;
}

export function usePricing() {
  const [data, setData] = useState(buildDefaults);
  const [trialDays, setTrialDays] = useState(14);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchPricingCatalog().then((catalog) => {
      if (cancelled) return;
      if (catalog) {
        setData(applyCatalog(catalog));
        setTrialDays(catalog.trial_days);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { ...data, trialDays, loading };
}

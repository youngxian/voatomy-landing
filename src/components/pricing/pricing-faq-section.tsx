"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FynkHeading } from "@/components/marketing/fynk-primitives";
import { PRICING_FAQS, PRICING_SECTIONS } from "@/lib/pricing-page-data";
import { Lightbulb, Minus, Plus } from "lucide-react";
import { FynkInlineAvatarCluster } from "@/components/marketing/fynk-primitives";

function FAQRow({
  item,
  open,
  onToggle,
}: {
  item: (typeof PRICING_FAQS)[number];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-fynk-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span className="text-body-lg font-semibold text-fynk-ink sm:text-heading-4">{item.question}</span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-fynk-border bg-white">
          {open ? (
            <Minus className="h-4 w-4 text-fynk-muted" />
          ) : (
            <Plus className="h-4 w-4 text-fynk-muted" />
          )}
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="pr-14 text-body-base leading-relaxed text-fynk-muted sm:text-body-lg">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PricingFAQSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="bg-white px-4 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-3xl">
        <div
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <span className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-100">
            <Lightbulb className="h-8 w-8 text-amber-600" />
          </span>
          <FynkHeading className="text-heading-1 sm:text-display-3">{PRICING_SECTIONS.faqTitle}</FynkHeading>
        </div>

        <div
          className={cn(
            "mt-14 transition-all duration-700 delay-100",
            isVisible ? "opacity-100" : "opacity-0",
          )}
        >
          {PRICING_FAQS.map((faq, i) => (
            <FAQRow
              key={faq.question}
              item={faq}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-body-sm text-fynk-muted">
            Still have questions?{" "}
            <Link href="/contact" className="font-semibold text-fynk-ink underline-offset-2 hover:underline">
              Contact us
            </Link>
          </p>
          <FynkInlineAvatarCluster seeds={["AM", "JK", "LS"]} size="sm" />
        </div>
      </div>
    </section>
  );
}

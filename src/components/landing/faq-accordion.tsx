"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { trackFeature } from "@/lib/analytics";

export function FAQAccordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="mt-6 space-y-2 sm:mt-10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.question}
            className={cn(
              "rounded-2xl border transition-all duration-300",
              isOpen
                ? "border-teal/20 bg-teal/[0.04]"
                : "border-charcoal/10 bg-white hover:border-teal/15",
            )}
          >
            <button
              type="button"
              className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4"
              onClick={() => {
                setOpenIndex(isOpen ? null : i);
                if (!isOpen)
                  trackFeature("faq", "question_opened", {
                    question: item.question,
                    index: i,
                  });
              }}
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "text-sm font-medium transition-colors sm:text-base",
                  isOpen ? "text-teal" : "text-charcoal",
                )}
              >
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 transition-all duration-300",
                  isOpen ? "rotate-180 text-teal" : "text-charcoal/40",
                )}
              />
            </button>
            {isOpen && (
              <div className="border-t border-charcoal/10 px-4 pb-3.5 pt-2.5 sm:px-5 sm:pb-4 sm:pt-3">
                <p className="text-sm leading-relaxed text-charcoal/60 sm:text-base">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

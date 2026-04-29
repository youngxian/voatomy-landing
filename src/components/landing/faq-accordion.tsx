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
    <div className="mt-10 space-y-2">
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
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
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
                  "text-sm font-medium transition-colors",
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
              <div className="border-t border-charcoal/10 px-5 pb-4 pt-3">
                <p className="text-sm leading-relaxed text-charcoal/60">
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

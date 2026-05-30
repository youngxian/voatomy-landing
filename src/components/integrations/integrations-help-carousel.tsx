"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, ChevronRight, Code2, LayoutGrid, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FynkHeading, FynkSubheading } from "@/components/marketing/fynk-primitives";
import { HELP_RESOURCES } from "@/lib/integrations-page-data";

const RESOURCE_ICONS: Record<string, typeof BookOpen> = {
  Guide: BookOpen,
  "Help Center": LifeBuoy,
  Developers: Code2,
  Marketplace: LayoutGrid,
  Embed: ArrowUpRight,
};

export function IntegrationsHelpCarousel({ localizedPath }: { localizedPath: (path: string) => string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref, animationClass } = useScrollAnimation();

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
  };

  return (
    <section className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-container">
        <div
          ref={ref}
          className={cn("mb-12 max-w-2xl transition-all duration-700", animationClass)}
        >
          <FynkHeading>Need help getting started?</FynkHeading>
          <FynkSubheading className="mt-4">
            Access free courses to master Voatomy in no time, browse our docs, get quick answers from
            the Help Center, and more.
          </FynkSubheading>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            {HELP_RESOURCES.map((item) => {
              const Icon = RESOURCE_ICONS[item.tag] ?? BookOpen;
              return (
                <Link
                  key={item.title}
                  href={item.href.startsWith("#") ? item.href : localizedPath(item.href)}
                  className="group relative flex h-[240px] w-[300px] shrink-0 snap-start flex-col justify-between rounded-3xl border-2 border-fynk-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-fynk-orange/30 hover:shadow-xl sm:h-[260px] sm:w-[320px] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className={cn("inline-flex rounded-full px-3 py-1.5 text-xs font-bold", item.tagBg)}>
                      {item.tag}
                    </span>
                    <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", item.tagBg)}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="pr-12 font-heading text-heading-4 leading-snug text-fynk-ink sm:text-heading-3">{item.title}</h3>
                  <span className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-fynk-ink text-white shadow-lg transition-transform group-hover:scale-110">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-fynk-border bg-white shadow-lg transition-all hover:border-fynk-orange/40 hover:shadow-xl sm:flex"
            aria-label="Scroll resources"
          >
            <ChevronRight className="h-6 w-6 text-fynk-ink" />
          </button>
        </div>
      </div>
    </section>
  );
}

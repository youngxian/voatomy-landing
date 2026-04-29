"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { DOCS_DATA, SIDEBAR_NAV } from "@/lib/docs-content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  FileText,
  FolderOpen,
  Search,
  Menu,
  X,
} from "lucide-react";

const BRAND_GREEN = "#12FF80";

function getAllPages() {
  const pages: { category: string; slug: string; label: string }[] = [];
  for (const group of SIDEBAR_NAV) {
    for (const item of group.items) {
      pages.push({ category: group.category, slug: item.slug, label: item.label });
    }
  }
  return pages;
}

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);
}

export default function DocsPage({ category, slug }: { category: string; slug: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useScrollAnimation();

  const doc = DOCS_DATA[category]?.[slug];
  const allPages = getAllPages();
  const currentIndex = allPages.findIndex((p) => p.category === category && p.slug === slug);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  if (!doc) {
    return (
      <Section variant="white" className="py-32 text-center">
        <h1 className="text-heading-1 text-theme mb-4">Page Not Found</h1>
        <p className="text-body-lg text-theme-s mb-8">This documentation page doesn&apos;t exist.</p>
        <Link href="/docs">
          <Button variant="secondary"><ArrowLeft className="mr-2 h-4 w-4" />Back to Docs</Button>
        </Link>
      </Section>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <Section variant="white" container={false} className="relative pt-24 pb-0 sm:pt-28">
        <div className="relative mx-auto w-full max-w-[1280px] px-4">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden flex items-center gap-1.5 text-sm text-theme-s hover:text-theme transition-colors">
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              {sidebarOpen ? "Close" : "Menu"}
            </button>
            <nav className="flex items-center gap-1.5 text-sm text-theme-m">
              <Link href="/docs" className="hover:text-theme transition-colors">Docs</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="capitalize">{category.replace("-", " ")}</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-theme font-medium">{doc.title}</span>
            </nav>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className={cn(
              "w-64 flex-shrink-0 border-r border-theme pr-6 pb-16",
              "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 max-lg:w-72 max-lg:bg-theme max-lg:pt-24 max-lg:pl-4 max-lg:shadow-xl max-lg:transition-transform max-lg:duration-300",
              sidebarOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
            )}>
              <div className="mb-6">
                <div className="flex items-center gap-2 rounded-lg border border-theme bg-theme-card px-3 h-9">
                  <Search className="h-3.5 w-3.5 text-theme-m" />
                  <input type="text" placeholder="Search docs..." className="flex-1 bg-transparent text-xs text-theme placeholder:text-theme-m focus:outline-none" />
                </div>
              </div>
              <nav className="space-y-6">
                {SIDEBAR_NAV.map((group) => (
                  <div key={group.category}>
                    <h3 className="flex items-center gap-1.5 text-xs font-semibold text-theme-m uppercase tracking-wider mb-2">
                      <FolderOpen className="h-3 w-3" />{group.label}
                    </h3>
                    <ul className="space-y-0.5">
                      {group.items.map((item) => {
                        const isActive = group.category === category && item.slug === slug;
                        return (
                          <li key={item.slug}>
                            <Link
                              href={`/docs/${group.category}/${item.slug}`}
                              onClick={() => setSidebarOpen(false)}
                              className={cn(
                                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                                isActive ? "bg-brand/10 text-brand font-medium" : "text-theme-s hover:text-theme hover:bg-theme-subtle",
                              )}
                            >
                              <FileText className="h-3 w-3 flex-shrink-0" />
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 pb-20">
              <div className="max-w-3xl">
                <Chip dotColor={BRAND_GREEN} className="mb-4">
                  <BookOpen className="h-3 w-3 mr-1" />Documentation
                </Chip>
                <h1 className="text-display-2 text-theme mb-4">{doc.title}</h1>
                <p className="text-body-lg text-theme-s mb-10">{doc.description}</p>

                <article>
                  {doc.content.map((paragraph, i) => (
                    <p key={i} className="animate-on-scroll text-body-base text-theme-s leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}
                </article>

                {/* Prev / Next */}
                <div className="mt-12 pt-8 border-t border-theme animate-on-scroll">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {prevPage ? (
                      <Link href={`/docs/${prevPage.category}/${prevPage.slug}`} className="group">
                        <Card variant="light" className="h-full hover:border-theme-h transition-all">
                          <span className="text-xs text-theme-m mb-1 block">Previous</span>
                          <span className="text-sm font-semibold text-theme group-hover:text-brand transition-colors flex items-center gap-1">
                            <ArrowLeft className="h-3.5 w-3.5 flex-shrink-0" />{prevPage.label}
                          </span>
                        </Card>
                      </Link>
                    ) : <div />}
                    {nextPage && (
                      <Link href={`/docs/${nextPage.category}/${nextPage.slug}`} className="group">
                        <Card variant="light" className="h-full hover:border-theme-h transition-all text-right">
                          <span className="text-xs text-theme-m mb-1 block">Next</span>
                          <span className="text-sm font-semibold text-theme group-hover:text-brand transition-colors flex items-center justify-end gap-1">
                            {nextPage.label}<ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                          </span>
                        </Card>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </Section>
    </div>
  );
}

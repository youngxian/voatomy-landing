"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Calendar,
  User,
  Send,
  BookOpen,
  TrendingUp,
  Sparkles,
  Search,
  ChevronRight,
} from "lucide-react";

/* ─────────────────── Constants ─────────────────── */

const BRAND_GREEN = "#12FF80";

const CATEGORIES = [
  { label: "All", active: true },
  { label: "Engineering", active: false },
  { label: "Product", active: false },
  { label: "Design", active: false },
  { label: "Data Science", active: false },
  { label: "Company", active: false },
];

const CATEGORY_COLORS: Record<string, string> = {
  Engineering: "#12FF80",
  Product: "#8b5cf6",
  Design: "#f472b6",
  Data: "#38bdf8",
  Culture: "#fbbf24",
  Launch: "#f16e2c",
};

const FEATURED_POST = {
  category: "Engineering",
  title: "The Story Point Delusion: Why Sprint Estimates Are Statistically Meaningless",
  excerpt:
    "We analyzed 14,000 sprints across 340 engineering teams and found that story point estimates have virtually zero predictive power. Here's what actually works -- and why ATLAS was built on a fundamentally different approach to sprint planning.",
  author: "Voatomy Team",
  date: "Jan 15, 2026",
  readTime: "8 min read",
  slug: "/blog/story-point-delusion",
};

const RECENT_POSTS = [
  {
    category: "Engineering",
    title: "How We Built ATLAS: From Prototype to Production",
    excerpt:
      "The architectural decisions, trade-offs, and late-night debugging sessions that shaped our AI sprint planner from concept to shipping product.",
    author: "Ade Ogunleye",
    date: "Jan 8, 2026",
    readTime: "12 min read",
    slug: "/blog/how-we-built-atlas",
  },
  {
    category: "Product",
    title: "Revenue-Weighted Backlogs: A PM's Guide",
    excerpt:
      "How to attach revenue signals to every backlog item so your team always ships what matters most to the business.",
    author: "Maya Chen",
    date: "Dec 28, 2025",
    readTime: "6 min read",
    slug: "/blog/revenue-weighted-backlogs",
  },
  {
    category: "Culture",
    title: "Tech Debt Is Not a Technical Problem -- It's a Business One",
    excerpt:
      "Framing tech debt as an engineering concern loses the argument every time. Here's how to speak the language leadership actually understands.",
    author: "James Okafor",
    date: "Dec 20, 2025",
    readTime: "7 min read",
    slug: "/blog/tech-debt-business-problem",
  },
  {
    category: "Data",
    title: "The Case Against Story Points",
    excerpt:
      "A deep statistical analysis of why Fibonacci-based estimation creates a false sense of precision and what probabilistic forecasting looks like instead.",
    author: "Priya Sharma",
    date: "Dec 12, 2025",
    readTime: "10 min read",
    slug: "/blog/case-against-story-points",
  },
  {
    category: "Product",
    title: "Cross-Team Alignment at Scale",
    excerpt:
      "When you grow past three squads, alignment stops being a Slack message and starts being an engineering problem. Our approach to dependency mapping.",
    author: "Tunde Adebayo",
    date: "Dec 5, 2025",
    readTime: "9 min read",
    slug: "/blog/cross-team-alignment",
  },
  {
    category: "Design",
    title: "Designing Voatomy: Our Design System Journey",
    excerpt:
      "From a messy Figma file to a composable, theme-aware component library. Lessons learned building a design system for a developer-first product.",
    author: "Lina Park",
    date: "Nov 28, 2025",
    readTime: "8 min read",
    slug: "/blog/designing-voatomy",
  },
];

/* ─────────────────── Scroll Animation Hook ─────────────────── */

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);
}

/* ─────────────────── Blog Post Card ─────────────────── */

function BlogPostCard({
  post,
  index,
}: {
  post: (typeof RECENT_POSTS)[number];
  index: number;
}) {
  const catColor = CATEGORY_COLORS[post.category] ?? BRAND_GREEN;

  return (
    <Link href={post.slug} className="group">
      <Card
        variant="light"
        className={cn(
          "animate-on-scroll h-full flex flex-col hover:border-theme-h transition-all duration-300",
          `stagger-${index + 1}`,
        )}
      >
        {/* Category + Read Time */}
        <div className="flex items-center justify-between mb-4">
          <Chip dotColor={catColor} className="text-xs">
            {post.category}
          </Chip>
          <span className="flex items-center gap-1 text-xs text-theme-m">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-heading-3 text-theme mb-2 group-hover:text-brand transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-theme-s leading-relaxed mb-5 flex-1 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Author + Date */}
        <div className="flex items-center justify-between pt-4 border-t border-theme">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-theme-subtle flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-theme-m" />
            </div>
            <span className="text-xs font-medium text-theme-s">{post.author}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-theme-m">
            <Calendar className="h-3 w-3" />
            {post.date}
          </div>
        </div>
      </Card>
    </Link>
  );
}

/* ─────────────────── Main Page Component ─────────────────── */

export default function BlogPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");

  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts =
    activeCategory === "All"
      ? RECENT_POSTS
      : RECENT_POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="relative overflow-hidden">
      {/* ═══════════════ 1. HERO ═══════════════ */}
      <Section
        variant="white"
        container={false}
        className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-[120px]"
            style={{
              background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 bg-dot-grid bg-[length:24px_24px] opacity-40" />
        </div>

        <div className="relative mx-auto w-full max-w-container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className={cn(
                "transition-all duration-700",
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              <Chip dotColor={BRAND_GREEN} className="mb-5 mx-auto">
                <BookOpen className="h-3 w-3 mr-1" />
                Voatomy Blog
              </Chip>
            </div>

            <h1
              className={cn(
                "text-display-2 lg:text-display-1 text-theme mb-5 transition-all duration-700 delay-100",
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              Engineering Insights{" "}
              <span className="text-brand">&</span>{" "}
              Product Updates
            </h1>

            <p
              className={cn(
                "text-body-lg text-theme-s max-w-xl mx-auto mb-8 transition-all duration-700 delay-200",
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              Deep dives into how we build Voatomy, the engineering decisions behind
              our products, and lessons from the frontier of AI-driven product delivery.
            </p>

            {/* Search bar mock */}
            <div
              className={cn(
                "flex items-center gap-2 max-w-md mx-auto rounded-xl border border-theme bg-theme-card px-4 h-12 transition-all duration-700 delay-300",
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              <Search className="h-4 w-4 text-theme-m flex-shrink-0" />
              <input
                type="text"
                placeholder="Search articles..."
                className="flex-1 bg-transparent text-sm text-theme placeholder:text-theme-m focus:outline-none"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 2. FEATURED POST ═══════════════ */}
      <Section variant="amber" className="py-16 sm:py-20">
        <div className="animate-on-scroll">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-4 w-4 text-brand" />
            <span className="text-sm font-semibold text-brand tracking-wide uppercase">
              Featured Article
            </span>
          </div>

          <Link href={FEATURED_POST.slug} className="group">
            <Card
              variant="light"
              className="p-0 overflow-hidden hover:border-theme-h transition-all duration-300"
            >
              <div className="grid md:grid-cols-2">
                {/* Left: Article preview mockup */}
                <div className="relative min-h-[280px] md:min-h-[320px] overflow-hidden">
                  {/* Gradient background simulating article image */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, #0a0a0a 0%, #121312 40%, ${BRAND_GREEN}15 100%)`,
                    }}
                  />
                  {/* Mock article text lines */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="space-y-2 opacity-30">
                      <div className="h-2 w-3/4 rounded-full bg-theme-subtle" />
                      <div className="h-2 w-full rounded-full bg-theme-subtle" />
                      <div className="h-2 w-5/6 rounded-full bg-theme-subtle" />
                      <div className="h-2 w-2/3 rounded-full bg-theme-subtle" />
                      <div className="h-2 w-full rounded-full bg-theme-subtle" />
                      <div className="h-2 w-4/5 rounded-full bg-theme-subtle" />
                    </div>
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, var(--bg-card) 0%, transparent 60%)",
                      }}
                    />
                  </div>
                  {/* Floating stat badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 rounded-lg bg-theme-card/90 border border-theme px-3 py-2 backdrop-blur-sm">
                    <Sparkles className="h-3.5 w-3.5 text-brand" />
                    <span className="text-xs font-semibold text-theme">
                      14,000 sprints analyzed
                    </span>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Chip dotColor={CATEGORY_COLORS.Engineering} className="text-xs">
                      Engineering
                    </Chip>
                    <span className="text-xs text-theme-m flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {FEATURED_POST.readTime}
                    </span>
                  </div>

                  <h2 className="text-heading-2 lg:text-heading-1 text-theme mb-4 group-hover:text-brand transition-colors duration-200">
                    {FEATURED_POST.title}
                  </h2>

                  <p className="text-body-base text-theme-s leading-relaxed mb-6">
                    {FEATURED_POST.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-brand">VT</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-theme block">
                          {FEATURED_POST.author}
                        </span>
                        <span className="text-xs text-theme-m">
                          {FEATURED_POST.date}
                        </span>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 text-sm font-medium text-brand group-hover:gap-2 transition-all duration-200">
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </Section>

      {/* ═══════════════ 3. CATEGORIES ═══════════════ */}
      <Section variant="white" className="py-8 sm:py-10">
        <div className="animate-on-scroll">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={cn(
                  "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                  activeCategory === cat.label
                    ? "bg-brand text-safe-black"
                    : "bg-theme-subtle text-theme-s hover:bg-theme-card hover:text-theme",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════ 4. RECENT POSTS GRID ═══════════════ */}
      <Section variant="white" className="pt-4 pb-20 sm:pb-28">
        <div className="flex items-center justify-between mb-8 animate-on-scroll">
          <h2 className="text-heading-2 text-theme">
            {activeCategory === "All" ? "Recent Articles" : activeCategory}
          </h2>
          <span className="text-sm text-theme-m">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPosts.map((post, i) => (
              <BlogPostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-on-scroll">
            <div className="h-12 w-12 rounded-xl bg-theme-subtle flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-5 w-5 text-theme-m" />
            </div>
            <p className="text-body-base text-theme-s mb-1">
              No articles in this category yet.
            </p>
            <p className="text-sm text-theme-m">
              Check back soon or browse all articles.
            </p>
          </div>
        )}

        {filteredPosts.length > 0 && (
          <div className="flex justify-center mt-10 animate-on-scroll">
            <Button variant="secondary" size="md">
              Load More Articles
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </Section>

      {/* ═══════════════ 5. NEWSLETTER CTA ═══════════════ */}
      <Section
        variant="amber"
        container={false}
        className="relative py-20 sm:py-28 overflow-hidden"
      >
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-12 blur-[100px]"
            style={{
              background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <div className="animate-on-scroll">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10">
              <Send className="h-7 w-7 text-brand" />
            </div>

            <h2 className="text-heading-1 text-theme mb-4">
              Subscribe to the Voatomy Engineering Blog
            </h2>

            <p className="text-body-lg text-theme-s mb-8 max-w-lg mx-auto">
              Get the latest engineering insights, product updates, and deep dives
              delivered to your inbox. No spam, unsubscribe anytime.
            </p>
          </div>

          <div className="animate-on-scroll stagger-2">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 h-12 rounded-xl border border-theme bg-theme-card px-4 text-sm text-theme placeholder:text-theme-m focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all duration-200"
              />
              <Button size="lg" className="flex-shrink-0">
                Subscribe
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-theme-m mt-4">
              Join 2,400+ engineering leaders already subscribed.
            </p>
          </div>

          {/* Recent editions preview */}
          <div className="mt-12 animate-on-scroll stagger-3">
            <p className="text-xs font-semibold text-theme-m uppercase tracking-wider mb-4">
              Recent editions
            </p>
            <div className="flex flex-col gap-2 max-w-sm mx-auto">
              {[
                { title: "Issue #12: The Story Point Delusion", date: "Jan 15" },
                { title: "Issue #11: Building ATLAS in Public", date: "Jan 8" },
                { title: "Issue #10: Revenue Signals in Backlogs", date: "Dec 28" },
              ].map((issue) => (
                <div
                  key={issue.title}
                  className="flex items-center justify-between rounded-lg border border-theme bg-theme-card px-4 py-2.5 text-left"
                >
                  <span className="text-sm text-theme-s">{issue.title}</span>
                  <span className="text-xs text-theme-m flex-shrink-0 ml-3">
                    {issue.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

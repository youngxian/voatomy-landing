"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  User,
  Share2,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const BRAND_GREEN = "#12FF80";

const CATEGORY_COLORS: Record<string, string> = {
  Engineering: "#12FF80",
  Product: "#8b5cf6",
  Design: "#f472b6",
  Data: "#38bdf8",
  Culture: "#fbbf24",
};

const ALL_POSTS = [
  { slug: "from-spec-to-sprint-example", title: "From Spec to Sprint: An End-to-End Example", category: "Engineering", date: "Apr 29, 2026", readTime: "5 min read" },
  { slug: "story-point-delusion", title: "The Story Point Delusion", category: "Engineering", date: "Jan 15, 2026", readTime: "8 min read" },
  { slug: "how-we-built-atlas", title: "How We Built ATLAS: From Prototype to Production", category: "Engineering", date: "Jan 8, 2026", readTime: "12 min read" },
  { slug: "revenue-weighted-backlogs", title: "Revenue-Weighted Backlogs: A PM's Guide", category: "Product", date: "Dec 28, 2025", readTime: "6 min read" },
  { slug: "tech-debt-business-problem", title: "Tech Debt Is Not a Technical Problem", category: "Culture", date: "Dec 20, 2025", readTime: "7 min read" },
  { slug: "case-against-story-points", title: "The Case Against Story Points", category: "Data", date: "Dec 12, 2025", readTime: "10 min read" },
  { slug: "cross-team-alignment", title: "Cross-Team Alignment at Scale", category: "Product", date: "Dec 5, 2025", readTime: "9 min read" },
  { slug: "designing-voatomy", title: "Designing Voatomy: Our Design System Journey", category: "Design", date: "Nov 28, 2025", readTime: "8 min read" },
];

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

export default function BlogPostPage({ slug }: { slug: string }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const post = BLOG_POSTS[slug];
  if (!post) {
    return (
      <Section variant="white" className="py-32 text-center">
        <h1 className="text-heading-1 text-theme mb-4">Post Not Found</h1>
        <p className="text-body-lg text-theme-s mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/blog">
          <Button variant="secondary"><ArrowLeft className="mr-2 h-4 w-4" />Back to Blog</Button>
        </Link>
      </Section>
    );
  }

  const currentIndex = ALL_POSTS.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? ALL_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < ALL_POSTS.length - 1 ? ALL_POSTS[currentIndex + 1] : null;
  const relatedPosts = ALL_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  if (relatedPosts.length < 3) {
    const more = ALL_POSTS.filter((p) => p.slug !== slug && p.category !== post.category).slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...more);
  }

  const catColor = CATEGORY_COLORS[post.category] ?? BRAND_GREEN;

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <Section variant="white" container={false} className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-[120px]" style={{ background: `radial-gradient(ellipse, ${catColor}, transparent 70%)` }} />
        </div>
        <div className="relative mx-auto w-full max-w-container px-4">
          <div className="max-w-3xl mx-auto">
            <div className={cn("transition-all duration-700", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-theme-s hover:text-theme mb-6 transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Blog
              </Link>
            </div>
            <div className={cn("flex items-center gap-3 mb-4 transition-all duration-700 delay-100", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <Chip dotColor={catColor} className="text-xs">{post.category}</Chip>
              <span className="flex items-center gap-1 text-xs text-theme-m"><Clock className="h-3 w-3" />{post.readTime}</span>
            </div>
            <h1 className={cn("text-display-2 lg:text-display-1 text-theme mb-5 transition-all duration-700 delay-200", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              {post.title}
            </h1>
            <p className={cn("text-body-lg text-theme-s mb-8 transition-all duration-700 delay-300", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              {post.description}
            </p>
            <div className={cn("flex items-center justify-between pt-6 border-t border-theme transition-all duration-700 delay-[400ms]", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-brand" />
                </div>
                <div>
                  <span className="text-sm font-medium text-theme block">{post.author}</span>
                  <span className="flex items-center gap-1 text-xs text-theme-m"><Calendar className="h-3 w-3" />{post.date}</span>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-sm text-theme-s hover:text-theme transition-colors">
                <Share2 className="h-4 w-4" />Share
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Article Body */}
      <Section variant="white" className="pt-4 pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto">
          <article className="prose-voatomy">
            {post.body.map((paragraph, i) => (
              <p key={i} className="animate-on-scroll text-body-base text-theme-s leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </Section>

      {/* Prev / Next */}
      <Section variant="amber" className="py-12">
        <div className="max-w-3xl mx-auto animate-on-scroll">
          <div className="grid sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group">
                <Card variant="light" className="h-full hover:border-theme-h transition-all">
                  <span className="text-xs text-theme-m mb-2 block">Previous</span>
                  <span className="text-sm font-semibold text-theme group-hover:text-brand transition-colors flex items-center gap-1">
                    <ArrowLeft className="h-3.5 w-3.5 flex-shrink-0" />{prevPost.title}
                  </span>
                </Card>
              </Link>
            ) : <div />}
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="group">
                <Card variant="light" className="h-full hover:border-theme-h transition-all text-right">
                  <span className="text-xs text-theme-m mb-2 block">Next</span>
                  <span className="text-sm font-semibold text-theme group-hover:text-brand transition-colors flex items-center justify-end gap-1">
                    {nextPost.title}<ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                  </span>
                </Card>
              </Link>
            )}
          </div>
        </div>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section variant="white" className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-8 animate-on-scroll">
              <BookOpen className="h-4 w-4 text-brand" />
              <h2 className="text-heading-2 text-theme">Related Articles</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {relatedPosts.map((rp, i) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group">
                  <Card variant="light" className={cn("animate-on-scroll h-full hover:border-theme-h transition-all", `stagger-${i + 1}`)}>
                    <div className="flex items-center justify-between mb-3">
                      <Chip dotColor={CATEGORY_COLORS[rp.category] ?? BRAND_GREEN} className="text-xs">{rp.category}</Chip>
                      <span className="text-xs text-theme-m flex items-center gap-1"><Clock className="h-3 w-3" />{rp.readTime}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-theme group-hover:text-brand transition-colors line-clamp-2">{rp.title}</h3>
                    <span className="flex items-center gap-1 text-xs text-brand mt-3 group-hover:gap-2 transition-all">
                      Read <ChevronRight className="h-3 w-3" />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}

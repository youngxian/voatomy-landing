import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";
import PageContent from "./page-content";

export function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  if (!post) {
    return { title: "Post Not Found — Voatomy Blog" };
  }

  const url = `${SITE_CONFIG.url}/blog/${slug}`;
  return {
    title: `${post.title} — Voatomy Blog`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: SITE_CONFIG.name,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PageContent slug={slug} />;
}

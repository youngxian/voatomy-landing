import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import { SITE_CONFIG } from "@/lib/constants";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "@/components/json-ld";
import "./globals.css";

const aspekta = localFont({
  src: "../../public/fonts/AspektaVF.woff2",
  variable: "--font-aspekta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: { canonical: SITE_CONFIG.url },
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: SITE_CONFIG.name }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={aspekta.variable} suppressHydrationWarning>
      <body className="font-sans">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        <ThemeProvider>
          <Suspense fallback={null}>
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

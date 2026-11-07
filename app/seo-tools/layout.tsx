import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Website SEO Checker & SEO Tools",
  description: "Review on-page SEO, create search-friendly meta tags, generate XML sitemaps and inspect robots.txt with practical free website SEO tools.",
  alternates: { canonical: "/seo-tools" },
  openGraph: {
    title: "Free Website SEO Checker & SEO Tools | QR Studio",
    description: "Practical tools to review on-page SEO, create metadata and prepare your website for search engines.",
    url: "/seo-tools",
    type: "website",
    images: [{ url: "/opengraph-image.svg", width: 1200, height: 630, alt: "QR Studio free SEO tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website SEO Checker & SEO Tools | QR Studio",
    description: "Review on-page SEO, create meta tags and generate XML sitemaps.",
    images: ["/opengraph-image.svg"],
  },
};

export default function SeoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

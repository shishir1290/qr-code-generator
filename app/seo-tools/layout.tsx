import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Radar - Complete Website Audit & Ranking Tools",
  description: "Audit your website on-page SEO layout, generate custom meta tags, build XML sitemaps, verify robots.txt, and rank your website on Google search page one.",
  alternates: {
    canonical: 'https://qr-generator.vercel.app/seo-tools',
  },
  openGraph: {
    title: "SEO Radar - Complete Website Audit & Ranking Tools",
    description: "Audit your website on-page SEO layout, generate custom meta tags, build XML sitemaps, verify robots.txt, and rank your website on Google search page one.",
    url: 'https://qr-generator.vercel.app/seo-tools',
    type: 'website',
    images: [
      {
        url: 'https://qr-generator.vercel.app/seo-og-image.png',
        width: 1200,
        height: 630,
        alt: 'SEO Radar Tools',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Radar - Complete Website Audit & Ranking Tools',
    description: 'Audit your website on-page SEO layout, generate custom meta tags, build XML sitemaps, verify robots.txt, and rank your website on Google search page one.',
    images: ['https://qr-generator.vercel.app/seo-og-image.png'],
  }
};

export default function SeoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

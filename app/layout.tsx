import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free Tools - QR Code Generator & SEO Optimizer",
  description: "Generate free QR codes and optimize your website's Google search rankings using our advanced, 100% free SEO tools suite. No signup needed.",
  metadataBase: new URL('https://qr-generator.vercel.app'),
  alternates: {
    canonical: 'https://qr-generator.vercel.app',
  },
  openGraph: {
    title: "Free Tools - QR Code Generator & SEO Optimizer",
    description: "Generate free QR codes and optimize your website's Google search rankings using our advanced, 100% free SEO tools suite. No signup needed.",
    url: 'https://qr-generator.vercel.app',
    type: 'website',
    siteName: 'Free Tools Suite',
    images: [
      {
        url: 'https://qr-generator.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free QR Code Generator & SEO Optimizer',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tools - QR Code Generator & SEO Optimizer',
    description: 'Generate free QR codes and optimize your website\'s Google search rankings using our advanced, 100% free SEO tools suite. No signup needed.',
    images: ['https://qr-generator.vercel.app/og-image.png'],
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}


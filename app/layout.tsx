import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qr-generator.vercel.app";
const siteName = "QR Studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Free QR Code Generator Online | QR Studio",
    template: "%s | QR Studio",
  },
  description:
    "Create and customize free QR codes for links, Wi-Fi, text, maps, WhatsApp, apps, audio and PDFs. Download high-quality QR codes instantly. No signup required.",
  applicationName: siteName,
  keywords: [
    "free QR code generator", "QR code generator online", "custom QR code",
    "WiFi QR code generator", "URL QR code", "WhatsApp QR code",
    "PDF QR code", "text QR code", "app store QR code", "QR code maker",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Free QR Code Generator Online | QR Studio",
    description:
      "Generate beautiful, customizable QR codes for websites, Wi-Fi, text, maps, WhatsApp, apps and more. Free, fast and easy to use.",
    images: [{ url: "/opengraph-image.svg", width: 1200, height: 630, alt: "QR Studio — Free QR Code Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator Online | QR Studio",
    description: "Create free custom QR codes for links, Wi-Fi, text, maps, WhatsApp, apps and more.",
    images: ["/opengraph-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"dark";document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "QR Studio",
              url: siteUrl,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript",
              description: "A free online QR code generator for URLs, Wi-Fi, text, maps, WhatsApp, apps, audio and PDFs.",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              featureList: ["URL QR codes", "Wi-Fi QR codes", "Text QR codes", "Map QR codes", "WhatsApp QR codes", "App store QR codes", "Audio QR codes", "PDF QR codes"],
            }),
          }}
        />
      </head>
      <body style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

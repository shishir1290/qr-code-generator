import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free QR Code Generator - URL, WiFi, App Store, Maps & More",
  description: "Generate free QR codes for URLs, App Store/Play Store, WiFi, Maps, Text, Audio, PDF, and WhatsApp. All QR codes work forever with no database.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{children}</body>
    </html>
  );
}

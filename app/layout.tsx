import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free Tools - QR Code Generator & SEO Optimizer",
  description: "Generate free QR codes and optimize your website's Google search rankings using our advanced, 100% free SEO tools suite. No signup needed.",
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


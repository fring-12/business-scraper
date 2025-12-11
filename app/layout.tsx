import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Business Scraper - Home Services Lead Generation",
  description:
    "Find legitimate home service businesses in the US with phone numbers and contact details for your AI voice assistant sales campaigns.",
  keywords: [
    "business scraper",
    "lead generation",
    "home services",
    "plumber",
    "electrician",
    "hvac",
    "cold calling",
    "ai voice assistant",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}


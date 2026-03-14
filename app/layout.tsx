import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import RouteHistoryTracker from "@/app/components/RouteHistoryTracker";
import { GoogleAnalytics } from '@next/third-parties/google';
import { withBasePath } from "@/app/lib/site";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.SITE_URL ?? "https://yourdomain.com";
const ogUrl = new URL(withBasePath("/opengraph-image"), siteUrl).toString();

export const metadata: Metadata = {
  title: "0xGeN02 — terminal",
  description: "BTC Maxi · Machine Unlearning · I use Arch BTW",
  icons: { icon: "/favicon.ico" },

  openGraph: {
    title: "0xGeN02 — terminal",
    description: "BTC Maxi · Machine Unlearning · I use Arch BTW",
    url: siteUrl,
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: "0xGeN02 terminal banner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "0xGeN02 — terminal",
    description: "BTC Maxi · Machine Unlearning · I use Arch BTW",
    images: [ogUrl],
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono">
        <RouteHistoryTracker />
        {children}
      </body>
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  );
}

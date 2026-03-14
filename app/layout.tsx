import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import RouteHistoryTracker from "@/app/components/RouteHistoryTracker";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "0xGeN02 — terminal",
  description: "BTC Maxi · ML · I use Arch BTW",
  icons: { icon: "/favicon.ico" },
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

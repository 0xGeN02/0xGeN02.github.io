import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "0xGeN02 — terminal",
  description: "Web3 dev · Arch Linux · Hyprland · CertyChain",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono">{children}</body>
    </html>
  );
}

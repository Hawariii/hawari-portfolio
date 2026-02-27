import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hawari — Vibe Coder",
  description: "Fullstack Developer & Minecraft Addon Maker. Building digital stuff from Jakarta.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}>
      <body className="bg-bg text-white antialiased grain">
        {children}
      </body>
    </html>
  );
}
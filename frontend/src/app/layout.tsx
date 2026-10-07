import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GeoRisk AI — Decision Intelligence Platform",
  description:
    "Geopolitical energy supply chain decision intelligence platform. Transform geopolitical events into explainable risk scores, impact forecasts, mitigation recommendations, and scenario simulations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="georisk-cursor min-h-full flex flex-col bg-[#0D1117] text-[#F2F4F7]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

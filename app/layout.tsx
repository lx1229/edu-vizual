/*
 * eduVizual - Interactive Educational Visualization Platform
 * Copyright (C) 2024 eduVizual
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU GENERAL PUBLIC LICENSE as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU GENERAL PUBLIC LICENSE
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/components/layout/Header";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "eduVizual - 交互式教育可视化平台",
    template: "%s | eduVizual",
  },
  description: "通过 HTML 可视化展示数学、物理、化学理论，让抽象概念触手可及。提供交互式探索、实时计算和 3D 模型可视化。",
  keywords: ["教育可视化", "数学可视化", "物理可视化", "化学可视化", "交互式学习", "STEM 教育", "HTML5 可视化", "在线学习平台"],
  authors: [{ name: "eduVizual", url: "https://eduvizual.littleyao.site" }],
  creator: "eduVizual",
  publisher: "eduVizual",
  metadataBase: new URL("https://eduvizual.littleyao.site"),
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
      "en": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "eduVizual",
    title: "eduVizual - 交互式教育可视化平台",
    description: "通过 HTML 可视化展示数学、物理、化学理论，让抽象概念触手可及。",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "eduVizual - 交互式教育可视化平台",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eduVizual - 交互式教育可视化平台",
    description: "通过 HTML 可视化展示数学、物理、化学理论，让抽象概念触手可及。",
    images: ["/og-image.svg"],
    creator: "@eduviz",
  },
  verification: {
    google: "your-google-verification-code",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon-192.png",
    apple: "/icon-512.png",
  },
  manifest: "/manifest.json",
  other: {
    "google-site-verification": "your-google-verification-code",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main className="flex-1">{children}</main>
            <StructuredData type="Organization" />
            <StructuredData type="WebSite" />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

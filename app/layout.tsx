import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import Header from "@/components/layout/Header";

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
    default: "eduVisual - 交互式可视化教育平台",
    template: "%s | eduVisual",
  },
  description: "通过 HTML 可视化展示数学、物理、化学理论，让抽象概念触手可及",
  keywords: ["数学可视化", "物理可视化", "化学可视化", "教育", "interactive visualization", "STEM education"],
  authors: [{ name: "eduVisual", url: "https://eduviz.cn" }],
  creator: "eduVisual",
  publisher: "eduVisual",
  metadataBase: new URL("https://eduviz.cn"),
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "eduVisual",
    title: "eduVisual - 交互式可视化教育平台",
    description: "通过 HTML 可视化展示数学、物理、化学理论，让抽象概念触手可及",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "eduVisual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eduVisual - 交互式可视化教育平台",
    description: "通过 HTML 可视化展示数学、物理、化学理论，让抽象概念触手可及",
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
    icon: "/icon.svg",
    shortcut: "/icon-192.png",
    apple: "/icon-512.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

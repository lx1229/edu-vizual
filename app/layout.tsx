import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { ThemeProvider } from "next-themes";
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
    default: "eduVizual - Interactive Visualization Education Platform",
    template: "%s | eduVizual",
  },
  description: "Explore mathematical, physical, and chemical theories through HTML visualizations, making abstract concepts tangible",
  keywords: ["math visualization", "physics visualization", "chemistry visualization", "education", "interactive visualization", "STEM education"],
  authors: [{ name: "eduVizual", url: "https://eduviz.cn" }],
  creator: "eduVizual",
  publisher: "eduVizual",
  metadataBase: new URL("https://eduviz.cn"),
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
      "en": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "eduVizual",
    title: "eduVizual - Interactive Visualization Education Platform",
    description: "Explore mathematical, physical, and chemical theories through HTML visualizations, making abstract concepts tangible",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "eduVizual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eduVizual - Interactive Visualization Education Platform",
    description: "Explore mathematical, physical, and chemical theories through HTML visualizations, making abstract concepts tangible",
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
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

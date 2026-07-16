"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "../ui/ThemeToggle";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";

const navLinks = [
  { href: "/#math", color: "#7209b7" },
  { href: "/#physics", color: "#f77f00" },
  { href: "/#chemistry", color: "#06d6a0" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('common');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md shadow-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow"
            style={{ background: "linear-gradient(135deg, #7209b7 0%, #f77f00 55%, #06d6a0 100%)" }}
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
              <rect x="2" y="12" width="4" height="7" rx="1" fill="white" />
              <rect x="8" y="7" width="4" height="12" rx="1" fill="white" />
              <rect x="14" y="3" width="4" height="16" rx="1" fill="white" />
              <path
                d="M4 10 L10 5 L16 2"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
              />
            </svg>
          </div>
          <span className="text-[17px] font-bold tracking-tight select-none">
            <span className="text-foreground/75">edu</span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #7209b7, #f77f00, #06d6a0)" }}
            >
              Vizual
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-0.5 text-sm">
          {navLinks.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-lg font-medium transition-all duration-150 ${
                  isActive
                    ? "text-foreground bg-foreground/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {t(item.href.split("#")[1])}
                {isActive && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </Link>
            );
          })}

          <div className="w-px h-4 bg-foreground/15 mx-2" />

          <Link
            href="/"
            className="px-4 py-1.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-sm"
            style={{ background: "linear-gradient(135deg, #7209b7, #06d6a0)" }}
          >
            {t("subjects")}
          </Link>

          <div className="w-px h-4 bg-foreground/15 mx-2" />

          <ThemeToggle />
          <LanguageSwitcher />

          <div className="w-px h-4 bg-foreground/15 mx-2" />

          <Link
            href="https://github.com/lx1229/edu-vizual"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
            aria-label="GitHub"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.545 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}

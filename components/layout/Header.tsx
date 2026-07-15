"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/subjects/math", label: "数学", color: "#7209b7" },
  { href: "/subjects/physics", label: "物理", color: "#f77f00" },
  { href: "/subjects/chemistry", label: "化学", color: "#06d6a0" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
                {item.label}
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
            href="/subjects"
            className="px-4 py-1.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-sm"
            style={{ background: "linear-gradient(135deg, #7209b7, #06d6a0)" }}
          >
            全部学科
          </Link>
        </nav>
      </div>
    </header>
  );
}

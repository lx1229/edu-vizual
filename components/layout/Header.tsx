"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          edu-board
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/subjects" className="text-muted-foreground hover:text-foreground transition-colors">
            学科
          </Link>
        </nav>
      </div>
    </header>
  );
}

"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const next = locale === "zh" ? "en" : "zh";
    document.cookie = `locale=${next}; path=/; max-age=31536000`;
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className="px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-600 dark:text-gray-400 disabled:opacity-50"
      aria-label="Switch language"
    >
      {locale === "zh" ? "EN" : "中文"}
    </button>
  );
}

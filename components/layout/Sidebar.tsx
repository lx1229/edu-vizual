"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLessons } from "@/lib/lessons";

interface SidebarProps {
  subjectId: string;
  currentLessonId?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ subjectId, currentLessonId, collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const lessons = getLessons(subjectId).sort((a, b) => a.order - b.order);

  if (collapsed) {
    return (
      <button
        onClick={onToggle}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 w-6 h-12 border-r border-border bg-background rounded-r-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        aria-label="展开课程列表"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    );
  }

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 border-r border-border bg-background overflow-y-auto z-30">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground">课程列表</h2>
          <button
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="收起课程列表"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <div className="space-y-1">
          {lessons.map((lesson) => {
            const isActive = pathname === `/subjects/${subjectId}/${lesson.id}`;
            return (
              <Link
                key={lesson.id}
                href={`/subjects/${subjectId}/${lesson.id}`}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                }`}
              >
                <span className="truncate">{lesson.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

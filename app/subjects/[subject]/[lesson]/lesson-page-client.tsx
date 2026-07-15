"use client";

import { useState, Suspense } from "react";
import { VIZ_COMPONENTS } from "@/lib/viz-registry";
import { LEARNING_STAGES } from "@/lib/lessons";
import Sidebar from "@/components/layout/Sidebar";
import MDXContent from "@/components/content/MDXContent";

interface LessonPageClientProps {
  lesson: any;
  subjectId: string;
  content: string;
}

const SUBJECT_COLORS: Record<string, string> = {
  math: "#7209b7",
  physics: "#f77f00",
  chemistry: "#06d6a0",
};
const SUBJECT_NAMES: Record<string, string> = {
  math: "数学",
  physics: "物理",
  chemistry: "化学",
};
const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: "入门",
  intermediate: "中级",
  advanced: "进阶",
};

export default function LessonPageClient({ lesson, subjectId, content }: LessonPageClientProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const hasViz = lesson.visualizations && lesson.visualizations.length > 0;
  const subjectColor = SUBJECT_COLORS[subjectId] ?? "#4361ee";
  const subjectName = SUBJECT_NAMES[subjectId] ?? subjectId;
  const stage = LEARNING_STAGES.find((s) => s.id === lesson.learningStage);

  return (
    <div className="flex flex-col flex-1">
      <Sidebar
        subjectId={subjectId}
        currentLessonId={lesson.id}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
      />

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-0" : "ml-64"}`}>
        {/* Breadcrumb */}
        <div className="px-8 py-3 border-b" style={{ borderColor: "#e5e7eb" }}>
          <div className="flex items-center gap-1.5 text-sm" style={{ color: "#9ca3af" }}>
            <a href="/subjects" className="hover:text-gray-600 transition-colors">学科</a>
            <span className="select-none">/</span>
            <a href={`/subjects/${subjectId}`} className="hover:text-gray-600 transition-colors">
              {subjectName}
            </a>
            <span className="select-none">/</span>
            <span style={{ color: "#374151" }}>{lesson.title}</span>
          </div>
        </div>

        {/* Page body — single reading column */}
        <div className="max-w-4xl mx-auto w-full px-8 py-10">

          {/* Title section */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `${subjectColor}18`, color: subjectColor }}
              >
                {subjectName}
              </span>
              {stage && (
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${stage.color}18`, color: stage.color }}
                >
                  {stage.label}
                </span>
              )}
              {lesson.difficulty && (
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: "#f3f4f6", color: "#6b7280" }}
                >
                  {DIFFICULTY_LABELS[lesson.difficulty as string] ?? lesson.difficulty}
                </span>
              )}
            </div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: "#111827", lineHeight: 1.3 }}
            >
              {lesson.title}
            </h1>
          </header>

          {/* Visualization panel */}
          {hasViz && (
            <section className="mb-10">
              {lesson.visualizations.map((vizId: string) => {
                const Comp = VIZ_COMPONENTS[vizId];
                if (!Comp) {
                  return (
                    <div
                      key={vizId}
                      className="rounded-2xl border p-8 text-center text-sm"
                      style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}
                    >
                      可视化组件「{vizId}」暂未注册
                    </div>
                  );
                }
                return (
                  <div
                    key={vizId}
                    className="rounded-2xl border p-6"
                    style={{ borderColor: "#e5e7eb", background: "#fafafa" }}
                  >
                    <Suspense
                      fallback={
                        <div
                          className="flex items-center justify-center py-20 text-sm"
                          style={{ color: "#9ca3af" }}
                        >
                          加载中…
                        </div>
                      }
                    >
                      <Comp />
                    </Suspense>
                  </div>
                );
              })}
            </section>
          )}

          {/* Divider between viz and text */}
          {hasViz && (
            <div style={{ height: "1px", background: "#f0f0f0", marginBottom: "2.5rem" }} />
          )}

          {/* MDX article body — skip the first H1 since the page header already shows it */}
          <article>
            <MDXContent content={content} skipFirstH1 />
          </article>
        </div>
      </div>
    </div>
  );
}

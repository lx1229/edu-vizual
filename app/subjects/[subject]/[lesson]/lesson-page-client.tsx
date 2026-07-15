"use client";

import { useState } from "react";
import { VIZ_COMPONENTS } from "@/lib/viz-registry";
import { LEARNING_STAGES, getLessons } from "@/lib/lessons";
import Sidebar from "@/components/layout/Sidebar";
import MDXContent from "@/components/content/MDXContent";

interface LessonPageClientProps {
  lesson: any;
  subjectId: string;
  content: string;
}

export default function LessonPageClient({ lesson, subjectId, content }: LessonPageClientProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeViz, setActiveViz] = useState<string | null>(null);

  // Get all lessons at the same learning stage
  const getLessonsAtStage = (stage: string) => {
    return getLessons(subjectId).filter((l) => l.learningStage === stage);
  };

  const LessonContent = () => (
    <MDXContent content={content} visualizations={lesson.visualizations?.map((id) => ({ id }))} />
  );

  const renderViz = (id: string) => {
    const Component = VIZ_COMPONENTS[id];
    if (!Component) return null;
    return <Component key={id} />;
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Sidebar */}
      <Sidebar
        subjectId={subjectId}
        currentLessonId={lesson.id}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
      />

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-0" : "ml-64"}`}>
        {/* Breadcrumb */}
        <div className="w-full px-6 py-4 border-b border-border">
          <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
            <span className="text-foreground">{lesson.title}</span>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="max-w-6xl mx-auto w-full px-6 py-12">
          <div className={`grid grid-cols-1 gap-8 ${lesson.visualizations && lesson.visualizations.length > 0 ? "lg:grid-cols-3" : "lg:grid-cols-1"}`}>
            {/* Main Content */}
            <div className={lesson.visualizations && lesson.visualizations.length > 0 ? "lg:col-span-2" : "w-full"}>
              <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: `${(lesson as any).color || "#7209b7"}15`,
                    color: (lesson as any).color || "#7209b7",
                  }}
                >
                  {(lesson as any).subjectName || "数学"}
                </span>
                {lesson.visualizations && lesson.visualizations.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    交互组件：{lesson.visualizations.join(", ")}
                  </span>
                )}
              </div>

              <LessonContent />
            </div>

            {/* Visualization Panel */}
            {lesson.visualizations && lesson.visualizations.length > 0 && (
              <div className="lg:col-span-1">
                <div className="rounded-xl border border-border bg-card p-6 sticky top-20">
                  <h3 className="font-semibold mb-4">可视化面板</h3>
                  <div className="space-y-4">
                    {lesson.visualizations.map((viz) => (
                      <div key={viz}>
                        <button
                          onClick={() => setActiveViz(activeViz === viz ? null : viz)}
                          className={`w-full text-sm px-3 py-2 rounded-lg text-left transition-colors ${
                            activeViz === viz
                              ? "bg-accent/10 text-accent font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                          }`}
                        >
                          {viz}
                        </button>
                        {activeViz === viz && (
                          <div className="mt-3 rounded-lg border border-border bg-muted/30 min-h-[200px] flex items-center justify-center">
                            {renderViz(viz)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Learning Stage Navigation */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-border bg-card p-6 sticky top-20">
                <h3 className="font-semibold mb-4">学习阶段</h3>
                <div className="space-y-4">
                  {LEARNING_STAGES.map((stage) => {
                    const lessonsAtStage = getLessonsAtStage(stage.id);
                    if (lessonsAtStage.length === 0) return null;
                    return (
                      <div key={stage.id}>
                        <div
                          className="text-xs font-medium px-2 py-1 rounded"
                          style={{
                            backgroundColor: `${stage.color}15`,
                            color: stage.color,
                          }}
                        >
                          {stage.label}
                        </div>
                        <div className="mt-2 space-y-1">
                          {lessonsAtStage.map((l) => (
                            <a
                              key={l.id}
                              href={`/subjects/${subjectId}/${l.id}`}
                              className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                                l.id === lesson.id
                                  ? "bg-accent/10 text-accent font-medium"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                              }`}
                            >
                              {l.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubject } from "@/lib/subjects";
import { getLessons } from "@/lib/lessons";

interface SubjectPageProps {
  params: Promise<{ subject: string }>;
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subject: subjectId } = await params;
  const subject = getSubject(subjectId);

  if (!subject) {
    notFound();
  }

  const lessons = getLessons(subjectId);

  const difficultyColors: Record<string, string> = {
    beginner: "#06d6a0",
    intermediate: "#4361ee",
    advanced: "#ef476f",
  };

  const difficultyLabels: Record<string, string> = {
    beginner: "入门",
    intermediate: "进阶",
    advanced: "高级",
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Subject Header */}
      <section
        className="w-full py-12 px-6"
        style={{ backgroundColor: `${subject.color}10` }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/subjects"
            className="text-sm text-muted-foreground hover:underline mb-4 inline-block"
          >
            ← 返回学科列表
          </Link>
          <h1 className="text-4xl font-bold tracking-tight mb-1">
            {subject.name}
          </h1>
          <p className="text-lg text-muted-foreground">{subject.nameEn}</p>
          <p className="text-muted-foreground/80 mt-2 max-w-2xl">
            {subject.description}
          </p>
        </div>
      </section>

      {/* Lessons List */}
      <section className="w-full max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-xl font-semibold mb-6">课程列表</h2>
        {lessons.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>课程开发中，敬请期待...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lessons
              .sort((a, b) => a.order - b.order)
              .map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/subjects/${subjectId}/${lesson.id}`}
                  className="block rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md hover:border-accent/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium">{lesson.title}</h3>
                      {lesson.visualizations && lesson.visualizations.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {lesson.visualizations.map((v) => v.replace(/-/g, " ")).join(" · ")}
                        </p>
                      )}
                    </div>
                    <span
                      className="shrink-0 text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${difficultyColors[lesson.difficulty]}15`,
                        color: difficultyColors[lesson.difficulty],
                      }}
                    >
                      {difficultyLabels[lesson.difficulty]}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

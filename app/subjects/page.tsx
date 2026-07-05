import Link from "next/link";
import { getAllSubjects } from "@/lib/subjects";

export default function SubjectsPage() {
  const subjects = getAllSubjects();

  return (
    <div className="flex flex-col flex-1">
      <section className="w-full py-16 px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          选择学科
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          选择一个学科，开始你的可视化学习之旅
        </p>
      </section>

      <section className="w-full max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/subjects/${subject.id}`}
              className="group block rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className="mb-4 rounded-xl p-3 inline-block"
                style={{ backgroundColor: `${subject.color}15` }}
              >
                <div style={{ color: subject.color }}>
                  {subject.id === "math" && (
                    <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 20h16M8 16V4m0 0l-4 4m4-4l4 4M16 20V8m0 0l-4-4m4 4l-4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {subject.id === "physics" && (
                    <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="3" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
                    </svg>
                  )}
                  {subject.id === "chemistry" && (
                    <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 3h6v5l3 8a4 4 0 01-3 4H9a4 4 0 01-3-4l3-8V3z" />
                      <path d="M9 3h6M9 11h6" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-1">{subject.name}</h2>
              <p className="text-sm text-muted-foreground">{subject.nameEn}</p>
              <p className="text-sm text-muted-foreground/80 mt-3">{subject.description}</p>
              <span className="inline-block mt-4 text-sm font-medium" style={{ color: subject.color }}>
                浏览课程 →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

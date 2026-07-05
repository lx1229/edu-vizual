import Link from "next/link";

const subjects = [
  {
    id: "math",
    name: "数学",
    nameEn: "Mathematics",
    color: "var(--math)",
    description: "从集合论到几何拓扑，用可视化理解抽象概念",
    icon: (
      <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 20h16M8 16V4m0 0l-4 4m4-4l4 4M16 20V8m0 0l-4-4m4 4l-4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "physics",
    name: "物理",
    nameEn: "Physics",
    color: "var(--physics)",
    description: "从经典力学到量子世界，用交互探索自然规律",
    icon: (
      <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    id: "chemistry",
    name: "化学",
    nameEn: "Chemistry",
    color: "var(--chemistry)",
    description: "从分子结构到反应机理，用3D模型理解微观世界",
    icon: (
      <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3h6v5l3 8a4 4 0 01-3 4H9a4 4 0 01-3-4l3-8V3z" />
        <path d="M9 3h6M9 11h6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="w-full py-20 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          edu-board
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
          交互式可视化教育平台
        </p>
        <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto">
          通过HTML可视化展示数学、物理、化学理论，让抽象概念触手可及
        </p>
      </section>

      {/* Subject Cards */}
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
                  {subject.icon}
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-1">
                {subject.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                {subject.nameEn}
              </p>
              <p className="text-sm text-muted-foreground/80">
                {subject.description}
              </p>
              <span
                className="inline-block mt-4 text-sm font-medium"
                style={{ color: subject.color }}
              >
                开始学习 →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-sm text-muted-foreground/60 border-t border-border">
        <p>edu-board &copy; 2026 — 让每一个概念都看得见</p>
      </footer>
    </div>
  );
}

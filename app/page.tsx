'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getLessons } from "@/lib/lessons";

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
    description: "从分子结构到反应机理，用 3D 模型理解微观世界",
    icon: (
      <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3h6v5l3 8a4 4 0 01-3 4H9a4 4 0 01-3-4l3-8V3z" />
        <path d="M9 3h6M9 11h6" strokeLinecap="round" />
      </svg>
    ),
  },
];

function getSubjectLessonCount(subjectId: string): number {
  return getLessons(subjectId).length;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#7209b7", "#f77f00", "#06d6a0"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2,
    });

    particlesRef.current = Array.from({ length: 80 }, createParticle);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x += (dx / dist) * 0.5;
          p.y += (dy / dist) * 0.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative flex flex-col flex-1 min-h-screen">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative w-full py-32 px-6 text-center z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main title with gradient */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8">
            <span className="bg-gradient-to-r from-[#7209b7] via-[#f77f00] to-[#06d6a0] bg-clip-text text-transparent">
              eduVizual
            </span>
          </h1>

          {/* Slogan with typing effect */}
          <p className="text-3xl md:text-4xl text-muted-foreground mb-6">
            <span className="typing-effect">让抽象概念触手可及</span>
          </p>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground/70 max-w-2xl mx-auto mb-12">
            通过 HTML 可视化展示数学、物理、化学理论，让抽象概念触手可及
          </p>

          {/* Subject Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/subjects/${subject.id}`}
                className="group block perspective"
                style={{ perspective: "1000px" }}
              >
                <div
                  className="relative rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:border-white/20"
                  style={{
                    transform: isMounted
                      ? `rotateX(${(mousePos.y - window.innerHeight / 2) / 50}deg) rotateY(${-(mousePos.x - window.innerWidth / 2) / 50}deg)`
                      : undefined,
                    boxShadow: isMounted
                      ? `0 0 ${40 + Math.floor(Math.random() * 20)}px ${subject.color}20`
                      : `0 0 45px ${subject.color}20`,
                  }}
                >
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div
                    className="relative mb-4 rounded-xl p-3 inline-block animate-float"
                    style={{ backgroundColor: `${subject.color}15` }}
                  >
                    <div
                      className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                      style={{ color: subject.color }}
                    >
                      {subject.icon}
                    </div>
                  </div>
                  <h2 className="relative text-2xl font-semibold mb-1">
                    {subject.name}
                  </h2>
                  <p className="relative text-sm text-muted-foreground mb-3">
                    {subject.nameEn}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="relative inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${subject.color}15`, color: subject.color }}
                    >
                      {getSubjectLessonCount(subject.id)} 门课程
                    </span>
                  </div>
                  <p className="relative text-sm text-muted-foreground/80">
                    {subject.description}
                  </p>
                  <span
                    className="relative inline-block mt-4 text-sm font-medium transition-colors"
                    style={{ color: subject.color }}
                  >
                    开始学习 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative w-full py-24 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">核心特性</h2>
            <p className="text-muted-foreground">探索我们的可视化技术</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative text-center p-8 rounded-2xl bg-card/30 border border-border/50 hover:bg-card/50 transition-colors">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7209b7]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-5xl mb-6">🎯</div>
              <h3 className="relative text-xl font-semibold mb-3">交互式探索</h3>
              <p className="relative text-muted-foreground text-sm">
                拖动、缩放、点击，与可视化内容深度互动
              </p>
            </div>
            <div className="relative text-center p-8 rounded-2xl bg-card/30 border border-border/50 hover:bg-card/50 transition-colors">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f77f00]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-5xl mb-6">⚡</div>
              <h3 className="relative text-xl font-semibold mb-3">实时计算</h3>
              <p className="relative text-muted-foreground text-sm">
                参数即时调整，结果实时呈现
              </p>
            </div>
            <div className="relative text-center p-8 rounded-2xl bg-card/30 border border-border/50 hover:bg-card/50 transition-colors">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#06d6a0]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-5xl mb-6">🔮</div>
              <h3 className="relative text-xl font-semibold mb-3">3D 模型</h3>
              <p className="relative text-muted-foreground text-sm">
                三维空间中的分子、几何体可视化
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-20 px-6 z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#7209b7]/20 via-[#f77f00]/20 to-[#06d6a0]/20 border border-border p-12">
            <h2 className="text-3xl font-bold mb-4">准备好开始探索了吗？</h2>
            <p className="text-muted-foreground mb-8">
              选择你感兴趣的学科，开启可视化学习之旅
            </p>
            <Link
              href="/subjects/math"
              className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-xl font-semibold hover:bg-accent/90 transition-colors"
            >
              立即开始探索
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full py-8 text-center text-sm text-muted-foreground/60 border-t border-border z-10">
        <p>eduVizual &copy; 2026 — 让每一个概念都看得见</p>
      </footer>
    </div>
  );
}

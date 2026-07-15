import { notFound } from "next/navigation";
import { getLesson, getLessons } from "@/lib/lessons";
import { readFile } from "fs/promises";
import { join } from "path";
import type { Metadata } from "next";
import matter from "gray-matter";
import LessonPageClient from "./lesson-page-client";

interface PageProps {
  params: Promise<{ subject: string; lesson: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject, lesson: lessonId } = await params;
  const lesson = getLesson(subject, lessonId);
  if (!lesson) return {};
  return {
    title: `${lesson.title} - ${subject === "math" ? "数学" : subject}`,
  };
}

export async function generateStaticParams() {
  const subjects = ["math", "physics", "chemistry"];
  const paths: any[] = [];
  for (const subject of subjects) {
    const lessons = getLessons(subject);
    for (const lesson of lessons) {
      paths.push({ subject, lesson: lesson.id });
    }
  }
  return paths;
}

async function getPageContent(subject: string, lessonId: string) {
  try {
    const mdxPath = join(process.cwd(), "content", subject, lessonId + ".mdx");
    const source = await readFile(mdxPath, "utf-8");
    const { data: frontmatter, content: body } = matter(source);
    return { content: body, frontmatter };
  } catch {
    return { content: "# Not Found", frontmatter: {} };
  }
}

async function LessonPage({ params }: PageProps) {
  const { subject, lesson: lessonId } = await params;
  const lesson = getLesson(subject, lessonId);
  if (!lesson) notFound();
  const { content } = await getPageContent(subject, lessonId);
  return <LessonPageClient lesson={lesson} subjectId={subject} content={content} />;
}

export default LessonPage;

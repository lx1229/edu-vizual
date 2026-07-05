export interface Subject {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  color: string;
  icon: string;
}

export const subjects: Record<string, Subject> = {
  math: {
    id: "math",
    name: "数学",
    nameEn: "Mathematics",
    description: "从集合论到几何拓扑，用可视化理解抽象概念",
    color: "#7209b7",
    icon: "math",
  },
  physics: {
    id: "physics",
    name: "物理",
    nameEn: "Physics",
    description: "从经典力学到量子世界，用交互探索自然规律",
    color: "#f77f00",
    icon: "physics",
  },
  chemistry: {
    id: "chemistry",
    name: "化学",
    nameEn: "Chemistry",
    description: "从分子结构到反应机理，用3D模型理解微观世界",
    color: "#06d6a0",
    icon: "chemistry",
  },
};

export function getSubject(id: string): Subject | undefined {
  return subjects[id];
}

export function getAllSubjects(): Subject[] {
  return Object.values(subjects);
}

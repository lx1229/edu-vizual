export const LEARNING_STAGES = ["幼儿科普", "小学", "中学", "高中", "大学"] as const;

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  order: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  learningStage: "幼儿科普" | "小学" | "中学" | "高中" | "大学";
  visualizations?: string[];
}

const mathLessons: Lesson[] = [
  // 幼儿科普阶段
  {
    id: "classification",
    title: "分类游戏：给物品找家",
    subject: "math",
    order: 1,
    difficulty: "beginner",
    learningStage: "幼儿科普",
    visualizations: ["set-diagram"],
  },
  {
    id: "counting",
    title: "数数游戏：从 1 开始",
    subject: "math",
    order: 2,
    difficulty: "beginner",
    learningStage: "幼儿科普",
    visualizations: ["number-line"],
  },
  {
    id: "shapes",
    title: "形状宝宝：圆形、方形、三角形",
    subject: "math",
    order: 3,
    difficulty: "beginner",
    learningStage: "幼儿科普",
    visualizations: ["set-diagram"],
  },
  {
    id: "colors",
    title: "颜色王国：红黄蓝变变变",
    subject: "math",
    order: 4,
    difficulty: "beginner",
    learningStage: "幼儿科普",
    visualizations: ["set-diagram"],
  },
  {
    id: "bigger-smaller",
    title: "大和小：比较的游戏",
    subject: "math",
    order: 5,
    difficulty: "beginner",
    learningStage: "幼儿科普",
    visualizations: ["number-line"],
  },
  {
    id: "patterns",
    title: "找规律：排排队真有趣",
    subject: "math",
    order: 6,
    difficulty: "beginner",
    learningStage: "幼儿科普",
    visualizations: ["set-diagram"],
  },
  // 小学阶段
  {
    id: "set-concept",
    title: "什么是集合？",
    subject: "math",
    order: 7,
    difficulty: "beginner",
    learningStage: "小学",
    visualizations: ["set-diagram"],
  },
  // ... 其他课程
  {
    id: "russell-paradox",
    title: "罗素悖论",
    subject: "math",
    order: 8,
    difficulty: "beginner",
    learningStage: "大学",
    visualizations: ["set-diagram"],
  },
  {
    id: "cantor-diagonal",
    title: "康托尔对角线论证",
    subject: "math",
    order: 2,
    difficulty: "intermediate",
    learningStage: "大学",
    visualizations: ["set-diagram"],
  },
  {
    id: "natural-numbers",
    title: "自然数的构造",
    subject: "math",
    order: 3,
    difficulty: "beginner",
    learningStage: "大学",
    visualizations: ["number-line"],
  },
  {
    id: "real-numbers",
    title: "实数与戴德金分割",
    subject: "math",
    order: 4,
    difficulty: "intermediate",
    learningStage: "大学",
    visualizations: ["number-line"],
  },
  {
    id: "limits",
    title: "极限的ε-δ定义",
    subject: "math",
    order: 5,
    difficulty: "intermediate",
    learningStage: "大学",
    visualizations: ["limit-explorer"],
  },
  {
    id: "matrix-transform",
    title: "矩阵变换的几何意义",
    subject: "math",
    order: 6,
    difficulty: "intermediate",
    learningStage: "大学",
    visualizations: ["matrix-visualizer"],
  },
  {
    id: "tricuspoid",
    title: "三尖瓣线：圆内旋轮线",
    subject: "math",
    order: 7,
    difficulty: "intermediate",
    learningStage: "大学",
    visualizations: ["tricuspoid"],
  },
];

export function getLessons(subject: string): Lesson[] {
  if (subject === "math") return mathLessons;
  return [];
}

export function getLesson(subject: string, id: string): Lesson | undefined {
  return getLessons(subject).find((l) => l.id === id);
}

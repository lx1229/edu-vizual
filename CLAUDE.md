# edu-board 教育可视化网站 - 项目文档

## 项目概述

edu-board 是一个面向数理化教育的交互式可视化网站，通过 HTML 可视化技术展示数学理论、物理现象和化学结构，部署于 Vercel。

---

## 学习阶段组织体系

### 阶段定义

| 阶段 | 适用年龄 | 内容范围 |
|------|----------|----------|
| **幼儿科普** | 3-6 岁 | 基础概念启蒙：数数、形状、颜色、简单分类 |
| **小学** | 7-12 岁 | 基础学科知识：四则运算、几何图形、简单物理现象、物质分类 |
| **中学** | 13-15 岁 | 核心学科基础：代数方程、平面几何、力学基础、化学反应 |
| **高中** | 16-18 岁 | 进阶学科知识：函数与导数、立体几何、电磁学、有机化学 |
| **大学** | 18+ 岁 | 专业学科深入：实分析、抽象代数、量子力学、高等有机 |

### 导航结构

```
首页
├── 学科入口（数学/物理/化学）
│   └── 学科总览页
│       ├── 按学习阶段筛选
│       │   ├── 幼儿科普 → 对应课程列表
│       │   ├── 小学 → 对应课程列表
│       │   ├── 中学 → 对应课程列表
│       │   ├── 高中 → 对应课程列表
│       │   └── 大学 → 对应课程列表
│       └── 课程详情页
│           ├── 课程内容（MDX）
│           └── 可视化组件
```

### 学习阶段标签

每个课程/内容项都带有学习阶段标签，支持：
- 在学科总览页按阶段筛选
- 在课程详情页显示当前阶段及相邻阶段链接
- 在首页展示精选内容（按阶段分类）

---

## 技术架构

### 技术栈

| 层 | 技术 | 说明 |
|----|------|------|
| 框架 | Next.js 16.2.10 + TypeScript 5.x | App Router, SSR |
| 样式 | Tailwind CSS 4 + shadcn/ui | CSS-first 配置，暗色模式 |
| 数学公式 | KaTeX | 轻量快速，支持 LaTeX |
| 2D 可视化 | Recharts + SVG | 数据图表 + 自定义交互图 |
| 3D 可视化 | @react-three/fiber + three.js 0.185.1 | 分子结构、几何体 |
| 内容 | @next/mdx | Markdown + JSX |
| 状态管理 | Zustand 5.0.14 | 轻量级（计划中） |

### 项目结构

```
edu-board/
├── app/
│   ├── layout.tsx              # 全局布局（字体、元数据、Header）
│   ├── page.tsx                # 欢迎/着陆页面
│   └── subjects/
│       ├── page.tsx            # 学科列表页
│       └── [subject]/
│           ├── page.tsx        # 学科总览 + 课程列表（按阶段筛选）
│           └── [lesson]/
│               └── page.tsx    # 课程页（MDX 内容 + 可视化面板）
├── components/
│   ├── ui/                     # shadcn/ui 基础组件
│   ├── layout/
│   │   ├── Header.tsx          # 顶部导航栏
│   │   └── Sidebar.tsx         # 课程侧边栏
│   ├── viz/                    # 可视化组件
│   │   ├── SetDiagram.tsx      # 韦恩图/集合图
│   │   ├── NumberLine.tsx      # 数轴
│   │   ├── LimitExplorer.tsx   # 极限动画（待创建）
│   │   └── MatrixVisualizer.tsx # 矩阵变换（待创建）
│   └── content/
│       ├── MDXContent.tsx      # MDX 渲染器
│       └── FormulaBlock.tsx    # KaTeX 公式渲染器
├── lib/
│   ├── subjects.ts             # 学科注册表
│   ├── lessons.ts              # 课程注册表（含学习阶段）
│   └── viz-registry.ts         # 可视化组件注册表
├── content/                    # MDX 内容文件（待创建）
├── styles/
│   ├── globals.css
│   └── math.css                # KaTeX 样式覆盖
├── public/                     # 静态资源
├── vercel.json                 # Vercel 配置
├── next.config.ts              # Next.js 配置（MDX 支持）
├── tailwind.config.ts          # Tailwind 配置
├── tsconfig.json
├── package.json
└── CLAUDE.md                   # 项目文档（本文件）
```

---

## 核心数据模型

### Subject（学科）

```typescript
interface Subject {
  id: string;           // "math", "physics", "chemistry"
  name: string;         // "数学", "物理", "化学"
  nameEn: string;       // "Mathematics", "Physics", "Chemistry"
  description: string;  // 学科描述
  color: string;        // 主题色（hex）
  icon: string;         // 图标标识
}
```

### Lesson（课程）

```typescript
interface Lesson {
  id: string;                      // 课程 ID
  title: string;                   // 课程标题
  subject: string;                 // 所属学科
  order: number;                   // 排序
  difficulty: "beginner" | "intermediate" | "advanced";
  learningStage: "幼儿科普" | "小学" | "中学" | "高中" | "大学";
  visualizations?: string[];       // 关联的可视化组件 ID
}
```

### Visualization（可视化组件）

```typescript
interface VizConfig {
  id: string;                      // 组件 ID
  name: string;                    // 组件名称
  description?: string;            // 组件描述
  props?: Record<string, any>;     // 默认 props
}
```

---

## 开发进度

### Phase 0: 项目脚手架 ✓ 已完成

- [x] 初始化 Next.js 14+ 项目（TypeScript + Tailwind + App Router）
- [x] 安装依赖：shadcn/ui, katex, @next/mdx, recharts, @react-three/fiber, three.js, zustand
- [x] 配置 Tailwind（教育配色、字体：Noto Sans SC + Inter）
- [x] 配置 shadcn/ui 基础组件（Button, Card, Badge, Sheet）
- [x] 创建 `vercel.json` 和 `next.config.ts`

### Phase 1: 核心布局与路由 ✓ 进行中

- [x] 实现 `app/layout.tsx`（全局字体、元数据、暗色模式切换）
- [x] 实现欢迎页 `app/page.tsx`（Hero + 三科目卡片）
- [x] 实现学科列表页 `app/subjects/page.tsx`
- [x] 实现学科总览页 `app/subjects/[subject]/page.tsx`
- [x] 实现课程页 `app/subjects/[subject]/[lesson]/page.tsx`
- [x] 创建布局组件：Header, Sidebar
- [ ] 响应式适配（移动端侧边栏折叠）

### Phase 2: 内容系统 ✓ 部分完成

- [x] 创建 `lib/subjects.ts`（学科元数据）
- [x] 创建 `lib/lessons.ts`（课程注册表）
- [ ] 添加 `learningStage` 字段到 Lesson 接口
- [x] 创建 `lib/viz-registry.ts`（可视化注册表）
- [x] 创建 `MDXContent.tsx`（渲染器 + 组件映射）
- [x] 创建 `FormulaBlock.tsx`（KaTeX 封装）

### Phase 3: 可视化组件 ⚠️ 进行中

- [x] 创建 `SetDiagram.tsx`（SVG 韦恩图，3 种模式）
- [x] 创建 `NumberLine.tsx`（交互式数轴，4 种模式）
- [ ] 创建 `LimitExplorer.tsx`（极限动画 - 极限的ε-δ定义）
- [ ] 创建 `MatrixVisualizer.tsx`（矩阵变换 - 矩阵变换的几何意义）

### Phase 4: 内容创作（待开始）

- [ ] 基于 `resource/mathBaby.md` 创建首批数学课程 MDX 文件
- [ ] 创建物理/化学课程框架

---

## 当前任务列表

### 高优先级

1. **添加学习阶段字段到课程数据**
   - 更新 `lib/lessons.ts` 中的 `Lesson` 接口
   - 为每个课程分配学习阶段
   - 更新学科总览页以支持按阶段筛选

2. **创建缺失的可视化组件**
   - `LimitExplorer.tsx` - 极限的ε-δ定义动画
   - `MatrixVisualizer.tsx` - 矩阵变换几何意义可视化

3. **更新 CLAUDE.md**
   - 记录学习阶段组织体系
   - 记录 TODO 列表和进度
   - 记录技术决策和架构说明

---

## 技术决策记录

### 为什么使用 `@next/mdx` 而不是 `@mdx-js/next`？

`@next/mdx` 是 Next.js 官方维护的 MDX 支持包，与 Next.js 14+ 的 App Router 和 SSR 机制集成更好，配置更简单。

### 为什么可视化组件使用客户端组件？

可视化组件需要：
- 交互状态（hover, drag, click）
- 动画（requestAnimationFrame, CSS transitions）
- 动态渲染（SVG 元素操作）

这些都需要 "use client" 指令。

### 为什么使用注册表模式管理可视化组件？

注册表模式允许：
- 课程通过 ID 引用可视化组件，无需硬编码导入
- 新增可视化组件时只需在注册表添加映射
- 支持动态加载和懒加载

---

## 参考资料

- [Next.js 14 App Router 文档](https://nextjs.org/docs/app)
- [Tailwind CSS 4 文档](https://tailwindcss.com/docs)
- [KaTeX 文档](https://katex.org/docs/supported.html)
- [shadcn/ui 文档](https://ui.shadcn.com)
- [resource/mathBaby.md](./resource/mathBaby.md) - 数学课程大纲

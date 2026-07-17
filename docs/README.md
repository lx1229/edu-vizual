# eduVisual - 交互式教育可视化平台

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC.svg)
![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000.svg)

**让抽象概念触手可及 —— 通过 HTML5 可视化技术探索数理化世界**

[English README](../README.md) | [演示站点](https://eduvizual.littleyao.site)

</div>

---

## 📖 项目简介

eduVisual 是一个面向**数学、物理、化学**教育的交互式可视化网站，通过先进的 HTML5 可视化技术将抽象的科学理论转化为直观、可交互的视觉体验。

### 🎯 核心理念

> **"可视化让学习变得有趣，交互让理解变得深刻"**

我们相信，通过精心设计的可视化界面和实时交互，学生可以更轻松地理解复杂的科学概念，从被动接受知识转变为主动探索发现。

---

## 🌟 特色功能

### 📚 分龄学习体系

eduVisual 采用**五阶段学习体系**，为不同年龄段的学生提供适合其认知水平的学习内容：

| 阶段 | 适用年龄 | 内容范围 | 示例主题 |
|------|----------|----------|----------|
| **幼儿科普** | 3-6 岁 | 基础概念启蒙 | 数数游戏、形状认知、颜色混合、简单分类 |
| **小学** | 7-12 岁 | 基础学科知识 | 四则运算、几何图形、简单物理现象、物质分类 |
| **中学** | 13-15 岁 | 核心学科基础 | 代数方程、平面几何、力学基础、化学反应 |
| **高中** | 16-18 岁 | 进阶学科知识 | 函数与导数、立体几何、电磁学、有机化学 |
| **大学** | 18+ 岁 | 专业学科深入 | 实分析、抽象代数、量子力学、高等有机 |

### 🎨 可视化库

#### 数学可视化

| 组件 | 描述 | 适用课程 |
|------|------|----------|
| **集合图 (Set Diagram)** | SVG 韦恩图，支持基础集合、罗素悖论、多级集合嵌套 | 集合论入门、罗素悖论、康托尔对角线论证 |
| **数轴 (Number Line)** | 交互式数轴，支持数值定位、区间显示、不等式可视化 | 自然数构造、实数与戴德金分割、极限探索 |
| **极限探索器 (Limit Explorer)** | 动态展示函数极限的 ε-δ 定义，实时调整参数观察变化 | 极限的 ε-δ 定义 |
| **矩阵变换器 (Matrix Visualizer)** | 3D 矩阵变换可视化，展示线性变换的几何意义 | 矩阵变换的几何意义 |
| **三尖瓣线 (Tricuspoid)** | 圆内旋轮线动画演示 | 三尖瓣线：圆内旋轮线 |

#### 物理/化学可视化（计划中）

- 3D 分子结构模型
- 物理现象模拟（力学、电磁学）
- 化学反应过程动画

### 🛠️ 技术特性

- **响应式设计** - 完美适配桌面端、平板和移动设备
- **暗色模式** - 保护视力，支持自动/手动切换
- **多语言支持** - 中文/英文无缝切换
- **SEO 优化** - 完善的元数据、Open Graph、Twitter Cards
- **PWA 支持** - 渐进式 Web 应用，可离线访问
- **MDX 内容系统** - Markdown + JSX，支持在文档中嵌入交互组件

---

## 🏗️ 技术架构

### 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| **框架** | Next.js 16.2.10 + TypeScript 5.x | App Router, SSR, 静态生成 |
| **样式** | Tailwind CSS 4 + shadcn/ui | CSS-first 配置，暗色模式 |
| **数学公式** | KaTeX | 轻量快速，支持 LaTeX |
| **2D 可视化** | Recharts + SVG | 数据图表 + 自定义交互图 |
| **3D 可视化** | @react-three/fiber + three.js 0.185.1 | 分子结构、几何体 |
| **内容** | @next/mdx | Markdown + JSX |
| **状态管理** | Zustand 5.0.14 | 轻量级（计划中） |
| **国际化** | next-intl | 中文/英文切换 |
| **主题** | next-themes | 暗色模式 |

### 项目结构

```
eduVisual/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 全局布局（字体、元数据、Header）
│   ├── page.tsx                  # 欢迎/着陆页面
│   └── subjects/                 # 学科路由
│       ├── page.tsx              # 学科列表页
│       └── [subject]/            # 动态学科路由
│           ├── page.tsx          # 学科总览 + 课程列表（按阶段筛选）
│           └── [lesson]/         # 动态课程路由
│               └── page.tsx      # 课程页（MDX 内容 + 可视化面板）
├── components/
│   ├── ui/                       # shadcn/ui 基础组件
│   ├── layout/
│   │   ├── Header.tsx            # 顶部导航栏
│   │   └── Sidebar.tsx           # 课程侧边栏
│   ├── viz/                      # 可视化组件
│   │   ├── SetDiagram.tsx        # 韦恩图/集合图
│   │   ├── NumberLine.tsx        # 数轴
│   │   ├── LimitExplorer.tsx     # 极限动画（待创建）
│   │   └── MatrixVisualizer.tsx  # 矩阵变换（待创建）
│   └── content/
│       ├── MDXContent.tsx        # MDX 渲染器
│       └── FormulaBlock.tsx      # KaTeX 公式渲染器
├── lib/
│   ├── subjects.ts               # 学科注册表
│   ├── lessons.ts                # 课程注册表（含学习阶段）
│   └── viz-registry.ts           # 可视化组件注册表
├── content/                      # MDX 内容文件（待创建）
├── styles/
│   ├── globals.css
│   └── math.css                  # KaTeX 样式覆盖
├── public/                       # 静态资源
├── docs/                         # 文档目录
├── vercel.json                   # Vercel 配置
├── next.config.ts                # Next.js 配置（MDX 支持）
├── tailwind.config.ts            # Tailwind 配置
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 快速开始

### 环境要求

- Node.js 18+ (推荐 20+ LTS)
- npm / pnpm / yarn

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/your-username/eduVisual.git
cd eduVisual

# 2. 安装依赖
npm install
# 或
pnpm install

# 3. 启动开发服务器
npm run dev
# 或
pnpm dev

# 4. 访问 http://localhost:3000
```

### 构建生产版本

```bash
# 构建
npm run build

# 启动生产服务器
npm start
```

---

## 📖 学习路径示例

### 数学 - 集合论之旅

```
幼儿科普 ────────────────────────────────────────▶ 大学
  │                                                    │
  ├─ 分类游戏：给物品找家                              │
  │                                                    │
  └─────────────────▶ 小学 ────────────────────────▶ 大学
                       │    │                            │
                       │    └─ 什么是集合？               │
                       │                                 │
                       └─────────────────────────────────┘
                                    │
                                    ├─ 罗素悖论
                                    ├─ 康托尔对角线论证
                                    ├─ 自然数的构造
                                    ├─ 实数与戴德金分割
                                    ├─ 极限的ε-δ定义
                                    └─ 矩阵变换的几何意义
```

---

## 🤝 贡献指南

我们欢迎各种形式的贡献！以下是你可以帮助的地方：

### 🎨 可视化组件开发

- 实现新的可视化组件（如分子模型、物理模拟）
- 优化现有组件的性能和交互体验
- 添加更多可视化模式和支持的场景

### 📝 内容创作

- 编写新的课程 MDX 文件
- 翻译现有内容到英文
- 校对和润色现有内容

### 🐛 Bug 修复

- 报告并修复发现的 bug
- 优化性能和用户体验

### 💡 功能建议

- 提出新的功能想法
- 参与讨论和方案设计

### 如何开始贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的改动 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

---

## 📄 开源协议

本项目采用 MIT 协议开源。

---

## 🙏 致谢

### 开源项目

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS-first 工具类框架
- [shadcn/ui](https://ui.shadcn.com) - 精美的组件库
- [KaTeX](https://katex.org/) - 快速数学公式渲染
- [Recharts](https://recharts.org/) - 声明式图表库
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) - React Three.js 渲染器
- [three.js](https://threejs.org/) - 3D 图形库
- [Zustand](https://zustand-demo.pmnd.rs/) - 状态管理

### 灵感来源

- [Khan Academy](https://www.khanacademy.org/) - 免费教育平台
- [PhET Interactive Simulations](https://phet.colorado.edu/) - 科学模拟
- [Desmos](https://www.desmos.com/) - 图形计算器

---

## 📧 联系方式

- **网站**: [eduvizual.littleyao.site](https://eduvizual.littleyao.site)
- **GitHub**: [github.com/lx1229/edu-vizual](https://github.com/lx1229/edu-vizual)

---

## 🎯 使命

> **让每一个孩子都能通过可视化探索科学的奥秘，让学习变得有趣、深刻、充满发现。**

eduVisual 致力于通过先进的 Web 可视化技术，降低科学学习的门槛，激发学生对数学、物理、化学的兴趣和好奇心。

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star！**

Made with ❤️ by eduVisual Team

</div>

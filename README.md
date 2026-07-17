# eduVisual - Interactive Educational Visualization Platform

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000)](https://vercel.com)

**Bringing abstract concepts to life through interactive HTML5 visualizations**

[中文文档](./docs/README.md) | [Demo Site](https://eduvizual.littleyao.site)

</div>

---

## 🌟 Overview

**eduVisual** is an interactive educational visualization platform that brings abstract concepts in mathematics, physics, and chemistry to life through beautiful HTML-based visualizations.

Transform complex theories into intuitive, interactive experiences that students can explore, manipulate, and truly understand.

---

## ✨ Key Features

### 📚 Multi-Stage Learning System

Organized into **5 learning stages** tailored to different age groups:

| Stage | Age Range | Focus | Example Topics |
|-------|-----------|-------|----------------|
| 🧸 **Preschool** | 3-6 years | Basic concepts | Counting, shapes, colors, simple classification |
| 🎒 **Elementary** | 7-12 years | Core subjects | Arithmetic, geometry, basic physics, material classification |
| 📖 **Middle School** | 13-15 years | Foundation | Algebra, plane geometry, mechanics, chemical reactions |
| 🎓 **High School** | 16-18 years | Advanced | Functions, calculus, electromagnetism, organic chemistry |
| 🎓 **University** | 18+ years | Professional | Real analysis, abstract algebra, quantum mechanics, advanced organic chemistry |

### 🎨 Visualization Library

#### Mathematics Visualizations

| Component | Description | Courses |
|-----------|-------------|----------|
| **Set Diagram** | SVG Venn diagrams with support for basic sets, Russell's paradox, and nested sets | Set theory introduction, Russell's paradox, Cantor's diagonal argument |
| **Number Line** | Interactive number line with value placement, interval display, and inequality visualization | Natural numbers, real numbers & Dedekind cuts, limits |
| **Limit Explorer** | Dynamic animation demonstrating the ε-δ definition of limits with real-time parameter adjustment | ε-δ definition of limits |
| **Matrix Visualizer** | 3D matrix transformation visualization showing geometric meaning of linear transformations | Geometric meaning of matrix transformations |
| **Tricuspoid** | Hypocycloid animation with rolling circle demonstration | Hypocycloid: the tricuspoid |

#### Physics/Chemistry Visualizations (Planned)

- 3D molecular structure models
- Physics phenomenon simulations (mechanics, electromagnetism)
- Chemical reaction process animations

### 🛠️ Technical Features

- **Responsive Design** - Perfect adaptation for desktop, tablet, and mobile devices
- **Dark Mode** - Eye protection with automatic/manual switching
- **i18n Support** - Seamless Chinese/English language switching
- **SEO Optimized** - Comprehensive metadata, Open Graph, Twitter Cards
- **PWA Support** - Progressive Web App with offline access
- **MDX Content System** - Markdown + JSX with embedded interactive components

---

## 🏗️ Technical Architecture

### Tech Stack

| Layer | Technology | Description |
|-------|------------|-------------|
| **Framework** | Next.js 16.2.10 + TypeScript 5.x | App Router, SSR, Static Generation |
| **Styling** | Tailwind CSS 4 + shadcn/ui | CSS-first configuration, dark mode |
| **Math Rendering** | KaTeX | Lightweight and fast, supports LaTeX |
| **2D Visualization** | Recharts + SVG | Data charts + custom interactive diagrams |
| **3D Visualization** | @react-three/fiber + three.js 0.185.1 | Molecular structures, geometric shapes |
| **Content** | @next/mdx | Markdown + JSX |
| **State Management** | Zustand 5.0.14 | Lightweight (planned) |
| **i18n** | next-intl | Chinese/English switching |
| **Theme** | next-themes | Dark mode |

### Project Structure

```
eduVisual/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Global layout (fonts, metadata, Header)
│   ├── page.tsx                  # Welcome/Landing page
│   └── subjects/                 # Subject routes
│       ├── page.tsx              # Subject list page
│       └── [subject]/            # Dynamic subject route
│           ├── page.tsx          # Subject overview + lesson list (filtered by stage)
│           └── [lesson]/         # Dynamic lesson route
│               └── page.tsx      # Lesson page (MDX content + visualization panel)
├── components/
│   ├── ui/                       # shadcn/ui base components
│   ├── layout/
│   │   ├── Header.tsx            # Top navigation bar
│   │   └── Sidebar.tsx           # Course sidebar
│   ├── viz/                      # Visualization components
│   │   ├── SetDiagram.tsx        # Venn diagram/Set diagram
│   │   ├── NumberLine.tsx        # Number line
│   │   ├── LimitExplorer.tsx     # Limit animation (to be created)
│   │   └── MatrixVisualizer.tsx  # Matrix transformation (to be created)
│   └── content/
│       ├── MDXContent.tsx        # MDX renderer
│       └── FormulaBlock.tsx      # KaTeX formula renderer
├── lib/
│   ├── subjects.ts               # Subject registry
│   ├── lessons.ts                # Lesson registry (with learning stages)
│   └── viz-registry.ts           # Visualization component registry
├── content/                      # MDX content files (to be created)
├── styles/
│   ├── globals.css
│   └── math.css                  # KaTeX style overrides
├── public/                       # Static assets
├── docs/                         # Documentation directory
├── vercel.json                   # Vercel configuration
├── next.config.ts                # Next.js configuration (MDX support)
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (Node.js 24 LTS recommended)
- npm / pnpm / yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/eduVisual.git
cd eduVisual

# 2. Install dependencies
npm install
# or
pnpm install

# 3. Start development server
npm run dev
# or
pnpm dev

# 4. Visit http://localhost:3000
```

### Building for Production

```bash
# Build
npm run build

# Start production server
npm start
```

---

## 📖 Learning Path Example

### Mathematics - Set Theory Journey

```
Preschool ─────────────────────────────────────────▶ University
  │                                                    │
  ├─ Classification games: "Finding homes for objects" │
  │                                                    │
  └─────────────────▶ Elementary ────────────────────▶ University
                       │    │                            │
                       │    └─ What is a set?           │
                       │                                 │
                       └─────────────────────────────────┘
                                    │
                                    ├─ Russell's Paradox
                                    ├─ Cantor's Diagonal Argument
                                    ├─ Natural Numbers Construction
                                    ├─ Real Numbers & Dedekind Cuts
                                    ├─ ε-δ Definition of Limits
                                    └─ Geometric Meaning of Matrix Transformations
```

---

## 🤝 Contributing

We welcome contributions of all kinds! Here's how you can help:

### 🎨 Visualization Component Development

- Implement new visualization components (e.g., molecular models, physics simulations)
- Optimize existing components' performance and interaction experience
- Add more visualization modes and supported scenarios

### 📝 Content Creation

- Write new course MDX files
- Translate existing content to other languages
- Proofread and polish existing content

### 🐛 Bug Fixes

- Report and fix discovered bugs
- Optimize performance and user experience

### 💡 Feature Suggestions

- Propose new feature ideas
- Participate in discussions and design

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open sourced under the MIT License.

---

## 🙏 Acknowledgments

### Open Source Projects

- [Next.js](https://nextjs.org/) - React full-stack framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS-first utility framework
- [shadcn/ui](https://ui.shadcn.com) - Beautiful component library
- [KaTeX](https://katex.org/) - Fast math formula rendering
- [Recharts](https://recharts.org/) - Declarative charting library
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) - React Three.js renderer
- [three.js](https://threejs.org/) - 3D graphics library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

### Inspiration

- [Khan Academy](https://www.khanacademy.org/) - Free education platform
- [PhET Interactive Simulations](https://phet.colorado.edu/) - Science simulations
- [Desmos](https://www.desmos.com/) - Graphing calculator

---

## 📧 Contact

- **Website**: [eduvizual.littleyao.site](https://eduvizual.littleyao.site)
- **GitHub**: [github.com/lx1229/edu-vizual](https://github.com/lx1229/edu-vizual)

---

## 🎯 Mission

> **Making every child able to explore the mysteries of science through visualization, making learning interesting, profound, and full of discovery.**

eduVisual is committed to lowering the barrier to science learning through advanced web visualization technology, and sparking students' interest and curiosity in mathematics, physics, and chemistry.

---

<div align="center">

**If this project helps you, please give a ⭐ Star!**

Made with ❤️ by eduVisual Team

</div>

"use client";

import { useState, useCallback } from "react";

interface SetDiagramProps {
  type?: "russell" | "basic" | "three-sets";
  A?: string;
  B?: string;
  C?: string;
}

interface CircleConfig {
  cx: number;
  cy: number;
  r: number;
  label: string;
  color: string;
}

function BasicSetDiagram({ sets }: { sets: CircleConfig[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
      <rect x="2" y="2" width="396" height="296" rx="8" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
      {sets.map((circle) => {
        const isHovered = hovered === circle.label;
        return (
          <g
            key={circle.label}
            onMouseEnter={() => setHovered(circle.label)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <circle
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              fill={isHovered ? `${circle.color}40` : `${circle.color}20`}
              stroke={circle.color}
              strokeWidth={isHovered ? 3 : 2}
              className="transition-all duration-200"
            />
            <text
              x={circle.cx}
              y={circle.cy - circle.r + 18}
              textAnchor="middle"
              className="text-sm fill-foreground font-medium"
            >
              {circle.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function RussellDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);

  const sets: CircleConfig[] = [
    { cx: 170, cy: 160, r: 110, label: "所有集合", color: "hsl(var(--math))" },
    { cx: 230, cy: 160, r: 90, label: "不自我包含的集合", color: "hsl(var(--accent))" },
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
      <rect x="2" y="2" width="396" height="296" rx="8" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
      {sets.map((circle) => {
        const isHovered = hovered === circle.label;
        return (
          <g
            key={circle.label}
            onMouseEnter={() => setHovered(circle.label)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <circle
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              fill={isHovered ? `${circle.color}40` : `${circle.color}20`}
              stroke={circle.color}
              strokeWidth={isHovered ? 3 : 2}
              className="transition-all duration-200"
            />
            <text
              x={circle.cx}
              y={circle.cy + circle.r + 16}
              textAnchor="middle"
              className="text-sm fill-foreground font-medium"
            >
              {circle.label}
            </text>
          </g>
        );
      })}
      {/* <text x="200" y="155" textAnchor="middle" className="text-xs fill-accent font-medium">
        罗素集合: R = {x | x ∉ x}
      </text> */}
      <text x="200" y="175" textAnchor="middle" className="text-xs fill-muted-foreground">
        R ∈ R ⇔ R ∉ R
      </text>
    </svg>
  );
}

function ThreeSetDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);

  const sets: CircleConfig[] = [
    { cx: 165, cy: 155, r: 100, label: "自然数 N", color: "hsl(var(--math))" },
    { cx: 235, cy: 155, r: 100, label: "整数 Z", color: "hsl(var(--accent))" },
    { cx: 200, cy: 210, r: 90, label: "有理数 Q", color: "hsl(var(--chemistry))" },
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
      <rect x="2" y="2" width="396" height="296" rx="8" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
      {sets.map((circle) => {
        const isHovered = hovered === circle.label;
        return (
          <g
            key={circle.label}
            onMouseEnter={() => setHovered(circle.label)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <circle
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              fill={isHovered ? `${circle.color}40` : `${circle.color}20`}
              stroke={circle.color}
              strokeWidth={isHovered ? 3 : 2}
              className="transition-all duration-200"
            />
            <text
              x={circle.cx}
              y={circle.cy + circle.r + 16}
              textAnchor="middle"
              className="text-sm fill-foreground font-medium"
            >
              {circle.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function SetDiagram({ type = "basic", A, B, C }: SetDiagramProps) {
  switch (type) {
    case "russell":
      return <RussellDiagram />;
    case "three-sets":
      return <ThreeSetDiagram />;
    default:
      return <BasicSetDiagram sets={[
        { cx: 170, cy: 150, r: 100, label: A || "A", color: "hsl(var(--math))" },
        { cx: 230, cy: 150, r: 100, label: B || "B", color: "hsl(var(--accent))" },
      ]} />;
  }
}

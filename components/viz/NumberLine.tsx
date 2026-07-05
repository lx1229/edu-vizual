"use client";

import { useState, useCallback } from "react";

interface NumberLineProps {
  min?: number;
  max?: number;
  points?: Array<{ value: number; label: string; color?: string }>;
  interval?: { start: number; end: number; label?: string };
  type?: "basic" | "integers" | "rationals" | "interval";
}

export default function NumberLine({
  min = -5,
  max = 5,
  points = [],
  interval,
  type = "basic",
}: NumberLineProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const width = 500;
  const height = 120;
  const padding = 40;
  const lineY = height / 2;
  const scaleX = (v: number) => padding + ((v - min) / (max - min)) * (width - 2 * padding);

  const tickSpacing = type === "integers" ? 1 : type === "rationals" ? 0.5 : 1;
  const ticks = [];
  for (let t = Math.ceil(min / tickSpacing) * tickSpacing; t <= max; t += tickSpacing) {
    ticks.push(Math.round(t * 1000) / 1000);
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {/* Number line */}
      <line x1={padding} y1={lineY} x2={width - padding} y2={lineY} stroke="hsl(var(--border))" strokeWidth="2" />
      {/* Arrow heads */}
      <polygon points={`${width - padding},${lineY} ${width - padding - 8},${lineY - 5} ${width - padding - 8},${lineY + 5}`} fill="hsl(var(--border))" />
      <polygon points={`${padding},${lineY} ${padding + 8},${lineY - 5} ${padding + 8},${lineY + 5}`} fill="hsl(var(--border))" />

      {/* Ticks and labels */}
      {ticks.map((tick) => {
        const x = scaleX(tick);
        const isInteger = Math.abs(tick - Math.round(tick)) < 0.01;
        return (
          <g key={tick}>
            <line x1={x} y1={lineY - 6} x2={x} y2={lineY + 6} stroke="hsl(var(--border))" strokeWidth="1" />
            {isInteger && (
              <text x={x} y={lineY + 20} textAnchor="middle" className="text-xs fill-muted-foreground">
                {Math.round(tick)}
              </text>
            )}
          </g>
        );
      })}

      {/* Interval highlight */}
      {interval && (
        <rect
          x={scaleX(interval.start)}
          y={lineY - 30}
          width={scaleX(interval.end) - scaleX(interval.start)}
          height={60}
          fill="hsl(var(--accent))"
          opacity="0.1"
          rx="4"
        />
      )}

      {/* Points */}
      {points.map((point, i) => {
        const x = scaleX(point.value);
        const isHovered = hoveredPoint === i;
        const color = point.color || "hsl(var(--math))";
        return (
          <g
            key={i}
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
            className="cursor-pointer"
          >
            <circle
              cx={x}
              cy={lineY}
              r={isHovered ? 8 : 6}
              fill={color}
              opacity={isHovered ? 1 : 0.8}
              className="transition-all duration-200"
            />
            <circle
              cx={x}
              cy={lineY}
              r={isHovered ? 14 : 10}
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity={isHovered ? 0.5 : 0}
              className="transition-all duration-200"
            />
            <text
              x={x}
              y={lineY - 16}
              textAnchor="middle"
              className={`text-xs font-medium ${isHovered ? "fill-foreground" : "fill-muted-foreground"}`}
            >
              {point.label || point.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

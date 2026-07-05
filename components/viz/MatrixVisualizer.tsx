'use client';

import { useState } from 'react';

interface MatrixVisualizerProps {
  mode?: 'rotation' | 'scaling' | 'shear' | 'custom';
}

export function MatrixVisualizer({ mode = 'rotation' }: MatrixVisualizerProps) {
  const [angle, setAngle] = useState(45);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [shear, setShear] = useState(0);

  const matrix = (() => {
    switch (mode) {
      case 'rotation':
        const rad = (angle * Math.PI) / 180;
        return [
          [Math.cos(rad), -Math.sin(rad)],
          [Math.sin(rad), Math.cos(rad)],
        ];
      case 'scaling':
        return [
          [scaleX, 0],
          [0, scaleY],
        ];
      case 'shear':
        return [
          [1, shear],
          [0, 1],
        ];
      default:
        return [
          [1, 0],
          [0, 1],
        ];
    }
  })();

  const transformPoint = (x: number, y: number) => {
    return {
      x: matrix[0][0] * x + matrix[0][1] * y,
      y: matrix[1][0] * x + matrix[1][1] * y,
    };
  };

  const points = [
    { x: 1, y: 0, label: 'i' },
    { x: 0, y: 1, label: 'j' },
    { x: 1, y: 1, label: '' },
    { x: -1, y: 0, label: '' },
    { x: 0, y: -1, label: '' },
    { x: -1, y: -1, label: '' },
    { x: 1, y: -1, label: '' },
    { x: -1, y: 1, label: '' },
  ];

  const transformed = points.map((p) => ({
    ...p,
    ...transformPoint(p.x, p.y),
  }));

  const scale = 40;
  const offset = 100;

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">矩阵变换的几何意义</h3>

      <div className="space-y-4">
        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          {mode === 'rotation' && (
            <div>
              <label className="text-sm text-muted-foreground">旋转角度：{angle}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}
          {mode === 'scaling' && (
            <>
              <div>
                <label className="text-sm text-muted-foreground">X 缩放：{scaleX.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={scaleX}
                  onChange={(e) => setScaleX(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Y 缩放：{scaleY.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={scaleY}
                  onChange={(e) => setScaleY(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </>
          )}
          {mode === 'shear' && (
            <div>
              <label className="text-sm text-muted-foreground">剪切因子：{shear.toFixed(1)}</label>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.1"
                value={shear}
                onChange={(e) => setShear(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Matrix display */}
        <div className="text-center font-mono text-sm">
          <div className="inline-block border-2 border-current px-2 py-1">
            <div className="flex gap-4">
              <span>{matrix[0][0].toFixed(2)}</span>
              <span>{matrix[0][1].toFixed(2)}</span>
            </div>
            <div className="flex gap-4">
              <span>{matrix[1][0].toFixed(2)}</span>
              <span>{matrix[1][1].toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Original grid */}
            <g stroke="currentColor" strokeWidth="0.5" opacity="0.3">
              {[...Array(5)].map((_, i) => (
                <>
                  <line x1={i * 50} y1="0" x2={i * 50} y2="200" />
                  <line x1="0" y1={i * 50} x2="200" y2={i * 50} />
                </>
              ))}
            </g>

            {/* Original basis vectors */}
            <line x1="100" y1="100" x2="150" y2="100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red)" />
            <line x1="100" y1="100" x2="100" y2="50" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-green)" />

            {/* Transformed vectors */}
            <line
              x1="100"
              y1="100"
              x2={100 + transformed[0].x * scale}
              y2={100 - transformed[0].y * scale}
              stroke="#f97316"
              strokeWidth="3"
              markerEnd="url(#arrow-orange)"
            />
            <line
              x1="100"
              y1="100"
              x2={100 - transformed[1].x * scale}
              y2={100 + transformed[1].y * scale}
              stroke="#3b82f6"
              strokeWidth="3"
              markerEnd="url(#arrow-blue)"
            />

            {/* Transformed grid */}
            <g stroke="#f97316" strokeWidth="1" opacity="0.5">
              {transformed.slice(2).map((p, i) => (
                <>
                  <line
                    x1="100"
                    y1="100"
                    x2={100 + p.x * scale}
                    y2={100 - p.y * scale}
                  />
                </>
              ))}
            </g>

            {/* Center point */}
            <circle cx="100" cy="100" r="3" fill="currentColor" />
          </svg>

          {/* Legend */}
          <div className="absolute bottom-2 left-2 text-xs space-y-1">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>i' (变换后)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>j' (变换后)</span>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="text-sm text-muted-foreground">
          <p>矩阵左乘向量实现线性变换：</p>
          <p className="font-mono mt-1">
            [a b] [x]   [ax + by]
            [c d] [y] = [cx + dy]
          </p>
        </div>
      </div>
    </div>
  );
}

export default MatrixVisualizer;

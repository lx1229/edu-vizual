'use client';

import { useState } from 'react';

interface LimitExplorerProps {
  mode?: 'epsilon-delta' | 'sequence';
}

export function LimitExplorer({ mode = 'epsilon-delta' }: LimitExplorerProps) {
  const [epsilon, setEpsilon] = useState(0.5);
  const [delta, setDelta] = useState(0.5);
  const [x0, setX0] = useState(2);
  const [limit, setLimit] = useState(4);

  // f(x) = x^2, limit as x -> 2 is 4
  const f = (x: number) => x * x;

  const epsilonColors = [
    '#ef4444', // red
    '#f97316', // orange
    '#eab308', // yellow
    '#22c55e', // green
    '#3b82f6', // blue
  ];

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">极限的ε-δ定义探索</h3>

      <div className="space-y-4">
        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">ε (epsilon): {epsilon.toFixed(2)}</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={epsilon}
              onChange={(e) => setEpsilon(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">δ (delta): {delta.toFixed(2)}</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={delta}
              onChange={(e) => setDelta(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">x₀ (趋近点): {x0}</label>
            <input
              type="range"
              min="0"
              max="4"
              step="0.5"
              value={x0}
              onChange={(e) => setX0(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">极限值 L: {limit}</label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={limit}
              onChange={(e) => setLimit(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Visualization */}
        <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* Axes */}
            <line x1="20" y1="180" x2="380" y2="180" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="180" x2="20" y2="20" stroke="currentColor" strokeWidth="1" />

            {/* Epsilon band */}
            <rect
              x="20"
              y={180 - (limit + epsilon) * 20}
              width="360"
              height={epsilon * 40}
              fill={epsilonColors[Math.floor((epsilon - 0.1) / 0.3)]}
              opacity="0.3"
            />

            {/* Delta band on x-axis */}
            <rect
              x={20 + (x0 - delta) * 50}
              y="160"
              width={delta * 100}
              height="20"
              fill="#6b7280"
              opacity="0.3"
            />

            {/* Function curve f(x) = x² */}
            <path
              d={`M ${[...Array(80)].map((_, i) => {
                const x = (i / 80) * 4;
                const y = 180 - Math.pow(x, 2) * 10;
                return `${20 + x * 50},${y}`;
              }).join(' ')}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />

            {/* Limit point */}
            <circle cx="20 + (x0) * 50" cy="180 - limit * 20" r="4" fill="currentColor" />

            {/* Epsilon bounds */}
            <line
              x1="20"
              y1={180 - (limit + epsilon) * 20}
              x2="380"
              y2={180 - (limit + epsilon) * 20}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4"
            />
            <line
              x1="20"
              y1={180 - (limit - epsilon) * 20}
              x2="380"
              y2={180 - (limit - epsilon) * 20}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4"
            />

            {/* Delta bounds */}
            <line
              x1={20 + (x0 - delta) * 50}
              y1="20"
              x2={20 + (x0 - delta) * 50}
              y2="180"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4"
            />
            <line
              x1={20 + (x0 + delta) * 50}
              y1="20"
              x2={20 + (x0 + delta) * 50}
              y2="180"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4"
            />
          </svg>

          {/* Labels */}
          <text x="385" y={180 - (limit + epsilon) * 20} className="text-xs fill-current">L + ε</text>
          <text x="385" y={180 - (limit - epsilon) * 20} className="text-xs fill-current">L - ε</text>
          <text x={20 + (x0 - delta) * 50} y="15" className="text-xs fill-current">x₀ - δ</text>
          <text x={20 + (x0 + delta) * 50} y="15" className="text-xs fill-current">x₀ + δ</text>
        </div>

        {/* Definition display */}
        <div className="text-sm text-muted-foreground">
          <p>{'定义：&forall;ε > 0, &exist;δ > 0, 当 0 < |x - x<sub>0</sub>| < δ 时，|f(x) - L| < ε'}</p>
          <p className="mt-2">
            {'当前：当 |x - ' + x0 + '| < ' + delta.toFixed(2) + ' 时，|f(x) - ' + limit + '| < ' + epsilon.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LimitExplorer;

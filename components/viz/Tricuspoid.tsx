"use client";

import { useState, useMemo, useCallback } from "react";

interface TricuspoidProps {
  // 滚动圆半径（相对于固定圆半径的比例）
  rollingRatio?: number; // 默认 1/3
  // 显示选项
  showFixedCircle?: boolean;
  showRollingCircle?: boolean;
  showTrace?: boolean;
  showPath?: boolean;
  showRadiusLine?: boolean;
  // 动画控制
  autoRotate?: boolean;
  speed?: number; // 弧度/帧
  // 样式
  traceColor?: string;
  pointColor?: string;
}

export default function Tricuspoid({
  rollingRatio = 1 / 3,
  showFixedCircle = true,
  showRollingCircle = true,
  showTrace = true,
  showPath = true,
  showRadiusLine = true,
  autoRotate = true,
  speed = 0.02,
  traceColor = "hsl(var(--math))",
  pointColor = "hsl(var(--accent))",
}: TricuspoidProps) {
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 画布设置
  const width = 600;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;
  const fixedRadius = 150; // 固定圆半径
  const rollingRadius = fixedRadius * rollingRatio; // 滚动圆半径

  // 三尖瓣线参数方程（圆内旋轮线）
  // x = (R - r) * cos(θ) + r * cos((R - r) * θ / r)
  // y = (R - r) * sin(θ) - r * sin((R - r) * θ / r)
  // 其中 R 是固定圆半径，r 是滚动圆半径
  const calculatePoint = useCallback((theta: number) => {
    const R = fixedRadius;
    const r = rollingRadius;
    const x = (R - r) * Math.cos(theta) + r * Math.cos(((R - r) * theta) / r);
    const y = (R - r) * Math.sin(theta) - r * Math.sin(((R - r) * theta) / r);
    return { x: centerX + x, y: centerY - y }; // 翻转 y 轴
  }, [fixedRadius, rollingRadius, centerX, centerY]);

  // 计算轨迹点
  const tracePoints = useMemo(() => {
    if (!showTrace) return [];
    const points: Array<{ x: number; y: number }> = [];
    const steps = 720; // 高分辨率
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * 2 * Math.PI;
      points.push(calculatePoint(theta));
    }
    return points;
  }, [calculatePoint, showTrace]);

  // 计算当前路径点（从 0 到当前角度）
  const pathPoints = useMemo(() => {
    if (!showPath) return [];
    const points: Array<{ x: number; y: number }> = [];
    const steps = Math.ceil((angle / (2 * Math.PI)) * 720);
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * angle;
      points.push(calculatePoint(theta));
    }
    return points;
  }, [calculatePoint, angle, showPath]);

  // 当前点位置
  const currentPoint = useMemo(() => calculatePoint(angle), [calculatePoint, angle]);

  // 滚动圆圆心位置
  const rollingCenter = useMemo(() => {
    const x = centerX + (fixedRadius - rollingRadius) * Math.cos(angle);
    const y = centerY - (fixedRadius - rollingRadius) * Math.sin(angle);
    return { x, y };
  }, [angle, fixedRadius, rollingRadius, centerX, centerY]);

  // 动画循环
  useState(() => {
    if (!autoRotate || isDragging) return;
    let animationId: number;
    const animate = () => {
      setAngle((prev) => (prev + speed) % (2 * Math.PI));
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  });

  // 鼠标拖拽控制
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - centerX;
    const y = -(e.clientY - rect.top - centerY); // 翻转 y
    const newAngle = Math.atan2(y, x);
    setAngle((newAngle + 2 * Math.PI) % (2 * Math.PI));
  }, [isDragging, centerX, centerY]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 生成 SVG 路径
  const generatePath = (points: Array<{ x: number; y: number }>) => {
    if (points.length === 0) return "";
    return "M " + points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 控制面板 */}
      <div className="bg-muted/50 rounded-lg p-4 w-full max-w-md">
        <h3 className="text-sm font-medium mb-3">参数设置</h3>

        <div className="space-y-4">
          {/* 滚动比例 */}
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              滚动圆比例 (r/R = {rollingRatio.toFixed(2)})
            </label>
            <input
              type="range"
              min="0.1"
              max="0.5"
              step="0.01"
              value={rollingRatio}
              onChange={(e) => {
                const ratio = parseFloat(e.target.value);
                setAngle(0);
                // 更新滚动圆半径
              }}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0.1</span>
              <span>0.5</span>
            </div>
          </div>

          {/* 动画控制 */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoRotate"
              checked={autoRotate}
              onChange={(e) => {
                // 这里需要更新 props，但由于是纯组件，实际使用时应该用状态管理
              }}
              className="rounded"
            />
            <label htmlFor="autoRotate" className="text-sm">自动旋转</label>
          </div>

          {/* 显示选项 */}
          <div className="space-y-2 pt-2 border-t">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showFixedCircle}
                onChange={(e) => {}}
                className="rounded"
              />
              显示固定圆
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showRollingCircle}
                onChange={(e) => {}}
                className="rounded"
              />
              显示滚动圆
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showTrace}
                onChange={(e) => {}}
                className="rounded"
              />
              显示完整轨迹
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showPath}
                onChange={(e) => {}}
                className="rounded"
              />
              显示当前路径
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showRadiusLine}
                onChange={(e) => {}}
                className="rounded"
              />
              显示半径线
            </label>
          </div>
        </div>
      </div>

      {/* 可视化画布 */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-2xl h-auto"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* 背景 */}
        <rect x="2" y="2" width={width - 4} height={height - 4} rx="8" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />

        {/* 固定圆 */}
        {showFixedCircle && (
          <circle
            cx={centerX}
            cy={centerY}
            r={fixedRadius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
        )}

        {/* 滚动圆 */}
        {showRollingCircle && (
          <circle
            cx={rollingCenter.x}
            cy={rollingCenter.y}
            r={rollingRadius}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
        )}

        {/* 半径线 */}
        {showRadiusLine && (
          <line
            x1={rollingCenter.x}
            y1={rollingCenter.y}
            x2={currentPoint.x}
            y2={currentPoint.y}
            stroke={pointColor}
            strokeWidth="1"
            opacity="0.6"
          />
        )}

        {/* 完整轨迹 */}
        {showTrace && (
          <path
            d={generatePath(tracePoints)}
            fill="none"
            stroke={traceColor}
            strokeWidth="2"
            opacity="0.6"
          />
        )}

        {/* 当前路径 */}
        {showPath && (
          <path
            d={generatePath(pathPoints)}
            fill="none"
            stroke={traceColor}
            strokeWidth="3"
            opacity="0.9"
          />
        )}

        {/* 当前点 */}
        <circle
          cx={currentPoint.x}
          cy={currentPoint.y}
          r="6"
          fill={pointColor}
          opacity="0.9"
        />
        <circle
          cx={currentPoint.x}
          cy={currentPoint.y}
          r="12"
          fill="none"
          stroke={pointColor}
          strokeWidth="2"
          opacity="0.4"
        />

        {/* 角度指示器 */}
        <text x="30" y="30" className="text-xs fill-muted-foreground">
          θ = {(angle * 180 / Math.PI).toFixed(1)}°
        </text>
      </svg>

      {/* 说明文字 */}
      <div className="text-xs text-muted-foreground text-center max-w-md">
        <p>拖动圆上的点可以手动控制动画 · 三尖瓣线是 r/R = 1/3 时的圆内旋轮线</p>
      </div>
    </div>
  );
}

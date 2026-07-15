"use client";

import { useState, useRef, useEffect, useMemo } from "react";

// ── Canvas constants ──────────────────────────────────────────────────────────
const SIZE = 500;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 195; // fixed circle radius (px)

// ── Math helpers ──────────────────────────────────────────────────────────────

/** Parametric hypocycloid point at angle θ with rolling ratio r/R = ratio */
function hypoPt(theta: number, ratio: number): { x: number; y: number } {
  const r = R * ratio;
  const arm = R - r; // center-to-center distance
  const x = arm * Math.cos(theta) + r * Math.cos((arm / r) * theta);
  const y = arm * Math.sin(theta) - r * Math.sin((arm / r) * theta);
  return { x: CX + x, y: CY - y };
}

function toPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  return "M " + pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ");
}

// ── Presets ───────────────────────────────────────────────────────────────────
const PRESETS: { ratio: number; name: string; desc: string }[] = [
  { ratio: 1 / 3, name: "三尖瓣", desc: "Deltoid (3 cusps)" },
  { ratio: 1 / 4, name: "四尖瓣", desc: "Astroid (4 cusps)" },
  { ratio: 1 / 5, name: "五尖瓣", desc: "5-cusped" },
  { ratio: 1 / 2, name: "直径线", desc: "Diameter (degenerate)" },
];

// ── Color palette (avoids undefined CSS vars) ─────────────────────────────────
const C = {
  fixed: "#d1d5db",       // fixed circle ring
  fixedFill: "none",
  rolling: "#4361ee",     // rolling circle
  trace: "#7209b7",       // full ghost trace
  path: "#7209b7",        // live path
  point: "#7209b7",       // tracing point
  spoke: "#9ca3af",       // dashed arm lines
  contact: "#6b7280",     // contact dot
  bg: "#f8f9fb",
  border: "#e5e7eb",
  label: "#6b7280",
  labelAccent: "#4361ee",
  labelPoint: "#7209b7",
  text: "#374151",
  muted: "#9ca3af",
  ctrlBg: "#f3f4f6",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Tricuspoid() {
  // Core animation state
  const [ratio, setRatio] = useState(1 / 3);
  const [angle, setAngle] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(0.8); // rad/s

  // Display toggles
  const [showFixed, setShowFixed] = useState(true);
  const [showRolling, setShowRolling] = useState(true);
  const [showTrace, setShowTrace] = useState(true);
  const [showPath, setShowPath] = useState(true);
  const [showSpokes, setShowSpokes] = useState(true);
  const [showContact, setShowContact] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  // Refs for animation and drag
  const rafRef = useRef<number>(0);
  const lastTRef = useRef<number>(0);
  const isDragging = useRef(false);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  // ── Animation loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(rafRef.current);
      lastTRef.current = 0;
      return;
    }
    const tick = (t: number) => {
      if (lastTRef.current !== 0) {
        const dt = (t - lastTRef.current) / 1000;
        setAngle((a) => (a + speedRef.current * dt) % (2 * Math.PI));
      }
      lastTRef.current = t;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTRef.current = 0;
    };
  }, [isPlaying]);

  // ── Derived geometry ────────────────────────────────────────────────────────
  const r = R * ratio;
  const arm = R - r;

  const rollingCx = CX + arm * Math.cos(angle);
  const rollingCy = CY - arm * Math.sin(angle);

  // Contact point: where rolling circle touches fixed circle boundary
  const contactX = CX + R * Math.cos(angle);
  const contactY = CY - R * Math.sin(angle);

  // Self-rotation angle (rolling without slipping): arm/r * θ
  const selfRot = (arm / r) * angle;

  // Tracing point P
  const { x: px, y: py } = hypoPt(angle, ratio);

  // ── Memoised paths ──────────────────────────────────────────────────────────
  const tracePath = useMemo(() => {
    if (!showTrace) return "";
    const N = 900;
    const pts = Array.from({ length: N + 1 }, (_, i) =>
      hypoPt((i / N) * 2 * Math.PI, ratio)
    );
    return toPath(pts);
  }, [ratio, showTrace]);

  const partialPath = useMemo(() => {
    if (!showPath || angle < 0.005) return "";
    const N = Math.max(3, Math.ceil((angle / (2 * Math.PI)) * 720));
    const pts = Array.from({ length: N + 1 }, (_, i) =>
      hypoPt((i / N) * angle, ratio)
    );
    return toPath(pts);
  }, [ratio, angle, showPath]);

  // ── Drag interaction ────────────────────────────────────────────────────────
  const onSVGMouseDown = () => {
    isDragging.current = true;
    setIsPlaying(false);
  };
  const onSVGMouseUp = () => { isDragging.current = false; };
  const onSVGMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scale = SIZE / rect.width;
    const mx = (e.clientX - rect.left) * scale - CX;
    const my = -((e.clientY - rect.top) * scale - CY);
    setAngle(((Math.atan2(my, mx) + 4 * Math.PI) % (2 * Math.PI)));
  };

  // ── Display values ──────────────────────────────────────────────────────────
  const angleDeg = ((angle * 180) / Math.PI).toFixed(1);
  const cusps = (1 / ratio).toFixed(2);
  const rStr = ratio.toFixed(3);
  const progress = ((angle / (2 * Math.PI)) * 100).toFixed(0);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* ── Main row: canvas + controls ────────────────────────────────────── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-start" }}>

        {/* SVG canvas */}
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{
              width: "100%", height: "auto", borderRadius: "1rem",
              border: `1.5px solid ${C.border}`, background: C.bg,
              cursor: isDragging.current ? "grabbing" : "crosshair",
              userSelect: "none", display: "block",
            }}
            onMouseDown={onSVGMouseDown}
            onMouseMove={onSVGMouseMove}
            onMouseUp={onSVGMouseUp}
            onMouseLeave={onSVGMouseUp}
          >
            {/* Fixed circle */}
            {showFixed && (
              <circle cx={CX} cy={CY} r={R} fill="none" stroke={C.fixed} strokeWidth="1.5" />
            )}

            {/* Ghost trace (full 2π cycle, dimmed) */}
            {showTrace && tracePath && (
              <path d={tracePath} fill="none" stroke={C.trace} strokeWidth="1.5" opacity="0.25" />
            )}

            {/* Live partial path */}
            {showPath && partialPath && (
              <path d={partialPath} fill="none" stroke={C.path} strokeWidth="2.5" opacity="0.9"
                strokeLinecap="round" strokeLinejoin="round" />
            )}

            {/* Dashed arm: origin → rolling center */}
            {showSpokes && (
              <line
                x1={CX} y1={CY} x2={rollingCx} y2={rollingCy}
                stroke={C.spoke} strokeWidth="1" strokeDasharray="5,4" opacity="0.7"
              />
            )}

            {/* Rolling circle */}
            {showRolling && (
              <>
                <circle
                  cx={rollingCx} cy={rollingCy} r={r}
                  fill={C.rolling} fillOpacity="0.07"
                  stroke={C.rolling} strokeWidth="1.5" strokeDasharray="7,5"
                />
                {/* Self-rotation spoke inside rolling circle */}
                <line
                  x1={rollingCx} y1={rollingCy}
                  x2={rollingCx + r * Math.cos(selfRot)}
                  y2={rollingCy - r * Math.sin(selfRot)}
                  stroke={C.rolling} strokeWidth="1" opacity="0.5"
                />
              </>
            )}

            {/* Spoke: rolling center → tracing point P */}
            {showSpokes && (
              <line
                x1={rollingCx} y1={rollingCy} x2={px} y2={py}
                stroke={C.rolling} strokeWidth="1.5" opacity="0.75"
              />
            )}

            {/* Contact point (where circles touch) */}
            {showContact && (
              <>
                <line
                  x1={CX} y1={CY} x2={contactX} y2={contactY}
                  stroke={C.contact} strokeWidth="0.7" strokeDasharray="3,4" opacity="0.4"
                />
                <circle cx={contactX} cy={contactY} r="4.5"
                  fill="white" stroke={C.contact} strokeWidth="1.5" />
              </>
            )}

            {/* Origin dot */}
            <circle cx={CX} cy={CY} r="3" fill={C.spoke} />

            {/* Rolling center dot */}
            {showRolling && (
              <circle cx={rollingCx} cy={rollingCy} r="3.5" fill={C.rolling} opacity="0.85" />
            )}

            {/* Tracing point P */}
            <circle cx={px} cy={py} r="8" fill={C.point} />
            <circle cx={px} cy={py} r="16" fill="none" stroke={C.point} strokeWidth="1.5" opacity="0.25" />

            {/* Labels */}
            {showLabels && (
              <g fontSize="12" fontFamily="ui-monospace, monospace">
                <text x="14" y="24" fill={C.label}>θ = {angleDeg}°</text>
                <text x="14" y="42" fill={C.label}>r/R = {rStr}</text>
                <text x="14" y="60" fill={C.label}>{progress}% 完成</text>
                {/* R label */}
                <text x={CX + R * 0.68} y={CY - R * 0.68 + 14}
                  fill={C.label} fontSize="11">R</text>
                {/* r label near rolling circle */}
                {showRolling && r > 15 && (
                  <text
                    x={rollingCx + r * 0.6 + 4}
                    y={rollingCy - r * 0.6 - 4}
                    fill={C.labelAccent} fontSize="11">r</text>
                )}
                {/* P label */}
                <text x={px + 10} y={py - 4} fill={C.labelPoint} fontSize="13" fontWeight="bold">P</text>
                {/* Contact label */}
                {showContact && (
                  <text x={contactX + 8} y={contactY - 6} fill={C.muted} fontSize="10">接触点</text>
                )}
              </g>
            )}
          </svg>

          {/* Progress bar */}
          <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{
              flex: 1, height: "4px", borderRadius: "2px",
              background: C.border, overflow: "hidden",
            }}>
              <div style={{
                height: "100%", borderRadius: "2px",
                background: C.point,
                width: `${(angle / (2 * Math.PI)) * 100}%`,
                transition: "width 0.05s linear",
              }} />
            </div>
            <span style={{ fontSize: "0.7rem", color: C.muted, fontFamily: "monospace", minWidth: "2.5rem" }}>
              {angleDeg}°
            </span>
          </div>

          <p style={{ fontSize: "0.72rem", color: C.muted, textAlign: "center", marginTop: "0.4rem" }}>
            拖动画布手动控制角度 · 绿点随滚动圆运动
          </p>
        </div>

        {/* Controls panel */}
        <div style={{
          width: "260px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "1.25rem",
        }}>

          {/* ── Presets ── */}
          <section>
            <div style={styles.sectionTitle}>常见旋轮线</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
              {PRESETS.map((p) => {
                const active = Math.abs(ratio - p.ratio) < 0.002;
                return (
                  <button
                    key={p.name}
                    onClick={() => { setRatio(p.ratio); setAngle(0); }}
                    title={p.desc}
                    style={{
                      ...styles.btn,
                      borderColor: active ? "#4361ee" : C.border,
                      background: active ? "#4361ee18" : "transparent",
                      color: active ? "#4361ee" : C.text,
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Rolling ratio slider ── */}
          <section>
            <div style={styles.sectionTitle}>
              滚动比 r/R = <span style={{ color: C.text, fontFamily: "monospace" }}>{rStr}</span>
            </div>
            <div style={{ fontSize: "0.75rem", color: C.muted, marginBottom: "0.4rem" }}>
              ≈ {cusps} 尖点
            </div>
            <input
              type="range" min="0.1" max="0.499" step="0.001"
              value={ratio}
              onChange={(e) => { setRatio(parseFloat(e.target.value)); setAngle(0); }}
              style={{ width: "100%", accentColor: "#4361ee" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: C.muted, marginTop: "0.2rem" }}>
              <span>0.1 (10尖)</span><span>0.5 (直线)</span>
            </div>
          </section>

          {/* ── Animation controls ── */}
          <section>
            <div style={styles.sectionTitle}>动画控制</div>
            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.75rem" }}>
              <button
                onClick={() => setIsPlaying((p) => !p)}
                style={{
                  ...styles.btn,
                  flex: 1,
                  background: isPlaying ? "#4361ee" : "transparent",
                  color: isPlaying ? "#fff" : C.text,
                  borderColor: isPlaying ? "#4361ee" : C.border,
                  fontWeight: 500,
                }}
              >
                {isPlaying ? "⏸ 暂停" : "▶ 播放"}
              </button>
              <button
                onClick={() => { setAngle(0); setIsPlaying(false); }}
                style={{ ...styles.btn, color: C.text, borderColor: C.border }}
                title="重置到起点"
              >
                ↺ 重置
              </button>
            </div>

            <div style={styles.sectionTitle}>
              速度 <span style={{ color: C.text, fontFamily: "monospace" }}>{speed.toFixed(1)} rad/s</span>
            </div>
            <input
              type="range" min="0.1" max="4.0" step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: "#4361ee" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: C.muted, marginTop: "0.2rem" }}>
              <span>慢 0.1</span><span>快 4.0</span>
            </div>
          </section>

          {/* ── Display toggles ── */}
          <section>
            <div style={styles.sectionTitle}>显示选项</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {([
                ["固定圆", showFixed, setShowFixed],
                ["滚动圆", showRolling, setShowRolling],
                ["完整轨迹 (淡色)", showTrace, setShowTrace],
                ["当前路径", showPath, setShowPath],
                ["臂/轮辐连线", showSpokes, setShowSpokes],
                ["接触点", showContact, setShowContact],
                ["参数标注", showLabels, setShowLabels],
              ] as [string, boolean, (v: boolean) => void][]).map(([label, val, setter]) => (
                <label key={label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", cursor: "pointer", color: C.text, userSelect: "none" }}>
                  <input type="checkbox" checked={val} onChange={(e) => setter(e.target.checked)} style={{ accentColor: "#4361ee" }} />
                  {label}
                </label>
              ))}
            </div>
          </section>

          {/* ── Current state readout ── */}
          <section>
            <div style={{ ...styles.infoBox }}>
              <div style={styles.sectionTitle}>当前状态</div>
              <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.78rem", color: C.text, lineHeight: 1.8 }}>
                <div>θ = {angleDeg}°</div>
                <div>P.x = {(px - CX).toFixed(2)}</div>
                <div>P.y = {(CY - py).toFixed(2)}</div>
                <div style={{ color: C.muted, borderTop: `1px solid ${C.border}`, paddingTop: "0.3rem", marginTop: "0.3rem" }}>
                  R = {R}px, r = {r.toFixed(1)}px
                </div>
                <div style={{ color: C.muted }}>R/r = {(R / r).toFixed(2)}</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── Formula panel ────────────────────────────────────────────────────── */}
      <div style={{ ...styles.infoBox, padding: "1rem 1.25rem" }}>
        <div style={{ ...styles.sectionTitle, marginBottom: "0.75rem" }}>参数方程（圆内旋轮线 Hypocycloid）</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.85rem", color: C.text, lineHeight: 2 }}>
              <div>x(θ) = (R − r)·cos θ  +  r·cos(((R−r)/r)·θ)</div>
              <div>y(θ) = (R − r)·sin θ  −  r·sin(((R−r)/r)·θ)</div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.78rem", color: C.muted, lineHeight: 2 }}>
              <div>当前代入值：R = {R}, r = {r.toFixed(1)}</div>
              <div>(R−r)/r = {(arm / r).toFixed(3)}</div>
              <div>θ ∈ [0, 2π]，已转过 {angleDeg}°</div>
              {Math.abs(ratio - 1 / 3) < 0.002 && (
                <div style={{ color: "#7209b7", marginTop: "0.25rem" }}>
                  ★ r/R = 1/3 → 标准三尖瓣线（Deltoid）
                </div>
              )}
              {Math.abs(ratio - 1 / 4) < 0.002 && (
                <div style={{ color: "#7209b7", marginTop: "0.25rem" }}>
                  ★ r/R = 1/4 → 星形线（Astroid）
                </div>
              )}
              {Math.abs(ratio - 1 / 2) < 0.002 && (
                <div style={{ color: "#7209b7", marginTop: "0.25rem" }}>
                  ★ r/R = 1/2 → 退化为直径（线段）
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const styles = {
  sectionTitle: {
    fontSize: "0.7rem",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "#9ca3af",
    marginBottom: "0.5rem",
  },
  btn: {
    padding: "0.35rem 0.6rem",
    borderRadius: "0.5rem",
    border: "1px solid #e5e7eb",
    background: "transparent",
    cursor: "pointer",
    fontSize: "0.78rem",
    transition: "all 0.15s",
    textAlign: "left" as const,
  },
  infoBox: {
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
    borderRadius: "0.75rem",
    padding: "0.75rem",
  },
} as const;

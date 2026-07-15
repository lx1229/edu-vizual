import { lazy } from "react";
import Tricuspoid from "@/components/viz/Tricuspoid";

interface VizDefinition {
  component: React.LazyExoticComponent<(...args: any) => any>;
  config: Record<string, any>;
}

const vizRegistry = new Map<string, VizDefinition>();

export function registerViz(id: string, component: React.LazyExoticComponent<(...args: any) => any>, config?: Record<string, any>) {
  vizRegistry.set(id, { component, config: config || {} });
}

export function getViz(id: string): VizDefinition | undefined {
  return vizRegistry.get(id);
}

export function getAllViz(): Map<string, VizDefinition> {
  return vizRegistry;
}

export const VIZ_COMPONENTS = getAllViz();

// 注册三尖瓣线可视化组件
registerViz("tricuspoid", lazy(() => Promise.resolve({ default: Tricuspoid })), {
  rollingRatio: 1 / 3,
  showFixedCircle: true,
  showRollingCircle: true,
  showTrace: true,
  showPath: true,
  showRadiusLine: true,
  autoRotate: true,
  speed: 0.02,
  traceColor: "hsl(var(--math))",
  pointColor: "hsl(var(--accent))",
});

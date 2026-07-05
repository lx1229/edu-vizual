import { lazy } from "react";

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

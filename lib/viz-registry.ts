import Tricuspoid from "@/components/viz/Tricuspoid";
import LimitExplorer from "@/components/viz/LimitExplorer";
import MatrixVisualizer from "@/components/viz/MatrixVisualizer";

// Plain object map from viz ID → React component
export const VIZ_COMPONENTS: Record<string, React.ComponentType<any>> = {
  "tricuspoid": Tricuspoid,
  "limit-explorer": LimitExplorer,
  "matrix-visualizer": MatrixVisualizer,
};

import Tricuspoid from "@/components/viz/Tricuspoid";

// Plain object map from viz ID → React component
export const VIZ_COMPONENTS: Record<string, React.ComponentType<any>> = {
  "tricuspoid": Tricuspoid,
};

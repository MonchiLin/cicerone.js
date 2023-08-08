export type OffsetsFunction = (arg0: {
  popper: Rect;
  reference: Rect;
  placement: Placement;
}) => [number | null | undefined, number | null | undefined];

export  type Rect = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type BasePlacement = "top" | "bottom" | "right" | "left"
type AutoPlacement = "auto" | "auto-start" | "auto-end";
type VariationPlacement = "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end";
export type Placement = AutoPlacement | BasePlacement | VariationPlacement;

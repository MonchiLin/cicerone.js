import type {Placement, OffsetsFunction, Rect} from "./re-export";

/**
 * 
 * A stage is a Highlighting target.
 * if it's a string, it's a query selector.
 * if it's an Element, it's a DOM element.
 * if it's a Rect, it's a bounding box.
 * But finally, it will be converted to a Rect.
 */
export type Stage = string
  | Element
  | Rect

export type HighlightState = {
  stage: Stage[]
  placement?: Placement,
  popoverOffset?: OffsetsFunction | [number, number],
  backdropType: ""
}

export type HighlightGlobalConfig = {
  // The default placement of the popover
  placement?: Placement,
  // The default offset of the popover
  popoverOffset?: OffsetsFunction | [number, number],
  
}

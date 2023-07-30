import type {OffsetsFunction, Placement, Rect} from "./re-export";

export interface IPopover {
  render(context: PopoverRenderContext): void
}

export interface PopoverRenderContext {
  rects: Rect[];
  stageIndex: number;
  rootEl: HTMLElement;
}

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

export type BackdropType = "opacityColor" | "blur"
export type BackdropFunction = {
  // if use opacityColor
  // default as #000
  color?: string,
  // default as 0.5
  opacity?: number,
  // if use blur default
  // default as 5
  blur?: number,
}

export type HighlightState = {
  stage: Stage[]
  placement?: Placement,
  popoverOffset?: OffsetsFunction | [number, number],
  backdropType?: BackdropType,
  backdropFunction?: BackdropFunction,
  backdropVisibility?: boolean,
  popoverFactory?: () => IPopover,
}

export type HighlightGlobalConfig = {
  zIndex: number,
  placement: Placement,
  popoverOffset: OffsetsFunction | [number, number],
  backdropType: BackdropType,
  backdropFunction: BackdropFunction,
  backdropVisibility: boolean,
  popoverFactory?: () => IPopover,
}

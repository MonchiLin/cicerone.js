import type {OffsetsFunction, Placement, Rect} from "./re-export";

export interface StageRenderingContext {
  focuses: IStageFocus[],
  popover?: IStagePopover[],
  stageIndex: number;
  rootEl: HTMLElement;
}

export type StageFocusCtorParams = {
  focusElementState: FocusElementState;
}

export interface IStagePopover {
  render(context: StageRenderingContext): void
}

export interface IStageFocus {
  render(context: StageRenderingContext): void
}

/**
 *
 * A stage is a Highlighting target.
 * if it's a string, it's a query selector.
 * if it's an Element, it's a DOM element.
 * if it's a Rect, it's a bounding box.
 * But finally, it will be converted to a Rect.
 */
export type FocusElement = string
  | Element
  | Rect

export interface FocusElementState {
  rect: Rect;
  el?: Element;
  areaKind: "element" | "rect"
}

export type BackdropType = "opacityColor" | "blur"
export type BackdropFunction = {
  // if you use opacityColor
  // default as #000
  color?: string,
  // default as 0.5
  opacity?: number,
  // if use blur default
  // default as 5
  blur?: number,
}

export type StageState = {
  focusGroup: IStageFocus[][];
  popoverGroup?: IStagePopover[][];
  rootEl?: HTMLElement;
  stageIndex?: number;
  placement?: Placement,
  popoverOffset?: OffsetsFunction | [number, number],
  backdropType?: BackdropType,
  backdropFunction?: BackdropFunction,
  backdropVisibility?: boolean,
}

export type CiceroneGlobalConfig = {
  zIndex: number,
  placement: Placement,
  popoverOffset: OffsetsFunction | [number, number],
  backdropType: BackdropType,
  backdropFunction: BackdropFunction,
  backdropVisibility: boolean,
  popoverFactory?: () => IStagePopover,
}

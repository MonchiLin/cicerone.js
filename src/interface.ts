import type { OffsetsFunction, Placement, Rect } from "./re-export";
import type { TypedEvent } from "./typed-event";

export interface StageRenderingContext {
  readonly rootEl: HTMLElement;
  readonly sharedConfig: SharedConfig;
  readonly eventEmitter: TypedEvent<CiceroneEvents>;
}

export interface StagePopoverRenderingContext {
  readonly rootEl: HTMLElement;
  readonly focuses: IStageFocus[];
  readonly sharedConfig: SharedConfig;
  readonly eventEmitter: TypedEvent<CiceroneEvents>;
}

export type StageFocusCtorParams = {
  focusElementState: FocusElementState;
}

export interface IStage {
  render(context: StageRenderingContext): void
  destroy(): void
}

export interface IStagePopover {
  render(popoverRenderingContext: StagePopoverRenderingContext): void
  destroy(): void
}

export interface IStageFocus {
  rect(): Rect;
}

export type CiceroneEvents = "overlay:click"

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

export interface SharedConfig {
  maskClosable?: boolean
  onOverlayClick?: (e: MouseEvent) => void
  backdropType?: BackdropType
  backdropFunction?: BackdropFunction
  backdropVisibility?: boolean
  placement?: Placement
  popoverOffset?: OffsetsFunction | [number, number]
  zIndex?: number
}

export interface StageState {
  focuses: IStageFocus[]
  popovers?: IStagePopover[]
}

export interface SchedulerState extends SharedConfig {
  stages: IStage[]
  rootEl?: HTMLElement
  stageIndex?: number
  onRenderStart?: (context: StageRenderingContext) => void
  onRenderEnd?: (context: StageRenderingContext) => void
}

export interface CiceroneGlobalConfig extends SharedConfig {
}


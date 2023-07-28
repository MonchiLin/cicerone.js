import {Rect} from "./re-export";
import {Popover} from "./popover";
import {createOverlaySvg} from "./svg";

type CtorParams = {
  rects: Rect[];
  popover?: Popover;
}

export class HighlightingRect {
  private rects: Rect[];
  private popover?: Popover;

  constructor(params: CtorParams) {
    this.rects = params.rects
    this.popover = params.popover
  }

  /**
   * Dynamic update the rect
   */
  public update(rect: Rect[]) {
    this.rects = rect;
    this.calculate();
  }

  /**
   * Destroy the highlight area
   */
  public destroy() {

  }

  /**
   * highlight the highlighting area
   */
  public highlight() {
    const svg = createOverlaySvg(this.rects[0])
    document.body.appendChild(svg)
  }
  
  /**
   * Draw the highlight area
   */
  private render() {

  }

  /**
   * Calculate the highlight area
   * @private
   */
  private calculate() {

  }

}

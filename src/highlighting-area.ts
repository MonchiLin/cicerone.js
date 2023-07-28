import {Rect} from "./re-export";
import {createOverlaySvg} from "./svg";
import {onDriverClick} from "./unclassified";
import {IPopover} from "./interface";
import "./style.css"

type CtorParams = {
  rects: Rect[];
  popover?: IPopover;
}

export class HighlightingRect {
  private rects: Rect[];
  private popover?: IPopover;
  private popoverBox?: Element;
  private overlaySvg?: SVGSVGElement;

  constructor(params: CtorParams) {
    this.rects = params.rects
    this.popover = params.popover
  }

  /**
   * Dynamic update the rect
   */
  public update(rect: Rect[]) {
    this.rects = rect;
    this.render();
  }

  /**
   * Destroy the highlight area
   */
  public destroy() {
    if (this.overlaySvg) {
      document.body.removeChild(this.overlaySvg);
      this.overlaySvg = undefined;
    }
    if (this.popoverBox) {
      document.body.removeChild(this.popoverBox);
      this.popoverBox = undefined;
    }
  }
  
  /**
   * Draw the highlight area
   */
  private render() {
    this.destroy();
    this.overlaySvg = createOverlaySvg(this.rects[0])
    onDriverClick(this.overlaySvg, e => {
      console.log(this.overlaySvg)
    })
    document.body.appendChild(this.overlaySvg)
    this.popover?.render()
  }
  
  private renderPopover() {
    if (!this.popover) {
      return;
    }
    if (!this.popoverBox) {
      this.popoverBox = document.createElement("div");
      this.popoverBox.classList.add("driver-popover");
    }
    this.popover.render();
  }

  /**
   * Calculate the highlight area
   * @private
   */
  private calculate() {

  }

}

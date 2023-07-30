import {Rect} from "./re-export";
import {createOverlaySvg} from "./svg";
import {onDriverClick} from "./unclassified";
import {IPopover, PopoverRenderContext} from "./interface";

type CtorParams = {
  rects: Rect[][];
  popover?: IPopover;
  stageIndex?: number;
}

export class HighlightingRect {
  private rectGroups: Rect[][];
  private popover?: IPopover;
  private overlaySvg?: SVGSVGElement;
  private rootEl?: HTMLElement;
  public stageIndex: number;

  /**
   * Generate render context
   */
  private get renderContext(): PopoverRenderContext {
    return {
      rects: this.rectGroups[this.stageIndex],
      stageIndex: this.stageIndex,
      rootEl: this.rootEl!,
    }
  }

  constructor(params: CtorParams) {
    this.rectGroups = params.rects
    this.popover = params.popover
    this.stageIndex = params.stageIndex || 0;
  }

  /**
   * Dynamic update the rect
   */
  public update(rectGroups: Rect[][]) {
    this.rectGroups = rectGroups;
    this.render();
  }

  /**
   * Destroy the highlight area
   */
  public destroy() {
    if (!this.rootEl) {
      return;
    }
    if (this.overlaySvg) {
      this.rootEl.removeChild(this.overlaySvg);
      this.overlaySvg = undefined;
    }
  }


  /**
   * Draw the highlight area
   */
  private render() {
    this.destroy();
    this.rootEl = document.createElement("div");
    this.rootEl.classList.add("cable-car")
    document.body.appendChild(this.rootEl)
    this.overlaySvg = createOverlaySvg(this.rectGroups[this.stageIndex][0])
    onDriverClick(this.overlaySvg, e => {
      console.log(this.overlaySvg)
    })
    this.rootEl.appendChild(this.overlaySvg)

    if (this.popover) {
      this.popover.render(this.renderContext);
    }
  }

  /**
   * Calculate the highlight area
   * @private
   */
  private calculate() {

  }

}

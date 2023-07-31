import {createOverlaySvg} from "./svg";
import {onDriverClick} from "./unclassified";
import {FocusElementState, IStageFocus, StageFocusCtorParams, StageRenderingContext} from "./interface";

export class StageFocus implements IStageFocus {
  private focusElementState: FocusElementState;
  private overlaySvg?: SVGSVGElement;
  private renderingContext!: StageRenderingContext;

  constructor(params: StageFocusCtorParams) {
    this.focusElementState = params.focusElementState
  }

  /**
   * Destroy the highlight area
   */
  public destroy() {
  }


  /**
   * Draw the highlight area
   */
  public render(context: StageRenderingContext) {
    this.renderingContext = context;
    this.destroy();
    this.overlaySvg = createOverlaySvg(this.focusElementState.rect)
    onDriverClick(this.overlaySvg, e => {
      console.log(this.overlaySvg)
    })
    this.renderingContext.rootEl.appendChild(this.overlaySvg)
  }

  /**
   * Calculate the highlight area
   * @private
   */
  private calculate() {

  }

}

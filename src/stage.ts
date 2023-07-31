import {
  IStage,
  IStageFocus,
  IStagePopover,
  StagePopoverRenderingContext,
  StageRenderingContext,
  StageState
} from "./interface";
import {createOverlaySvg} from "./svg";
import {onDriverClick} from "./unclassified";

export class Stage implements IStage {
  private focuses: IStageFocus[];
  private popovers?: IStagePopover[];
  private stageRenderingContext!: StageRenderingContext;
  private overlaySvg?: SVGSVGElement;

  constructor(state: StageState) {
    this.focuses = state.focuses;
    this.popovers = state.popovers;
  }

  /**
   * Generate render context
   */
  private get stagePopoverRenderingContext(): StagePopoverRenderingContext {
    return {
      focuses: this.focuses,
      rootEl: this.stageRenderingContext.rootEl,
      sharedConfig: this.stageRenderingContext.sharedConfig,
    }
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
    this.stageRenderingContext = context;
    this.destroy();

    this.overlaySvg = createOverlaySvg(this.focuses[0].rect())
    this.stageRenderingContext.rootEl.appendChild(this.overlaySvg)
    onDriverClick(this.overlaySvg, e => {
      console.log(this.overlaySvg)
    })

    if (this.popovers) {
      this.popovers.forEach(popover => {
        popover.render(this.stagePopoverRenderingContext)
      })
    }
  }

  /**
   * Calculate the highlight area
   * @private
   */
  private calculate() {

  }

}

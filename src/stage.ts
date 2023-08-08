import { IStage, IStageFocus, IStagePopover, StagePopoverRenderingContext, StageRenderingContext, StageState } from "./interface";
import { createOverlaySvg } from "./svg";
import { onOverlayClick } from "./unclassified";

export class Stage implements IStage {
  private focuses: IStageFocus[];
  private popovers?: IStagePopover[];
  private renderingContext!: StageRenderingContext;
  private overlaySvg?: SVGSVGElement;
  private overlayListener?: () => void | undefined = undefined;

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
      rootEl: this.renderingContext.rootEl,
      sharedConfig: this.renderingContext.sharedConfig,
      eventEmitter: this.renderingContext.eventEmitter,
    }
  }

  /**
   * Destroy the highlight area
   */
  public destroy() {
    if (this.overlaySvg) {
      this.overlaySvg.remove()
      this.overlaySvg = undefined
    }
    if (this.overlayListener) {
      this.overlayListener()
      this.overlayListener = undefined
    }
    if (this.popovers) {
      this.popovers.forEach(popover => {
        popover.render(this.stagePopoverRenderingContext)
      })
    }
  }

  /**
   * Draw the highlight area
   */
  public render(context: StageRenderingContext) {
    this.renderingContext = context;
    this.destroy();

    this.overlaySvg = createOverlaySvg(this.focuses[0].rect())
    this.renderingContext.rootEl.appendChild(this.overlaySvg)
    this.overlayListener = onOverlayClick(this.overlaySvg, e => {
      this.renderingContext.eventEmitter.emit("overlay:click", e)
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

import { IStage, IStageFocus, IStagePopover, StagePopoverRenderingContext, StageRenderingContext, StageState } from "./interface";
import { createFocusSvg, createOverlay } from "./svg";
import { onOverlayClick } from "./unclassified";

export class Stage implements IStage {
  private focuses: IStageFocus[];
  private popovers?: IStagePopover[];
  private renderingContext!: StageRenderingContext;
  private overlaySvg?: SVGSVGElement;
  private overlayListener?: () => void | undefined = undefined;
  /**
   * Current rendering focuses SVGs
   * @private
   */
  private focusesSVGs: SVGElement[] = [];

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
    this.overlaySvg = createOverlay(this.renderingContext.sharedConfig)
    this.focuses.forEach(focus => {
      const focusSVG = this.renderingContext.sharedConfig.adjust(createFocusSvg(focus, this.renderingContext.sharedConfig))
      focus.preprocess(focusSVG)
      this.overlaySvg!.appendChild(focusSVG)
    })

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

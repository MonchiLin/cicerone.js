import {IStageFocus, IStagePopover, StageRenderingContext, StageState} from "./interface";


export class Stage {
  private focusGroup: IStageFocus[][];
  private popoverGroup?: IStagePopover[][];
  private rootEl: HTMLElement;
  public stageIndex: number;

  constructor(state: StageState) {
    this.stageIndex = state.stageIndex || 0;
    this.focusGroup = state.focusGroup;
    this.popoverGroup = state.popoverGroup;

    if (state.rootEl) {
      this.rootEl = state.rootEl;
    } else {
      this.rootEl = document.createElement("div");
      this.rootEl.classList.add("cable-car")
      document.body.appendChild(this.rootEl)
    }
  }

  public get currenStage() {
    return {
      focuses: this.focusGroup[this.stageIndex],
      popovers: this.popoverGroup ? this.popoverGroup[this.stageIndex] : undefined,
    }
  }

  /**
   * Generate render context
   */
  private get renderContext(): StageRenderingContext {
    return {
      ...this.currenStage,
      stageIndex: this.stageIndex,
      rootEl: this.rootEl!,
    }
  }

  /**
   * Destroy the highlight area
   */
  public destroy() {
    if (!this.rootEl) {
      return;
    }
  }

  /**
   * Draw the highlight area
   */
  private render() {
    this.destroy();
    document.body.appendChild(this.rootEl)

    this.currenStage.focuses.forEach(focus => {
      focus.render(this.renderContext)
    })

    if (this.currenStage.popovers) {
      this.currenStage.popovers.forEach(popover => {
        popover.render(this.renderContext)
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

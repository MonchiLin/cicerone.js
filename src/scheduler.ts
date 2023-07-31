import {IStage, SchedulerState, SharedConfig, StageRenderingContext} from "./interface";

export class Scheduler {
  public stageIndex: number;
  private rootEl: HTMLElement;
  private stages: IStage[];
  private sharedConfig: SharedConfig;

  constructor(state: SchedulerState) {
    this.stages = state.stages;

    if (state.rootEl) {
      this.rootEl = state.rootEl;
    } else {
      this.rootEl = document.createElement("div");
      this.rootEl.classList.add("cable-car")
      document.body.appendChild(this.rootEl)
    }

    this.stageIndex = 0;

    this.sharedConfig = {
      maskClosable: state.maskClosable,
      onOverlayClick: state.onOverlayClick,
      backdropType: state.backdropType,
      backdropFunction: state.backdropFunction,
      backdropVisibility: state.backdropVisibility,
      placement: state.placement,
      popoverOffset: state.popoverOffset,
      zIndex: state.zIndex,
    }
  }

  private get renderingContext(): StageRenderingContext {
    return {
      rootEl: this.rootEl,
      sharedConfig: this.sharedConfig,
    }
  }

  /**
   * Start the tourist guide
   */
  public render() {
    this.stages[this.stageIndex].render(this.renderingContext)
  }

  /**
   * Jump to the next step
   */
  public next() {
    if (this.stageIndex + 1 >= this.stages.length) {
      return;
    }
    this.stageIndex++;
    this.render();
  }

  /**
   * Jump to the previous step
   */
  public previous() {
    if (this.stageIndex - 1 < 0) {
      return;
    }
    this.stageIndex--;
    this.render();
  }

  /**
   * Jump to the specific step
   */
  public jumpTo(index: number) {
    if (index < 0 || index >= this.stages.length) {
      return;
    }
    this.stageIndex = index;
    this.render();
  }

  /**
   * Destroy the scheduler
   */
  public destroy() {

  }

}

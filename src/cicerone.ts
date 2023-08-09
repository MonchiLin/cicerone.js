import { CiceroneEvents, IStage, SchedulerState, SharedConfig, StageRenderingContext } from "./interface";
import { TypedEvent } from "./typed-event";
import { CiceroneGlobal } from "./global";

export class Cicerone {
  public stageIndex: number;
  private rootEl: HTMLElement;
  private stages: IStage[];
  private sharedConfig: Required<SharedConfig>;
  private eventEmitter: TypedEvent<CiceroneEvents>;

  /**
   * Declare as a member, avoid 'this' binding
   * @param e
   */
  private onOverlayClick = (e: MouseEvent | PointerEvent) => {
    console.log("overlay click")
    this.sharedConfig.onOverlayClick?.(e);
    if (this.sharedConfig.maskClosable) {
      this.destroy();
    }
  }

  constructor(state: SchedulerState) {

    this.sharedConfig = {
      maskClosable: state.maskClosable || CiceroneGlobal.maskClosable,
      onOverlayClick: state.onOverlayClick || CiceroneGlobal.onOverlayClick,
      backdropType: state.backdropType || CiceroneGlobal.backdropType,
      backdropFunction: state.backdropFunction || CiceroneGlobal.backdropFunction,
      backdropVisibility: state.backdropVisibility || CiceroneGlobal.backdropVisibility,
      placement: state.placement || CiceroneGlobal.placement,
      popoverOffset: state.popoverOffset || CiceroneGlobal.popoverOffset,
      zIndex: state.zIndex || CiceroneGlobal.zIndex,
      adjust: state.adjust || CiceroneGlobal.adjust,
    }

    this.stages = state.stages;

    if (state.rootEl) {
      this.rootEl = state.rootEl;
    } else {
      this.rootEl = document.createElement("div");
      this.rootEl.classList.add("cicerone")
      document.body.appendChild(this.rootEl)
    }

    this.stageIndex = 0;
    this.eventEmitter = new TypedEvent<CiceroneEvents>()
    this.eventEmitter.on("overlay:click", this.onOverlayClick)
  }

  private get renderingContext(): StageRenderingContext {
    return {
      rootEl: this.rootEl,
      sharedConfig: this.sharedConfig,
      eventEmitter: this.eventEmitter,
    }
  }

  public bootstrap() {
    this.render();
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
    this.stages.forEach(stage => {
      stage.destroy();
    })
    this.eventEmitter.destroy();
    this.rootEl.remove();
    document.body.classList.remove("cicerone-html-body")
  }

  /**
   * Start the tourist guide
   */
  private render() {
    document.body.classList.add("cicerone-html-body")
    this.stages[this.stageIndex].render(this.renderingContext)
  }

}

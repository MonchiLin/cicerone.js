import { FocusElementState, IStageFocus, StageFocusCtorParams } from "./interface";
import { Rect } from "./re-export";

export class StageFocus implements IStageFocus {
  private focusElementState: FocusElementState;

  constructor(params: StageFocusCtorParams) {
    this.focusElementState = params.focusElementState
  }

  rect(): Rect {
    return this.focusElementState.rect
  }

  /**
   * when the focus render, it will make some changes to the focusElement.
   * if the focusElement is a DOM element, it will add some attributes to it.
   *
   * @param svg
   */
  preprocess(svg: SVGElement) {
    if (this.focusElementState.el) {
      this.focusElementState.el.classList.add("cicerone-focus")
    }
  }

  preDestroy(svg:SVGElement) {
    if (this.focusElementState.el) {
      this.focusElementState.el.classList.remove("cicerone-focus")
    }
  }


}

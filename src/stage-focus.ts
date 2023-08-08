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
   * Calculate the highlight area
   * @private
   */
  private calculate() {

  }

}

import type {Stage} from "./interface";
import {HighlightState} from "./interface";
import type {Rect} from "./re-export";
import {Popover} from "./popover";
import {HighlightingRect} from "./highlighting-area";

/**
 * Convert a Stage to a Rect
 * @param stage
 */
export const toArea = (stage: Stage): Rect => {
  if (typeof stage === "string") {
    const element = document.querySelector(stage);
    if (!element) {
      throw new Error(`Element not found: ${stage}`);
    }
    return element.getBoundingClientRect();
  } else if (stage instanceof Element) {
    return stage.getBoundingClientRect();
  } else {
    return stage;
  }
}

/**
 * @param state
 * @param state.stage - required
 * @param state.placement - optional
 * @param state.offset - optional
 */
export const createHighlightingArea = (state: HighlightState) => {
  const rects = state.stage.map(toArea);
  const popover = new Popover()
  
  return new HighlightingRect({rects, popover})
}

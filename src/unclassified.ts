import type {Stage} from "./interface";
import {HighlightState} from "./interface";
import type {Rect} from "./re-export";
import {HighlightingRect} from "./highlighting-area";
import {CiceroneGlobal} from "./global";

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
  const popoverFactory = state.popoverFactory || CiceroneGlobal.popoverFactory
  const popover = popoverFactory ? popoverFactory({rects}) : undefined;

  return new HighlightingRect({rects, popover})
}

/**
 * Attaches click handler to the elements created by driver.js. It makes
 * sure to give the listener the first chance to handle the event, and
 * prevents all other pointer-events to make sure no external-library
 * ever knows the click happened.
 *
 * @param {Element} element Element to listen for click events
 * @param {(pointer: MouseEvent | PointerEvent) => void} listener Click handler
 * @param {(target: HTMLElement) => boolean} shouldPreventDefault Whether to prevent default action i.e. link clicks etc
 */
export function onDriverClick(
  element: Element,
  listener: (pointer: MouseEvent | PointerEvent) => void,
  shouldPreventDefault?: (target: HTMLElement) => boolean
) {
  const listenerWrapper = (e: MouseEvent | PointerEvent, listener?: (pointer: MouseEvent | PointerEvent) => void) => {
    const target = e.target as HTMLElement;
    if (!element.contains(target)) {
      return;
    }

    if (!shouldPreventDefault || shouldPreventDefault(target)) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }

    listener?.(e);
  };

  // We want to be the absolute first one to hear about the event
  const useCapture = true;

  // Events to disable
  document.addEventListener("pointerdown", listenerWrapper, useCapture);
  document.addEventListener("mousedown", listenerWrapper, useCapture);
  document.addEventListener("pointerup", listenerWrapper, useCapture);
  document.addEventListener("mouseup", listenerWrapper, useCapture);

  // Actual click handler
  document.addEventListener(
    "click",
    e => {
      listenerWrapper(e, listener);
    },
    useCapture
  );
}

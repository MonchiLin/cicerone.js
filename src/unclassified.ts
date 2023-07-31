import type {FocusElementState} from "./interface";
import {FocusElement} from "./interface";

/**
 * Convert a Stage to a Rect
 * @param stage
 */
export const toFocusElementState = (stage: FocusElement): FocusElementState => {
  if (typeof stage === "string") {
    const element = document.querySelector(stage);
    if (!element) {
      throw new Error(`Element not found: ${stage}`);
    }
    return {
      rect: element.getBoundingClientRect(),
      el: element,
      areaKind: "element",
    }
  } else if (stage instanceof Element) {
    return {
      rect: stage.getBoundingClientRect(),
      el: stage,
      areaKind: "element",
    }
  } else {
    return {
      rect: stage,
      areaKind: "rect",
    }
  }
}

/**
 * Convert a Stage to a Rect
 * @param stage
 */
export const toFocusElementStateMany = (stage: FocusElement[]): FocusElementState[] => {
  return stage.map(toFocusElementState)
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

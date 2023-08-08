import type { FocusElementState, SharedConfig } from "./interface";
import { FocusElement } from "./interface";
import { Cicerone } from "./cicerone";
import { StageFocus } from "./stage-focus";
import { Stage } from "./stage";

/**
 * Convert a Stage to a Rect
 * @param focusElement
 */
export const toFocusElementState = (focusElement: FocusElement): FocusElementState => {
  if (typeof focusElement === "string") {
    const element = document.querySelector(focusElement);
    if (!element) {
      throw new Error(`Element not found: ${focusElement}`);
    }
    return {
      rect: element.getBoundingClientRect(),
      el: element,
      areaKind: "element",
    }
  } else if (focusElement instanceof Element) {
    return {
      rect: focusElement.getBoundingClientRect(),
      el: focusElement,
      areaKind: "element",
    }
  } else {
    return {
      rect: focusElement,
      areaKind: "rect",
    }
  }
}

/**
 * Convert Stages to Rects
 * @param stage
 */
export const toFocusElementStateMany = (stage: FocusElement[]): FocusElementState[] => {
  return stage.map(toFocusElementState)
}

/**
 * The function rewrite from [driver.js](https://github.com/kamranahmedse/driver.js)
 * Thanks to the original author
 *
 * @param {Element} element Element to listen for click events
 * @param {(pointer: MouseEvent | PointerEvent) => void} listener Click handler
 * @param {(target: HTMLElement) => boolean} shouldPreventDefault Whether to prevent default action i.e. link clicks etc
 * @returns {() => void} Function to remove the listener
 */
export function onOverlayClick(
  element: Element,
  listener: (pointer: MouseEvent | PointerEvent) => void,
  shouldPreventDefault?: (target: HTMLElement) => boolean
): () => void {
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

  return () => {
    document.removeEventListener("pointerdown", listenerWrapper, useCapture);
    document.removeEventListener("mousedown", listenerWrapper, useCapture);
    document.removeEventListener("pointerup", listenerWrapper, useCapture);
    document.removeEventListener("mouseup", listenerWrapper, useCapture);
    document.removeEventListener("click", listenerWrapper, useCapture);
  }
}

export function highlightElement(focusElement: FocusElement, config: SharedConfig = {}) {
  return new Cicerone({
    ...config,
    stages: [
      new Stage({
        focuses: [
          new StageFocus({focusElementState: toFocusElementState(focusElement)})
        ]
      })
    ],
  })
}

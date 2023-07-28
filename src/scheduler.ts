import {HighlightingRect} from "./highlighting-area";

export class Scheduler {
  private highlightingRects: HighlightingRect[] = [];
  private activeIndex: number = 0;

  constructor() {
    
  }

  /**
   * Jump to the next step
   */
  public next() {
    
  }

  /**
   * Jump to the previous step
   */
  public previous() {
    
  }

  /**
   * Jump to the specific step
   */
  public jumpTo(index: number) {
    
  }

  /**
   * Destroy the scheduler
   */
  public destroy() {
    this.highlightingRects
      .forEach(rect => {
        rect.destroy();
      })
    this.highlightingRects = [];
    this.activeIndex = 0;
  }

  /**
   * Measure the step context
   * @param stepIndex
   * @private
   */
  private measure(stepIndex: number) {
    
  }

}
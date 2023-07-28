import {IPopover} from "./interface";

export class Popover implements IPopover {

  constructor() {
  }

  render(): void {
    throw new Error("If you want customize popover, you should override this method.")
  }
  
}
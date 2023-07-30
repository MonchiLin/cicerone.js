import {IPopover, PopoverRenderContext} from "./interface";

export class Popover implements IPopover {

  constructor() {
  }

  render(context: PopoverRenderContext): void {
    throw new Error("If you want customize popover, you should override this method.")
  }

}

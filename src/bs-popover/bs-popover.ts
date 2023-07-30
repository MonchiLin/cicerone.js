import {Popover} from "../popover";
import {PopoverRenderContext} from "../interface";

export interface BSPopoverOptions {
  title: string,
  content: string,
}

/**
 * A Bootstrap Tour Popover implementation
 * @see https://bootstraptour.com/
 *
 */
export class BSPopover extends Popover {
  private box!: HTMLElement;
  private header!: HTMLElement;
  private content!: HTMLElement;
  private navigation!: HTMLElement;
  private renderContext!: PopoverRenderContext;

  constructor(private options: BSPopoverOptions) {
    super();
  }


  render(context: PopoverRenderContext) {
    this.renderContext = context
    this.renderBox()
    this.renderHeader()
    this.renderContent()
    this.renderNavigation()
  }

  private renderBox() {
    if (this.box) {
      this.renderContext.rootEl.removeChild(this.box);
    }

    this.box = document.createElement("div");
    this.box.classList.add("bs-popover");
    this.renderContext.rootEl.appendChild(this.box);
  }

  private renderHeader() {
    if (this.header) {
      this.box.removeChild(this.header);
    }

    this.header = document.createElement("div");
    this.header.classList.add("bs-popover__header");
    this.header.textContent = this.options.title;
    this.box.appendChild(this.header);
  }

  private renderContent() {
    if (this.content) {
      this.box.removeChild(this.content);
    }

    this.content = document.createElement("div");
    this.content.classList.add("bs-popover__content");
    this.content.textContent = this.options.content;
    this.box.appendChild(this.content);
  }

  private renderNavigation() {
    if (this.navigation) {
      this.box.removeChild(this.navigation);
    }

    this.navigation = document.createElement("div");
    this.navigation.classList.add("bs-popover__navigation");
    this.navigation.innerHTML = `
      <button class="bs-popover__prev">Prev</button>
      <button class="bs-popover__next">Next</button>
    `;
    this.box.appendChild(this.navigation);
  }

}

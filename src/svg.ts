import { CiceroneGlobalConfig, IStageFocus, SharedConfig } from "./interface";

export function createOverlay(config: Required<CiceroneGlobalConfig>): SVGSVGElement {
  const windowX = window.innerWidth;
  const windowY = window.innerHeight;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("cicerone-overlay", "cicerone-overlay-animated");

  svg.setAttribute("viewBox", `0 0 ${windowX} ${windowY}`);
  svg.setAttribute("xmlSpace", "preserve");
  svg.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink");
  svg.setAttribute("version", "1.1");
  svg.setAttribute("preserveAspectRatio", "xMinYMin slice");

  svg.style.zIndex = config.zIndex.toString();
  svg.style.position = "fixed";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.pointerEvents = "none"

  return svg;
}

/**
 * Draw the focus area via path tag
 *
 * @param focus {IStageFocus}
 * @param config {Required<SharedConfig>}
 */
export function createFocusSvg(focus: IStageFocus, config: Required<SharedConfig>) {
  const { x, y, width, height } = focus.rect();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "path");

  svg.setAttribute("d", `M0 0 L${window.innerWidth} 0 L${window.innerWidth} ${window.innerHeight} L0 ${window.innerHeight} L0 0 M${x} ${y} L${x + width} ${y} L${x + width} ${y + height} L${x} ${y + height} L${x} ${y}`);
  svg.setAttribute("fill", "rgba(0, 0, 0, 0.5)");
  svg.setAttribute("stroke", "none");
  svg.setAttribute("stroke-width", "0");
  svg.setAttribute("stroke-dasharray", "none");
  svg.setAttribute("stroke-linecap", "butt");
  svg.setAttribute("stroke-linejoin", "miter");
  svg.setAttribute("stroke-miterlimit", "4");
  svg.setAttribute("stroke-opacity", "1");
  svg.setAttribute("fill-rule", "evenodd");
  svg.setAttribute("opacity", "1");
  svg.setAttribute("z-index", "1");

  return svg;
}



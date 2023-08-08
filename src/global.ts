import { CiceroneGlobalConfig } from "./interface";

export const CiceroneGlobal: CiceroneGlobalConfig = {
  zIndex: 1000,
  placement: "auto",
  popoverOffset: [0, 0],
  backdropType: "opacityColor",
  backdropFunction: {
    color: "#000",
    opacity: 0.5,
    blur: 5,
  },
  backdropVisibility: true,
  onOverlayClick: undefined,
  maskClosable: false,
}

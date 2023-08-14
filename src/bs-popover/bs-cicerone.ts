import { Cicerone } from "../cicerone";
import { StageFocus } from "../stage-focus";
import { FocusElement, SharedConfig } from "../interface";
import { toFocusElementState } from "../unclassified";
import { Stage } from "../stage";
import { Placement } from "../re-export";
import { BSPopover } from "./bs-popover";

export interface BSPopoverConfig {
  title?: string
  description?: string
  placement?: Placement
  nextBtnText?: string;
  prevBtnText?: string;
  doneBtnText?: string;
}

export interface BSAssembleConfig extends SharedConfig {
  focusElements: FocusElement[][];
  popoverConfigs: BSPopoverConfig[];
}

export namespace BSCicerone {
  export function assemble(assembleConfig: BSAssembleConfig): Cicerone {
    const stages = assembleConfig.focusElements.map((focusElements, index) => {

      const focuses = focusElements.map(focusElement => new StageFocus({
        focusElementState: toFocusElementState(focusElement),
      }))

      const popovers = new BSPopover({
        title: assembleConfig.popoverConfigs[index].title,
        description: assembleConfig.popoverConfigs[index].description,
      })

      return new Stage({
        focuses: focuses,
        popovers: [popovers],
      })
    })

    return new Cicerone({
      ...assembleConfig,
      stages: stages,
    })
  }
}

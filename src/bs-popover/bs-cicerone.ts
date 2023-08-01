import {Cicerone} from "../cicerone";
import {StageFocus} from "../stage-focus";
import {AssembleConfig} from "../interface";
import {toFocusElementState} from "../unclassified";
import {Stage} from "../stage";

export namespace BSCicerone {
  export function assemble(state: AssembleConfig): Cicerone {
    const stages = state.focusElements.map(focusElements => {

      const focuses = focusElements.map(focusElement => new StageFocus({
        focusElementState: toFocusElementState(focusElement),
      }))

      return new Stage({
        focuses: focuses,
        popovers: [],
      })
    })

    return new Cicerone({
      ...state,
      stages: stages,
    })
  }
}

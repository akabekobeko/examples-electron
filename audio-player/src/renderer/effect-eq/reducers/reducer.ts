import { ActionType, AppState } from '../Types'
import { finishConnect, finishSelectPreset, finishUpdateGain } from '../actions'
import { loadAppState } from './storage'
import { checkConnect } from './connect'
import { checkSelectPreset } from './selectPreset'
import { checkUpdateGain } from './updateGain'

type Actions =
  | ReturnType<typeof finishConnect>
  | ReturnType<typeof finishSelectPreset>
  | ReturnType<typeof finishUpdateGain>

/**
 * Adjust the state of the application according to the action.
 * @param state Current state.
 * @param action Action data.
 * @returns New State.
 */
const reducer = (state = loadAppState(), action: Actions): AppState => {
  switch (action.type) {
    case ActionType.FinishConnect:
      return checkConnect(state, action)

    case ActionType.FinishSelectPreset:
      return checkSelectPreset(state, action)

    case ActionType.FinishUpdateGain:
      return checkUpdateGain(state, action)

    default:
      return state
  }
}

export default reducer

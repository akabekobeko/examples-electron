import { AppState } from '../Types'
import { finishConnect } from '../actions'
import { saveAppState } from './storage'

/**
 * Check the result of finishConnect and generate a new state.
 * @param state Current state.
 * @param action Action of finishConnect.
 * @returns New state.
 */
export const checkConnect = (
  state: AppState,
  action: ReturnType<typeof finishConnect>
): AppState => {
  const newState = Object.assign({}, state, {
    connected: action.payload.connected
  })

  saveAppState(newState)
  return newState
}

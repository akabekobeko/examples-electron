import { updateMessage, updateWindowIds } from '../actions/'
import { ActionType, AppState } from '../Types'

type Actions =
  | ReturnType<typeof updateMessage>
  | ReturnType<typeof updateWindowIds>

const InitialState: AppState = {
  id: window.location.hash ? Number(window.location.hash.replace('#', '')) : 0,
  windowIds: [],
  message: ''
}

// Set window title
if (InitialState.id) {
  document.title += ` [${InitialState.id}]`
}

/**
 * Adjust the state of the application according to the action.
 * @param state Current state.
 * @param action Action data.
 * @returns New State.
 */
export const reducer = (state: AppState = InitialState, action: Actions) => {
  switch (action.type) {
    case ActionType.UpdateMessage:
      return Object.assign({}, state, {
        message: action.payload.message
      })

    case ActionType.UpdateWindowIds:
      return Object.assign({}, state, {
        windowIds: action.payload.windowIds.filter((id) => id !== state.id)
      })

    default:
      return state
  }
}

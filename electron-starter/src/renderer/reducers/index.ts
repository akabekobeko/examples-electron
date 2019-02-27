import {
  updateDateTime,
  requestShowURL,
  finishShowURL,
  finishShowOpenDialog,
  finishShowSaveDialog,
  finishShowMessageBox
} from '../actions/index'
import { ActionType, AppState } from '../Types'
import { checkUpdateDateTime, formatDate } from './updateDateTime'

type Actions =
  | ReturnType<typeof updateDateTime>
  | ReturnType<typeof requestShowURL>
  | ReturnType<typeof finishShowURL>
  | ReturnType<typeof finishShowOpenDialog>
  | ReturnType<typeof finishShowSaveDialog>
  | ReturnType<typeof finishShowMessageBox>

const InitialState: AppState = {
  url: 'https://github.com/akabekobeko/examples-electron',
  requestingShowURL: false,
  dateTime: formatDate()
}

/**
 * Adjust the state of the application according to the action.
 * @param state Current state.
 * @param action Action data.
 * @returns New State.
 */
const reducer = (state = InitialState, action: Actions): AppState => {
  switch (action.type) {
    case ActionType.UpdateTime:
      return checkUpdateDateTime(state, action)

    case ActionType.RequestShowURL:
      return Object.assign({}, state, {
        requestingShowURL: true
      })

    case ActionType.FinishShowURL:
      return Object.assign({}, state, {
        requestingShowURL: false
      })

    case ActionType.FinishShowOpenDialog:
      console.log(action.payload.paths)
      return state

    case ActionType.FinishShowSaveDialog:
      console.log(action.payload.path)
      return state

    case ActionType.FinishShowMessageBox:
      console.log(action.payload.button)
      return state

    default:
      return state
  }
}

export default reducer

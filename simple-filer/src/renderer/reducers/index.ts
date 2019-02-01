import { ActionType } from '../actions/index'
import { Action } from 'redux'

export type AppState = {
}

const InitialState: AppState = {
}

const reducer = (state = InitialState, action: Action) => {
  switch (action.type) {
    case ActionType.RequestEnumItems:

    /*
    return Object.assign({}, state, {
        requestingShowURL: true
      })
    */
      return state

    case ActionType.FinishEnumItems:
      return state

    default:
      return state
  }
}

export default reducer

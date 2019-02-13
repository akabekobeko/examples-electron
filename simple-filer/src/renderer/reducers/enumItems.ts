import { finishEnumItems } from '../actions/index'
import { AppState } from './types'

/**
 * Check the result of finishEnumItems and generate a new state.
 * @param state Current state.
 * @param action Action of finishEnumItems.
 * @returns New state.
 */
export const enumItems = (state: AppState, action: ReturnType<typeof finishEnumItems>): AppState => {
  return Object.assign({}, state, {
    items: action.payload.items.sort((a, b) => (a.isDirectory && b.isDirectory ? 0 : a.isDirectory ? -1 : 1))
  })
}

export default enumItems

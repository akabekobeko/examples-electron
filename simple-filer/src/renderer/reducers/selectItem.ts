import { AppState } from '../RendererTypes'
import { selectItem } from '../actions/index'

/**
 * Check the result of selectItem and generate a new state.
 * @param state Current state.
 * @param action Action of selectItem.
 * @returns New state.
 */
export const checkSelectItem = (
  state: AppState,
  action: ReturnType<typeof selectItem>
): AppState => {
  return Object.assign({}, state, {
    currentItem: action.payload.item
  })
}

import { Dispatch } from '@reduxjs/toolkit'
import { ActionType } from '../RendererTypes'

/**
 * Open the selected item with an operating system (shell).
 * @returns Action result.
 */
export const requestOpenItem = () => ({
  type: ActionType.RequestOpenItem
})

/**
 * Open the selected item with an operating system (shell).
 * @returns Action result.
 */
export const openItem = (itemPath: string) => async (dispatch: Dispatch) => {
  dispatch(requestOpenItem())
  await window.myAPI.openItem(itemPath)
}

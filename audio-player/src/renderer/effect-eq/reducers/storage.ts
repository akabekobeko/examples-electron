import { AppState } from '../Types'
import { Presets } from '../Constants'

/** Key of local storage item. */
const StorageKey = 'geq'

/** Defalt values of AppState */
const DefaultAppState: AppState = {
  connected: false,
  presetIndex: 1,
  gains: Presets[1].gains
}

/**
 * Load AppState from storage.
 * @returns Loaded AppState.
 */
export const loadAppState = (): AppState => {
  if (!window.localStorage) {
    return DefaultAppState
  }

  const parasms = window.localStorage.getItem(StorageKey) as AppState | null
  if (!parasms) {
    return DefaultAppState
  }

  return parasms
}

/**
 * Save AppState to storage.
 * @param state AppState.
 */
export const saveAppState = (state: AppState) => {
  if (!window.localStorage) {
    return
  }

  window.localStorage.setItem(StorageKey, JSON.stringify(state))
}

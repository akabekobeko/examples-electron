import { UPDATE_WINDOW_IDS, UPDATE_MESSAGE } from '../actions/'

const INITIAL_STATE = {
  id: window.location.hash ? Number(window.location.hash.replace('#', '')) : 0,
  windowIDs: [],
  message: ''
}

if (INITIAL_STATE.id) {
  document.title += ` [${INITIAL_STATE.id}]`
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_WINDOW_IDS:
      return Object.assign({}, state, {
        // Exclude current window
        windowIDs: action.payload.windowIDs.filter((id) => id !== state.id)
      })

    case UPDATE_MESSAGE:
      return Object.assign({}, state, {
        message: action.payload.message
      })

    default:
      return state
  }
}

export default reducer

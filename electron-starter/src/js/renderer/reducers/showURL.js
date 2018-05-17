import { REQUEST_SHOW_URL, FINISH_SHOW_URL, SHOW_URL } from '../actions'

const INITIAL_STATE = {
  url: 'https://github.com/akabekobeko/examples-electron',
  requestingShowURL: true
}

/**
 * Show a URL in an external web browser.
 *
 * @param {Object} state Previous state.
 * @param {Object} action Action.
 *
 * @return {Object} Current state.
 */
const showURL = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_SHOW_URL:
    case SHOW_URL:
      return Object.assign({}, state, {
        requestingShowURL: true
      })

    case FINISH_SHOW_URL:
      return Object.assign({}, state, {
        requestingShowURL: false
      })

    default:
      return state
  }
}

export default showURL

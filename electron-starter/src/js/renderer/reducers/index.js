import { REQUEST_SHOW_URL, FINISH_SHOW_URL, SHOW_URL, UPDATE_DATETIME } from '../actions'
import Util from '../../common/Util.js'

const INITIAL_STATE = {
  url: 'https://github.com/akabekobeko/examples-electron',
  requestingShowURL: true,
  dateTime: Util.formatDate()
}

const reducer = (state = INITIAL_STATE, action) => {
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

    case UPDATE_DATETIME:
      return Object.assign({}, state, {
        dateTime: Util.formatDate()
      })

    default:
      return state
  }
}

export default reducer

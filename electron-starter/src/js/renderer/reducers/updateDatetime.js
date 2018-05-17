import { UPDATE_DATETIME } from '../actions'
import Util from '../../Util.js'

const initialState = {
  label: 'Click',
  dateTime: Util.formatDate()
}

/**
 * Update datetime.
 *
 * @param {Object} state Previous state.
 * @param {Object} action Action.
 *
 * @return {Object} Current state.
 */
const updateDateTime = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DATETIME:
      return Object.assign({}, state, {
        dateTime: Util.formatDate()
      })

    default:
      return state
  }
}

export default updateDateTime

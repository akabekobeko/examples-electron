import { combineReducers } from 'redux'
import showURL from './showURL.js'
import updateDateTime from './updateDatetime.js'

export default combineReducers({
  showURL,
  updateDateTime
})

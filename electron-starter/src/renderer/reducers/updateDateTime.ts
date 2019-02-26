import { AppState } from '../Types'
import { updateDateTime } from '../actions/'

/**
 * Converts the value of the Date object to its equivalent string representation using the specified format.
 * @param date Date and time. Default is current date and time.
 * @param format Date and time format string. Default is "YYYY-MM-DD hh:mm:ss.SSS".
 * @returns Formatted string.
 */
export const formatDate = (
  date: Date = new Date(),
  format: string = 'YYYY-MM-DD hh:mm:ss.SSS'
): string => {
  // Zero padding
  format = format.replace(/YYYY/g, `${date.getFullYear()}`)
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2))
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2))
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))

  // Single digit
  format = format.replace(/M/g, `${date.getMonth() + 1}`)
  format = format.replace(/D/g, `${date.getDate()}`)
  format = format.replace(/h/g, `${date.getHours()}`)
  format = format.replace(/m/g, `${date.getMinutes()}`)
  format = format.replace(/s/g, `${date.getSeconds()}`)

  const matches = format.match(/S/g)
  if (matches) {
    const milliSeconds = ('00' + date.getMilliseconds()).slice(-3)
    for (let i = 0, max = matches.length; i < max; ++i) {
      format = format.replace(/S/, milliSeconds.substring(i, i + 1))
    }
  }

  return format
}

/**
 * Check the result of updateDateTime and generate a new state.
 * @param state Current state.
 * @param action Action of finishEnumItems.
 * @returns New state.
 */
export const checkUpdateDateTime = (
  state: AppState,
  action: ReturnType<typeof updateDateTime>
): AppState =>
  Object.assign({}, state, {
    dateTime: formatDate()
  })

export default checkUpdateDateTime

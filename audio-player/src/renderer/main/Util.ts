/**
 * Pad a number with the specified number of digits.
 * @param value Value.
 * @param digits Number of digits.
 * @returns Zero-padded string.
 */
export const zeroPadding = (value: number, digits: number): string => {
  return ('0' + value).slice(-digits)
}

/**
 * Convert the seconds to a string.
 * @param seconds Seconds.
 * @returns Converted string.
 */
export const secondsToString = (seconds: number): string => {
  const total = Math.round(seconds)
  const h = (total / 3600) | 0
  const m = ((total % 3600) / 60) | 0
  const s = total % 60

  return 0 < h
    ? h + ':' + zeroPadding(m, 2) + ':' + zeroPadding(s, 2)
    : 0 < m
    ? m + ':' + zeroPadding(s, 2)
    : '0:' + zeroPadding(s, 2)
}

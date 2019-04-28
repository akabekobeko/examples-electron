import { formatDate } from './updateDateTime'

describe('updateDateTime', () => {
  describe('formatDate', () => {
    test('Default YYYY-MM-DD hh:mm:ss.SSS', () => {
      const date = new Date(2015, 7, 4, 21, 17, 45, 512)
      const actual = formatDate(date)
      const expected = '2015-08-04 21:17:45.512'
      expect(actual).toBe(expected)
    })

    test('Hyphen YYYY-MM-DD-hh-mm-ss', () => {
      const date = new Date(2015, 7, 4, 21, 17, 45, 512)
      const actual = formatDate(date, 'YYYY-MM-DD-hh-mm-ss')
      const expected = '2015-08-04-21-17-45'
      expect(actual).toBe(expected)
    })

    test('No zero-padding YYYY/M/D h:m:s', () => {
      const date = new Date(2015, 7, 4, 21, 17, 45, 512)
      const actual = formatDate(date, 'YYYY/M/D h:m:s')
      const expected = '2015/8/4 21:17:45'
      expect(actual).toBe(expected)
    })
  })
})

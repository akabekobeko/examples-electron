import assert = require('assert')
import { formatDate } from './updateDateTime'

describe('updateDateTime', () => {
  describe('formatDate', () => {
    it('Default YYYY-MM-DD hh:mm:ss.SSS', () => {
      const date = new Date(2015, 7, 4, 21, 17, 45, 512)
      const actual = formatDate(date)
      assert.deepStrictEqual(actual, '2015-08-04 21:17:45.512')
    })

    it('Hyphen YYYY-MM-DD-hh-mm-ss', () => {
      const date = new Date(2015, 7, 4, 21, 17, 45, 512)
      const actual = formatDate(date, 'YYYY-MM-DD-hh-mm-ss')
      assert.deepStrictEqual(actual, '2015-08-04-21-17-45')
    })

    it('No zero-padding YYYY/M/D h:m:s', () => {
      const date = new Date(2015, 7, 4, 21, 17, 45, 512)
      const actual = formatDate(date, 'YYYY/M/D h:m:s')
      assert.deepStrictEqual(actual, '2015/8/4 21:17:45')
    })
  })
})

import assert = require('assert')
import { zeroPadding, secondsToString } from './Util'

describe('Util', () => {
  describe('zeroPadding', () => {
    it('N', () => {
      const actual = zeroPadding(1, 1)
      const expected = '1'
      assert.deepStrictEqual(actual, expected)
    })

    it('0N', () => {
      const actual = zeroPadding(4, 2)
      const expected = '04'
      assert.deepStrictEqual(actual, expected)
    })

    it('0NN', () => {
      const actual = zeroPadding(18, 3)
      const expected = '018'
      assert.deepStrictEqual(actual, expected)
    })
  })

  describe('secondsToString', () => {
    it('0:00', () => {
      const actual = secondsToString(0)
      const expected = '0:00'
      assert.deepStrictEqual(actual, expected)
    })

    it('0:0s', () => {
      const actual = secondsToString(4)
      const expected = '0:04'
      assert.deepStrictEqual(actual, expected)
    })

    it('0:ss', () => {
      const actual = secondsToString(27)
      const expected = '0:27'
      assert.deepStrictEqual(actual, expected)
    })

    it('m:ss', () => {
      const actual = secondsToString(150)
      const expected = '2:30'
      assert.deepStrictEqual(actual, expected)
    })

    it('mm:ss', () => {
      const actual = secondsToString(721)
      const expected = '12:01'
      assert.deepStrictEqual(actual, expected)
    })

    it('h:mm:ss', () => {
      const actual = secondsToString(3749)
      const expected = '1:02:29'
      assert.deepStrictEqual(actual, expected)
    })

    it('hh:mm:ss', () => {
      const actual = secondsToString(100281)
      const expected = '27:51:21'
      assert.deepStrictEqual(actual, expected)
    })
  })
})

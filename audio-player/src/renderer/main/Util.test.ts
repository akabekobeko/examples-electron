import { zeroPadding, secondsToString } from './Util'

describe('Util', () => {
  describe('zeroPadding', () => {
    test('N', () => {
      const actual = zeroPadding(1, 1)
      const expected = '1'
      expect(actual).toBe(expected)
    })

    test('0N', () => {
      const actual = zeroPadding(4, 2)
      const expected = '04'
      expect(actual).toBe(expected)
    })

    test('0NN', () => {
      const actual = zeroPadding(18, 3)
      const expected = '018'
      expect(actual).toBe(expected)
    })
  })

  describe('secondsToString', () => {
    test('0:00', () => {
      const actual = secondsToString(0)
      const expected = '0:00'
      expect(actual).toBe(expected)
    })

    test('0:0s', () => {
      const actual = secondsToString(4)
      const expected = '0:04'
      expect(actual).toBe(expected)
    })

    test('0:ss', () => {
      const actual = secondsToString(27)
      const expected = '0:27'
      expect(actual).toBe(expected)
    })

    test('m:ss', () => {
      const actual = secondsToString(150)
      const expected = '2:30'
      expect(actual).toBe(expected)
    })

    test('mm:ss', () => {
      const actual = secondsToString(721)
      const expected = '12:01'
      expect(actual).toBe(expected)
    })

    test('h:mm:ss', () => {
      const actual = secondsToString(3749)
      const expected = '1:02:29'
      expect(actual).toBe(expected)
    })

    test('hh:mm:ss', () => {
      const actual = secondsToString(100281)
      const expected = '27:51:21'
      expect(actual).toBe(expected)
    })
  })
})

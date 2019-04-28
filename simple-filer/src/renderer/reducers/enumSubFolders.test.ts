import { merge } from './enumSubFolders'
import { Folder } from '../Types'

const makeFolder = (
  name: string,
  path: string,
  subFolders: Folder[]
): Folder => {
  return {
    treeId: 0,
    isRoot: false,
    name,
    path,
    subFolders
  }
}

describe('enumSubFolders', () => {
  describe('merge', () => {
    test('Added', () => {
      // Check that the data is keep
      const subFolder = makeFolder('Z', 'Z', [])

      const old = [
        makeFolder('a', 'a', [subFolder]),
        makeFolder('b', 'b', [subFolder])
      ]

      const current = [
        makeFolder('a', 'a', []),
        makeFolder('b', 'b', []),
        makeFolder('c', 'c', []),
        makeFolder('d', 'd', [])
      ]

      const actual = merge(old, current)
      const expected = [
        makeFolder('a', 'a', [subFolder]),
        makeFolder('b', 'b', [subFolder]),
        makeFolder('c', 'c', []),
        makeFolder('d', 'd', [])
      ].sort((a, b) => (a.name < b.name ? -1 : 1))

      expect(actual).toEqual(expected)
    })

    test('Removed', () => {
      // Check that the data is keep
      const subFolder = makeFolder('Z', 'Z', [])

      const old = [makeFolder('a', 'a', [subFolder]), makeFolder('b', 'b', [])]

      const current = [
        makeFolder('a', 'a', []),
        makeFolder('c', 'c', []),
        makeFolder('d', 'd', [])
      ]

      const actual = merge(old, current)
      const expected = [
        makeFolder('a', 'a', [subFolder]),
        makeFolder('c', 'c', []),
        makeFolder('d', 'd', [])
      ].sort((a, b) => (a.name < b.name ? -1 : 1))

      expect(actual).toEqual(expected)
    })
  })
})

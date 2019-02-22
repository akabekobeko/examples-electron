import assert = require('assert')
import Rewire from 'rewire'

describe('enumSubFolders', () => {
  const Module = Rewire('./enumSubFolders.ts')

  describe('merge', () => {
    const merge = Module.__get__('merge')

    it('Added', () => {
      // Check that the data is keep
      const subFolder = {
        name: 'Z',
        path: 'Z',
        expanded: false,
        subFolders: []
      }

      const old = [
        { name: 'a', path: 'a', expanded: false, subFolders: [subFolder] },
        { name: 'b', path: 'b', expanded: false, subFolders: [subFolder] }
      ]

      const current = [
        { name: 'a', path: 'a', expanded: false, subFolders: [] },
        { name: 'b', path: 'b', expanded: false, subFolders: [] },
        { name: 'c', path: 'c', expanded: false, subFolders: [] },
        { name: 'd', path: 'd', expanded: false, subFolders: [] }
      ]

      const actual = merge(old, current)
      const expected = [
        { name: 'a', path: 'a', expanded: false, subFolders: [subFolder] },
        { name: 'b', path: 'b', expanded: false, subFolders: [subFolder] },
        { name: 'c', path: 'c', expanded: false, subFolders: [] },
        { name: 'd', path: 'd', expanded: false, subFolders: [] }
      ].sort((a, b) => (a.name < b.name ? -1 : 1))

      assert.deepStrictEqual(actual, expected)
    })

    it('Removed', () => {
      // Check that the data is keep
      const subFolder = {
        name: 'Z',
        path: 'Z',
        expanded: false,
        subFolders: []
      }

      const old = [
        { name: 'a', path: 'a', expanded: false, subFolders: [subFolder] },
        { name: 'b', path: 'b', expanded: false, subFolders: [] }
      ]

      const current = [
        { name: 'a', path: 'a', expanded: false, subFolders: [] },
        { name: 'c', path: 'c', expanded: false, subFolders: [] },
        { name: 'd', path: 'd', expanded: false, subFolders: [] }
      ]

      const actual = merge(old, current)
      const expected = [
        { name: 'a', path: 'a', expanded: false, subFolders: [subFolder] },
        { name: 'c', path: 'c', expanded: false, subFolders: [] },
        { name: 'd', path: 'd', expanded: false, subFolders: [] }
      ].sort((a, b) => (a.name < b.name ? -1 : 1))

      assert.deepStrictEqual(actual, expected)
    })
  })
})

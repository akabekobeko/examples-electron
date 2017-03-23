import assert from 'assert'
import Album from './Album.js'

function createMusic (index, id, artist, album) {
  return {
    id: id,
    path: '',
    artist: artist,
    album: album,
    title: 'Title ' + index,
    year: '201' + index,
    track: index + 1,
    disk: 1,
    genre: '',
    duration: 412,
    image: index + '.jpg'
  }
}

/** @test {Album} */
describe('Album', () => {
  /** @test {Album#findByMusic} */
  it('findByMusic', () => {
    const albums = []
    for (let i = 0; i < 2; ++i) {
      const album = new Album('test', 'album ' + i)
      for (let j = 0; j < 2; ++j) {
        album.add(createMusic(j, i + '-' + j, 'artist', album.name))
      }

      albums.push(album)
    }

    const target = Album.findByMusic(albums, albums[ 1 ].musics[ 1 ])
    assert(target ===  albums[ 1 ])
  })

  /** @test {Album#add} */
  it('add', () => {
    const album = new Album('test', 'album')
    for (let i = 0; i < 2; ++i) {
      album.add(createMusic(i, i, 'artist', album.name))
    }

    // Always top
    assert(album.year  === album.musics[ 0 ].year)
    assert(album.image === album.musics[ 0 ].image)
  })

  /** @test {Album#remove} */
  it('remove', () => {
    const album = new Album('test', 'album')
    for (let i = 0; i < 3; ++i) {
      album.add(createMusic(i, i, 'artist', album.name))
    }

    album.remove(album.musics[ 0 ])

    // Count
    assert(album.musics.length === 2)

    // Change top
    assert(album.year  === album.musics[ 0 ].year)
    assert(album.image === album.musics[ 0 ].image)
  })
})

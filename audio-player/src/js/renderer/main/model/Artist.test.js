import assert from 'assert'
import Artist from './Artist.js'
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

/**
 * Create the test data.
 *
 * @return {Array.<Artist>} Test data
 */
function createArtists () {
  const artists = []
  for (let i = 0; i < 2; ++i) {
    const artist = new Artist('artist ' + i)

    for (let j = 0; j < 2; ++j) {
      const album = new Album(artist.name, 'album ' + i)
      for (let k = 0; k < 2; ++k) {
        album.add(createMusic(k, i + '-' + j + '-' + k, artist.name, album.name))
      }

      artist.add(album)
    }

    artists.push(artist)
  }

  return artists
}

/** @test {Artist} */
describe('Artist', () => {
  /** @test {Artist#findByMusic} */
  it('findByMusic', () => {
    const artists = createArtists()

    const artist = Artist.findByMusic(artists, artists[ 1 ].albums[ 0 ].musics[ 1 ])
    assert(artist.name === 'artist 1')
  })

  /** @test {Artist#add} */
  it('add', () => {
    const artist = new Artist('artist')
    const album  = new Album('artist', 'album')
    for (let i = 0; i < 2; ++i) {
      album.add(createMusic(i, i, 'artist', album.name))
    }

    artist.add(album)

    assert(artist.albums.length === 1)
    assert(artist.image === album.image)
    assert(artist.image === album.musics[ 0 ].image)
  })

  /** @test {Artist#remove} */
  it('remove', () => {
    const artist = new Artist('artist')
    const album  = new Album('artist', 'album')
    for (let i = 0; i < 2; ++i) {
      album.add(createMusic(i, i, 'artist', album.name))
    }

    artist.add(album)
    assert(artist.albums.length === 1)

    artist.remove(album)
    assert(artist.albums.length === 0)
    assert(!(artist.image))
  })
})

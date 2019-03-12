import Album from './Album.js'
import Music from './Music.js'

/**
 * Search for artists matching with music. If not found.
 * @param music Music.
 * @param artists List of artist.
 * @returns Success is artist, Otherwise `null`.
 */
export const matchArsitByMusic = (
  music: Music,
  artists: Artist[]
): Artist | null => {
  for (let artist of artists) {
    if (artist.name === music.artist) {
      return artist
    }
  }

  return null
}

/**
 * Search for albums matching with music. If not found.
 * @param music Music.
 * @param albums List of album.
 * @returns Success is album, Otherwise `null`.
 */
export const matchAlbumByMusic = (
  music: Music,
  albums: Album[]
): Album | null => {
  for (let album of albums) {
    if (album.name === music.album) {
      return album
    }
  }

  return null
}

/**
 * Container of an artist infromation.
 */
export default class Artist {
  /** Artist name. */
  readonly name: string

  /** Albums */
  private _albums: Album[] = []

  /** Path of the image file. */
  private _imageFilePath: string = ''

  /**
   * Initialize instance.
   * @param name Artist name.
   */
  constructor(name: string) {
    this.name = name
  }

  /**
   * Compare the artist.
   * @param a The first artist to compare.
   * @param b The second artist to compare.
   * @returns `-1` = first is less than second, `0` = first equals second, `1` = first is greater than second.
   */
  static compare(a: Artist, b: Artist): number {
    const nameA = a.name.toLowerCase().replace('the ', '')
    const nameB = b.name.toLowerCase().replace('the ', '')

    return nameA === nameB ? 0 : nameA < nameB ? -1 : 1
  }

  /**
   * Create the artists from musics.
   * @param musics Musics.
   * @return Artists.
   */
  static fromMusics(musics: Music[]) {
    const artists: Artist[] = []
    musics.forEach((music) => {
      let artist = matchArsitByMusic(music, artists)
      if (!artist) {
        artist = new Artist(music.artist)
        artists.push(artist)
      }

      let album = matchAlbumByMusic(music, artist.albums)
      if (album) {
        album.add(music)
      } else {
        album = new Album(artist.name, music.album)
        album.add(music)
        artist.add(album)
      }
    })

    return artists.sort(Artist.compare)
  }

  /**
   * Get the artist albums.
   * @returns albums.
   */
  get albums(): Album[] {
    return this._albums
  }

  /**
   * Get the artist image.
   * @returns Path of the image file.
   */
  get imageFilePath(): string {
    return this._imageFilePath
  }

  /**
   * Add the album.
   * @param album Album.
   * @return Success is true.
   */
  add(album: Album): boolean {
    if (album.artist !== this.name) {
      return false
    }

    this._albums.push(album)
    this._albums = this._albums.sort(Album.compare)
    this._updateImage()

    return true
  }

  /**
   * Remove the album
   * @param album Album.
   * @return Success is `true`.
   */
  remove(album: Album): boolean {
    const albums = this._albums.filter((a) => {
      return a.name !== album.name
    })

    if (albums.length === this._albums.length) {
      return false
    }

    this._albums = albums
    this._updateImage()

    return true
  }

  /**
   * Update the album image.
   */
  _updateImage() {
    const updated = this._albums.some((album) => {
      if (album.imageFilePath) {
        this._imageFilePath = album.imageFilePath
        return true
      }

      return false
    })

    if (!updated) {
      this._imageFilePath = ''
    }
  }
}

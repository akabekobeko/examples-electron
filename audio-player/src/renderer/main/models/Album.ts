import { Music } from './Music'

/** Album data. */
export class Album {
  /** Artist name of album. */
  readonly artist: string

  /** Name of album. */
  readonly name: string

  /** Musics in album. */
  private _musics: Music[]

  /** Release year of album.  */
  private _year: string

  /** Path of image file. */
  private _imageFilePath: string

  /**
   * Initialize instance.
   * @param artistName Album artist name.
   * @param albumName Album name.
   */
  constructor(artistName: string, albumName: string) {
    this.artist = artistName
    this.name = albumName
    this._musics = []
    this._year = ''
    this._imageFilePath = ''
  }

  /**
   * Compare the album.
   * @param a The first album to compare.
   * @param b The second album to compare.
   * @returns `-1` = first is less than second, `0` = first equals second, `1` = first is greater than second.
   */
  static compare(a: Album, b: Album): number {
    if (a.name === b.name) {
      return a.year === b.year ? 0 : a.year < b.year ? -1 : 1
    }

    return a.name < b.name ? -1 : 1
  }

  /**
   * Get the musics in album.
   * @returns Musics
   */
  get musics(): Music[] {
    return this._musics
  }

  /**
   * Get the release year of album.
   * @returns Year.
   */
  get year(): string {
    return this._year
  }

  /**
   * Get the path of image file.
   * @returns File path.
   */
  get imageFilePath(): string {
    return this._imageFilePath
  }

  /**
   * Add the music.
   * @param music Music.
   * @returns Success is `true`.
   */
  add(music: Music): boolean {
    if (music.album !== this.name) {
      return false
    }

    this._musics = this._musics.concat(music).sort(Music.compare)
    this._updateImage()
    this._updateYear()

    return true
  }

  /**
   * Remove the music.
   * @param music Music.
   * @returns Success is `true`.
   */
  remove(music: Music): boolean {
    const musics = this._musics.filter((m) => {
      return m.id !== music.id
    })

    if (musics.length === this._musics.length) {
      return false
    }

    this._musics = musics
    this._updateImage()
    this._updateYear()

    return true
  }
  /**
   * Update the album image.
   */
  _updateImage() {
    this._musics.some((music) => {
      if (music.imageFilePath) {
        this._imageFilePath = music.imageFilePath
        return true
      }

      return false
    })
  }

  /**
   * Update the year.
   */
  _updateYear() {
    // Select year
    this._musics.some((music) => {
      if (music.year) {
        this._year = music.year
        return true
      }

      return false
    })
  }
}

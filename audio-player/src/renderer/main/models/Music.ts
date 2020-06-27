import { MusicMetadata } from '../../../common/Types'

/**
 * Music data.
 */
export class Music {
  /** Identifier assigned from music database. */
  readonly id: number

  /** Path of music file. */
  readonly filePath: string

  /** Artist name of music. */
  readonly artist: string

  /** Album name of music. */
  readonly album: string

  /** Title of music. */
  readonly title: string

  /** Release year of music. */
  readonly year: string

  /** Track number in album. */
  readonly track: number

  /** Disc number in album. */
  readonly disc: number

  /** Genre of music. */
  readonly genre: string

  /** Duration of music (Milliseconds). */
  readonly duration: number

  /** File path of image file. */
  readonly imageFilePath: string

  /**
   * Initialize instance.
   * @param id Identifier assigned from music database.
   * @param filePath Path of music file.
   * @param artist Artist name of music.
   * @param album Album name of music.
   * @param title Title of music.
   * @param year Release year of music.
   * @param track Track number in album.
   * @param disc Disc number in album.
   * @param genre Genre of music.
   * @param duration Duration of music (Milliseconds).
   * @param imageFilePath File path of image file.
   */
  constructor(id: number, metadata: MusicMetadata) {
    this.id = id
    this.filePath = metadata.filePath
    this.artist = metadata.artist
    this.album = metadata.album
    this.title = metadata.title
    this.year = metadata.year
    this.track = metadata.track
    this.disc = metadata.disc
    this.genre = metadata.genre
    this.duration = metadata.duration
    this.imageFilePath = metadata.imageFilePath
  }

  /**
   * Compare musics.
   * @param a The first music to compare.
   * @param b The second music to compare.
   * @returns `-1` = first is less than second, `0` = first equals second, `1` = first is greater than second.
   */
  static compare(a: Music, b: Music): number {
    if (a.id === b.id) {
      return 0
    }

    if (a.disc !== b.disc) {
      return a.disc < b.disc ? -1 : 1
    }

    return a.track === b.track ? 0 : a.track < b.track ? -1 : 1
  }
}

/**
 * Container of an music infromation.
 */
export default class Music {
  /**
   * Initialize instance.
   *
   * @param {MusicMetadata} metadata Metadata of music.
   */
  constructor (metadata) {
    /**
     * Metadata of music.
     * @type {MusicMetadata}
     */
    this._metadata = metadata
  }

  /**
   * Compare the music.
   *
   * @param {Music} a The first music to compare.
   * @param {Music} b The second music to compare.
   *
   * @return {number} -1 = first is less than second, 0 = first equals second, first is greater than second.
   */
  static compare (a, b) {
    if (a.disc !== b.disc) {
      return (a.disc < b.disc ? -1 : 1)
    }

    return (a.track === b.track ? 0 : (a.track < b.track ? -1 : 1))
  }

  /**
   * Create music information from metadata.
   *
   * @param {MusicMetadata} metadata Metadata of music.
   *
   * @return {Music} Music.
   */
  static fromMetadata (metadata) {
    const music = new Music(metadata)
    music._metadata = metadata

    return music
  }

  /**
   * Get the metadata.
   * The value of the order to save the IndexedDB.
   *
   * @return {MusicMetadata} Metadata.
   */
  get metadata () {
    return this._metadata
  }

  /**
   * Get the identifier assigned from MusicDatabase.
   *
   * @return {number} Identifier.
   */
  get id () {
    return this._metadata.id
  }

  /**
   * Get the music file path.
   *
   * @return {string} File path.
   */
  get path () {
    return this._metadata.path
  }

  /**
   * Get the artist name.
   *
   * @return {string} Artist name.
   */
  get artist () {
    return this._metadata.artist
  }

  /**
   * Get the album name.
   *
   * @return {string} Album name.
   */
  get album () {
    return this._metadata.album
  }

  /**
   * Get the title of music.
   *
   * @return {string} Album name.
   */
  get title () {
    return this._metadata.title
  }

  /**
   * Get the releseed year of music.
   *
   * @return {string} Year.
   */
  get year () {
    return this._metadata.year
  }

  /**
   * Get the track number.
   *
   * @return {number} Track number (range: 1 - N).
   */
  get track () {
    return this._metadata.track
  }

  /**
   * Get the disc number.
   *
   * @return {number} Disc number (range: 1 - N).
   */
  get disc () {
    return this._metadata.disc
  }

  /**
   * Get the genre name.
   *
   * @return {string} Genre name.
   */
  get genre () {
    return this._metadata.genre
  }

  /**
   * Get the duration of music.
   *
   * @return {number} Duration of music (Seconds).
   */
  get duration () {
    return this._metadata.duration
  }

  /**
   * Get the image file path of mucis.
   *
   * @return {string} Image file path.
   */
  get image () {
    return this._metadata.image
  }
}

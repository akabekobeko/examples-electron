
/**
 * Container of an artist infromation.
 */
export default class Album {
  /**
   * Initialize instance.
   *
   * @param {String} artist Artist name.
   * @param {String} name   Album name.
   */
  constructor( artist, name ) {
    /**
     * Album name.
     * @type {String}
     */
    this._name = name;

    /**
     * Artist name.
     * @type {String}
     */
    this._artist = artist;

    /**
     * Album albums.
     * @type {Array.<Music>}
     */
    this._musics = [];

    /**
     * Path of the image file.
     * @type {String}
     */
    this._image = null;

    /**
     * Released Year of the album.
     * @type {String}
     */
    this._year = null;
  }

  /**
   * Compare the album.
   *
   * @param {Album} a The first album to compare.
   * @param {Album} b The second album to compare.
   *
   * @return {Number} -1 = first is less than second, 0 = first equals second, first is greater than second.
   */
  static compare( a, b ) {
    if( a.name === b.name ) {
      return ( a.year === b.year ? 0 : ( a.year < b.year ? -1 : 1 ) );
    }

    return ( a.name < b.name ? -1 : 1 );
  }

  /**
   * Find the album by music.
   *
   * @param {Array.<Album>} albums Albums.
   * @param {Music}         music  Music.
   *
   * @return {Album} Success is album, Otherwise null.
   */
  static findByMusic( albums, music ) {
    let result = null;
    albums.some( ( album ) => {
      if( music.album === album.name ) {
        result = album;
        return true;
      }

      return false;
    } );

    return result;
  }

  /**
   * Get the album musics.
   *
   * @return {Array.<Music>} musics.
   */
  get musics() {
    return this._musics;
  }

  /**
   * Get the artist name.
   *
   * @return {String} name.
   */
  get artist() {
    return this._artist;
  }

  /**
   * Get the album name.
   *
   * @return {String} name.
   */
  get name() {
    return this._name;
  }

  /**
   * Get the album image.
   *
   * @return {String} Path of the image file.
   */
  get image() {
    return this._image;
  }

  /**
   * Get the album released year.
   *
   * @return {String} year.
   */
  get year() {
    return this._year;
  }

  /**
   * Add the music.
   *
   * @param {Music} music Music.
   *
   * @return {Boolean} Success is true.
   */
  add( music ) {
    if( music.album !== this._name ) { return false; }

    this._musics.push( music );
    this._musics = this._musics.sort( ( a, b ) => {
      if( a.disk !== b.disk ) {
        return ( a.disk < b.disk ? -1 : 1 );
      }

      return ( a.track === b.track ? 0 : ( a.track < b.track ? -1 : 1 ) );
    } );

    this.updateImage();
    this.updateYear();

    return true;
  }

  /**
   * Remove the music.
   *
   * @param {Music} music Music.
   *
   * @return {Boolean} Success is true.
   */
  remove( music ) {
    const musics = this._musics.filter( ( m ) => {
      return ( m.id !== music.id );
    } );

    if( musics.length === this._musics.length ) { return false; }

    this._musics = musics;
    this.updateImage();
    this.updateYear();

    return true;
  }

  /**
   * Update the album image.
   */
  updateImage() {
    this._musics.some( ( m ) => {
      if( m.image ) {
        this._image = m.image;
        return true;
      }

      return false;
    } );
  }

  /**
   * Update the year.
   */
  updateYear() {
    // Select year
    this._musics.some( ( m ) => {
      if( m.year ) {
        this._year = m.year;
        return true;
      }

      return false;
    } );
  }
}


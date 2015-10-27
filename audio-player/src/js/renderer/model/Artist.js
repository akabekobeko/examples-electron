import Album from './Album.js';

/**
 * Container of an artist infromation.
 */
export default class Artist {
  /**
   * Initialize instance.
   *
   * @param {String} name Artist name.
   */
  constructor( name ) {
    /**
     * Artist name.
     * @type {String}
     */
    this._name = name;

    /**
     * Artist albums.
     * @type {Array.<Album>}
     */
    this._albums = [];

    /**
     * Path of the image file.
     * @type {String}
     */
    this._image = null;
  }

  /**
   * Create the artists from musics.
   *
   * @param {Array.<Music>} musics Musics.
   *
   * @return {Array.<Artist>} Artists.
   */
  static fromMusics( musics ) {
    let artists = [];

    musics.forEach( ( music ) => {
      let artist = Artist.findByMusic( artists, music );
      if( !( artist ) ) {
        artist = new Artist( music.artist );
        artists.push( artist );
      }

      let album = Album.findByMusic( artist.albums, music );
      if( album ) {
        album.add( music );
      } else {
        album = new Album( artist.name, music.album );
        album.add( music );
        artist.add( album );
      }
    } );

    return artists.sort( Artist.compare );
  }

  /**
   * Find the artist by music.
   *
   * @param {Array.<Artist>} artists Artists.
   * @param {Music}          music  Music.
   *
   * @return {Album} Success is artist, Otherwise null.
   */
  static findByMusic( artists, music ) {
    let result = null;
    artists.some( ( artist ) => {
      if( music.artist === artist.name ) {
        result = artist;
        return true;
      }

      return false;
    } );

    return result;
  }

  /**
   * Compare the artist.
   *
   * @param {Artist} a The first artist to compare. 
   * @param {Artist} b The second artist to compare. 
   *
   * @return {Number} -1 = first is less than second, 0 = first equals second, first is greater than second.
   */
  static compare( a, b ) {
    let strA = a.toLowerCase().replace( 'the ', '' );
    let strB = b.toLowerCase().replace( 'the ', '' );

    return ( strA === strB ? 0 : ( strA < strB ? -1 : 1 ) );
  }

  /**
   * Get the artist albums.
   *
   * @return {Array.<Album>} albums.
   */
  get albums() {
    return this._albums;
  }

  /**
   * Get the artist name.
   *
   * @return {String} name.
   */
  get name() {
    return this._name;
  }

  /**
   * Get the artist image.
   *
   * @return {String} Path of the image file.
   */
  get image() {
    return this._image;
  }

  /**
   * Add the album.
   *
   * @param {Album} album Album.
   *
   * @return {Boolean} Success is true.
   */
  add( album ) {
    if( album.artist !== this._name ) { return false; }

    this._albums.push( album );
    this._albums = this._albums.sort( ( a, b ) => {
      const yearA = Number( a.year ), yearB = Number( b.year );
      return ( yearA === yearB ? 0 : ( yearA < yearB ? -1 : 1 ) );
    } );

    this.updateImage();

    return true;
  }

  /**
   * Remove the album
   *
   * @param {String} name Album name.
   *
   * @return {Boolean} Success is true.
   */
  remove( name ) {
    const albums = this._albums.filter( ( album ) => {
      return ( album.name !== name );
    } );

    if( albums.length === this._albums.length ) { return false; }

    this._albums = albums;
    this.updateImage();

    return true;
  }

  /**
   * Update the album image.
   */
  updateImage() {
    this._albums.some( ( album ) => {
      if( album.image ) {
        this._image = album.image;
        return true;
      }

      return false;
    } );
  }
}

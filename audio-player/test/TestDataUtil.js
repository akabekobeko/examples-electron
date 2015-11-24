import Artist from '../src/js/renderer/main/model/Artist.js';
import Album  from '../src/js/renderer/main/model/Album.js';

/**
 * Provide a test data utility method.
 */
export default class TestDataUtil {
  /**
   * Create the test music.
   *
   * @param {Number}        index  Index of the music in album.musics.
   * @param {Number|String} id     Unique identifier of the music.
   * @param {String}        artist Artist name.
   * @param {String}        album  Album name.
   *
   * @return {Music} Music data.
   */
  static createMusic( index, id, artist, album ) {
    return {
      id:       id,
      path:     '',
      artist:   artist,
      album:    album,
      title:    'Title ' + index,
      year:     '201' + index,
      track:    index + 1,
      disk:     1,
      genre:    '',
      duration: 412,
      image:    index + '.jpg'
    };
  }

  /**
   * Create the test data.
   *
   * @return {Array.<Artist>} Test data
   */
  static createArtists() {
    const artists = [];
    for( let i = 0; i < 2; ++i ) {
      const artist = new Artist( 'artist ' + i );

      for( let j = 0; j < 2; ++j ) {
        const album = new Album( artist.name, 'album ' + i );
        for( let k = 0; k < 2; ++k ) {
          album.add( TestDataUtil.createMusic( k, i + '-' + j + '-' + k, artist.name, album.name ) );
        }

        artist.add( album );
      }

      artists.push( artist );
    }

    return artists;
  }
}

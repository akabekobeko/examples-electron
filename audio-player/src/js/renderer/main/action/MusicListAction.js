import { Action } from 'material-flux'

/**
 * Define keys for action.
 * @type {object}
 */
export const Keys = {
  init: 'MusicListAction.init',
  select: 'MusicListAction.select',
  selectArtist: 'MusicListAction.selectArtist',
  import: 'MusicListAction.import',
  remove: 'MusicListAction.remove'
}

/**
 * Music list actions.
 */
export default class MusicListAction extends Action {
  /**
   * Initiliaze music list.
   */
  init () {
    this.dispatch(Keys.init)
  }

  /**
   * Select the music.
   *
   * @param {Music} music Target music.
   */
  select (music) {
    this.dispatch(Keys.select, music)
  }

  /**
   * Select the artist.
   *
   * @param {Artist} artist Target artist.
   */
  selectArtist (artist) {
    this.dispatch(Keys.selectArtist, artist)
  }

  /**
   * Import the music from file.
   */
  import () {
    this.dispatch(Keys.import)
  }

  /**
   * Remove the music.
   *
   * @param {Music} music Target music.
   */
  remove (music) {
    this.dispatch(Keys.remove, music)
  }
}

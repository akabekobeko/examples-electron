import { Action } from 'material-flux';

/**
 * Define keys for action.
 * @type {Object}
 */
export const Keys = {
  init:   'MusicListAction.init',
  select: 'MusicListAction.select',
  import: 'MusicListAction.import',
  remove: 'MusicListAction.remove'
};

/**
 * Music list actions.
 */
export default class MusicListAction extends Action {
  /**
   * Initiliaze music list.
   */
  init() {
    this.dispatch( Keys.init );
  }

  /**
   * Select the music.
   *
   * @param {Music} target music.
   */
  select( music ) {
    this.dispatch( Keys.select, music );
  }

  /**
   * Import the music from file.
   */
  import() {
    this.dispatch( Keys.import );
  }

  /**
   * Remove the music.
   *
   * @param {Number} musicId music identify.
   */
  remove( musicId ) {
    this.dispatch( Keys.remove, musicId );
  }
}

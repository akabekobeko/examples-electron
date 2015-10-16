import React from 'react';
import Util  from '../../common/Util.js';

/**
 * Component for music list.
 */
export default class MusicList extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties。
   */
  constructor( props ) {
    super( props );

    /**
     * Function to watch the change of Store.
     * @type {Function}
     */
    this._onChangeBind = this._onChange.bind( this );
  }

  /**
   * Occurs when the component is mount.
   */
  componentDidMount() {
    this.props.context.audioPlayerStore.onChange( this._onChangeBind );
    this.props.context.musicListStore.onChange( this._onChangeBind );
  }

  /**
   * Occurs when the component is unmount.
   */
  componentWillUnmount() {
    this.props.context.audioPlayerStore.removeChangeListener( this._onChangeBind );
    this.props.context.musicListStore.removeChangeListener( this._onChangeBind );
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render() {
    return (
      <table className="music-list">
        <thead>
          <tr>
            <th> </th>
            <th>#</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          { this._renderMusics() }
        </tbody>
      </table>
    );
  }

  /**
   * Render for musics.
   *
   * @return {Array.<ReactElement>} Rendering data.
   */
  _renderMusics() {
    const current = this.props.context.musicListStore.currentMusic;
    return this.props.context.musicListStore.musics.map( ( music, index ) => {
      const selected = ( current && music.id === current.id ? 'selected' : '' );
      return (
        <tr
          key={ music.id }
          className={ selected }
          onClick={ this._onClickMusic.bind( this, music ) }
          onDoubleClick={ this._onDoubleClickMusic.bind( this, music ) }>
          <td></td>
          <td>{ index + 1 }</td>
          <td className="left">{ music.title }</td>
          <td className="left">{ music.artist }</td>
          <td className="left">{ music.album }</td>
         <td>{ Util.secondsToString( music.duration ) }</td>
        </tr>
      );
    } );
  }

  /**
   * Occurs when the Store of the state has been changed.
   */
  _onChange() {
    this.forceUpdate();
  }

  /**
   * Occurs when the music is clicked.
   *
   * @param {Object} music Music.
   */
  _onClickMusic( music ) {
    this.props.context.musicListAction.select( music );
  }

  /**
   * Occurs when the music is double-clicked.
   *
   * @param {Object} music Music.
   */
  _onDoubleClickMusic( music ) {
    this.props.context.musicListAction.select( music );
    this.props.context.audioPlayerAction.play( music );
  }
}

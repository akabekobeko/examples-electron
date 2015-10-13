import React from 'react/dist/react';

/**
 * Component for audio player controls.
 */
export default class MainWindow extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties。
   */
  constructor( props ) {
    super( props );
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render() {
    return (
      <div className="audio-player">
        <div className="audio-player__container">
          { this._renderPlayer() }
          { this._renderInfo() }
          { this._renderToolbar() }
        </div>
      </div>
    );
  }

  /**
   * Render for audio controls.
   *
   * @return {ReactElement} Rendering data.
   */
  _renderPlayer() {
    return (
      <div className="audio-player__container__player">
        <div className="audio-player__container__player__container">
          <div className="audio-player__container__player__container__button prev">
            <i className="icon-prev"></i>
          </div>
          <div className="audio-player__container__player__container__button play">
            <i className="icon-play"></i>
          </div>
          <div className="audio-player__container__player__container__button next">
            <i className="icon-next"></i>
          </div>
          <input type="range" className="audio-player__container__player__container__slider"></input>
        </div>
      </div>
    );
  }

  /**
   * Render for music information.
   *
   * @return {ReactElement} Rendering data.
   */
  _renderInfo() {
    return (
      <div className="audio-player__container__info">
        <div className="audio-player__container__info__container">
          <div className="audio-player__container__info__container__title">Tilte</div>
          <div className="audio-player__container__info__container__artist-album">Artist - Albumg</div>
          <div className="audio-player__container__info__container__time playbacktime">0:00</div>
          <div className="audio-player__container__info__container__time duration">0:00</div>
          <input type="range" className="audio-player__container__info__container__slider"></input>
        </div>
      </div>
    );
  }

  /**
   * Render for toolbar.
   *
   * @return {ReactElement} Rendering data.
   */
  _renderToolbar() {
    return (
      <div className="audio-player__container__toolbar">
        <div className="audio-player__container__toolbar__container">
          <div className="audio-player__container__toolbar__container__button remove">
            <i className="icon-minus"></i>
          </div>
          <div
            className="audio-player__container__toolbar__container__button import"
            onClick={ this._onClickAdd.bind( this ) }>
            <i className="icon-plus"></i>
          </div>

        </div>
      </div>
    );
  }

  /**
   * Occurs when the import button is clicked
   */
  _onClickAdd() {
    this.props.context.musicListAction.import();
  }
}

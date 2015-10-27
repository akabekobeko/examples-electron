import React       from 'react';
import ReactDOM    from 'react-dom';
import SplitPane   from 'react-split-pane';
import AudioPlayer from './AudioPlayer.js';
import ArtistList  from './ArtistList.js';
import AlbumList   from './AlbumList.js';

/**
 * Component for application main window.
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
   * occur when the component did mount.
   */
  componentDidMount() {
    this.props.context.musicListAction.init();
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render() {
    return (
      <div className="page">
        <AudioPlayer context={ this.props.context } />
        <div className="music-list">
          <SplitPane split="vertical" minSize="256" defaultSize="256">
            <ArtistList context={ this.props.context } />
            <AlbumList context={ this.props.context } />
          </SplitPane>
        </div>
      </div>
    );
  }

  /**
   * Setup for main window.
   */
  static setup( context ) {
    const area = document.querySelector( '.app' );
    if( !( area ) ) { return; }

    ReactDOM.render( <MainWindow context={ context } />, area );
  }
}

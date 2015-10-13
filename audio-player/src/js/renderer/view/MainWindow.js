import React       from 'react/dist/react';
import ReactDOM    from 'react-dom/dist/react-dom';
import AudioPlayer from './AudioPlayer.js';

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
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render() {
    return (
      <div className="page">
        <AudioPlayer context={ this.props.context } />
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

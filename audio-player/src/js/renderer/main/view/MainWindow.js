import React from 'react'
import PropTypes from 'prop-types'
import SplitPane from 'react-split-pane'
import AudioPlayer from './AudioPlayer.js'
import ArtistList from './ArtistList.js'
import AlbumList from './AlbumList.js'

/**
 * Component for application main window.
 */
export default class MainWindow extends React.Component {
  /**
   * occur when the component did mount.
   */
  componentDidMount () {
    this.props.context.musicListAction.init()
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    return (
      <div className="page">
        <AudioPlayer context={this.props.context} />
        <div className="content">
          <SplitPane split="vertical" minSize={256} defaultSize={256}>
            <ArtistList context={this.props.context} />
            <AlbumList context={this.props.context} />
          </SplitPane>
        </div>
      </div>
    )
  }
}

MainWindow.propTypes = {
  context: PropTypes.object
}

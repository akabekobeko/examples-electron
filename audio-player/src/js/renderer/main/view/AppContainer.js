import React from 'react'
import PropTypes from 'prop-types'
import Styles from './AppContainer.scss'
import SplitPane from 'react-split-pane'
import AudioPlayer from './AudioPlayerContainer.js'
import ArtistList from './ArtistListContainer.js'
import AlbumList from './AlbumListContainer.js'

/**
 * Component of application container.
 */
export default class AppContainer extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)
    this._onChangeBind = this._onChange.bind(this)
  }

  /**
   * Occurs when the component is mount.
   */
  componentDidMount () {
    this.props.context.audioPlayerStore.onChange(this._onChangeBind)
    this.props.context.musicListStore.onChange(this._onChangeBind)
  }

  /**
   * Occurs when the component is unmount.
   */
  componentWillUnmount () {
    this.props.context.audioPlayerStore.removeChangeListener(this._onChangeBind)
    this.props.context.musicListStore.removeChangeListener(this._onChangeBind)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    return (
      <div className={Styles.page}>
        <AudioPlayer context={this.props.context} />
        <div className={Styles.content}>
          <SplitPane split="vertical" minSize={256} defaultSize={256}>
            <ArtistList context={this.props.context} />
            <AlbumList context={this.props.context} />
          </SplitPane>
        </div>
      </div>
    )
  }

  /**
   * Occurs when the Store of the state has been changed.
   */
  _onChange () {
    this.forceUpdate()
  }
}

AppContainer.propTypes = {
  context: PropTypes.object
}

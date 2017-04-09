import React from 'react'
import PropTypes from 'prop-types'
import Util from '../../../common/Util.js'
import { PlaybackState } from '../../../common/Constants.js'

/**
 * Item of the MusicList.
 */
class MusicItem extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)

    this._onClickBind = this._onClick.bind(this)
    this._onDoubleClickBind = this._onDoubleClick.bind(this)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    return (
      <tr
        className={this.props.selected}
        onClick={this._onClickBind}
        onDoubleClick={this._onDoubleClickBind}>
        <td className="icon">{this.props.icon}</td>
        <td>{this.props.index}</td>
        <td className="left">{this.props.music.title}</td>
        <td className="left">{this.props.music.artist}</td>
        <td className="left">{this.props.music.album}</td>
        <td>{ Util.secondsToString(this.props.music.duration)}</td>
      </tr>
    )
  }

  /**
   * Occurs when the music is clicked.
   */
  _onClick () {
    this.props.click(this.props.music)
  }

  /**
   * Occurs when the music is double-clicked.
   */
  _onDoubleClick () {
    this.props.doubleClick(this.props.music)
  }
}

MusicItem.propTypes = {
  music: PropTypes.object,
  selected: PropTypes.string,
  icon: PropTypes.object,
  index: PropTypes.number,
  click: PropTypes.func,
  doubleClick: PropTypes.func
}

/**
 * Component for music list.
 */
export default class MusicList extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)

    this._onChangeBind           = this._onChange.bind(this)
    this._onClickMusicBind       = this._onClickMusi.bind(this)
    this._onDoubleClickMusicBind = this._onDoubleClickMusic.bind(this)
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
      <div className="music-list">
        <table>
          <thead>
            <tr>
              <th />
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
      </div>
    )
  }

  /**
   * Render for musics.
   *
   * @return {Array.<ReactElement>} Rendering data.
   */
  _renderMusics () {
    const current     = this.props.context.musicListStore.currentMusic
    const currentPlay = this._getCurrentPlay()

    return this.props.context.musicListStore.musics.map((music, index) => {
      const selected = (current && music.id === current.id ? 'selected' : '')
      const icon     = (currentPlay && currentPlay.id === music.id ? (<i className="icon-play" />) : null)

      return <MusicItem
        music={music}
        index={index + 1}
        icon={icon}
        selected={selected}
        click={this._onClickMusicBind}
        doubleClick={this._onDoubleClickMusicBind} />
    })
  }

  /**
   * Occurs when the Store of the state has been changed.
   */
  _onChange () {
    this.forceUpdate()
  }

  /**
   * Occurs when the music is clicked.
   *
   * @param {Object} music Music.
   */
  _onClickMusic (music) {
    this.props.context.musicListAction.select(music)
  }

  /**
   * Occurs when the music is double-clicked.
   *
   * @param {Object} music Music.
   */
  _onDoubleClickMusic (music) {
    this.props.context.musicListAction.select(music)
    this.props.context.audioPlayerAction.open(music, true)
  }

  /**
   * Get the currently playback mucic
   *
   * @return {Object} Success is music, otherwise null.
   */
  _getCurrentPlay () {
    const store = this.props.context.audioPlayerStore
    if (store.playbackState === PlaybackState.Stopped) { return null }

    return store.currentMusic
  }
}

MusicList.propTypes = {
  context: PropTypes.object
}

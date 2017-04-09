import React from 'react'
import PropTypes from 'prop-types'
import Util from '../../../common/Util.js'
import { PlaybackState } from '../../../common/Constants.js'

/**
 * Item of the music list.
 */
class MusicItem extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)

    this._onClickBind       = this._onClick.bind(this)
    this._onDoubleClickBind = this._onDoubleClick.bind(this)
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render () {
    return (
      <div
        className={'album-list__item__body__item' + this.props.selected}
        onClick={this._onClickBind}
        onDoubleClick={this._onDoubleClickBind}>
        <div className="album-list__item__body__item__icon">{this.props.icon}</div>
        <div className="album-list__item__body__item__track">{this.props.music.track}</div>
        <div className="album-list__item__body__item__title" title={this.props.music.title}>{this.props.music.title}</div>
        <div className="album-list__item__body__item__duration">{Util.secondsToString(this.props.music.duration)}</div>
      </div>
    )
  }

  /**
   * Occurs when the item is clicked.
   */
  _onClick () {
    this.props.click(this.props.music)
  }

  /**
   * Occurs when the item is double-clicked.
   */
  _onDoubleClick () {
    this.props.doubleClick(this.props.music)
  }
}

MusicItem.propTypes = {
  selected: PropTypes.string,
  icon: PropTypes.object,
  music: PropTypes.object,
  click: PropTypes.func,
  doubleClick: PropTypes.func
}

/**
 * Component for album list.
 */
export default class AlbumList extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties.
   */
  constructor (props) {
    super(props)

    this._onChangeBind           = this._onChange.bind(this)
    this._onClickMusicBind       = this._onClickMusic.bind(this)
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
      <div className="album-list">
        { this._renderAlbums() }
      </div>
    )
  }

  /**
   * Render for albums.
   *
   * @return {Array.<ReactElement>} Rendering data.
   */
  _renderAlbums () {
    const artist = this.props.context.musicListStore.currentArtist
    if (!(artist)) {
      return null
    }

    return artist.albums.map((album, index) => {
      return (
        <div
          key={index}
          className="album-list__item">
          <div className="album-list__item__header">
            <img className="album-list__item__header__image" src={album.image} />
            <div className="album-list__item__header__name" title={album.name}>{album.name}</div>
            <div className="album-list__item__header__year">{album.year}</div>
          </div>
          <div className="album-list__item__body">
            {this._renderMusics(album.musics)}
          </div>
        </div>
      )
    })
  }

  /**
   * Render for album musics.
   *
   * @param {Array.<Music>} musics musics
   *
   * @return {Array.<ReactElement>} Rendering data.
   */
  _renderMusics (musics) {
    const currentMusic = this.props.context.musicListStore.currentMusic
    const currentPlay  = this._getCurrentPlay()

    // Group by disc number
    const discs = {}
    musics.forEach((music) => {
      if (discs[music.disc] === undefined) {
        discs[music.disc] = []
      }

      discs[music.disc].push(music)
    })

    // Multi disc
    const keys = Object.keys(discs)
    if (1 < keys.length) {
      const results = []
      keys.forEach((key) => {
        results.push((
          <div key={key} className="album-list__item__body__disc">
            Disc {key}
          </div>
      ))

        discs[key].forEach((music) => {
          results.push(this._renderMusic(music, currentMusic, currentPlay))
        })
      })

      return results
    }

    // Single disc
    return musics.map((music) => {
      return this._renderMusic(music, currentMusic, currentPlay)
    })
  }

  /**
   * Render for album music.
   *
   * @param {Music} musics       music.
   * @param {Music} currentMusic Currently music.
   * @param {Music} currentPlay  Currently playback music.
   *
   * @return {ReactElement} Rendering data.
   */
  _renderMusic (music, currentMusic, currentPlay) {
    const selected = (currentMusic && currentMusic.id === music.id ? ' selected' : '')
    const icon     = (currentPlay  && currentPlay.id  === music.id ? (<i className="icon-play" />) : null)

    return <MusicItem
      key={music.id}
      music={music}
      selected={selected}
      icon={icon}
      click={this._onClickMusicBind}
      doubleClick={this._onDoubleClickMusicBind} />
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
   * @param {Music} music Music.
   */
  _onClickMusic (music) {
    this.props.context.musicListAction.select(music)
  }

  /**
   * Occurs when the music is double-clicked.
   *
   * @param {Music} music Music.
   */
  _onDoubleClickMusic (music) {
    this.props.context.musicListAction.select(music)
    this.props.context.audioPlayerAction.open(music, true)
  }

  /**
   * Get the currently playback mucic
   *
   * @return {Music} Success is music, otherwise null.
   */
  _getCurrentPlay () {
    const store = this.props.context.audioPlayerStore
    if (store.playbackState === PlaybackState.Stopped) {
      return null
    }

    return store.currentMusic
  }
}

AlbumList.propTypes = {
  context: PropTypes.object
}

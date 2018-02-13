import React from 'react'
import PropTypes from 'prop-types'
import Util from '../../../Util.js'
import Styles from './MusicListItem.scss'

/**
 * Component of the music list item.
 *
 * @param {Object} props Properties.
 * @param {Music} props.music Music.
 * @param {Boolean} props.selected "true" if selected.
 * @param {Boolean} props.playing "true" if playing.
 * @param {Function} props.onSelect Called when the music is selected.
 * @param {Function} props.onPlay Called when the music is played or paused.
 */
const AlbumMusic = ({ music, selected, playing, onSelect, onPlay }) => {
  return (
    <div
      className={selected ? `${Styles.music} ${Styles.selected}` : Styles.music}
      onClick={() => onSelect(music)}
      onDoubleClick={() => onPlay(music)}>
      <div className={Styles.icon}>{playing ? (<i className={`icon-play`} />) : null}</div>
      <div className={Styles.track}>{music.track}</div>
      <div className={Styles.title} title={music.title}>{music.title}</div>
      <div className={Styles.duration}>{Util.secondsToString(music.duration)}</div>
    </div>
  )
}

AlbumMusic.propTypes = {
  selected: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  music: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired
}

export default AlbumMusic

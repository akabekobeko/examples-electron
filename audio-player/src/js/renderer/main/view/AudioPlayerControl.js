import React from 'react'
import PropTypes from 'prop-types'
import Styles from './AudioPlayerControl.scss'

/**
 * Component of an audio player controls.
 *
 * @param {object} props Properties.
 * @param {boolean} props.isPlaying "true" if the music is playing.
 * @param {number} props.volume Volume.
 * @param {function} props.onPlay Called when the music is played or stopped.
 * @param {function} props.onPrev Called when moving to the previous music.
 * @param {function} props.onNext Called when moving to the next music.
 * @param {function} props.onChangeVolume Called when the volume is changed.
 */
const AudioPlayerControl = ({ isPlaying, volume, onPlay, onPrev, onNext, onChangeVolume }) => {
  return (
    <div className={Styles.player}>
      <div className={Styles.container}>
        <div className={Styles.prev} onClick={onPrev}>
          <i className={'icon-prev'} />
        </div>
        <div className={Styles.play} onClick={onPlay}>
          <i className={isPlaying ? 'icon-pause' : 'icon-play'} />
        </div>
        <div className={Styles.next} onClick={onNext}>
          <i className={'icon-next'} />
        </div>
        <input
          type="range"
          className={Styles.slider}
          min={0}
          max={100}
          value={volume}
          onChange={(ev) => onChangeVolume(ev.target.value)}
        />
      </div>
    </div>
  )
}

AudioPlayerControl.propTypes = {
  isPlaying: PropTypes.bool,
  volume: PropTypes.number,
  onPlay: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  onChangeVolume: PropTypes.func
}

export default AudioPlayerControl

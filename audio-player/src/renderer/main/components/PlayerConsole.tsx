import React from 'react'
import Styles from './PlayerConsole.scss'

type Props = {
  /** `true` if the music is playing. */
  isPlaying: boolean
  /** Volume. */
  volume: number
  /** Called when the music is played or stopped. */
  onPlay: () => void
  /** Called when the music is paused. */
  onPause: () => void
  /** Called when moving to the previous music. */
  onPrev: () => void
  /** Called when moving to the next music. */
  onNext: () => void
  /** Called when the volume is changed. */
  onChangeVolume: (value: number) => void
}

const PlayerConsole: React.FC<Props> = ({
  isPlaying,
  volume,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onChangeVolume
}) => (
  <div className={Styles.player}>
    <div className={Styles.container}>
      <div className={Styles.prev} onClick={onPrev}>
        <i className={'icon_controller_jump_to_start'} />
      </div>
      <div
        className={Styles.play}
        onClick={() => (isPlaying ? onPause() : onPlay())}
      >
        <i
          className={
            isPlaying ? 'icon_controller_pause' : 'icon_controller_play'
          }
        />
      </div>
      <div className={Styles.next} onClick={onNext}>
        <i className={'icon_controller_next'} />
      </div>
      <input
        type="range"
        className={Styles.slider}
        min={0}
        max={100}
        value={volume}
        onChange={(ev) => onChangeVolume(Number(ev.target.value))}
      />
    </div>
  </div>
)

export default PlayerConsole

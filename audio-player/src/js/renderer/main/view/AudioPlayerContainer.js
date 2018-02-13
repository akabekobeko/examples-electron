import React from 'react'
import PropTypes from 'prop-types'
import Control from './AudioPlayerControl.js'
import Information from './AudioPlayerInformation.js'
import Toolbar from './AudioPlayerToolbar.js'
import Styles from './AudioPlayerContainer.scss'
import { PlaybackState } from '../../../Constants.js'

/**
 * Get music that are being played or selected on the music list.
 *
 * @param {AppContext} context Context.
 *
 * @return {Music} Current music.
 */
const getCurrentMusic = (context) => {
  if (context.audioPlayerStore.playbackState === PlaybackState.Stopped) {
    return context.musicListStore.currentMusic
  }

  return context.audioPlayerStore.currentMusic
}

/**
 * Play a music.
 *
 * @param {AppContext} context Context.
 * @param {Music} music Music.
 */
const playMusic = (context, music) => {
  switch (context.audioPlayerStore.playbackState) {
    case PlaybackState.Stopped:
      context.audioPlayerAction.open(music, true)
      break

    case PlaybackState.Paused:
      context.audioPlayerAction.play()
      break

    case PlaybackState.Playing:
      context.audioPlayerAction.pause()
      break

    default:
      break
  }
}

/**
 * Play a next music.
 *
 * @param {AppContext} context Context.
 * @param {Music} music Music.
 * @param {Boolean} prev "true" if you play the previous song instead of the next one.
 */
const playNextMusic = (context, music, prev) => {
  const nextMusic = context.musicListStore.next(music, prev)
  if (!(nextMusic)) {
    return
  }

  context.musicListAction.select(nextMusic)
  if (context.audioPlayerStore.playbackState !== PlaybackState.Stopped) {
    context.audioPlayerAction.open(nextMusic, true)
  }
}

/**
 * Remove a music.
 *
 * @param {AppContext} context Context.
 * @param {Music} music Music.
 */
const removeMusic = (context, music) => {
  const playMusic = context.audioPlayerStore.currentMusic
  if (!(music) || (playMusic && playMusic.id === music.id)) {
    return
  }

  context.musicListAction.remove(music)
}

/**
 * Component of an audio player.
 *
 * @param {Object} props Properties.
 * @param {AppContext} props.context Context.
 */
const AudioPlayerContainer = ({ context }) => {
  const music = getCurrentMusic(context)
  return (
    <div className={Styles.container}>
      <div className={Styles.panel}>
        <Control
          isPlaying={context.audioPlayerStore.playbackState === PlaybackState.Playing}
          volume={context.audioPlayerStore.volume}
          onPlay={() => playMusic(context, music)}
          onPrev={() => playNextMusic(context, music, true)}
          onNext={() => playNextMusic(context, music, false)}
          onChangeVolume={(volume) => context.audioPlayerAction.volume(volume)} />
        <Information
          audioPlayerStore={context.audioPlayerStore}
          audioPlayerAction={context.audioPlayerAction}
          music={music}
        />
        <Toolbar
          onRemove={() => removeMusic(context, music)}
          onImport={() => context.musicListAction.import()} />
      </div>
    </div>
  )
}

AudioPlayerContainer.propTypes = {
  context: PropTypes.object
}

export default AudioPlayerContainer

import Artist from './models/Artist'
import Music from './models/Music'

/** Audio playback status. */
export enum PlaybackState {
  Stopped = 0,
  Paused = 1,
  Playing = 2
}

/** Flux action type is defined. */
export enum ActionType {
  LoadMusicList = 'LoadMusicList',
  ImportMusic = 'ImportMusic',
  SeletcArtist = 'SeletcArtist',
  SeletcMusic = 'SeletcMusic',
  RemoveMusic = 'RemoveMusic',

  OpenWithPlay = 'OpenWithPlay',
  Play = 'Play',
  Prev = 'Prev',
  Next = 'Next',
  Pause = 'Pause',
  Stop = 'Stop',
  ChangeVolume = 'ChangeVolume',
  GetPlayTimeAndSpectrums = 'GetPlayTimeAndSpectrums'
}

/** State of the application. */
export type AppState = {
  artists: Artist[]
  currentArtist: Artist | null
  currentMusic: Music | null

  playingMusic: Music | null
  playbackState: PlaybackState
  currentTime: number
  spectrums: Uint8Array | null
  volume: number
}

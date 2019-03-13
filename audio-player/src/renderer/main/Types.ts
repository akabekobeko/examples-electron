import Artist from './models/Artist'
import Music from './models/Music'

/** Audio playback status. */
export enum PlaybackState {
  Stopped = 0,
  Paused = 1,
  Playing = 2
}

/** Music selection position. */
export enum MusicSelectPosition {
  /** Current specified music. */
  Current = 0,
  /** Next to the specified music. */
  Prev = 1,
  /** Previous specified music */
  Next = 2
}

/** Flux action type is defined. */
export enum ActionType {
  OpenMusicWithPlay = 'OpenMusicWithPlay',
  Play = 'Play',
  Pause = 'Pause',
  Stop = 'Stop',
  Seek = 'Seek',
  ChangeVolume = 'ChangeVolume',
  GetPlayerState = 'GetPlayerState',

  SelectMusic = 'SelectMusic',
  SelectArtist = 'SlectArtist',
  RequestImportMusic = 'RequestImportMusic',
  FinishImportMusic = 'FinishImportMusic',
  RemoveMusic = 'RemoveMusic'
}

/** State of the application. */
export type AppState = {
  artists: Artist[]
  currentArtist: Artist | null
  currentMusic: Music | null

  playbackState: PlaybackState
  currentTime: number
  volume: number
  spectrums: Uint8Array | null
}

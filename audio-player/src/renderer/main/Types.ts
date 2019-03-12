import Artist from './models/Artist'
import Music from './models/Music'

/** Flux action type is defined. */
export enum ActionType {
  OpenMusicWithPlay = 'OpenMusicWithPlay',
  Play = 'Play',
  Pause = 'Pause',
  Stop = 'Stop',
  Seek = 'Seek',
  ChangeVolume = 'ChangeVolume',

  SelectMusic = 'SelectMusic',
  SelectArtist = 'SlectArtist',
  RequestImportMusic = 'RequestImportMusic',
  FinishImportMusic = 'FinishImportMusic',
  RemoveMusic = 'RemoveMusic'
}

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

/** State of the audio player. */
export interface PlayerState {
  readonly playbackState: PlaybackState
  readonly currentTime: number
  readonly volume: number
  readonly spectrums: Uint8Array | null
}

/** State of the musics. */
export interface MusicState {
  readonly artists: Artist[]
  readonly currentArtist: Artist | null
  readonly currentMusic: Music | null
}

/** State of the application. */
export type AppState = {
  musicState: MusicState
  playerState: PlayerState
}

import { Artist } from './models/Artist'
import { Music } from './models/Music'

/** Audio playback status. */
export enum PlaybackState {
  Stopped = 0,
  Paused = 1,
  Playing = 2
}

/** Flux action type is defined. */
export enum ActionType {
  UpdateAppState = 'UpdateAppState',
  ShowEffector = 'ShowEffector'
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

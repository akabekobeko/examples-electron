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

/** State of the application. */
export type AppState = {
  artists: Artist[]
  currentArtist: Artist
  currentMusic: Music
  playbackState: PlaybackState
}

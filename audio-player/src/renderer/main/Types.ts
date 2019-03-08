import { number } from 'prop-types'

/** Flux action type is defined. */
export enum ActionType {
  OpenMusicWithPlay = 'OpenMusicWithPlay',
  Play = 'Play',
  Pause = 'Pause',
  Stop = 'Stop',
  Seek = 'Seek',
  ChangeVolume = 'ChangeVolume',

  SelectMusic = 'SelectMusic',
  SlectArtist = 'SlectArtist',
  RequestImportMusic = 'RequestImportMusic',
  FinishImportMusic = 'FinishImportMusic',
  RemoveMusic = 'RemoveMusic'
}

/** Music data. */
export type Music = {
  /** Identifier assigned from music database. */
  id: number
  /** Path of music file. */
  filePath: string
  /** Artist name of music. */
  artist: string
  /** Album name of music. */
  album: string
  /** Title of music. */
  title: string
  /** Release year of music. */
  year: string
  /** Track number in album. */
  track: number
  /** Disc number in album. */
  disc: number
  /** Genre of music. */
  genre: string
  /** Duration of music (Milliseconds). */
  duration: number
  /** File path of image file. */
  imageFilePath: string
}

/** Album data. */
export type Album = {
  /** Name of album. */
  name: string
  /** Artist name of album. */
  artist: string
  /** Release year of album.  */
  year: string
  /** Path of image file. */
  imageFilePath: string
  /** Musics in album. */
  musics: Music[]
}

/** Artist data. */
export type Artist = {
  /** Name of artist. */
  name: string
  /** Path of image file. */
  imageFilePath: string
  /** Albums of artist. */
  Albums: Album[]
}

/** State of the application. */
export type AppState = {}

import { MusicSelectPosition } from '../Types'
import * as MusicDatabase from './MusicDatabase'
import Artist, { matchAlbumByMusic, matchArsitByMusic } from './Artist'
import Music from './Music'

/**
 * Manage for music list.
 */
class MusicListManager {
  /** Artists. */
  private _artists: Artist[] = []

  /** Currently artist. */
  private _currentArtist: Artist | null = null

  /** Currently music. */
  private _currentMusic: Music | null = null

  /** Manage for the music database. */
  private _db: IDBDatabase | null = null

  /**
   * Get the all artist.
   * @returns artists.
   */
  get artists(): Artist[] {
    return this._artists
  }

  /**
   * Get the currently artist.
   * @returns Artist.
   */
  get currentArtist(): Artist | null {
    return this._currentArtist
  }

  /**
   * Get the currently music.
   * @returns Music.
   */
  get currentMusic(): Music | null {
    return this._currentMusic
  }

  /**
   * Load the musics.
   * @returns Asynchronous task.
   */
  async load() {
    if (this._db) {
      return
    }

    this._db = await MusicDatabase.open()
    this._artists = Artist.fromMusics(await MusicDatabase.load(this._db))
    if (0 < this._artists.length) {
      this._currentArtist = this._artists[0]
      this._currentMusic = this._artists[0].albums[0].musics[0]
    }
  }

  /**
   * Selects the specified artist.
   * @param artist Artist.
   */
  selectArtist(artist: Artist) {
    this._currentArtist = artist
  }

  /**
   * Selects the specified music.
   * @param music Music.
   * @param position The position of the selection relative to the specified music.
   */
  selectMusic(music: Music, position: MusicSelectPosition) {
    this._currentMusic =
      position === MusicSelectPosition.Current
        ? music
        : this.nextMusic(music, position === MusicSelectPosition.Prev)
  }

  /**
   * Get the next or previous music in carrently artist's albums.
   * @param baseMusic Music to become a base position.
   * @param isPrev It is `true` if it sees from the base before. `false` if next.
   * @returns Music if successful. Otherwise `null`.
   */
  private nextMusic(baseMusic: Music, isPrev: boolean): Music | null {
    const artist = matchArsitByMusic(baseMusic, this._artists)
    if (!artist) {
      return null
    }

    const album = matchAlbumByMusic(baseMusic, artist.albums)
    if (!album) {
      return null
    }

    for (let index = 0, max = album.musics.length; index < max; ++index) {
      const music = album.musics[index]
      if (music.id !== baseMusic.id) {
        continue
      }

      if (isPrev) {
        return index === 0 ? null : album.musics[index - 1]
      } else {
        return index === max - 1 ? null : album.musics[index + 1]
      }
    }

    return null
  }
}

export default MusicListManager

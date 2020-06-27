import * as MusicDatabase from './MusicDatabase'
import { Artist, artistByMusic, albumByMusic } from './Artist'
import { Music } from './Music'
import { importMusicMetadata } from './MusicImporter'
import { Album } from './Album'

/**
 * Manage for music list.
 */
export class MusicListManager {
  /** Artists. */
  private _artists: Artist[]

  /** Currently artist. */
  private _currentArtist: Artist | null

  /** Currently music. */
  private _currentMusic: Music | null

  /** Manage for the music database. */
  private _db: IDBDatabase | null

  /**
   * Initialize instance.
   */
  constructor() {
    this._artists = []
    this._currentArtist = null
    this._currentMusic = null
    this._db = null
  }

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
    this._artists = this._artists.sort(Artist.compare)

    if (0 < this._artists.length) {
      this._currentArtist = this._artists[0]
      this._currentMusic = this._artists[0].albums[0].musics[0]
    }
  }

  /**
   * Import the musics from files of user selection.
   * @returns Asynchronous task.
   */
  async import(): Promise<void> {
    if (!this._db) {
      return
    }

    const metadata = await importMusicMetadata()
    for (let data of metadata) {
      const music = await MusicDatabase.add(this._db, data)
      this.add(music)
    }
  }

  /**
   * Remove the music from instance and database.
   * @param music Target music.
   * @returns Asynchronous task.
   */
  async remove(music: Music): Promise<void> {
    if (!this._db) {
      return
    }

    const artist = artistByMusic(music, this._artists)
    if (!artist) {
      return
    }

    const album = albumByMusic(music, artist.albums)
    if (!album) {
      return
    }

    await MusicDatabase.remove(this._db, music.id)
    if (this._currentMusic && this._currentMusic.id === music.id) {
      this._currentMusic = this.getNextMusic(music)
    }

    album.remove(music)
    if (0 < album.musics.length) {
      // There are songs left, so no album and artist processing is required
      return
    }

    artist.remove(album)
    if (0 < artist.albums.length) {
      // There are album left, so no artist processing is required
      return
    }

    this._artists = this._artists.filter((a) => a.name !== artist.name)

    if (this._currentArtist && this._currentArtist.name === artist.name) {
      this._currentArtist = null
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
   */
  selectMusic(music: Music) {
    this._currentMusic = music
  }

  /**
   * Get the next or previous music in carrently artist's albums.
   * @param baseMusic Music to become a base position.
   * @param isNext It is `true` if it sees from the base next. `false` if previous.
   * @returns Music instance if successful. Otherwise `null`.
   */
  getNextMusic(baseMusic: Music, isNext: boolean = true): Music | null {
    const artist = artistByMusic(baseMusic, this._artists)
    if (!artist) {
      return null
    }

    const album = albumByMusic(baseMusic, artist.albums)
    if (!album) {
      return null
    }

    for (let index = 0, max = album.musics.length; index < max; ++index) {
      const music = album.musics[index]
      if (music.id !== baseMusic.id) {
        continue
      }

      if (isNext) {
        return index === max - 1 ? null : album.musics[index + 1]
      } else {
        return index === 0 ? null : album.musics[index - 1]
      }
    }

    return null
  }

  /**
   * Add the music.
   * @param music Music.
   */
  private add(music: Music) {
    let artist = artistByMusic(music, this._artists)
    if (artist) {
      let album = albumByMusic(music, artist.albums)
      if (album) {
        album.add(music)
      } else {
        album = new Album(artist.name, music.album)
        album.add(music)
        artist.add(album)
      }
    } else {
      // New artist and album, with setting an image and year from music.
      artist = new Artist(music.artist)
      const album = new Album(artist.name, music.album)
      album.add(music)
      artist.add(album)
      this._artists = this._artists.concat(artist).sort(Artist.compare)
    }
  }
}

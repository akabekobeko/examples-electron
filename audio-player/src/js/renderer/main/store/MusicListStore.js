import { Store } from 'material-flux'
import { Keys } from '../action/MusicListAction.js'
import { IPCKeys } from '../../../Constants.js'
import MusicDatabase from '../model/MusicDatabase.js'
import MusicImporter from '../model/MusicImporter.js'
import Artist from '../model/Artist.js'
import Album from '../model/Album.js'

/**
 * Manage for music list.
 */
export default class MusicListStore extends Store {
  /**
   * Initialize instance.
   *
   * @param {MainWindowContext} context Contect of the main window.
   */
  constructor (context) {
    super(context)

    /**
     * Music database.
     * @type {MusicDatabase}
     */
    this._db = new MusicDatabase()

    /**
     * Music file importer.
     * @type {MusicImporter}
     */
    this._importer = new MusicImporter(context.ipc, this._db, this._onProgressImportMusic.bind(this), this._onFinishImportMusic.bind(this))

    /**
     * State of store.
     * @type {object}
     */
    this.state = {
      /**
       * Artist list.
       * @type {Artist[]}
       */
      artists: [],

      /**
       * Current Artist
       * @type {Artist}
       */
      currentArtist: null,

      /**
       * Current music.
       * @type {Music}
       */
      currentMusic: null
    }

    this.register(Keys.init,         this._actionInit)
    this.register(Keys.select,       this._actionSelect)
    this.register(Keys.selectArtist, this._actionSelectArtist)
    this.register(Keys.import,       this._actionImport)
    this.register(Keys.remove,       this._actionRemove)
  }

  /**
   * Get the all artist.
   *
   * @return {Artist[]} artists.
   */
  get artists () {
    return this.state.artists
  }

  /**
   * Get the currently artist.
   *
   * @return {Artist} artist.
   */
  get currentArtist () {
    return this.state.currentArtist
  }

  /**
   * Get the currently music.
   *
   * @return {Music} music.
   */
  get currentMusic () {
    return this.state.currentMusic
  }

  /**
   * Get the next or previous music of the specified music.
   * Specified music it will return null if at the last of list.
   *
   * @param {Music} target Target music.
   * @param {boolean} prev True if get in previous of the music. Default is false
   *
   * @return {Music} Success is music. Otherwise null.
   */
  next (target = this.state.currentMusic, prev) {
    const artist = Artist.findByMusic(this.state.artists, target)
    if (!(artist)) {
      return null
    }

    let result = null
    artist.albums.some((album, albumIndex) => {
      if (album.name !== target.album) {
        return false
      }

      album.musics.some((music, musicIndex) => {
        if (music.id !== target.id) {
          return false
        }

        if (prev) {
          result = this._prevMusic(artist, album, albumIndex, musicIndex)
        } else {
          result = this._nextMusic(artist, album, albumIndex, musicIndex)
        }

        return true
      })

      return true
    })

    return result
  }

  /**
   * Get the prevoius music.
   *
   * @param {Artist} artist Currently artis.
   * @param {Album} album Currently album.
   * @param {number} albumIndex Index of album in artist.albums
   * @param {number} musicIndex Index of music in album.musics
   *
   * @return {Music} Success is music, Otherwise null
   */
  _prevMusic (artist, album, albumIndex, musicIndex) {
    const position = musicIndex - 1
    if (0 <= position) {
      return album.musics[ position ]
    } else if (0 < albumIndex) {
      // Previous album
      const prevAlbum = artist.albums[ albumIndex - 1 ]
      if (0 < prevAlbum.musics.length) {
        return prevAlbum.musics[ prevAlbum.musics.length - 1 ]
      }
    }

    return null
  }

  /**
   * Get the next music.
   *
   * @param {Artist} artist Currently artis.
   * @param {Album} album Currently album.
   * @param {number} albumIndex Index of album in artist.albums
   * @param {number} musicIndex Index of music in album.musics
   *
   * @return {Music} Success is music, Otherwise null
   */
  _nextMusic (artist, album, albumIndex, musicIndex) {
    const position = musicIndex + 1
    if (position < album.musics.length) {
      return album.musics[ position ]
    } else if (albumIndex < artist.albums.length - 1) {
      // Next album
      const nextAlbum = artist.albums[ albumIndex + 1 ]
      if (0 < nextAlbum.musics.length) {
        return nextAlbum.musics[ 0 ]
      }
    }

    return null
  }

  /**
   * Initialize music list.
   */
  _actionInit () {
    this._db.init((err) => {
      if (err) {
        if (DEBUG) {
          console.error(err)
        }

        return
      }

      this._db.readAll(this._onInitialize.bind(this))
    })
  }

  /**
   * Select the music.
   *
   * @param {Music} music Target music.
   */
  _actionSelect (music) {
    if (this.state.currentMusic) {
      if (music.id !== this.state.currentMusic.id) {
        this.setState({ currentMusic: music })
      }
    } else {
      this.setState({ currentMusic: music })
    }
  }

  /**
   * Select the artist.
   *
   * @param {Artist} artist Target artist.
   */
  _actionSelectArtist (artist) {
    if (this.state.currentArtist) {
      if (artist.name !== this.state.currentArtist.name) {
        this.setState({ currentArtist: artist })
      }
    } else {
      this.setState({ currentArtist: artist })
    }
  }

  /**
   * Import the music from file.
   */
  _actionImport () {
    this._importer.execute()
  }

  /**
   * Remove the music.
   *
   * @param {Music} music Target music.
   */
  _actionRemove (music) {
    this._db.remove(music.id, (err) => {
      if (err) {
        if (DEBUG) {
          console.error(err)
        }

        return
      }

      // Move current
      const state  = { artists: this.state.artists.concat() }
      if (music.id === this.state.currentMusic.id) {
        state.currentMusic = this.next(music, true)
      }

      const artist = Artist.findByMusic(state.artists, music)
      const album  = Album.findByMusic(artist.albums, music)

      // Check last album and artist
      let removedArtist = false
      album.remove(music)
      if (album.musics.length === 0) {
        artist.remove(album)
        if (artist.albums.length === 0) {
          const newArtists = state.artists.filter((a) => {
            return (a.name !== artist.name)
          })

          if (newArtists.length !== state.artists.length) {
            state.artists = newArtists
            removedArtist = true
          }
        }
      }

      // Update current artist
      const currentArtist = this.state.currentArtist
      if (currentArtist && currentArtist.name === artist.name) {
        state.currentArtist = (removedArtist ? null : artist)
      }

      this.setState(state)
    })
  }

  /**
   * Occurs when it is initialized.
   *
   * @param {Error} err Error information. Success is undefined.
   * @param {Music[]} musics Loaded music collection.
   */
  _onInitialize (err, musics) {
    if (err) {
      if (DEBUG) {
        console.error(err)
      }

      return
    }

    if (!(musics && musics.length)) {
      return
    }

    const artists = Artist.fromMusics(musics)
    const state   = { musics: musics, artists: artists }

    if (0 < artists.length) {
      state.currentArtist = artists[ 0 ]
      state.currentMusic  = state.currentArtist.albums[ 0 ].musics[ 0 ]
    }

    this.setState(state)
  }

  /**
   * Occurs when a music file of impot has been executed.
   *
   * @param {Error} err Error information. Success is undefined.
   * @param {Music} music Music.
   * @param {number} process The processed number.
   * @param {number} total The total number of music files.
   */
  _onProgressImportMusic (err, music, process, total) {
    if (err) {
      if (DEBUG) {
        console.error(err)
      }

      return
    }

    if (DEBUG) {
      console.log('Import [' + process + '/' + total + '] : ' + music.path)
    }

    let artist = Artist.findByMusic(this.state.artists, music)
    if (artist) {
      let album = Album.findByMusic(artist.albums, music)
      if (album) {
        album.add(music)
      } else {
        album = new Album(artist.name, music.album)
        album.add(music)
        artist.add(album)
      }

      this.setState()
    } else {
      // New Artist and Album
      artist = new Artist(music.artist)
      const album = new Album(artist.name, music.album)
      album.add(music)
      artist.add(album)

      this.setState({ artists: this.state.artists.concat(artist).sort(Artist.compare) })
    }
  }

  /**
   * Occurs when a import music has been finished.
   *
   * @param {boolean} canceld True if it is canceled. Default is false.
   */
  _onFinishImportMusic (canceld) {
    if (canceld) {
      return
    }

    this.context.ipc.send(IPCKeys.RequestShowMessage, {
      type: 'info',
      title: 'Information',
      message: 'Import of music files has been completed.',
      buttons: [ 'OK' ]
    })
  }
}

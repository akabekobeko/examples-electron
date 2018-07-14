import { IPCKeys } from '../../../Constants.js'
import Music from './Music.js'

/**
 * Import the music files.
 */
export default class MusicImporter {
  /**
   * Initialize instance.
   *
   * @param {RendererIPC} ipc Manage the IPC of the renderer process.
   * @param {MusicDatabase} db Music database.
   * @param {Function} onProgress Callback function that occur when one reviews import has been finished.
   * @param {Function} onFinish Callback function that occurs when all of the import has been finished.
   *
   * @throws {Error} Invalid argument.
   */
  constructor (ipc, db, onProgress, onFinish) {
    if (!(ipc && db && typeof onProgress === 'function' && typeof onFinish === 'function')) {
      throw new Error('Invalid arguments.')
    }

    /**
     * Manage the IPC of the renderer process.
     * @type {RendererIPC}
     */
    this._ipc = ipc

    /**
     * Music database.
     * @type {MusicDatabase}
     */
    this._db = db

    /**
     * Callback function that occur when one reviews import has been finished.
     * @type {Function}
     */
    this._onProgress = onProgress

    /**
     * Callback function that occurs when all of the import has been finished.
     * @type {Function}
     */
    this._onFinish = onFinish

    /**
     * The total processes number.
     * @type {Number}
     */
    this._total = 0

    /**
     * The processed number.
     * @type {Number}
     */
    this._process = 0

    /**
     * Path collection of files.
     * @type {String[]}
     */
    this._filePaths = null

    /**
     * Current import file path.
     * @type {String}
     */
    this._currentFilePath = null

    this._ipc.on(IPCKeys.FinishShowOpenDialog, this._onFinishShowOpenDialog.bind(this))
    this._ipc.on(IPCKeys.FinishReadMusicMetadata, this._onFinishReadMusicMetadata.bind(this))
  }

  /**
   * Begin the import of music files.
   */
  execute () {
    this._ipc.send(IPCKeys.RequestShowOpenDialog, {
      title: 'Select music files',
      filters: [
        {name: 'Musics', extensions: ['mp3', 'm4a', 'aac', 'wav', 'flac', 'opus', 'ogg']}
      ],
      properties: ['openFile', 'multiSelections']
    })
  }

  /**
   * Execute the import of music.
   */
  _importMusic () {
    // Check complete
    if (this._process === this._total) {
      this._onCompleteImportMusic()
    }
    ++this._process

    this._currentFilePath = this._filePaths[0]
    this._filePaths.shift()

    console.log('Loading: %s', this._currentFilePath)

    this._ipc.send(IPCKeys.RequestReadMusicMetadata, this._currentFilePath)
  }

  /**
   * Occurs when a music file of impot has been executed.
   *
   * @param {IPCEvent} ev Event data.
   * @param {string[]} paths File/Folder paths.
   */
  _onFinishShowOpenDialog (ev, paths) {
    if (!(paths)) {
      this._onFinish(true)
      return
    }

    this._total     = paths.length
    this._process   = 0
    this._filePaths = paths

    this._importMusic()
  }

  /**
   * Occurs when a music file of read metadata has been executed.
   *
   * @param {IPCEvent} ev Event data.
   * @param {Error} err Error information. Success is undefined.
   * @param {Object} metadata Music metadata from main process. (FinishReadMusicMetadata)
   */
  _onFinishReadMusicMetadata (ev, err, metadata) {
    if (err) {
      this._onProgress(err, null, this._process, this._total)
      this._importMusic()
      return
    }

    this._register(metadata)
  }

  /**
   * Occurs when a music file of impot has been completed.
   */
  _onCompleteImportMusic () {
    this._onFinish()
  }

  /**
   * Register the metadata in the database.
   *
   * @param {Object} metadata Music metadata from main process. (FinishReadMusicMetadata)
   */
  _register (metadata) {
    this._db.add(metadata, (err, m) => {
      if (err) {
        this._onProgress(err, null, this._process, this._total)
      } else if (m.id === undefined) {
        this._onProgress(new Error('Invalid identifier of the music, ' + m.path), null, this._process, this._total)
      } else {
        this._onProgress(null, new Music(m), this._process, this._total)
      }

      // Next
      this._importMusic()
    })
  }
}

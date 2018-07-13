import Electron from 'electron'
import Path from 'path'
import Crypto from 'crypto'
import * as MusicMetadata from 'music-metadata'
import * as MimeTypes from 'mime-types'
import { IPCKeys } from '../Constants.js'
import FileUtil from './FileUtil.js'

/**
 * Read the metadata from music file.
 */
export default class MusicMetadataReader {
  /**
   * Initialize instance.
   *
   * @param {App} context Application context.
   */
  constructor (context) {
    /**
     * Path of the folder in which to save the image.
     * @type {String}
     */
    this._saveImageDirPath = Path.join(Electron.app.getPath('userData'), 'images')

    // Setup save directory
    if (this._saveImageDirPath) {
      FileUtil.mkdir(this._saveImageDirPath, (err) => {
        if (err) {
          if (DEBUG) {
            console.error(err)
          }
        }
      })
    }

    context.ipc.on(IPCKeys.RequestReadMusicMetadata, this._onRequestReadMusicMetadata.bind(this))
  }

  /**
   * Get the save image directory path.
   *
   * @return {String} Directory path.
   */
  get saveImageDirPath () {
    return this._saveImageDirPath
  }

  /**
   * Set the save image directory path.
   *
   * @param {String} path Directory path.
   */
  set saveImageDirPath (path) {
    this._saveImageDirPath = path
  }

  /**
   * Read the metadata from music file.
   *
   * @param {String} filePath Music file path.
   * @param {Function} callback Callback function.
   */
  read (filePath, callback) {
    Promise.resolve()
      .then(() => {
        return this._readMetadata(filePath)
      })
      .then(params => {
        return this._readImage(params)
      })
      .then(params => {
        const common = params.metadata.common
        const music = {
          path: filePath,
          artist: common.artist,
          album: common.album || '',
          title: common.title || '',
          year: common.year || '',
          track: (common.track && 0 < common.track.no ? common.track.no : 1),
          disc: (common.disk  && 0 < common.disk.no  ? common.disk.no  : 1),
          genre: (0 < common.genre.length ? common.genre[ 0 ] : ''),
          duration: params.metadata.format.duration,
          image: params.image
        }

        callback(null, music)
      })
      .catch((err) => {
        callback(err)
      })
  }

  /**
   * Read the metadata from music file.
   *
   * @param {String} filePath Music file path.
   *
   * @return {Promise} Instance of Promise.
   */
  _readMetadata (filePath) {
    return MusicMetadata.parseFile(filePath, { duration: true })
      .then(metadata => {
        return {metadata: metadata}
      })
  }

  /**
   * Read and save the image from music metadata.
   *
   * @param {Object} params common part of music metadata.
   */
  _readImage (params) {
    return new Promise((resolve) => {
      const picture = params.metadata.common.picture
      if (!(this._saveImageDirPath && picture && 0 < picture.length)) {
        resolve(params)
        return
      }
      const extension = MimeTypes.extension(picture[0].format)
      const fileName = this._getHash(picture[ 0 ].data) + '.' + extension
      const filePath = Path.join(this._saveImageDirPath, fileName)

      // Save image file
      FileUtil.writeFile(filePath, picture[ 0 ].data, (err) => {
        const newParams = params
        if (err) {
          if (DEBUG) {
            console.error(err)
          }
        } else {
          newParams.image = filePath
        }

        resolve(newParams)
      })
    })
  }

  /**
   * Get the SHA-1 hash from binary data.
   *
   * @param {ArrayBuffer} data Ninary data.
   *
   * @return {String} Hash string.
   */
  _getHash (data) {
    const sha = Crypto.createHash('sha1')
    sha.update(data)

    return sha.digest('hex')
  }

  /**
   * Occurs when the import of music files has been requested.
   *
   * @param {Event} ev Event data.
   * @param {String} filePath Music file path.
   */
  _onRequestReadMusicMetadata (ev, filePath) {
    if (!(filePath)) {
      ev.sender.send(IPCKeys.FinishReadMusicMetadata, new Error('Invalid arguments.'), null)
      return
    }

    this.read(filePath, (err, music) => {
      ev.sender.send(IPCKeys.FinishReadMusicMetadata, err, music)
    })
  }
}

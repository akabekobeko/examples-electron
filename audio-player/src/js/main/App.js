import Electron from 'electron'
import MainMenu from './MainMenu.js'
import DialogManager from './DialogManager.js'
import WindowManager, { WindowTypes } from './WindowManager.js'
import MusicMetadataReader from './MusicMetadataReader.js'
import { IPCKeys } from '../Constants.js'
import FileUtil from './FileUtil'

/**
 * Application entry point.
 */
class App {
  /**
   * Initialize instance.
   */
  constructor () {
    // Compile switch
    global.DEBUG = true
    if (DEBUG) {
      console.log('Initialize Application')
    }

    /**
     * IPC module for main process.
     * @type {ipcMain}
     */
    this.ipc = require('electron').ipcMain

    /**
     * Manage the window.
     * @type {WindowManager}
     */
    this._windowManager = new WindowManager(this)

    /**
     * Manage the native dialog.
     * @type {DialogManager}
     */
    this._dialogManager = new DialogManager(this)

    /**
     * Read the metadata from music file.
     * @type {MusicMetadataReader}
     */
    this._musicMetadataReader = new MusicMetadataReader(this)

    this.ipc.on(IPCKeys.RequestReadAudioFile, this._onRequestReadAudioFile.bind(this))
  }

  /**
   * Get the window manager.
   *
   * @return {WindowManager} Instance of the window manager.
   */
  get windowManager () {
    return this._windowManager
  }

  /**
   * Occurs when a application launched.
   */
  onReady () {
    this._windowManager.show(WindowTypes.Main)
    const templates = MainMenu.menu(this)
    const menu = Electron.Menu.buildFromTemplate(templates)
    Electron.Menu.setApplicationMenu(menu)
  }

  /**
   * Occurs when a window all closed.
   */
  onWindowAllClosed () {
    if (DEBUG) {
      console.log('Quit')
    }

    Electron.app.quit()
  }

  /**
   * Occurs when the import of music files has been requested.
   *
   * @param {Event} ev Event data.
   * @param {String} filePath Music file path.
   */
  _onRequestReadAudioFile (ev, filePath) {
    FileUtil.readFile(filePath)
      .then(audioData => {
        ev.sender.send(IPCKeys.FinishReadAudioFile, null, {data: audioData, path: filePath})
      })
      .catch(err => {
        ev.sender.send(IPCKeys.FinishReadAudioFile, err, null)
      })
  }
}

const app = new App()
Electron.app.on('ready', () => {
  if (DEBUG) {
    console.log('Application is ready')
  }

  app.onReady()
})

Electron.app.on('quit', () => {
  if (DEBUG) {
    console.log('Application is quit')
  }
})

Electron.app.on('window-all-closed', () => {
  if (DEBUG) {
    console.log('All of the window was closed.')
  }

  app.onWindowAllClosed()
})

import Electron from 'electron'
import MainMenu from './MainMenu.js'
import DialogManager from './DialogManager.js'
import WindowManager from './WindowManager.js'
import { IPCKeys } from '../Constants.js'

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
    this._ipc = Electron.ipcMain

    /**
     * The shell module provides functions related to desktop integration.
     * @type {shell}
     */
    this._shell = Electron.shell

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

    this._ipc.on(IPCKeys.RequestShowURL, (ev, url) => {
      this._shell.openExternal(url)
      ev.sender.send(IPCKeys.FinishShowURL)
    })
  }

  /**
   * Get the IPC module.
   *
   * @return {ipcMain} IPC module.
   */
  get ipc () {
    return this._ipc
  }

  /**
   * Get the shell module.
   *
   * @return {shell} IPC module.
   */
  get shell () {
    return this._shell
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
    this._windowManager.createNewWindow()

    const menu = Electron.Menu.buildFromTemplate(MainMenu.menu(this))
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

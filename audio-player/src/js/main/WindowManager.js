import Electron from 'electron'
import { IPCKeys } from '../Constants.js'

/**
 * Define the type of window.
 * @type {object}
 */
export const WindowTypes = {
  Main: 'main',
  About: 'about',
  GraphicEqualizer: 'graphicEqualizer'
}

/**
 * Manage the window.
 */
export default class WindowManager {
  /**
   * Initialize instance.
   *
   * @param {App} context Application context.
   */
  constructor (context) {
    /**
     * Collection of a managed window.
     * @type {Map}
     */
    this._windows = new Map()

    // IPC handlers
    context.ipc.on(IPCKeys.RequestUpdateGraphicEqualizer, this._onRequestUpdateGraphicEqualizer.bind(this))
    context.ipc.on(IPCKeys.FinishUpdateGraphicEqualizer, this._onFinishUpdateGraphicEqualizer.bind(this))
  }

  /**
   * Get the window from key.
   *
   * @param {WindowTypes} type Window type.
   *
   * @return {BrowserWindow} Successful if window instance, otherwise undefined.
   */
  getWindow (type) {
    return this._windows.get(type)
  }

  /**
   * Close a window.
   *
   * @param {WindowTypes} type Window type.
   */
  close (type) {
    const w = this._windows.get(type)
    if (!(w)) {
      return
    }

    w.close()
  }

  /**
   * Show a window.
   *
   * @param {WindowTypes} type Window type.
   */
  show (type) {
    switch (type) {
      case WindowTypes.Main:
        this._showMain()
        break

      case WindowTypes.About:
        this._showAbout()
        break

      case WindowTypes.GraphicEqualizer:
        this._showGraphicEqualizer()
        break

      default:
        break
    }
  }

  /**
   * Switch the window display, Show or hide.
   *
   * @param {WindowTypes} type Window type.
   */
  toggle (type) {
    // Main window is always showing
    if (type === WindowTypes.Main) {
      return
    }

    const w = this._windows.get(type)
    if (w) {
      if (w.isVisible()) {
        w.hide()
      } else {
        w.show()
      }
    } else {
      this.show(type)
    }
  }

  /**
   * Reload the focused window, For debug.
   */
  reload () {
    const w = Electron.BrowserWindow.getFocusedWindow()
    if (w) {
      w.reload()
    }
  }

  /**
   * Switch the display of the developer tools window at focused window, For debug.
   */
  toggleDevTools () {
    const w = Electron.BrowserWindow.getFocusedWindow()
    if (w) {
      w.toggleDevTools()
    }
  }

  /**
   * Show the main window.
   */
  _showMain () {
    if (this._windows.get(WindowTypes.Main)) {
      return
    }

    const w = new Electron.BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 800,
      minHeight: 480,
      resizable: true,
      webPreferences: {
        nodeIntegration: true
      }
    })

    w.on('closed', () => {
      if (DEBUG) {
        console.log('The main window was closed.')
      }

      // Close an other windows
      this._windows.forEach((value, key) => {
        if (key === WindowTypes.Main) {
          return
        }

        value.close()
      })

      this._windows.delete(WindowTypes.Main)
    })

    w.loadFile('assets/index.html')
    this._windows.set(WindowTypes.Main, w)
  }

  /**
   * Show the about application window.
   */
  _showAbout () {
    if (this._windows.get(WindowTypes.About)) {
      return
    }

    const w = new Electron.BrowserWindow({
      width: 400,
      height: 256,
      resizable: false,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: false
      }
    })

    w.setMenu(null)

    w.on('closed', () => {
      if (DEBUG) {
        console.log('The about application window was closed.')
      }

      this._windows.delete(WindowTypes.About)
    })

    w.loadFile('assets/about.html')
    this._windows.set(WindowTypes.About, w)
  }

  /**
   * Show the graphic equalizer window.
   */
  _showGraphicEqualizer () {
    if (this._windows.get(WindowTypes.GraphicEqualizer)) {
      return
    }

    let w = null
    if (process.platform === 'darwin') {
      w = new Electron.BrowserWindow({
        width: 370,
        height: 300,
        resizable: false,
        alwaysOnTop: true,
        webPreferences: {
          nodeIntegration: true
        }
      })
    } else {
      // Add a heigth for menu bar
      w = new Electron.BrowserWindow({
        width: 370,
        height: 320,
        resizable: false,
        alwaysOnTop: true,
        webPreferences: {
          nodeIntegration: true
        }
      })

      w.setMenu(null)
    }

    w.on('closed', () => {
      if (DEBUG) {
        console.log('The graphic equalizer window was closed.')
      }

      this._windows.delete(WindowTypes.GraphicEqualizer)
    })

    w.loadFile('assets/effect-geq.html')
    this._windows.set(WindowTypes.GraphicEqualizer, w)
  }

  /**
   * Occurs when the graphic equalizer update is requested.
   *
   * @param {IPCEvent} ev Event data.
   * @param {Boolean} connect If true to connect the effector, Otherwise disconnect.
   * @param {Number[]} gains Gain values.
   */
  _onRequestUpdateGraphicEqualizer (ev, connect, gains) {
    const w = this._windows.get(WindowTypes.Main)
    if (!(w)) {
      return
    }

    w.webContents.send(IPCKeys.RequestUpdateGraphicEqualizer, connect, gains)
    ev.sender.send(IPCKeys.FinishUpdateGraphicEqualizer)
  }

  /**
   * Occurs when the graphic equalizer update is finished.
   */
  _onFinishUpdateGraphicEqualizer () {
    const w = this._windows.get(WindowTypes.GraphicEqualizer)
    if (!(w)) {
      return
    }

    w.webContents.send(IPCKeys.FinishUpdateGraphicEqualizer)
  }
}

/**
 * webContents is an EventEmitter.
 * It is responsible for rendering and controlling a web page and is a property of the BrowserWindow object.
 *
 * @see https://github.com/atom/electron/blob/master/docs/api/web-contents.md
 *
 * @typedef {EventEmitter} webContents
 */

/**
 * The ipcMain module, when used in the main process, handles asynchronous and synchronous messages sent from a renderer process (web page).
 * Messages sent from a renderer will be emitted to this module.
 *
 * @see https://github.com/atom/electron/blob/master/docs/api/ipc-main.md
 *
 * @typedef {Object} ipcMain
 */

/**
 * The ipcRenderer module provides a few methods so you can send synchronous and asynchronous messages from the render process (web page) to the main process.
 * You can also receive replies from the main process.
 *
 * See ipcMain for code examples.
 *
 * @see https://github.com/atom/electron/blob/master/docs/api/ipc-renderer.md
 *
 * @typedef {Object} ipcRenderer
 */

/**
 * The event object passed to the callback.
 *
 * @see https://github.com/atom/electron/blob/master/docs/api/ipc-main.md
 *
 * @typedef {Object} IPCEvent
 * @property {String}      returnValue Set this to the value to be returned in a synchronous message.
 * @property {webContents} sender      Returns the webContents that sent the message, you can call event.sender.send to reply to the asynchronous message.
 */

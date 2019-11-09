import {
  BrowserWindow,
  dialog,
  ipcMain,
  OpenDialogOptions,
  MessageBoxOptions,
  SaveDialogOptions,
  IpcMainInvokeEvent,
  MessageBoxReturnValue,
  SaveDialogReturnValue,
  OpenDialogReturnValue
} from 'electron'
import { IPCKey } from '../common/Constants'
import { readMusicMetadata } from './MusicMetadataReader'
import {
  getMainWindow,
  toggleShowGraphicEqualizerWindow
} from './WindowManager'
import { MusicMetadata } from '../common/Types'

/**
 * Occurs when show of a file open dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showOpenDialog`.
 */
const onShowOpenDialog = (
  ev: IpcMainInvokeEvent,
  options: OpenDialogOptions
): Promise<OpenDialogReturnValue> => {
  return dialog.showOpenDialog(
    BrowserWindow.fromWebContents(ev.sender),
    options
  )
}

/**
 * Occurs when show of a save dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showSaveDialog`.
 */
const onShowSaveDialog = (
  ev: IpcMainInvokeEvent,
  options: SaveDialogOptions
): Promise<SaveDialogReturnValue> => {
  return dialog.showSaveDialog(
    BrowserWindow.fromWebContents(ev.sender),
    options
  )
}

/**
 * Occurs when show of a message box is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showMessageBox`.
 */
const onShowMessageBox = (
  ev: IpcMainInvokeEvent,
  options: MessageBoxOptions
): Promise<MessageBoxReturnValue> => {
  return dialog.showMessageBox(
    BrowserWindow.fromWebContents(ev.sender),
    options
  )
}

/**
 * Occurs when read music metadata is requested.
 * @param ev Event data.
 * @param filePath Path of the music file.
 */
const onReadMusicMetadata = (
  ev: IpcMainInvokeEvent,
  filePath: string
): Promise<MusicMetadata> => {
  return readMusicMetadata(filePath)
}

/**
 * Occurs when show effector window is requested.
 * @param ev Event data.
 */
const onShowEffector = async (ev: IpcMainInvokeEvent): Promise<void> => {
  toggleShowGraphicEqualizerWindow()
}

/**
 * Occurs when the status of the equalizer is requested to apply on the main window.
 * @param ev Event data.
 * @param connect If true to connect the effector, Otherwise disconnect.
 * @param gains Gain values.
 */
const onApplyEqualizerState = async (
  ev: IpcMainInvokeEvent,
  connect: boolean,
  gains: number[]
): Promise<void> => {
  const mainWindow = getMainWindow()
  if (mainWindow && ev.sender !== mainWindow.webContents) {
    mainWindow.webContents.send(IPCKey.ApplyEqualizerState, connect, gains)
  }
}

/**
 * A value indicating that an IPC events has been initialized.
 */
let initialized = false

/**
 * Initialize IPC events.
 */
export const initializeIpcEvents = () => {
  if (initialized) {
    return
  }
  initialized = true

  ipcMain.handle(IPCKey.ShowOpenDialog, onShowOpenDialog)
  ipcMain.handle(IPCKey.ShowSaveDialog, onShowSaveDialog)
  ipcMain.handle(IPCKey.ShowMessageBox, onShowMessageBox)
  ipcMain.handle(IPCKey.ReadMusicMetadata, onReadMusicMetadata)
  ipcMain.handle(IPCKey.ShowEffector, onShowEffector)
  ipcMain.handle(IPCKey.ApplyEqualizerState, onApplyEqualizerState)
}

/**
 * Release IPC events.
 */
export const releaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.ShowOpenDialog)
    ipcMain.removeAllListeners(IPCKey.ShowSaveDialog)
    ipcMain.removeAllListeners(IPCKey.ShowMessageBox)
    ipcMain.removeAllListeners(IPCKey.ReadMusicMetadata)
    ipcMain.removeAllListeners(IPCKey.ShowEffector)
    ipcMain.removeAllListeners(IPCKey.ApplyEqualizerState)
  }

  initialized = false
}

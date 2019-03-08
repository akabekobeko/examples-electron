import {
  dialog,
  BrowserWindow,
  ipcMain,
  OpenDialogOptions,
  IpcMessageEvent,
  MessageBoxOptions,
  SaveDialogOptions
} from 'electron'
import { IPCKey } from '../common/Constants'
import { ReadMusicMetadata } from './MusicMetadataReader'
import { GetMainWindow } from './WindowManager'

/**
 * Occurs when show of a file open dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showOpenDialog`.
 */
const onRequestShowOpenDialog = (
  ev: IpcMessageEvent,
  options: OpenDialogOptions
) => {
  ev.sender.send(
    IPCKey.FinishShowOpenDialog,
    dialog.showOpenDialog(BrowserWindow.fromWebContents(ev.sender), options)
  )
}

/**
 * Occurs when show of a save dialog is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showSaveDialog`.
 */
const onRequestShowSaveDialog = (
  ev: IpcMessageEvent,
  options: SaveDialogOptions
) => {
  ev.sender.send(
    IPCKey.FinishShowSaveDialog,
    dialog.showSaveDialog(BrowserWindow.fromWebContents(ev.sender), options)
  )
}

/**
 * Occurs when show of a message box is requested.
 * @param ev Event data.
 * @param options Options of `dialog.showMessageBox`.
 */
const onRequestShowMessageBox = (
  ev: IpcMessageEvent,
  options: MessageBoxOptions
) => {
  ev.sender.send(
    IPCKey.FinishShowMessageBox,
    dialog.showMessageBox(BrowserWindow.fromWebContents(ev.sender), options)
  )
}

/**
 * Occurs when read music metadata is requested.
 * @param ev Event data.
 * @param filePath Path of the music file.
 */
const onRequestReadMusicMetadata = (ev: IpcMessageEvent, filePath: string) => {
  ReadMusicMetadata(filePath)
    .then((metadata) => {
      ev.sender.send(IPCKey.FinishReadMusicMetadata, metadata)
    })
    .catch((err) => {
      ev.sender.send(IPCKey.FinishReadMusicMetadata)
    })
}

/**
 * Occurs when the status of the equalizer is requested to apply on the main window.
 * @param ev Event data.
 * @param connect If true to connect the effector, Otherwise disconnect.
 * @param gains Gain values.
 */
const onRequestApplyEqualizerState = (
  ev: IpcMessageEvent,
  connect: boolean,
  gains: number[]
) => {
  const mainWindow = GetMainWindow()
  if (mainWindow) {
    mainWindow.webContents.send(
      IPCKey.RequestApplyEqualizerState,
      connect,
      gains
    )
  }

  ev.sender.send(IPCKey.FinishApplyEqualizerState)
}

/**
 * A value indicating that an IPC events has been initialized.
 */
let initialized = false

/**
 * Initialize IPC events.
 */
export const InitializeIpcEvents = () => {
  if (initialized) {
    return
  }
  initialized = true

  ipcMain.on(IPCKey.RequestShowOpenDialog, onRequestShowOpenDialog)
  ipcMain.on(IPCKey.RequestShowSaveDialog, onRequestShowSaveDialog)
  ipcMain.on(IPCKey.RequestShowMessageBox, onRequestShowMessageBox)
  ipcMain.on(IPCKey.RequestReadMusicMetadata, onRequestReadMusicMetadata)
  ipcMain.on(IPCKey.RequestApplyEqualizerState, onRequestApplyEqualizerState)
}

/**
 * Release IPC events.
 */
export const ReleaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.RequestShowOpenDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowSaveDialog)
    ipcMain.removeAllListeners(IPCKey.RequestShowMessageBox)
    ipcMain.removeAllListeners(IPCKey.RequestReadMusicMetadata)
    ipcMain.removeAllListeners(IPCKey.RequestApplyEqualizerState)
  }

  initialized = false
}

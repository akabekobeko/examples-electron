import { app, dialog, BrowserWindow, ipcMain, OpenDialogOptions, IpcMessageEvent, MessageBoxOptions, SaveDialogOptions } from 'electron'
import { IPCKey } from '../common/Constants'
import { EnumFiles } from './FileManager'
import { FileItem } from '../common/TypeAliases';

let mainWindow

const initializeIpcEvents = () => {
  ipcMain.on(IPCKey.RequestShowOpenDialog, (ev: IpcMessageEvent, options: OpenDialogOptions) => {
    const paths = dialog.showOpenDialog(BrowserWindow.fromWebContents(ev.sender), options)
    ev.sender.send(IPCKey.FinishShowOpenDialog, paths)
  })

  ipcMain.on(IPCKey.RequestShowSaveDialog, (ev: IpcMessageEvent, options: SaveDialogOptions) => {
  const path = dialog.showSaveDialog(BrowserWindow.fromWebContents(ev.sender), options)
  ev.sender.send(IPCKey.FinishShowSaveDialog, path)
  })

  ipcMain.on(IPCKey.RequestShowMessageBox, (ev: IpcMessageEvent, options: MessageBoxOptions) => {
  const button = dialog.showMessageBox(BrowserWindow.fromWebContents(ev.sender), options)
  ev.sender.send(IPCKey.FinishShowMessageBox, button)
  })

  ipcMain.on(IPCKey.RequestEnumItems, (ev: IpcMessageEvent, folder: string) => {
    EnumFiles(folder)
      .then((items: FileItem[]) => {
        ev.sender.send(IPCKey.FinishEnumItems, items)
      })
      .catch(() => {
        ev.sender.send(IPCKey.FinishEnumItems, [])
      })
  })
}

const initializeMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    minWidth: 400,
    minHeight: 400,
    resizable: true
  })

  mainWindow.loadFile('assets/index.html')
}

app.on('ready', () => {
  console.log('Initialize Application')
  initializeIpcEvents()
  initializeMainWindow()
})

app.on('quit', () => {
  console.log('Application is quit')
})

app.on('window-all-closed', () => {
  console.log('All of the window was closed.')
  app.quit()
})


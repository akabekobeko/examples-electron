import { OpenDialogOptions, OpenDialogReturnValue } from 'electron/main'
import { MusicMetadata } from '../common/Types'

/**
 * Declare a type that depends on the renderer process of Electron.
 */
declare global {
  interface Window {
    myAPI: MyAPI
  }
}

/**
 * Provides an application-specific API.
 */
export type MyAPI = {
  /**
   * Shows the file open dialog.
   * @param options Options of the showOpenDialog API on Electron.
   * @returns Result of the dialog operation.
   */
  showOpenDialog: (options: OpenDialogOptions) => Promise<OpenDialogReturnValue>

  /**
   * Read the metadata from music file.
   * @param filePath Path of the music file.
   * @returns Metadata.
   */
  readMusicMetadata: (filePath: string) => Promise<MusicMetadata>

  /**
   * Show the effector window.
   */
  showEffector: () => Promise<void>

  /**
   * Apply to equalizer state.
   * @param connect `true` if want to connect an equalizer, `false` to disconnect.
   * @param gains Equalizer setting.
   */
  applyEqualizerState: (connect: boolean, gains: number[]) => Promise<void>
}

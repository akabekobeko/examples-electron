import { OpenDialogOptions } from 'electron'

/** Options of import music dialog. */
export const ImportMusicDialogOption: OpenDialogOptions = {
  title: 'Select music files',
  filters: [
    {
      name: 'Musics',
      extensions: [
        'mp3',
        'mp2',
        'm2a',
        'm4a',
        'aac',
        'wav',
        'wma',
        'flac',
        'opus',
        'ogg'
      ]
    }
  ],
  properties: ['openFile', 'multiSelections']
}

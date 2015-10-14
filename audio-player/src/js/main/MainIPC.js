import IPC           from 'ipc';
import Dialog        from 'dialog';
import Fs            from 'original-fs';
import MusicMetadata from 'musicmetadata';
import { IPCKeys }   from '../common/Constants.js';

/**
 * Manage the IPC of the main process.
 */
export default class MainIPC {
  /**
   * Initialize instance.
   */
  constructor() {
    IPC.on( IPCKeys.RequestImportMusic, this._onRequestImportMusic.bind( this ) );
  }

  /**
   * Occurs when the import of music files has been requested.
   *
   * @param {Event} ev Event data.
   */
  _onRequestImportMusic( ev ) {
    const options = {
      title: 'Select music files',
      filters: [
        { name: 'Musics', extensions: [ 'mp3', 'm4a', 'aac', 'wav'] }
      ],
      properties: [ 'openFile', 'multiSelections' ]
    };

    const filePaths = Dialog.showOpenDialog( options );
    if( !( filePaths ) ) { return; }

    filePaths.forEach( ( filePath ) => {
      this._readMusicMetadata( filePath, ( err, music ) => {
        if( err ) {
          console.log( err );
          return;
        }

        ev.sender.send( IPCKeys.FinishImportMusic, music );
      } );
    } );
  }

  /**
   * Read a music metadata form file.
   *
   * @param  {String}   filePath Music file path.
   * @param  {Function} callback Callback function.
   */
  _readMusicMetadata( filePath, callback ) {
    // TODO: musicmetadata occurs an exception by ReadStream!!
    const stream = Fs.createReadStream( filePath );
    MusicMetadata( stream, { duration: true }, ( err, metadata ) => {
      if( err ) {
        return callback( err );
      }

      callback( null, {
        path:     filePath,
        title:    metadata.title || '',
        artist:   ( 0 < metadata.artist.length ? metadata.artist[ 0 ] : '' ),
        album:    metadata.album || '',
        duration: metadata.duration
      } );
    } );
  }
}

import IPC           from 'ipc';
import MusicMetadata from 'musicmetadata';
import Fs            from 'fs';
import { IPCKeys }   from '../common/Constants.js';

/**
 * Communicates for renderer process by the IPC.
 */
export default class RendererIPC {
  /**
   * Initialize instance.
   */
  constructor() {
    IPC.on( IPCKeys.ReadMusicMetadata, this._onReadMusicMetadata.bind( this ) );
  }

  /**
   * Occurs when a read music file metadata requested.
   *
   * @param {Event} ev       Event data.
   * @param {File}  filePath Music file information.
   */
  _onReadMusicMetadata( ev, file ) {
    const stream = Fs.createReadStream( file.path );
    MusicMetadata( stream,  { duration: true }, ( err, metadata ) => {
      if( err ) {
        ev.sender.send( IPCKeys.ReadMusicMetadata, err );
      } else {
        ev.sender.send( IPCKeys.ReadMusicMetadata, null, {
          type:     file.type,
          path:     file.path,
          title:    metadata.title || '',
          artist:   ( 0 < metadata.artist.length ? metadata.artist[ 0 ] : '' ),
          album:    metadata.album || '',
          duration: metadata.duration
        } );
      }
    } );
  }
}

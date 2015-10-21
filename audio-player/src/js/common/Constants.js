
/**
 * IPC keys.
 * @type {Object}
 */
export const IPCKeys = {
  RequestShowMessage: 'requestShowMessage',
  FinishShowMessage:  'finishShowMessage',

  RequestShowOpenDialog: 'requestShowOpenDialog',
  FinishShowOpenDialog:  'finishShowOpenDialog',

  RequestReadMusicMetadata: 'requestReadMusicMetadata',
  FinishReadMusicMetadata:  'finishReadMusicMetadata',

  RequestGetSaveImageDir: 'requestGetSaveImageDir',
  FinishGetSaveImageDir: 'finishGetSaveImageDir'
};

/**
 * Audio playback status.
 * @type {Object}
 */
export const PlaybackState = {
  Stopped: 0,
  Paused: 1,
  Playing: 2
};

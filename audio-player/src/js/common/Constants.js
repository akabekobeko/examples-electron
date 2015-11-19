
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

  RequestUpdateGraphicEqualizer: 'requestUpdateGraphicEqualizer',
  FinishUpdateGraphicEqualizer:  'finishUpdateGraphicEqualizer'
};

/**
 * Defines the key of the Web Storage.
 * @type {Object}
 */
export const StorageKeys = {
  GraphicEqulizerParams: 'graphicEqulizerParams'
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

/**
 * Define the parameters of graphic equalizer.
 * @type {Object}
 */
export const GraphicEqulizerParams = {
  GainMin: -40,
  GainMax: 40,
  GainFlat: 0,
  GainStep: 5,
  Bands: [ 31.25, 62.5, 125, 250, 500, 1000, 2000, 4000, 8000, 16000 ]
};

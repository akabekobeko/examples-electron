
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
  GainStep: 5,
  CenterFrequency: 31.25,
  Bands: 10
};

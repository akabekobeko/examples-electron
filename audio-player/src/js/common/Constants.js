
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

  RequestShowGraphicEqualizer: 'RequestShowGraphicEqualizer',
  FinishShowGraphicEqualizer:  'finishShowGraphicEqualizer',

  RequestConnectGraphicEqualizer: 'RrequestConnectGraphicEqualizer',
  FinishConnectGraphicEqualizer:  'finishConnectGraphicEqualizer',

  RequestUpdateGraphicEqualizer: 'requestUpdateGraphicEqualizer',
  FinishUpdateGraphicEqualizer:  'finishUpdateGraphicEqualizer'
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
  CenterFrequency: 31.25,
  Bands: 10
};

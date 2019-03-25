/**
 * Flux action type is defined.
 */
export enum ActionType {
  RequestConnect = 'RequestConnect',
  FinishConnect = 'FinishConnect',

  RequestUpdateGain = 'RequestUpdateGain',
  FinishUpdateGain = 'FinishUpdateGain',

  RequestSelectPreset = 'RequestSelectPreset',
  FinishSelectPreset = 'FinishSelectPreset'
}

/**
 * State of the application.
 */
export type AppState = {
  /** A value that indicates that an effector is connected. */
  connected: boolean
  /** Value collection of frequency band. */
  gains: number[]
  /** Index of presets. */
  presetIndex: number
}

/**
 * Gain preset of graphic equalizer.
 */
export type Preset = {
  /** Name. */
  name: string
  /** Gains of frequency band. */
  gains: number[]
}

import { Preset } from './Types'

/**
 * Presets of equalizer gains.
 */
export const Presets: Preset[] = [
  { name: 'Manual', gains: [] },
  { name: 'Flat', gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: 'Acoustic', gains: [20, 20, 15, 5, 10, 10, 15, 15, 15, 10] },
  { name: 'Pops', gains: [-5, -5, 0, 5, 10, 10, 5, 5, 0, -5] },
  { name: 'Rock', gains: [20, 15, 10, 5, 0, -5, 0, 5, 10, 15] },
  { name: 'R&B', gains: [10, 25, 15, 5, -5, 0, 5, 5, 10, 15] },
  { name: 'Techno', gains: [15, 15, 10, 5, 0, 5, 0, 5, 10, 15] }
]

/**
 * Index of manual in presets.
 */
export const PresetIndexManual = 0

export const GraphicEqualizerParams = {
  GainMin: -40,
  GainMax: 40,
  GainFlat: 0,
  GainStep: 5,
  Bands: [31.25, 62.5, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]
}

const lineCount =
  Math.abs(GraphicEqualizerParams.GainMin) / GraphicEqualizerParams.GainStep +
  Math.abs(GraphicEqualizerParams.GainMax) / GraphicEqualizerParams.GainStep +
  1

export const StepLineParams = {
  Begin: 20,
  Step: 12,
  Offset: 6,
  Count: lineCount,
  CenterIndex: Math.floor(lineCount / 2)
}

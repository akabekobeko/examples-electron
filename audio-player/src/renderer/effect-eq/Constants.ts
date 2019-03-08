import { GraphicEqulizerParams } from '../Constants'
import { Preset } from './Types'

/**
 * Prests of equalizer gains.
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

const lineCount =
  Math.abs(GraphicEqulizerParams.GainMin) / GraphicEqulizerParams.GainStep +
  Math.abs(GraphicEqulizerParams.GainMax) / GraphicEqulizerParams.GainStep +
  1

export const StepLineParams = {
  Begin: 20,
  Step: 12,
  Offset: 6,
  Count: lineCount,
  CenterIndex: Math.floor(lineCount / 2)
}

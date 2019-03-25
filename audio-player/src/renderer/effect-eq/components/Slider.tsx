import React from 'react'
import { GraphicEqulizerParams as Params } from '../../Constants'
import * as Styles from './Slider.scss'

/**
 * Convert frequency to a string.
 * @param frequecy Value of frequecy.
 * @returns Converted value.
 */
const frequecyToString = (frequecy: number): string => {
  if (1000 <= frequecy) {
    const value = frequecy / 1000
    return value + 'K'
  }

  return String(frequecy)
}

type Props = {
  /** Index of bands. */
  index: number
  /**  Gain values of equalizer. */
  value: number
  /** Called when gain value is changed. */
  onChange: (index: number, value: number) => void
}

const Slider: React.FC<Props> = ({ index, value, onChange }) => (
  <div key={index}>
    <input
      className={Styles.slider}
      style={{ left: -44 + index * 31 }}
      type="range"
      value={value}
      min={Params.GainMin}
      max={Params.GainMax}
      step={Params.GainStep}
      onChange={(ev) => onChange(index, Number(ev.target.value))}
    />
    <div className={Styles.frequecy} style={{ left: index * 32 + 46 }}>
      {frequecyToString(Params.Bands[index])}
    </div>
  </div>
)

export default Slider

import React from 'react'
import PropTypes from 'prop-types'
import Styles from './GainSlider.scss'
import { GraphicEqulizerParams as Params } from '../../../Constants.js'

/**
 * Convert frequency to a string.
 *
 * @param {Number} frequecy Value of frequecy.
 *
 * @return {String} Converted value.
 */
const frequecyToString = (frequecy) => {
  if (1000 <= frequecy) {
    const value = frequecy / 1000
    return value + 'K'
  }

  return String(frequecy)
}

/**
 * Component of gain slider control.
 *
 * @param {Object} props Properties.
 * @param {Number[]} props.gains Gain values of equalizer.
 * @param {Function} props.onChange Called when gain value is changed.
 */
const GainSlider = ({ gains, onChange }) => {
  return gains.map((gain, index) => {
    return (
      <div key={index}>
        <input
          className={Styles.slider}
          style={{ left: -44 + (index * 31) }}
          type="range"
          value={gain}
          min={Params.GainMin}
          max={Params.GainMax}
          step={Params.GainStep}
          onChange={(ev) => onChange(index, ev.target.value)}
        />
        <div
          className={Styles.frequecy}
          style={{ left: (index * 32) + 46 }}>
          {frequecyToString(Params.Bands[index])}
        </div>
      </div>
    )
  })
}

GainSlider.propTypes = {
  gains: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default GainSlider

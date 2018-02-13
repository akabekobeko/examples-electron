import React from 'react'
import PropTypes from 'prop-types'
import Styles from './GainContainer.scss'
import StepLimitLine from './GainStepLimitLine.js'
import StepLine from './GainStepLine.js'
import Gain from './GainSlider.js'
import { GraphicEqulizerParams as Params } from '../../../Constants.js'

const BEGIN = 20
const STEP = 12
const OFFSET = 6
const LINE_COUNT = (Math.abs(Params.GainMin) / Params.GainStep) + (Math.abs(Params.GainMax) / Params.GainStep) + 1
const CENTER_INDEX = Math.floor(LINE_COUNT / 2)

/**
 * Component of gain controls.
 *
 * @param {Object} props Properties.
 * @param {Number[]} props.gains Gain values of equalizer.
 * @param {Function} props.onChange Called when gain value is changed.
 */
const GainContainer = ({ gains, onChange }) => {
  return (
    <div className={Styles.container}>
      <StepLimitLine
        lineCount={LINE_COUNT}
        centerIndex={CENTER_INDEX}
        begin={BEGIN}
        step={STEP}
        offset={OFFSET}
      />
      <StepLine
        lineCount={LINE_COUNT}
        centerIndex={CENTER_INDEX}
        begin={BEGIN}
        step={STEP}
      />
      <Gain
        gains={gains}
        onChange={onChange}
      />
    </div>
  )
}

GainContainer.propTypes = {
  gains: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default GainContainer

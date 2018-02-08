import React from 'react'
import PropTypes from 'prop-types'
import Styles from './GainStepLimitLine.scss'
import { GraphicEqulizerParams as Params } from '../../../Constants.js'

/**
 * Component of gain step limit lines.
 *
 * @param {object} props Properties.
 * @param {number} props.lineCount Number of grid lines.
 * @param {number} props.centerIndex Index of center grid line.
 * @param {number} props.begin Position at which drawing of lines begin.
 * @param {number} props.step Drawing interval (padding) of lines.
 * @param {number} props.offset Drawing interval (padding) of area.
 */
const GainStepLimitLine = ({ lineCount, centerIndex, begin, step, offset }) => {
  return (
    <React.Fragment>
      <div
        key={0}
        className={Styles.line}
        style={{top: begin - offset}}>
        {'+' + Params.GainMax + ' dB'}
      </div>
      <div
        key={centerIndex}
        className={Styles.line}
        style={{top: begin + (centerIndex * step) - offset}}>
        {'+' + Params.GainFlat + ' dB'}
      </div>
      <div
        key={lineCount - 1}
        className={Styles.line}
        style={{top: begin + ((lineCount - 1) * step) - offset}}>
        {Params.GainMin + ' dB'}
      </div>
    </React.Fragment>
  )
}

GainStepLimitLine.propTypes = {
  lineCount: PropTypes.number.isRequired,
  centerIndex: PropTypes.number.isRequired,
  begin: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired
}

export default GainStepLimitLine

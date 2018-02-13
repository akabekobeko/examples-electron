import React from 'react'
import PropTypes from 'prop-types'
import Styles from './GainStepLine.scss'

/**
 * Component of gain step lines.
 *
 * @param {Object} props Properties.
 * @param {Number} props.lineCount Number of grid lines.
 * @param {Number} props.centerIndex Index of center grid line.
 * @param {Number} props.begin Position at which drawing of lines begin.
 * @param {Number} props.step Drawing interval (padding) of lines.
 */
const GainStepLine = ({ lineCount, centerIndex, begin, step }) => {
  const components = []
  for (let i = 0; i < lineCount; ++i) {
    const style = i === 0 || i === centerIndex || i === lineCount - 1 ? `${Styles.line} ${Styles.highlight}` : Styles.line
    components.push(<div key={i} className={style} style={{ top: begin + (i * step) }} />)
  }

  return components
}

GainStepLine.propTypes = {
  lineCount: PropTypes.number,
  centerIndex: PropTypes.number,
  begin: PropTypes.number,
  step: PropTypes.number
}

export default GainStepLine

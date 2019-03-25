import React from 'react'
import * as Styles from './StepLine.scss'
import { StepLineParams as Line } from '../Constants'

/**
 * Create a style for StepLine.
 * @param lineCount Number of grid lines.
 * @param centerIndex  Index of center grid line.
 * @param index Index of line.
 */
const createStyle = (
  lineCount: number,
  centerIndex: number,
  index: number
): string =>
  index === 0 || index === centerIndex || index === lineCount - 1
    ? `${Styles.line} ${Styles.highlight}`
    : Styles.line

type Props = {}

const StepLine: React.FC<Props> = ({}) => {
  const components: JSX.Element[] = []
  for (let index = 0; index < Line.Count; ++index) {
    components.push(
      <div
        key={index}
        className={createStyle(Line.Count, Line.CenterIndex, index)}
        style={{ top: Line.Begin + index * Line.Step }}
      />
    )
  }

  return <>{components}</>
}

export default StepLine

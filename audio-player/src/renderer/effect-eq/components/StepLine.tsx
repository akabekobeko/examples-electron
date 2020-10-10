import React from 'react'
import styled from 'styled-components'
import { StepLineParams as Line } from '../Constants'

const StyledLine = styled.div`
  position: absolute;
  left: 40px;
  right: 0;
  border-top: solid 1px ${(props) => props.theme.colors.grayLight};
`

const StyledHighlight = styled(StyledLine)`
  border-top: solid 1px ${(props) => props.theme.colors.gray};
`

/**
 * Create a style for StepLine.
 * @param lineCount Number of grid lines.
 * @param centerIndex  Index of center grid line.
 * @param index Index of line.
 */
const createStyle = (lineCount: number, centerIndex: number, index: number) =>
  index === 0 || index === centerIndex || index === lineCount - 1
    ? StyledHighlight
    : StyledLine

/**
 * Line of step on slider control.
 */
export const StepLine: React.FC = () => {
  const components: JSX.Element[] = []
  for (let index = 0; index < Line.Count; ++index) {
    const LineItem = createStyle(Line.Count, Line.CenterIndex, index)
    components.push(
      <LineItem key={index} style={{ top: Line.Begin + index * Line.Step }} />
    )
  }

  return <>{components}</>
}

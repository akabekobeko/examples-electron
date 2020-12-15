import React from 'react'
import styled from 'styled-components'
import { GraphicEqualizerParams as EQ } from '../Constants'
import { StepLineParams as Line } from '../Constants'

const StyledLine = styled.div`
  user-select: none;
  position: absolute;
  left: 0;
  width: 38px;
  text-align: right;
  font-size: 11px;
  cursor: default;
`

/**
 * Limit line of step on slider control.
 */
export const StepLineLimit: React.FC = () => (
  <>
    <StyledLine key={0} style={{ top: Line.Begin - Line.Offset }}>
      {'+' + EQ.GainMax}
    </StyledLine>
    <StyledLine
      key={Line.CenterIndex}
      style={{ top: Line.Begin + Line.CenterIndex * Line.Step - Line.Offset }}
    >
      {'+' + EQ.GainFlat}
    </StyledLine>
    <StyledLine
      key={Line.Count - 1}
      style={{
        top: Line.Begin + (Line.Count - 1) * Line.Step - Line.Offset
      }}
    >
      {EQ.GainMin}
    </StyledLine>
  </>
)

import React from 'react'
import * as Styles from './StepLineLimit.scss'
import { GraphicEqulizerParams as EQ } from '../../Constants'
import { StepLineParams as Line } from '../Constants'

type Props = {}

/**
 * Limit line of step on slider control.
 */
export const StepLineLimit: React.FC<Props> = () => (
  <>
    <div
      key={0}
      className={Styles.line}
      style={{ top: Line.Begin - Line.Offset }}
    >
      {'+' + EQ.GainMax + ' dB'}
    </div>
    <div
      key={Line.CenterIndex}
      className={Styles.line}
      style={{ top: Line.Begin + Line.CenterIndex * Line.Step - Line.Offset }}
    >
      {'+' + EQ.GainFlat + ' dB'}
    </div>
    <div
      key={Line.Count - 1}
      className={Styles.line}
      style={{
        top: Line.Begin + (Line.Count - 1) * Line.Step - Line.Offset
      }}
    >
      {EQ.GainMin + ' dB'}
    </div>
  </>
)

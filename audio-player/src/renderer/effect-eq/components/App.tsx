import React from 'react'
import styled from 'styled-components'
import { PresetsSelector } from './PresetsSelector'
import { ConnectorSwitch } from './ConnectorSwitch'
import { StepLine } from './StepLine'
import { StepLineLimit } from './StepLineLimit'
import { Slider } from './Slider'

export type StateByProps = {
  /** Indicates that the connector is ON. */
  connected: boolean
  /** The index of the selected option. */
  presetIndex: number
  /** Gain value of frequency band. */
  gains: number[]
}

export type DispatchByProps = {
  /** Called when the option selection is changed. */
  selectPreset?: (presetIndex: number) => void
  /** Called when the connector state is changed. */
  connectEffector?: (connected: boolean) => void
  /** Called when gain value is changed. */
  updateGain?: (index: number, value: number) => void
}

type Props = StateByProps & DispatchByProps

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.white};
`

const StyledHeader = styled.div`
  position: relative;
  height: 32px;
`

const StyledPresets = styled.div`
  position: absolute;
  left: 8px;
  top: 8px;
  width: 128px;
`

const StyledConnector = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  width: 48px;
`

const StyledGain = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`

export const App: React.FC<Props> = ({
  connected,
  presetIndex,
  gains,
  selectPreset = () => {},
  connectEffector = () => {},
  updateGain = () => {}
}) => (
  <StyledApp>
    <StyledHeader>
      <StyledPresets>
        <PresetsSelector
          presetIndex={presetIndex}
          onSelect={(index) => selectPreset(index)}
        />
      </StyledPresets>
      <StyledConnector>
        <ConnectorSwitch connected={connected} onChange={connectEffector} />
      </StyledConnector>
    </StyledHeader>
    <StyledGain>
      <StepLineLimit />
      <StepLine />
      {gains.map((gain, index) => (
        <Slider key={index} index={index} value={gain} onChange={updateGain} />
      ))}
    </StyledGain>
  </StyledApp>
)

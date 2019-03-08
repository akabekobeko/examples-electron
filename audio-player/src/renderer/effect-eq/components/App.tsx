import React from 'react'
import * as Styles from './App.scss'
import PresetsSelector from './PresetsSelector'
import ConnectorSwitch from './ConnectorSwitch'
import StepLine from './StepLine'
import StepLineLimit from './StepLineLimit'
import Slider from './Slider'

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

const App: React.FC<Props> = ({
  connected,
  presetIndex,
  gains,
  selectPreset = () => {},
  connectEffector = () => {},
  updateGain = () => {}
}) => (
  <div className={Styles.effector}>
    <div className={Styles.header}>
      <div className={Styles.presets}>
        <PresetsSelector
          presetIndex={presetIndex}
          onSelect={(index) => selectPreset(index)}
        />
      </div>
      <div className={Styles.connector}>
        <ConnectorSwitch connected={connected} onChange={connectEffector} />
      </div>
    </div>
    <div className={Styles.gain}>
      <StepLineLimit />
      <StepLine />
      {gains.map((gain, index) => (
        <Slider index={index} value={gain} onChange={updateGain} />
      ))}
    </div>
  </div>
)

export default App

import React from 'react'
import { Presets } from '../Constants'
import * as Styles from './PresetsSelector.scss'

type Props = {
  /** The index of the selected option. */
  presetIndex: number
  /** Called when the option selection is changed. */
  onSelect: (presetIndex: number) => void
}

export const PresetsSelector: React.FC<Props> = ({ presetIndex, onSelect }) => (
  <div className={Styles.selectbox}>
    <div className={Styles.dropdown}>
      <select
        className={Styles.select}
        value={presetIndex}
        onChange={(ev) => onSelect(Number(ev.target.value))}
      >
        {Presets.map((preset, index) => (
          <option key={index} value={index}>
            {preset.name}
          </option>
        ))}
      </select>
    </div>
  </div>
)

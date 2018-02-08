import React from 'react'
import PropTypes from 'prop-types'
import Styles from './HeaderContainer.scss'
import SelectBox from './HeaderSelectBox.js'
import Switch from './HeaderSwitch.js'

/**
 * Component of the header.
 *
 * @param {object} props Properties of component.
 * @param {string[]} props.presets Names of prest.
 * @param {number} props.presetIndex The index of the selected preset.
 * @param {boolean} props.connected A value indicating that the equalizer is connected.
 * @param {function} props.onPresetSelect Called when the preset is changed.
 * @param {function} props.onConnect Called when the equalizer connection is changed.
 */
const HeaderContainer = ({ presets, presetIndex, connected, onPresetSelect, onConnect }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.presets}>
        <SelectBox
          options={presets}
          index={presetIndex}
          onSelect={(index) => onPresetSelect(index)}
        />
      </div>
      <div className={Styles.connect}>
        <Switch
          checked={connected}
          onChange={(checked) => onConnect(checked)}
        />
      </div>
    </div>
  )
}

HeaderContainer.propTypes = {
  presets: PropTypes.array.isRequired,
  presetIndex: PropTypes.number.isRequired,
  connected: PropTypes.bool.isRequired,
  onPresetSelect: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired
}

export default HeaderContainer

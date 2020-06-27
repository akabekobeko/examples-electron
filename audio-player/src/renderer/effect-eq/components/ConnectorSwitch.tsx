import React from 'react'
import * as Styles from './ConnectorSwitch.scss'

type Props = {
  /** Indicates that the connector is ON. */
  connected: boolean
  /** Called when the connector state is changed. */
  onChange: (connected: boolean) => void
}

/**
 * Conponent of a connector switch.
 */
export const ConnectorSwitch: React.FC<Props> = ({ connected, onChange }) => (
  <div className={Styles.connector} onClick={() => onChange(!connected)}>
    <input
      id="switch"
      name="switch"
      type="checkbox"
      className={Styles.checkbox}
      checked={connected}
      onChange={() => {
        // Dummy, Use only control clicks
      }}
    />
    <label className={Styles.label} />
  </div>
)

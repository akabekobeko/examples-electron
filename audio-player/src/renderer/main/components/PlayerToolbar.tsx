import React from 'react'
import Styles from './PlayerToolbar.scss'

type Props = {
  /** Occurs when the remove music button is pressed. */
  removeMusic: () => void
  /** Occurs when the import music button is pressed. */
  importMusic: () => void
  /** Occurs when the show effector button is pressed. */
  showEffector: () => void
}

const PlayerToolbar: React.FC<Props> = ({
  removeMusic,
  importMusic,
  showEffector
}) => (
  <div className={Styles.toolbar}>
    <div className={Styles.container}>
      <div
        className={`${Styles.button} ${Styles.remove} icon_circle_with_minus`}
        title="Remove slected music"
        onClick={removeMusic}
      />
      <div
        className={`${Styles.button} ${Styles.import} icon_circle_with_plus`}
        title="Import music files"
        onClick={importMusic}
      />
      <div
        className={`${Styles.button} ${Styles.show_effector} icon_sound_mix`}
        title="Show/Hidden effector window"
        onClick={showEffector}
      />
    </div>
  </div>
)

export default PlayerToolbar

import React from 'react'
import Styles from './PlayerToolbar.scss'

type Props = {
  /** Occurs when the remove music button is pressed. */
  removeMusic: () => void
  /** Occurs when the import music button is pressed. */
  importMusic: () => void
}

const PlayerToolbar: React.FC<Props> = ({ removeMusic, importMusic }) => (
  <div className={Styles.toolbar}>
    <div className={Styles.container}>
      <div
        className={`${Styles.button} ${Styles.remove}`}
        onClick={removeMusic}
      >
        <i className={'icon_circle_with_minus'} />
      </div>
      <div
        className={`${Styles.button} ${Styles.import}`}
        onClick={importMusic}
      >
        <i className={'icon_circle_with_plus'} />
      </div>
    </div>
  </div>
)

export default PlayerToolbar

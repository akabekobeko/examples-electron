import React from 'react'
import * as Styles from './NewWindow.scss'

type Props = {
  onClick: () => void
}

/**
 * Component of a contorol for create new window.
 */
export const NewWindow: React.FC<Props> = ({ onClick }) => {
  return (
    <fieldset className={Styles.container}>
      <legend>Window</legend>
      <div className={Styles.button} onClick={onClick}>
        New Window
      </div>
    </fieldset>
  )
}

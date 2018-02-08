import React from 'react'
import PropTypes from 'prop-types'
import Styles from './AudioPlayerToolbar.scss'

/**
 * Component of an audio player toolbar.
 *
 * @param {object} props Properties.
 * @param {function} props.onRemove Called when the music is removed.
 * @param {function} props.onImport Called when the music is imported.
 */
const AudioPlayerToolbar = ({ onRemove, onImport }) => {
  return (
    <div className={Styles.toolbar}>
      <div className={Styles.container}>
        <div
          className={`${Styles.button} ${Styles.remove}`}
          onClick={onRemove}>
          <i className={'icon-minus'} />
        </div>
        <div
          className={`${Styles.button} ${Styles.import}`}
          onClick={onImport}>
          <i className={'icon-plus'} />
        </div>
      </div>
    </div>
  )
}

AudioPlayerToolbar.propTypes = {
  onRemove: PropTypes.func,
  onImport: PropTypes.func
}

export default AudioPlayerToolbar

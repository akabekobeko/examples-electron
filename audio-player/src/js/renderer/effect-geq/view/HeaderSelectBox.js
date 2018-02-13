import React from 'react'
import PropTypes from 'prop-types'
import Styles from './HeaderSelectBox.scss'

/**
 * Component of the selectable control.
 *
 * @param {Object} props Properties of component.
 * @param {String[]} props.options Selectable items.
 * @param {Number} props.index The index of the selected option.
 * @param {Function} props.onSelect Called when the option selection is changed.
 */
const HeaderSelectBox = ({ options, index, onSelect }) => {
  return (
    <div className={Styles.selectbox}>
      <div className={Styles.dropdown}>
        <select
          className={Styles.select}
          value={index}
          onChange={(ev) => onSelect(Number(ev.target.value))}>
          {options.map((option, i) => {
            return <option key={i} value={i}>{option}</option>
          })}
        </select>
      </div>
    </div>
  )
}

HeaderSelectBox.propTypes = {
  options: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default HeaderSelectBox

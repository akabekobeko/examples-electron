import React from 'react'
import PropTypes from 'prop-types'
import Styles from './HeaderSelectBox.scss'

/**
 * Component of the selectable control.
 *
 * @param {object} props Properties of component.
 * @param {string[]} props.options Selectable items.
 * @param {number} props.index The index of the selected option.
 * @param {function} props.onSelect Called when the option selection is changed.
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

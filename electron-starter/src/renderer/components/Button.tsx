import React from 'react'
import { button } from './Button.scss'

type Props = {
  label: string
  onClick: () => void
}

const Button: React.FC<Props> = ({ label, onClick }) => (
  <span className={button} onClick={onClick}>
    {label}
  </span>
)

export default Button

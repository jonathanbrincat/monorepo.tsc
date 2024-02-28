import { FC } from 'react'

import type { ButtonProps } from './Button.types.js' // intellisense changed to .js as oppose to .ts
import './button.css'

const Button: FC<ButtonProps> = ({ type, text, onClickHandler }) => {
  return (
    <button type="button" className={`button button-${type}`} onClick={onClickHandler}>
      {text}
    </button>
  )
}

export default Button

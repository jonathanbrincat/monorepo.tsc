import type { ButtonProps } from './Button.types.js'

import './button.css'

export default function Button({ type, text, onClickHandler }: ButtonProps): React.JSX.Element {
  return (
    <button type="button" className={`button button-${type}`} onClick={onClickHandler}>
      {text}
    </button>
  )
}

// import type { MouseEventHandler } from 'react'

export interface ButtonProps {
  type: 'primary' | 'secondary' | 'error';
  text: string;
  // onClickHandler: MouseEventHandler<HTMLButtonElement>
}
import React, { useState, useRef, useEffect } from 'react'

import './Digit.css'

export default function Digit({ value }: { value: number}) {
  const [toggle, setToggle] = useState(false)
  const [previousValue, setPreviousValue] = useState(value)
  const foo: React.MutableRefObject<T | null> = useRef(null)
  const bar: React.MutableRefObject<T | null> = useRef(null)

  useEffect(() => {
    // console.log('top :: ', foo.current)
    // console.log('bottom :: ', bar.current)

    if (foo.current) {
      foo.current?.addEventListener('transitionstart', (event: React.SyntheticEvent<T>) => {
        console.log('transitionstart :: top')
      })
      foo.current?.addEventListener('transitionend', (event: React.SyntheticEvent<T>) => {
        console.log('transitionend :: bottom')
      })
    }

    return () => {
      if (foo.current) {
        foo.current?.removeEventListener('transitionstart', (event: React.SyntheticEvent<T>) => { })
        foo.current?.removeEventListener('transitionend', (event: React.SyntheticEvent<T>) => { })
      }
    }
  }, [])

  useEffect(() => {
    return () => setPreviousValue(value)
  }, [value])

  return (
    <div className="ui__digit">
      <div>
          {/* <DEVNOTE: Modulus operand is enforced as a guard to safeguard single-digit usage */}
          <div className="digit" data-before={Math.abs(value % 10)} data-after={Math.abs(previousValue % 10)}>
          {/* <Transition name="card-top"> */}
            {/* DEVNOTE: alternative to using v-if with v-show; no pitfalls for doing it this way either */}
          <div className="card card-top" ref={foo} v-show="toggle" style={{ display: toggle ? 'none' : 'flex' }}>{toggle ? Math.abs(value % 10) : Math.abs(previousValue % 10)}</div>

            {/* <div className="card card-top" v-if="toggle">{Math.abs(value % 10)}</div> */}
          {/* </Transition> */}

          {/* <Transition name="card-bottom" @after-leave="onDigitAfterLeave"> */}
            <div className="card card-bottom" ref={bar} v-show="toggle" style={{ display: toggle ? 'none' : 'flex' }}>{Math.abs(value % 10)}</div>
          {/* </Transition> */}
        </div>
        <p className="text-xs">toggle: {JSON.stringify(toggle)}</p>
        <p className="text-xs">previousValue: {JSON.stringify(previousValue)}</p>
      </div>
    </div>
  )
}

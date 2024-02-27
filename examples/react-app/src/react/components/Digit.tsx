import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useAnimate, useAnimation } from 'framer-motion'

import './Digit.css'

// BUGS:
// 1.the animation running on mount is potentially causing issues by trigger false positives; i think to get around this framer has a helper effect that use to check if mounted or somthing also this might help
//  https://stackoverflow.com/questions/67626851/avoiding-framer-motion-initial-animations-on-mount
// 2.okay what needs to happen is as soon as the animation starts from the top, the bottom half needs to disappear or reset to 90deg. it currently stays put and awaits its turn in the sequence. the bottom half is good to stay planted until the top animation starts
// https://stackoverflow.com/questions/76635299/how-to-setup-the-initial-value-with-framer-motion-useanimate-hook

// const controls = useAnimation()
// controls.set({ rotateX: 90 })
// await controls.start({ rotateX: 90 })
// https://www.youtube.com/watch?v=yKeqNWm835s&ab_channel=KonstantinLebedev

// TODO:
// 1. turn framer motion animation into custom hook
// 2. move css into own library @brincat/styles

// INTERESTING APPROACH
// https://github.com/sLeeNguyen/react-flip-clock-countdown - circa 3000+ weekly downloads. handles react animiations with css transitiona
// https://www.npmjs.com/package/@pqina/flip - circa 4000+ weekly downloads. encapsulated with vanilla js and custom rendering engine. really slick animation.

export default function Digit({ value }: { value: number}) {
  const [pulse, setPulse] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [previousValue, setPreviousValue] = useState(value)

  // const foo: React.MutableRefObject<T | null> = useRef(null)

  const [isMounted, setIsMounted] = useState(false)
  const [scope, animate] = useAnimate()
  const [scope1, animate1] = useAnimate()
  const [scope2, animate2] = useAnimate()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useLayoutEffect(() => {
    if (value !== previousValue) {
      setPulse(!pulse)
      setToggle(false)
    }

    // JB: exploits cleanup mechanic and captured closure of differing variable scope
    // return () => setPreviousValue(value)
    return () => {
      // setPreviousValue(value)
      setPreviousValue(() => {
        return value
      })
    }
  }, [value])

  useEffect(() => {
    // if (value !== previousValue) {
    //   setPulse(!pulse)
    //   setToggle(false)
    // }

    // JB: exploits cleanup mechanic and captured closure of differing variable scope
    // return () => setPreviousValue(value)
    return () => {
      // setPreviousValue(value)
      // setPreviousValue(() => {
      //   return value
      // })
    }
  }, [value])

  useEffect(() => {
    if (isMounted) {
      const enterAnimation = async () => {
        // await animate1(scope1.current, { display: 'flex', rotateX: [0, -90], transitionEnd: { display: 'none' } }, { type: 'tween', duration: 0.3, ease: 'linear' })
        // await animate2(scope2.current, { display: 'flex', rotateX: [90, 0], transitionEnd: { display: 'none' } }, { type: 'tween', duration: 0.3, ease: 'linear' })

        animate2(scope2.current, { rotateX: [90]}, { duration: 0, ease: 'linear' }) // JB: bodge. need to reset back to 90deg. don't know a better way
        await animate1(scope1.current, { rotateX: [0, -90] }, { duration: 0.3, ease: 'linear' })
        await animate2(scope2.current, { rotateX: [90, 0]}, { duration: 0.3, ease: 'linear' })
        
        setToggle(true)
        
        // animate([
        //   ['div.foo', { display: 'block', transformPerspective: 600, rotateX: [0, -90], transitionEnd: { display: 'none' } }, { type: 'tween', duration: 0.4, ease: 'linear' }],
        //   ['div.bar', { display: 'block', transformPerspective: 600, rotateX: [90, 0], transitionEnd: { display: 'none' } }, { type: 'tween', duration: 0.4, ease: 'linear' }]
        // ])
      }
      enterAnimation()
    }
  }, [pulse])

  return (
    <div className="ui__digit">
      <div>
        <div className="digit" data-before={Math.abs(value % 10)} data-after={Math.abs(previousValue % 10)}>
          <div 
            className="card card-top"
            // style={toggle ? {display: 'none'} : {}}
            ref={scope1}
          >
            {toggle ? Math.abs(value % 10) : Math.abs(previousValue % 10)}
          </div>
          
          <div
            className="card card-bottom"
            // style={toggle ? { display: 'none' } : {}} 
            ref={scope2}
          >
            {Math.abs(value % 10)}
          </div>
        </div>

        <div>
          <p className="text-xs mt-12">pulse: {JSON.stringify(pulse)}</p>
          <p className="text-xs">toggle: {JSON.stringify(toggle)}</p>
          <p className="text-xs">previousValue: {JSON.stringify(previousValue)}</p>
        </div>
      </div>
    </div>
  )
}

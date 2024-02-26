import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence, useAnimate, usePresence } from 'framer-motion'
import clsx from 'clsx'

import './Digit.css'

// BUGS:
// the animation running on mount is potentially causing issues by trigger false positives; i think to get around this framer has a helper effect that use to check if mounted or somthing also this might help
//  https://stackoverflow.com/questions/67626851/avoiding-framer-motion-initial-animations-on-mount
// the :after needs to switch to the current number when the animated bottom half finishes.
// i don't use this orchestration in the vue version, so how am i getting away with it?
// i dont actually display none with the vue version it seems.
// it looks like the bottom slide doesn't start with an initial rotation of 90. so obscures the number behind it. until it shifts to animate.
// https://stackoverflow.com/questions/76635299/how-to-setup-the-initial-value-with-framer-motion-useanimate-hook
// the top car is also not visible like the vue version. but not sure this is having a negative effect
// okay what needs to happen is as soon as the animation starts from the top, the bottom half needs to disappear or reset to 90deg. it currently stays put and awaits its turn in the sequence. the bottom half is good to stay planted until the top animation starts

// TODO: turn framer motion animation into custom hook
// move css into own library @brincat/styles

export default function Digit({ value }: { value: number}) {
  const [pulse, setPulse] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [flipped, setFlipped] = useState(false)
  const [previousValue, setPreviousValue] = useState(value)

  // const foo: React.MutableRefObject<T | null> = useRef(null)
  // const bar: React.MutableRefObject<T | null> = useRef(null)

  const variants = {
    in: { rotateX: -90, transitionEnd: { display: 'none' } },
    out: { rotateX: 0, transitionEnd: { display: 'none' } },
  }

  const [scope, animate] = useAnimate()
  const [scope1, animate1] = useAnimate()
  const [scope2, animate2] = useAnimate()
  const [isPresent, safeToRemove] = usePresence()

  const [shouldStartAnimation, setShouldStartAnimation] = useState(false)

  useEffect(() => {
    setShouldStartAnimation(true)
  }, [])

  // render synchronously BEFORE react renders and forces a batch reflow/repaint
  useLayoutEffect(() => {
    if (value !== previousValue) {
      // setToggle(false)
    } else {
      // setToggle(true)
    }

    // JB: exploits cleanup mechanic and captured closure of differing variable scope
    // return () => setPreviousValue(value)
    return () => {
      // setPreviousValue(value)
      // setPreviousValue(() => {
      //   return value
      // })
    }
  }, [value])

  // render asynchronously AFTER(concurrently) the render and the relow and/repaint
  useEffect(() => {
    if (value !== previousValue) {
      setPulse(!pulse)

      setToggle(false)
    }

    // Cleanup function, executed before next render or unmount

    // JB: exploits cleanup mechanic and captured closure of differing variable scope
    // return () => setPreviousValue(value)
    return () => {
      // setPreviousValue(value)
      setPreviousValue(() => {
        return value
      })
    }
  }, [value])

  // useEffect(() => {
  //   if (isPresent) {
  //     const enterAnimation = async () => {
  //       await animate(scope.current, { opacity: 1 })
  //       await animate("li", { opacity: 1, x: 0 })
  //     }
  //     enterAnimation()

  //   } else {
  //     const exitAnimation = async () => {
  //       await animate('li', { opacity: 0, x: 100 })
  //       await animate(scope.current, { opacity: 0 })
  //       safeToRemove()
  //     }
  //     exitAnimation()
  //   }
  // }, [isPresent])


  // in: { rotateX: -90, transitionEnd: { display: 'none' } },
  // out: { rotateX: 0, transitionEnd: { display: 'none' } },
  useEffect(() => {
    // if (flipped) {
    if (shouldStartAnimation) {
      const enterAnimation = async () => {
        // await animate1(scope1.current, { display: 'flex', rotateX: [0, -90], transitionEnd: { display: 'none' } }, { type: 'tween', duration: 0.3, ease: 'linear' })
        // await animate2(scope2.current, { display: 'flex', rotateX: [90, 0], transitionEnd: { display: 'none' } }, { type: 'tween', duration: 0.3, ease: 'linear' })

        animate2(scope2.current, { rotateX: [90]}, { type: 'tween', duration: 0, ease: 'linear' }) // JB: bodge. need to reset back to 90deg. don't know a better way
        await animate1(scope1.current, { rotateX: [0, -90] }, { type: 'tween', duration: 0.3, ease: 'linear' })
        await animate2(scope2.current, { rotateX: [90, 0]}, { type: 'tween', duration: 0.3, ease: 'linear' })
        
        setToggle(true)
        
        // animate([
        //   ['div.foo', { display: 'block', transformPerspective: 600, rotateX: [0, -90], transitionEnd: { display: 'none' } }, { type: 'tween', duration: 0.4, ease: 'linear' }],
        //   ['div.bar', { display: 'block', transformPerspective: 600, rotateX: [90, 0], transitionEnd: { display: 'none' } }, { type: 'tween', duration: 0.4, ease: 'linear' }]
        // ])
      }
      enterAnimation()

    }
    // else {
    //   const exitAnimation = async () => {
    //     await animate1(scope1.current, { rotateX: 0 }, { type: 'tween', duration: 0.4 })
    //     await animate2(scope2.current, { rotateX: -90 }, { type: 'tween', duration: 0.4 })
    //   }
    //   exitAnimation()
    // }
  }, [pulse])

  return (
    <div className="ui__digit">
      <div className="libs text-sm">
        {/* framer motion */}
        {/* <div className="demo" onClick={() => setFlipped(state => !state)}> */}
          {/* <AnimatePresence initial={false}>
            {
              flipped && (
                <motion.div
                  className="demo__card card-back"
                  key="top"
                  animate={{ rotateX: 0 }}
                  exit={{ rotateX: -90 }}
                  transition={{ type: 'tween', duration: 0.5 }}
                  style={{ transformPerspective: 800 }}
                >Top</motion.div>
              )
            }
            {
              !flipped && (
                <motion.div
                  className="demo__card card-front"
                  key="bottom"
                  animate={{ rotateX: 90 }}
                  exit={{ rotateX: 0 }}
                  transition={{ type: 'tween', duration: 0.5 }}
                  style={{ transformPerspective: 800 }}
                >Bottom</motion.div>
              )
            }
          </AnimatePresence> */}

          {/* {
            flipped && (
              <motion.div
                layout
                className="demo__card card-back"
                variants={variants}
                initial={{ rotateX: 0 }}
                animate="in"
                transition={{ type: 'tween', duration: 0.5 }}
                style={{ transformPerspective: 800 }}
                
              >Top</motion.div>
            )
          }
          {
            !flipped && (
              <motion.div
                layout
                className="demo__card card-front"
                variants={variants}
                initial={{ rotateX: 90 }}
                animate="out"
                transition={{ type: 'tween', duration: 0.5 }}
                style={{ transformPerspective: 800 }}
              >Bottom</motion.div>
            )
          } */}
        {/* </div> */}

        {/* {
          flipped && (
            <motion.div
              className="demo"
              // animate={isToggle ? "in" : "out"}
            >
              <motion.div
                className="demo__card card-back"
                variants={variants}
                initial={{ rotateX: 0 }}
                animate="in"
                transition={{ type: 'tween', duration: 0.5 }}
                style={{ transformPerspective: 800 }}
              >Top</motion.div>

              <motion.div
                className="demo__card card-front"
                variants={variants}
                initial={{ rotateX: 90 }}
                animate="out"
                transition={{ type: 'tween', duration: 0.5 }}
                style={{ transformPerspective: 800 }}
              >Bottom</motion.div>
            </motion.div>
          )
        } */}

        {/* <div className="demo" ref={scope} onClick={() => setFlipped(state => !state)}>
          <div className="demo__card card-back foo" ref={scope1}>Top 1</div>
          <div className="demo__card card-front bar" ref={scope2}>Bottom 1</div>
        </div> */}

        {/* <div className="demo" onClick={() => setFlipped(state => !state)}>
          <AnimatePresence>
            {
              flipped ? (
                <div key="dialog">
                  <ul className="test" ref={scope}>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                  </ul>
                </div>
              )
              : null
            }
          </AnimatePresence>          
        </div> */}
      </div>
      
      <div>
        <div className="digit" data-before={Math.abs(value % 10)} data-after={Math.abs(previousValue % 10)}>
          <div 
            className="card card-top"
            // style={toggle ? {display: 'none'} : {}}
            // ref={foo}
            ref={scope1}
            // onTransitionEnd={onDigitAfterLeave1}
          >
            {toggle ? Math.abs(value % 10) : Math.abs(previousValue % 10)}
          </div>
          
          <div
            className="card card-bottom"
            // style={toggle ? { display: 'none' } : {}} 
            // ref={bar}
            ref={scope2}
            // onTransitionEnd={onDigitAfterLeave2}
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

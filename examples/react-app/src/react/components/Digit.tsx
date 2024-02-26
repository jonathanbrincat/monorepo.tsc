import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence, useAnimate, usePresence } from 'framer-motion'
import clsx from 'clsx'

import './Digit.css'

export default function Digit({ value }: { value: number}) {
  const [toggle, setToggle] = useState(true)
  const [flipped, setFlipped] = useState(false)
  const [previousValue, setPreviousValue] = useState(value)

  const foo: React.MutableRefObject<T | null> = useRef(null)
  const bar: React.MutableRefObject<T | null> = useRef(null)

  const variants = {
    in: { rotateX: -90, transitionEnd: { display: 'none' } },
    out: { rotateX: 0, transitionEnd: { display: 'none' } },
  }

  const [scope, animate] = useAnimate()
  const [scope1, animate1] = useAnimate()
  const [scope2, animate2] = useAnimate()
  const [isPresent, safeToRemove] = usePresence()

  // render synchronously BEFORE react renders and forces a batch reflow/repaint
  useLayoutEffect(() => {
    if (value !== previousValue) {
      // setToggle(false)
    } else {
      // setToggle(true)
    }

    bar.current?.classList.remove('card-bottom-leave-to')
    bar.current?.classList.add('card-bottom-leave-from')

    // JB: exploits cleanup mechanic and captured closure of differing variable scope
    // return () => setPreviousValue(value)
    return () => {
      setPreviousValue(value)
      // setPreviousValue(() => {
      //   return value
      // })
    }
  }, [value])

  // render asynchronously AFTER(concurrently) the render and the relow and/repaint
  useEffect(() => {
    if (value !== previousValue) {
      // setToggle(false)
      setToggle(() => {
        return false
      })
    }

    // Cleanup function, executed before next render or unmount

    // JB: exploits cleanup mechanic and captured closure of differing variable scope
    // return () => setPreviousValue(value)
    return () => {
      // setPreviousValue(value)
      // setPreviousValue(() => {
      //   return value
      // })
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
    if (flipped) {
      const enterAnimation = async () => {
        await animate1(scope1.current, { display: 'block', transformPerspective: 600, rotateX: [0, -90], transitionEnd: { display: 'none' } }, { type: 'tween', duration: 0.4, ease: 'linear' })
        await animate2(scope2.current, { display: 'block', transformPerspective: 600, rotateX: [90, 0], transitionEnd: { display: 'none' } }, { type: 'tween', duration: 0.4, ease: 'linear' })

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
  }, [flipped])

  async function onDigitAfterLeave1(event) {
    // event.stopPropagation()
  }

  async function onDigitAfterLeave2(event) {
    // event.stopPropagation()

    // setToggle(true)
  }

  return (
    <div className="ui__digit text-sm">
      <div className="libs">
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

        <div className="demo" ref={scope} onClick={() => setFlipped(state => !state)}>
          <div className="demo__card card-back foo" ref={scope1}>Top 1</div>
          <div className="demo__card card-front bar" ref={scope2}>Bottom 1</div>
        </div>

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
      
      {/* <div>
        <div className="digit" data-before={Math.abs(value % 10)} data-after={Math.abs(previousValue % 10)}>

          <div 
            className="card card-top card-top-leave-active"
            style={toggle ? {display: 'none'} : {}} 
            ref={foo}
            onTransitionEnd={onDigitAfterLeave1}
          >
            {toggle ? Math.abs(value % 10) : Math.abs(previousValue % 10)}
          </div>
          
          <div
            className="card card-bottom"
            // style={toggle ? { display: 'none' } : {}} 
            ref={bar}
            onTransitionEnd={onDigitAfterLeave2}
          >
            {Math.abs(value % 10)}
          </div>
        </div>

      </div> */}
      <p className="text-xs mt-16">toggle: {JSON.stringify(toggle)}</p>
      <p className="text-xs">previousValue: {JSON.stringify(previousValue)}</p>
    </div>
  )
}

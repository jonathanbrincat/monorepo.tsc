import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence, useAnimate, usePresence } from 'framer-motion'
import clsx from 'clsx'

import './Digit.css'

const data = ['hi', 'there!']

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


  useEffect(() => {
    // console.log('top :: ', foo.current)
    // console.log('bottom :: ', bar.current)

    /*
    foo.current?.addEventListener('transitionend', (event: React.SyntheticEvent<T>) => {
      console.log('transitionend :: top', event.target)

      // event.target
      foo.current?.classList.remove('card-top-leave-active', 'card-top-leave-to')
    })

    bar.current?.addEventListener('transitionend', (event: React.SyntheticEvent<T>) => {
      // console.log('transitionend :: bottom')

      // setToggle(true)
      
      // bar.current?.classList.remove('card-bottom-leave-active', 'card-bottom-leave-to')
    })

    return () => {
      foo.current?.removeEventListener('transitionend', (event: React.SyntheticEvent<T>) => { })
      bar.current?.removeEventListener('transitionend', (event: React.SyntheticEvent<T>) => { })
    }
    */
  }, [])

  // render synchronously BEFORE react renders and forces a batch reflow/repaint
  useLayoutEffect(() => {
    // console.log('2. useLayoutEffect ', value, foo)

    if (value !== previousValue) {
      // setToggle(false)
    } else {
      // setToggle(true)
    }
    // foo.current?.classList.add('card-top-leave-from')
    // bar.current?.classList.add('card-bottom-leave-to', 'card-bottom-leave-from')

    bar.current?.classList.remove('card-bottom-leave-to')
    bar.current?.classList.add('card-bottom-leave-from')

    // JB: exploits cleanup mechanic and captured closure of differing variable scope
    // return () => setPreviousValue(value)
    return () => {
      // console.log('useLayoutEffect cleanup')

      // foo.current?.classList.add('card-top-leave-from')
      // bar.current?.classList.add('card-bottom-leave-from')

      setPreviousValue(value)
      // setPreviousValue(() => {
      //   return value
      // })
    }
  }, [value])

  // render asynchronously AFTER(concurrently) the render and the relow and/repaint
  useEffect(() => {
    // console.log('4. useEffect ', value)
    
    // Effect callback, executed after render
    // foo.current?.classList.add('card-top-leave-active')
    // bar.current?.classList.add('card-bottom-leave-active')
    // bar.current?.classList.remove('card-bottom-leave-from')

    bar.current?.classList.remove('card-bottom-leave-from')
    bar.current?.classList.add('card-bottom-leave-to')

    // console.log('tick', value, ' :: ', previousValue)

    // animate('li', { opacity: 1 })
    // animate(scope.current, { opacity: 1 }, { duration: 1 })

    if (value !== previousValue) {
      console.log('tick tock')
      // bar.current?.classList.remove('card-bottom-leave-from')

      // setToggle(false)
      setToggle(() => {
        // foo.current?.classList.add('card-top-leave-from')
        // bar.current?.classList.add('card-bottom-leave-from')

        // foo.current?.classList.replace('card-top-leave-from', 'card-top-leave-to')
        // bar.current?.classList.replace('card-bottom-leave-from', 'card-bottom-leave-to')

        return false
      })
    }

    // Cleanup function, executed before next render or unmount

    // JB: exploits cleanup mechanic and captured closure of differing variable scope
    // return () => setPreviousValue(value)
    return () => {
      // console.log('3. useEffect cleanup')

      // foo.current?.classList.add('card-top-leave-from')
      // bar.current?.classList.add('card-bottom-leave-from')

      // setPreviousValue(value)
      // setPreviousValue(() => {
      //   return value
      // })

      // foo.current?.classList.add('card-top-leave-active', 'card-top-leave-from')
      // bar.current?.classList.add('card-bottom-leave-active', 'card-bottom-leave-from')
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

    // foo.current?.classList.remove('card-top-leave-active', 'card-top-leave-to')
    // foo.current?.classList.remove('card-top-leave-active')
    // event.target.classList.remove('card-top-leave-active')
  }

  async function onDigitAfterLeave2(event) {
    // event.stopPropagation()

    console.log('onDigitAfterLeave2', event)

    // bar.current?.classList.remove('card-bottom-leave-active', 'card-bottom-leave-to')
    // event.target.classList.remove('card-bottom-leave-active')
    // bar.current?.classList.remove('card-bottom-leave-to')

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

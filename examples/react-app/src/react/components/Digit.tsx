import React, { useState, useRef, useEffect, useLayoutEffect, useInsertionEffect } from 'react'
import { motion, AnimatePresence, useAnimate } from 'framer-motion'
import { animated, useSpring } from '@react-spring/web'
import clsx from 'clsx'

import './Digit.css'

export default function Digit({ value }: { value: number}) {
  const [toggle, setToggle] = useState(true)
  const [flipped, setFlipped] = useState(false)
  const [previousValue, setPreviousValue] = useState(value)

  // const [springs, api] = useSpring(() => (
  //   {
  //     transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
  //   }
  // ))

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? -90 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  const foo: React.MutableRefObject<T | null> = useRef(null)
  const bar: React.MutableRefObject<T | null> = useRef(null)

  const [scope, animate] = useAnimate()

  useEffect(() => {
    // console.log('top :: ', foo.current)
    // console.log('bottom :: ', bar.current)

    /**
      .v-enter-active,
      .v-leave-active {
        transition: opacity 0.5s ease;
      }

      .v-enter-from,
      .v-leave-to {
        opacity: 0;
      }
    */

    /*
    v-enter-from
      v-enter-active
    v-enter-to

    v-leave-from        .card-top-leave-from        card-bottom-leave-from
      v-leave-active      .card-top-leave-active      card-bottom-leave-active
    v-leave-to          .card-top-leave-to          card-bottom-leave-to

    leave-from
    Starting state for leave. Added immediately when a leaving transition is triggered, removed after one frame.

    leave-active
    Active state for leave. Applied during the entire leaving phase. Added immediately when a leaving transition is triggered, removed when the transition/animation finishes. This class can be used to define the duration, delay and easing curve for the leaving transition.

    leave-to
    Ending state for leave. Added one frame after a leaving transition is triggered (at the same time v-leave-from is removed), removed when the transition/animation finishes.
    */

    /*
    1. value change => setToggle(true)
    display flex both cards

    BOTH ARE 'LEAVE' AS WE ARE MOVING FROM DISPLAYED(present) TO NOT BEING DISPLAY(removed) ON BOTH.
    
    2. add classes
    .card-top-leave-active card-top-leave-from

    .card-bottom-leave-active card-bottom-leave-from
    
    3. add classes - when? transitionstart?
    card-top-leave-active card-top-leave-to 

    card-bottom-leave-active card-bottom-leave-to

    4. transitionend@bottom card => setToggle(false)
    display none both cards
    */

    // addEventListener('transitionrun')

    // @after-leave
    // called when the leave transition has finished and the element has been removed from the DOM.
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

  /*
  useInsertionEffect(() => {
    // console.log('1. useInsertionEffect ', value, foo)
    // You can’t update state from inside useInsertionEffect!!!

    // bar.current?.classList.add('card-bottom-leave-to', 'card-bottom-leave-from')
  }, [value])
  */

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
        {/* react spring */}
        {/* <animated.div
          style={{
            width: 80,
            height: 80,
            background: '#ff6d6d',
            borderRadius: 8,
            ...springs,
          }}
        /> */}

        <div className="demo" onClick={() => setFlipped(state => !state)}>
          <animated.div
            className="demo__card card-back"
            style={{
              // opacity: opacity.to(o => 1 - o),
              transform
            }}
          >Top</animated.div>
          
          <animated.div
            className="demo__card card-front"
            style={{
              // opacity,
              transform,
              rotateX: '90deg',
            }}
          >Bottom</animated.div>
        </div>

        {/* transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`, */}

        {/* framer motion */}
        <div className="demo" onClick={() => setFlipped(state => !state)}>
          {/* <AnimatePresence>
            {
              flipped && (
                <motion.div
                  className="demo__card card-back"
                  initial={false}
                  animate={{ rotateX: 0 }}
                  exit={{ rotateX: 90 }}
                  transition={{ type: 'tween', duration: 0.5 }}
                  style={{ transformPerspective: 600 }}
                >Top</motion.div>
              )
            }
          </AnimatePresence>
          <AnimatePresence>
            {
              !flipped && (
                <motion.div
                  className="demo__card card-front"
                  initial={false}
                  animate={{ rotateX: 90 }}
                  exit={{ rotateX: 0 }}
                  transition={{ type: 'tween', duration: 0.5 }}
                  style={{ transformPerspective: 600 }}
                >Bottom</motion.div>
              )
            }
          </AnimatePresence> */}

          {
            flipped && (
              <motion.div
                layout
                className="demo__card card-back"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: -90, transitionEnd: { display: 'none' } }}
                transition={{ type: 'tween', duration: 0.5 }}
                style={{ transformPerspective: 600 }}
              >Top</motion.div>
            )
          }
          {
            !flipped && (
              <motion.div
                layout
                className="demo__card card-front"
                initial={{ rotateX: 90 }}
                animate={{ rotateX: 0, transitionEnd: { display: 'none' } }}
                transition={{ type: 'tween', duration: 0.5 }}
                style={{ transformPerspective: 600 }}
              >Bottom</motion.div>
            )
          }
        </div>

        {/* <motion.div
          animate={{
            x: 0,
            backgroundColor: "#000",
            boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
            position: "fixed",
            transitionEnd: {
              display: "none",
            },
          }}
        /> */}
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

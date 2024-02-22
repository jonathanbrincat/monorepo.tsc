import { useState, useEffect } from 'react'
import HelloWorld from './components/HelloWorld.tsx'
import Countdown from './components/Countdown.tsx'
import CountdownTimer, { foobar } from '@brincat/core'
import reactLogo from '../svg/react.svg'

import './app.css'

export default function App() {
  const [count, setCount] = useState(0)
  const [tick, setTick] = useState(0)

  // JB: can also use MobX to use Observable reactivity like Vue
  const countdownTimer = new CountdownTimer(36000000, (newTick: number) => setTick(newTick))

  useEffect(() => {
    countdownTimer.start()

    return () => countdownTimer.stop()
  }, [])

  return (
    <>
      <header>
        <img src={reactLogo} className="logo react" alt="React logo" />
        
        <div className="wrapper">
          <HelloWorld msg="React Boilerplate" />
        </div>
      </header>
      
      <main>
        <h1>Packages</h1>
        <dl className="my-4">
          <dt>@brincat/core (Headless UI)</dt>
          <dd>{tick}</dd>

          <dt>@brincat/react (React Component)</dt>
          <dd style={{fontSize: '142px'}}>
            {/* <!-- JB: this will eventually come from @brincat/react --> */}
            <Countdown className="my-4" duration={tick} />
          </dd>
        </dl>
        
        <p className="my-4">{foobar}</p>

        <p className="my-4">
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
        </p>
      </main>
    </>
  )
}

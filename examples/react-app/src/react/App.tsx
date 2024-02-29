import { useState, useEffect } from 'react'
import Countdown from './components/Countdown.tsx'
import CountdownTimer from '@brincat/core'
import Foobar, { foo, Button } from '@brincat/react'
import reactLogo from '../svg/logo_react.svg'

// JB: introducing css modules will allow styles to be scoped and introduce parity with Vue.
import './app.css'

// ISSUE: potential memory leak. if i place a console in the function it fires continuously seemingly without provocation.
// this is likely the reason the fans come on. i suspect this is a symptom of assigning countdown ticj to state. as this must be the culprit. not sure if use memo will help. but it's obviously continuously firing the render function
// CONFIRMED

export default function App() {
  const [tick, setTick] = useState(0)

  const countdownTimer = new CountdownTimer(36000000, (newTick: number) => setTick(newTick))

  console.log('hello ', foo())

  useEffect(() => {
    // countdownTimer.start() // JB: countdowndown tick => state. causing constant re-renders. not good. reason why fans go ape shit. // try useMemo or mobx

    return () => countdownTimer.stop()
  }, [])

  return (
    <>
      <header className="container mx-auto flex justify-between my-8">
        <div className="flex place-items-center gap-8">
          <img className="logo block w-[110px] h-[110px]" src={reactLogo} alt="React logo" />

          <div className="flex flex-col">
            <h1 className="title font-hero text-cyan-600 font-semibold text-6xl tracking-wide">
              FlipFlapFlop
            </h1>
            <p className="text-2xl">Demonstration hosted in
              <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
              <a href="https://react.dev/" target="_blank" rel="noopener">React</a>
            </p>
          </div>
        </div>

        <nav className="self-start">
          <ul className="flex gap-4">
            <li>
              <a className="inline-flex items-center" href="" target="_blank">
                <svg className="block w-[25px] h-[25px] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96">
                  <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a className="inline-flex items-center" href="" target="_blank">
                <svg className="block w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 250">
                  <path fill="currentColor" d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      
      <main className="container mx-auto flex flex-col">
        <section className="grid grid-cols-4 gap-8">
          <div className="col-start-2 col-span-3">
            <p className="text-xl my-4"><span className="text-cyan-600 block">Just a bit of fun really.</span>Here we have an elegant and fully-responsive countdown clock with simulated <span className="text-white">split-flap</span> numeric display; also more commonly known as a <span className="text-white">flip-clock</span> or sometimes a <span className="text-white">solari</span>. A commonly utilised skeuomorphism for a countdown or counter in UI.</p>

            <p>&#128161; Thought of the day: Why do we seek to recreate in the virtual world, what we know from the physical world?</p>
          </div>
        </section>

        <section className="grid grid-cols-4 gap-8">
          <div className="col-start-2 col-span-3">
            <Foobar className="text-2xl my-4" />

            <p className="my-4">
              <Button type={"primary"} text={"hello from button"} onClickHandler={() => console.log('boo')} />
            </p>
          </div>
        </section>

        <section className="flex justify-center my-16">
          <div className="display bg-slate-900 border-zinc-300 border-8 rounded-xl p-10" style={{ fontSize: '142px' }}>
            {/* <!-- JB: this will eventually come from @brincat/react --> */}
            <Countdown duration={tick} />
          </div>
        </section>

        <section className="grid grid-cols-4 gap-8">
          <div className="flex justify-end">
            <h3 className="text-xl my-4">Installation</h3>
          </div>

          <div className="col-start-2 col-span-3 flex justify-center">
<pre className="bg-black px-6 py-4 rounded-md"><code className="text-zinc-400"># NPM </code>
  <code className="text-lime-400">npm install @flipflapflop/vue</code>

  <code className="text-zinc-400"># Yarn </code>
  <code className="text-lime-400">yarn add @flipflapflop/vue</code></pre>
          </div>
        </section>

        <hr className="my-16" />

        <section className="grid grid-cols-4 gap-8">
          <div className="flex justify-end">
            <h3 className="text-xl my-4">Usage</h3>
          </div>
        </section>
      </main>

      <footer className="flex justify-end items-center py-4">Authored and maintained by &copy; pix8 { new Date().getUTCFullYear() }</footer>
    </>
  )
}

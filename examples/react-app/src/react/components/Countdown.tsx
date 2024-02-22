// import { useState, useRef } from 'react'
import Digit from './Digit.tsx'

import './Countdown.css'

interface ICountdown {
  className?: string;
  duration: number;
}

function tens(n: number) {
  return Math.trunc(n / 10)
}

function units(n: number) {
  return n % 10
}

export default function Countdown({ className = '', duration = 5000 }: ICountdown) {
  // const [ tick, setTick ] = useState(() => duration)
  // const [milliseconds, setMilliseconds] = useState<number>(0)
  // const [seconds, setSeconds] = useState<number>(0)
  // const [minutes, setMinutes] = useState<number>(0)
  // const [hours, setHours] = useState<number>(0)
  // const timerId = useRef<ReturnType<typeof setInterval>>() // infer the return type NOTE: setInterval return type is NodeJS.Timer in Node.js vs number(identifier) in the browser(window)

  const time = {
    milliseconds: Math.trunc((duration % 1000) * 0.1),
    seconds: Math.trunc(duration / 1000) % 60,
    minutes: Math.trunc((duration / 1000) / 60) % 60, // ((milliseconds / (1000*60)) % 60);
    hours: Math.trunc((duration / 1000) / 3600) // ((milliseconds / (1000*60*60)) % 24);
  }

  return (
    <div className={`ui__countdown ${className}`}>
      <div className="dials">
        <Digit value={tens(time.hours)} />
        <Digit value={units(time.hours)} />

        <Digit value={tens(time.minutes)} />
        <Digit value={units(time.minutes)} />

        <Digit value={tens(time.seconds)} />
        <Digit value={units(time.seconds)} />
      </div>

      <div>
        <ul className="text-[14px] flex justify-between gap-4 my-4">
          <li>{duration}</li>
          <li>{`${time.hours}`.padStart(2, '0')} : {`${time.minutes}`.padStart(2, '0')} : {`${time.seconds}`.padStart(2, '0')} : {`${time.milliseconds}`.padStart(2, '0')}</li>
        </ul>
      </div>
    </div>
  )
}

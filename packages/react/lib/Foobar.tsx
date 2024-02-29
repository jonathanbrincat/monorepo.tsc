// import React from 'react';
// import * as React from 'react' // gets rid rollup umd warning when 'jx': 'react', iin tsconfig
import './foobar.css'

export default function Foobar({className = ''}: {className: string}) {
  return (
    <p className={[className, 'foobar'].join(' ')}>Hello from React package</p>
  )
}

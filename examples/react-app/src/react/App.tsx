import { useState } from 'react'
import HelloWorld from './components/HelloWorld.tsx'
import reactLogo from '../svg/react.svg'

import './app.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <img src={reactLogo} className="logo react" alt="React logo" />
        
        <div className="wrapper">
          <HelloWorld msg="React Boilerplate" />
        </div>
      </header>
      
      <main>
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </main>
    </>
  )
}

export default App

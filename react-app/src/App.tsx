import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DelayedProgressBlock from "./components/blocks/DelayedProgressBlock.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <DelayedProgressBlock />
    </>
  )
}

export default App

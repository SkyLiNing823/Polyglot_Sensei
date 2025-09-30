import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PolyglotSensei from './PolyglotSensei'

function App() {
  const [count, setCount] = useState(0)

  return <PolyglotSensei />
}

export default App

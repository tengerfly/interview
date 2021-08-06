import React from 'react'
import './App.css'
import Debounce from './views/debounce'
import Throttle from './views/throttle'
function App() {
  return (
    <div className="App">
      <Debounce />
      <Throttle/>
    </div>
  )
}

export default App

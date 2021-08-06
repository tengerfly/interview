import React, { useEffect,useState } from 'react'
import { throttle } from './throttle'
export default function Throttle(props) {
  const [value, setValue] = useState('1')
  function handleChange(e){
    setValue(e.target.value)
    console.log(`执行了${e}`, e.target.value)
  }
  function setColor(a){
    let color = `
    rgba(
      ${Math.floor(Math.random()*100) + a},
      ${Math.floor(Math.random()*100) + a},
      ${Math.floor(Math.random()*100) + a}
    )
    `
    document.body.style.background = color
  }
  useEffect(()=> {
    window.addEventListener("resize",throttle(setColor(10), 2000))
  })
  return (
    <div>
      <h1>节流测试</h1>
      <input value={value} onChange={
        // (e)=> throttle(handleChange(), 2000)
        (e) => {
          throttle(handleChange(e), 2000)
        }
      }></input>
    </div>
  )
}
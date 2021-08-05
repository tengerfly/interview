import React from 'react'
import {debounce} from './debounce'
function Debounce() {
  function handleClick() {
    console.log('debounce')
  }
  return (
    <div>
      <h1>测试防抖</h1>
      <button onClick={debounce(handleClick, 1000)}>点击</button>
    </div>
  )
}

export default Debounce
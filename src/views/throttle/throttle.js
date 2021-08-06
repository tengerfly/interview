// 延时器版
export function throttle(fn, delay= 300) {
  let timer = null
  console.log("throttle", fn)
  return function() {
    if(timer) {
      return
    }
    timer = setTimeout(()=> {
      fn.call(this, ...arguments)
      timer = null
    }, delay)
  }
}

// 时间戳版

// export function throttle(fn, delay= 300) {
//   let preTime = 0
//   return function() {
//     let nowTime = Date.now()
//     if(nowTime - preTime >= delay) {
//       fn.call(this, ...arguments)
//       preTime = nowTime
//     }
//   }
// }

/**
 * 节流：顾名思义，节流就是节约流量，在这里可以理解为减少执行次数。如果一个函数在短时间内执行多次，我们可以控制节流，减少函数的操作次数
 * 1.闭包
 * 
 * 
 * 
 * 
 */
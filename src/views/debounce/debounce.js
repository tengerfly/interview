// 手写防抖
export const debounce = (fn,delay = 300) => {
  let timer = null;
  return function() {
    timer && clearTimeout(timer);
    timer = setTimeout(()=>{
      fn.call(this, ...arguments);
    }, delay);
  }
}
/**
 * 知识点
 * 1.高阶函数
 * 高阶函数是对其他函数进行操作的函数，操作可以是将它们作为参数，或者是返回它们。 简单来说，高阶函数是一个接收函数作为参数或将函数作为输出返回的函数。
 * 2.闭包
 * 使用timer作为一个变量来存储定时器是否存在
 * 3.硬式绑定修改this
 * 将fn函数的this修改为要返回函数的this
 * 4.箭头函数
 * 返回的函数不能写箭头函数,因为要将返回的函数的this指向fn，如果返回的函数为箭头函数，执行的时候就找不到this了。
 * 
 * 
 * 
 * 
 * ****/
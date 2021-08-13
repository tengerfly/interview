function factory(Fun, arguments) {
  // 1.创建一个对象
  let obj = {}  
  // 2.修改this指向
  Fun.call(obj, arguments)
  // 3.原型对象
  obj.__proto__ = Fun.prototype
  // 4.将对象返回
  return obj
}

function Student(name) {
  this.name = name
}

// let obj = factory(Student, 'tenger')
// console.log(obj)

Function.prototype.myApply = function (obj) {
  // 第一版
  // obj.fn = this
  // obj.fn(arguments)
  // delete obj.fn
  // 第二版  函数有返回值
  obj.fn = this
  let result = obj.fn(arguments)
  delete obj.fn
  return result
}

function sayName(value, age){
  // console.log(this.name)
  let name = this.name
  console.log(value, age)
  return name
}

let myApplyUnit = {
  name: 'tenger',
  // sayName
}


Function.prototype.myCall = function(obj){
  context = obj || window;
  context.fn = this;
  let result = context.fn(...arguments);
  delete context.fn
  return result
}

Function.prototype.myBind = function(obj) {
  // 第一版
  // obj.fn = this
  // return function() {
  //   let result = obj.fn(arguments)
  //   delete obj.fn
  //   return result
  // }
  // 函数柯理化

}


// myApplyUnit.sayName()
// let myName = sayName.myApply(myApplyUnit) // myName-tenger
// let myName = sayName.myCall(myApplyUnit)  // myName-tenger
// let myName = sayName.myBind(myApplyUnit)('value')('28')
// console.log(`myName-${myName}`)


/**
 * 实现add(1)(2)(3)(4)(5)
 */


// function add(m){
//   return function(n){
//     return add(m+n)
//   }
// }

var add = function (m) {
 
  var temp = function (n) {
      return add(m + n);
  }

  temp.toString = function () {
      return m;
  }

  return temp;
};

let num1 = add(3)(4)(5)()
console.log(num1); // 12
console.log(add(3)(6)(9)(25)); // 43

console.log(add(1)(2)(3)(4)(5))
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

let obj = factory(Student, 'tenger')
console.log(obj)
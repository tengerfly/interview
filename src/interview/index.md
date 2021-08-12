/***
 * 东导面试题
 * 映客直播
 * **************************************************************/

 东:
 1.设计一种布局方式, 使内层容器box针对外层容器container上下左右居中,  注意: 外层容器和内层容器宽高不固定
```html
 <div class=”container”>
 <div class=”box”>box</div>
 </div>
```
 
 **方法一 flex布局**
```css
.container{
  display: flex;
  justify-content: center;
  align-items: center;
}
```
 **方法一 定位**
```css
.container{
  position:relative;
}
.box{
  position:absolute;
  top:0;
  left:0;
  transform: translate(-50%);
}
```





 2.icon宽高都是60px, 字体28px, 要求icon平分底部容器区域, 且icon数量不固定，左右两边和中间的间隔相同￼
 
 
 3.填写输出的值

```js
   var obj = {
     name: 'baidu',
     arr: ['a', 'b', 'c']
   }
 
   var obj2 = obj
   var arr = obj.arr
 
   obj2.arr = ['a', 'b', 'c', 'd']
   obj2.name = 'inke'
 
   console.log(arr)
   console.log(obj.name)
   console.log(obj === obj2)
   console.log(obj.arr === obj2.arr)
   console.log(obj.arr === arr)
```

**我的答案**

```js
  console.log(arr) // ['a', 'b', 'c']
   console.log(obj.name) // baidu
   console.log(obj === obj2) // true
   console.log(obj.arr === obj2.arr) // true
   console.log(obj.arr === arr) // false
```

**正确答案**

```js
  console.log(arr) // ['a', 'b', 'c']
   console.log(obj.name) // inke
   console.log(obj === obj2) // true
   console.log(obj.arr === obj2.arr) // true
   console.log(obj.arr === arr) // false
```
 
 这道题考察的是js是怎么给变量分配内存的

>我的理解是obj赋值给了obj2，obj2拷贝了obj的引用地址的指向，obj和obj2虽然变量名称不一样，但是都是指向的是一个地方。
>var arr = obj.arr 实际上是用一个变量，来指向obj的数组的地址，arr和obj.arr指针都指向数组['a', 'b', 'c'],
>但是obj2.arr 修改了其arr的指针指向，将其指向了['a', 'b', 'c', 'd'], 所以obj  和obj2的arr都是['a', 'b', 'c', 'd']
>如果改成arr.push('d'), 那么arr，obj和obj2中的arr都将是['a', 'b', 'c', 'd']

 4.    填写输出的值

  ```js

 var MAP =  {
     onclick: function () {
 
     },
     curry: function (val) {
       return function (z) {
           return val++ + z
       }
     }
   }
 
   var getInfo = function (val) {
       return MAP[val]
   }
   var fn = getInfo('curry')
 
   var a = fn(100)                          
 
   console.log(a(200))                
   console.log(a(300))                
   console.log(fn(100)(200))          
   console.log(getInfo('curry')(100)(300))

```
 **我的答案**

```js
  console.log(a(200)) // 300       
  console.log(a(300)) // 401        
  console.log(fn(100)(200)) // 302         
  console.log(getInfo('curry')(100)(300)) // 403
```

**正确答案**

```js
  console.log(a(200)) // 300       
  console.log(a(300)) // 401        
  console.log(fn(100)(200)) // 300        
  console.log(getInfo('curry')(100)(300)) // 400
```

>函数柯理化
>a(200), 其实就相当于是fn(100)(200), val++ 先用后加  也就是100+200=300
>2(200), fn(100) 其实是一个闭包，所以再次相加的话  就会100+1+300=401
>fn(100)(200) 和a(200)一样，但是

 5.   原生js给li添加点击事件, 且弹出li的索引值

  ```html
  <ul id="list">
     <li>a</li>
     <li>b</li>
     <li>c</li>
     <li>d</li>
   </ul>
```
 
 
 6.    填写问号中的值

```js
  var name = 'oop'
 
   var Person = function (options) {
     this.name = options.name
   }
 
   Person.prototype.name = 'iron man'
   Person.prototype.getName = function () {
     return this.name
   }
   Person.getName = function () {
     return this.name
   }
 
   var p = new Person({name: 'inke'})
 
   console.log(p.constructor ===  ?) // true
   console.log(p instanceof ?) // true
   console.log(p.__proto__ === ?) // true
 
   console.log(p.hasOwnProperty('name')) // ?
   console.log(p.hasOwnProperty('getName')) // ?
 
   var getName = p.getName
 
   console.log(getName === Person.getName) // ? 
 
   console.log(getName()) // ?
 console.log(Person.prototype.getName()) // ? 
 console.log(p.getName()) // ? 
 console.log(Person.getName()) //？
```

**我的答案**

```js
console.log(p.constructor ===  Person.prototype) // true
console.log(p instanceof Person) // true
console.log(p.__proto__ === Person.prototype) // true
console.log(p.hasOwnProperty('name')) // ? // true
console.log(p.hasOwnProperty('getName')) // ?  // false

var getName = p.getName

console.log(getName === Person.getName) // ?  // false

console.log(getName()) // ? // inke
console.log(Person.prototype.getName()) // ?  // iron man
console.log(p.getName()) // ?  inke
console.log(Person.getName()) //？ 'iron man'
```

**正确答案**

```js

console.log(p.constructor ===  Person) // true x  constructor 指向的是其构造函数
console.log(p instanceof Person) // true
console.log(p.__proto__ === Person.prototype) // true
console.log(p.hasOwnProperty('name')) // ? // true
console.log(p.hasOwnProperty('getName')) // ?  // false

  var getName = p.getName

  console.log(getName === Person.getName) // ?  // false

  console.log(getName()) // ? // oop  x  这里的this指的是window，大意了 以为都是指的是p
console.log(Person.prototype.getName()) // ?  // iron man
console.log(p.getName()) // ?  inke
console.log(Person.getName()) //？ Person  x
```

 
//  7.    实现一个inhreit 函数, 具备能够使Man函数继承Person函数的”所有”能力, 注意这个inhreit函数是一个可”复用”的函数
 
```js
 function inherit (SubClass, SuperClass) {
   // TODO…
   
 
 
 }
 function Person(…) {…}
 function Man (options) {
   this.constructor.super.call(this, options)
 }
 
 inherit(Man, Person)
```
 
```js
   // 实现继承的核心函数
   function inheritPrototype(subType,superType) {
      function F() {};
      //F()的原型指向的是superType
      F.prototype = superType.prototype; 
      //subType的原型指向的是F()
      subType.prototype = new F(); 
      // 重新将构造函数指向自己，修正构造函数
      subType.prototype.constructor = subType; 
   }
   // 设置父类
   function SuperType(name) {
       this.name = name;
       this.colors = ["red", "blue", "green"];
       SuperType.prototype.sayName = function () {
         console.log(this.name)
       }
   }
   // 设置子类
   function SubType(name, age) {
       //构造函数式继承--子类构造函数中执行父类构造函数
       SuperType.call(this, name);
       this.age = age;
   }
   // 核心：因为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
   inheritPrototype(SubType, SuperType)
   // 添加子类私有方法
   SubType.prototype.sayAge = function () {
      console.log(this.age);
   }
   var instance = new SubType("Taec",18)
   console.dir(instance)
```

 
//  8.依次输出console的值
```js
 const promise = Promise.resolve('fe').then(res => {
   console.log(res);
   return promise2;
 }).then(res => {
   console.log(res + 2);
 });
 
 const promise2 = new Promise((resolve, reject) => {
   console.log('in');
   resolve(5);
   return 996;
 })
 
 setTimeout(() => {
   promise3.then(res => {
     console.log('res: ', res);
   }, err => {
     console.log('err: ', err)
   })
 }, 0); 
 
 const promise3 = promise2.then(res => {
   console.log(res);
   throw 2;
 }).catch(err => {
   console.log(err);
 })
 
 console.log('ke');
```

 **答案**

```js
in
ke
fe
5
2
7
res:  undefined
```
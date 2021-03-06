# 原型链式继承

```js
function Parent () {
  this.name = 'kevin';
}

Parent.prototype.getName = function () {
  console.log(this.name);
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName()) // kevin
```

**缺点**

1.引用类型的属性被所有实例共享
2.在创建 Child 的实例时，不能向Parent传参

# 借用构造函数式继承

```js
function Parent () {
  this.names = ['kevin', 'daisy'];
}

function Child () {
  Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]
```

**优点**

1.避免了引用类型的属性被所有实例共享
2.可以在 Child 中向 Parent 传参

**缺点**

方法都在构造函数中定义，每次创建实例都会创建一遍方法。

# 组合式继承

原型链继承和经典继承双剑合璧。

```js
function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name, age) {

  Parent.call(this, name);
  
  this.age = age;

}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
```

**优点**

融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

# 原型式继承

```js
function createObj(o) {
  function F(){}
  F.prototype = o;
  return new F();
}
```
就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型

**缺点**

包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。


```js
var person = {
  name: 'kevin',
  friends: ['daisy', 'kelly']
}

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin

person1.firends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]

```
注意：修改person1.name的值，person2.name的值并未发生改变，并不是因为person1和person2有独立的 name 值，而是因为person1.name = 'person1'，给person1添加了 name 值，并非修改了原型上的 name 值。


# 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

```js

function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}

```

**缺点**

跟借用构造函数模式一样，每次创建对象都会创建一遍方法。


# 寄生组合式继承


```js

function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}


```



```js
function inherit(child, parent) {
  // 创建一个构造函数
  function F() {}
  F.prototype = parent.prototype; // 将构造函数的原型修改为父类的原型
  child.prototype = new F(); // 将子类的原型修改为构造函数F的实例
  child.prototype.constructor = child; // 将子类原型的constructor指向子类
}

```


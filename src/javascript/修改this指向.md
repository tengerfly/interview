>new call, apply，bind 一直是面试的重点

# new

>new的目的就是创建了一个实例。实例的创建过程，也就是new的过程。

>new 的过程就是后边跟一个构造函数，然后返回构造函数的实例，这就可以写一个方法，入参是一个构造函数，返回一个对象的方法。

我们先来思考一下new的过程具体做了什么？

>new的过程其实就是由构造函数生成一个实例的过程。这个实例有构造函数的方法和属性，还可以有自己的属性，并且这个实例的原型和构造函数的原型是同一个对象。并且构造函数内部的this指向是实例对象

我们分步来说明new的具体过程

- 返回的结果是一个对象
- this指向指的是返回的对象
- 返回的对象和构造函数的原型是同一个


```js

function factory(Fun) {
  // 1.创建一个对象
  let obj = {}  
  // 2.修改this指向
  Fun.call(obj, ...arguments)
  // 3.将返回对象的原型设置为构造函数的原型(建立血脉关系)
  obj.__proto__ = Fun.prototype
  // 4.将对象返回
  return obj
}

```

# apply

>apply修改了this的执行。
>具体过程是一个Function调用了apply，参数是一个object，将这个函数的this指向，修改为指向object，并执行这个函数

- apply 是Function.prototype的一个方法
- 参数是一个对象
- 将Function的this指向object
- 执行这个Function

>将Function的this执行Object，这一步乍一看，感觉没法实现，细想一下，我们给一个对象添加一个方法的时候，直接obj.fn = fn 这个时候你就会发现了  fn中的this指向已经指向了obj

```js
Function.prototype.myApply = function (obj) {
  // // 第一版
  // // obj.fn = this
  // // obj.fn(arguments)
  // // delete obj.fn
  // 第二版  函数有返回值
  obj.fn = this
  let result = obj.fn(arguments)
  delete obj.fn
  return result
}
```

冴羽大佬实现的

```js
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    var result = eval('context.fn(' + args +')');
    delete context.fn
    return result;
}
```
**优化**

```js
Function.prototype.myApply = function (obj) {
  if( typeof obj !== 'object' && obj !== null ) {
    return obj
  }
  let context = obj || window;
  context.fn = this;
  let result = context.fn(arguments);
  delete context.fn
  return result
}
```

**综上我们来总结一下apply的实现步骤**

- 给context对象定义一个fn属性来接受当前函数
- 将这个函数用一个变量代替(这是为了在下边将这个函数的结果给返回)，执行这个函数
- 删除context的fn属性，因为这个是我们自己定义的，所以在这里需要删除
- 将第二步的变量返回

# call

call的实现实际上和apply是一样的，唯一的不同点就是call接受的参数是罗列开的，apply接受的参数是一个数组

由上边apply的实现  我们现在来实现call

```js

Function.prototype.myCall = function(obj){
  if( typeof obj !== 'object' && obj !== null ) {
    return obj
  }
  let context = obj || window;
  context.fn = this;
  let result = context.fn(...arguments);
  delete context.fn
  return result
}

```

# bind

>MDN: bind方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。


bind也是修改this指向的一种方法，与之前两个不同的是bind返回一个函数，但是不执行这个函数，call 和apply 是执行了这个函数的

我们来分析一下bind的实现过程

- bind 是一个函数，参数是一个对象
- 返回的是一个未执行的函数
- 这个函数修改了this指向

```js

Function.prototype.myBind = function(obj) {
  obj.fn = this
  return function() {
    let result = obj.fn(arguments)
    delete obj.fn
    return result
  }
}

```
bind的用法还可以柯理化

```js
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}

var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
// 1
// daisy
// 18

```

对我们之前写的进行优化


```js

```


**冴羽大佬的实现**

```js
Function.prototype.bind2 = function (context) {
    // 判断是否是函数
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    // 
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    // 
    var fNOP = function () {};  // 构造函数
    // 返回的函数
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        // 判断调用函数是否是构造函数
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    // 将构造函数的原型对象执行当前函数的原型
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

因为调用bind的必须是一个函数，大佬考虑了函数是构造函数的情况。


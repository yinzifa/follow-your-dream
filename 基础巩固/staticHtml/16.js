function Foo() {
    getName = function () { console.log(1) }
    return this
}
Foo.getName = function () { console.log(2) }
Foo.prototype.getName = function () { console.log(3) }
var getName = function () { console.log(4) }
function getName() { console.log(5) }

//请写出以下输出结果：
Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()


/*
* 答案

2、4、1、1、2、3、3

解析

这是一道综合性题目，首先getName函数声明会先提升，然后getName函数表达式提升，但是因为函数声明提升在线，所以忽略函数表达式的提升，然后开始执行代码，执行到var getName= ...时，修改了getName的值，赋值成了打印4的新函数。

1.执行Foo函数的静态方法，打印出2。

2.执行getName，当前getName是打印出4的那个函数。

3.执行Foo函数，修改了全局变量getName，赋值成了打印1的函数，然后返回this，因为是在全局环境下执行，所以this指向window，因为getName已经被修改了，所以打印出1。

4.因为getName没有被重新赋值，所以再执行仍然打印出1。

5.new操作符是用来调用函数的，所以new Foo.getName()相当于new (Foo.getName)()，所以new的是Foo的静态方法getName，打印出2。

6.因为点运算符（.）的优先级和new是一样高的，所以从左往右执行，相当于(new Foo()).getName()，对Foo使用new调用会返回一个新创建的对象，然后执行该对象的getName方法，该对象本身并没有该方法，所以会从Foo的原型对象上查找，找到了，所以打印出3。

7.和上题一样，点运算符（.）的优先级和new一样高，另外new是用来调用函数的，所以new new Foo().getName()相当于new ((new Foo()).getName)()，括号里面的就是上一题，所以最后找到的是Foo原型上的方法，无论是直接调用，还是通过new调用，都会执行该方法，所以打印出3。
*
* */
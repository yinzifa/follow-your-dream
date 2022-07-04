console.log(a)
var a = 1
// getNum()
var getNum = function() {
    a = 2
}
function getNum() {
    a = 3
}
console.log(a)
getNum()
console.log(a)

/*
* 答案

undefined、1、2

解析

首先因为var声明的变量提升作用，所以a变量被提升到顶部，未赋值，所以第一个打印出来的是undefined。

接下来是函数声明和函数表达式的区别，函数声明会有提升作用，在代码执行前就把函数提升到顶部，
* 在执行上下文上中生成函数定义，所以第二个getNum会被最先提升到顶部，然后是var声明getNum的提升，
* 但是因为getNum函数已经被声明了，所以就不需要再声明一个同名变量，接下来开始执行代码，
* 执行到var getNum = fun...时，虽然声明被提前了，但是赋值操作还是留在这里，所以getNum被赋值为了一个函数，
* 下面的函数声明直接跳过，最后，getNum函数执行前a打印出来还是1，执行后，a被修改成了2，所以最后打印出来的2。
* */
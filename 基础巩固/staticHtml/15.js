function fn (){
    console.log(this)
}
var arr = [fn]
arr[0]()

/*
* 答案

打印出arr数组本身

解析

函数作为某个对象的方法调用，this指向该对象，数组显然也是对象，只不过我们都习惯了对象引用属性的方法：obj.fn，但是实际上obj['fn']引用也是可以的。
* */
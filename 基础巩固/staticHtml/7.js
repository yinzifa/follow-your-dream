var out = 25
var inner = {
    out: 20,
    func: function () {
        var out = 30
        return this.out
    }
};
console.log((inner.func, inner.func)())
console.log(inner.func())
console.log((inner.func)())
console.log((inner.func = inner.func)())

/*答案

25、20、20、25

解析

这道题考察的是this指向问题：

1.逗号操作符会返回表达式中的最后一个值，这里为inner.func对应的函数，注意是函数本身，然后执行该函数，该函数并不是通过对象的方法调用，而是在全局环境下调用，所以this指向window，打印出来的当然是window下的out

2.这个显然是以对象的方法调用，那么this指向该对象

3.加了个括号，看起来有点迷惑人，但实际上(inner.func)和inner.func是完全相等的，所以还是作为对象的方法调用

4.赋值表达式和逗号表达式相似，都是返回的值本身，所以也相对于在全局环境下调用函数
* */

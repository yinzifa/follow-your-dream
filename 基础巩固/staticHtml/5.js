console.log(1 + NaN)
console.log("1" + 3)
console.log(1 + undefined)
console.log(1 + null)
console.log(1 + {})
console.log(1 + [])
console.log([] + {})

/*解析

这道题考察的显然是+号的行为：

1.如果有一个操作数是字符串，那么把另一个操作数转成字符串执行连接

2.如果有一个操作数是对象，那么调用对象的valueOf方法转成原始值，如果没有该方法或调用后仍是非原始值，则调用toString方法

3.其他情况下，两个操作数都会被转成数字执行加法操作
* */
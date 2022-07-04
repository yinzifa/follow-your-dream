var count = 0
console.log(typeof count === "number")
console.log(!!typeof count === "number")

/*答案

true、false

解析

1.没啥好说的，typeof对数字类型返回'number'。

2.这题考查的是运算符优先级的问题，逻辑非!的优先级比全等===高，所以先执行!!typeof count，结果为true，然后执行true === 'number'，结果当然为false，可以点击这里查看优先级列表。
* */
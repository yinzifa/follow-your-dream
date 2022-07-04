var a={},
    b={key:'b'},
    c={key:'c'}
a[b]=123
a[c]=456
console.log(a[b])

/*解析
对象有两种方法设置和引用属性，obj.name和obj['name']，方括号里可以字符串、数字和变量设置是表达式等，
但是最终计算出来得是一个字符串，对于上面的b和c，它们两个都是对象，所以会调用toString()方法转成字符串，
对象转成字符串和数组不一样，和内容无关，结果都是[object Obejct]，所以a[b]=a[c]=a['[object Object]']。
* */
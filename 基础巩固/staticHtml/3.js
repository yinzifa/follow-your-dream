let a = b = 10;
var c =30;
(function(){
   let a = b = 20;
})()
console.log(global.a)
console.log(global.b)
console.log(global.c)
console.log(a)
console.log(b)
console.log(c)
// 解析
// 连等操作是从右向左执行的，相当于b = 10、let a = b，很明显b没有声明就直接赋值了，所以会隐式创建为一个全局变量，
// 函数内的也是一样，并没有声明b，直接就对b赋值了，因为作用域链，会一层一层向上查找，找了到全局的b，
// 所以全局的b就被修改为20了，而函数内的a因为重新声明了，所以只是局部变量，不影响全局的a，所以a还是10。
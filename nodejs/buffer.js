console.log(Buffer.alloc(10))
console.log(Buffer.alloc(20))
console.log(Buffer.alloc(5,1))
console.log(Buffer.allocUnsafe(5,1))

console.log(Buffer.from([1,2,3]))
console.log(Buffer.from('test'))  //默认utf8
console.log(Buffer.from('test','base64'))

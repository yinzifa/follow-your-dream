/*
* buf.length
* buf.toString()
* buf.fill()
* buf.equals()
* buf.indexOf()
* buf.copy()
*
* */
const buf = Buffer.from("This is a test!")

console.log(buf.length)
console.log(buf.toString('base64'))

const buf3 = Buffer.allocUnsafe(10)
console.log(buf3)
console.log(buf3.fill(10,2,6))

console.log(Buffer.from('test').equals(Buffer.from('test')))
console.log(Buffer.from('test').equals(Buffer.from('test1')))

const buf4 = Buffer.from("This is a test!")
console.log(buf4.indexOf('is'))
console.log(buf4.indexOf('b'))



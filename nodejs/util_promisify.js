const promisify = require('util').promisify;
const fs = require("fs");

const read = promisify(fs.readFile);

/*promise写法*/
// read('./util_promisify.js').then(data=> {
//     console.log(data.toString())
// }).catch(err=> {
//     console.log(err)
// })

/*async-await写法*/
async function test() {
    try {
        const content = await read("./util_promisify.js")
        console.log(content.toString())
    }catch (err) {
        console.log(err)
    }
}
test()

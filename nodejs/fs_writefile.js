const fs = require("fs");

const content = Buffer.from('This is a test')

fs.writeFile("./test/test.js", content, (err)=> {
    if(err) throw err;
    console.log("在当前目录写入test.js成功")
})

fs.writeFile("./test/test1.js", 'This is a test', 'utf8',(err)=> {
    if(err) throw err;
    console.log("在当前目录写入test.js成功")
})

fs.writeFile("./test/test2.js", 'This is a test', {
    encoding: 'utf8'
},(err)=> {
    if(err) throw err;
    console.log("在当前目录写入test.js成功")
})

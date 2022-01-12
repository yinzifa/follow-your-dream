/* 流
* 释义：有方向的数据
* */
const fs = require("fs");

const ws = fs.createWriteStream('./test/writeStream.txt')

const timer = setInterval(()=> {
    const num = parseInt(Math.random() * 10);
    console.log(num)
    if(num < 7) {
        ws.write(num.toString())
    }else {
        clearInterval(timer)
        ws.end();
    }
},300)

ws.on('finish', ()=> {
    console.log('done!')
})

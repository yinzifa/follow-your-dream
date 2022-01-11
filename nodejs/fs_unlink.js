/*
* unlink 删除文件
* */

const fs = require("fs");
fs.unlink('./01_run.js',(err)=> {
    if(err) throw err;
    console.log('成功删除 01_run.js')
})

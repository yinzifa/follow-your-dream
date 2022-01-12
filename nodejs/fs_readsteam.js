/* 流
* 释义：有方向的数据
* */
const fs = require("fs");

const rs = fs.createReadStream("./fs_rmdir.js");

//输出到控制台
rs.pipe(process.stdout)



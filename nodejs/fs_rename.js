const fs = require("fs");

fs.rename("./test/test.js",'./test/test.txt',(err)=> {
    if(err) throw err;
    console.log("改名成功")
})

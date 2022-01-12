const fs = require("fs");
//异步读
fs.readFile("./02_run.js", 'utf8',(err,data)=> {
    if(err) throw err;
    console.log(data)
})

//同步读
let data = fs.readFileSync("./02_run.js", 'utf8');
console.log("data")
console.log(data)
console.log("data")

const fs = require("fs");

fs.readdir("./test","utf8",(err,data)=> {
    if(err) throw err;
    console.log(data)
})

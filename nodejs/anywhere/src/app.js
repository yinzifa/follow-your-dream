const http = require("http");
const path = require("path");
const fs = require("fs");
const promisify = require("util").promisify;
const {port,hostname,root} = require("./config");
const stat = promisify(fs.stat)

const server = http.createServer((req,res)=> {
    const filePath = path.join(root,req.url);
    stat(filePath).then(stats=> {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain')
        if(stats.isFile()) {
            fs.createReadStream(filePath).pipe(res)
        }else if(stats.isDirectory()){
            fs.readdir(filePath,'utf8',(err,files)=> {
                res.end(files.join(","))
                // if(err)
            })
        }
    }).catch(err=> {
        res.statusCode = 404;
        res.setHeader('Content-Type','text/plain');
        res.end(`${filePath} is not a directory or file`);
    })

})

server.listen(port,hostname,()=> {
    console.log(`Server running at http://${hostname}:${port}`)
})

const fs = require("fs");

function readApiFiles(router, dir = '/apiControllers') {
  fs.readdirSync(__dirname + dir).filter((f)=> {
    return f.endsWith('.js')
  }).forEach(f => {
    console.log(`process controller: ${f}...`);
    let mapping = require(__dirname + dir + '/' + f);
    addMapping(router, mapping)
  });
}

function addMapping(router, mapping) {
  for(let url in mapping) {
    if(url.startsWith('GET')) {
      let path = url.substring(3);
      router.get(path, mapping[url]);
    }else if(url.startsWith('POST')) {
      let path = url.substring(4);
      router.post(path, mapping[url]);
    }else{
      router.get(url, mapping[url]);
      console.log(`无效的URL: ${url}`);
    }
  }
}

module.exports = function (dir) {
  let controllers_dir = dir || '/apiControllers';
  let router = require('koa-router')();
  readApiFiles(router, controllers_dir);
  return router.routes();
};

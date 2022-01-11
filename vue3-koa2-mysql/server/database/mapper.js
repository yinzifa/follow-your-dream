const query = require("../database/connect");

/*
* 根据条件查询活动列表
* */
function queryRecordByParam () {
   return new Promise((resolve, reject)=> {
      let sql = 'SELECT id, title, description' +
          ' FROM `b_h5_head` WHERE description != ""';
      query(sql,(error,result)=> {
         if(error) {
            reject(error)
         }else {
            resolve(result)
         }
      })
   })
}

module.exports = {
   queryRecordByParam
}
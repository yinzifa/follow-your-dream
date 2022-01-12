const mysql = require("mysql");

const pool = mysql.createPool({
   host: '172.16.10.52',
   user: 'sitemanager',
   password: 'AMyP9Pyz',
   port: '3306',
   database: 'leyingdb',
   // 最大连接数，默认为10
   connectionLimit: 10,
});

let query = (sql, callback)=> {
   pool.getConnection(function(err,conn){
      if(err){
         callback(err,null,null);
      }else{
         conn.query(sql,function(error,result){
            //释放连接
            conn.release();
            //事件驱动回调
            callback(error,result);
         });
      }
   });
}

module.exports = query;
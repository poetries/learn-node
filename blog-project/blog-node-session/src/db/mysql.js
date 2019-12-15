const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect(()=>{
  console.log('连接成功')
})

// 统一执行sql
function exec(sql) {
  return new Promise((resolve,reject)=>{
    con.query(sql,(err,result)=>{
      if(err){
        return reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec
}
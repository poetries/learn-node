const {isEnv,isProd} = require('../utils/env')

let MYSQL_CONF = {}
let REDIS_CONF = {}

if(isEnv) {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'myblog' 
  }
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

// 线上环境
if(isProd) {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'myblog' 
  }
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}

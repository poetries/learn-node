const env = process.env.NODE_ENV

let MYSQL_CONF = {}

if(env == 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'myblog' 
  }
}

// 线上环境
if(env == 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'myblog' 
  }
}

module.exports = {
  MYSQL_CONF
}

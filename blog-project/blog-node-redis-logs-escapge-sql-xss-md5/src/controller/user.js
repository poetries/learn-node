const {exec,escape} = require('../db/mysql')
const { getPassword } = require('../utils/crypto')

const login = (username, password)=>{
  // 生成加密密码
  password = getPassword(password)

  // 预防sql注入 后面拼接sql不需要加单引号
  username = escape(username) 
  password = escape(password)
  
  const sql = `
    select username,realname from users where username=${username} and password=${password}
  `
  return exec(sql)
}

module.exports = {
  login
}
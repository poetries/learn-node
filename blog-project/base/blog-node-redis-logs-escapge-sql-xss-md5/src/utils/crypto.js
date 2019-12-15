const crypto = require('crypto')

// 密匙
const SECRET_KEY = 'WJJKFD_**!@@'

// md5加密
const md5 = (content)=>{
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}
// 加密函数
const getPassword = (pwd)=>{
  const str = `password=${pwd}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = {
  getPassword
}
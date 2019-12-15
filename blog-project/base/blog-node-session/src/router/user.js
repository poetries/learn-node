const {login} = require('../controller/user')
const {SuccessModel,ErrorModel} = require('../module/resModule')

// 获取cookir过期时间
const getCookirExpires = ()=>{
  const d = new Date()
  d.setTime(d.getTime() + (24*60*60*1000))

  // cookie 要设置GMT过期时间
  return d.toGMTString()
}

const handleUserRouter = async (req,res)=>{
  const method = req.method

  if(method == 'GET' && req.path == '/api/user/login') {
    // const {username,password} = req.body 
    const {username,password} = req.query 
    let data = await login(username,password)
    data = data[0] || {}

    if(data.username) {
      // 操作cookir
      // path=/ 生效所有的网页都可以
      // httpOnly限制客户端修改cookie 
      // 前端可以document.cookie = 'username=123'追加cookie 但不会覆盖后台设置的
      // res.setHeader('Set-Cookie', `username=${data.username};path=/;httpOnly;expires=${getCookirExpires()}`)

      // session演示
      req.session.username = data.username
      req.session.realname = data.realname

      console.log(req.session,'session')
      return new SuccessModel({data},'登录成功')
    }else {
      return new ErrorModel('登录失败')
    }
  }
  // 登录验证
  if(method === 'GET' && req.path === '/api/user/login-test') {
    if(req.session.username) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      },'登录成功'))
    }
    return Promise.resolve(new ErrorModel('没有登录'))
  }
}

module.exports = handleUserRouter
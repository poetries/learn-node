const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const {SECRET} = require('../conf/constants')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// 模拟登录
router.post('/login', async (ctx, next)=> {
  const {username,password} = ctx.request.body 
  let userInfo = null
  if(username == 'poetry' && password == 'abc') {
    // 登录成功获取用户信息
    userInfo = {
      userId: 1,
      username: 'poetry',
      nickname: '静观流叶',
      sex: 1
    }
  }
  let token
  if(userInfo) {
    // jwt加密用户信息返回给客户端
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoicG9ldHJ5Iiwibmlja25hbWUiOiLpnZnop4LmtYHlj7YiLCJzZXgiOjEsImlhdCI6MTU3ODgyODg4MywiZXhwIjoxNTc4ODMyNDgzfQ.oP_VzmOiOn31ak7VWT74YtqHVP3_5rZru2OWAyIcCmU
    token = jwt.sign(userInfo,SECRET, {
      expiresIn: '1h' // 1h过期
    })
  }
  if(userInfo == null) {
    ctx.body = {
      errno: -1,
      message: '登录失败',
    }
    return
  }
  ctx.body = {
    errno: 0,
    data: token
  }
})

router.get('/getUserInfo', async (ctx, next)=> {
  let token = ctx.headers.authorization
  try {
    // [{"key":"Authorization","value":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoicG9ldHJ5Iiwibmlja25hbWUiOiLpnZnop4LmtYHlj7YiLCJzZXgiOjEsImlhdCI6MTU3ODgyOTc0MiwiZXhwIjoxNTc4ODMzMzQyfQ.HynWDmDh3pfZi8z4VAF24yb9tdrcZoK71I3PVJcey_w","description":""}]
    let payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      errno: 0,
      userInfo: payload
    }
  } catch (ex) {
    ctx.body = {
      errno: -1,
      message: 'token验证失败'
    }
  }
})

module.exports = router

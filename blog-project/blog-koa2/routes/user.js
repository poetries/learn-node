const router = require('koa-router')()
const {login} = require('../controller/user')
const {SuccessModel,ErrorModel} = require('../module/resModule')

router.prefix('/api/user')

router.post('/login',async function(ctx, next) {
  const {username,password} = ctx.request.body 
    let data = await login(username,password)
    data = data[0] || {}

    if(data.username) {
      ctx.session.username = data.username
      ctx.session.realname = data.realname

      ctx.body = new SuccessModel({data},'登录成功')
    }else {
      ctx.body = new ErrorModel('登录失败')
    }
});

// router.get('/session-test', async function (ctx, next) {
//   if(ctx.session.viewCount == null) {
//     ctx.session.viewCount = 0
//   }
//   ctx.session.viewCount++;
//   ctx.body = {
//     erro:0,
//     viewCount : ctx.session.viewCount
//   }
// })

module.exports = router

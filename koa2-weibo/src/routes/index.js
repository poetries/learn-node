const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  console.log(ctx.session)
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: false,
    blogList: [{id:12,username: 'poetry'},{id:33,username: 'Jing'},{id:44,username: '小明'}]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  const session = ctx.session
  if(session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum
  }
})


router.get('/profile/:username', async (ctx, next) => {
  const {username} = ctx.params;
  ctx.body = {
    title: 'profile',
    username
  }
})
router.get('/load-more/:username/:page', async (ctx, next) => {
  const {username,page} = ctx.params;
  ctx.body = {
    username,
    page
  }
})

module.exports = router

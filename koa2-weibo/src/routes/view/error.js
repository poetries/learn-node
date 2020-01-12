/**
 * @description error 404 路由
 * @author poetry
 */

const router = require('koa-router')()

// 故意制造一个错误
router.get('/get-an-error', async (ctx, next) => {
  throw Error()
  ctx.body = {
    sg: 'xxx'
  }
})

// error
router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

// 404
router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router

const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../module/resModule')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  let {author,keyword,isadmin} = ctx.query

  if(isadmin) {
    // 管理员界面
    if(ctx.session.username == null) {
      ctx.body = new ErrorModel('未登录')
    }
    // 强制查询自己的博客
    author = ctx.session.username 
  }
  const listData = await getList(author,keyword)
  ctx.body = new SuccessModel(listData, '查询成功')
})

router.get('/detail', async function(ctx, next) {
  const id = ctx.query.id 
  const data = await getDetail(id)

  ctx.body = new SuccessModel(data[0], '查询成功')
});

router.post('/new', loginCheck,async function(ctx, next) {
  ctx.request.body.author = ctx.session.username
  const data = await newBlog(ctx.request.body)
  ctx.body = new SuccessModel({id: data.insertId}, '新建成功')
});

router.post('/update', loginCheck,async function(ctx, next) {
  const id = ctx.query.id
  const data = await updateBlog(id,ctx.request.body)
  if(data.affectedRows > 0) {
    ctx.body = new SuccessModel({id}, '更新成功')
  }else {
    ctx.body = new ErrorModel({id}, '更新失败')
  }
});

router.post('/del', loginCheck,async function(ctx, next) {
  const author = ctx.session.username
  const id = ctx.query.id
  const data = await delBlog(id,author)
  if(data.affectedRows > 0) {
    ctx.body = new SuccessModel({id}, '删除成功')
  }else {
    ctx.body = new ErrorModel({id}, '删除失败')
  }
});



module.exports = router

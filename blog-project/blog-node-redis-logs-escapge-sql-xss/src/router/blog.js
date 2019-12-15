const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../module/resModule')

// 定义一个统一的登录验证函数
const loginCheck = req=>{
  if(!req.session.username) {
    return Promise.resolve(new ErrorModel('没有登录'))
  }
}

const handleBlogRouter = async (req,res)=>{
  const method = req.method 
  const id = req.query.id 

  if(method == 'GET' && req.path == '/api/blog/list') {
    let author = req.query.author || ''
    let keyword = req.query.keyword || ''

    console.log(req.session,'req.session')
    if(req.query.isadmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req)
      if(loginCheckResult) {
        return loginCheck
      }
      // 强制查询自己的博客
      author = req.session.username 
    }
    const listData = await getList(author,keyword)
    return new SuccessModel(listData, '查询成功')
  }
  if(method == 'GET' && req.path == '/api/blog/detail') {
    const id = req.query.id 
    const data = await getDetail(id)

    return new SuccessModel(data[0], '查询成功')
  }
  if(method == 'POST' && req.path == '/api/blog/new') {
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult) {
      // 未登录
      return loginCheck
    }
    req.body.author = req.session.username
    const data = await newBlog(req.body)
    return new SuccessModel({id: data.insertId}, '新建成功') 
  }
  if(method == 'POST' && req.path == '/api/blog/update') {
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult) {
      // 未登录
      return loginCheck
    }
    const data = await updateBlog(id,req.body)
    if(data.affectedRows > 0) {
      return new SuccessModel({id}, '更新成功')
    }else {
      return new ErrorModel({id}, '更新失败')
    }
    
  }
  if(method == 'POST' && req.path == '/api/blog/del') {
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult) {
      // 未登录
      return loginCheck
    }

    const author = req.session.username
    const data = await delBlog(id,author)
    if(data.affectedRows > 0) {
      return new SuccessModel({id}, '删除成功')
    }else {
      return new ErrorModel({id}, '删除失败')
    }
  }
}

module.exports = handleBlogRouter

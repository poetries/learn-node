const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../module/resModule')

const handleBlogRouter = async (req,res)=>{
  const method = req.method 
  const id = req.query.id 

  if(method == 'GET' && req.path == '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = await getList(author,keyword)
    return new SuccessModel(listData, '查询成功')
  }
  if(method == 'GET' && req.path == '/api/blog/detail') {
    const id = req.query.id 
    const data = await getDetail(id)

    return new SuccessModel(data[0], '查询成功')
  }
  if(method == 'POST' && req.path == '/api/blog/new') {
    const data = await newBlog(req.body)
    return new SuccessModel({id: data.insertId}, '新建成功') 
  }
  if(method == 'POST' && req.path == '/api/blog/update') {
    const data = await updateBlog(id,req.body)
    if(data.affectedRows > 0) {
      return new SuccessModel({id}, '更新成功')
    }else {
      return new ErrorModel({id}, '更新失败')
    }
    
  }
  if(method == 'POST' && req.path == '/api/blog/delete') {
    const data = await delBlog(id)
    if(data.affectedRows > 0) {
      return new SuccessModel({id}, '删除成功')
    }else {
      return new ErrorModel({id}, '删除失败')
    }
  }
}

module.exports = handleBlogRouter

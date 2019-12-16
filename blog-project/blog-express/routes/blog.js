const express = require('express');
const router = express.Router();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../module/resModule')
const loginCheck = require('../middleware/loginCheck')


router.get('/list', async function(req, res, next) {
  let author = req.query.author || ''
  let keyword = req.query.keyword || ''

  if(req.query.isadmin) {
    // 管理员界面
    if(req.session.username == null) {
      return res.json(new ErrorModel('未登录'))
    }
    // 强制查询自己的博客
    author = req.session.username 
  }
  const listData = await getList(author,keyword)
  res.json(new SuccessModel(listData, '查询成功'))
});

router.get('/detail', async function(req, res, next) {
  const id = req.query.id 
  const data = await getDetail(id)

  return res.json(new SuccessModel(data[0], '查询成功'))
});

router.post('/new', loginCheck,async function(req, res, next) {
  req.body.author = req.session.username
  const data = await newBlog(req.body)
  return res.json(new SuccessModel({id: data.insertId}, '新建成功'))
});

router.post('/update', loginCheck,async function(req, res, next) {
  const id = req.query.id
  const data = await updateBlog(id,req.body)
  if(data.affectedRows > 0) {
    return res.json(new SuccessModel({id}, '更新成功'))
  }else {
    return res.json(new ErrorModel({id}, '更新失败'))
  }
});

router.post('/del', loginCheck,async function(req, res, next) {
  const author = req.session.username
  const id = req.query.id
  const data = await delBlog(id,author)
  if(data.affectedRows > 0) {
    return res.json(new SuccessModel({id}, '删除成功'))
  }else {
    return res.json(new ErrorModel({id}, '删除失败'))
  }
});

module.exports = router;
